// Owner editor. Loaded only after /api/auth/me confirms the signed-in owner (see script.js initOwner).
//
// How it works:
//   live   = the published content (window.CONTENT as served)
//   draft  = a working copy, saved in this browser (IndexedDB) after every change
//   Edit mode redraws the real page from the draft and adds controls to every card.
//   Publish uploads new files, then /api/publish commits data/content.js + files in one commit.

import { COLLECTIONS, SETTINGS, iconList } from "./schema.js";
import { buildFields, missingFields, h, lucide, refreshIcons } from "./fields.js";
import * as media from "./media.js";

const PAGE = document.body.dataset.page;
const clone = (x) => JSON.parse(JSON.stringify(x));
const getPath = (obj, path) => path.split(".").reduce((o, k) => (o ? o[k] : undefined), obj);
const api = (url, body) =>
  fetch(url, {
    method: body ? "POST" : "GET",
    credentials: "same-origin",
    headers: body ? { "Content-Type": "application/json", "X-Requested-With": "portfolio-editor" } : {},
    body: body ? JSON.stringify(body) : undefined,
  });

/* ---------- Draft storage (IndexedDB: survives reloads, holds image blobs) ---------- */
const store = {
  db: null,
  open() {
    if (this.db) return Promise.resolve(this.db);
    return new Promise((resolve, reject) => {
      const req = indexedDB.open("portfolio-editor", 1);
      req.onupgradeneeded = () => req.result.createObjectStore("kv");
      req.onsuccess = () => resolve((this.db = req.result));
      req.onerror = () => reject(req.error);
    });
  },
  async get(key) {
    const db = await this.open();
    return new Promise((resolve) => {
      const r = db.transaction("kv").objectStore("kv").get(key);
      r.onsuccess = () => resolve(r.result);
      r.onerror = () => resolve(undefined);
    });
  },
  async set(key, value) {
    const db = await this.open();
    return new Promise((resolve) => {
      const tx = db.transaction("kv", "readwrite");
      tx.objectStore("kv").put(value, key);
      tx.oncomplete = resolve;
      tx.onerror = resolve;
    });
  },
  async del(key) {
    const db = await this.open();
    return new Promise((resolve) => {
      const tx = db.transaction("kv", "readwrite");
      tx.objectStore("kv").delete(key);
      tx.oncomplete = resolve;
    });
  },
};

/* ---------- State ---------- */
const state = {
  me: null,
  live: null,
  draft: null,
  files: new Map(), // path → Blob, uploads not published yet
  urls: new Map(), // path → object URL, for previews
  editing: false,
  undo: [],
  redo: [],
  lastSnapshot: null,
};

// Every list item gets a stable id so changes can be described ("Edited project: …")
function ensureIds(content) {
  const used = new Set();
  const give = (item, base) => {
    if (item.id && !used.has(item.id)) { used.add(item.id); return; }
    let id = media.slug(base);
    let n = 2;
    while (used.has(id)) id = `${media.slug(base)}-${n++}`;
    item.id = id;
    used.add(id);
  };
  COLLECTIONS.forEach((col) => (getPath(content, col.key) || []).forEach((it) => give(it, col.title(it))));
  return content;
}

function withDefaults(c) {
  c.appearance = { defaultTheme: "system", animations: true, clickPulse: true, galleryGrayscale: true, ...(c.appearance || {}) };
  c.home = c.home || { sections: [] };
  return c;
}

/* ---------- Rendering ---------- */
let renderTimer = null;
let saveTimer = null;

function scheduleRender() {
  clearTimeout(renderTimer);
  renderTimer = setTimeout(render, 140);
}

function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveDraft, 400);
  updateBar();
}

function change() {
  scheduleRender();
  scheduleSave();
}

// Keeps the draft in this browser while it differs from the published site
async function saveDraft() {
  if (!changes().length) {
    await store.del("draft");
    await store.del("files");
    return;
  }
  await store.set("draft", { content: state.draft, base: state.live.meta.version, savedAt: Date.now() });
  await store.set("files", Object.fromEntries(state.files));
}

function preview(path) {
  if (state.files.has(path)) {
    if (!state.urls.has(path)) state.urls.set(path, URL.createObjectURL(state.files.get(path)));
    return state.urls.get(path);
  }
  return path;
}

