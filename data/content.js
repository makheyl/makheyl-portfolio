/* Site content. Edited from the site itself (owner editor) or by hand.
   Loaded before script.js on every page. Keep it valid JSON inside window.CONTENT. */
window.CONTENT = {
  "meta": {
    "version": "initial",
    "updatedAt": "2026-10-27"
  },
  "site": {
    "name": "Makheyl",
    "email": "mchaildelacruz@gmail.com",
    "github": "https://github.com/makheyl",
    "githubUser": "makheyl",
    "resume": "assets/resume.pdf",
    "status": "Developer intern at CloudSwyft",
    "intro": [
      "I'm a web developer who loves building SaaS products and full-stack web apps. I'm currently a developer intern at CloudSwyft and a 4th-year BSIT student specializing in game development.",
      "Right now I'm building KolektaPH, a garbage truck tracker for Carmona, and Folio, an editor for interactive ebooks, alongside SDG-aligned capstone games at school. I love turning rough ideas into things people actually use."
    ],
    "social": [
      {
        "label": "github",
        "href": "https://github.com/makheyl"
      },
      {
        "label": "linkedin",
        "href": "https://www.linkedin.com/in/mchail-dela-cruz"
      },
      {
        "label": "email",
        "href": "mailto:mchaildelacruz@gmail.com"
      },
      {
        "label": "resume",
        "href": "assets/resume.pdf"
      }
    ],
    "portrait": {
      "src": "assets/portrait-gray.jpg",
      "alt": "Black-and-white close-up portrait of Makheyl wearing round glasses"
    }
  },
  "appearance": {
    "defaultTheme": "system",
    "animations": true,
    "clickPulse": true,
    "galleryGrayscale": true
  },
  "nav": {
    "withIcons": [
      {
        "id": "creative",
        "label": "Creative",
        "href": "creative.html",
        "icon": "palette"
      },
      {
        "id": "gear",
        "label": "Gear",
        "href": "gear.html",
        "icon": "laptop"
      },
      {
        "id": "certifications",
        "label": "Certifications",
        "href": "certifications.html",
        "icon": "award"
      },
      {
        "id": "credentials",
        "label": "Credentials",
        "href": "credentials.html",
        "icon": "medal"
      }
    ],
    "textOnly": [
      {
        "id": "projects",
        "label": "Projects",
        "href": "projects.html"
      },
      {
        "id": "experience",
        "label": "Experience",
        "href": "experience.html"
      },
      {
        "id": "stack",
        "label": "Stack",
        "href": "stack.html"
      }
    ]
  },
  "pages": {
    "projects": {
      "title": "projects",
      "intro": "Things I've designed and built, spanning web apps, SaaS tools, and SDG-aligned games."
    },
    "experience": {
      "title": "experience",
      "intro": "Where I've been building, from web systems for local government and my internship at CloudSwyft to design work and SDG-aligned games at school."
    },
    "stack": {
      "title": "tech stack",
      "intro": "The tools, frameworks, and platforms I reach for, across the web, SaaS, games, and cloud."
    },
    "creative": {
      "title": "creative",
      "intro": "Pubmats, graphic design, and 3D work. The visual side of what I make, from marketing layouts to Blender renders."
    },
    "gear": {
      "title": "gear",
      "intro": "The hardware I build, test, and play on every day."
    },
    "credentials": {
      "title": "credentials",
      "intro": "I'm a BS Information Technology student majoring in Game Development at the University of Perpetual Help System Laguna, with a passion for creativity and continuous learning. Beyond academics, I strive to be a positive influence by uplifting and inspiring others through my behavior, teamwork, and dedication."
    },
    "certifications": {
      "title": "certifications",
      "intro": "Certifications I've earned along the way."
    }
  },
  "home": {
    "sections": [
      {
        "id": "stats",
        "visible": true
      },
      {
        "id": "contrib",
        "visible": true
      },
      {
        "id": "projects",
        "visible": true,
        "count": 3
      },
      {
        "id": "creative",
        "visible": true,
        "count": 4
      },
      {
        "id": "experience",
        "visible": true,
        "count": 3
      },
      {
        "id": "stack",
        "visible": true,
        "count": 3
      }
    ]
  },
  "stats": [
    {
      "value": "10+",
      "label": "Projects",
      "href": "projects.html"
    },
    {
      "value": "3",
      "label": "Capstone titles",
      "href": "projects.html#shhkool"
    },
    {
      "value": "4th yr",
      "label": "BSIT",
      "href": "experience.html#uphsl"
    },
    {
      "value": "Intern",
      "label": "@ CloudSwyft",
      "href": "experience.html#cloudswyft"
    }
  ],
  "projects": [
    {
      "id": "kolektaph",
      "name": "KolektaPH",
      "subtitle": "Garbage Truck Tracker",
      "description": "Real-time garbage truck tracking, barangay SMS alerts, and the Ask Kolek assistant for the 14 barangays of Carmona, Cavite. One Expo codebase, three apps: resident, driver, and a City ENRO dashboard, running on a Supabase pilot database and as an installable web app that works offline. Pitched at DICT's Philippine Startup Challenge XI, where it reached the regional top 15 for Region IV-A.",
      "badge": "PSC XI · Top 15",
      "tags": [
        "DICT Region IV-A",
        "Civic tech",
        "Prototype"
      ],
      "icon": "truck",
      "image": "assets/projects/kolektaph.png",
      "links": [
        {
          "type": "github",
          "href": "https://github.com/makheyl/kolektaph"
        }
      ],
      "builtWith": [
        "Expo",
        "React Native",
        "TypeScript",
        "Supabase",
        "MapLibre",
        "Zustand",
        "TanStack Query",
        "PWA"
      ]
    },
    {
      "id": "folio",
      "name": "Folio",
      "subtitle": "Interactive Ebook Editor",
      "description": "A browser-based editor for interactive, animated ebooks, like a simplified Canva built around book pages. Every book exports as one standalone HTML file that works offline with no install or account.",
      "badge": "Web app",
      "tags": [
        "TypeScript",
        "Offline export"
      ],
      "icon": "book-open",
      "image": null,
      "links": [
        {
          "type": "github",
          "href": "https://github.com/makheyl/ebook-maker"
        },
        {
          "type": "demo",
          "href": "https://ebook-maker-woad.vercel.app"
        }
      ],
      "builtWith": [
        "React",
        "TypeScript",
        "Vite",
        "Tailwind CSS",
        "Zustand",
        "Dexie",
        "Playwright"
      ]
    },
    {
      "id": "music-mixer",
      "name": "Music Mixer",
      "subtitle": "AI Mashup Analyzer",
      "description": "Detects the BPM, key, and chord progression of two songs, scores how well they mix, then time-stretches and pitch-shifts one to export a mashup, with an optional Claude-generated bridge.",
      "badge": "AI tool",
      "tags": [
        "Audio",
        "Python"
      ],
      "icon": "audio-lines",
      "image": null,
      "links": [
        {
          "type": "github",
          "href": "https://github.com/makheyl/music-mixer"
        }
      ],
      "builtWith": [
        "Python",
        "FastAPI",
        "librosa",
        "Tailwind CSS",
        "Anthropic API"
      ]
    },
    {
      "id": "studybudget",
      "name": "StudyBudget",
      "subtitle": "Student Finance",
      "description": "A budgeting tool that helps students track allowances and expenses, with a React client and an Express API backed by MongoDB.",
      "badge": "Full-stack",
      "tags": [
        "Finance"
      ],
      "icon": "wallet",
      "image": null,
      "links": [
        {
          "type": "github",
          "href": "https://github.com/makheyl/student-budgeting"
        }
      ],
      "builtWith": [
        "React",
        "Vite",
        "Tailwind CSS",
        "Recharts",
        "Node.js",
        "Express",
        "MongoDB",
        "JWT"
      ]
    },
    {
      "id": "opd-queue",
      "name": "OPD Queue",
      "subtitle": "Out-Patient Queueing",
      "description": "A queueing system for the out-patient department of Carmona's City Health Office, with priority handling, a doctor panel for serving and transferring patients, and a public kiosk display.",
      "badge": "Public sector",
      "tags": [
        "Healthcare",
        "Government"
      ],
      "icon": "hospital",
      "image": null,
      "links": [
        {
          "type": "github",
          "href": "https://github.com/makheyl/opd-queueing-cho-carmona"
        }
      ],
      "builtWith": [
        "PHP",
        "MySQL",
        "JavaScript"
      ]
    },
    {
      "id": "lab-queue",
      "name": "Lab Queue",
      "subtitle": "Laboratory Queueing",
      "description": "The laboratory queue for the same office: encoder interview stations, an extraction station for phlebotomists, a kiosk board that resets itself overnight, and daily to monthly reports with CSV export.",
      "badge": "Public sector",
      "tags": [
        "Healthcare",
        "Government"
      ],
      "icon": "flask-conical",
      "image": null,
      "links": [
        {
          "type": "github",
          "href": "https://github.com/makheyl/php-lab-queueing"
        }
      ],
      "builtWith": [
        "PHP",
        "MariaDB",
        "JavaScript"
      ]
    },
    {
      "id": "pennywise",
      "name": "PennyWise AI",
      "subtitle": "Financial Assistant",
      "description": "A group project that looks at how you actually spend and gives personalized money tips, powered by a locally run Mistral 7B model.",
      "badge": "Group project",
      "tags": [
        "AI",
        "Finance"
      ],
      "icon": "piggy-bank",
      "image": null,
      "links": [
        {
          "type": "github",
          "href": "https://github.com/makheyl/financial-assistant"
        }
      ],
      "builtWith": [
        "Python",
        "HTML",
        "Mistral 7B"
      ]
    },
    {
      "id": "shhkool",
      "name": "SHHKOOL",
      "subtitle": "Classroom Noise Game",
      "description": "A classroom noise-management game played with your actual voice. Keep the room quiet through a real-time Teacher-Attention Cycle, with a keyboard fallback if there's no mic.",
      "badge": "Capstone",
      "tags": [
        "SDG 4",
        "Prototype"
      ],
      "icon": "mic",
      "image": null,
      "links": [
        {
          "type": "github",
          "href": "https://github.com/makheyl/shhkool-ui"
        },
        {
          "type": "demo",
          "href": "https://shhkool-ui.vercel.app"
        }
      ],
      "builtWith": [
        "HTML",
        "CSS",
        "JavaScript"
      ]
    },
    {
      "id": "terraqua-clash",
      "name": "Terraqua Clash",
      "subtitle": "Survival Arena",
      "description": "A physics-based multiplayer animal survival arena built around a real-time Tide-Shift mechanic. The prototype is a top-down arena with local multiplayer.",
      "badge": "Capstone",
      "tags": [
        "SDG 14",
        "SDG 15",
        "Prototype"
      ],
      "icon": "waves",
      "image": null,
      "links": [
        {
          "type": "github",
          "href": "https://github.com/makheyl/terraqua_clash"
        },
        {
          "type": "demo",
          "href": "https://terraqua-clash.vercel.app"
        }
      ],
      "builtWith": [
        "JavaScript",
        "Canvas 2D"
      ]
    },
    {
      "id": "bayanihan",
      "name": "Bayanihan",
      "subtitle": "Disaster Rescue",
      "description": "Take a bangka through a flooded coastal barangay, rescue stranded residents, and ferry them to the evacuation center. A separate 3D prototype saves each mission to a Supabase leaderboard.",
      "badge": "Capstone",
      "tags": [
        "SDG 11",
        "Prototype"
      ],
      "icon": "sailboat",
      "image": null,
      "links": [
        {
          "type": "github",
          "href": "https://github.com/makheyl/bayanihan-rescuegame"
        },
        {
          "type": "demo",
          "href": "https://bayanihan-rescuegame.vercel.app"
        },
        {
          "type": "github",
          "href": "https://github.com/makheyl/Group08_DatabaseConnectivity",
          "label": "3D + db prototype"
        }
      ],
      "builtWith": [
        "JavaScript",
        "Canvas 2D",
        "Three.js",
        "Supabase"
      ]
    },
    {
      "id": "dust-and-shine",
      "name": "Dust & Shine",
      "subtitle": "Cleaning Game",
      "description": "A browser-based casual cleaning game.",
      "badge": "Browser game",
      "tags": [
        "Casual"
      ],
      "icon": "sparkles",
      "image": null,
      "links": [],
      "note": "Source not published yet",
      "builtWith": []
    },
    {
      "id": "cloudswyftcrm",
      "name": "CloudSwyftCRM",
      "subtitle": "Internal CRM",
      "description": "An internal CRM with SharePoint data, automated flows, and interactive email campaigns with CSAT ratings.",
      "badge": "Internship",
      "tags": [
        "Internal tool"
      ],
      "icon": "layout-dashboard",
      "image": null,
      "links": [],
      "note": "Internal to CloudSwyft, not publicly available",
      "builtWith": [
        "Power Apps",
        "SharePoint",
        "Power Automate",
        "Adaptive Cards"
      ]
    }
  ],
  "creative": {
    "categories": [
      {
        "id": "pubmat",
        "label": "Pubmats",
        "short": "Pubmats",
        "singular": "Pubmat"
      },
      {
        "id": "design",
        "label": "Graphic design",
        "short": "Design",
        "singular": "Graphic design"
      },
      {
        "id": "3d",
        "label": "3D work",
        "short": "3D",
        "singular": "3D work"
      }
    ],
    "items": [
      {
        "id": "chaintalk",
        "category": "pubmat",
        "title": "ChainTalk 2026",
        "year": 2026,
        "ratio": "1:1",
        "image": "assets/creative/web/pubmat-chaintalk.jpg",
        "thumb": "assets/creative/web/thumbs/pubmat-chaintalk.jpg",
        "featured": true,
        "description": "Key visual for ChainTalk 2026, a blockchain education and digital innovation event.",
        "alt": "Poster reading Chain Talk 2026 in purple and pink halftone lettering over a pastel galaxy with floating glass cubes.",
        "tools": []
      },
      {
        "id": "old-house",
        "category": "3d",
        "title": "Old House — Interior",
        "year": null,
        "ratio": "16:9",
        "image": "assets/creative/web/3d-old-house.jpg",
        "thumb": "assets/creative/web/thumbs/3d-old-house.jpg",
        "featured": true,
        "description": "An old wooden house interior lit by lanterns and a candle, modelled and rendered in Blender.",
        "alt": "3D render of a warm, lamp-lit wooden room with lattice windows, a round table with books and a lantern, and clay jars.",
        "tools": [
          "Blender"
        ]
      },
      {
        "id": "council-polo-2025",
        "category": "design",
        "title": "CSSC Council Polo 2025–26",
        "year": null,
        "ratio": "1:1",
        "image": "assets/creative/web/design-council-shirt-2025.jpg",
        "thumb": "assets/creative/web/thumbs/design-council-shirt-2025.jpg",
        "featured": true,
        "description": "Polo shirt for the Computer Studies Student Council, A.Y. 2025–2026.",
        "alt": "Polo shirt mockup in black and grey with magenta shards, a large CCS Computer Studies wordmark and the CSSC logo.",
        "tools": []
      },
      {
        "id": "gamex",
        "category": "pubmat",
        "title": "GameX 2026",
        "year": 2026,
        "ratio": "1:1",
        "image": "assets/creative/web/pubmat-gamex.jpg",
        "thumb": "assets/creative/web/thumbs/pubmat-gamex.jpg",
        "featured": true,
        "description": "Event poster for GameX 2026, powered by the UPHSL Game Developers' Club.",
        "alt": "Poster reading GameX 2026, Game On, Chain On, over ancient temple ruins framed by heavy chains.",
        "tools": []
      },
      {
        "id": "bus-stop",
        "category": "3d",
        "title": "Bus Stop at Night",
        "year": null,
        "ratio": "16:9",
        "image": "assets/creative/web/3d-bus-stop.jpg",
        "thumb": "assets/creative/web/thumbs/3d-bus-stop.jpg",
        "description": "A low-poly diorama of a figure waiting at a bus stop under a single street lamp.",
        "alt": "Low-poly 3D scene of a person sitting on a bench at a bus stop at night, lit by a street lamp and a red sign.",
        "tools": [
          "Blender"
        ]
      },
      {
        "id": "university-week-logo",
        "category": "design",
        "title": "University Week 2025 Logo",
        "year": 2025,
        "ratio": "1:1",
        "image": "assets/creative/web/design-university-week-logo.jpg",
        "thumb": "assets/creative/web/thumbs/design-university-week-logo.jpg",
        "description": "Entry for the UPHSL University Week 2025 logo-making competition.",
        "alt": "Logo with a large golden 50 behind the university seal, a trophy, splashing water, and the words UPHSL University Week 2025.",
        "tools": []
      },
      {
        "id": "earthquake-drill",
        "category": "pubmat",
        "title": "Earthquake Drill",
        "year": null,
        "ratio": "1:1",
        "image": "assets/creative/web/pubmat-earthquake-drill.jpg",
        "thumb": "assets/creative/web/thumbs/pubmat-earthquake-drill.jpg",
        "description": "A brutalist-style pubmat for an earthquake drill, made for the Computer Studies Student Council.",
        "alt": "Poster with bold red Earthquake Drill lettering over a photo of students walking with hands over their heads.",
        "tools": []
      },
      {
        "id": "cake",
        "category": "3d",
        "title": "Caramel Cake",
        "year": 2025,
        "ratio": "16:9",
        "image": "assets/creative/web/3d-cake.jpg",
        "thumb": "assets/creative/web/thumbs/3d-cake.jpg",
        "description": "Two slices of layered cake with a textured sponge and dripping caramel glaze.",
        "alt": "3D render of two slices of layered sponge cake with caramel glaze on a dark plate.",
        "tools": [
          "Blender"
        ]
      },
      {
        "id": "dept-polo-circuit",
        "category": "design",
        "title": "CCS Department Polo — Circuit",
        "year": null,
        "ratio": "1:1",
        "image": "assets/creative/web/design-dept-shirt-circuit.jpg",
        "thumb": "assets/creative/web/thumbs/design-dept-shirt-circuit.jpg",
        "description": "Department shirt for the College of Computer Studies, A.Y. 2026–2027.",
        "alt": "Black polo shirt mockup with magenta stripes, faint circuit lines, and a vertical CCS Computer Studies wordmark.",
        "tools": []
      },
      {
        "id": "ccs-days",
        "category": "pubmat",
        "title": "CCS Days Reschedule",
        "year": null,
        "ratio": "1:1",
        "image": "assets/creative/web/pubmat-ccs-days.jpg",
        "thumb": "assets/creative/web/thumbs/pubmat-ccs-days.jpg",
        "description": "Announcement pubmat for the rescheduling of CCS Days.",
        "alt": "Purple poster with a construction crane and the words CCS Days Reschedule, Stay Informed.",
        "tools": []
      },
      {
        "id": "old-house-lantern",
        "category": "3d",
        "title": "Old House — Lantern",
        "year": null,
        "ratio": "16:9",
        "image": "assets/creative/web/3d-old-house-lantern.jpg",
        "thumb": "assets/creative/web/thumbs/3d-old-house-lantern.jpg",
        "description": "A close-up from the old house scene: a lit lantern, stacked books, and a bottle on the table.",
        "alt": "3D render close-up of a glowing lantern beside stacked wooden books and a red bottle on a round table.",
        "tools": [
          "Blender"
        ]
      },
      {
        "id": "committee-jersey",
        "category": "design",
        "title": "Creatives Committee Jersey",
        "year": null,
        "ratio": "4:3",
        "image": "assets/creative/web/design-committee-shirt.jpg",
        "thumb": "assets/creative/web/thumbs/design-committee-shirt.jpg",
        "description": "Front and back jersey design for the CSSC Creatives Committee.",
        "alt": "Front and back of a white jersey with black and magenta panels, the CSSC logo, and Creatives Committee on the back.",
        "tools": []
      },
      {
        "id": "committee-application",
        "category": "pubmat",
        "title": "Committee Application",
        "year": 2026,
        "ratio": "1:1",
        "image": "assets/creative/web/pubmat-committee-application.jpg",
        "thumb": "assets/creative/web/thumbs/pubmat-committee-application.jpg",
        "description": "A clean, light pubmat calling for applications to the CSSC committees.",
        "alt": "White poster with soft paper waves and the words CSSC Committee Application in pink and purple.",
        "tools": []
      },
      {
        "id": "old-house-timelapse",
        "category": "3d",
        "title": "Old House — Timelapse",
        "year": null,
        "ratio": "16:9",
        "image": "assets/creative/web/3d-old-house-timelapse.jpg",
        "thumb": "assets/creative/web/thumbs/3d-old-house-timelapse.jpg",
        "video": "assets/creative/web/3d-old-house-timelapse.mp4",
        "description": "A one-minute timelapse of modelling the old house scene in Blender.",
        "alt": "Blender viewport showing the untextured model of the old house room.",
        "tools": [
          "Blender"
        ]
      },
      {
        "id": "council-polo-2026",
        "category": "design",
        "title": "CSSC Council Polo 2026–27",
        "year": null,
        "ratio": "1:1",
        "image": "assets/creative/web/design-council-shirt-2026.jpg",
        "thumb": "assets/creative/web/thumbs/design-council-shirt-2026.jpg",
        "description": "Polo shirt for the Computer Studies Student Council, A.Y. 2026–2027.",
        "alt": "Polo shirt mockup split into a pink panel and a black panel, with the CSSC logo and the university seal.",
        "tools": []
      },
      {
        "id": "cssc-wizard",
        "category": "pubmat",
        "title": "CSSC Wizard Logo",
        "year": null,
        "ratio": "1:1",
        "image": "assets/creative/web/pubmat-cssc-wizard.jpg",
        "thumb": "assets/creative/web/thumbs/pubmat-cssc-wizard.jpg",
        "description": "A Harry Potter themed take on the Computer Studies Student Council logo.",
        "alt": "The CSSC logo wearing round glasses and a wizard's hat, with a broomstick and wand crossed behind it, on purple.",
        "tools": []
      },
      {
        "id": "cake-nodes",
        "category": "3d",
        "title": "Caramel Cake — Shader Nodes",
        "year": 2025,
        "ratio": "16:9",
        "image": "assets/creative/web/3d-cake-editor.jpg",
        "thumb": "assets/creative/web/thumbs/3d-cake-editor.jpg",
        "description": "The Blender node setup behind the cake's sponge texture, next to the finished render.",
        "alt": "Blender screenshot with a shader node graph on the left and the rendered cake slices on the right.",
        "tools": [
          "Blender"
        ]
      },
      {
        "id": "dept-polo-wave",
        "category": "design",
        "title": "CCS Department Polo — Wave",
        "year": null,
        "ratio": "1:1",
        "image": "assets/creative/web/design-dept-shirt-wave.jpg",
        "thumb": "assets/creative/web/thumbs/design-dept-shirt-wave.jpg",
        "description": "An alternate department shirt in pink for the College of Computer Studies.",
        "alt": "Pink polo shirt mockup with dark flowing curves and a large vertical CCS wordmark.",
        "tools": []
      },
      {
        "id": "campaign",
        "category": "pubmat",
        "title": "Campaign Poster",
        "year": null,
        "ratio": "1:1",
        "image": "assets/creative/web/pubmat-campaign.jpg",
        "thumb": "assets/creative/web/thumbs/pubmat-campaign.jpg",
        "description": "My own campaign pubmat for PRO-External of the Computer Studies Student Council.",
        "alt": "Campaign poster with Makheyl's portrait, the name Dela Cruz, PRO-External, and lists of awards and leadership roles.",
        "tools": []
      }
    ]
  },
  "experience": [
    {
      "id": "psc-xi",
      "initials": "PSC",
      "org": "Philippine Startup Challenge XI · DICT",
      "type": "Startup competition",
      "location": "DICT Region IV-A (CALABARZON)",
      "roles": [
        {
          "title": "Team Lead & Founder, KolektaPH",
          "dateText": "2026 · Regional top 15",
          "description": "Led team KolektaPH, representing UPHSL, from concept note to pitch. Qualified for the regional top 15 of DICT Region IV-A with a garbage-collection tracker for the City of Carmona.",
          "skills": [
            "Pitching",
            "Product design",
            "Expo",
            "React Native",
            "Supabase"
          ],
          "visibleSkills": 3
        }
      ]
    },
    {
      "id": "cloudswyft",
      "initials": "CS",
      "org": "CloudSwyft",
      "type": "Internship",
      "location": "Philippines",
      "roles": [
        {
          "title": "Developer Intern",
          "start": "2026-07",
          "end": null,
          "description": "Contributing to CloudSwyftCRM, an internal CRM with SharePoint data, automated flows, and interactive email campaigns that collect CSAT ratings.",
          "skills": [
            "SharePoint",
            "Power Automate",
            "Power Apps",
            "Adaptive Cards"
          ],
          "visibleSkills": 2
        }
      ]
    },
    {
      "id": "city-health-office",
      "initials": "CHO",
      "org": "City Health Office, City Government of Carmona",
      "type": "Government",
      "location": "Carmona, Cavite",
      "roles": [
        {
          "title": "Software Developer",
          "start": "2025-07",
          "end": null,
          "description": "Built the out-patient (OPD) and laboratory queueing systems for the City Health Office, with priority handling, laboratory waiting queues, patient transfer workflows, and public kiosk displays. Designed and maintained structured reporting features, backed by PHP and MySQL.",
          "skills": [
            "PHP",
            "MySQL",
            "Queueing workflows",
            "Reporting"
          ],
          "visibleSkills": 2
        }
      ]
    },
    {
      "id": "lumbre",
      "initials": "LG",
      "org": "Lumbre Gunsmith Shop",
      "type": "Design & Operations",
      "location": "Silang, Cavite",
      "roles": [
        {
          "title": "Designer & Laser Engraving Operator",
          "start": "2023-10",
          "end": null,
          "description": "Design custom engravings in Photoshop, translating client requirements into precise vector artwork, then run the laser engraving machines in LightBurn to produce them.",
          "skills": [
            "Photoshop",
            "LightBurn",
            "Vector design"
          ],
          "visibleSkills": 2
        }
      ]
    },
    {
      "id": "ccis",
      "initials": "CCIS",
      "org": "CCIS Shooting Range",
      "type": "Digital Operations",
      "location": "Silang, Cavite",
      "roles": [
        {
          "title": "Digital Operations Manager",
          "start": "2023-11",
          "end": "2026-01",
          "description": "Created digital publications and ran marketing campaigns that drew shooters from multiple locations, using current trends and analytics to grow engagement and brand visibility online.",
          "skills": [
            "Digital marketing",
            "Content publishing",
            "Analytics",
            "Adobe Creative Cloud"
          ],
          "visibleSkills": 2
        }
      ]
    },
    {
      "id": "uphsl",
      "initials": "UP",
      "org": "University of Perpetual Help System Laguna",
      "type": "BSIT · Game Development",
      "location": "College of Computer Studies · A.Y. 2023–2027",
      "roles": [
        {
          "title": "BS Information Technology, major in Game Development",
          "start": "2023-09",
          "end": null,
          "durationOverride": "4th year",
          "description": "Dean's Lister. Capstone in progress: SDG-aligned games including SHHKOOL, Terraqua Clash, and Bayanihan.",
          "skills": [
            "Dean's Lister",
            "Unity 6",
            "Three.js",
            "WebGL",
            "Blender",
            "Roblox Studio"
          ],
          "visibleSkills": 3
        }
      ]
    },
    {
      "id": "shs",
      "initials": "AL",
      "org": "Angelo Levardo L. Senior High School",
      "type": "Senior High School · STEM",
      "location": "",
      "roles": [
        {
          "title": "STEM Strand",
          "dateText": "Graduated 2023",
          "description": "Graduated With High Honors and received a Research Award.",
          "skills": [
            "With High Honors",
            "Research Awardee"
          ],
          "visibleSkills": 2
        }
      ]
    }
  ],
  "stack": [
    {
      "category": "Frontend",
      "items": [
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "React Native",
        "Expo",
        "Vite",
        "Tailwind CSS"
      ]
    },
    {
      "category": "Backend & Data",
      "items": [
        "Node.js",
        "Express",
        "PHP",
        "Python",
        "FastAPI",
        "MongoDB",
        "Supabase",
        "PostgreSQL",
        "MySQL",
        "MariaDB"
      ]
    },
    {
      "category": "AI",
      "items": [
        "Anthropic API",
        "Claude",
        "ChatGPT",
        "Mistral 7B",
        "librosa"
      ]
    },
    {
      "category": "Cloud & Tools",
      "items": [
        "Vercel",
        "Google Cloud",
        "AWS",
        "Azure",
        "Git",
        "GitHub",
        "VS Code",
        "Claude Code",
        "Playwright"
      ]
    },
    {
      "category": "Game Development",
      "items": [
        "C#",
        "Unity 6",
        "Three.js",
        "Canvas 2D",
        "WebGL",
        "Blender",
        "Roblox Studio"
      ]
    },
    {
      "category": "Design",
      "items": [
        "Photoshop",
        "Adobe Creative Cloud",
        "Photo & video editing",
        "LightBurn"
      ]
    },
    {
      "category": "Power Platform",
      "items": [
        "Power Apps",
        "Power Automate",
        "SharePoint",
        "Microsoft Lists",
        "Adaptive Cards"
      ]
    }
  ],
  "gear": [
    {
      "name": "MacBook Air M5",
      "spec": "Main laptop · 13\" · 16GB / 512GB",
      "icon": "laptop",
      "image": null
    },
    {
      "name": "Acer Nitro V",
      "spec": "Secondary laptop",
      "icon": "laptop",
      "image": null
    },
    {
      "name": "iPhone 16 Pro Max",
      "spec": "Daily phone",
      "icon": "smartphone",
      "image": null
    }
  ],
  "certifications": [
    {
      "initials": "UN",
      "name": "Unity Certified User: Artist",
      "issuer": "Unity Technologies",
      "date": null,
      "href": null
    },
    {
      "initials": "IC3",
      "name": "IC3 Living Online — Global Standard 5",
      "issuer": "Certiport",
      "date": null,
      "href": null
    }
  ],
  "awards": [
    {
      "title": "Academic Excellence Award",
      "detail": "1st Year"
    },
    {
      "title": "Dean's Lister",
      "detail": "A.Y. 2024–2025"
    },
    {
      "title": "GAWAD III",
      "detail": "Best Video Recap"
    }
  ],
  "leadership": [
    {
      "initials": "CSSC",
      "org": "Computer Studies Student Council",
      "roles": [
        "PRO, IT 3 – Game Development",
        "Head of Creatives",
        "Technical Head, Enrichment Seminar",
        "Officer-in-Charge, Buntings",
        "Merchandise Designer",
        "Social Media Manager"
      ]
    },
    {
      "initials": "SCE",
      "org": "Student Commission on Election",
      "roles": [
        "Technical Head, Miting de Avance"
      ]
    },
    {
      "initials": "AWS",
      "org": "UPHSL AWS Learning Club",
      "roles": [
        "Head of Creatives",
        "Marketing Director"
      ]
    },
    {
      "initials": "GDC",
      "org": "UPHSL Game Developers' Club",
      "roles": [
        "Multimedia Director"
      ]
    }
  ],
  "contrib": {
    "api": "https://github-contributions-api.jogruber.de/v4/",
    "weeks": 26,
    "snapshot": {
      "updated": "2026-10-02",
      "days": {
        "2026-07-21": [
          4,
          1
        ],
        "2026-07-22": [
          1,
          1
        ],
        "2026-07-23": [
          1,
          1
        ],
        "2026-07-24": [
          1,
          1
        ],
        "2026-07-25": [
          2,
          1
        ],
        "2026-07-29": [
          3,
          1
        ],
        "2026-07-30": [
          1,
          1
        ],
        "2026-07-31": [
          1,
          1
        ],
        "2026-08-03": [
          3,
          1
        ],
        "2026-08-05": [
          13,
          3
        ],
        "2026-08-13": [
          1,
          1
        ],
        "2026-08-24": [
          1,
          1
        ],
        "2026-08-25": [
          5,
          1
        ],
        "2026-08-26": [
          6,
          2
        ],
        "2026-08-28": [
          3,
          1
        ],
        "2026-08-29": [
          9,
          2
        ],
        "2026-09-02": [
          2,
          1
        ],
        "2026-09-15": [
          4,
          1
        ],
        "2026-09-18": [
          18,
          4
        ],
        "2026-09-19": [
          4,
          1
        ],
        "2026-09-22": [
          2,
          1
        ],
        "2026-09-23": [
          18,
          4
        ],
        "2026-09-24": [
          12,
          3
        ],
        "2026-09-25": [
          23,
          4
        ],
        "2026-09-27": [
          1,
          1
        ],
        "2026-09-28": [
          2,
          1
        ],
        "2026-09-29": [
          12,
          3
        ],
        "2026-09-30": [
          2,
          1
        ],
        "2026-10-01": [
          5,
          1
        ],
        "2026-10-02": [
          1,
          1
        ]
      }
    }
  }
};
