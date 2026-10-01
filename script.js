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
    "Right now I'm building KolektaPH, a garbage truck tracker for Carmona, and Folio, an editor for interactive ebooks, alongside SDG-aligned capstone games at school. I love turning rough ideas into things people actually use.",
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
    { id: "creative", label: "Creative", href: "creative.html", icon: "palette" },
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
  creative: {
    title: "creative",
    intro: "Pubmats, graphic design, and 3D work. The visual side of what I make, from marketing layouts to Blender renders.",
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
  { value: "10+", label: "Projects", href: "projects.html" },
  { value: "3", label: "Capstone titles", href: "projects.html#shhkool" },
  { value: "4th yr", label: "BSIT", href: "experience.html#uphsl" },
  { value: "Intern", label: "@ CloudSwyft", href: "experience.html#cloudswyft" },
];

/* ---------- Projects ----------
   Listed in display order (web first). Content mirrors the READMEs on
   github.com/makheyl.
   badge:     filled pill
   tags:      outlined pills
   icon:      Lucide icon name used as a placeholder app icon
   image:     optional path to a real app icon (overrides `icon`)
   links:     buttons; type "github" or "demo", optional `label` overrides the text
              (empty array = no public links, shows `note`)
   builtWith: optional footer row
*/
const GH = "https://github.com/makheyl/";

