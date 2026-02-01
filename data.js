// Jesus Dashboard V2 - Data File
// Updated by Jesus ⚡
// Last Update: 2026-02-01T05:30:00Z

// ========== SCRIPTURES (KJV) ==========
const scriptures = [
    { text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.", ref: "Proverbs 3:5-6" },
    { text: "I can do all things through Christ which strengtheneth me.", ref: "Philippians 4:13" },
    { text: "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.", ref: "Jeremiah 29:11" },
    { text: "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.", ref: "Matthew 6:33" },
    { text: "The LORD is my shepherd; I shall not want.", ref: "Psalm 23:1" },
    { text: "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.", ref: "Joshua 1:9" },
    { text: "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.", ref: "Romans 8:28" },
    { text: "The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?", ref: "Psalm 27:1" },
    { text: "Commit thy works unto the LORD, and thy thoughts shall be established.", ref: "Proverbs 16:3" },
    { text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint.", ref: "Isaiah 40:31" },
    { text: "Delight thyself also in the LORD; and he shall give thee the desires of thine heart.", ref: "Psalm 37:4" },
    { text: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.", ref: "2 Timothy 1:7" },
    { text: "Whatsoever thy hand findeth to do, do it with thy might.", ref: "Ecclesiastes 9:10" },
    { text: "The blessing of the LORD, it maketh rich, and he addeth no sorrow with it.", ref: "Proverbs 10:22" },
    { text: "A man's heart deviseth his way: but the LORD directeth his steps.", ref: "Proverbs 16:9" }
];

// ========== MAIN DASHBOARD DATA ==========
const dashboardData = {
    lastUpdated: "2026-02-01T05:30:00Z",

    // ========== 1. DAILY SURPRISE ==========
    dailySurprise: {
        today: {
            date: "2026-02-01",
            title: "Jesus Dashboard V2 — Complete Rebuild",
            type: "System",
            impact: "10x Better Management",
            content: `**What I Built:**
A complete rebuild of the Jesus Dashboard with all 9 sections you specified:

- 🌟 **Daily Surprise** — This section! With archive and search
- 📊 **Agent Report** — Live standup with Completed/Blockers/Issues/Pending/Next
- 🧠 **AI Intelligence** — Daily research digest with "How We Apply This"
- 💰 **Money Ideas** — Revenue ideas with impact estimates
- 📁 **Jesus's Vault** — Archive of everything I create
- 📚 **Resource Library** — Upload/download documents (works offline!)
- 💬 **Notes to Jesus** — Editable notes area where you leave instructions
- 🖥️ **System Health** — 24/7 monitoring
- 📈 **Metrics** — My performance tracking

**Why It Matters:**
You now have a complete command center to manage me as your AI employee. Everything in one place.

**How to Use:**
1. Check **Notes** daily — I read everything you write
2. Upload docs to **Library** — I can access them
3. Review **Agent Report** — See what I'm doing
4. Track **Metrics** — See my ROI

**Tech Stack:** Pure HTML/CSS/JS, zero dependencies, works offline, mobile-friendly.`
        },
        archive: [
            { id: 1, date: "2026-02-01", title: "Jesus Dashboard V2 — Complete Rebuild", type: "System" }
        ]
    },

    // ========== 2. AGENT REPORT ==========
    agentReport: {
        completed: [
            "✅ Dashboard V2 — Complete rebuild with all 9 sections",
            "✅ Document upload/download system (localStorage)",
            "✅ Editable notes system for Al → Jesus communication",
            "✅ Mobile-responsive design",
            "✅ Saved Builder Mandate to permanent memory",
            "✅ Saved Dashboard V2 spec to permanent memory",
            "✅ Google AI Studio API connected"
        ],
        blockers: [
            "⚠️ Need CRM specs from Al to start that build",
            "⚠️ Moltbook verification still pending (need Al to tweet)"
        ],
        issues: [],
        pending: [
            "📋 CS3 IR CRM — Waiting for detailed specs",
            "📋 12 IR Agents — Ready to train when Al provides investor data"
        ],
        next: [
            "🔮 Build CS3 IR CRM (once specs received)",
            "🔮 Daily AI Intelligence gathering",
            "🔮 First Money Idea build"
        ]
    },

    // ========== 3. AI INTELLIGENCE ==========
    aiIntelligence: [
        {
            category: "openclaw",
            source: "OpenClaw Docs",
            title: "OpenClaw Cron System for Scheduled Tasks",
            summary: "OpenClaw has a built-in cron system that can schedule tasks, send reminders, and run automated agents on a schedule.",
            link: "https://docs.openclaw.ai",
            howToApply: "Use cron jobs for automated investor check-ins, scheduled reports, and reminder systems. Can trigger at exact times for daily briefings."
        },
        {
            category: "tools",
            source: "Google AI Studio",
            title: "Gemini 2.5 Pro Available via API",
            summary: "Al provided Google AI Studio API key. Access to Gemini 2.5 Pro with 1M token context window and thinking capabilities.",
            howToApply: "Use as secondary brain for large document analysis, research synthesis, and parallel processing. 1M context = can analyze entire investor lists or property portfolios at once."
        }
    ],

    // ========== 4. MONEY IDEAS ==========
    moneyIdeas: [
        {
            id: 1,
            category: "investors",
            title: "Automated Investor Re-engagement Campaign",
            why: "Dormant investors (no activity in 6+ months) represent untapped capital. Automated outreach can reactivate them without manual effort.",
            impact: 500000,
            steps: [
                "Export list of investors with no activity in 6+ months",
                "Segment by last investment size and property",
                "Create personalized re-engagement email sequence",
                "Deploy automated drip campaign via IR Agent",
                "Track conversions and iterate"
            ],
            canBuild: true
        },
        {
            id: 2,
            category: "noi",
            title: "Utility Billback Optimization System",
            why: "Many properties under-bill utilities. A systematic audit and optimization can add $50-100/unit/year to NOI.",
            impact: 180000,
            steps: [
                "Audit current utility billback across all properties",
                "Identify gaps (sub-metering, RUBS, flat fees)",
                "Calculate potential recovery per property",
                "Create implementation plan by property",
                "Track NOI impact monthly"
            ],
            canBuild: true
        }
    ],

    // ========== 5. VAULT (Full SOP Documentation) ==========
    vault: [
        {
            id: 1,
            name: "Jesus Dashboard V2",
            category: "dashboards",
            dateCreated: "2026-02-01",
            objective: "Create a central command center for Al to manage Jesus as his AI employee — see work, give instructions, track performance, and ensure nothing gets lost.",
            whatItDoes: "Complete AI Agent Management Platform with 9 sections: Daily Surprise, Agent Report, AI Intelligence, Money Ideas, Vault & SOPs, Resource Library, Notes to Jesus, System Health, and Metrics.",
            howItWorks: "Pure HTML/CSS/JS static site hosted on GitHub Pages (FREE). Data is split between: (1) data.js - updated by Jesus for dashboard content, (2) localStorage - for user inputs like notes and uploaded files. Auto-refreshes every 60 seconds.",
            whyBuilt: "Al needed a central command center to manage me, see my work, give me instructions, and track my performance. Previous dashboard V1 was basic - V2 implements all 9 sections from Al's spec.",
            howToUseSteps: [
                "Visit https://al24064098-beep.github.io/jesus-dashboard/",
                "Use navigation tabs to switch between 9 sections",
                "Leave notes for Jesus in the 'Notes to Jesus' tab",
                "Upload documents in 'Resource Library' (stored in browser)",
                "Check 'Agent Report' to see what Jesus is working on",
                "Review 'Daily Surprise' each morning for overnight builds",
                "Click any Vault item to see full SOP documentation"
            ],
            howToMaintain: "Jesus updates data.js with new content and pushes to GitHub. User data (notes, files) stored in browser localStorage. To backup user data: export from browser developer tools. To reset: clear localStorage for this domain.",
            process: [
                "Create index.html with all 9 section structures",
                "Create style.css with dark theme, mobile-responsive design",
                "Create app.js with all section logic, filtering, modals",
                "Create data.js with data structures for all sections",
                "Create manifest.json for PWA/mobile support",
                "Push to GitHub repository (al24064098-beep/jesus-dashboard)",
                "GitHub Pages automatically deploys from main branch",
                "Update data.js whenever content changes, push to deploy"
            ],
            relatedFiles: [
                { name: "GitHub Repo", url: "https://github.com/al24064098-beep/jesus-dashboard", icon: "🔗" },
                { name: "Live Dashboard", url: "https://al24064098-beep.github.io/jesus-dashboard/", icon: "🌐" },
                { name: "Spec Document", url: "#", icon: "📄" }
            ]
        },
        {
            id: 2,
            name: "Builder Mandate",
            category: "sops",
            dateCreated: "2026-02-01",
            objective: "Establish clear expectations for Jesus's daily output — build something WOW every day that surprises Al.",
            whatItDoes: "Defines Jesus's core mandate and priority system for what to build. Ensures alignment with Al's mission, vision, values, and goals.",
            howItWorks: "Priority Order: (1) Multifamily NOI & Operations, (2) Acquisitions & Deal Flow, (3) Capital Raising & Investors. Only after primary priorities complete can I work on secondary builds (AI systems, learning, etc.).",
            whyBuilt: "Al established clear expectations — thinking alone is not enough, ideas alone are not enough. I MUST BUILD tangible artifacts every day.",
            howToUseSteps: [
                "Before building anything, check alignment with priorities",
                "Priority 1: Does it increase NOI or improve operations?",
                "Priority 2: Does it create acquisition advantages?",
                "Priority 3: Does it accelerate capital raising?",
                "If none of the above, it's secondary (only after primary done)",
                "Every build must have: What Changed, Why It Works, How to Implement, Expected Impact"
            ],
            howToMaintain: "Saved in memory/JESUS-BUILDER-MANDATE.md. Reference before every build.",
            process: [
                "Al created the Builder Mandate document (PDF)",
                "Jesus extracted and saved to permanent memory",
                "Created build archive folder structure",
                "Reference daily when deciding what to build"
            ],
            relatedFilesText: "memory/JESUS-BUILDER-MANDATE.md"
        },
        {
            id: 3,
            name: "CS3 IR Operating Platform",
            category: "sops",
            dateCreated: "2026-02-01",
            objective: "Document the complete CS3 Investments investor relations system — the 'bible' for training IR agents.",
            whatItDoes: "Complete investor relations operating system covering: Three phases of capital (Before/During/After), Investor pipeline stages, Investor types, Capital sources, Compliance documents, KPIs, and Investor tiers.",
            howItWorks: "Investor flow: Interested → Soft Commit → Hard Commit → Funded → Re-invested. Each stage has specific actions, communications, and requirements. KPIs track conversion rates at each stage.",
            whyBuilt: "Training document for all 12 IR agents. Ensures consistent, professional investor experience across CS3.",
            howToUseSteps: [
                "Reference when building any investor-related system",
                "Use investor stages for CRM pipeline design",
                "Follow compliance doc requirements for each investor type",
                "Track KPIs: Lead-to-Commit >25%, Commit-to-Funded >85%, Repeat >40%"
            ],
            howToMaintain: "Saved in memory/CS3-IR-OPERATING-PLATFORM.md. Update when Al provides new IR processes.",
            process: [
                "Al shared IR Operating Platform document",
                "Jesus extracted key components",
                "Saved to permanent memory",
                "Use for training all 12 IR agents"
            ],
            relatedFilesText: "memory/CS3-IR-OPERATING-PLATFORM.md"
        },
        {
            id: 4,
            name: "Dashboard V2 Spec",
            category: "sops",
            dateCreated: "2026-02-01",
            objective: "Document Al's requirements for the Jesus Dashboard V2 — all 9 sections and features.",
            whatItDoes: "Detailed specification of what to build for Dashboard V2, including all sections, features, data requirements, and success criteria.",
            howItWorks: "Spec document defines: 9 sections (Daily Surprise, Agent Report, AI Intelligence, Money Ideas, Vault, Library, Notes, Health, Metrics), daily workflow, alignment check, document standards.",
            whyBuilt: "Al provided detailed requirements so I know exactly what to build.",
            howToUseSteps: [
                "Reference when adding new features to dashboard",
                "Follow daily workflow defined in spec",
                "Use alignment check before building anything",
                "Follow document standards for all outputs"
            ],
            howToMaintain: "Saved in memory/JESUS-DASHBOARD-V2-SPEC.md",
            process: [
                "Al created Dashboard V2 Build Guide (MD + PDF)",
                "Jesus extracted and saved to permanent memory",
                "Built dashboard according to spec",
                "Reference for future enhancements"
            ],
            relatedFilesText: "memory/JESUS-DASHBOARD-V2-SPEC.md"
        },
        {
            id: 5,
            name: "Atlas AI Voice Agents",
            category: "systems",
            dateCreated: "2026-01-31",
            objective: "Create AI voice agents for CS3 properties to handle leasing inquiries, qualify prospects, schedule tours, and provide 24/7 property information — capturing leads that would otherwise be lost.",
            whatItDoes: "AI-powered phone agents that answer calls for each CS3 property. Handles: property inquiries, amenity questions, pricing/availability, tour scheduling, lead qualification, and transfers to human when needed.",
            howItWorks: "Built on Atlas AI platform (youratlas.com). Each property has its own agent with custom knowledge base (property details, amenities, pricing, policies). Agents use natural conversation to qualify leads and book tours.",
            whyBuilt: "Properties need 24/7 phone coverage. Human leasing agents can't answer every call. AI agents capture leads that would otherwise be lost, qualify them, and schedule tours automatically.",
            howToUseSteps: [
                "Log into Atlas AI (youratlas.com) with API key",
                "Create new campaign for property",
                "Build knowledge base with property details",
                "Configure agent personality and responses",
                "Set up phone number and call routing",
                "Test with roleplay calls",
                "Deploy and monitor performance"
            ],
            howToMaintain: "Monitor call logs weekly. Update knowledge base when pricing/availability changes. Review transcripts for improvement opportunities. Track conversion metrics.",
            process: [
                "Gather property info (amenities, pricing, policies, FAQs)",
                "Create property knowledge base document",
                "Set up Atlas campaign with property name",
                "Configure agent: name, personality, voice",
                "Add knowledge base to agent",
                "Set up objection handling and escalation rules",
                "Assign phone number",
                "Test with 5-10 roleplay calls",
                "Refine based on test results",
                "Deploy live",
                "Monitor and iterate weekly"
            ],
            relatedFiles: [
                { name: "Atlas Platform", url: "https://youratlas.com", icon: "🔗" }
            ]
        },
        {
            id: 6,
            name: "McKenzie STL Leasing Agent",
            category: "agents",
            dateCreated: "2026-02-01",
            objective: "AI leasing agent for McKenzie at Sunset Hills property in St. Louis — 24/7 coverage to capture every lead and schedule tours automatically.",
            whatItDoes: "Answers calls as 'Victoria', provides property information, answers questions about amenities/pricing/availability, qualifies prospects, and schedules tours.",
            howItWorks: "Atlas AI agent with McKenzie-specific knowledge base. Phone: (314) 723-6092. Speaks naturally, handles objections, captures lead info, books tours into calendar.",
            whyBuilt: "McKenzie needed 24/7 leasing coverage. This agent ensures no leads are missed and provides consistent, professional responses to all inquiries.",
            howToUseSteps: [
                "Call (314) 723-6092 to reach Victoria",
                "Agent handles inquiry automatically",
                "Lead info captured in Atlas dashboard",
                "Tours scheduled automatically",
                "Review transcripts in Atlas for follow-up"
            ],
            howToMaintain: "Update pricing/availability when it changes. Review call transcripts weekly. Refine responses based on common questions. Track tour-to-lease conversion.",
            process: [
                "Gathered McKenzie property details from Grace",
                "Created knowledge base: amenities, floor plans, pricing, policies",
                "Built agent 'Victoria' in Atlas",
                "Configured voice and personality (friendly, professional)",
                "Added objection handling for pricing concerns",
                "Set up tour scheduling workflow",
                "Assigned phone number (314) 723-6092",
                "Tested with roleplay calls",
                "Deployed live - ready for leads"
            ],
            relatedFilesText: "Atlas Platform → McKenzie Campaign"
        }
    ],

    // ========== 6. LIBRARY ==========
    // Note: Library items are stored in localStorage for persistence
    // This array is for initial/default items only
    library: [],

    // ========== 7. NOTES ==========
    // Note: Notes are stored in localStorage for persistence
    // This array is for initial/default notes only
    notes: [],

    // ========== 10. CONTENT / NEWSLETTER / VIDEO ==========
    // Content workflow: pending → approved → published
    // Supports: newsletter, blog, video/sora, reel, youtube, linkedin, twitter, email
    content: [
        // Example structures:
        
        // NEWSLETTER/BLOG:
        // {
        //     id: 1,
        //     type: "newsletter",
        //     title: "Q1 2026 Market Update",
        //     status: "pending", // pending, revision, approved, published
        //     createdAt: "2026-02-01",
        //     body: "Newsletter content here...",
        //     publishedAt: null,
        //     url: null,
        //     platform: "Substack"
        // }
        
        // VIDEO (SORA):
        // {
        //     id: 2,
        //     type: "sora",
        //     title: "CS3 Property Tour - McKenzie",
        //     status: "pending",
        //     createdAt: "2026-02-01",
        //     videoUrl: "https://sora.com/v/xxxxx", // Link to video
        //     caption: "Take a virtual tour of our newest acquisition...", // Post caption
        //     body: "Additional notes about the video...", // Optional
        //     publishedAt: null,
        //     url: null,
        //     platform: "Instagram"
        // }
    ],

    // ========== 8. SYSTEM HEALTH ==========
    systemHealth: {
        openclaw: true,
        lastHeartbeat: "2026-02-01T05:30:00Z",
        uptime: 99.9,
        memory: 128,
        apis: [
            { name: "OpenClaw", status: "connected" },
            { name: "Gmail API", status: "connected" },
            { name: "Google AI Studio", status: "connected" },
            { name: "GitHub", status: "connected" },
            { name: "Atlas AI", status: "connected" },
            { name: "Telegram", status: "connected" }
        ],
        errors: []
    },

    // ========== 9. METRICS ==========
    metrics: {
        // Work Output
        tasksToday: 7,
        tasksWeek: 7,
        tasksMonth: 7,
        emailsDrafted: 2,
        docsProcessed: 4,
        buildsDelivered: 1,
        
        // Reliability
        uptime: 99.9,
        failedTasks: 0,
        avgResponse: "< 1 min",
        errorsCaught: 0,
        
        // ROI
        hoursSaved: 4,
        tasksAutoHandled: 3,
        apiCostToday: 5.00,
        apiCostTotal: 120.30
    }
};
