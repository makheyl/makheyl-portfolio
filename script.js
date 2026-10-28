/* ==========================================================================
   Makheyl — portfolio
   All site content lives in data/content.js (window.CONTENT), edited from the
   site's owner editor or by hand. This file only renders it.
   ========================================================================== */

/* ---------- Content ----------
   The names below are what the renderers use. bindContent() points them at
   window.CONTENT; items marked hidden: true are left out unless showHidden is set
   (the editor uses that to show hidden items while editing).
*/
let SITE, NAV, PAGES, HOME, APPEARANCE, STATS, PROJECTS, EXPERIENCE, STACK, GEAR;
let CREATIVE_CATEGORIES, CREATIVE, CONTRIB_API, CONTRIB_WEEKS, CONTRIB_SNAPSHOT;
let AWARDS, LEADERSHIP, CERTIFICATIONS;

function bindContent(c = window.CONTENT, { showHidden = false } = {}) {
  const shown = (list = []) => (showHidden ? list : list.filter((x) => !x.hidden));
  SITE = { ...c.site, social: shown(c.site.social) };
  NAV = {
    withIcons: shown(c.nav.withIcons),
    textOnly: shown(c.nav.textOnly),
  };
  PAGES = c.pages;
  HOME = c.home || { sections: [] };
  APPEARANCE = c.appearance || {};
  STATS = shown(c.stats);
  PROJECTS = shown(c.projects);
  EXPERIENCE = shown(c.experience);
  STACK = shown(c.stack);
  GEAR = shown(c.gear);
  CREATIVE_CATEGORIES = c.creative.categories;
  CREATIVE = shown(c.creative.items);
  CONTRIB_API = c.contrib.api;
  CONTRIB_WEEKS = c.contrib.weeks;
  CONTRIB_SNAPSHOT = c.contrib.snapshot;
  AWARDS = shown(c.awards);
  LEADERSHIP = shown(c.leadership);
  CERTIFICATIONS = shown(c.certifications);
}
bindContent();

// Only lets through links that are web, email, or on this site (form input can't inject javascript: URLs)
function safeUrl(url) {
  const u = String(url || "").trim();
  if (/^(https?:|mailto:)/i.test(u)) return u;
  if (/^[a-z][a-z0-9+.-]*:/i.test(u) || u.startsWith("//")) return "#";
  return u;
}
/* ==========================================================================
   Helpers
   ========================================================================== */
// Motion is skipped when the visitor prefers reduced motion (or with ?reduced-motion for testing)
// (also off when the owner turns animations off in the editor's appearance settings)
const REDUCED_MOTION =
  matchMedia("(prefers-reduced-motion: reduce)").matches ||
  new URLSearchParams(location.search).has("reduced-motion") ||
  APPEARANCE.animations === false;
if (APPEARANCE.galleryGrayscale === false) document.documentElement.dataset.gallery = "color";
if (REDUCED_MOTION) document.documentElement.dataset.motion = "reduce";

const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const icon = (name, cls = "") => `<i data-lucide="${name}" class="${cls}" aria-hidden="true"></i>`;

function parseYm(ym) {
  const [y, m] = ym.split("-").map(Number);
  return { y, m };
}

function fmtYm(ym) {
  if (!ym) return "PRESENT";
  const { y, m } = parseYm(ym);
  return `${MONTHS[m - 1]} ${y}`;
}

function roleDates(r) {
  if (r.dateText) return r.dateText;
  return `${fmtYm(r.start)} – ${fmtYm(r.end)} · ${r.durationOverride || duration(r.start, r.end)}`;
}

function duration(start, end) {
  const s = parseYm(start);
  const now = new Date();
  const e = end ? parseYm(end) : { y: now.getFullYear(), m: now.getMonth() + 1 };
  const total = (e.y - s.y) * 12 + (e.m - s.m) + 1;
  const yrs = Math.floor(total / 12);
  const mos = total % 12;
  const parts = [];
  if (yrs) parts.push(`${yrs} yr${yrs > 1 ? "s" : ""}`);
  if (mos) parts.push(`${mos} mo${mos > 1 ? "s" : ""}`);
  return parts.join(" ") || "1 mo";
}

/* ==========================================================================
   Theme
   ========================================================================== */
const THEME_KEY = "theme";

function readTheme() {
  const fallback = APPEARANCE.defaultTheme || "system";
  try { return localStorage.getItem(THEME_KEY) || fallback; } catch { return fallback; }
}

function resolvedTheme() {
  const t = document.documentElement.getAttribute("data-theme");
  if (t === "light" || t === "dark") return t;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(choice) {
  if (choice === "light" || choice === "dark") document.documentElement.setAttribute("data-theme", choice);
  else document.documentElement.removeAttribute("data-theme");
  try { localStorage.setItem(THEME_KEY, choice); } catch { /* storage unavailable */ }
  document.querySelectorAll(".theme-toggle").forEach((group) => {
    const buttons = [...group.querySelectorAll("button")];
    buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.theme === choice)));
    group.style.setProperty("--active", Math.max(0, buttons.findIndex((b) => b.dataset.theme === choice)));
  });
}

/* Switch theme with a circular reveal that grows from the clicked button.
   Falls back to a colour cross-fade where View Transitions aren't supported. */
function setTheme(choice, origin) {
  const before = resolvedTheme();
  const willChange = () => {
    // resolve what the theme *would* be, without applying it
    if (choice === "light" || choice === "dark") return choice !== before;
    return (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") !== before;
  };

  if (REDUCED_MOTION || !willChange()) return applyTheme(choice);

  const root = document.documentElement;
  if (!document.startViewTransition || !origin) {
    root.classList.add("theme-fading");
    applyTheme(choice);
    setTimeout(() => root.classList.remove("theme-fading"), 450);
    return;
  }

  const r = origin.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  root.classList.add("theme-switching");
  const transition = document.startViewTransition(() => applyTheme(choice));
  transition.finished.catch(() => {}).finally(() => root.classList.remove("theme-switching"));
  transition.ready.then(() => {
    root.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 650, easing: "cubic-bezier(.65, 0, .35, 1)", pseudoElement: "::view-transition-new(root)" }
    );
  }).catch(() => { /* transition skipped (e.g. tab hidden); theme is still applied */ });
}

/* ==========================================================================
   Sidebar + mobile top bar
   ========================================================================== */