const PROJECTS = [
  {
    id: "kolektaph",
    name: "KolektaPH",
    subtitle: "Garbage Truck Tracker",
    description: "Real-time garbage truck tracking, barangay SMS alerts, and the Ask Kolek assistant for the 14 barangays of Carmona, Cavite. One codebase, three apps: resident, driver, and a City ENRO dashboard. Currently a UI prototype running on mock data.",
    badge: "Mobile + web",
    tags: ["Civic tech", "Prototype"],
    icon: "truck",
    image: null, // TODO: add app icon
    links: [{ type: "github", href: GH + "kolektaph" }], // TODO: add live demo once deployed
    builtWith: ["Expo", "React Native", "TypeScript", "MapLibre", "Zustand", "TanStack Query"],
  },
  {
    id: "folio",
    name: "Folio",
    subtitle: "Interactive Ebook Editor",
    description: "A browser-based editor for interactive, animated ebooks, like a simplified Canva built around book pages. Every book exports as one standalone HTML file that works offline with no install or account.",
    badge: "Web app",
    tags: ["TypeScript", "Offline export"],
    icon: "book-open",
    image: null, // TODO: add app icon
    links: [
      { type: "github", href: GH + "ebook-maker" },
      { type: "demo", href: "https://ebook-maker-woad.vercel.app" },
    ],
    builtWith: ["React", "TypeScript", "Vite", "Tailwind CSS", "Zustand", "Dexie", "Playwright"],
  },
  {
    id: "music-mixer",
    name: "Music Mixer",
    subtitle: "AI Mashup Analyzer",
    description: "Detects the BPM, key, and chord progression of two songs, scores how well they mix, then time-stretches and pitch-shifts one to export a mashup, with an optional Claude-generated bridge.",
    badge: "AI tool",
    tags: ["Audio", "Python"],
    icon: "audio-lines",
    image: null, // TODO: add app icon
    links: [{ type: "github", href: GH + "music-mixer" }],
    builtWith: ["Python", "FastAPI", "librosa", "Tailwind CSS", "Anthropic API"],
  },
  {
    id: "studybudget",
    name: "StudyBudget",
    subtitle: "Student Finance",
    description: "A budgeting tool that helps students track allowances and expenses, with a React client and an Express API backed by MongoDB.",
    badge: "Full-stack",
    tags: ["Finance"],
    icon: "wallet",
    image: null, // TODO: add app icon
    links: [{ type: "github", href: GH + "student-budgeting" }],
    builtWith: ["React", "Vite", "Tailwind CSS", "Recharts", "Node.js", "Express", "MongoDB", "JWT"],
  },
  {
    id: "opd-queue",
    name: "OPD Queue",
    subtitle: "Out-Patient Queueing",
    description: "A queueing system for the out-patient department of Carmona's City Health Office, with priority handling, a doctor panel for serving and transferring patients, and a public kiosk display.",
    badge: "Public sector",
    tags: ["Healthcare", "Government"],
    icon: "hospital",
    image: null, // TODO: add app icon
    links: [{ type: "github", href: GH + "opd-queueing-cho-carmona" }],
    builtWith: ["PHP", "MySQL", "JavaScript"],
  },
  {
    id: "lab-queue",
    name: "Lab Queue",
    subtitle: "Laboratory Queueing",
    description: "The laboratory queue for the same office: encoder interview stations, an extraction station for phlebotomists, a kiosk board that resets itself overnight, and daily to monthly reports with CSV export.",
    badge: "Public sector",
    tags: ["Healthcare", "Government"],
    icon: "flask-conical",
    image: null, // TODO: add app icon
    links: [{ type: "github", href: GH + "php-lab-queueing" }],
    builtWith: ["PHP", "MariaDB", "JavaScript"],
  },
  {
    id: "pennywise",
    name: "PennyWise AI",
    subtitle: "Financial Assistant",
    description: "A group project that looks at how you actually spend and gives personalized money tips, powered by a locally run Mistral 7B model.",
    badge: "Group project",
    tags: ["AI", "Finance"],
    icon: "piggy-bank",
    image: null, // TODO: add app icon
    links: [{ type: "github", href: GH + "financial-assistant" }],
    builtWith: ["Python", "HTML", "Mistral 7B"],
  },
  {
    id: "shhkool",
    name: "SHHKOOL",
    subtitle: "Classroom Noise Game",
    description: "A classroom noise-management game played with your actual voice. Keep the room quiet through a real-time Teacher-Attention Cycle, with a keyboard fallback if there's no mic.",
    badge: "Capstone",
    tags: ["SDG 4", "Prototype"],
    icon: "mic",
    image: null, // TODO: add app icon
    links: [
      { type: "github", href: GH + "shhkool-ui" },
      { type: "demo", href: "https://shhkool-ui.vercel.app" },
    ],
    builtWith: ["HTML", "CSS", "JavaScript"],
  },
  {
    id: "terraqua-clash",
    name: "Terraqua Clash",
    subtitle: "Survival Arena",
    description: "A physics-based multiplayer animal survival arena built around a real-time Tide-Shift mechanic. The prototype is a top-down arena with local multiplayer.",
    badge: "Capstone",
    tags: ["SDG 14", "SDG 15", "Prototype"],
    icon: "waves",
    image: null, // TODO: add app icon
    links: [
      { type: "github", href: GH + "terraqua_clash" },
      { type: "demo", href: "https://terraqua-clash.vercel.app" },
    ],
    builtWith: ["JavaScript", "Canvas 2D"],
  },
  {
    id: "bayanihan",
    name: "Bayanihan",
    subtitle: "Disaster Rescue",
    description: "Take a bangka through a flooded coastal barangay, rescue stranded residents, and ferry them to the evacuation center. A separate 3D prototype saves each mission to a Supabase leaderboard.",
    badge: "Capstone",
    tags: ["SDG 11", "Prototype"],
    icon: "sailboat",
    image: null, // TODO: add app icon
    links: [
      { type: "github", href: GH + "bayanihan-rescuegame" },
      { type: "demo", href: "https://bayanihan-rescuegame.vercel.app" },
      { type: "github", href: GH + "Group08_DatabaseConnectivity", label: "3D + db prototype" },
    ],
    builtWith: ["JavaScript", "Canvas 2D", "Three.js", "Supabase"],
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
    links: [], // TODO: add links once the repo is on GitHub
    note: "Source not published yet",
    builtWith: [],
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
        start: "2026-07",
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
        description: "Built the out-patient (OPD) and laboratory queueing systems for the City Health Office, with priority handling, laboratory waiting queues, patient transfer workflows, and public kiosk displays. Designed and maintained structured reporting features, backed by PHP and MySQL.",
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
  { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "React Native", "Expo", "Vite", "Tailwind CSS"] },
  { category: "Backend & Data", items: ["Node.js", "Express", "PHP", "Python", "FastAPI", "MongoDB", "Supabase", "PostgreSQL", "MySQL", "MariaDB"] },
  { category: "AI", items: ["Anthropic API", "Claude", "ChatGPT", "Mistral 7B", "librosa"] },
  { category: "Cloud & Tools", items: ["Vercel", "Google Cloud", "AWS", "Azure", "Git", "GitHub", "VS Code", "Claude Code", "Playwright"] },
  { category: "Game Development", items: ["C#", "Unity 6", "Three.js", "Canvas 2D", "WebGL", "Blender", "Roblox Studio"] },
  { category: "Design", items: ["Photoshop", "Adobe Creative Cloud", "Photo & video editing", "LightBurn"] },
  { category: "Power Platform", items: ["Power Apps", "Power Automate", "SharePoint", "Microsoft Lists", "Adaptive Cards"] },
];