function render() {
  const focus = document.activeElement;
  const keepFocus = focus && focus.closest(".ed-panel, .ed-modal, .ed-bar") ? focus : null;
  window.CONTENT = state.draft;
  document.documentElement.dataset.gallery = state.draft.appearance.galleryGrayscale === false ? "color" : "";
  window.renderPage({ showHidden: state.editing });
  // show uploads that aren't published yet
  document.querySelectorAll("main img, main video").forEach((el) => {
    const src = el.getAttribute("src");
    if (src && state.files.has(src)) el.src = preview(src);
    const poster = el.getAttribute("poster");
    if (poster && state.files.has(poster)) el.poster = preview(poster);
  });
  if (state.editing) decorate();
  if (keepFocus && document.contains(keepFocus)) keepFocus.focus({ preventScroll: true });
  updateBar();
}

/* ---------- Undo / redo ---------- */
function checkpoint() {
  const snap = JSON.stringify(state.draft);
  if (snap === state.lastSnapshot) return;
  state.undo.push(snap);
  if (state.undo.length > 60) state.undo.shift();
  state.redo = [];
  state.lastSnapshot = snap;
}

function undo() {
  if (!state.undo.length) return toast("Nothing to undo");
  state.redo.push(JSON.stringify(state.draft));
  state.draft = JSON.parse(state.undo.pop());
  state.lastSnapshot = null;
  closePanel();
  change();
  render();
}

function redo() {
  if (!state.redo.length) return toast("Nothing to redo");
  state.undo.push(JSON.stringify(state.draft));
  state.draft = JSON.parse(state.redo.pop());
  state.lastSnapshot = null;
  closePanel();
  change();
  render();
}

/* ---------- What changed (for the counter and the Publish summary) ---------- */
function changes() {
  const out = [];
  const { live, draft } = state;
  COLLECTIONS.forEach((col) => {
    const before = getPath(live, col.key) || [];
    const after = getPath(draft, col.key) || [];
    const byId = new Map(before.map((it) => [it.id, it]));
    const ids = new Set(after.map((it) => it.id));
    after.forEach((it) => {
      const old = byId.get(it.id);
      if (!old) out.push(`Added ${col.singular}: ${col.title(it)}`);
      else if (JSON.stringify(old) !== JSON.stringify(it)) {
        if (Boolean(old.hidden) !== Boolean(it.hidden)) out.push(`${it.hidden ? "Hid" : "Showed"} ${col.singular}: ${col.title(it)}`);
        else out.push(`Edited ${col.singular}: ${col.title(it)}`);
      }
    });
    before.forEach((it) => !ids.has(it.id) && out.push(`Removed ${col.singular}: ${col.title(it)}`));
    const order = (list) => list.filter((it) => byId.has(it.id) && ids.has(it.id)).map((it) => it.id).join("|");
    if (order(before) !== order(after)) out.push(`Reordered ${col.label.toLowerCase()}`);
  });
  SETTINGS.forEach((tab) => {
    if (JSON.stringify(tab.target(live)) !== JSON.stringify(tab.target(draft))) {
      // categories live inside "creative" alongside the works; compare just the categories
      if (tab.id === "categories" && JSON.stringify(live.creative.categories) === JSON.stringify(draft.creative.categories)) return;
      out.push(`Updated settings: ${tab.label}`);
    }
  });
  return out;
}

/* ---------- Owner bar ---------- */
let bar;
function buildBar() {
  bar = h("div", { class: "ed-bar", role: "toolbar", "aria-label": "Editor" },
    h("label", { class: "ed-switch ed-bar-edit", title: "Edit mode (E)" },
      h("input", { type: "checkbox", onchange: (e) => setEditing(e.target.checked) }), h("span"), "Edit"),
    h("span", { class: "ed-bar-count", "aria-live": "polite" }),
    h("button", { type: "button", class: "ed-icon-btn", title: "Undo (Ctrl/⌘ Z)", "aria-label": "Undo", onclick: undo }, lucide("undo-2")),
    h("button", { type: "button", class: "ed-icon-btn", title: "Redo (Shift Ctrl/⌘ Z)", "aria-label": "Redo", onclick: redo }, lucide("redo-2")),
    h("button", { type: "button", class: "ed-icon-btn", title: "Settings", "aria-label": "Settings", onclick: () => openSettings() }, lucide("settings-2")),
    h("button", { type: "button", class: "ed-icon-btn", title: "History", "aria-label": "History", onclick: openHistory }, lucide("history")),
    h("button", { type: "button", class: "ed-btn is-primary ed-bar-publish", onclick: openPublish }, lucide("upload"), h("span", { text: "Publish" })),
    h("button", { type: "button", class: "ed-icon-btn", title: "More", "aria-label": "More", onclick: openMore }, lucide("more-horizontal"))
  );
  document.body.append(bar);
  refreshIcons();
}