function renderChrome(page) {
  const navLink = (item, withIcon) => {
    const current = item.id === page ? ' aria-current="page"' : "";
    return `<li><a class="nav-link" href="${esc(safeUrl(item.href))}"${current}>
      <span class="nav-arrow" aria-hidden="true">→</span>
      ${withIcon ? icon(item.icon, "nav-icon") : ""}
      <span>${esc(item.label)}</span>
    </a></li>`;
  };

  const sidebar = document.getElementById("sidebar");
  sidebar.innerHTML = `
    <div class="sidebar-inner">
      <a class="brand brand-desktop" href="index.html"${page === "home" ? ' aria-current="page"' : ""}>${esc(SITE.name)}</a>
      <nav aria-label="Primary">
        <ul class="nav-group nav-icons">${NAV.withIcons.map((i) => navLink(i, true)).join("")}</ul>
        <ul class="nav-group nav-text">${NAV.textOnly.map((i) => navLink(i, false)).join("")}</ul>
      </nav>
      <div class="sidebar-divider" role="presentation"></div>
      <div class="theme-toggle" role="group" aria-label="Color theme">
        <span class="theme-thumb" aria-hidden="true"></span>
        <button type="button" data-theme="system" aria-label="Use system theme" title="System">${icon("monitor")}</button>
        <button type="button" data-theme="light" aria-label="Use light theme" title="Light">${icon("sun")}</button>
        <button type="button" data-theme="dark" aria-label="Use dark theme" title="Dark">${icon("moon")}</button>
      </div>
      <div class="sidebar-foot">
        <p>For work, collabs &amp; everything else, reach me at</p>
        <a class="mail-link" href="${esc(safeUrl("mailto:" + SITE.email))}">${icon("mail")}<span>${esc(SITE.email)}</span></a>
        <a class="mail-link" href="${esc(safeUrl(SITE.resume))}" target="_blank" rel="noopener">${icon("file-text")}<span>resume.pdf</span></a>
      </div>
    </div>`;

  // re-rendering (owner editor): replace the top bar and backdrop instead of adding more
  document.querySelector(".topbar")?.remove();
  document.querySelector(".backdrop")?.remove();
  const topbar = document.createElement("header");
  topbar.className = "topbar";
  topbar.innerHTML = `
    <a class="brand" href="index.html">${esc(SITE.name)}</a>
    <button type="button" class="menu-btn" aria-controls="sidebar" aria-expanded="false" aria-label="Open menu">
      ${icon("menu", "icon-open")}${icon("x", "icon-close")}
    </button>`;
  sidebar.before(topbar);

  const backdrop = document.createElement("div");
  backdrop.className = "backdrop";
  sidebar.after(backdrop);

  // theme toggle
  sidebar.querySelectorAll(".theme-toggle button").forEach((b) =>
    b.addEventListener("click", () => setTheme(b.dataset.theme, b))
  );
  applyTheme(readTheme());

  // mobile drawer
  const btn = topbar.querySelector(".menu-btn");
  const setOpen = (open) => {
    document.body.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", String(open));
    btn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  btn.addEventListener("click", () => setOpen(!document.body.classList.contains("menu-open")));
  backdrop.addEventListener("click", () => setOpen(false));
  if (!renderChrome.bound) document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
      const current = document.querySelector(".menu-btn"); // the live button, even after a re-render
      document.body.classList.remove("menu-open");
      current.setAttribute("aria-expanded", "false");
      current.setAttribute("aria-label", "Open menu");
      current.focus();
    }
  });
  if (!renderChrome.bound) window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => e.matches && document.body.classList.remove("menu-open"));
  renderChrome.bound = true;
}

function renderPageHeader(page) {
  const el = document.querySelector('[data-render="page-header"]');
  const data = PAGES[page];
  if (!el || !data) return;
  el.innerHTML = `<h1 class="page-title" aria-label="${esc(data.title)}"><span class="prompt" aria-hidden="true">~/</span><span class="title-text" aria-hidden="true"></span><span class="caret" aria-hidden="true"></span></h1>
    <p class="page-intro reveal">${esc(data.intro)}</p>`;
  typeText(el.querySelector(".title-text"), data.title);
}

/* ==========================================================================
   Motion helpers
   ========================================================================== */
// Types text into a node one character at a time
function typeText(node, text, speed = 45) {
  if (REDUCED_MOTION || document.documentElement.dataset.editing) {
    node.textContent = text;
    return;
  }
  let n = 0;
  const timer = setInterval(() => {
    node.textContent = text.slice(0, ++n);
    if (n >= text.length) clearInterval(timer);
  }, speed);
}

// Runs a DOM update inside a view transition. The promise settles once the
// transition has finished, or was skipped (e.g. background tab) with the update still applied.
function viewTransition(update) {
  const t = document.startViewTransition(update);
  t.ready.catch(() => {});
  return t.finished.catch(() => {});
}

// Counts a number up from 0; node needs data-count and optional data-suffix
function countUp(node, delay = 0) {
  const to = Number(node.dataset.count);
  const suffix = node.dataset.suffix || "";
  const duration = 900;
  setTimeout(() => {
    const start = performance.now();
    const timer = setInterval(() => {
      const p = Math.min(1, (performance.now() - start) / duration);
      node.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))) + suffix;
      if (p === 1) clearInterval(timer);
    }, 40);
  }, delay);
}

/* ==========================================================================
   Home
   ========================================================================== */
