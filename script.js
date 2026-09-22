/* ==========================================================================
   Makheyl — portfolio
   All site content lives in the data blocks below. Edit these, not the HTML.
   ========================================================================== */

/* ---------- Site / owner ---------- */
const SITE = {
  name: "Makheyl",
  email: "mchaildelacruz@gmail.com",
  github: "https://github.com/makheyl",
  resume: "assets/resume.pdf",
  status: "Developer intern at CloudSwyft",
  intro: [
    "I'm a web developer who loves building SaaS products and full-stack web apps. I'm currently a developer intern at CloudSwyft and a 4th-year BSIT student specializing in game development.",
    "Right now I'm building web systems like the lab queueing platform for Carmona's City Health Office, plus SDG-aligned capstone games at school. I love turning rough ideas into things people actually use.",
  ],
  social: [
    { label: "github", href: "https://github.com/makheyl" },
    { label: "linkedin", href: "https://www.linkedin.com/in/mchail-dela-cruz" },
    { label: "email", href: "mailto:mchaildelacruz@gmail.com" },
    { label: "resume", href: "assets/resume.pdf" },
  ],
  portrait: {
    src: "assets/portrait-gray.jpg",
    alt: "Black-and-white portrait of Makheyl smiling, wearing glasses",
  },
};

/* ---------- Navigation ---------- */
const NAV = {
  withIcons: [
    { id: "gear", label: "Gear", href: "gear.html", icon: "laptop" },
    { id: "certifications", label: "Certifications", href: "certifications.html", icon: "award" },
  ],
  textOnly: [
    { id: "projects", label: "Projects", href: "projects.html" },
    { id: "experience", label: "Experience", href: "experience.html" },
    { id: "stack", label: "Stack", href: "stack.html" },
  ],
};

/* ---------- Page headers ---------- */
const PAGES = {
  projects: {
    title: "projects",
    intro: "Things I've designed and built, spanning web apps, SaaS tools, and SDG-aligned games.",
  },
  experience: {
    title: "experience",
    intro: "Where I've been building, from web systems for local government and my internship at CloudSwyft to design work and SDG-aligned games at school.",
  },
  stack: {
    title: "tech stack",
    intro: "The tools, frameworks, and platforms I reach for, across the web, SaaS, games, and cloud.",
  },
  gear: {
    title: "gear",
    intro: "The hardware I build, test, and play on every day.",
  },
  certifications: {
    title: "certifications",
    intro: "Courses and credentials I've completed along the way.",
  },
};

/* ---------- Home stats (value, label, link) ---------- */
const STATS = [
  { value: "8+", label: "Projects", href: "projects.html" },
  { value: "3", label: "Capstone titles", href: "projects.html#shhkool" },
  { value: "4th yr", label: "BSIT", href: "experience.html#uphsl" },
  { value: "Intern", label: "@ CloudSwyft", href: "experience.html#cloudswyft" },
];