function updateBar() {
  if (!bar) return;
  const n = changes().length;
  bar.querySelector(".ed-bar-count").textContent = n ? `${n} unpublished change${n === 1 ? "" : "s"}` : "No changes";
  bar.querySelector(".ed-bar-publish").disabled = !n;
  bar.querySelector(".ed-bar-edit input").checked = state.editing;
}

const motionBefore = document.documentElement.dataset.motion || "";
function setEditing(on) {
  state.editing = on;
  document.documentElement.dataset.editing = on ? "1" : "";
  // no entry animations while editing: every redraw would replay them
  document.documentElement.dataset.motion = on ? "reduce" : motionBefore;
  try { sessionStorage.setItem("ed-editing", on ? "1" : ""); } catch { /* private mode */ }
  if (!on) closePanel();
  render();
}

function openMore() {
  menu([
    { label: "Discard draft", icon: "rotate-ccw", run: discardDraft },
    { label: "Sign out", icon: "log-out", run: signOut },
  ]);
}

/* ---------- Edit mode: controls on the real page ---------- */
function decorate() {
  const cols = COLLECTIONS.filter((c) => c.page === PAGE);
  cols.forEach((col) => {
    const list = getPath(state.draft, col.key) || [];
    const els = [...document.querySelectorAll(col.selector)];
    if (els.length !== list.length) return; // page drew something different; skip rather than mislabel
    els.forEach((el, i) => {
      const item = list[i];
      el.dataset.edItem = "";
      el.classList.toggle("ed-is-hidden", Boolean(item.hidden));
      const tools = h("div", { class: "ed-tools", onclick: stopClick },
        h("span", { class: "ed-tools-name", text: col.title(item) }),
        tool("pencil", "Edit", () => openItem(col, item)),
        tool("copy", "Duplicate", () => duplicate(col, i)),
        tool("arrow-up", "Move up", () => move(col, i, -1), i === 0),
        tool("arrow-down", "Move down", () => move(col, i, 1), i === list.length - 1),
        tool(item.hidden ? "eye" : "eye-off", item.hidden ? "Show" : "Hide", () => toggleHidden(col, item)),
        tool("trash-2", "Delete", () => remove(col, i))
      );
      if (item.hidden) el.append(h("span", { class: "ed-hidden-badge", text: "Hidden" }));
      el.append(tools);
      // drag to reorder
      el.draggable = true;
      el.addEventListener("dragstart", (e) => {
        if (e.target.closest("input, textarea, [contenteditable]")) return;
        e.dataTransfer.setData("text/ed-index", String(i));
        e.dataTransfer.effectAllowed = "move";
        el.classList.add("ed-dragging");
      });
      el.addEventListener("dragend", () => el.classList.remove("ed-dragging"));
      el.addEventListener("dragover", (e) => { e.preventDefault(); el.classList.add("ed-drop"); });
      el.addEventListener("dragleave", () => el.classList.remove("ed-drop"));
      el.addEventListener("drop", (e) => {
        e.preventDefault();
        el.classList.remove("ed-drop");
        const from = Number(e.dataTransfer.getData("text/ed-index"));
        if (Number.isNaN(from) || from === i) return;
        checkpoint();
        list.splice(i, 0, list.splice(from, 1)[0]);
        change();
        render();
      });
      // links inside cards open the editor instead of navigating while editing
      if (el.matches("a")) el.addEventListener("click", (e) => { e.preventDefault(); openItem(col, item); });
      el.addEventListener("dblclick", (e) => { if (!e.target.closest("a, button")) openItem(col, item); });
    });
    const after = document.querySelector(col.addAfter);
    if (after) after.after(h("button", { type: "button", class: "ed-add", onclick: () => add(col) }, lucide("plus"), `Add ${col.singular}`));
  });

  inlineText();
  if (PAGE === "home") {
    const hero = document.getElementById("hero");
    hero.dataset.edItem = "";
    hero.append(h("div", { class: "ed-tools", onclick: stopClick },
      h("span", { class: "ed-tools-name", text: "Profile" }),
      tool("pencil", "Edit profile", () => openSettings("profile")),
      tool("layout-list", "Home sections", () => openSettings("home"))));
  }
  refreshIcons();
}