function renderHome() {
  const hero = document.getElementById("hero");
  hero.innerHTML = `
    <figure class="portrait reveal" data-reveal="wipe">
      <img src="${esc(safeUrl(SITE.portrait.src))}" alt="${esc(SITE.portrait.alt)}" width="900" height="900" />
    </figure>
    <div>
      ${SITE.status && SITE.statusVisible !== false ? `<p class="status reveal"><span class="status-dot" aria-hidden="true"></span>${esc(SITE.status)}</p>` : ""}
      <h1 class="hero-name reveal">${esc(SITE.name)}</h1>
      <div class="hero-intro">${SITE.intro.map((p) => `<p class="reveal">${esc(p)}</p>`).join("")}</div>
      <div class="social reveal">
        ${SITE.social
          .map((s) => {
            const ext = s.href.startsWith("http") || s.href.endsWith(".pdf") ? ' target="_blank" rel="noopener noreferrer"' : "";
            return `<a class="ext" href="${esc(safeUrl(s.href))}"${ext}>${esc(s.label)}</a>`;
          })
          .join("")}
      </div>
    </div>`;

  // home sections, in the order and with the visibility set in CONTENT.home
  const sections = HOME.sections && HOME.sections.length ? HOME.sections : [
    { id: "stats" }, { id: "contrib" }, { id: "projects" }, { id: "creative" }, { id: "experience" }, { id: "stack" },
  ];
  const setting = (id) => sections.find((x) => x.id === id) || { visible: false };
  const isOn = (id) => setting(id).visible !== false;
  const count = (id, fallback) => Number(setting(id).count) || fallback;

  const stats = document.getElementById("stats");
  stats.hidden = !isOn("stats") || !STATS.length;
  stats.innerHTML = STATS.map((s) => {
    const m = /^(\d+)(\+?)$/.exec(s.value); // plain numbers count up
    const value = m ? `<span data-count="${m[1]}" data-suffix="${m[2]}">${esc(s.value)}</span>` : esc(s.value);
    return `<a class="stat reveal" href="${esc(safeUrl(s.href))}" aria-label="${esc(s.value)} ${esc(s.label)}">
      <div class="stat-value">${value}<sup aria-hidden="true">↗</sup></div>
      <div class="stat-label">${esc(s.label)}</div>
    </a>`;
  }).join("");
  if (!REDUCED_MOTION && !document.documentElement.dataset.editing) {
    stats.querySelectorAll(".stat").forEach((stat) => {
      const num = stat.querySelector("[data-count]");
      if (!num) return;
      num.textContent = `0${num.dataset.suffix}`;
      stat.addEventListener("reveal", () => countUp(num, Number(stat.style.getPropertyValue("--i")) * 70), { once: true });
    });
  }

  const divider = document.querySelector(".dot-divider");
  document.getElementById("contrib")?.remove(); // when re-rendering
  if (divider) {
    divider.classList.add("reveal");
    divider.dataset.reveal = "draw";
    divider.hidden = stats.hidden;
    if (isOn("contrib")) renderContributions(divider);
  }

  const section = (num, title, href, body) => `
    <section class="preview" aria-labelledby="pv-${title}">
      <div class="preview-head reveal">
        <h2 class="preview-title" id="pv-${title}">${num} — ${title}</h2>
        <a class="view-all" href="${href}">View all →</a>
      </div>
      ${body}
    </section>`;

  const bodies = {
    projects: () =>
      PROJECTS.slice(0, count("projects", 3))
        .map(
          (p) => `<a class="preview-row reveal" href="projects.html#${esc(p.id)}">
          <div><div class="preview-row-title">${esc(p.name)}${p.subtitle ? ` — ${esc(p.subtitle)}` : ""}</div>
          <div class="preview-row-sub">${esc(p.description)}</div></div>
          <div class="preview-row-meta">${esc((p.badge || "").toLowerCase())}</div>
        </a>`
        )
        .join(""),
    creative: () =>
      `<div class="strip">${CREATIVE.filter((w) => w.featured)
        .slice(0, count("creative", 4))
        .map((w) => {
          const cat = CREATIVE_CATEGORIES.find((c) => c.id === w.category) || { singular: "" };
          return `<a class="strip-item reveal" data-reveal="pop" href="creative.html#${esc(w.id)}" aria-label="${esc(w.title)}, ${esc(cat.singular)}">
            <span class="work-media">${workMedia(w)}</span>
            <span class="strip-cap">${esc(cat.singular)}</span>
          </a>`;
        })
        .join("")}</div>`,
    experience: () =>
      EXPERIENCE.slice(0, count("experience", 3))
        .map((x) => {
          const r = x.roles[0] || {};
          return `<a class="preview-row reveal" href="experience.html#${esc(x.id)}">
          <div><div class="preview-row-title">${esc(x.org)}</div>
          <div class="preview-row-sub">${esc(r.title || "")}</div></div>
          <div class="preview-row-meta">${esc(r.dateText || (r.start ? `${fmtYm(r.start)} – ${r.end ? fmtYm(r.end) : "now"}` : "")).toLowerCase()}</div>
        </a>`;
        })
        .join(""),
    stack: () =>
      `<div class="preview-chips tag-list" data-stagger>${STACK.slice(0, count("stack", 3))
        .flatMap((g) => g.items.slice(0, 3))
        .map((t) => `<span class="tag">${esc(t)}</span>`)
        .join("")}</div>`,
  };
  const pages = { projects: "projects.html", creative: "creative.html", experience: "experience.html", stack: "stack.html" };

  let n = 0;
  document.getElementById("previews").innerHTML = sections
    .filter((x) => bodies[x.id] && x.visible !== false)
    .map((x) => section(String(++n).padStart(2, "0"), x.id, pages[x.id], bodies[x.id]()))
    .join("");
}

/* ==========================================================================
   GitHub contributions (home)
   ========================================================================== */
const ymd = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

// Live numbers as { "YYYY-MM-DD": [count, level] }, or null if the service can't be reached
async function loadContributions() {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 4000);
  try {
    const res = await fetch(`${CONTRIB_API}${SITE.githubUser}?y=last`, { signal: ctrl.signal });
    if (!res.ok) throw new Error(`status ${res.status}`);
    const data = await res.json();
    const days = {};
    data.contributions.forEach((d) => {
      if (d.count > 0) days[d.date] = [d.count, d.level];
    });
    return days;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

function renderContributions(after) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  // first column starts on the Sunday (CONTRIB_WEEKS - 1) weeks before this week
  const start = new Date(today);
  start.setDate(start.getDate() - start.getDay() - (CONTRIB_WEEKS - 1) * 7);

  const dates = [];
  for (let i = 0; i < CONTRIB_WEEKS * 7; i++) {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    dates.push(d);
  }

  // month names sit above the first week that begins in that month
  const months = [];
  for (let w = 0; w < CONTRIB_WEEKS; w++) {
    const m = dates[w * 7].getMonth();
    if (w === 0 || m !== dates[(w - 1) * 7].getMonth()) months.push({ w, name: MONTHS[m] });
  }
  if (months.length > 1 && months[1].w < 3) months.shift(); // a partial first month would collide with the next

  const section = document.createElement("section");
  section.className = "contrib";
  section.id = "contrib";
  section.setAttribute("aria-labelledby", "contrib-title");
  section.setAttribute("data-watch", "");
  section.style.setProperty("--weeks", CONTRIB_WEEKS);
  section.innerHTML = `
    <div class="contrib-head reveal">
      <h2 class="label" id="contrib-title">GitHub contributions</h2>
      <a class="contrib-link ext" href="${esc(safeUrl(SITE.github))}" target="_blank" rel="noopener noreferrer">@${esc(SITE.githubUser)}</a>
    </div>
    <div class="contrib-body">
      <div class="contrib-months" aria-hidden="true">${months.map((m) => `<span style="grid-column:${m.w + 1}">${m.name}</span>`).join("")}</div>
      <div class="contrib-days" aria-hidden="true"><span>Mon</span><span>Wed</span><span>Fri</span></div>
      <div class="contrib-grid" role="img">
        ${dates
          .map((d, i) =>
            d > today
              ? `<span class="contrib-cell is-future"></span>`
              : `<span class="contrib-cell" data-date="${ymd(d)}" style="--w:${Math.floor(i / 7)};--dy:${i % 7}"></span>`
          )
          .join("")}
      </div>
    </div>
    <div class="contrib-foot reveal">
      <p class="contrib-total"></p>
      <div class="contrib-legend" aria-hidden="true">Less<i data-l="0"></i><i data-l="1"></i><i data-l="2"></i><i data-l="3"></i><i data-l="4"></i>More</div>
    </div>
    <div class="contrib-tip" aria-hidden="true"></div>`;
  after.after(section);

  const grid = section.querySelector(".contrib-grid");
  const cells = [...grid.querySelectorAll("[data-date]")];
  const tip = section.querySelector(".contrib-tip");
  const longDate = (key) => {
    const [y, m, d] = key.split("-").map(Number);
    return `${MONTHS[m - 1][0]}${MONTHS[m - 1].slice(1).toLowerCase()} ${d}, ${y}`;
  };
  const plural = (n) => `${n} contribution${n === 1 ? "" : "s"}`;

  // Paints the cells from { date: [count, level] }
  const paint = (days) => {
    let total = 0;
    let best = null;
    cells.forEach((cell) => {
      const [count, level] = days[cell.dataset.date] || [0, 0];
      cell.dataset.l = level;
      cell.dataset.count = count;
      total += count;
      if (count > 0 && (!best || count > best.count)) best = { count, date: cell.dataset.date };
    });
    section.querySelector(".contrib-total").innerHTML = `<strong>${total}</strong> ${total === 1 ? "contribution" : "contributions"} in the last 6 months`;
    grid.setAttribute(
      "aria-label",
      `GitHub contributions for ${SITE.githubUser}: ${total} in the last 6 months.` +
        (best ? ` Busiest day: ${plural(best.count)} on ${longDate(best.date)}.` : "")
    );
  };

  paint(CONTRIB_SNAPSHOT.days);
  loadContributions().then((days) => days && paint(days));

  // tooltip
  const hideTip = () => tip.classList.remove("is-on");
  grid.addEventListener("pointerover", (e) => {
    const cell = e.target.closest("[data-date]");
    if (!cell) return hideTip();
    const count = Number(cell.dataset.count);
    tip.textContent = `${count ? plural(count) : "No contributions"} · ${longDate(cell.dataset.date)}`;
    const box = section.getBoundingClientRect();
    const r = cell.getBoundingClientRect();
    const half = tip.offsetWidth / 2;
    const x = Math.min(Math.max(r.left + r.width / 2 - box.left, half), box.width - half); // stay inside the section
    tip.style.left = `${x}px`;
    tip.style.top = `${r.top - box.top}px`;
    tip.classList.add("is-on");
  });
  grid.addEventListener("pointerleave", hideTip);
  document.addEventListener("pointerdown", (e) => !grid.contains(e.target) && hideTip());
}

