// What can be edited, and how. Each collection maps a list in window.CONTENT to the
// cards on one page; each field becomes an input in the side panel (see fields.js).

const ICONS = [
  "truck", "book-open", "audio-lines", "wallet", "hospital", "flask-conical", "piggy-bank", "mic",
  "waves", "sailboat", "sparkles", "layout-dashboard", "code-xml", "globe", "smartphone", "laptop",
  "monitor", "gamepad-2", "palette", "camera", "film", "music", "map", "map-pin", "rocket", "brain",
  "bot", "database", "server", "cloud", "shield", "lock", "graduation-cap", "school", "briefcase",
  "building-2", "users", "heart", "leaf", "trophy", "medal", "award", "star", "zap", "cpu", "keyboard",
  "mouse", "headphones", "tablet", "watch", "printer", "package", "shopping-bag", "calendar", "clock",
  "pen-tool", "image", "box", "layers", "terminal", "git-branch", "github", "linkedin", "mail", "file-text",
];

export const iconList = ICONS;

const yesNo = (label, hint) => ({ type: "toggle", label, hint });
const hiddenField = { key: "hidden", ...yesNo("Hidden", "Hidden items stay in your draft but aren't shown to visitors.") };

export const COLLECTIONS = [
  {
    key: "projects",
    page: "projects",
    label: "Projects",
    singular: "project",
    selector: "#projects-list > .project",
    addAfter: "#projects-list",
    title: (it) => it.name || "Untitled project",
    create: () => ({ name: "New project", subtitle: "", description: "", badge: "Web app", tags: [], icon: "code-xml", image: null, links: [], builtWith: [] }),
    fields: [
      { key: "name", type: "text", label: "Name", required: true },
      { key: "subtitle", type: "text", label: "Subtitle", hint: 'Shown after the name: "Name — Subtitle".' },
      { key: "description", type: "textarea", label: "Description" },
      { key: "badge", type: "text", label: "Badge", hint: "The filled pill, e.g. Web app, Capstone, PSC XI · Top 15." },
      { key: "tags", type: "tags", label: "Tags", hint: "Outlined pills next to the badge." },
      { key: "image", type: "image", kind: "icon", label: "App icon", hint: "Square image. Leave empty to use the icon below." },
      { key: "icon", type: "icon", label: "Fallback icon" },
      {
        key: "links",
        type: "list",
        label: "Buttons",
        itemLabel: (l) => l.label || (l.type === "demo" ? "live demo" : "source"),
        create: () => ({ type: "github", href: "https://github.com/makheyl/" }),
        fields: [
          { key: "type", type: "select", label: "Type", options: [{ value: "github", label: "Source code" }, { value: "demo", label: "Live demo" }] },
          { key: "href", type: "url", label: "Link", required: true },
          { key: "label", type: "text", label: "Button text", hint: "Optional. Defaults to “source” or “live demo”." },
        ],
      },
      { key: "note", type: "text", label: "Note when there are no buttons", hint: "e.g. Internal to CloudSwyft, not publicly available." },
      { key: "builtWith", type: "tags", label: "Built with" },
      hiddenField,
    ],
  },
  {
    key: "creative.items",
    page: "creative",
    label: "Creative works",
    singular: "work",
    selector: "#works > .work",
    addAfter: ".works-wrap",
    title: (it) => it.title || "Untitled work",
    create: (c) => ({ title: "New work", category: (c.creative.categories[0] || {}).id || "design", year: new Date().getFullYear(), ratio: "1:1", image: null, tools: [], description: "", alt: "" }),
    fields: [
      { key: "image", type: "image", kind: "work", label: "Image", required: true, hint: "Any shape. A full-size copy and a thumbnail are made for you." },
      { key: "title", type: "text", label: "Title", required: true },
      { key: "category", type: "select", label: "Category", options: (c) => c.creative.categories.map((x) => ({ value: x.id, label: x.label })) },
      { key: "year", type: "number", label: "Year" },
      { key: "description", type: "textarea", label: "Description" },
      { key: "alt", type: "textarea", label: "Image description", hint: "What the picture shows, read aloud by screen readers." },
      { key: "tools", type: "tags", label: "Tools" },
      { key: "video", type: "video", label: "Video", hint: "Optional. A YouTube or Vimeo link, or an MP4 under 3 MB. The image is used as its cover." },
      { key: "featured", ...yesNo("Featured on the home page") },
      hiddenField,
    ],
  },
  {
    key: "experience",
    page: "experience",
    label: "Experience",
    singular: "entry",
    selector: "#timeline > .tl-item",
    addAfter: "#timeline",
    title: (it) => it.org || "New entry",
    create: () => ({ initials: "NEW", org: "Organization", type: "", location: "", roles: [{ title: "Role", start: "", end: null, description: "", skills: [], visibleSkills: 3 }] }),
    fields: [
      { key: "org", type: "text", label: "Organization", required: true },
      { key: "initials", type: "text", label: "Initials", hint: "Shown in the box on the timeline. 2–4 letters." },
      { key: "type", type: "text", label: "Type", hint: "e.g. Internship, Full-time, Startup competition." },
      { key: "location", type: "text", label: "Location" },
      {
        key: "roles",
        type: "list",
        label: "Roles",
        itemLabel: (r) => r.title || "Role",
        create: () => ({ title: "Role", start: "", end: null, description: "", skills: [], visibleSkills: 3 }),
        fields: [
          { key: "title", type: "text", label: "Title", required: true },
          { key: "start", type: "month", label: "Start" },
          { key: "end", type: "month", label: "End", hint: "Leave empty for “Present”." },
          { key: "dateText", type: "text", label: "Custom date text", hint: "Optional. Replaces the dates, e.g. “Graduated 2023”." },
          { key: "description", type: "textarea", label: "Description" },
          { key: "skills", type: "tags", label: "Skills" },
          { key: "visibleSkills", type: "number", label: "Skills shown before “+N”" },
        ],
      },
      hiddenField,
    ],
  },
  {
    key: "stack",
    page: "stack",
    label: "Stack",
    singular: "group",
    selector: "#stack-list > .stack-group",
    addAfter: "#stack-list",
    title: (it) => it.category || "New group",
    create: () => ({ category: "New group", items: [] }),
    fields: [
      { key: "category", type: "text", label: "Group name", required: true },
      { key: "items", type: "tags", label: "Tools and skills" },
      hiddenField,
    ],
  },
  {
    key: "gear",
    page: "gear",
    label: "Gear",
    singular: "item",
    selector: "#gear-grid > .gear-card",
    addAfter: "#gear-grid",
    title: (it) => it.name || "New item",
    create: () => ({ name: "New item", spec: "", icon: "laptop", image: null }),
    fields: [
      { key: "name", type: "text", label: "Name", required: true },
      { key: "spec", type: "text", label: "Details" },
      { key: "image", type: "image", kind: "photo", label: "Photo", hint: "Optional. Leave empty to show the icon." },
      { key: "icon", type: "icon", label: "Icon" },
      hiddenField,
    ],
  },
  {
    key: "certifications",
    page: "certifications",
    label: "Certifications",
    singular: "certification",
    selector: "#cert-list > .tl-item",
    addAfter: "#cert-list",
    title: (it) => it.name || "New certification",
    create: () => ({ initials: "", name: "New certification", issuer: "", date: null, href: null }),
    fields: [
      { key: "name", type: "text", label: "Name", required: true },
      { key: "issuer", type: "text", label: "Issuer" },
      { key: "initials", type: "text", label: "Initials" },
      { key: "date", type: "month", label: "Issued" },
      { key: "href", type: "url", label: "Credential link" },
      hiddenField,
    ],
  },
  {
    key: "leadership",
    page: "credentials",
    label: "Leadership",
    singular: "organization",
    selector: 'section[aria-labelledby="cred-leadership"] .timeline > .tl-item',
    addAfter: 'section[aria-labelledby="cred-leadership"] .timeline',
    title: (it) => it.org || "New organization",
    create: () => ({ initials: "", org: "New organization", roles: [] }),
    fields: [
      { key: "org", type: "text", label: "Organization", required: true },
      { key: "initials", type: "text", label: "Initials" },
      { key: "roles", type: "tags", label: "Positions", hint: "Each position is listed on its own line." },
      hiddenField,
    ],
  },
  {
    key: "awards",
    page: "credentials",
    label: "Academic awards",
    singular: "award",
    selector: ".cred-awards > .cred-award",
    addAfter: ".cred-awards",
    title: (it) => it.title || "New award",
    create: () => ({ title: "New award", detail: "" }),
    fields: [
      { key: "title", type: "text", label: "Award", required: true },
      { key: "detail", type: "text", label: "Detail", hint: "e.g. 1st Year, A.Y. 2024–2025." },
      hiddenField,
    ],
  },
  {
    key: "stats",
    page: "home",
    label: "Stats",
    singular: "stat",
    selector: "#stats > .stat",
    addAfter: "#stats",
    title: (it) => `${it.value} ${it.label}`,
    create: () => ({ value: "1", label: "New stat", href: "projects.html" }),
    fields: [
      { key: "value", type: "text", label: "Value", hint: "Plain numbers like 10 or 10+ count up." },
      { key: "label", type: "text", label: "Label" },
      { key: "href", type: "url", label: "Links to", hint: "e.g. projects.html or experience.html#uphsl" },
      hiddenField,
    ],
  },
];

