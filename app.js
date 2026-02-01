// Jesus Dashboard V2 - Main Application
// AI Agent Management Platform for Al

(function() {
    'use strict';

    // ========== INITIALIZATION ==========
    document.addEventListener('DOMContentLoaded', init);

    function init() {
        setupNavigation();
        setupNotes();
        setupLibrary();
        loadAllData();
        setupAutoRefresh();
        updateLastSync();
    }

    // ========== NAVIGATION ==========
    function setupNavigation() {
        const navTabs = document.querySelectorAll('.nav-tab');
        const sections = document.querySelectorAll('.content-section');

        navTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const targetSection = tab.dataset.section;
                
                // Update active states
                navTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                sections.forEach(s => s.classList.remove('active'));
                document.getElementById(targetSection).classList.add('active');
                
                // Save current tab to localStorage
                localStorage.setItem('activeTab', targetSection);
            });
        });

        // Restore last active tab
        const savedTab = localStorage.getItem('activeTab');
        if (savedTab) {
            const tab = document.querySelector(`[data-section="${savedTab}"]`);
            if (tab) tab.click();
        }
    }

    // ========== NAVIGATION HELPER ==========
    window.goToSection = function(sectionId) {
        const tab = document.querySelector(`[data-section="${sectionId}"]`);
        if (tab) tab.click();
    };

    // ========== LOAD ALL DATA ==========
    function loadAllData() {
        if (typeof dashboardData === 'undefined') {
            console.error('Dashboard data not loaded');
            return;
        }

        loadOverview();
        loadDailySurprise();
        loadAgentReport();
        loadAIIntelligence();
        loadMoneyIdeas();
        loadVault();
        loadLibrary();
        loadNotes();
        loadContent();
        loadSystemHealth();
        loadMetrics();
        loadScripture();
    }

    // ========== 0. OVERVIEW / HOME ==========
    function loadOverview() {
        const data = dashboardData;
        
        // Scripture First - God First
        if (typeof scriptures !== 'undefined' && scriptures.length > 0) {
            const index = Math.floor(Date.now() / 600000) % scriptures.length; // Rotate every 10 min
            const scripture = scriptures[index];
            document.getElementById('mainScriptureText').textContent = '"' + scripture.text + '"';
            document.getElementById('mainScriptureRef').textContent = '— ' + scripture.ref + ' (KJV)';
        }
        
        // Quick Stats
        const completedToday = data.agentReport?.completed?.length || 0;
        const blockers = data.agentReport?.blockers?.length || 0;
        const totalBuilds = data.vault?.length || 0;
        const notes = JSON.parse(localStorage.getItem('jesusNotes')) || data.notes || [];
        const unreadNotes = notes.filter(n => n.status === 'unread').length;
        
        document.getElementById('ovCompletedToday').textContent = completedToday;
        document.getElementById('ovBlockers').textContent = blockers;
        document.getElementById('ovTotalBuilds').textContent = totalBuilds;
        document.getElementById('ovUnreadNotes').textContent = unreadNotes;
        
        // Daily Surprise Preview
        if (data.dailySurprise?.today) {
            document.getElementById('ovSurpriseTitle').textContent = data.dailySurprise.today.title;
            document.getElementById('ovSurpriseDesc').textContent = data.dailySurprise.today.type + ' • ' + data.dailySurprise.today.impact;
        }
        
        // Agent Report Summary
        document.getElementById('ovCompleted').textContent = data.agentReport?.completed?.length || 0;
        document.getElementById('ovPending').textContent = data.agentReport?.pending?.length || 0;
        document.getElementById('ovNext').textContent = data.agentReport?.next?.length || 0;
        
        // Content Summary
        const content = data.content || [];
        document.getElementById('ovContentPending').textContent = content.filter(c => c.status === 'pending' || c.status === 'revision').length;
        document.getElementById('ovContentApproved').textContent = content.filter(c => c.status === 'approved').length;
        document.getElementById('ovContentPublished').textContent = content.filter(c => c.status === 'published').length;
        
        // Notes Preview
        const notesPreview = document.getElementById('ovNotesPreview');
        const recentNotes = notes.filter(n => n.status === 'unread').slice(0, 2);
        if (recentNotes.length > 0) {
            notesPreview.innerHTML = recentNotes.map(n => `<p>• ${n.content.substring(0, 50)}...</p>`).join('');
        } else {
            notesPreview.innerHTML = '<p class="empty-preview">No unread notes</p>';
        }
        
        // Vault Summary
        document.getElementById('ovVaultTotal').textContent = totalBuilds;
        document.getElementById('ovVaultSOPs').textContent = data.vault?.filter(v => v.process)?.length || 0;
        const recentBuild = data.vault?.[data.vault.length - 1];
        if (recentBuild) {
            document.getElementById('ovVaultRecent').textContent = 'Latest: ' + recentBuild.name;
        }
        
        // Money Ideas
        const ideas = data.moneyIdeas || [];
        document.getElementById('ovMoneyIdeas').textContent = ideas.length;
        const totalImpact = ideas.reduce((sum, i) => sum + (i.impact || 0), 0);
        document.getElementById('ovMoneyImpact').textContent = formatMoney(totalImpact);
        
        // AI Intelligence
        const intel = data.aiIntelligence || [];
        document.getElementById('ovIntelCount').textContent = intel.length;
        if (intel.length > 0) {
            document.getElementById('ovIntelRecent').textContent = 'Latest: ' + intel[0].title;
        }
        
        // System Health
        const health = data.systemHealth;
        if (health) {
            const healthStatus = document.getElementById('ovHealthStatus');
            const dot = healthStatus.querySelector('.health-dot');
            const text = healthStatus.querySelector('span:last-child');
            if (health.openclaw) {
                dot.className = 'health-dot online';
                text.textContent = 'All Systems Online';
            } else {
                dot.className = 'health-dot offline';
                text.textContent = 'System Issue';
            }
            document.getElementById('ovUptime').textContent = (health.uptime || 0) + '%';
        }
        
        // Metrics
        const metrics = data.metrics;
        if (metrics) {
            document.getElementById('ovTasksToday').textContent = metrics.tasksToday || 0;
            document.getElementById('ovHoursSaved').textContent = metrics.hoursSaved || 0;
            document.getElementById('ovApiCost').textContent = '$' + (metrics.apiCostToday || 0);
        }
        
        // Library
        const library = JSON.parse(localStorage.getItem('jesusLibrary')) || data.library || [];
        document.getElementById('ovLibraryCount').textContent = library.length;
    }

    // ========== 1. DAILY SURPRISE ==========
    function loadDailySurprise() {
        const data = dashboardData.dailySurprise;
        if (!data || !data.today) return;

        const today = data.today;
        
        document.getElementById('surpriseDate').textContent = formatDate(today.date);
        document.getElementById('surpriseTitle').textContent = today.title;
        document.getElementById('surpriseType').textContent = today.type;
        document.getElementById('surpriseImpact').textContent = today.impact;

        // Render content with markdown-like formatting
        const contentEl = document.getElementById('surpriseContent');
        contentEl.innerHTML = renderContent(today.content);

        // Load archive
        const archiveEl = document.getElementById('surpriseArchive');
        if (data.archive && data.archive.length > 0) {
            archiveEl.innerHTML = data.archive.map(item => `
                <div class="archive-item" data-id="${item.id}">
                    <span class="archive-date">${formatDate(item.date)}</span>
                    <span class="archive-title">${item.title}</span>
                    <span class="archive-type">${item.type}</span>
                </div>
            `).join('');
        } else {
            archiveEl.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📚</div><p>No archived surprises yet</p></div>';
        }

        // Search functionality
        const searchInput = document.getElementById('surpriseSearch');
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const items = archiveEl.querySelectorAll('.archive-item');
            items.forEach(item => {
                const title = item.querySelector('.archive-title').textContent.toLowerCase();
                item.style.display = title.includes(query) ? 'flex' : 'none';
            });
        });
    }

    // ========== 2. AGENT REPORT ==========
    function loadAgentReport() {
        const report = dashboardData.agentReport;
        if (!report) return;

        // Completed
        renderReportList('completedList', 'completedCount', report.completed, '✅');
        
        // Blockers
        renderReportList('blockersList', 'blockersCount', report.blockers, '⚠️');
        
        // Issues
        renderReportList('issuesList', 'issuesCount', report.issues, '🚨');
        
        // Pending Decisions
        renderReportList('pendingList', 'pendingCount', report.pending, '📋');
        
        // Next Up
        renderReportList('nextList', 'nextCount', report.next, '🔮');
    }

    function renderReportList(listId, countId, items, icon) {
        const listEl = document.getElementById(listId);
        const countEl = document.getElementById(countId);
        
        if (!items || items.length === 0) {
            listEl.innerHTML = '<li class="empty-state">Nothing here</li>';
            countEl.textContent = '0';
            return;
        }

        countEl.textContent = items.length;
        listEl.innerHTML = items.map(item => `
            <li>${typeof item === 'string' ? item : item.text}</li>
        `).join('');
    }

    // ========== 3. AI INTELLIGENCE ==========
    function loadAIIntelligence() {
        const intel = dashboardData.aiIntelligence;
        if (!intel || intel.length === 0) {
            document.getElementById('intelligenceFeed').innerHTML = 
                '<div class="empty-state"><div class="empty-state-icon">🧠</div><p>No intelligence gathered yet</p></div>';
            return;
        }

        renderIntelligenceFeed(intel);
        setupIntelFilters(intel);
    }

    function renderIntelligenceFeed(items) {
        const feedEl = document.getElementById('intelligenceFeed');
        feedEl.innerHTML = items.map(item => `
            <div class="intel-item" data-category="${item.category}">
                <div class="intel-header">
                    <div class="intel-source">
                        <span>${getSourceIcon(item.category)}</span>
                        <span>${item.source}</span>
                    </div>
                    <span class="intel-tag">${item.category}</span>
                </div>
                <h4 class="intel-title">${item.title}</h4>
                <p class="intel-summary">${item.summary}</p>
                ${item.link ? `<a href="${item.link}" target="_blank" class="intel-link">🔗 Read more</a>` : ''}
                <div class="intel-apply">
                    <div class="intel-apply-label">How We Apply This</div>
                    <p class="intel-apply-text">${item.howToApply}</p>
                </div>
            </div>
        `).join('');
    }

    function getSourceIcon(category) {
        const icons = {
            'news': '📰',
            'twitter': '🐦',
            'openclaw': '🦞',
            'tools': '🛠️',
            'article': '📄'
        };
        return icons[category] || '📌';
    }

    function setupIntelFilters(intel) {
        const filterBtns = document.querySelectorAll('#intelligence .filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                const items = document.querySelectorAll('.intel-item');
                
                items.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ========== 4. MONEY IDEAS ==========
    function loadMoneyIdeas() {
        const ideas = dashboardData.moneyIdeas;
        if (!ideas || ideas.length === 0) {
            document.getElementById('moneyIdeasList').innerHTML = 
                '<div class="empty-state"><div class="empty-state-icon">💰</div><p>No money ideas yet</p></div>';
            return;
        }

        // Calculate stats
        const totalImpact = ideas.reduce((sum, idea) => sum + (idea.impact || 0), 0);
        const buildable = ideas.filter(idea => idea.canBuild).length;

        document.getElementById('totalIdeas').textContent = ideas.length;
        document.getElementById('potentialImpact').textContent = formatMoney(totalImpact);
        document.getElementById('buildableIdeas').textContent = buildable;

        renderMoneyIdeas(ideas);
        setupMoneyFilters(ideas);
    }

    function renderMoneyIdeas(ideas) {
        const listEl = document.getElementById('moneyIdeasList');
        listEl.innerHTML = ideas.map(idea => `
            <div class="idea-item" data-category="${idea.category}">
                <div class="idea-header">
                    <h4 class="idea-title">${idea.title}</h4>
                    <span class="idea-impact">${formatMoney(idea.impact)}</span>
                </div>
                <p class="idea-why">${idea.why}</p>
                <div class="idea-steps">
                    <h5>Implementation Steps</h5>
                    <ol>
                        ${idea.steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
                <div class="idea-footer">
                    <div class="idea-type">
                        <span class="tag">${getCategoryLabel(idea.category)}</span>
                        <span class="tag">${idea.canBuild ? '🔨 Can Build' : '💬 Share'}</span>
                    </div>
                </div>
            </div>
        `).join('');
    }

    function getCategoryLabel(cat) {
        const labels = {
            'noi': '🏢 NOI',
            'sales': '📈 Sales',
            'investors': '👥 Investors',
            'cost': '✂️ Cost Reduction'
        };
        return labels[cat] || cat;
    }

    function setupMoneyFilters(ideas) {
        const filterBtns = document.querySelectorAll('#money .filter-btn');
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.dataset.filter;
                const items = document.querySelectorAll('.idea-item');
                
                items.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }

    // ========== 5. VAULT & SOPs ==========
    function loadVault() {
        const vault = dashboardData.vault;
        if (!vault || vault.length === 0) {
            document.getElementById('vaultGrid').innerHTML = 
                '<div class="empty-state"><div class="empty-state-icon">📁</div><p>Vault is empty</p></div>';
            return;
        }

        // Update stats
        document.getElementById('totalBuilds').textContent = vault.length;
        document.getElementById('totalSOPs').textContent = vault.filter(v => v.process || v.howToUse).length;
        
        // Count this week's builds
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        const thisWeek = vault.filter(v => new Date(v.dateCreated) > oneWeekAgo).length;
        document.getElementById('thisWeekBuilds').textContent = thisWeek;

        renderVault(vault);
        setupVaultFilters(vault);
    }

    function renderVault(items) {
        const gridEl = document.getElementById('vaultGrid');
        gridEl.innerHTML = items.map(item => `
            <div class="vault-item" data-category="${item.category}" data-id="${item.id}" onclick="openSopModal(${item.id})">
                <div class="vault-item-header">
                    <span class="vault-icon">${getVaultIcon(item.category)}</span>
                    <div>
                        <h4 class="vault-item-title">${item.name}</h4>
                        <span class="vault-item-date">${formatDate(item.dateCreated)}</span>
                    </div>
                </div>
                <p class="vault-item-desc">${item.whatItDoes}</p>
                <div class="vault-item-tags">
                    <span class="tag">${item.category}</span>
                    ${item.process ? '<span class="tag">📋 SOP</span>' : ''}
                </div>
            </div>
        `).join('');
    }

    function getVaultIcon(category) {
        const icons = {
            'automations': '⚙️',
            'agents': '🤖',
            'workflows': '🔄',
            'templates': '📝',
            'research': '🔬',
            'sops': '📋',
            'tools': '🛠️',
            'integrations': '🔌',
            'dashboards': '📊',
            'systems': '🖥️'
        };
        return icons[category] || '📁';
    }

    // SOP Modal Functions
    window.openSopModal = function(id) {
        const vault = dashboardData.vault;
        const item = vault.find(v => v.id == id);
        if (!item) return;

        document.getElementById('sopIcon').textContent = getVaultIcon(item.category);
        document.getElementById('sopTitle').textContent = item.name;
        document.getElementById('sopMeta').textContent = `${item.category} • ${formatDate(item.dateCreated)}`;
        
        document.getElementById('sopObjective').textContent = item.objective || item.whyBuilt || 'Not specified';
        document.getElementById('sopWhatItDoes').textContent = item.whatItDoes || 'Not specified';
        document.getElementById('sopHowItWorks').textContent = item.howItWorks || 'Not specified';
        
        // How to Use (step by step)
        const howToUseEl = document.getElementById('sopHowToUse');
        if (item.howToUseSteps && item.howToUseSteps.length > 0) {
            howToUseEl.innerHTML = '<ol>' + item.howToUseSteps.map(s => `<li>${s}</li>`).join('') + '</ol>';
        } else {
            howToUseEl.innerHTML = `<p>${item.howToUse || 'Not specified'}</p>`;
        }
        
        document.getElementById('sopHowToMaintain').textContent = item.howToMaintain || 'Not specified';
        
        // Process / SOP
        const processEl = document.getElementById('sopProcess');
        if (item.process && item.process.length > 0) {
            processEl.innerHTML = '<ol>' + item.process.map(s => `<li>${s}</li>`).join('') + '</ol>';
        } else {
            processEl.innerHTML = '<p>No detailed process documented yet.</p>';
        }
        
        // Related Files
        const filesEl = document.getElementById('sopRelatedFiles');
        if (item.relatedFiles && item.relatedFiles.length > 0) {
            filesEl.innerHTML = item.relatedFiles.map(f => 
                `<a href="${f.url}" target="_blank">${f.icon || '📎'} ${f.name}</a>`
            ).join('');
        } else if (item.relatedFilesText) {
            filesEl.innerHTML = `<p>${item.relatedFilesText}</p>`;
        } else {
            filesEl.innerHTML = '<p>No related files.</p>';
        }

        document.getElementById('sopModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    window.closeSopModal = function() {
        document.getElementById('sopModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    };

    window.downloadSOP = function() {
        const title = document.getElementById('sopTitle').textContent;
        const content = generateSOPMarkdown();
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `SOP_${title.replace(/[^a-z0-9]/gi, '_')}.md`;
        a.click();
        URL.revokeObjectURL(url);
    };

    window.copySOP = function() {
        const content = generateSOPMarkdown();
        navigator.clipboard.writeText(content).then(() => {
            alert('SOP copied to clipboard!');
        });
    };

    function generateSOPMarkdown() {
        const title = document.getElementById('sopTitle').textContent;
        const meta = document.getElementById('sopMeta').textContent;
        const objective = document.getElementById('sopObjective').textContent;
        const whatItDoes = document.getElementById('sopWhatItDoes').textContent;
        const howItWorks = document.getElementById('sopHowItWorks').textContent;
        const howToUse = document.getElementById('sopHowToUse').innerText;
        const howToMaintain = document.getElementById('sopHowToMaintain').textContent;
        const process = document.getElementById('sopProcess').innerText;
        const relatedFiles = document.getElementById('sopRelatedFiles').innerText;

        return `# ${title}

**${meta}**

---

## 🎯 Objective
${objective}

## 📝 What It Does
${whatItDoes}

## ⚙️ How It Works
${howItWorks}

## 📋 How To Use (Step-by-Step)
${howToUse}

## 🔧 How To Maintain
${howToMaintain}

## 🔄 Process / SOP (How to Recreate)
${process}

## 📎 Related Files & Links
${relatedFiles}

---
*Generated from Jesus Dashboard V2*
`;
    }

    // Close modal on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSopModal();
    });

    // Close modal on backdrop click
    document.getElementById('sopModal')?.addEventListener('click', (e) => {
        if (e.target.id === 'sopModal') closeSopModal();
    });

    function setupVaultFilters(vault) {
        const searchInput = document.getElementById('vaultSearch');
        const categorySelect = document.getElementById('vaultCategory');

        function filterVault() {
            const query = searchInput.value.toLowerCase();
            const category = categorySelect.value;
            const items = document.querySelectorAll('.vault-item');

            items.forEach(item => {
                const matchesSearch = item.querySelector('.vault-item-title').textContent.toLowerCase().includes(query) ||
                                     item.querySelector('.vault-item-desc').textContent.toLowerCase().includes(query);
                const matchesCategory = category === 'all' || item.dataset.category === category;
                
                item.style.display = (matchesSearch && matchesCategory) ? 'block' : 'none';
            });
        }

        searchInput.addEventListener('input', filterVault);
        categorySelect.addEventListener('change', filterVault);
    }

    // ========== 6. LIBRARY ==========
    function loadLibrary() {
        // Load from localStorage or data
        let library = JSON.parse(localStorage.getItem('jesusLibrary')) || dashboardData.library || [];
        renderLibrary(library);
        setupLibraryFilters(library);
    }

    function setupLibrary() {
        const uploadZone = document.getElementById('uploadZone');
        const fileInput = document.getElementById('fileUpload');

        // Drag and drop
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('dragover');
        });

        uploadZone.addEventListener('dragleave', () => {
            uploadZone.classList.remove('dragover');
        });

        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
            handleFiles(e.dataTransfer.files);
        });

        // Click to upload
        uploadZone.addEventListener('click', () => fileInput.click());
        fileInput.addEventListener('change', (e) => handleFiles(e.target.files));
    }

    function handleFiles(files) {
        const library = JSON.parse(localStorage.getItem('jesusLibrary')) || [];
        
        Array.from(files).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const newFile = {
                    id: Date.now() + Math.random(),
                    name: file.name,
                    type: file.type,
                    size: file.size,
                    folder: 'all',
                    uploadedAt: new Date().toISOString(),
                    data: e.target.result
                };
                
                library.push(newFile);
                localStorage.setItem('jesusLibrary', JSON.stringify(library));
                renderLibrary(library);
            };
            reader.readAsDataURL(file);
        });
    }

    function renderLibrary(items) {
        const gridEl = document.getElementById('libraryGrid');
        
        if (!items || items.length === 0) {
            gridEl.innerHTML = '<div class="empty-state"><div class="empty-state-icon">📚</div><p>No documents uploaded yet</p></div>';
            return;
        }

        gridEl.innerHTML = items.map(item => `
            <div class="library-item" data-folder="${item.folder}" data-id="${item.id}">
                <span class="file-icon">${getFileIcon(item.type || item.name)}</span>
                <div class="file-info">
                    <div class="file-name">${item.name}</div>
                    <div class="file-meta">${formatFileSize(item.size)} • ${formatDate(item.uploadedAt)}</div>
                </div>
                <div class="file-actions">
                    <button onclick="downloadFile('${item.id}')" title="Download">📥</button>
                    <button onclick="deleteFile('${item.id}')" title="Delete">🗑️</button>
                </div>
            </div>
        `).join('');
    }

    function getFileIcon(typeOrName) {
        if (!typeOrName) return '📄';
        const type = typeOrName.toLowerCase();
        if (type.includes('pdf')) return '📕';
        if (type.includes('doc') || type.includes('word')) return '📘';
        if (type.includes('xls') || type.includes('sheet')) return '📗';
        if (type.includes('image') || type.includes('png') || type.includes('jpg')) return '🖼️';
        if (type.includes('csv')) return '📊';
        if (type.includes('md') || type.includes('txt')) return '📝';
        return '📄';
    }

    function setupLibraryFilters(library) {
        const folderBtns = document.querySelectorAll('.folder-btn');
        const searchInput = document.getElementById('librarySearch');

        folderBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                folderBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const folder = btn.dataset.folder;
                const items = document.querySelectorAll('.library-item');
                
                items.forEach(item => {
                    if (folder === 'all' || item.dataset.folder === folder) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });

        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase();
            const items = document.querySelectorAll('.library-item');
            
            items.forEach(item => {
                const name = item.querySelector('.file-name').textContent.toLowerCase();
                item.style.display = name.includes(query) ? 'flex' : 'none';
            });
        });
    }

    // Global functions for file actions
    window.downloadFile = function(id) {
        const library = JSON.parse(localStorage.getItem('jesusLibrary')) || [];
        const file = library.find(f => f.id == id);
        if (file && file.data) {
            const link = document.createElement('a');
            link.href = file.data;
            link.download = file.name;
            link.click();
        }
    };

    window.deleteFile = function(id) {
        if (!confirm('Delete this file?')) return;
        let library = JSON.parse(localStorage.getItem('jesusLibrary')) || [];
        library = library.filter(f => f.id != id);
        localStorage.setItem('jesusLibrary', JSON.stringify(library));
        renderLibrary(library);
    };

    // ========== 7. NOTES ==========
    function setupNotes() {
        const saveBtn = document.getElementById('saveNote');
        saveBtn.addEventListener('click', saveNote);
        
        // Sync to Jesus button
        const syncBtn = document.getElementById('syncToJesus');
        if (syncBtn) {
            syncBtn.addEventListener('click', syncNotesToJesus);
        }
    }
    
    // JSONBlob ID for notes storage (free, no signup)
    const NOTES_BLOB_ID = '019c1a2d-372c-7680-b4e9-b42d61d8c2fa';
    const NOTES_API_URL = `https://jsonblob.com/api/jsonBlob/${NOTES_BLOB_ID}`;
    
    async function syncNotesToJesus() {
        // First check if there's text in the textarea - save it first
        const contentArea = document.getElementById('noteContent');
        if (contentArea && contentArea.value.trim()) {
            saveNote(); // Auto-save before sync
        }
        
        const notes = JSON.parse(localStorage.getItem('jesusNotes')) || [];
        const unreadNotes = notes.filter(n => n.status === 'unread');
        
        if (unreadNotes.length === 0) {
            alert('No notes to sync! Write a note first.');
            return;
        }
        
        // Format data
        const exportData = {
            lastUpdated: new Date().toISOString(),
            notes: unreadNotes.map(n => ({
                id: n.id,
                type: n.type,
                content: n.content,
                priority: n.priority,
                createdAt: n.createdAt
            }))
        };
        
        // Send to JSONBlob (Jesus will read this)
        try {
            const response = await fetch(NOTES_API_URL, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(exportData)
            });
            
            if (response.ok) {
                // Mark notes as sent
                notes.forEach(n => {
                    if (n.status === 'unread') n.status = 'sent';
                });
                localStorage.setItem('jesusNotes', JSON.stringify(notes));
                
                alert('✅ Note sent to Jesus! He will respond in the chat below.');
                
                loadNotes();
                updateNotesBadge();
                renderChat();
            } else {
                throw new Error('Failed to send');
            }
        } catch (e) {
            console.error('Sync error:', e);
            alert('Failed to sync. Check console for details.');
        }
    }

    function saveNote() {
        const typeSelect = document.getElementById('noteType');
        const contentArea = document.getElementById('noteContent');
        const priorityCheck = document.getElementById('notePriority');

        const content = contentArea.value.trim();
        if (!content) {
            alert('Please enter a note');
            return;
        }

        const notes = JSON.parse(localStorage.getItem('jesusNotes')) || [];
        const newNote = {
            id: Date.now(),
            type: typeSelect.value,
            content: content,
            priority: priorityCheck.checked,
            status: 'unread',
            createdAt: new Date().toISOString()
        };

        notes.unshift(newNote);
        localStorage.setItem('jesusNotes', JSON.stringify(notes));
        
        // Clear form
        contentArea.value = '';
        priorityCheck.checked = false;
        
        // Reload notes
        loadNotes();
        updateNotesBadge();
    }

    function loadNotes() {
        // Merge localStorage notes with data.js notes
        const localNotes = JSON.parse(localStorage.getItem('jesusNotes')) || [];
        const dataNotes = dashboardData.notes || [];
        
        // Combine, preferring local storage (it's more up-to-date)
        const allNotes = [...localNotes];
        dataNotes.forEach(dn => {
            if (!allNotes.find(n => n.id === dn.id)) {
                allNotes.push(dn);
            }
        });

        const listEl = document.getElementById('notesList');
        
        if (allNotes.length === 0) {
            listEl.innerHTML = '<div class="empty-state"><div class="empty-state-icon">💬</div><p>No notes yet</p></div>';
            return;
        }

        listEl.innerHTML = allNotes.map(note => `
            <div class="note-item ${note.status === 'unread' ? 'unread' : ''} ${note.priority ? 'high-priority' : ''}" data-id="${note.id}">
                <div class="note-header">
                    <div class="note-type">
                        <span class="note-type-icon">${getNoteTypeIcon(note.type)}</span>
                        <span class="note-type-label">${getNoteTypeLabel(note.type)}</span>
                    </div>
                    <span class="note-status ${note.status}">${getStatusLabel(note.status)}</span>
                </div>
                <div class="note-content">${note.content}</div>
                <div class="note-footer">
                    <span>${formatDateTime(note.createdAt)}</span>
                    <div class="note-actions-btns">
                        ${note.status === 'unread' ? `<button onclick="updateNoteStatus(${note.id}, 'in-progress')">Mark In Progress</button>` : ''}
                        ${note.status === 'in-progress' ? `<button onclick="updateNoteStatus(${note.id}, 'completed')">Mark Complete</button>` : ''}
                        <button onclick="deleteNote(${note.id})">Delete</button>
                    </div>
                </div>
            </div>
        `).join('');

        updateNotesBadge();
    }

    function getNoteTypeIcon(type) {
        const icons = {
            'task': '📋',
            'feedback': '💬',
            'idea': '💡',
            'question': '❓',
            'correction': '🔧'
        };
        return icons[type] || '📌';
    }

    function getNoteTypeLabel(type) {
        const labels = {
            'task': 'Task/Priority',
            'feedback': 'Feedback',
            'idea': 'Idea',
            'question': 'Question',
            'correction': 'Correction'
        };
        return labels[type] || type;
    }

    function getStatusLabel(status) {
        const labels = {
            'unread': 'New',
            'in-progress': 'In Progress',
            'completed': 'Completed'
        };
        return labels[status] || status;
    }

    function updateNotesBadge() {
        const notes = JSON.parse(localStorage.getItem('jesusNotes')) || [];
        const unreadCount = notes.filter(n => n.status === 'unread').length;
        const badge = document.getElementById('notesBadge');
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'flex' : 'none';
    }

    window.updateNoteStatus = function(id, status) {
        const notes = JSON.parse(localStorage.getItem('jesusNotes')) || [];
        const note = notes.find(n => n.id == id);
        if (note) {
            note.status = status;
            localStorage.setItem('jesusNotes', JSON.stringify(notes));
            loadNotes();
        }
    };

    window.deleteNote = function(id) {
        if (!confirm('Delete this note?')) return;
        let notes = JSON.parse(localStorage.getItem('jesusNotes')) || [];
        notes = notes.filter(n => n.id != id);
        localStorage.setItem('jesusNotes', JSON.stringify(notes));
        loadNotes();
    };

    // ========== 10. CONTENT / NEWSLETTER ==========
    function loadContent() {
        const content = dashboardData.content;
        if (!content) return;

        // Pending
        const pending = content.filter(c => c.status === 'pending' || c.status === 'revision');
        document.getElementById('pendingContentCount').textContent = pending.length;
        renderContentList('pendingContentList', pending, true);

        // Approved
        const approved = content.filter(c => c.status === 'approved');
        document.getElementById('approvedContentCount').textContent = approved.length;
        renderContentList('approvedContentList', approved, false);

        // Published
        const published = content.filter(c => c.status === 'published');
        document.getElementById('publishedContentCount').textContent = published.length;
        renderPublishedList('publishedContentList', published);
    }

    function renderContentList(elementId, items, clickable) {
        const el = document.getElementById(elementId);
        if (!items || items.length === 0) {
            el.innerHTML = '<div class="empty-state"><p>Nothing here</p></div>';
            return;
        }

        el.innerHTML = items.map(item => `
            <div class="content-item" ${clickable ? `onclick="openContentModal(${item.id})"` : ''} data-id="${item.id}">
                <span class="content-item-icon">${getContentIcon(item.type)}</span>
                <div class="content-item-info">
                    <div class="content-item-title">${item.title}</div>
                    <div class="content-item-meta">${item.type} • ${formatDate(item.createdAt)}</div>
                </div>
                <span class="content-item-status ${item.status}">${getStatusText(item.status)}</span>
            </div>
        `).join('');
    }

    function renderPublishedList(elementId, items) {
        const el = document.getElementById(elementId);
        if (!items || items.length === 0) {
            el.innerHTML = '<div class="empty-state"><p>No published content yet</p></div>';
            return;
        }

        el.innerHTML = items.map(item => `
            <div class="content-item" data-id="${item.id}">
                <span class="content-item-icon">${getContentIcon(item.type)}</span>
                <div class="content-item-info">
                    <div class="content-item-title">${item.title}</div>
                    <div class="content-item-meta">${item.type} • Published ${formatDate(item.publishedAt)}</div>
                </div>
                <a href="${item.url}" target="_blank" class="content-item-link">🔗 View on ${item.platform || 'Substack'}</a>
            </div>
        `).join('');
    }

    function getContentIcon(type) {
        const icons = {
            'newsletter': '📧',
            'blog': '📝',
            'linkedin': '💼',
            'twitter': '🐦',
            'email': '✉️',
            'video': '🎬',
            'sora': '🎬',
            'reel': '📱',
            'youtube': '▶️'
        };
        return icons[type] || '📄';
    }

    function getStatusText(status) {
        const texts = {
            'pending': 'Pending Review',
            'revision': 'Needs Revision',
            'approved': 'Approved',
            'published': 'Published'
        };
        return texts[status] || status;
    }

    // Current content being viewed
    let currentContentId = null;

    window.openContentModal = function(id) {
        const content = dashboardData.content.find(c => c.id == id);
        if (!content) return;

        currentContentId = id;

        document.getElementById('contentTypeBadge').textContent = content.type;
        document.getElementById('contentTitle').textContent = content.title;
        document.getElementById('contentMeta').textContent = `${getStatusText(content.status)} • Created ${formatDate(content.createdAt)}`;
        
        // Handle different content types
        const previewEl = document.getElementById('contentPreview');
        
        if (content.type === 'video' || content.type === 'sora' || content.type === 'reel' || content.type === 'youtube') {
            // Video content with link and caption
            let videoHtml = '';
            
            // Video embed or link
            if (content.videoUrl) {
                if (content.videoUrl.includes('youtube.com') || content.videoUrl.includes('youtu.be')) {
                    const videoId = extractYouTubeId(content.videoUrl);
                    videoHtml = `<div class="video-preview">
                        <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                    </div>`;
                } else {
                    videoHtml = `<div class="video-link">
                        <span class="video-link-icon">🎬</span>
                        <div>
                            <a href="${content.videoUrl}" target="_blank">Watch Video ↗</a>
                            <p style="font-size:0.8rem;color:var(--text-muted);margin-top:0.25rem;">${content.videoUrl}</p>
                        </div>
                    </div>`;
                }
            }
            
            // Caption
            if (content.caption) {
                videoHtml += `<div class="video-caption">
                    <div class="video-caption-label">Caption / Post Copy</div>
                    <div class="video-caption-text">${content.caption}</div>
                </div>`;
            }
            
            // Additional notes
            if (content.body) {
                videoHtml += `<div style="margin-top:1rem;">${renderContent(content.body)}</div>`;
            }
            
            previewEl.innerHTML = videoHtml;
        } else {
            // Text content (newsletter, blog, etc.)
            previewEl.innerHTML = renderContent(content.body);
        }
        
        document.getElementById('revisionNotes').style.display = 'none';
        document.getElementById('contentModal').style.display = 'block';
        document.body.style.overflow = 'hidden';
    };
    
    function extractYouTubeId(url) {
        const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\?\/]+)/);
        return match ? match[1] : '';
    }

    window.closeContentModal = function() {
        document.getElementById('contentModal').style.display = 'none';
        document.body.style.overflow = 'auto';
        currentContentId = null;
    };

    window.approveContent = function() {
        if (!currentContentId) return;
        
        // In real implementation, this would update data and notify Jesus
        // For now, save to localStorage
        let approvals = JSON.parse(localStorage.getItem('contentApprovals')) || [];
        approvals.push({
            id: currentContentId,
            action: 'approved',
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('contentApprovals', JSON.stringify(approvals));
        
        alert('✅ Content approved! Jesus will post it shortly.');
        closeContentModal();
    };

    window.requestRevision = function() {
        document.getElementById('revisionNotes').style.display = 'block';
    };

    window.submitRevision = function() {
        const notes = document.getElementById('revisionText').value.trim();
        if (!notes) {
            alert('Please enter revision notes');
            return;
        }

        let revisions = JSON.parse(localStorage.getItem('contentRevisions')) || [];
        revisions.push({
            id: currentContentId,
            notes: notes,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('contentRevisions', JSON.stringify(revisions));

        alert('✏️ Revision request sent to Jesus.');
        closeContentModal();
    };

    window.rejectContent = function() {
        if (!confirm('Are you sure you want to reject this content?')) return;

        let rejections = JSON.parse(localStorage.getItem('contentRejections')) || [];
        rejections.push({
            id: currentContentId,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('contentRejections', JSON.stringify(rejections));

        alert('❌ Content rejected.');
        closeContentModal();
    };

    // Close content modal on escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeContentModal();
            closeSopModal();
        }
    });

    // ========== 8. SYSTEM HEALTH ==========
    function loadSystemHealth() {
        const health = dashboardData.systemHealth;
        if (!health) return;

        // Main health indicators
        document.getElementById('openclawStatus').textContent = health.openclaw ? 'Connected' : 'Disconnected';
        document.getElementById('openclawStatus').className = 'health-status ' + (health.openclaw ? 'online' : 'offline');
        
        document.getElementById('lastHeartbeat').textContent = health.lastHeartbeat ? formatDateTime(health.lastHeartbeat) : '--';
        document.getElementById('uptimePercent').textContent = health.uptime ? health.uptime + '%' : '--%';
        document.getElementById('memoryUsage').textContent = health.memory ? health.memory + ' MB' : '-- MB';

        // API Connections
        const apiGrid = document.getElementById('apiGrid');
        if (health.apis && health.apis.length > 0) {
            apiGrid.innerHTML = health.apis.map(api => `
                <div class="api-item">
                    <span class="api-name">${api.name}</span>
                    <span class="api-status ${api.status}"></span>
                </div>
            `).join('');
        }

        // Error Log
        const errorLog = document.getElementById('errorLog');
        if (health.errors && health.errors.length > 0) {
            errorLog.innerHTML = health.errors.map(err => `
                <div class="error-item">
                    <div class="error-time">${formatDateTime(err.time)}</div>
                    <div class="error-message">${err.message}</div>
                </div>
            `).join('');
        } else {
            errorLog.innerHTML = '<div class="no-errors">✅ No recent errors</div>';
        }
    }

    // ========== 9. METRICS ==========
    function loadMetrics() {
        const metrics = dashboardData.metrics;
        if (!metrics) return;

        // Work Output
        document.getElementById('tasksToday').textContent = metrics.tasksToday || 0;
        document.getElementById('tasksWeek').textContent = metrics.tasksWeek || 0;
        document.getElementById('tasksMonth').textContent = metrics.tasksMonth || 0;
        document.getElementById('emailsDrafted').textContent = metrics.emailsDrafted || 0;
        document.getElementById('docsProcessed').textContent = metrics.docsProcessed || 0;
        document.getElementById('buildsDelivered').textContent = metrics.buildsDelivered || 0;

        // Reliability
        document.getElementById('uptimeMetric').textContent = (metrics.uptime || 0) + '%';
        document.getElementById('failedTasks').textContent = metrics.failedTasks || 0;
        document.getElementById('avgResponse').textContent = metrics.avgResponse || '--';
        document.getElementById('errorsCaught').textContent = metrics.errorsCaught || 0;

        // ROI
        document.getElementById('hoursSaved').textContent = metrics.hoursSaved || 0;
        document.getElementById('tasksAuto').textContent = metrics.tasksAutoHandled || 0;
        document.getElementById('apiCost').textContent = formatMoney(metrics.apiCostToday || 0);
        document.getElementById('apiCostTotal').textContent = formatMoney(metrics.apiCostTotal || 0);
    }

    // ========== SCRIPTURE ==========
    function loadScripture() {
        if (!scriptures || scriptures.length === 0) return;
        const index = Math.floor(Date.now() / 600000) % scriptures.length; // Rotate every 10 min
        const scripture = scriptures[index];
        const footerVerse = document.getElementById('footerVerse');
        if (footerVerse) {
            footerVerse.textContent = `"${scripture.text}" — ${scripture.ref}`;
        }
    }

    // ========== UTILITY FUNCTIONS ==========
    function formatDate(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    function formatDateTime(dateStr) {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleString('en-US', { 
            month: 'short', day: 'numeric', 
            hour: 'numeric', minute: '2-digit'
        });
    }

    function formatMoney(amount) {
        if (!amount) return '$0';
        if (amount >= 1000000) return '$' + (amount / 1000000).toFixed(1) + 'M';
        if (amount >= 1000) return '$' + (amount / 1000).toFixed(0) + 'K';
        return '$' + amount.toFixed(2);
    }

    function formatFileSize(bytes) {
        if (!bytes) return '0 B';
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(1) + ' MB';
    }

    function renderContent(content) {
        if (!content) return '';
        // Basic markdown-like rendering
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/^- (.*?)$/gm, '<li>$1</li>')
            .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
            .replace(/\n/g, '<br>');
    }

    // ========== AUTO REFRESH ==========
    function setupAutoRefresh() {
        // Refresh data every 30 seconds by fetching fresh data.js
        setInterval(async () => {
            try {
                // Fetch fresh data.js from GitHub (cache bust)
                const timestamp = Date.now();
                const response = await fetch(`data.js?t=${timestamp}`);
                const text = await response.text();
                
                // Extract dashboardData from the script
                const match = text.match(/const dashboardData = (\{[\s\S]*\});/);
                if (match) {
                    const newData = eval('(' + match[1] + ')');
                    // Update global dashboardData
                    Object.assign(dashboardData, newData);
                    loadAllData();
                    renderChat();
                    updateLastSync();
                    console.log('Auto-refresh: data updated');
                }
            } catch (e) {
                console.log('Auto-refresh failed:', e);
            }
        }, 30000); // Every 30 seconds
    }

    function updateLastSync() {
        const syncEl = document.getElementById('lastSync');
        syncEl.textContent = 'Last sync: ' + new Date().toLocaleTimeString();
    }

})();

// ========== PROPOSALS SECTION ==========
function renderProposals() {
    const proposals = dashboardData.projectProposals || [];
    const budget = dashboardData.budgetTracker || {};
    
    // Update budget display
    document.getElementById('budgetApproved').textContent = '$' + (budget.approvedTotal || 0);
    document.getElementById('budgetSpent').textContent = '$' + (budget.spentTotal || 0);
    document.getElementById('budgetPending').textContent = '$' + (budget.pendingApproval || 0);
    document.getElementById('budgetRemaining').textContent = '$' + ((budget.thisMonth?.remaining) || 0);
    
    // Render pending proposals
    const pendingContainer = document.getElementById('pendingProposals');
    const pending = proposals.filter(p => p.status === 'pending');
    
    if (pending.length === 0) {
        pendingContainer.innerHTML = '<p class="empty-state">No pending proposals</p>';
    } else {
        pendingContainer.innerHTML = pending.map(p => `
            <div class="proposal-card pending">
                <div class="proposal-header">
                    <span class="proposal-title">${p.name}</span>
                    <span class="proposal-cost">${p.costEstimate.build}</span>
                </div>
                <p class="proposal-description">${p.description}</p>
                <div class="proposal-filters">
                    ${p.filtersPassed.map(f => `<span class="filter-tag">✓ ${f}</span>`).join('')}
                </div>
                <div class="proposal-roi">
                    <div class="proposal-roi-label">📈 ROI Projection</div>
                    <div class="proposal-roi-text">${p.roiProjection}</div>
                </div>
                
                ${p.optimizedOption ? `
                <div class="proposal-comparison">
                    <div class="comparison-header">💡 Budget Options</div>
                    <div class="comparison-grid">
                        <div class="comparison-option full">
                            <strong>Full Version: ${p.costEstimate.build}</strong>
                            <p>${p.costEstimate.notes}</p>
                        </div>
                        <div class="comparison-option optimized">
                            <strong>Optimized: ${p.optimizedOption.build}</strong>
                            <p>${p.optimizedOption.notes}</p>
                        </div>
                    </div>
                    <div class="comparison-difference">
                        <strong>Difference:</strong> ${p.optimizedOption.difference}
                    </div>
                </div>
                ` : ''}
                
                <div class="proposal-actions">
                    <button class="btn-approve" onclick="approveProposal(${p.id}, 'full')">✅ Approve Full</button>
                    ${p.optimizedOption ? `<button class="btn-optimize" onclick="approveProposal(${p.id}, 'optimized')">🔄 Approve Optimized</button>` : ''}
                    <button class="btn-reject" onclick="rejectProposal(${p.id})">❌ Reject</button>
                </div>
                <small style="color:var(--text-muted)">Submitted: ${p.submittedDate}</small>
            </div>
        `).join('');
    }
    
    // Render approved proposals
    const approvedContainer = document.getElementById('approvedProposals');
    const approved = proposals.filter(p => p.status === 'approved' || p.status === 'approved_optimized' || p.status === 'in_progress' || p.status === 'complete');
    
    if (approved.length === 0) {
        approvedContainer.innerHTML = '<p class="empty-state">No approved proposals yet</p>';
    } else {
        approvedContainer.innerHTML = approved.map(p => `
            <div class="proposal-card approved">
                <div class="proposal-header">
                    <span class="proposal-title">${p.name}</span>
                    <span class="proposal-cost">${p.costEstimate.build}</span>
                </div>
                <p class="proposal-description">${p.description}</p>
                <div class="proposal-filters">
                    ${p.filtersPassed.map(f => `<span class="filter-tag">✓ ${f}</span>`).join('')}
                </div>
                ${p.alFeedback ? `<p style="color:var(--accent-green);margin-top:0.5rem;"><strong>Al:</strong> ${p.alFeedback}</p>` : ''}
            </div>
        `).join('');
    }
}

function approveProposal(id, type) {
    let proposals = dashboardData.projectProposals;
    const proposal = proposals.find(p => p.id === id);
    if (proposal) {
        proposal.status = type === 'optimized' ? 'approved_optimized' : 'approved';
        proposal.approvedDate = new Date().toISOString().split('T')[0];
        proposal.alFeedback = type === 'optimized' ? 'Approved (Optimized Version)' : 'Approved (Full Version)';
        localStorage.setItem('projectProposals', JSON.stringify(proposals));
        renderProposals();
        alert('Project approved! Jesus will start building.');
    }
}

function rejectProposal(id) {
    const feedback = prompt('Reason for rejection (optional):');
    let proposals = dashboardData.projectProposals;
    const proposal = proposals.find(p => p.id === id);
    if (proposal) {
        proposal.status = 'rejected';
        proposal.alFeedback = feedback || 'Rejected';
        localStorage.setItem('projectProposals', JSON.stringify(proposals));
        renderProposals();
    }
}

// ========== CHALLENGES SECTION ==========
function renderChallenges() {
    const challenges = dashboardData.alChallenges || [];
    
    // In Progress
    const inProgressContainer = document.getElementById('inProgressChallenges');
    const inProgress = challenges.filter(c => c.status === 'in_progress');
    renderChallengeList(inProgressContainer, inProgress);
    
    // Open
    const openContainer = document.getElementById('openChallenges');
    const open = challenges.filter(c => c.status === 'open');
    renderChallengeList(openContainer, open);
    
    // Solved
    const solvedContainer = document.getElementById('solvedChallenges');
    const solved = challenges.filter(c => c.status === 'solved');
    renderChallengeList(solvedContainer, solved);
}

function renderChallengeList(container, challenges) {
    if (challenges.length === 0) {
        container.innerHTML = '<p class="empty-state">None</p>';
        return;
    }
    
    container.innerHTML = challenges.map(c => `
        <div class="challenge-card ${c.priority}">
            <div class="challenge-header">
                <span class="challenge-text">${c.challenge}</span>
                <span class="challenge-date">${c.dateAdded}</span>
            </div>
            ${c.jesusSolution ? `
                <div class="challenge-solution">
                    <div class="challenge-solution-label">⚡ Jesus Solution</div>
                    <div class="challenge-solution-text">${c.jesusSolution}</div>
                </div>
            ` : ''}
        </div>
    `).join('');
}

function addChallenge() {
    const input = document.getElementById('newChallengeInput');
    const priority = document.getElementById('challengePriority');
    const text = input.value.trim();
    
    if (!text) {
        alert('Please enter a challenge');
        return;
    }
    
    // Get existing challenges from localStorage or data
    let challenges = JSON.parse(localStorage.getItem('alChallenges')) || dashboardData.alChallenges || [];
    
    const newChallenge = {
        id: Date.now(),
        challenge: text,
        priority: priority.value,
        dateAdded: new Date().toISOString().split('T')[0],
        status: 'open',
        jesusSolution: '',
        solutionDate: ''
    };
    
    challenges.unshift(newChallenge);
    localStorage.setItem('alChallenges', JSON.stringify(challenges));
    dashboardData.alChallenges = challenges;
    
    input.value = '';
    renderChallenges();
    
    alert('Challenge added! Jesus will review and build a solution.');
}

// Add to init
const originalInit = window.onload;
window.onload = function() {
    if (originalInit) originalInit();
    renderProposals();
    renderChallenges();
};

// Also render on tab switch
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        const section = this.dataset.section;
        if (section === 'proposals') renderProposals();
        if (section === 'challenges') renderChallenges();
    });
});