/* ==========================================================================
   Click pulse: a small ripple wherever empty space is clicked
   ========================================================================== */
function initPulse() {
  if (REDUCED_MOTION || APPEARANCE.clickPulse === false) return;
  const interactive =
    'a, button, input, textarea, select, label, summary, video, audio, dialog, [role="button"], [contenteditable], .contrib-cell';
  document.addEventListener("click", (e) => {
    if (e.button !== 0 || e.target.closest(interactive)) return;
    if (String(getSelection()).length) return; // finishing a text selection, not a click
    const live = document.querySelectorAll(".pulse");
    if (live.length >= 6) live[0].remove();

    const pulse = document.createElement("span");
    pulse.className = "pulse";
    pulse.setAttribute("aria-hidden", "true");
    pulse.style.left = `${e.clientX}px`;
    pulse.style.top = `${e.clientY}px`;
    pulse.innerHTML = "<i></i><i></i>";
    pulse.addEventListener("animationend", (ev) => ev.target === pulse.lastElementChild && pulse.remove());
    document.body.append(pulse);
  });
}

/* ==========================================================================
   Projects
   ========================================================================== */
function renderProjects() {
  const btn = (l) => {
    const isGh = l.type === "github";
    const text = l.label || (isGh ? "source" : "live demo");
    return `<a class="action-btn${isGh ? "" : " is-ghost"}" href="${esc(safeUrl(l.href))}"${l.href.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : ""}>
      ${icon(isGh ? "code-xml" : "arrow-up-right")}<span>${esc(text)}</span>
    </a>`;
  };

  document.getElementById("projects-list").innerHTML = PROJECTS.map(
    (p) => `
    <article class="project reveal" id="${p.id}" aria-labelledby="${p.id}-title">
      <div class="project-top">
        <div class="project-icon">
          ${p.image ? `<img src="${esc(safeUrl(p.image))}" alt="" />` : icon(p.icon)}
        </div>
        <div>
          <div class="badges" data-stagger>
            <span class="badge badge-filled"><span class="badge-dot" aria-hidden="true"></span>${esc(p.badge)}</span>
            ${p.tags.map((t) => `<span class="badge">${esc(t)}</span>`).join("")}
          </div>
          <h2 class="project-title" id="${p.id}-title">${esc(p.name)} — ${esc(p.subtitle)}</h2>
          <p class="project-desc">${esc(p.description)}</p>
          <div class="project-actions">
            ${p.links.length ? p.links.map(btn).join("") : `<span class="action-note">${icon("lock")}${esc(p.note || "Private project")}</span>`}
          </div>
        </div>
      </div>
      ${
        p.builtWith.length
          ? `<div class="project-foot" data-stagger><span class="label">Built with</span>${p.builtWith
              .map((t) => `<span class="built">${esc(t)}</span>`)
              .join("")}</div>`
          : ""
      }
    </article>`
  ).join("");
}

/* ==========================================================================
   Experience
   ========================================================================== */
function renderExperience() {
  const role = (r, key) => {
    const shown = r.skills.slice(0, r.visibleSkills);
    const extra = r.skills.slice(r.visibleSkills);
    return `<div class="role">
      <h3 class="role-title">${esc(r.title)}</h3>
      <p class="role-dates">${esc(roleDates(r))}</p>
      <p class="role-desc">${esc(r.description)}</p>
      <div class="tag-list" id="skills-${key}" data-stagger>
        ${shown.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}
        ${extra.map((s) => `<span class="tag is-extra" hidden>${esc(s)}</span>`).join("")}
        ${extra.length ? `<button type="button" class="tag tag-more" aria-expanded="false" aria-controls="skills-${key}">+${extra.length} skill${extra.length > 1 ? "s" : ""}</button>` : ""}
      </div>
    </div>`;
  };

  document.getElementById("timeline").innerHTML = EXPERIENCE.map(
    (x) => `
    <article class="tl-item" id="${x.id}" data-watch>
      <div class="tl-mark" aria-hidden="true">${esc(x.initials)}</div>
      <div class="tl-body">
        <h2 class="tl-org">${esc(x.org)}</h2>
        ${x.type ? `<p class="tl-meta">${esc(x.type)}</p>` : ""}
        ${x.location ? `<p class="tl-loc">${esc(x.location)}</p>` : ""}
        ${x.roles.map((r, i) => role(r, `${x.id}-${i}`)).join("")}
      </div>
    </article>`
  ).join("");

  document.querySelectorAll(".tag-more").forEach((b) =>
    b.addEventListener("click", () => {
      const list = b.closest(".tag-list");
      const extras = [...list.querySelectorAll(".is-extra")];
      extras.forEach((t, n) => {
        t.style.setProperty("--n", n); // pop in one after another
        t.hidden = false;
      });
      b.setAttribute("aria-expanded", "true");
      b.remove();
      if (extras[0]) {
        extras[0].tabIndex = -1;
        extras[0].focus({ preventScroll: true });
      }
    })
  );
}

/* ==========================================================================
   Stack
   ========================================================================== */
function renderStack() {
  document.getElementById("stack-list").innerHTML = STACK.map(
    (g, i) => `
    <section class="stack-group" aria-labelledby="stack-${i}">
      <h2 class="label reveal" id="stack-${i}">${esc(g.category)}</h2>
      <ul class="tag-list" data-stagger style="--d:${Math.min(i, 4) * 90}ms;--step:25ms">${g.items.map((t) => `<li class="tag">${esc(t)}</li>`).join("")}</ul>
    </section>`
  ).join("");
}

/* ==========================================================================
   Gear
   ========================================================================== */
function renderGear() {
  document.getElementById("gear-grid").innerHTML = GEAR.map(
    (g) => `
    <article class="gear-card reveal">
      <div class="gear-media">
        ${g.image ? `<img src="${esc(safeUrl(g.image))}" alt="${esc(g.name)}" loading="lazy" />` : icon(g.icon)}
      </div>
      <h2 class="gear-name">${esc(g.name)}</h2>
      <p class="gear-spec">${esc(g.spec)}</p>
    </article>`
  ).join("");
}

/* ==========================================================================
   Credentials
   ========================================================================== */
