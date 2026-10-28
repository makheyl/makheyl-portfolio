// Builds the side-panel forms from the field definitions in schema.js.
// Every edit writes straight into the object being edited, then calls ctx.change().
//
// ctx = {
//   content,                 the draft (for options that depend on other content)
//   change(),                something changed: redraw the page and save the draft
//   checkpoint(),            remember the state before an edit (for undo)
//   addFiles(files),         keep new uploads until Publish: [{ path, blob }]
//   preview(path),           a URL that shows a path, including uploads not published yet
//   media,                   media.js
//   icons,                   icon names for the icon picker
// }

const h = (tag, attrs = {}, ...kids) => {
  const el = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (v === undefined || v === null || v === false) return;
    if (k === "class") el.className = v;
    else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
    else if (k === "text") el.textContent = v;
    else el.setAttribute(k, v === true ? "" : v);
  });
  kids.flat().forEach((kid) => kid != null && el.append(kid));
  return el;
};

const lucide = (name) => {
  const i = h("i", { "data-lucide": name, "aria-hidden": "true" });
  return i;
};
const refreshIcons = () => window.lucide && window.lucide.createIcons();

function wrap(field, input, { inline = false } = {}) {
  const id = "ed-" + Math.random().toString(36).slice(2, 9);
  if (input.matches?.("input, textarea, select")) input.id = id;
  return h(
    "div",
    { class: "ed-field" + (inline ? " is-inline" : "") + (field.required ? " is-required" : "") },
    field.label ? h("label", { class: "ed-label", for: id, text: field.label }) : null,
    input,
    field.hint ? h("p", { class: "ed-hint", text: field.hint }) : null
  );
}