/* ---------- Gear ----------
   image: optional product photo path
*/
const GEAR = [
  { name: "MacBook Air M5", spec: "Main laptop · 13\" · 16GB / 512GB", icon: "laptop", image: null /* TODO: product photo */ },
  { name: "Acer Nitro V", spec: "Secondary laptop", icon: "laptop", image: null /* TODO: product photo; add specs */ },
  { name: "iPhone 16 Pro Max", spec: "Daily phone", icon: "smartphone", image: null /* TODO: product photo */ },
];

/* ---------- Creative ----------
   Shown on creative.html in this order, and on the home page (featured: true, first 4).
   category: "pubmat" | "design" | "3d"
   ratio:    "4:5" | "1:1" | "16:9" (takes two columns) | "9:16"
   image:    path to the file, e.g. "assets/creative/my-pubmat.jpg".
             While it is null the tile shows a generated placeholder.
   alt:      optional description of the image for screen readers
*/
const CREATIVE_CATEGORIES = [
  { id: "pubmat", label: "Pubmats", short: "Pubmats", singular: "Pubmat" },
  { id: "design", label: "Graphic design", short: "Design", singular: "Graphic design" },
  { id: "3d", label: "3D work", short: "3D", singular: "3D work" },
];

const CREATIVE = [
  // TODO: every entry below is a placeholder. Set image, title, year, tools, description.
  { id: "pubmat-01", category: "pubmat", title: "Pubmat sample 01", year: null, tools: ["Photoshop"], ratio: "4:5", image: null, description: "", featured: true },
  { id: "3d-01", category: "3d", title: "3D render sample 01", year: null, tools: ["Blender"], ratio: "16:9", image: null, description: "", featured: true },
  { id: "pubmat-02", category: "pubmat", title: "Pubmat sample 02", year: null, tools: ["Photoshop"], ratio: "4:5", image: null, description: "", featured: true },
  { id: "design-01", category: "design", title: "Design sample 01", year: null, tools: ["Photoshop"], ratio: "1:1", image: null, description: "", featured: true },
  { id: "design-02", category: "design", title: "Design sample 02", year: null, tools: ["Photoshop", "LightBurn"], ratio: "1:1", image: null, description: "" },
  { id: "3d-02", category: "3d", title: "3D model sample 02", year: null, tools: ["Blender"], ratio: "1:1", image: null, description: "" },
  { id: "3d-03", category: "3d", title: "3D model sample 03", year: null, tools: ["Blender"], ratio: "1:1", image: null, description: "" },
  { id: "design-03", category: "design", title: "Design sample 03", year: null, tools: ["Adobe Creative Cloud"], ratio: "16:9", image: null, description: "" },
  { id: "pubmat-03", category: "pubmat", title: "Pubmat sample 03", year: null, tools: ["Photoshop"], ratio: "4:5", image: null, description: "" },
  { id: "pubmat-04", category: "pubmat", title: "Pubmat sample 04", year: null, tools: ["Photoshop"], ratio: "4:5", image: null, description: "" },
  { id: "design-04", category: "design", title: "Design sample 04", year: null, tools: ["Photoshop"], ratio: "16:9", image: null, description: "" },
  { id: "3d-04", category: "3d", title: "3D render sample 04", year: null, tools: ["Blender"], ratio: "16:9", image: null, description: "" },
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
// Motion is skipped when the visitor prefers reduced motion (or with ?reduced-motion for testing)
const REDUCED_MOTION =
  matchMedia("(prefers-reduced-motion: reduce)").matches || new URLSearchParams(location.search).has("reduced-motion");
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
  el.innerHTML = `<h1 class="page-title" aria-label="${esc(data.title)}"><span class="prompt" aria-hidden="true">~/</span><span class="title-text" aria-hidden="true"></span><span class="caret" aria-hidden="true"></span></h1>
    <p class="page-intro reveal">${esc(data.intro)}</p>`;
  typeText(el.querySelector(".title-text"), data.title);
}