function renderCredentials() {
  const roleCount = LEADERSHIP.reduce((n, g) => n + g.roles.length, 0);
  const summary = [
    { value: roleCount, label: "Leadership roles" },
    { value: LEADERSHIP.length, label: "Organizations" },
    { value: AWARDS.length, label: "Academic awards" },
  ];

  document.getElementById("credentials-root").innerHTML = `
    <div class="stats cred-stats">
      ${summary
        .map(
          (s) => `<div class="stat reveal" aria-label="${s.value} ${esc(s.label)}">
            <div class="stat-value"><span data-count="${s.value}" data-suffix="">${s.value}</span></div>
            <div class="stat-label">${esc(s.label)}</div>
          </div>`
        )
        .join("")}
    </div>

    <section class="cred-section" aria-labelledby="cred-leadership">
      <h2 class="label reveal" id="cred-leadership">Leadership</h2>
      <div class="timeline">
        ${LEADERSHIP.map(
          (g) => `
          <article class="tl-item" data-watch>
            <div class="tl-mark" aria-hidden="true">${esc(g.initials)}</div>
            <div class="tl-body">
              <h3 class="tl-org">${esc(g.org)}</h3>
              <p class="tl-meta">${g.roles.length} ${g.roles.length === 1 ? "role" : "roles"}</p>
              <ul class="cred-roles" data-stagger style="--step:60ms">
                ${g.roles.map((r) => `<li>${esc(r)}</li>`).join("")}
              </ul>
            </div>
          </article>`
        ).join("")}
      </div>
    </section>

    <section class="cred-section" aria-labelledby="cred-awards">
      <h2 class="label reveal" id="cred-awards">Academic awards</h2>
      <ul class="cred-awards">
        ${AWARDS.map(
          (a) => `<li class="cred-award reveal" data-reveal="pop">
            ${icon("award", "cred-award-icon")}
            <span class="cred-award-title">${esc(a.title)}</span>
            <span class="cred-award-detail">${esc(a.detail)}</span>
          </li>`
        ).join("")}
      </ul>
    </section>`;

  // the summary numbers count up as they appear
  if (!REDUCED_MOTION && !document.documentElement.dataset.editing) {
    document.querySelectorAll(".cred-stats .stat").forEach((stat) => {
      const num = stat.querySelector("[data-count]");
      num.textContent = "0";
      stat.addEventListener("reveal", () => countUp(num, Number(stat.style.getPropertyValue("--i")) * 70), { once: true });
    });
  }
}

/* ==========================================================================
   Certifications
   ========================================================================== */
function renderCertifications() {
  document.getElementById("cert-list").innerHTML = CERTIFICATIONS.map(
    (c) => `
    <article class="tl-item" data-watch>
      <div class="tl-mark" aria-hidden="true">${esc(c.initials)}</div>
      <div class="tl-body">
        <h2 class="tl-org">${esc(c.name)}</h2>
        <p class="tl-meta">${esc(c.issuer)}</p>
        ${c.date ? `<p class="role-dates">Issued ${fmtYm(c.date)}</p>` : ""}
        ${c.href ? `<a class="cred-link ext" href="${esc(safeUrl(c.href))}" target="_blank" rel="noopener noreferrer">view credential</a>` : ""}
      </div>
    </article>`
  ).join("");
}

/* ==========================================================================
   Creative
   ========================================================================== */
// "16:9" -> [16, 9]
const ratioParts = (item) => {
  const [w, h] = String(item.ratio || "1:1").split(":").map(Number);
  return w > 0 && h > 0 ? [w, h] : [1, 1];
};
const ratioOf = (item) => ratioParts(item)[0] / ratioParts(item)[1];