// ========== QUICK LINKS ==========
function renderQuickLinks() {
    const links = dashboardData.quickLinks || [];
    const container = document.getElementById('quickLinksGrid');
    
    container.innerHTML = links.map(link => {
        const isClickable = link.url && link.status === 'live';
        return `
            <a href="${link.url || '#'}" 
               target="_blank" 
               class="quick-link-card ${!isClickable ? 'disabled' : ''}"
               ${!isClickable ? 'onclick="return false;"' : ''}>
                <div class="quick-link-name">
                    ${link.name}
                    <span class="quick-link-status ${link.status}">${link.status.replace('_', ' ')}</span>
                </div>
                <div class="quick-link-desc">${link.description}</div>
            </a>
        `;
    }).join('');
}

// Add to init
document.addEventListener('DOMContentLoaded', renderQuickLinks);

// ========== PROPERTIES ==========
function renderProperties() {
    const properties = dashboardData.properties || [];
    const container = document.getElementById('propertiesGrid');
    if (!container) return;
    
    // Update summary stats
    const total = properties.length;
    const researched = properties.filter(p => p.researchStatus === '100%').length;
    const atlasLive = properties.filter(p => p.atlasAgentStatus === 'live').length;
    const needsWork = properties.filter(p => p.researchStatus !== '100%').length;
    
    const propTotal = document.getElementById('propTotal');
    const propResearched = document.getElementById('propResearched');
    const propAtlasLive = document.getElementById('propAtlasLive');
    const propNeedsWork = document.getElementById('propNeedsWork');
    
    if (propTotal) propTotal.textContent = total;
    if (propResearched) propResearched.textContent = researched;
    if (propAtlasLive) propAtlasLive.textContent = atlasLive;
    if (propNeedsWork) propNeedsWork.textContent = needsWork;
    
    // Render property cards
    container.innerHTML = properties.map(prop => {
        const statusClass = prop.researchStatus === '100%' ? 'complete' : 
                           (prop.researchStatus && prop.researchStatus !== '0%') ? 'partial' : 'needs-research';
        
        const researchBadgeClass = prop.researchStatus === '100%' ? 'research-complete' :
                                   (prop.researchStatus && prop.researchStatus !== '0%') ? 'research-partial' : 'research-needed';
        
        const atlasBadgeClass = prop.atlasAgentStatus === 'live' ? 'atlas-live' : 'atlas-pending';
        const atlasText = prop.atlasAgentStatus === 'live' ? `🤖 ${prop.atlasAgent} LIVE` : '🤖 Atlas: Not Started';
        
        const brandColorsHtml = prop.brandColors ? `
            <div class="brand-colors">
                <div class="color-swatch" style="background: ${prop.brandColors.primary}" title="Primary"></div>
                <div class="color-swatch" style="background: ${prop.brandColors.secondary}" title="Secondary"></div>
                <div class="color-swatch" style="background: ${prop.brandColors.accent}" title="Accent"></div>
            </div>
        ` : '';
        
        const linksHtml = [];
        if (prop.website) {
            linksHtml.push(`<a href="https://${prop.website}" target="_blank" class="property-link">🌐 Website</a>`);
        }
        if (prop.instagram) {
            linksHtml.push(`<a href="https://instagram.com/${prop.instagram.replace('@', '')}" target="_blank" class="property-link">📸 Instagram</a>`);
        }
        if (prop.atlasAgentPhone && prop.atlasAgentStatus === 'live') {
            linksHtml.push(`<a href="tel:${prop.atlasAgentPhone}" class="property-link">📞 ${prop.atlasAgentPhone}</a>`);
        }
        
        const notesHtml = prop.notes ? `<div class="property-notes">${prop.notes}</div>` : '';
        
        return `
            <div class="property-card ${statusClass}">
                <div class="property-header">
                    <div class="property-name">${prop.name}</div>
                    <div class="property-location">📍 ${prop.location}${prop.neighborhood ? ` • ${prop.neighborhood}` : ''}</div>
                    ${brandColorsHtml}
                </div>
                <div class="property-body">
                    <div class="property-stats">
                        ${prop.units ? `<div class="property-stat"><span class="property-stat-icon">🏢</span> ${prop.units} units</div>` : ''}
                        ${prop.rent ? `<div class="property-stat"><span class="property-stat-icon">💰</span> ${prop.rent}</div>` : ''}
                        ${prop.phone ? `<div class="property-stat"><span class="property-stat-icon">📞</span> ${prop.phone}</div>` : ''}
                    </div>
                    
                    ${prop.theme ? `<div class="property-theme">"${prop.theme}"</div>` : ''}
                    
                    ${prop.targetTenant ? `<div style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 0.75rem;">🎯 <strong>Target:</strong> ${prop.targetTenant}</div>` : ''}
                    
                    <div class="property-status-row">
                        <span class="status-badge ${researchBadgeClass}">📊 Research: ${prop.researchStatus || '0%'}</span>
                        <span class="status-badge ${atlasBadgeClass}">${atlasText}</span>
                    </div>
                    
                    ${linksHtml.length > 0 ? `<div class="property-links">${linksHtml.join('')}</div>` : ''}
                    
                    ${notesHtml}
                </div>
            </div>
        `;
    }).join('');
}

// Render properties on load and tab switch
document.addEventListener('DOMContentLoaded', renderProperties);
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        if (this.dataset.section === 'properties') renderProperties();
    });
});

// ========== ACCESS & PERMISSIONS ==========
function renderAccess() {
    const access = dashboardData.access;
    if (!access) return;
    
    // Update audit date
    const auditDate = document.getElementById('accessAuditDate');
    if (auditDate && access.lastAudit) {
        auditDate.textContent = new Date(access.lastAudit).toLocaleDateString();
    }
    
    // Update summary stats
    const activeApis = access.apis?.filter(a => a.status === 'active').length || 0;
    const activeTools = access.tools?.filter(t => t.status === 'active').length || 0;
    const noAccessCount = access.noAccess?.length || 0;
    const credsCount = access.credentials?.length || 0;
    
    const el = (id, val) => { const e = document.getElementById(id); if(e) e.textContent = val; };
    el('accessActiveCount', activeApis);
    el('accessToolsCount', activeTools);
    el('accessNoAccessCount', noAccessCount);
    el('accessCredsCount', credsCount);
    
    // Render APIs
    const apisGrid = document.getElementById('accessApisGrid');
    if (apisGrid && access.apis) {
        apisGrid.innerHTML = access.apis.map(api => `
            <div class="access-card ${api.status === 'active' ? 'active' : 'inactive'}">
                <div class="access-card-header">
                    <span class="access-card-name">${api.name}</span>
                    <span class="access-card-status ${api.status}">${api.status.toUpperCase()}</span>
                </div>
                <div class="access-card-desc">${api.description}</div>
                ${api.account ? `<div class="access-card-account">📧 ${api.account}</div>` : ''}
                ${api.canDo?.length ? `
                    <div class="access-card-list">
                        <div class="access-card-list-title">Can Do:</div>
                        <ul>${api.canDo.map(c => `<li>${c}</li>`).join('')}</ul>
                    </div>
                ` : ''}
                ${api.limitations?.length ? `
                    <div class="access-card-list limitations">
                        <div class="access-card-list-title">Limitations:</div>
                        <ul>${api.limitations.map(l => `<li>${l}</li>`).join('')}</ul>
                    </div>
                ` : ''}
            </div>
        `).join('');
    }
    
    // Render Tools
    const toolsGrid = document.getElementById('accessToolsGrid');
    if (toolsGrid && access.tools) {
        toolsGrid.innerHTML = access.tools.map(tool => `
            <div class="access-card ${tool.status === 'active' ? 'active' : 'inactive'}">
                <div class="access-card-header">
                    <span class="access-card-name">${tool.name}</span>
                    <span class="access-card-status ${tool.status === 'active' ? 'active' : 'inactive'}">${tool.status === 'active' ? 'ACTIVE' : tool.status}</span>
                </div>
                ${tool.scope ? `<div class="access-card-desc">Scope: ${tool.scope}</div>` : ''}
                ${tool.canDo?.length ? `
                    <div class="access-card-list">
                        <div class="access-card-list-title">Can Do:</div>
                        <ul>${tool.canDo.map(c => `<li>${c}</li>`).join('')}</ul>
                    </div>
                ` : ''}
                ${tool.missing ? `
                    <div class="access-card-missing">⚠️ ${tool.missing}</div>
                    ${tool.howToFix ? `<div class="access-card-fix">Fix: ${tool.howToFix}</div>` : ''}
                ` : ''}
            </div>
        `).join('');
    }
    
    // Render No Access
    const noAccessGrid = document.getElementById('accessNoAccessGrid');
    if (noAccessGrid && access.noAccess) {
        noAccessGrid.innerHTML = access.noAccess.map(item => `
            <div class="access-card no-access">
                <div class="access-card-header">
                    <span class="access-card-name">${item.name}</span>
                </div>
                ${item.account ? `<div class="access-card-account">📧 ${item.account}</div>` : ''}
                ${item.url ? `<div class="access-card-account">🌐 ${item.url}</div>` : ''}
                ${item.includes ? `
                    <div class="access-card-list no-access">
                        <div class="access-card-list-title">Includes:</div>
                        <ul>${item.includes.map(i => `<li>${i}</li>`).join('')}</ul>
                    </div>
                ` : ''}
                <div class="access-card-desc"><strong>Why:</strong> ${item.why}</div>
                <div class="access-card-desc"><strong>Would need:</strong> ${item.wouldNeed}</div>
            </div>
        `).join('');
    }
    
    // Render Credentials
    const credsGrid = document.getElementById('accessCredsGrid');
    if (credsGrid && access.credentials) {
        credsGrid.innerHTML = access.credentials.map(cred => `
            <div class="credential-card">
                <div class="cred-name">${cred.name}</div>
                <div class="cred-location">${cred.location}</div>
                ${cred.account ? `<div class="cred-account">${cred.account}</div>` : ''}
                <span class="cred-status">${cred.status}</span>
            </div>
        `).join('');
    }
    
    // Render Security Rules
    const rulesList = document.getElementById('securityRulesList');
    if (rulesList && access.securityRules) {
        rulesList.innerHTML = `<ul>${access.securityRules.map(r => `<li>${r}</li>`).join('')}</ul>`;
    }
}

// Render access on load and tab switch
document.addEventListener('DOMContentLoaded', renderAccess);
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        if (this.dataset.section === 'access') renderAccess();
    });
});

// ========== CHAT INTERFACE ==========
function renderChat() {
    const chat = dashboardData.chat;
    if (!chat) return;
    
    // Update last update time
    const lastUpdate = document.getElementById('chatLastUpdate');
    if (lastUpdate && chat.lastUpdated) {
        const date = new Date(chat.lastUpdated);
        lastUpdate.textContent = `Updated: ${date.toLocaleString()}`;
    }
    
    // Get localStorage notes (Al's messages)
    const localNotes = JSON.parse(localStorage.getItem('jesusNotes')) || [];
    const sentNotes = localNotes.filter(n => n.status === 'sent' || n.status === 'read');
    
    // Combine Jesus's messages with Al's sent notes
    const allMessages = [];
    
    // Add Jesus's messages from data.js
    if (chat.messages) {
        chat.messages.forEach(msg => {
            allMessages.push({
                ...msg,
                sortTime: new Date(msg.timestamp).getTime()
            });
        });
    }
    
    // Add Al's sent notes as messages
    sentNotes.forEach(note => {
        allMessages.push({
            id: 'al-' + note.id,
            from: 'al',
            content: note.content,
            timestamp: note.createdAt,
            sortTime: new Date(note.createdAt).getTime()
        });
    });
    
    // Sort by time
    allMessages.sort((a, b) => a.sortTime - b.sortTime);
    
    // Render
    const container = document.getElementById('chatMessages');
    if (!container) return;
    
    if (allMessages.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No messages yet. Send a note to start chatting!</p></div>';
        return;
    }
    
    container.innerHTML = allMessages.map(msg => {
        const isJesus = msg.from === 'jesus';
        const time = new Date(msg.timestamp).toLocaleString();
        return `
            <div class="chat-message from-${msg.from}">
                <div class="chat-message-header">
                    <span class="chat-message-sender">${isJesus ? '⚡ Jesus' : '👤 Al'}</span>
                    <span class="chat-message-time">${time}</span>
                </div>
                <div class="chat-message-content">${msg.content}</div>
            </div>
        `;
    }).join('');
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
}

// Render chat on load and tab switch
document.addEventListener('DOMContentLoaded', renderChat);
document.querySelectorAll('.nav-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        if (this.dataset.section === 'notes') renderChat();
    });
});