// Editor controls sit inside cards that may be links: never let a click navigate
function stopClick(e) {
  e.preventDefault();
  e.stopPropagation();
}

function tool(icon, label, run, disabled = false) {
  return h("button", { type: "button", class: "ed-tool", title: label, "aria-label": label, disabled, onclick: run }, lucide(icon));
}

// Click-and-type for short texts: page titles and intros, and the home hero
function inlineText() {
  const bind = (el, get, set, { multiline = false } = {}) => {
    if (!el) return;
    el.contentEditable = "plaintext-only";
    if (el.contentEditable !== "plaintext-only") el.contentEditable = "true";
    el.classList.add("ed-inline");
    el.spellcheck = true;
    el.textContent = get();
    el.addEventListener("focus", checkpoint);
    el.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !multiline) { e.preventDefault(); el.blur(); }
      e.stopPropagation(); // keep editor shortcuts out of typing
    });
    el.addEventListener("input", () => { set(el.textContent.replace(/\s*\n\s*/g, multiline ? "\n" : " ")); scheduleSave(); });
    el.addEventListener("blur", scheduleRender);
  };
  const page = state.draft.pages[PAGE];
  if (page) {
    const title = document.querySelector(".page-title .title-text");
    if (title) {
      title.removeAttribute("aria-hidden");
      bind(title, () => page.title, (v) => (page.title = v));
    }
    bind(document.querySelector(".page-intro"), () => page.intro, (v) => (page.intro = v));
  }
  if (PAGE === "home") {
    const site = state.draft.site;
    bind(document.querySelector(".hero-name"), () => site.name, (v) => (site.name = v));
    const status = document.querySelector(".status");
    if (status) {
      const text = [...status.childNodes].find((n) => n.nodeType === 3);
      const span = h("span", { text: site.status });
      if (text) text.replaceWith(span);
      bind(span, () => site.status, (v) => (site.status = v));
    }
    document.querySelectorAll(".hero-intro p").forEach((p, i) => bind(p, () => site.intro[i], (v) => (site.intro[i] = v), { multiline: false }));
  }
}

/* ---------- Item actions ---------- */
function uniqueId(list, base) {
  const ids = new Set(list.map((x) => x.id));
  let id = media.slug(base);
  let n = 2;
  while (ids.has(id)) id = `${media.slug(base)}-${n++}`;
  return id;
}

function add(col) {
  checkpoint();
  const list = getPath(state.draft, col.key);
  const item = col.create(state.draft);
  item.id = uniqueId(list, col.title(item));
  list.push(item);
  change();
  render();
  openItem(col, item, { isNew: true });
  scrollToItem(col, list.length - 1);
}

function duplicate(col, i) {
  checkpoint();
  const list = getPath(state.draft, col.key);
  const copy = clone(list[i]);
  const name = ["name", "title", "org", "category", "label"].find((k) => typeof copy[k] === "string");
  if (name) copy[name] += " (copy)";
  copy.id = uniqueId(list, col.title(copy));
  list.splice(i + 1, 0, copy);
  change();
  render();
  openItem(col, copy);
}

function move(col, i, dir) {
  checkpoint();
  const list = getPath(state.draft, col.key);
  list.splice(i + dir, 0, list.splice(i, 1)[0]);
  change();
  render();
  scrollToItem(col, i + dir);
}

function toggleHidden(col, item) {
  checkpoint();
  item.hidden = !item.hidden;
  if (!item.hidden) delete item.hidden;
  change();
  render();
  toast(item.hidden ? "Hidden from visitors" : "Visible to visitors");
}

function remove(col, i) {
  const list = getPath(state.draft, col.key);
  if (!confirm(`Delete “${col.title(list[i])}”? You can undo this.`)) return;
  checkpoint();
  list.splice(i, 1);
  closePanel();
  change();
  render();
  toast("Deleted", { action: "Undo", run: undo });
}