// Generated monochrome artwork shown until a work has a real image
function placeholderArt(item) {
  const [rw, rh] = ratioParts(item);
  const W = 400;
  const H = Math.round((W * rh) / rw);
  const S = Math.min(W, H);
  const f = (v) => Math.round(v * 10) / 10;
  const v = CREATIVE.filter((w) => w.category === item.category).indexOf(item) % 3; // 3 looks per category
  let art = "";

  if (item.category === "pubmat") {
    // poster mock: shape, headline bars, body copy lines
    const m = S * 0.12;
    const bar = H * 0.055;
    if (v === 0) {
      art = `<circle cx="${f(W * 0.66)}" cy="${f(H * 0.32)}" r="${f(S * 0.24)}" fill="currentColor" fill-opacity=".14"/>
        <rect x="${f(m)}" y="${f(H * 0.58)}" width="${f(W * 0.56)}" height="${f(bar)}" fill="currentColor" stroke="none"/>
        <rect x="${f(m)}" y="${f(H * 0.58 + bar * 1.4)}" width="${f(W * 0.4)}" height="${f(bar)}" fill="currentColor" stroke="none"/>
        <path d="M${f(m)} ${f(H * 0.8)}h${f(W * 0.34)}M${f(m)} ${f(H * 0.84)}h${f(W * 0.46)}M${f(m)} ${f(H * 0.88)}h${f(W * 0.24)}"/>`;
    } else if (v === 1) {
      art = `<path d="M0 ${H}L${W} ${f(H * 0.42)}V${H}Z" fill="currentColor" fill-opacity=".12"/>
        <rect x="${f(m)}" y="${f(H * 0.17)}" width="${f(W * 0.62)}" height="${f(bar)}" fill="currentColor" stroke="none"/>
        <rect x="${f(m)}" y="${f(H * 0.17 + bar * 1.4)}" width="${f(W * 0.46)}" height="${f(bar)}" fill="currentColor" stroke="none"/>
        <rect x="${f(m)}" y="${f(H * 0.17 + bar * 2.8)}" width="${f(W * 0.3)}" height="${f(bar)}" fill="currentColor" stroke="none"/>
        <circle cx="${f(W - m - S * 0.1)}" cy="${f(H - m - S * 0.1)}" r="${f(S * 0.1)}"/>
        <path d="M${f(m)} ${f(H * 0.56)}h${f(W * 0.3)}M${f(m)} ${f(H * 0.6)}h${f(W * 0.22)}"/>`;
    } else {
      art = `<rect x="${f(m)}" y="${f(H * 0.16)}" width="${f(W - m * 2)}" height="${f(H * 0.42)}" fill="currentColor" fill-opacity=".1"/>
        <path d="M${f(m)} ${f(H * 0.58)}L${f(W * 0.5)} ${f(H * 0.28)}L${f(W - m)} ${f(H * 0.58)}"/>
        <rect x="${f(m)}" y="${f(H * 0.68)}" width="${f(W * 0.5)}" height="${f(bar)}" fill="currentColor" stroke="none"/>
        <path d="M${f(m)} ${f(H * 0.8)}h${f(W - m * 2)}M${f(m)} ${f(H * 0.84)}h${f(W * 0.5)}"/>
        <rect x="${f(W - m - S * 0.18)}" y="${f(H * 0.675)}" width="${f(S * 0.18)}" height="${f(S * 0.07)}" rx="${f(S * 0.035)}"/>`;
    }
  } else if (item.category === "design") {
    // vector artboard: guides, construction circles, a path with anchor points
    const cx = W / 2;
    const cy = H / 2;
    const r = S * 0.3;
    const a = 7;
    const anchor = (x, y) => `<rect x="${f(x - a / 2)}" y="${f(y - a / 2)}" width="${a}" height="${a}" fill="currentColor" stroke="none"/>`;
    const guides = `<path d="M${cx} 0V${H}M0 ${cy}H${W}" stroke-opacity=".3" stroke-dasharray="4 6"/>`;
    if (v === 0) {
      art = `${guides}<circle cx="${cx}" cy="${cy}" r="${f(r)}"/><circle cx="${cx}" cy="${cy}" r="${f(r * 0.62)}" fill="currentColor" fill-opacity=".12"/>
        <path d="M${f(cx - r)} ${cy}C${f(cx - r)} ${f(cy - r * 1.2)} ${f(cx + r)} ${f(cy + r * 1.2)} ${f(cx + r)} ${cy}"/>
        ${anchor(cx - r, cy)}${anchor(cx + r, cy)}${anchor(cx, cy)}`;
    } else if (v === 1) {
      const p = [0, 1, 2, 3, 4, 5].map((k) => `${f(cx + r * Math.cos((Math.PI / 3) * k - Math.PI / 2))},${f(cy + r * Math.sin((Math.PI / 3) * k - Math.PI / 2))}`);
      art = `${guides}<polygon points="${p.join(" ")}" fill="currentColor" fill-opacity=".1"/>
        <polygon points="${p[0]} ${p[2]} ${p[4]}"/><circle cx="${cx}" cy="${cy}" r="${f(r * 0.28)}" fill="currentColor" stroke="none"/>
        ${p.map((pt) => anchor(...pt.split(",").map(Number))).join("")}`;
    } else {
      art = `${guides}<rect x="${f(cx - r)}" y="${f(cy - r)}" width="${f(r * 2)}" height="${f(r * 2)}" rx="${f(r * 0.4)}"/>
        <path d="M${f(cx - r * 0.5)} ${f(cy + r * 0.5)}V${f(cy - r * 0.5)}L${cx} ${f(cy + r * 0.1)}L${f(cx + r * 0.5)} ${f(cy - r * 0.5)}V${f(cy + r * 0.5)}" stroke-width="3"/>
        ${anchor(cx - r, cy - r)}${anchor(cx + r, cy - r)}${anchor(cx - r, cy + r)}${anchor(cx + r, cy + r)}`;
    }
  } else {
    // 3D viewport: floor grid plus a wireframe solid
    const cx = W / 2;
    const cy = H * 0.52;
    const s = S * 0.26;
    const k = 0.866;
    const cube = (x, y, e) => `<polygon points="${f(x)},${f(y - e)} ${f(x + e * k)},${f(y - e / 2)} ${f(x)},${f(y)} ${f(x - e * k)},${f(y - e / 2)}" fill="currentColor" fill-opacity=".05"/>
      <polygon points="${f(x - e * k)},${f(y - e / 2)} ${f(x)},${f(y)} ${f(x)},${f(y + e)} ${f(x - e * k)},${f(y + e / 2)}" fill="currentColor" fill-opacity=".14"/>
      <polygon points="${f(x + e * k)},${f(y - e / 2)} ${f(x)},${f(y)} ${f(x)},${f(y + e)} ${f(x + e * k)},${f(y + e / 2)}" fill="currentColor" fill-opacity=".26"/>`;
    // isometric floor: point (u, v) on the ground plane, centred under the solid
    const e = s * 0.55;
    const ground = (u, w) => `${f(cx + (u - w) * k * e)} ${f(cy + s + (u + w) * 0.5 * e)}`;
    const lines = [-2, -1, 0, 1, 2].map((g) => `M${ground(g, -2)}L${ground(g, 2)}M${ground(-2, g)}L${ground(2, g)}`).join("");
    const grid = `<path d="${lines}" stroke-opacity=".3" stroke-width="1"/>`;
    if (v === 0) {
      art = `${grid}${cube(cx, cy, s)}`;
    } else if (v === 1) {
      art = `${grid}<circle cx="${cx}" cy="${f(cy)}" r="${f(s)}" fill="currentColor" fill-opacity=".08"/>
        <ellipse cx="${cx}" cy="${f(cy)}" rx="${f(s)}" ry="${f(s * 0.34)}"/><ellipse cx="${cx}" cy="${f(cy)}" rx="${f(s * 0.34)}" ry="${f(s)}"/>
        <ellipse cx="${cx}" cy="${f(cy - s * 0.5)}" rx="${f(s * 0.866)}" ry="${f(s * 0.29)}" stroke-opacity=".5"/><ellipse cx="${cx}" cy="${f(cy + s * 0.5)}" rx="${f(s * 0.866)}" ry="${f(s * 0.29)}" stroke-opacity=".5"/>
        <ellipse cx="${cx}" cy="${f(cy)}" rx="${f(s * 0.72)}" ry="${f(s)}" stroke-opacity=".5"/>`;
    } else {
      art = `${grid}${cube(cx - s * 0.6, cy + s * 0.38, s * 0.6)}${cube(cx + s * 0.45, cy + s * 0.15, s * 0.82)}${cube(cx + s * 0.45, cy - s * 0.67, s * 0.42)}`;
    }
  }

  return `<svg class="ph-art" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMid slice" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true">${art}</svg>`;
}

// YouTube / Vimeo links → their embeddable player URL (null for anything else)
function videoEmbed(url) {
  const u = String(url || "");
  const yt = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([\w-]{11})/.exec(u);
  if (yt) return `https://www.youtube-nocookie.com/embed/${yt[1]}`;
  const vimeo = /vimeo\.com\/(?:video\/)?(\d+)/.exec(u);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null;
}

// The picture for a work. In the grid: its thumbnail. Opened (full): the full image,
// or the video player. Without an image: generated placeholder art.
function workMedia(item, { full = false, alt = "" } = {}) {
  if (!item.image) return `<span class="ph">${placeholderArt(item)}<span class="ph-tag">placeholder</span></span>`;
  if (full && item.video) {
    const embed = videoEmbed(item.video);
    if (embed) {
      return `<iframe src="${esc(embed)}" title="${esc(alt)}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen loading="lazy"></iframe>`;
    }
    return `<video src="${esc(safeUrl(item.video))}" poster="${esc(safeUrl(item.image))}" controls playsinline preload="metadata" aria-label="${esc(alt)}"></video>`;
  }
  const src = full ? item.image : item.thumb || item.image;
  return `<img src="${esc(safeUrl(src))}" alt="${esc(alt)}" ${full ? "" : 'loading="lazy" '}/>`;
}

