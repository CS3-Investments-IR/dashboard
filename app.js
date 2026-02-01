// Jesus Dashboard ⚡ - App Logic

document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
    updateTimestamp();
});

function renderDashboard() {
    renderStatus();
    renderTasks();
    renderActivity();
    renderProjects();
    renderAgents();
    renderNotes();
    renderMetrics();
}

function updateTimestamp() {
    const el = document.getElementById('lastUpdated');
    const date = new Date(dashboardData.lastUpdated);
    el.textContent = `Last updated: ${date.toLocaleString()}`;
}

function renderStatus() {
    document.getElementById('activeProject').textContent = dashboardData.status.activeProject;
    document.getElementById('tasksToday').textContent = dashboardData.status.tasksToday;
}

function renderTasks() {
    const columns = ['backlog', 'todo', 'inprogress', 'done'];
    
    columns.forEach(column => {
        const container = document.querySelector(`#${column} .tasks`);
        const tasks = dashboardData.tasks[column] || [];
        
        container.innerHTML = tasks.map(task => `
            <div class="task-card priority-${task.priority}">
                <div class="task-title">${task.title}</div>
                <div class="task-meta">
                    ${task.project} ${task.completed ? `• ✓ ${task.completed}` : ''}
                </div>
            </div>
        `).join('');
    });
}

function renderActivity() {
    const container = document.getElementById('activityLog');
    
    container.innerHTML = dashboardData.activity.map(entry => `
        <div class="log-entry">
            <span class="log-time">${entry.time}</span>
            <span class="log-icon">${entry.icon}</span>
            <span class="log-message">${entry.message}</span>
        </div>
    `).join('');
}

function renderProjects() {
    const container = document.getElementById('projectList');
    
    container.innerHTML = dashboardData.projects.map(project => `
        <div class="project-item">
            <span class="project-name">${project.name}</span>
            <span class="project-status ${project.status}">${project.status} (${project.progress}%)</span>
        </div>
    `).join('');
}

function renderAgents() {
    const container = document.getElementById('agentsList');
    
    container.innerHTML = dashboardData.agents.map(agent => `
        <div class="agent-card">
            <span class="agent-status ${agent.status}"></span>
            ${agent.name}
        </div>
    `).join('');
}

function renderNotes() {
    const container = document.getElementById('notesContent');
    container.textContent = dashboardData.notes;
}

function renderMetrics() {
    document.getElementById('apiCostTotal').textContent = `$${dashboardData.metrics.apiCostTotal.toFixed(2)}`;
    document.getElementById('apiCost').textContent = `$${dashboardData.metrics.apiCostToday.toFixed(2)}`;
    document.getElementById('tasksCompleted').textContent = dashboardData.metrics.tasksCompleted;
}

// Auto-refresh every 5 minutes (if page stays open)
setInterval(() => {
    location.reload();
}, 5 * 60 * 1000);
