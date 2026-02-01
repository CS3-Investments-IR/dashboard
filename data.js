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
    lastUpdated: "2026-02-01T03:28:00Z",
    
    // Current status
    status: {
        online: true,
        working: true,  // true = actively working, false = idle
        statusText: "Building Dashboard",  // What I'm doing right now
        activeProject: "Jesus Dashboard Build",
        tasksToday: 3
    },
    
    // Tasks (Kanban)
    tasks: {
        backlog: [
            { id: 1, title: "Gateway Village - Get property info", priority: "medium", project: "Atlas" },
            { id: 2, title: "Create 12 IR Agents", priority: "medium", project: "Dashboard" },
            { id: 3, title: "Set up Twilio integration", priority: "low", project: "Atlas" }
        ],
        todo: [
            { id: 4, title: "Legacy Townhomes agent", priority: "high", project: "Atlas" },
            { id: 5, title: "Confirm Legend property status", priority: "medium", project: "Atlas" }
        ],
        inprogress: [
            { id: 6, title: "Jesus Dashboard - Build & Deploy", priority: "high", project: "Dashboard" }
        ],
        done: [
            { id: 7, title: "Victoria agent LIVE (McKenzie)", priority: "high", project: "Atlas", completed: "2026-01-31" },
            { id: 8, title: "Moltbook registration", priority: "medium", project: "Setup", completed: "2026-02-01" },
            { id: 9, title: "GitHub repo created", priority: "high", project: "Dashboard", completed: "2026-02-01" }
        ]
    },
    
    // Activity log
    activity: [
        { time: "03:16", icon: "🚀", message: "Created jesus-dashboard GitHub repo" },
        { time: "03:13", icon: "💬", message: "Received dashboard build directive from Al" },
        { time: "03:00", icon: "📝", message: "Registered Moltbook as JesusForAl" },
        { time: "02:30", icon: "🔄", message: "Session context compacted - fresh start" },
        { time: "01:31", icon: "✅", message: "Victoria (McKenzie) leasing agent went LIVE" }
    ],
    
    // Projects
    projects: [
        { name: "Jesus Dashboard", status: "active", progress: 25 },
        { name: "Atlas AI Campaigns", status: "active", progress: 15 },
        { name: "Moltbook Join", status: "pending", progress: 50 },
        { name: "12 IR Agents", status: "pending", progress: 0 }
    ],
    
    // IR Agents (12 total)
    agents: [
        { name: "Monthly Update", status: "pending" },
        { name: "Distribution Notice", status: "pending" },
        { name: "Bad News", status: "pending" },
        { name: "Holiday/Gratitude", status: "pending" },
        { name: "New Lead Welcome", status: "pending" },
        { name: "Follow-Up", status: "pending" },
        { name: "Referral Request", status: "pending" },
        { name: "Re-Engagement", status: "pending" },
        { name: "Content Scout", status: "pending" },
        { name: "Newsletter Writer", status: "pending" },
        { name: "Market Insight", status: "pending" },
        { name: "Newsletter Editor", status: "pending" }
    ],
    
    // Notes between Al and Jesus
    notes: `📅 2026-02-01
    
• Dashboard priority: Al needs visibility into my work
• Moltbook: Waiting for Al to tweet claim (code: blue-E257)
• Victoria agent is LIVE for McKenzie property
• Next: More Atlas agents after dashboard

Key reminder: Stop talking, start building. Save API costs.`,
    
    // Metrics
    metrics: {
        apiCostToday: 35.00,
        apiCostTotal: 115.30,
        tasksCompleted: 3,
        hoursActive: 2
    }
};
