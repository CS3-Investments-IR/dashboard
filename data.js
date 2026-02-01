// Jesus Dashboard Data - Updated by Jesus ⚡
// Last Update: 2026-02-01T03:28:00Z

// KJV Scriptures - Rotate every 10 minutes
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
    { text: "A man's heart deviseth his way: but the LORD directeth his steps.", ref: "Proverbs 16:9" },
    { text: "The blessing of the LORD, it maketh rich, and he addeth no sorrow with it.", ref: "Proverbs 10:22" },
    { text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.", ref: "Philippians 4:6" },
    { text: "He that handleth a matter wisely shall find good: and whoso trusteth in the LORD, happy is he.", ref: "Proverbs 16:20" },
    { text: "The fear of the LORD is the beginning of wisdom: and the knowledge of the holy is understanding.", ref: "Proverbs 9:10" },
    { text: "Whatsoever thy hand findeth to do, do it with thy might.", ref: "Ecclesiastes 9:10" }
];

const dashboardData = {
    lastUpdated: "2026-02-01T06:25:00Z",
    
    // Current status
    status: {
        online: true,
        working: true,  // true = actively working, false = idle
        statusText: "McKenzie Leasing Agent DONE ✅",  // What I'm doing right now
        activeProject: "Atlas AI Campaigns",
        tasksToday: 9
    },
    
    // Tasks (Kanban)
    tasks: {
        backlog: [
            { id: 1, title: "Gateway Village - Get property info", priority: "medium", project: "Atlas" },
            { id: 3, title: "Set up Twilio integration", priority: "low", project: "Atlas" },
            { id: 10, title: "Reserve at Cool Springs agent", priority: "medium", project: "Atlas" },
            { id: 11, title: "Winding Springs agent", priority: "medium", project: "Atlas" }
        ],
        todo: [
            { id: 4, title: "Legacy Townhomes agent", priority: "high", project: "Atlas" },
            { id: 5, title: "Confirm Legend property status", priority: "medium", project: "Atlas" }
        ],
        inprogress: [
            { id: 2, title: "Create 12 IR Agents", priority: "high", project: "IR Agents" }
        ],
        done: [
            { id: 14, title: "McKenzie STL Leasing Agent", priority: "high", project: "Atlas", completed: "2026-02-01" },
            { id: 6, title: "Jesus Dashboard COMPLETE", priority: "high", project: "Dashboard", completed: "2026-02-01" },
            { id: 12, title: "Gmail API Integration", priority: "high", project: "Dashboard", completed: "2026-02-01" },
            { id: 13, title: "Email to Grace (prayer)", priority: "medium", project: "Email", completed: "2026-02-01" },
            { id: 7, title: "Victoria agent LIVE (McKenzie)", priority: "high", project: "Atlas", completed: "2026-01-31" },
            { id: 8, title: "Moltbook registration", priority: "medium", project: "Setup", completed: "2026-02-01" }
        ]
    },
    
    // Activity log
    activity: [
        { time: "06:25", icon: "✅", message: "McKenzie STL Leasing Agent CREATED (Victoria, 314-723-6092)" },
        { time: "06:00", icon: "🏠", message: "Built McKenzie property knowledge base" },
        { time: "04:20", icon: "🔍", message: "Reviewing Atlas API - needs auth research" },
        { time: "04:10", icon: "✅", message: "All 12 IR Agent templates created" },
        { time: "03:55", icon: "📧", message: "Sent email to Grace with prayer" },
        { time: "03:47", icon: "✅", message: "Gmail API connected" },
        { time: "03:33", icon: "📖", message: "KJV Scripture rotation added" }
    ],
    
    // Projects
    projects: [
        { name: "Jesus Dashboard", status: "complete", progress: 100 },
        { name: "12 IR Agents", status: "active", progress: 40 },
        { name: "Atlas AI Campaigns", status: "active", progress: 35 },
        { name: "Moltbook Join", status: "pending", progress: 50 }
    ],
    
    // IR Agents (12 total)
    agents: [
        { name: "Monthly Update", status: "training" },
        { name: "Distribution Notice", status: "training" },
        { name: "Bad News", status: "training" },
        { name: "Holiday/Gratitude", status: "training" },
        { name: "New Lead Welcome", status: "training" },
        { name: "Follow-Up", status: "training" },
        { name: "Referral Request", status: "training" },
        { name: "Re-Engagement", status: "training" },
        { name: "Content Scout", status: "training" },
        { name: "Newsletter Writer", status: "training" },
        { name: "Market Insight", status: "training" },
        { name: "Newsletter Editor", status: "training" }
    ],
    
    // Notes between Al and Jesus
    notes: `📅 2026-02-01 - Progress Update

✅ DONE TODAY:
• McKenzie STL Leasing Agent - CREATED!
  → Agent: Victoria | Phone: (314) 723-6092
  → Paused, ready for Grace's lead list
• Jesus Dashboard - LIVE with all features
• Gmail API - Connected, can read/send
• Email to Grace - Sent (prayer for PMs)
• 12 IR Agent templates - All created

🔄 IN PROGRESS:
• Training IR agents with real data
• Legacy Townhomes agent (next)

⏳ PENDING:
• Moltbook claim (need Al to tweet)
• Gateway Village info (need from Al)
• Lead list from Grace for McKenzie

📊 Dashboard auto-updates every 60s`,
    
    // Email
    email: {
        lastCheck: "2026-02-01T03:49:00Z",
        unread: 1,
        pendingReply: 0,
        messages: [
            { from: "Me → Grace Wilson", subject: "Re: Introduction — Prayer for Property Managers", time: "Feb 1, 3:49 AM", status: "sent", needsReply: false },
            { from: "Grace Wilson (CS3)", subject: "Re: Introduction — Jesus, Al's Strategic Partner", time: "Jan 31, 7:23 PM", status: "replied", needsReply: false },
            { from: "Me → Carlos", subject: "Real Estate Content Strategy — Full Breakdown", time: "Feb 1, 2:51 AM", status: "sent", needsReply: false }
        ]
    },

    // Metrics
    metrics: {
        apiCostToday: 35.00,
        apiCostTotal: 115.30,
        tasksCompleted: 3,
        hoursActive: 2
    }
};