/* ---------- Projects ----------
   Listed in display order (web first).
   badge:     filled pill
   tags:      outlined pills
   icon:      Lucide icon name used as a placeholder app icon
   image:     optional path to a real app icon (overrides `icon`)
   links:     GitHub / Live Demo buttons (empty array = private project)
   builtWith: optional footer row
*/
const PROJECTS = [
  {
    id: "music-mashup",
    name: "Music Mashup Tool",
    subtitle: "AI Audio",
    description: "A browser-based mashup tool with automatic key and BPM detection.",
    badge: "Web app",
    tags: ["AI", "Audio"],
    icon: "audio-lines",
    image: null, // TODO: add app icon
    links: [
      { type: "github", href: "https://github.com/makheyl" }, // TODO: point to the repo
      { type: "demo", href: "#" }, // TODO: live demo URL
    ],
    builtWith: [], // TODO: add libraries
  },
  {
    id: "studybudget",
    name: "StudyBudget",
    subtitle: "Student Finance",
    description: "A budgeting app that helps students track allowances and spending.",
    badge: "Web app",
    tags: ["Finance"],
    icon: "wallet",
    image: null, // TODO: add app icon
    links: [
      { type: "github", href: "https://github.com/makheyl" }, // TODO: point to the repo
      { type: "demo", href: "#" }, // TODO: live demo URL
    ],
    builtWith: [], // TODO: add stack
  },
  {
    id: "lab-queue",
    name: "Lab Queue",
    subtitle: "Health Office System",
    description: "A queueing system for Carmona's City Health Office with priority handling, laboratory waiting queues, patient transfers, and structured reporting.",
    badge: "Public sector",
    tags: ["Government", "Healthcare"],
    icon: "flask-conical",
    image: null, // TODO: add app icon
    links: [], // TODO: add links if the code or a demo can be shared publicly
    note: "Built for the City Government of Carmona, not publicly available",
    builtWith: ["PHP", "MySQL"],
  },
  {
    id: "dust-and-shine",
    name: "Dust & Shine",
    subtitle: "Cleaning Game",
    description: "A browser-based casual cleaning game.",
    badge: "Browser game",
    tags: ["Casual"],
    icon: "sparkles",
    image: null, // TODO: add app icon
    links: [
      { type: "github", href: "https://github.com/makheyl" }, // TODO: point to the repo
      { type: "demo", href: "#" }, // TODO: live demo URL
    ],
    builtWith: [], // TODO: add libraries
  },
  {
    id: "shhkool",
    name: "SHHKOOL",
    subtitle: "Classroom Noise Game",
    description: "A multiplayer noise-meter game that reacts to real-time mic input to keep classrooms focused.",
    badge: "Capstone",
    tags: ["SDG 4", "In progress"],
    icon: "mic",
    image: null, // TODO: add app icon
    links: [
      { type: "github", href: "https://github.com/makheyl" }, // TODO: point to the repo
      { type: "demo", href: "#" }, // TODO: live demo URL
    ],
    builtWith: [], // TODO: add engine / libraries
  },
  {
    id: "terraqua-clash",
    name: "Terraqua Clash",
    subtitle: "Survival Arena",
    description: "A 3D physics-based multiplayer animal survival arena with a Tide-Shift mechanic that reshapes the map.",
    badge: "Capstone",
    tags: ["SDG 14", "SDG 15", "In progress"],
    icon: "waves",
    image: null, // TODO: add app icon
    links: [
      { type: "github", href: "https://github.com/makheyl" }, // TODO: point to the repo
      { type: "demo", href: "#" }, // TODO: live demo URL
    ],
    builtWith: [], // TODO: add engine / libraries
  },
  {
    id: "bayanihan",
    name: "Bayanihan",
    subtitle: "Disaster Rescue",
    description: "A 3D boat-based typhoon flood rescue game built in Unity 6.",
    badge: "Capstone",
    tags: ["SDG 11", "In progress"],
    icon: "sailboat",
    image: null, // TODO: add app icon
    links: [
      { type: "github", href: "https://github.com/makheyl" }, // TODO: point to the repo
      { type: "demo", href: "#" }, // TODO: live demo / build URL
    ],
    builtWith: ["Unity 6"],
  },
  {
    id: "cloudswyftcrm",
    name: "CloudSwyftCRM",
    subtitle: "Internal CRM",
    description: "An internal CRM with SharePoint data, automated flows, and interactive email campaigns with CSAT ratings.",
    badge: "Internship",
    tags: ["Internal tool"],
    icon: "layout-dashboard",
    image: null, // TODO: add app icon
    links: [],
    note: "Internal to CloudSwyft, not publicly available",
    builtWith: ["Power Apps", "SharePoint", "Power Automate", "Adaptive Cards"],
  },
];

