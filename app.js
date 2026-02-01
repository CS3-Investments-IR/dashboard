// Jesus Dashboard ⚡ - App Logic

document.addEventListener('DOMContentLoaded', () => {
    renderDashboard();
    updateTimestamp();
    renderScripture();
    
    // Update scripture every 10 minutes
    setInterval(renderScripture, 10 * 60 * 1000);
});

function renderScripture() {
    // Use time-based index so it changes every 10 minutes consistently
    const tenMinuteBlock = Math.floor(Date.now() / (10 * 60 * 1000));
    const index = tenMinuteBlock % scriptures.length;
    const scripture = scriptures[index];
    
    document.getElementById('scriptureText').textContent = `"${scripture.text}"`;
    document.getElementById('scriptureRef').textContent = `— ${scripture.ref} (KJV)`;
}

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
    
    // Update status indicator
    const indicator = document.getElementById('statusIndicator');
    const statusText = indicator.querySelector('.status-text');
    
    if (dashboardData.status.working) {
        indicator.classList.remove('idle');
        statusText.textContent = dashboardData.status.statusText || 'Working';
    } else {
        indicator.classList.add('idle');
        statusText.textContent = 'Idle';
    }
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

// Auto-refresh every 60 seconds (silent update)
async function checkForUpdates() {
    try {
        const response = await fetch('data.js?t=' + Date.now());
        const text = await response.text();
        
        // Extract the data object from the JS file
        const newData = eval(text + '; dashboardData;');
        
        // Check if data changed
        if (newData.lastUpdated !== dashboardData.lastUpdated) {
            // Update the global data
            Object.assign(dashboardData, newData);
            renderDashboard();
            updateTimestamp();
            showUpdateNotification();
        }
    } catch (e) {
        console.log('Update check failed:', e);
    }
}

function showUpdateNotification() {
    const indicator = document.getElementById('statusIndicator');
    indicator.classList.add('updated');
    setTimeout(() => indicator.classList.remove('updated'), 2000);
}

// Check for updates every 60 seconds
setInterval(checkForUpdates, 60 * 1000);

// Also check immediately on focus (when Al switches back to tab)
document.addEventListener('visibilitychange', () => {
    if (!document.hidden) {
        checkForUpdates();
    }
});
