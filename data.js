// Jesus Dashboard Data - Updated by Jesus ⚡
// Last Update: 2026-02-01T03:28:00Z

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