const PAGE_NAMES = {
  projects: "Projects", creative: "Creative", experience: "Experience", stack: "Stack",
  gear: "Gear", certifications: "Certifications", credentials: "Credentials",
};

// Settings panel tabs. Each edits one object in window.CONTENT.
export const SETTINGS = [
  {
    id: "profile",
    label: "Profile",
    target: (c) => c.site,
    fields: [
      { key: "name", type: "text", label: "Name", required: true },
      { key: "status", type: "text", label: "Status", hint: "The pill above your name, e.g. Developer intern at CloudSwyft." },
      { key: "statusVisible", type: "toggle", label: "Show status", defaultValue: true },
      { key: "intro", type: "strings", label: "Intro paragraphs" },
      { key: "portrait", type: "group", label: "Portrait", fields: [
        { key: "src", type: "image", kind: "portrait", label: "Photo" },
        { key: "alt", type: "textarea", label: "Photo description" },
      ] },
      {
        key: "social",
        type: "list",
        label: "Links under your intro",
        itemLabel: (s) => s.label || "link",
        create: () => ({ label: "link", href: "https://" }),
        fields: [
          { key: "label", type: "text", label: "Text" },
          { key: "href", type: "url", label: "Link" },
          hiddenField,
        ],
      },
      { key: "email", type: "text", label: "Email" },
      { key: "resume", type: "file", accept: "application/pdf", dir: "assets", label: "Résumé (PDF)" },
      { key: "github", type: "url", label: "GitHub profile" },
      { key: "githubUser", type: "text", label: "GitHub username", hint: "Used for the contributions graph." },
    ],
  },
  {
    id: "home",
    label: "Home",
    target: (c) => c.home,
    fields: [
      {
        key: "sections",
        type: "list",
        label: "Home sections",
        hint: "Drag to reorder the previews. Stats and the GitHub graph always sit under your intro.",
        fixed: true,
        itemLabel: (s) => ({ stats: "Stats", contrib: "GitHub graph", projects: "Projects", creative: "Creative", experience: "Experience", stack: "Stack" })[s.id] || s.id,
        fields: [
          { key: "visible", type: "toggle", label: "Show", defaultValue: true },
          { key: "count", type: "number", label: "Items shown", showIf: (s) => !["stats", "contrib"].includes(s.id) },
        ],
      },
    ],
  },
  {
    id: "pages",
    label: "Pages",
    target: (c) => c.pages,
    fields: Object.entries(PAGE_NAMES).map(([key, label]) => ({
      key,
      type: "group",
      label,
      fields: [
        { key: "title", type: "text", label: "Title" },
        { key: "intro", type: "textarea", label: "Intro" },
      ],
    })),
  },
  {
    id: "nav",
    label: "Menu",
    target: (c) => c.nav,
    fields: [
      {
        key: "withIcons",
        type: "list",
        label: "Menu (with icons)",
        fixed: true,
        itemLabel: (n) => n.label,
        fields: [
          { key: "label", type: "text", label: "Label" },
          { key: "icon", type: "icon", label: "Icon" },
          { key: "hidden", type: "toggle", label: "Hidden from the menu" },
        ],
      },
      {
        key: "textOnly",
        type: "list",
        label: "Menu (text only)",
        fixed: true,
        itemLabel: (n) => n.label,
        fields: [
          { key: "label", type: "text", label: "Label" },
          { key: "hidden", type: "toggle", label: "Hidden from the menu" },
        ],
      },
    ],
  },
  {
    id: "appearance",
    label: "Look",
    target: (c) => c.appearance,
    fields: [
      { key: "defaultTheme", type: "select", label: "Default theme", hint: "Visitors can still switch.", options: [
        { value: "system", label: "Match the device" }, { value: "light", label: "Light" }, { value: "dark", label: "Dark" },
      ] },
      { key: "animations", type: "toggle", label: "Entry animations", defaultValue: true, hint: "Takes effect on the next page load." },
      { key: "clickPulse", type: "toggle", label: "Pulse when clicking empty space", defaultValue: true, hint: "Takes effect on the next page load." },
      { key: "galleryGrayscale", type: "toggle", label: "Gallery in black and white until hovered", defaultValue: true },
    ],
  },
  {
    id: "graph",
    label: "Graph",
    target: (c) => c.contrib,
    fields: [
      { key: "weeks", type: "select", label: "GitHub graph range", options: [
        { value: 13, label: "3 months" }, { value: 26, label: "6 months" }, { value: 52, label: "12 months" },
      ] },
    ],
  },
  {
    id: "categories",
    label: "Categories",
    target: (c) => c.creative,
    fields: [
      {
        key: "categories",
        type: "list",
        label: "Creative categories",
        itemLabel: (k) => k.label || k.id,
        create: () => ({ id: "category-" + Date.now().toString(36), label: "New category", short: "New", singular: "New category" }),
        fields: [
          { key: "label", type: "text", label: "Name (filter)" },
          { key: "short", type: "text", label: "Short name (phones)" },
          { key: "singular", type: "text", label: "Name for one work" },
        ],
      },
    ],
  },
];