/* ==========================================================================
   Motion helpers
   ========================================================================== */
// Types text into a node one character at a time
function typeText(node, text, speed = 45) {
  if (REDUCED_MOTION) {
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
      <img src="${SITE.portrait.src}" alt="${esc(SITE.portrait.alt)}" width="900" height="900" />
    </figure>
    <div>
      <p class="status reveal"><span class="status-dot" aria-hidden="true"></span>${esc(SITE.status)}</p>
      <h1 class="hero-name reveal">${esc(SITE.name)}</h1>
      <div class="hero-intro">${SITE.intro.map((p) => `<p class="reveal">${esc(p)}</p>`).join("")}</div>
      <div class="social reveal">
        ${SITE.social
          .map((s) => {
            const ext = s.href.startsWith("http") || s.href.endsWith(".pdf") ? ' target="_blank" rel="noopener noreferrer"' : "";
            return `<a class="ext" href="${esc(s.href)}"${ext}>${esc(s.label)}</a>`;
          })
          .join("")}
      </div>
    </div>`;

  const stats = document.getElementById("stats");
  stats.innerHTML = STATS.map((s) => {
    const m = /^(\d+)(\+?)$/.exec(s.value); // plain numbers count up
    const value = m ? `<span data-count="${m[1]}" data-suffix="${m[2]}">${esc(s.value)}</span>` : esc(s.value);
    return `<a class="stat reveal" href="${s.href}" aria-label="${esc(s.value)} ${esc(s.label)}">
      <div class="stat-value">${value}<sup aria-hidden="true">↗</sup></div>
      <div class="stat-label">${esc(s.label)}</div>
    </a>`;
  }).join("");
  if (!REDUCED_MOTION) {
    stats.querySelectorAll(".stat").forEach((stat) => {
      const num = stat.querySelector("[data-count]");
      if (!num) return;
      num.textContent = `0${num.dataset.suffix}`;
      stat.addEventListener("reveal", () => countUp(num, Number(stat.style.getPropertyValue("--i")) * 70), { once: true });
    });
  }

  const divider = document.querySelector(".dot-divider");
  if (divider) {
    divider.classList.add("reveal");
    divider.dataset.reveal = "draw";
  }

  const section = (num, title, href, body) => `
    <section class="preview" aria-labelledby="pv-${title}">
      <div class="preview-head reveal">
        <h2 class="preview-title" id="pv-${title}">${num} — ${title}</h2>
        <a class="view-all" href="${href}">View all →</a>
      </div>
      ${body}
    </section>`;

  const projectRows = PROJECTS.slice(0, 3)
    .map(
      (p) => `<a class="preview-row reveal" href="projects.html#${p.id}">
        <div><div class="preview-row-title">${esc(p.name)} — ${esc(p.subtitle)}</div>
        <div class="preview-row-sub">${esc(p.description)}</div></div>
        <div class="preview-row-meta">${esc(p.badge.toLowerCase())}</div>
      </a>`
    )
    .join("");

  const creativeStrip = `<div class="strip">${CREATIVE.filter((w) => w.featured)
    .slice(0, 4)
    .map((w) => {
      const cat = CREATIVE_CATEGORIES.find((c) => c.id === w.category);
      return `<a class="strip-item reveal" data-reveal="pop" href="creative.html#${w.id}" aria-label="${esc(w.title)}, ${esc(cat.singular)}">
        <span class="work-media">${workMedia(w)}</span>
        <span class="strip-cap">${esc(cat.singular)}</span>
      </a>`;
    })
    .join("")}</div>`;

  const expRows = EXPERIENCE.slice(0, 3).map((x) => {
    const r = x.roles[0];
    return `<a class="preview-row reveal" href="experience.html#${x.id}">
      <div><div class="preview-row-title">${esc(x.org)}</div>
      <div class="preview-row-sub">${esc(r.title)}</div></div>
      <div class="preview-row-meta">${esc(r.dateText || `${fmtYm(r.start)} – ${r.end ? fmtYm(r.end) : "now"}`).toLowerCase()}</div>
    </a>`;
  }).join("");

  const stackChips = `<div class="preview-chips tag-list" data-stagger>${STACK.slice(0, 3).flatMap((g) => g.items.slice(0, 3))
    .map((t) => `<span class="tag">${esc(t)}</span>`)
    .join("")}</div>`;

  document.getElementById("previews").innerHTML =
    section("01", "projects", "projects.html", projectRows) +
    section("02", "creative", "creative.html", creativeStrip) +
    section("03", "experience", "experience.html", expRows) +
    section("04", "stack", "stack.html", stackChips);
}

/* ==========================================================================
   Projects
   ========================================================================== */
function renderProjects() {
  const btn = (l) => {
    const isGh = l.type === "github";
    const text = l.label || (isGh ? "source" : "live demo");
    return `<a class="action-btn${isGh ? "" : " is-ghost"}" href="${esc(l.href)}"${l.href.startsWith("http") ? ' target="_blank" rel="noopener noreferrer"' : ""}>
      ${icon(isGh ? "code-xml" : "arrow-up-right")}<span>${esc(text)}</span>
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
    <article class="tl-item" data-watch>
      <div class="tl-mark" aria-hidden="true">${esc(c.initials)}</div>
      <div class="tl-body">
        <h2 class="tl-org">${esc(c.name)}</h2>
        <p class="tl-meta">${esc(c.issuer)}</p>
        ${c.date ? `<p class="role-dates">Issued ${fmtYm(c.date)}</p>` : ""}
        ${c.href ? `<a class="cred-link ext" href="${esc(c.href)}" target="_blank" rel="noopener noreferrer">view credential</a>` : ""}
      </div>
    </article>`
  ).join("");
}

/* ==========================================================================
   Creative
   ========================================================================== */
const RATIOS = { "4:5": [4, 5], "1:1": [1, 1], "16:9": [16, 9], "9:16": [9, 16] };

// Generated monochrome artwork shown until a work has a real image
function placeholderArt(item) {
  const [rw, rh] = RATIOS[item.ratio] || [1, 1];
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

// The picture for a work: its image, or placeholder art while image is null
function workMedia(item, alt = "") {
  return item.image
    ? `<img src="${esc(item.image)}" alt="${esc(alt)}" loading="lazy" />`
    : `<span class="ph">${placeholderArt(item)}<span class="ph-tag">placeholder</span></span>`;
}

function renderCreative() {
  const root = document.getElementById("creative-root");
  const html = document.documentElement;
  const cats = Object.fromEntries(CREATIVE_CATEGORIES.map((c) => [c.id, c]));
  const pad = (n) => String(n).padStart(2, "0");
  const filters = [{ id: "all", label: "All", short: "All" }, ...CREATIVE_CATEGORIES];
  const total = (id) => (id === "all" ? CREATIVE.length : CREATIVE.filter((w) => w.category === id).length);
  const meta = (w) => [cats[w.category].singular, w.year].filter(Boolean).join(" · ");

  const reel = CREATIVE.map((w) => `<span class="reel-item" style="--ar:${RATIOS[w.ratio][0] / RATIOS[w.ratio][1]}">${workMedia(w)}</span>`).join("");

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
          (w, n) => `<li class="work reveal" data-reveal="pop" id="${w.id}" data-cat="${w.category}" data-ratio="${w.ratio}" style="--vt:w-${w.id}">
            <button type="button" class="work-btn" aria-haspopup="dialog" aria-label="View ${esc(w.title)}, ${esc(cats[w.category].singular)}">
              <span class="work-media">${workMedia(w)}</span>
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
    const [rw, rh] = RATIOS[w.ratio] || [1, 1];
    media.style.setProperty("--ar", rw / rh);
    media.innerHTML = workMedia(w, w.alt || w.title);
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
document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  renderChrome(page);
  renderPageHeader(page);

  ({
    home: renderHome,
    projects: renderProjects,
    creative: renderCreative,
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