/* ---------- Field types ---------- */
const TYPES = {
  text(field, obj, ctx) {
    const input = h("input", { type: "text", class: "ed-input", value: obj[field.key] ?? "", placeholder: field.placeholder });
    input.addEventListener("focus", ctx.checkpoint);
    input.addEventListener("input", () => { obj[field.key] = input.value; ctx.change(); });
    return wrap(field, input);
  },

  url(field, obj, ctx) {
    const el = TYPES.text(field, obj, ctx);
    const input = el.querySelector("input");
    input.type = "url";
    input.placeholder = field.placeholder || "https://…";
    const check = () => {
      const v = input.value.trim();
      const bad = v && !/^(https?:\/\/|mailto:|[a-z0-9#./_-])/i.test(v);
      el.classList.toggle("is-invalid", Boolean(bad));
    };
    input.addEventListener("input", check);
    check();
    return el;
  },

  number(field, obj, ctx) {
    const input = h("input", { type: "number", class: "ed-input", value: obj[field.key] ?? "", min: 0 });
    input.addEventListener("focus", ctx.checkpoint);
    input.addEventListener("input", () => {
      obj[field.key] = input.value === "" ? null : Number(input.value);
      ctx.change();
    });
    return wrap(field, input);
  },

  textarea(field, obj, ctx) {
    const input = h("textarea", { class: "ed-input", rows: 3 });
    input.value = obj[field.key] ?? "";
    const fit = () => { input.style.height = "auto"; input.style.height = input.scrollHeight + 2 + "px"; };
    input.addEventListener("focus", ctx.checkpoint);
    input.addEventListener("input", () => { obj[field.key] = input.value; fit(); ctx.change(); });
    requestAnimationFrame(fit);
    return wrap(field, input);
  },

  select(field, obj, ctx) {
    const options = typeof field.options === "function" ? field.options(ctx.content) : field.options;
    const input = h("select", { class: "ed-input" }, options.map((o) => h("option", { value: o.value, text: o.label })));
    input.value = String(obj[field.key] ?? options[0]?.value ?? "");
    input.addEventListener("change", () => {
      ctx.checkpoint();
      const picked = options.find((o) => String(o.value) === input.value);
      obj[field.key] = picked ? picked.value : input.value;
      ctx.change();
    });
    return wrap(field, input);
  },

  toggle(field, obj, ctx) {
    const value = obj[field.key] ?? field.defaultValue ?? false;
    const input = h("input", { type: "checkbox", checked: Boolean(value) });
    input.addEventListener("change", () => { ctx.checkpoint(); obj[field.key] = input.checked; ctx.change(); });
    return h(
      "div",
      { class: "ed-field" },
      h("label", { class: "ed-switch" }, input, h("span"), field.label),
      field.hint ? h("p", { class: "ed-hint", text: field.hint }) : null
    );
  },

  month(field, obj, ctx) {
    const input = h("input", { type: "month", class: "ed-input", value: obj[field.key] || "" });
    input.addEventListener("focus", ctx.checkpoint);
    input.addEventListener("change", () => { obj[field.key] = input.value || null; ctx.change(); });
    return wrap(field, input);
  },

  // A list of short strings shown as chips: type and press Enter, drag to reorder
  tags(field, obj, ctx) {
    if (!Array.isArray(obj[field.key])) obj[field.key] = [];
    const list = obj[field.key];
    const box = h("div", { class: "ed-tags" });
    const input = h("input", { type: "text", class: "ed-tags-input", placeholder: "Type, then Enter" });
    let dragFrom = null;
    const draw = () => {
      box.querySelectorAll(".ed-chip").forEach((c) => c.remove());
      list.forEach((t, i) => {
        const chip = h(
          "span",
          { class: "ed-chip", draggable: "true" },
          h("span", { text: t }),
          h("button", { type: "button", "aria-label": `Remove ${t}`, text: "×", onclick: () => { ctx.checkpoint(); list.splice(i, 1); draw(); ctx.change(); } })
        );
        chip.addEventListener("dragstart", () => (dragFrom = i));
        chip.addEventListener("dragover", (e) => e.preventDefault());
        chip.addEventListener("drop", (e) => {
          e.preventDefault();
          if (dragFrom === null || dragFrom === i) return;
          ctx.checkpoint();
          const [moved] = list.splice(dragFrom, 1);
          list.splice(i, 0, moved);
          dragFrom = null;
          draw();
          ctx.change();
        });
        box.insertBefore(chip, input);
      });
    };
    const add = () => {
      const parts = input.value.split(",").map((s) => s.trim()).filter(Boolean);
      if (!parts.length) return;
      ctx.checkpoint();
      list.push(...parts);
      input.value = "";
      draw();
      ctx.change();
    };
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === ",") { e.preventDefault(); add(); }
      if (e.key === "Backspace" && !input.value && list.length) { ctx.checkpoint(); list.pop(); draw(); ctx.change(); }
    });
    input.addEventListener("blur", add);
    box.append(input);
    draw();
    return wrap(field, box);
  },

  // A list of paragraphs
  strings(field, obj, ctx) {
    if (!Array.isArray(obj[field.key])) obj[field.key] = [];
    const list = obj[field.key];
    const box = h("div", { class: "ed-strings" });
    const draw = () => {
      box.replaceChildren();
      list.forEach((text, i) => {
        const area = h("textarea", { class: "ed-input", rows: 3 });
        area.value = text;
        area.addEventListener("focus", ctx.checkpoint);
        area.addEventListener("input", () => { list[i] = area.value; ctx.change(); });
        box.append(
          h("div", { class: "ed-string" }, area,
            h("div", { class: "ed-mini" },
              h("button", { type: "button", class: "ed-icon-btn", "aria-label": "Move up", disabled: i === 0, onclick: () => { ctx.checkpoint(); list.splice(i - 1, 0, list.splice(i, 1)[0]); draw(); ctx.change(); } }, lucide("arrow-up")),
              h("button", { type: "button", class: "ed-icon-btn", "aria-label": "Remove paragraph", onclick: () => { ctx.checkpoint(); list.splice(i, 1); draw(); ctx.change(); } }, lucide("trash-2"))
            )
          )
        );
      });
      box.append(h("button", { type: "button", class: "ed-btn is-ghost", onclick: () => { ctx.checkpoint(); list.push(""); draw(); ctx.change(); } }, "+ Add paragraph"));
      refreshIcons();
    };
    draw();
    return wrap(field, box);
  },

  // A list of small objects, each with its own fields (buttons, roles, links…)
  list(field, obj, ctx) {
    if (!Array.isArray(obj[field.key])) obj[field.key] = [];
    const list = obj[field.key];
    const box = h("div", { class: "ed-list" });
    const open = new Set();
    let dragFrom = null;
    const draw = () => {
      box.replaceChildren();
      list.forEach((item, i) => {
        const body = h("div", { class: "ed-list-body" });
        const fields = field.fields.filter((f) => !f.showIf || f.showIf(item));
        buildFields(body, fields, item, { ...ctx, change: () => { label.textContent = field.itemLabel ? field.itemLabel(item) : `Item ${i + 1}`; ctx.change(); } });
        const label = h("span", { class: "ed-list-label", text: field.itemLabel ? field.itemLabel(item) : `Item ${i + 1}` });
        const card = h(
          "div",
          { class: "ed-list-item" + (open.has(i) ? " is-open" : "") + (item.hidden ? " is-hidden" : ""), draggable: "true" },
          h("div", { class: "ed-list-head" },
            h("span", { class: "ed-grip", "aria-hidden": "true" }, lucide("grip-vertical")),
            h("button", { type: "button", class: "ed-list-toggle", onclick: () => { open.has(i) ? open.delete(i) : open.add(i); card.classList.toggle("is-open"); } }, label, lucide("chevron-down")),
            h("button", { type: "button", class: "ed-icon-btn", "aria-label": "Move up", disabled: i === 0, onclick: () => move(i, -1) }, lucide("arrow-up")),
            h("button", { type: "button", class: "ed-icon-btn", "aria-label": "Move down", disabled: i === list.length - 1, onclick: () => move(i, 1) }, lucide("arrow-down")),
            field.fixed ? null : h("button", { type: "button", class: "ed-icon-btn", "aria-label": "Remove", onclick: () => { ctx.checkpoint(); list.splice(i, 1); open.clear(); draw(); ctx.change(); } }, lucide("trash-2"))
          ),
          body
        );
        card.addEventListener("dragstart", (e) => { if (!e.target.closest(".ed-list-head")) return e.preventDefault(); dragFrom = i; });
        card.addEventListener("dragover", (e) => e.preventDefault());
        card.addEventListener("drop", (e) => {
          e.preventDefault();
          if (dragFrom === null || dragFrom === i) return;
          ctx.checkpoint();
          list.splice(i, 0, list.splice(dragFrom, 1)[0]);
          dragFrom = null;
          open.clear();
          draw();
          ctx.change();
        });
        box.append(card);
      });
      if (!field.fixed) {
        box.append(h("button", { type: "button", class: "ed-btn is-ghost", onclick: () => { ctx.checkpoint(); list.push(field.create()); open.add(list.length - 1); draw(); ctx.change(); } }, `+ Add ${field.addLabel || "item"}`));
      }
      refreshIcons();
    };
    const move = (i, dir) => {
      ctx.checkpoint();
      list.splice(i + dir, 0, list.splice(i, 1)[0]);
      open.clear();
      draw();
      ctx.change();
    };
    draw();
    return wrap(field, box);
  },

  // A nested object shown as a titled block (e.g. portrait, one page's title + intro)
  group(field, obj, ctx) {
    if (!obj[field.key] || typeof obj[field.key] !== "object") obj[field.key] = {};
    const box = h("fieldset", { class: "ed-group" }, h("legend", { text: field.label }));
    buildFields(box, field.fields, obj[field.key], ctx);
    return box;
  },

  icon(field, obj, ctx) {
    const preview = h("span", { class: "ed-icon-preview" });
    const setPreview = () => {
      preview.replaceChildren(lucide(obj[field.key] || "circle"));
      refreshIcons();
    };
    const grid = h("div", { class: "ed-icon-grid", hidden: true });
    const search = h("input", { type: "search", class: "ed-input", placeholder: "Search icons" });
    const draw = () => {
      grid.replaceChildren(search);
      ctx.icons
        .filter((name) => name.includes(search.value.trim().toLowerCase()))
        .forEach((name) => grid.append(h("button", {
          type: "button", class: "ed-icon-choice" + (obj[field.key] === name ? " is-on" : ""), title: name, "aria-label": name,
          onclick: () => { ctx.checkpoint(); obj[field.key] = name; setPreview(); grid.hidden = true; ctx.change(); },
        }, lucide(name))));
      refreshIcons();
      search.focus();
    };
    search.addEventListener("input", () => { const q = search.value; draw(); search.value = q; });
    const toggle = h("button", { type: "button", class: "ed-btn is-ghost", onclick: () => { grid.hidden = !grid.hidden; if (!grid.hidden) draw(); } }, preview, h("span", { text: "Choose icon" }));
    setPreview();
    return wrap(field, h("div", {}, toggle, grid));
  },

  // Image upload. kinds: work (full + thumbnail + shape), icon/portrait (square crop), photo (resized)
  image(field, obj, ctx) {
    const box = h("div", { class: "ed-image" });
    const fileInput = h("input", { type: "file", accept: "image/*", hidden: true });
    const draw = () => {
      const path = obj[field.key];
      box.replaceChildren(
        path ? h("img", { class: "ed-image-preview", src: ctx.preview(path), alt: "" }) : h("div", { class: "ed-image-empty", text: "No image yet" }),
        h("div", { class: "ed-image-actions" },
          h("button", { type: "button", class: "ed-btn", onclick: () => fileInput.click() }, path ? "Replace" : "Upload image"),
          path && !field.required ? h("button", { type: "button", class: "ed-btn is-ghost", onclick: () => { ctx.checkpoint(); obj[field.key] = null; draw(); ctx.change(); } }, "Remove") : null
        ),
        fileInput,
        h("p", { class: "ed-hint ed-drop-hint", text: "or drop an image here" })
      );
    };
    const use = async (file) => {
      if (!file || !file.type.startsWith("image/")) return;
      // name the file after the item, or after the uploaded file while the item still has a placeholder name
      const given = obj.title || obj.name || obj.org || "";
      const name = !given || /^New /.test(given) ? file.name.replace(/\.[^.]+$/, "") : given;
      box.classList.add("is-busy");
      try {
        let result;
        if (field.kind === "work") result = await ctx.media.processWork(file, name);
        else if (field.kind === "photo") result = await ctx.media.processPhoto(file, name);
        else {
          result = await ctx.media.cropDialog(file, {
            title: field.kind === "portrait" ? "Crop your portrait" : "Crop the icon",
            size: field.kind === "portrait" ? 900 : 256,
            grayscale: field.kind === "portrait" || field.kind === "icon",
            dir: field.kind === "portrait" ? "assets" : "assets/projects",
            name,
          });
        }
        if (!result) return;
        ctx.checkpoint();
        ctx.addFiles(result.files);
        obj[field.key] = result.image;
        if (result.thumb) obj.thumb = result.thumb;
        if (result.ratio) obj.ratio = result.ratio;
        draw();
        ctx.change();
      } catch (err) {
        alert(err.message);
      } finally {
        box.classList.remove("is-busy");
      }
    };
    fileInput.addEventListener("change", () => use(fileInput.files[0]));
    box.addEventListener("dragover", (e) => { e.preventDefault(); box.classList.add("is-over"); });
    box.addEventListener("dragleave", () => box.classList.remove("is-over"));
    box.addEventListener("drop", (e) => { e.preventDefault(); box.classList.remove("is-over"); use(e.dataTransfer.files[0]); });
    draw();
    return wrap(field, box);
  },

  // Video: a YouTube/Vimeo link, or a small MP4 upload
  video(field, obj, ctx) {
    const box = h("div", { class: "ed-video" });
    const input = h("input", { type: "url", class: "ed-input", placeholder: "https://youtu.be/…", value: /^https?:/.test(obj[field.key] || "") ? obj[field.key] : "" });
    input.addEventListener("focus", ctx.checkpoint);
    input.addEventListener("input", () => {
      obj[field.key] = input.value.trim() || null;
      const yt = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{11})/.exec(input.value);
      if (yt && !obj.image) { obj.image = `https://img.youtube.com/vi/${yt[1]}/hqdefault.jpg`; obj.ratio = "16:9"; }
      ctx.change();
    });
    const fileInput = h("input", { type: "file", accept: "video/mp4", hidden: true });
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (!file) return;
      if (file.size > 3 * 1024 * 1024) { alert("That video is over 3 MB. Upload it to YouTube or Google Drive and paste the link instead."); return; }
      ctx.checkpoint();
      const path = `assets/creative/web/${ctx.media.slug(obj.title || "video")}-${Date.now().toString(36)}.mp4`;
      ctx.addFiles([{ path, blob: file }]);
      obj[field.key] = path;
      input.value = "";
      status.textContent = "MP4 ready: " + file.name;
      ctx.change();
    });
    const status = h("p", { class: "ed-hint", text: obj[field.key] && !/^https?:/.test(obj[field.key]) ? "Uses " + obj[field.key] : "" });
    box.append(input, h("div", { class: "ed-image-actions" },
      h("button", { type: "button", class: "ed-btn", onclick: () => fileInput.click() }, "Upload MP4"),
      h("button", { type: "button", class: "ed-btn is-ghost", onclick: () => { ctx.checkpoint(); obj[field.key] = null; input.value = ""; status.textContent = ""; ctx.change(); } }, "No video")
    ), fileInput, status);
    return wrap(field, box);
  },

  // A file such as the résumé PDF
  file(field, obj, ctx) {
    const box = h("div", { class: "ed-image-actions" });
    const fileInput = h("input", { type: "file", accept: field.accept || "*/*", hidden: true });
    const label = h("span", { class: "ed-hint", text: obj[field.key] ? "Current: " + obj[field.key] : "No file" });
    fileInput.addEventListener("change", () => {
      const file = fileInput.files[0];
      if (!file) return;
      if (file.size > 3 * 1024 * 1024) { alert("That file is over 3 MB."); return; }
      ctx.checkpoint();
      const ext = (file.name.split(".").pop() || "pdf").toLowerCase();
      const path = `${field.dir || "assets"}/${ctx.media.slug(file.name.replace(/\.[^.]+$/, ""))}-${Date.now().toString(36)}.${ext}`;
      ctx.addFiles([{ path, blob: file }]);
      obj[field.key] = path;
      label.textContent = "New: " + file.name;
      ctx.change();
    });
    box.append(h("button", { type: "button", class: "ed-btn", onclick: () => fileInput.click() }, "Upload"), fileInput, label);
    return wrap(field, box);
  },
};

export function buildFields(container, fields, obj, ctx) {
  fields.forEach((field) => {
    const make = TYPES[field.type];
    if (make) container.append(make(field, obj, ctx));
  });
  refreshIcons();
}

// Required fields that are empty, for the warnings before Publish
export function missingFields(fields, obj) {
  return fields.filter((f) => f.required && (obj[f.key] === undefined || obj[f.key] === null || String(obj[f.key]).trim() === "")).map((f) => f.label);
}

export { h, lucide, refreshIcons };