/* ---------- Experience ----------
   start / end: "YYYY-MM" (end: null = present). Durations are computed.
   dateText:    overrides the date line entirely (e.g. "Graduated 2023")
   visibleSkills: how many skill tags show before the "+N skills" pill.
*/
const EXPERIENCE = [
  {
    id: "cloudswyft",
    initials: "CS",
    org: "CloudSwyft",
    type: "Internship",
    location: "Philippines", // TODO: confirm city / work setup (on-site, hybrid, remote)
    roles: [
      {
        title: "Developer Intern", // TODO: confirm exact title
        start: "2025-08", // TODO: confirm start date
        end: null, // TODO: set end date when the internship wraps up
        description: "Contributing to CloudSwyftCRM, an internal CRM with SharePoint data, automated flows, and interactive email campaigns that collect CSAT ratings.",
        skills: ["SharePoint", "Power Automate", "Power Apps", "Adaptive Cards"],
        visibleSkills: 2,
      },
    ],
  },
  {
    id: "city-health-office",
    initials: "CHO",
    org: "City Health Office, City Government of Carmona",
    type: "Government",
    location: "Carmona, Cavite",
    roles: [
      {
        title: "Software Developer",
        start: "2025-07",
        end: null,
        description: "Built a queueing system for the City Health Office with priority handling, laboratory waiting queues, and patient transfer workflows. Designed and maintained structured reporting features with clearer navigation and accessibility, backed by PHP and MySQL.",
        skills: ["PHP", "MySQL", "Queueing workflows", "Reporting"],
        visibleSkills: 2,
      },
    ],
  },
  {
    id: "lumbre",
    initials: "LG",
    org: "Lumbre Gunsmith Shop",
    type: "Design & Operations",
    location: "Silang, Cavite",
    roles: [
      {
        title: "Designer & Laser Engraving Operator",
        start: "2023-10",
        end: null,
        description: "Design custom engravings in Photoshop, translating client requirements into precise vector artwork, then run the laser engraving machines in LightBurn to produce them.",
        skills: ["Photoshop", "LightBurn", "Vector design"],
        visibleSkills: 2,
      },
    ],
  },
  {
    id: "ccis",
    initials: "CCIS",
    org: "CCIS Shooting Range",
    type: "Digital Operations",
    location: "Silang, Cavite",
    roles: [
      {
        title: "Digital Operations Manager",
        start: "2023-11",
        end: "2026-01",
        description: "Created digital publications and ran marketing campaigns that drew shooters from multiple locations, using current trends and analytics to grow engagement and brand visibility online.",
        skills: ["Digital marketing", "Content publishing", "Analytics", "Adobe Creative Cloud"],
        visibleSkills: 2,
      },
    ],
  },
  {
    id: "uphsl",
    initials: "UP",
    org: "University of Perpetual Help System Laguna",
    type: "BSIT · Game Development",
    location: "College of Computer Studies · A.Y. 2023–2027",
    roles: [
      {
        title: "BS Information Technology, major in Game Development",
        start: "2023-09",
        end: null,
        durationOverride: "4th year",
        description: "Dean's Lister. Capstone in progress: SDG-aligned games including SHHKOOL, Terraqua Clash, and Bayanihan.",
        skills: ["Dean's Lister", "Unity 6", "Three.js", "WebGL", "Blender", "Roblox Studio"],
        visibleSkills: 3,
      },
    ],
  },
  {
    id: "shs",
    initials: "AL",
    org: "Angelo Levardo L. Senior High School",
    type: "Senior High School · STEM",
    location: "",
    roles: [
      {
        title: "STEM Strand",
        dateText: "Graduated 2023",
        description: "Graduated With High Honors and received a Research Award.",
        skills: ["With High Honors", "Research Awardee"],
        visibleSkills: 2,
      },
    ],
  },
];

/* ---------- Stack ---------- */
const STACK = [
  { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"] },
  { category: "Backend & Data", items: ["PHP", "Node.js", "Python", "FastAPI", "MySQL", "Supabase", "PostgreSQL", "MongoDB", "MariaDB"] },
  { category: "Cloud & Tools", items: ["AWS", "Azure", "Git", "GitHub", "VS Code", "Claude Code"] },
  { category: "Game Development", items: ["Unity 6", "Three.js", "WebGL", "Blender", "Roblox Studio"] },
  { category: "Design", items: ["Adobe Creative Cloud", "Photoshop", "Photo & video editing", "LightBurn"] },
  { category: "Power Platform", items: ["Power Apps", "Power Automate", "SharePoint", "Microsoft Lists", "Adaptive Cards"] },
];

/* ---------- Gear ----------
   image: optional product photo path (TODO for each)
   slot:  true renders a dashed placeholder card
*/
const GEAR = [
  { name: "MacBook Air M5", spec: "13\" · 16GB / 512GB", icon: "laptop", image: null /* TODO: product photo */ },
  { name: "iPhone 16 Pro Max", spec: "Daily phone", icon: "smartphone", image: null /* TODO: product photo; add storage/colour to spec */ },
  { name: "Mouse", spec: "Model to be added", icon: "mouse", image: null, slot: true /* TODO: add mouse */ },
  { name: "Keyboard", spec: "Model to be added", icon: "keyboard", image: null, slot: true /* TODO: add keyboard */ },
  { name: "Headphones", spec: "Model to be added", icon: "headphones", image: null, slot: true /* TODO: add headphones */ },
];

/* ---------- Certifications ----------
   date: "YYYY-MM" or null; href: credential URL or null (link hidden when null)
*/
const CERTIFICATIONS = [
  // TODO: add issue date and credential URL
  { initials: "UN", name: "Unity Certified User: Artist", issuer: "Unity Technologies", date: null, href: null },
  // TODO: add issue date and credential URL
  { initials: "IC3", name: "IC3 Living Online — Global Standard 5", issuer: "Certiport", date: null, href: null },
];

/* ==========================================================================
   Helpers
   ========================================================================== */
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
  try { return localStorage.getItem(THEME_KEY) || "system"; } catch { return "system"; }
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
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const willChange = () => {
    // resolve what the theme *would* be, without applying it
    if (choice === "light" || choice === "dark") return choice !== before;
    return (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light") !== before;
  };

  if (reduced || !willChange()) return applyTheme(choice);

  if (!document.startViewTransition || !origin) {
    const root = document.documentElement;
    root.classList.add("theme-fading");
    applyTheme(choice);
    setTimeout(() => root.classList.remove("theme-fading"), 450);
    return;
  }

  const r = origin.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));

  const transition = document.startViewTransition(() => applyTheme(choice));
  transition.finished.catch(() => {});
  transition.ready.then(() => {
    document.documentElement.animate(
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
    return `<li><a class="nav-link" href="${item.href}"${current}>
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
        <a class="mail-link" href="mailto:${esc(SITE.email)}">${icon("mail")}<span>${esc(SITE.email)}</span></a>
        <a class="mail-link" href="${esc(SITE.resume)}" target="_blank" rel="noopener">${icon("file-text")}<span>resume.pdf</span></a>
      </div>
    </div>`;

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
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && document.body.classList.contains("menu-open")) {
      setOpen(false);
      btn.focus();
    }
  });
  window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => e.matches && setOpen(false));
}