function renderCreative() {
  const root = document.getElementById("creative-root");
  const html = document.documentElement;
  const cats = Object.fromEntries(CREATIVE_CATEGORIES.map((c) => [c.id, c]));
  const pad = (n) => String(n).padStart(2, "0");
  const filters = [{ id: "all", label: "All", short: "All" }, ...CREATIVE_CATEGORIES];
  const total = (id) => (id === "all" ? CREATIVE.length : CREATIVE.filter((w) => w.category === id).length);
  const meta = (w) => [cats[w.category].singular, w.year].filter(Boolean).join(" · ");

  const reel = CREATIVE.map((w) => `<span class="reel-item" style="--ar:${ratioOf(w)}">${workMedia(w)}</span>`).join("");

  root.innerHTML = `
    <div class="reel reveal" aria-hidden="true">
      <div class="reel-track"><div class="reel-list">${reel}</div><div class="reel-list">${reel}</div></div>
    </div>

    <div class="filter-row reveal">
      <div class="filter" role="group" aria-label="Filter work by type">
        <span class="filter-thumb" aria-hidden="true"></span>
        ${filters
          .map(
            (c) => `<button type="button" data-filter="${c.id}" aria-pressed="${c.id === "all"}">
              <span class="filter-full">${esc(c.label)}</span><span class="filter-short">${esc(c.short)}</span><span class="filter-count">${total(c.id)}</span>
            </button>`
          )
          .join("")}
      </div>
      <p class="filter-status" aria-live="polite"></p>
    </div>

    <div class="works-wrap">
      <ul class="works" id="works">
        ${CREATIVE.map(
          (w, n) => `<li class="work reveal" data-reveal="pop" id="${w.id}" data-cat="${w.category}" style="--ar:${ratioOf(w)};--vt:w-${w.id}">
            <button type="button" class="work-btn" aria-haspopup="dialog" aria-label="${w.video ? "Play" : "View"} ${esc(w.title)}, ${esc(cats[w.category].singular)}">
              <span class="work-media">${workMedia(w)}</span>
              ${w.video ? `<span class="work-play" aria-hidden="true">${icon("play")}</span>` : ""}
              <span class="work-num" aria-hidden="true">${pad(n + 1)}</span>
              <span class="work-cap"><span class="work-title">${esc(w.title)}</span><span class="work-meta">${esc(meta(w))}</span></span>
            </button>
          </li>`
        ).join("")}
      </ul>
    </div>

    <dialog class="lightbox" id="lightbox" aria-labelledby="lb-title">
      <div class="lb-panel">
        <div class="lb-stage"><div class="lb-media"></div></div>
        <div class="lb-info">
          <p class="lb-count" aria-live="polite"></p>
          <h2 class="lb-title" id="lb-title"></h2>
          <p class="lb-cat label"></p>
          <p class="lb-desc"></p>
          <ul class="tag-list lb-tools"></ul>
          <div class="lb-nav">
            <button type="button" class="lb-btn" data-dir="-1" aria-label="Previous work">${icon("arrow-left")}</button>
            <button type="button" class="lb-btn" data-dir="1" aria-label="Next work">${icon("arrow-right")}</button>
          </div>
        </div>
        <button type="button" class="lb-close" aria-label="Close">${icon("x")}</button>
      </div>
    </dialog>`;

  const filter = root.querySelector(".filter");
  const buttons = [...filter.querySelectorAll("button")];
  const status = root.querySelector(".filter-status");
  const grid = root.querySelector(".works");
  const tiles = [...grid.children];
  const dialog = root.querySelector(".lightbox");
  const panel = dialog.querySelector(".lb-panel");
  const media = dialog.querySelector(".lb-media");
  const canMorph = !REDUCED_MOTION && !!document.startViewTransition;

  /* ----- filter ----- */
  const moveThumb = () => {
    const active = filter.querySelector('[aria-pressed="true"]');
    filter.style.setProperty("--x", `${active.offsetLeft}px`);
    filter.style.setProperty("--w", `${active.offsetWidth}px`);
  };

  const applyFilter = (id, animate = true) => {
    const update = () => {
      tiles.forEach((li) => (li.hidden = id !== "all" && li.dataset.cat !== id));
      buttons.forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.filter === id)));
      moveThumb();
      const n = total(id);
      status.textContent = `${pad(n)} ${n === 1 ? "work" : "works"}`;
    };
    if (!animate || REDUCED_MOTION) return update();

    // entry animations are done once filtering starts; tiles now move as a group
    tiles.forEach((li) => li.classList.remove("reveal", "is-visible"));
    if (!document.startViewTransition) {
      update();
      tiles.filter((li) => !li.hidden).forEach((li, k) => {
        li.style.setProperty("--k", Math.min(k, 8));
        li.classList.remove("flash");
        void li.offsetWidth; // restart the animation
        li.classList.add("flash");
      });
      return;
    }
    html.classList.add("vt-works");
    viewTransition(update).finally(() => html.classList.remove("vt-works"));
  };

  buttons.forEach((b) => b.addEventListener("click", () => b.getAttribute("aria-pressed") !== "true" && applyFilter(b.dataset.filter)));
  applyFilter("all", false);
  window.addEventListener("resize", moveThumb);
  document.fonts?.ready.then(moveThumb);

  /* ----- pointer tilt ----- */
  if (!REDUCED_MOTION && matchMedia("(hover: hover) and (pointer: fine)").matches) {
    grid.addEventListener("pointermove", (e) => {
      const btn = e.target.closest(".work-btn");
      if (!btn) return;
      const r = btn.getBoundingClientRect();
      btn.style.setProperty("--ry", `${(((e.clientX - r.left) / r.width - 0.5) * 9).toFixed(2)}deg`);
      btn.style.setProperty("--rx", `${(((e.clientY - r.top) / r.height - 0.5) * -9).toFixed(2)}deg`);
    });
    grid.addEventListener("pointerout", (e) => {
      const btn = e.target.closest(".work-btn");
      if (!btn || btn.contains(e.relatedTarget)) return;
      btn.style.removeProperty("--rx");
      btn.style.removeProperty("--ry");
    });
  }

  /* ----- lightbox ----- */
  let current = null;
  const shown = () => tiles.filter((li) => !li.hidden).map((li) => CREATIVE.find((w) => w.id === li.id));
  const tileMedia = (w) => document.getElementById(w.id)?.querySelector(".work-media");

  const fill = (w) => {
    current = w;
    const list = shown();
    media.style.setProperty("--ar", ratioOf(w));
    media.innerHTML = workMedia(w, { full: true, alt: w.alt || w.title });
    dialog.querySelector(".lb-count").textContent = `${pad(list.indexOf(w) + 1)} / ${pad(list.length)}`;
    dialog.querySelector(".lb-title").textContent = w.title;
    dialog.querySelector(".lb-cat").textContent = meta(w);
    dialog.querySelector(".lb-desc").textContent =
      w.description || (w.image ? "" : "Placeholder piece. The real work, with a short note about it, goes here.");
    dialog.querySelector(".lb-tools").innerHTML = w.tools.map((t) => `<li class="tag">${esc(t)}</li>`).join("");
    dialog.querySelectorAll(".lb-btn").forEach((b) => (b.disabled = list.length < 2));
  };

  // Runs `update` inside a view transition that morphs `from` into `to`
  const morph = (from, to, update) => {
    if (!canMorph || !from || !to) return update();
    from.style.viewTransitionName = "work-hero";
    viewTransition(() => {
      from.style.viewTransitionName = "";
      update();
      to.style.viewTransitionName = "work-hero";
    }).finally(() => (to.style.viewTransitionName = ""));
  };

  const open = (w, animate = true) => {
    const show = () => {
      fill(w);
      dialog.showModal();
      history.replaceState(null, "", `#${w.id}`);
    };
    const from = animate && canMorph ? tileMedia(w) : null;
    dialog.classList.toggle("is-plain", !from); // no morph available: the panel pops in instead
    from ? morph(from, media, show) : show();
  };

  const close = () => {
    if (!dialog.open) return;
    const w = current;
    const done = () => {
      dialog.close();
      media.innerHTML = ""; // also stops a playing video
      history.replaceState(null, "", location.pathname + location.search);
    };
    morph(media, w && tileMedia(w), done);
  };

  const step = (dir) => {
    const list = shown();
    if (list.length < 2) return;
    const next = list[(list.indexOf(current) + dir + list.length) % list.length];
    panel.dataset.dir = dir;
    panel.classList.remove("is-swapping");
    void panel.offsetWidth; // restart the animation
    fill(next);
    panel.classList.add("is-swapping");
    history.replaceState(null, "", `#${next.id}`);
  };

  grid.addEventListener("click", (e) => {
    const li = e.target.closest(".work");
    if (li) open(CREATIVE.find((w) => w.id === li.id));
  });
  dialog.querySelector(".lb-close").addEventListener("click", close);
  dialog.querySelectorAll(".lb-btn").forEach((b) => b.addEventListener("click", () => step(Number(b.dataset.dir))));
  dialog.addEventListener("click", (e) => e.target === dialog && close()); // click outside the panel
  dialog.addEventListener("cancel", (e) => {
    e.preventDefault(); // Esc: close with the same animation
    close();
  });
  dialog.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });

  // swipe left / right on the picture to move between works
  const stage = dialog.querySelector(".lb-stage");
  let swipe = null;
  stage.addEventListener("pointerdown", (e) => {
    if (e.pointerType !== "mouse") swipe = { x: e.clientX, y: e.clientY };
  });
  stage.addEventListener("pointerup", (e) => {
    if (!swipe) return;
    const dx = e.clientX - swipe.x;
    const dy = e.clientY - swipe.y;
    swipe = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
  });
  stage.addEventListener("pointercancel", () => (swipe = null));

  // creative.html#<id> opens that work
  const linked = CREATIVE.find((w) => w.id === decodeURIComponent(location.hash.slice(1)));
  if (linked) open(linked, false);
}