function scrollToItem(col, i) {
  requestAnimationFrame(() => document.querySelectorAll(col.selector)[i]?.scrollIntoView({ block: "center", behavior: "smooth" }));
}

/* ---------- Side panel ---------- */
let panel = null;
let onPanelClose = null;
function closePanel() {
  panel?.remove();
  panel = null;
  const done = onPanelClose;
  onPanelClose = null;
  done?.();
}

function fieldCtx() {
  return {
    content: state.draft,
    change,
    checkpoint,
    addFiles: (files) => files.forEach((f) => state.files.set(f.path, f.blob)),
    preview,
    media,
    icons: iconList,
  };
}

function openPanel(title, build, { footer } = {}) {
  closePanel();
  const body = h("div", { class: "ed-panel-body" });
  panel = h("aside", { class: "ed-panel", role: "dialog", "aria-label": title },
    h("header", { class: "ed-panel-head" },
      h("p", { class: "ed-panel-title", text: title }),
      h("button", { type: "button", class: "ed-icon-btn", "aria-label": "Close", onclick: closePanel }, lucide("x"))),
    body,
    footer || null);
  build(body);
  document.body.append(panel);
  refreshIcons();
  panel.querySelector("input, textarea, select, button")?.focus({ preventScroll: true });
}

function openItem(col, item, { isNew = false } = {}) {
  checkpoint();
  // a new item's id (used in links like projects.html#id) follows the name it ends up with
  const renameId = isNew
    ? () => {
        const list = getPath(state.draft, col.key) || [];
        if (!list.includes(item)) return;
        item.id = uniqueId(list.filter((x) => x !== item), col.title(item));
        change();
      }
    : null;
  openPanel(`${isNew ? "New" : "Edit"} ${col.singular}`, (body) => buildFields(body, col.fields, item, fieldCtx()), {
    footer: h("footer", { class: "ed-panel-foot" },
      h("button", { type: "button", class: "ed-btn is-ghost", onclick: () => {
        const list = getPath(state.draft, col.key);
        const i = list.indexOf(item);
        if (i >= 0) remove(col, i);
      } }, lucide("trash-2"), "Delete"),
      h("button", { type: "button", class: "ed-btn is-primary", onclick: closePanel }, "Done")),
  });
  onPanelClose = renameId;
}

function openSettings(tabId = "profile") {
  checkpoint();
  openPanel("Settings", (body) => {
    const tabs = h("div", { class: "ed-tabs", role: "tablist" });
    const pane = h("div", { class: "ed-tab-pane" });
    const show = (tab) => {
      tabs.querySelectorAll("button").forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === tab.id)));
      pane.replaceChildren();
      buildFields(pane, tab.fields, tab.target(state.draft), fieldCtx());
    };
    SETTINGS.forEach((tab) => tabs.append(h("button", { type: "button", role: "tab", "data-tab": tab.id, onclick: () => show(tab) }, tab.label)));
    body.append(tabs, pane);
    show(SETTINGS.find((t) => t.id === tabId) || SETTINGS[0]);
  });
}

/* ---------- Publish ---------- */
function referencedFiles() {
  const text = JSON.stringify(state.draft);
  return [...state.files.keys()].filter((p) => text.includes(JSON.stringify(p)));
}

function problems() {
  const out = [];
  COLLECTIONS.forEach((col) => (getPath(state.draft, col.key) || []).forEach((item) => {
    const miss = missingFields(col.fields, item);
    if (miss.length) out.push(`${col.title(item)}: ${miss.join(", ")} missing`);
  }));
  return out;
}