function renderPageHeader(page) {
  const el = document.querySelector('[data-render="page-header"]');
  const data = PAGES[page];
  if (!el || !data) return;
  el.innerHTML = `<h1 class="page-title"><span class="prompt" aria-hidden="true">~/</span>${esc(data.title)}<span class="caret" aria-hidden="true"></span></h1>
    <p class="page-intro">${esc(data.intro)}</p>`;
  el.classList.add("reveal");
}

/* ==========================================================================
   Home
   ========================================================================== */
function renderHome() {
  const hero = document.getElementById("hero");
  hero.innerHTML = `
    <figure class="portrait reveal">
      <img src="${SITE.portrait.src}" alt="${esc(SITE.portrait.alt)}" width="900" height="900" />
    </figure>
    <div class="reveal">
      <p class="status"><span class="status-dot" aria-hidden="true"></span>${esc(SITE.status)}</p>
      <h1 class="hero-name">${esc(SITE.name)}</h1>
      <div class="hero-intro">${SITE.intro.map((p) => `<p>${esc(p)}</p>`).join("")}</div>
      <div class="social">
        ${SITE.social
          .map((s) => {
            const ext = s.href.startsWith("http") || s.href.endsWith(".pdf") ? ' target="_blank" rel="noopener noreferrer"' : "";
            return `<a class="ext" href="${esc(s.href)}"${ext}>${esc(s.label)}</a>`;
          })
          .join("")}
      </div>
    </div>`;

  document.getElementById("stats").innerHTML = STATS.map(
    (s) => `<a class="stat" href="${s.href}">
      <div class="stat-value">${esc(s.value)}<sup aria-hidden="true">↗</sup></div>
      <div class="stat-label">${esc(s.label)}</div>
    </a>`
  ).join("");

  const section = (num, title, href, body) => `
    <section class="preview reveal" aria-labelledby="pv-${title}">
      <div class="preview-head">
        <h2 class="preview-title" id="pv-${title}">${num} — ${title}</h2>
        <a class="view-all" href="${href}">View all →</a>
      </div>
      ${body}
    </section>`;

  const projectRows = PROJECTS.slice(0, 3)
    .map(
      (p) => `<a class="preview-row" href="projects.html#${p.id}">
        <div><div class="preview-row-title">${esc(p.name)} — ${esc(p.subtitle)}</div>
        <div class="preview-row-sub">${esc(p.description)}</div></div>
        <div class="preview-row-meta">${esc(p.badge.toLowerCase())}</div>
      </a>`
    )
    .join("");

  const expRows = EXPERIENCE.slice(0, 3).map((x) => {
    const r = x.roles[0];
    return `<a class="preview-row" href="experience.html#${x.id}">
      <div><div class="preview-row-title">${esc(x.org)}</div>
      <div class="preview-row-sub">${esc(r.title)}</div></div>
      <div class="preview-row-meta">${esc(r.dateText || `${fmtYm(r.start)} – ${r.end ? fmtYm(r.end) : "now"}`).toLowerCase()}</div>
    </a>`;
  }).join("");

  const stackChips = `<div class="preview-chips tag-list">${STACK.slice(0, 3).flatMap((g) => g.items.slice(0, 3))
    .map((t) => `<span class="tag">${esc(t)}</span>`)
    .join("")}</div>`;

  document.getElementById("previews").innerHTML =
    section("01", "projects", "projects.html", projectRows) +
    section("02", "experience", "experience.html", expRows) +
    section("03", "stack", "stack.html", stackChips);

}