/* ==========================================================================
   Scroll reveal
   .reveal        the element animates in (variant set by data-reveal)
   [data-stagger] its direct children animate in one after another
   [data-watch]   only gets .is-visible; its CSS decides what moves
   ========================================================================== */
function initReveal() {
  document.querySelectorAll("[data-stagger]").forEach((group) =>
    [...group.children].forEach((child, n) => child.style.setProperty("--n", n))
  );

  const els = document.querySelectorAll(".reveal, [data-stagger], [data-watch]");
  if (REDUCED_MOTION || !("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      let i = 0; // elements that appear together are staggered
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const el = e.target;
        if (!el.hasAttribute("data-stagger")) el.style.setProperty("--i", Math.min(i++, 8));
        el.classList.add("is-visible");
        el.dispatchEvent(new CustomEvent("reveal"));
        io.unobserve(el);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  els.forEach((el) => io.observe(el));
}

/* ==========================================================================
   Boot
   ========================================================================== */
/* ==========================================================================
   Owner access
   Long-press the "Makheyl" name (about a second) to reach the owner sign-in.
   Visitors never load the editor: it loads only after the server confirms
   the GitHub sign-in (see api/auth/*).
   ========================================================================== */
function showOwnerPrompt() {
  if (document.querySelector(".owner-prompt")) return;
  const back = location.pathname + location.search;
  const box = document.createElement("div");
  box.className = "owner-prompt";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-label", "Owner sign-in");
  box.innerHTML = `
    <p class="owner-prompt-title">Owner sign-in</p>
    <p class="owner-prompt-text">Editing is limited to the site owner's GitHub account.</p>
    <div class="owner-prompt-actions">
      <a class="action-btn" href="/api/auth/login?return=${encodeURIComponent(back)}">${icon("log-in")}<span>Continue with GitHub</span></a>
      <button type="button" class="action-btn is-ghost">Cancel</button>
    </div>`;
  document.body.append(box);
  if (window.lucide) window.lucide.createIcons();
  const close = () => box.remove();
  box.querySelector("button").addEventListener("click", close);
  document.addEventListener("keydown", function onKey(e) {
    if (e.key === "Escape") { close(); document.removeEventListener("keydown", onKey); }
  });
  box.querySelector("a").focus();
}

function initOwner() {
  let timer = null;
  let origin = null;
  document.addEventListener("pointerdown", (e) => {
    const brand = e.target.closest(".brand");
    if (!brand) return;
    origin = { x: e.clientX, y: e.clientY };
    timer = setTimeout(() => {
      timer = null;
      brand.dataset.longpress = "1"; // swallow the click that follows the long-press
      showOwnerPrompt();
    }, 900);
  });
  const cancel = () => { clearTimeout(timer); timer = null; };
  document.addEventListener("pointerup", cancel);
  document.addEventListener("pointercancel", cancel);
  document.addEventListener("pointermove", (e) => {
    if (timer && origin && Math.hypot(e.clientX - origin.x, e.clientY - origin.y) > 10) cancel();
  });
  document.addEventListener("click", (e) => {
    const brand = e.target.closest(".brand");
    if (brand && brand.dataset.longpress) {
      e.preventDefault();
      delete brand.dataset.longpress;
    }
  }, true);
  document.addEventListener("contextmenu", (e) => e.target.closest(".brand") && e.preventDefault());

  // Signed-in owner: load the editor (the cookie is only a hint; the server decides)
  if (!/(?:^|;\s*)mk_owner=1/.test(document.cookie)) return;
  fetch("/api/auth/me", { credentials: "same-origin" })
    .then((res) => (res.ok ? res.json() : null))
    .then((me) => {
      if (!me || !me.owner) return;
      const css = document.createElement("link");
      css.rel = "stylesheet";
      css.href = "editor/editor.css";
      document.head.append(css);
      import("./editor/editor.js").then((m) => m.startEditor(me)).catch((err) => console.error("Editor failed to load", err));
    })
    .catch(() => {});
}

const PAGE_RENDERERS = {
  home: () => renderHome(),
  projects: () => renderProjects(),
  creative: () => renderCreative(),
  experience: () => renderExperience(),
  stack: () => renderStack(),
  gear: () => renderGear(),
  certifications: () => renderCertifications(),
  credentials: () => renderCredentials(),
};

// Redraws the current page from window.CONTENT without reloading (used by the owner editor).
// Entry animations are skipped: everything is shown in its final state.
function renderPage({ showHidden = false } = {}) {
  const page = document.body.dataset.page;
  bindContent(window.CONTENT, { showHidden });
  renderChrome(page);
  renderPageHeader(page);
  PAGE_RENDERERS[page]?.();
  if (window.lucide) window.lucide.createIcons();
  document.querySelectorAll(".reveal, [data-stagger], [data-watch]").forEach((el) => el.classList.add("is-visible"));
  document.dispatchEvent(new CustomEvent("pagerendered"));
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  renderChrome(page);
  renderPageHeader(page);
  PAGE_RENDERERS[page]?.();

  if (window.lucide) window.lucide.createIcons();
  initReveal();
  initPulse();
  initOwner();

  // re-scroll to hash targets after content renders
  if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
});