function openPublish() {
  const list = changes();
  if (!list.length) return toast("Nothing to publish");
  const issues = problems();
  const files = referencedFiles();
  const message = h("textarea", { class: "ed-input", rows: 3 });
  message.value = list.length === 1 ? list[0] : `Update portfolio: ${list.slice(0, 3).join("; ")}${list.length > 3 ? ` and ${list.length - 3} more` : ""}`;
  const status = h("p", { class: "ed-hint", "aria-live": "polite" });
  const go = h("button", { type: "button", class: "ed-btn is-primary", onclick: () => publish(message.value, status, go) }, lucide("upload"), "Publish now");
  modal("Publish changes", [
    h("ul", { class: "ed-change-list" }, list.map((c) => h("li", { text: c }))),
    files.length ? h("p", { class: "ed-hint", text: `${files.length} new file${files.length === 1 ? "" : "s"} will be uploaded.` }) : null,
    issues.length ? h("div", { class: "ed-warn" }, h("p", { text: "Some items are missing information:" }), h("ul", {}, issues.map((p) => h("li", { text: p })))) : null,
    h("label", { class: "ed-label", text: "Description of this update" }),
    message,
    status,
  ], [go]);
}

async function publish(message, status, button) {
  button.disabled = true;
  try {
    const files = referencedFiles();
    const uploads = [];
    for (let i = 0; i < files.length; i++) {
      status.textContent = `Uploading file ${i + 1} of ${files.length}…`;
      const res = await api("/api/upload", { base64: await media.blobToBase64(state.files.get(files[i])) });
      const data = await res.json();
      if (!res.ok) throw Object.assign(new Error(data.error || "Upload failed"), { status: res.status });
      uploads.push({ path: files[i], sha: data.sha });
    }
    status.textContent = "Saving to GitHub…";
    const res = await api("/api/publish", { content: state.draft, uploads, message, baseVersion: state.live.meta.version });
    const data = await res.json();
    if (!res.ok) throw Object.assign(new Error(data.error || "Publish failed"), { status: res.status });

    state.draft.meta = { ...state.draft.meta, version: data.version };
    state.live = clone(state.draft);
    state.files.clear(); // previews keep their object URLs until the page reloads
    await store.del("draft");
    await store.del("files");
    state.undo = [];
    state.redo = [];
    updateBar();
    status.textContent = "Published. Waiting for the site to update…";
    waitForDeploy(data.version, status);
  } catch (err) {
    button.disabled = false;
    if (err.status === 409) state.stale = true;
    if (err.status === 409) status.innerHTML = "The site was changed somewhere else (another device or tab). Your draft is saved; <a href=\"\">reload</a> to get the latest version before publishing.";
    else if (err.status === 401) status.innerHTML = 'Your sign-in has expired. Your draft is saved; <a href="/edit">sign in again</a>.';
    else status.textContent = `Couldn't publish: ${err.message}`;
  }
}

async function waitForDeploy(version, status) {
  const started = Date.now();
  while (Date.now() - started < 4 * 60 * 1000) {
    await new Promise((r) => setTimeout(r, 4000));
    try {
      const text = await (await fetch(`data/content.js?v=${Date.now()}`, { cache: "no-store" })).text();
      if (text.includes(`"version": "${version}"`)) {
        status.textContent = "Live ✓ Your changes are on the site.";
        toast("Live ✓");
        return;
      }
      status.textContent = `Publishing… (${Math.round((Date.now() - started) / 1000)} s)`;
    } catch { /* keep waiting */ }
  }
  status.textContent = "Saved to GitHub. The site is taking longer than usual to update; check Vercel if it doesn't appear soon.";
}

/* ---------- History ---------- */
async function openHistory() {
  const list = h("ul", { class: "ed-history" }, h("li", { class: "ed-hint", text: "Loading…" }));
  modal("Published versions", [h("p", { class: "ed-hint", text: "Load a version as your draft, check it, then Publish to bring it back." }), list], []);
  try {
    const res = await api("/api/history");
    const data = await res.json();
    if (!res.ok) throw new Error(data.error);
    list.replaceChildren(...data.versions.map((v, i) => h("li", {},
      h("div", {}, h("p", { class: "ed-history-msg", text: v.message }), h("p", { class: "ed-hint", text: new Date(v.date).toLocaleString() + (i === 0 ? " · current" : "") })),
      i === 0 ? null : h("button", { type: "button", class: "ed-btn", onclick: () => loadVersion(v.sha) }, "Load as draft"))));
  } catch (err) {
    list.replaceChildren(h("li", { class: "ed-hint", text: `Couldn't load history: ${err.message}` }));
  }
}