/* ==========================================================================
   Projects
   ========================================================================== */
function renderProjects() {
  const btn = (l) => {
    const isGh = l.type === "github";
    return `<a class="action-btn${isGh ? "" : " is-ghost"}" href="${esc(l.href)}"${l.href.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : ""}>
      ${icon(isGh ? "code-xml" : "arrow-up-right")}<span>${isGh ? "source" : "live demo"}</span>
    </a>`;
  };

  document.getElementById("projects-list").innerHTML = PROJECTS.map(
    (p) => `
    <article class="project reveal" id="${p.id}" aria-labelledby="${p.id}-title">
      <div class="project-top">
        <div class="project-icon">
          ${p.image ? `<img src="${esc(p.image)}" alt="" />` : icon(p.icon)}
        </div>
        <div>
          <div class="badges">
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
          ? `<div class="project-foot"><span class="label">Built with</span>${p.builtWith
              .map((t) => `<span class="ext">${esc(t)}</span>`)
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
      <div class="tag-list" id="skills-${key}">
        ${shown.map((s) => `<span class="tag">${esc(s)}</span>`).join("")}
        ${extra.map((s) => `<span class="tag is-extra" hidden>${esc(s)}</span>`).join("")}
        ${extra.length ? `<button type="button" class="tag tag-more" aria-expanded="false" aria-controls="skills-${key}">+${extra.length} skill${extra.length > 1 ? "s" : ""}</button>` : ""}
      </div>
    </div>`;
  };

  document.getElementById("timeline").innerHTML = EXPERIENCE.map(
    (x) => `
    <article class="tl-item reveal" id="${x.id}">
      <div class="tl-mark" aria-hidden="true">${esc(x.initials)}</div>
      <div>
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
      const first = list.querySelector(".is-extra");
      list.querySelectorAll(".is-extra").forEach((t) => (t.hidden = false));
      b.setAttribute("aria-expanded", "true");
      b.remove();
      if (first) { first.tabIndex = -1; first.focus({ preventScroll: true }); }
    })
  );
}

/* ==========================================================================
   Stack
   ========================================================================== */
function renderStack() {
  document.getElementById("stack-list").innerHTML = STACK.map(
    (g, i) => `
    <section class="stack-group reveal" aria-labelledby="stack-${i}">
      <h2 class="label" id="stack-${i}">${esc(g.category)}</h2>
      <ul class="tag-list">${g.items.map((t) => `<li class="tag">${esc(t)}</li>`).join("")}</ul>
    </section>`
  ).join("");
}

/* ==========================================================================
   Gear
   ========================================================================== */
function renderGear() {
  document.getElementById("gear-grid").innerHTML = GEAR.map(
    (g) => `
    <article class="gear-card reveal${g.slot ? " is-slot" : ""}">
      <div class="gear-media">
        ${g.image ? `<img src="${esc(g.image)}" alt="${esc(g.name)}" loading="lazy" />` : icon(g.icon)}
      </div>
      <h2 class="gear-name">${esc(g.name)}</h2>
      <p class="gear-spec">${esc(g.spec)}</p>
    </article>`
  ).join("");
}

/* ==========================================================================
   Certifications
   ========================================================================== */
function renderCertifications() {
  document.getElementById("cert-list").innerHTML = CERTIFICATIONS.map(
    (c) => `
    <article class="tl-item reveal">
      <div class="tl-mark" aria-hidden="true">${esc(c.initials)}</div>
      <div>
        <h2 class="tl-org">${esc(c.name)}</h2>
        <p class="tl-meta">${esc(c.issuer)}</p>
        ${c.date ? `<p class="role-dates">Issued ${fmtYm(c.date)}</p>` : ""}
        ${c.href ? `<a class="cred-link ext" href="${esc(c.href)}" target="_blank" rel="noopener noreferrer">view credential</a>` : ""}
      </div>
    </article>`
  ).join("");
}

/* ==========================================================================
   Scroll reveal
   ========================================================================== */
function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    els.forEach((el) => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  els.forEach((el) => io.observe(el));
}

/* ==========================================================================
   Boot
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  renderChrome(page);
  renderPageHeader(page);

  ({
    home: renderHome,
    projects: renderProjects,
    experience: renderExperience,
    stack: renderStack,
    gear: renderGear,
    certifications: renderCertifications,
  })[page]?.();

  if (window.lucide) window.lucide.createIcons();
  initReveal();

  // re-scroll to hash targets after content renders
  if (location.hash) document.getElementById(location.hash.slice(1))?.scrollIntoView();
});