async function loadVersion(sha) {
  if (state.stale) return toast("The site changed since this page loaded. Reload first, then load the version.");
  if (changes().length && !confirm("Replace your current draft with this version?")) return;
  const res = await api(`/api/history?sha=${sha}`);
  const data = await res.json();
  if (!res.ok) return toast(data.error || "Couldn't load that version");
  checkpoint();
  state.draft = ensureIds(withDefaults(data.content));
  document.querySelector(".ed-modal")?.remove();
  change();
  render();
  toast("Loaded as your draft. Publish to restore it.");
}

/* ---------- Draft actions ---------- */
async function discardDraft() {
  if (!confirm("Throw away all unpublished changes?")) return;
  state.draft = clone(state.live);
  state.files.clear();
  state.undo = [];
  state.redo = [];
  await store.del("draft");
  await store.del("files");
  closePanel();
  render();
  toast("Draft discarded");
}

async function signOut() {
  if (changes().length && !confirm("Sign out? Your draft stays saved in this browser.")) return;
  await api("/api/auth/logout", {});
  location.href = location.pathname;
}

/* ---------- Small UI helpers ---------- */
function modal(title, content, actions) {
  document.querySelector(".ed-modal")?.remove();
  const close = () => wrapEl.remove();
  const wrapEl = h("div", { class: "ed-modal", onclick: (e) => e.target === wrapEl && close() },
    h("div", { class: "ed-modal-card", role: "dialog", "aria-label": title },
      h("p", { class: "ed-modal-title", text: title }),
      ...content,
      h("div", { class: "ed-modal-actions" }, h("button", { type: "button", class: "ed-btn", onclick: close }, "Close"), ...actions)));
  document.body.append(wrapEl);
  refreshIcons();
  return wrapEl;
}

function menu(items) {
  document.querySelector(".ed-menu")?.remove();
  const el = h("div", { class: "ed-menu", role: "menu" }, items.map((it) =>
    h("button", { type: "button", role: "menuitem", onclick: () => { el.remove(); it.run(); } }, lucide(it.icon), it.label)));
  document.body.append(el);
  refreshIcons();
  setTimeout(() => document.addEventListener("click", () => el.remove(), { once: true }), 0);
}

function toast(text, { action, run } = {}) {
  document.querySelector(".ed-toast")?.remove();
  const el = h("div", { class: "ed-toast", role: "status" }, h("span", { text }),
    action ? h("button", { type: "button", class: "ed-btn is-ghost", onclick: () => { el.remove(); run(); } }, action) : null);
  document.body.append(el);
  setTimeout(() => el.remove(), 4000);
}

function shortcuts() {
  document.addEventListener("keydown", (e) => {
    const typing = e.target.closest?.("input, textarea, select, [contenteditable]");
    const mod = e.metaKey || e.ctrlKey;
    if (mod && e.key.toLowerCase() === "z" && !typing) { e.preventDefault(); e.shiftKey ? redo() : undo(); }
    else if (mod && e.key.toLowerCase() === "s") { e.preventDefault(); saveDraft().then(() => toast("Draft saved")); }
    else if (!mod && !typing && e.key.toLowerCase() === "e") setEditing(!state.editing);
    else if (e.key === "Escape" && panel && !document.querySelector(".ed-modal")) closePanel();
  });
  window.addEventListener("beforeunload", () => { clearTimeout(saveTimer); saveDraft(); });
}

/* ---------- Start ---------- */
export async function startEditor(me) {
  state.me = me;
  state.live = ensureIds(withDefaults(clone(window.CONTENT)));
  const saved = await store.get("draft");
  const files = (await store.get("files")) || {};
  Object.entries(files).forEach(([path, blob]) => state.files.set(path, blob));
  state.draft = saved && saved.content ? ensureIds(withDefaults(saved.content)) : clone(state.live);

  buildBar();
  shortcuts();
  const fromLogin = new URLSearchParams(location.search).has("edit");
  let wasEditing = false;
  try { wasEditing = sessionStorage.getItem("ed-editing") === "1"; } catch { /* private mode */ }
  setEditing(fromLogin || wasEditing);
  if (fromLogin) history.replaceState(null, "", location.pathname + location.hash);

  if (saved && saved.base !== state.live.meta.version && changes().length) {
    toast("Your draft was started before the last publish. Check it before publishing.", { action: "Discard", run: discardDraft });
  } else if (fromLogin) {
    toast(`Signed in as ${me.login}. Press E to toggle edit mode.`);
  }
}
