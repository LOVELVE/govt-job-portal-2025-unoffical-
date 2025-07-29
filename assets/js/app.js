// Main Application Logic

// Global variables
let currentTheme = 'light';
let currentLanguage = 'hi';
let allJobs = [];
let filteredJobs = [];
let selectedJobs = [];
let isLoading = false;

// Sample jobs data
const sampleJobs = [
    {
        id: 1,
        title: "BPSC Assistant Engineer (Electrical) - 1,024 Posts",
        organization: "Bihar Public Service Commission",
        qualification: "btech",
        state: "bihar",
        mode: "online",
        category: "engineering",
        lastDate: "2025-08-10",
        salary: "₹44,900 - ₹1,42,400",
        fee: "₹750 (Gen/OBC), ₹200 (SC/ST/Female)",
        link: "https://bpsc.bih.nic.in",
        urgent: true,
        status: "working",
        description: "Civil Engineering posts with excellent career prospects",
        location: "Patna, Bihar",
        ageLimit: "21-40 years",
        fetchedAt: new Date()
    },
    {
        id: 2,
        title: "SSC CHSL - 2,500 Posts",
        organization: "Staff Selection Commission",
        qualification: "12th",
        state: "all-india",
        mode: "online",
        category: "clerical",
        lastDate: "2025-08-15",
        salary: "₹19,900 - ₹63,200",
        fee: "₹100 (Gen/OBC), NIL (SC/ST/Female)",
        link: "https://ssc.nic.in",
        urgent: false,
        status: "working",
        description: "Lower Division Clerk, Data Entry Operator posts",
        location: "All India",
        ageLimit: "18-27 years",
        fetchedAt: new Date()
    },
    {
        id: 3,
        title: "RRB Group D - 1,03,769 Posts",
        organization: "Railway Recruitment Board",
        qualification: "10th",
        state: "all-india",
        mode: "online",
        category: "railway",
        lastDate: "2025-08-20",
        salary: "₹18,000 - ₹22,000",
        fee: "₹500 (Gen/OBC), ₹250 (SC/ST)",
        link: "https://rrbapply.gov.in",
        urgent: false,
        status: "working",
        description: "Track Maintainer, Helper, Porter posts",
        location: "All Railway Zones",
        ageLimit: "18-33 years",
        fetchedAt: new Date()
    },
    {
        id: 4,
        title: "IBPS PO - 5,208 Posts",
        organization: "Institute of Banking Personnel Selection",
        qualification: "graduate",
        state: "all-india",
        mode: "online",
        category: "banking",
        lastDate: "2025-07-28",
        salary: "₹23,700 - ₹42,020",
        fee: "₹850 (Gen/OBC), ₹175 (SC/ST/Female)",
        link: "https://ibps.in",
        urgent: true,
        status: "working",
        description: "Probationary Officer in Public Sector Banks",
        location: "All India",
        ageLimit: "20-30 years",
        fetchedAt: new Date()
    },
    {
        id: 5,
        title: "AIIMS Patna Nursing Officer - 3,500 Posts",
        organization: "All India Institute of Medical Sciences",
        qualification: "graduate",
        state: "bihar",
        mode: "online",
        category: "medical",
        lastDate: "2025-08-11",
        salary: "₹25,500 - ₹81,100",
        fee: "₹3,000 (Gen/OBC), ₹2,000 (SC/ST/Female)",
        link: "https://aiimspatna.edu.in",
        urgent: false,
        status: "working",
        description: "Staff Nurse Grade-II posts",
        location: "Patna, Bihar",
        ageLimit: "21-30 years",
        fetchedAt: new Date()
    },
    {
        id: 6,
        title: "UPSC Civil Services Examination - 180 Posts",
        organization: "Union Public Service Commission",
        qualification: "graduate",
        state: "all-india",
        mode: "online",
        category: "civil-services",
        lastDate: "2025-08-05",
        salary: "₹56,100 - ₹2,50,000",
        fee: "₹100 (Gen), NIL (SC/ST/Female)",
        link: "https://upsc.gov.in",
        urgent: true,
        status: "working",
        description: "IAS, IPS, IFS and other central services",
        location: "All India",
        ageLimit: "21-32 years",
        fetchedAt: new Date()
    }
];

// Initialize application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
async function initializeApp() {
    try {
        showLoading();
        
        // Simulate loading process
        await simulateLoading();
        
        // Load data
        await loadInitialData();
        
        // Setup UI
        setupUI();
        
        // Hide loading screen
        hideLoading();
        
        // Start periodic updates
        startPeriodicUpdates();
        
        utils.showToast('🚀 Portal loaded successfully!', 'success');
    } catch (error) {
        console.error('Initialization error:', error);
        utils.showToast('❌ Failed to load portal', 'error');
        hideLoading();
    }
}

// Simulate loading process
async function simulateLoading() {
    const loadingSteps = [
        'Connecting to government sources...',
        'Loading ministry data...',
        'Fetching latest jobs...',
        'Initializing filters...',
        'Setting up interface...'
    ];
    
    for (let i = 0; i < loadingSteps.length; i++) {
        updateLoadingStatus(loadingSteps[i]);
        updateLoadingProgress((i + 1) / loadingSteps.length * 100);
        await new Promise(resolve => setTimeout(resolve, 800));
    }
}

// Load initial data
async function loadInitialData() {
    // Set global jobs data
    allJobs = [...sampleJobs];
    filteredJobs = [...allJobs];
    
    // Load departments
    departments.loadSidebarContent();
    
    // Load saved preferences
    loadUserPreferences();
    
    // Update counters
    updateLiveStats();
}

// Setup UI components
function setupUI() {
    // Display initial jobs
    displayJobs(filteredJobs);
    
    // Update job counter
    updateJobCounter();
    
    // Setup event listeners
    setupEventListeners();
    
    // Apply saved theme
    applyTheme(currentTheme);
}

// Setup event listeners
function setupEventListeners() {
    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);
    
    // Window resize
    window.addEventListener('resize', handleWindowResize);
    
    // Online/offline events
    window.addEventListener('online', handleOnlineStatus);
    window.addEventListener('offline', handleOfflineStatus);
    
    // Page visibility
    document.addEventListener('visibilitychange', handleVisibilityChange);
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(e) {
    if (e.ctrlKey || e.metaKey) {
        switch(e.key) {
            case 'f':
                e.preventDefault();
                document.getElementById('searchInput')?.focus();
                break;
            case 'p':
                e.preventDefault();
                printJobs();
                break;
            case 'd':
                e.preventDefault();
                downloadSourceCode();
                break;
            case 'r':
                e.preventDefault();
                refreshData();
                break;
            case 's':
                e.preventDefault();
                saveFilters();
                break;
        }
    }
    
    // Escape key to close sidebar
    if (e.key === 'Escape') {
        closeSidebar();
    }
}

// Display jobs
function displayJobs(jobs) {
    const container = document.getElementById('jobGrid');
    if (!container) return;
    
    if (jobs.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 60px; color: white;">
                <i class="fas fa-search" style="font-size: 4rem; margin-bottom: 20px; opacity: 0.5;"></i>
                <h3>😔 कोई नौकरी नहीं मिली</h3>
                <p>अपने filter criteria को बदलकर try करें</p>
                <button class="btn btn-primary" onclick="clearAllFilters()" style="margin-top: 20px;">
                    <i class="fas fa-undo"></i> Clear All Filters
                </button>
            </div>
        `;
        return;
    }

    container.innerHTML = jobs.map((job, index) => `
        <div class="job-card ${job.urgent ? 'urgent' : ''}" data-id="${job.id}" style="animation-delay: ${index * 0.1}s">
            <div class="job-title">${job.title}</div>
            
            <div class="job-details">
                <div class="job-detail">
                    <i class="fas fa-building job-detail-icon"></i>
                    <div class="job-detail-content">
                        <strong>संस्था:</strong> ${job.organization}
                    </div>
                </div>
                
                <div class="job-detail">
                    <i class="fas fa-graduation-cap job-detail-icon"></i>
                    <div class="job-detail-content">
                        <strong>योग्यता:</strong> ${utils.getQualificationText(job.qualification)}
                    </div>
                </div>
                
                <div class="job-detail">
                    <i class="fas fa-calendar-alt job-detail-icon"></i>
                    <div class="job-detail-content">
                        <strong>अंतिम तिथि:</strong> ${utils.formatDate(job.lastDate)} 
                        <span style="color: ${utils.getDaysLeft(job.lastDate) <= 3 ? '#f44336' : '#4CAF50'};">
                            (${utils.getDaysLeft(job.lastDate)} दिन बाकी)
                        </span>
                    </div>
                </div>
                
                <div class="job-detail">
                    <i class="fas fa-money-bill-wave job-detail-icon"></i>
                    <div class="job-detail-content">
                        <strong>वेतन:</strong> ${job.salary}
                    </div>
                </div>
                
                <div class="job-detail">
                    <i class="fas fa-credit-card job-detail-icon"></i>
                    <div class="job-detail-content">
                        <strong>फीस:</strong> ${job.fee}
                    </div>
                </div>
                
                <div class="job-detail">
                    <i class="fas fa-laptop job-detail-icon"></i>
                    <div class="job-detail-content">
                        <strong>आवेदन:</strong> ${job.mode.toUpperCase()}
                    </div>
                </div>
                
                <div class="job-detail">
                    <i class="fas fa-map-marker-alt job-detail-icon"></i>
                    <div class="job-detail-content">
                        <strong>स्थान:</strong> ${job.location}
                    </div>
                </div>
                
                <div class="job-detail">
                    <i class="fas fa-link job-detail-icon"></i>
                    <div class="job-detail-content">
                        <span class="link-status status-${job.status}"></span>
                        <strong>Status:</strong> ${job.status === 'working' ? '✅ Working' : '❌ Issue'}
                    </div>
                </div>
            </div>
            
            <div class="job-actions">
                <a href="${job.link}" target="_blank" class="btn btn-primary">
                    <i class="fas fa-external-link-alt"></i> Apply Now
                </a>
                <button class="btn btn-success" onclick="toggleJobSelection(${job.id})">
                    <i class="fas fa-check-square" id="select-icon-${job.id}"></i>
                    <span id="select-text-${job.id}">Select</span>
                </button>
                <button class="btn btn-warning" onclick="shareJob(${job.id})">
                    <i class="fas fa-share-alt"></i> Share
                </button>
                <button class="btn btn-danger" onclick="saveJob(${job.id})">
                    <i class="fas fa-bookmark"></i> Save
                </button>
            </div>
        </div>
    `).join('');
}

// Toggle job selection
function toggleJobSelection(jobId) {
    const index = selectedJobs.indexOf(jobId);
    const selectIcon = document.getElementById(`select-icon-${jobId}`);
    const selectText = document.getElementById(`select-text-${jobId}`);
    
    if (index === -1) {
        selectedJobs.push(jobId);
        selectIcon.className = 'fas fa-check-square';
        selectText.textContent = 'Selected';
        selectIcon.parentElement.style.background = '#4CAF50';
        utils.showToast('✅ Job selected for export', 'success');
    } else {
        selectedJobs.splice(index, 1);
        selectIcon.className = 'fas fa-square';
        selectText.textContent = 'Select';
        selectIcon.parentElement.style.background = '';
        utils.showToast('❌ Job removed from selection', 'info');
    }
    
    updateJobCounter();
}

// Share job
function shareJob(jobId) {
    const job = allJobs.find(j => j.id === jobId);
    if (job) {
        const shareText = `🏛️ ${job.title}\n📅 Last Date: ${job.lastDate}\n💰 Salary: ${job.salary}\n🔗 Apply: ${job.link}\n\n#GovtJobs #SarkariNaukri`;
        
        if (navigator.share) {
            navigator.share({
                title: job.title,
                text: shareText,
                url: job.link
            });
        } else {
            utils.copyToClipboard(shareText);
        }
    }
}

// Save job
function saveJob(jobId) {
    const job = allJobs.find(j => j.id === jobId);
    if (job) {
        let savedJobs = utils.storage.get('savedJobs', []);
        
        if (!savedJobs.find(j => j.id === jobId)) {
            savedJobs.push(job);
            utils.storage.set('savedJobs', savedJobs);
            utils.showToast('💾 Job saved successfully!', 'success');
        } else {
            utils.showToast('ℹ️ Job already saved!', 'info');
        }
    }
}

// Update job counter
function updateJobCounter() {
    const counter = document.getElementById('jobCounter');
    if (!counter) return;
    
    const totalJobs = allJobs.length;
    const filteredCount = filteredJobs.length;
    const selectedCount = selectedJobs.length;
    
    counter.innerHTML = `
        <i class="fas fa-chart-bar"></i>
        📊 ${utils.formatIndianNumber(filteredCount)} jobs found from ${utils.formatIndianNumber(totalJobs)} total | 
        ✅ ${selectedCount} selected |
        🔄 Last updated: ${new Date().toLocaleTimeString('hi-IN')}
    `;
}

// Update live stats
function updateLiveStats() {
    const sourceCount = document.getElementById('sourceCount');
    const jobCount = document.getElementById('jobCount');
    
    if (sourceCount) {
        sourceCount.textContent = utils.formatIndianNumber(departments.getTotalSourcesCount());
    }
    
    if (jobCount) {
        jobCount.textContent = utils.formatIndianNumber(allJobs.length);
    }
}

// Theme functions
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(currentTheme);
    utils.storage.set('theme', currentTheme);
}

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    const themeIcon = document.getElementById('themeIcon');
    const themeText = document.getElementById('themeText');
    
    if (themeIcon && themeText) {
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Light Mode';
        } else {
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'Dark Mode';
        }
    }
    
    // Add transition class temporarily
    document.body.classList.add('theme-transition');
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 300);
}

// Language functions
function toggleLanguage() {
    currentLanguage = currentLanguage === 'hi' ? 'en' : 'hi';
    const langText = document.getElementById('langText');
    
    if (langText) {
        langText.textContent = currentLanguage === 'hi' ? 'English' : 'हिंदी';
    }
    
    utils.storage.set('language', currentLanguage);
    utils.showToast(
        currentLanguage === 'hi' ? '🇮🇳 भाषा: हिंदी' : '🇺🇸 Language: English', 
        'success'
    );
}

// Sidebar functions
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.add('active');
        overlay.classList.add('active');
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    
    if (sidebar && overlay) {
        sidebar.classList.remove('active');
        overlay.classList.remove('active');
    }
}

// Refresh data
function refreshData() {
    const refreshBtn = document.getElementById('refreshBtn');
    const refreshIcon = document.querySelector('#refreshBtn i');
    const refreshText = document.getElementById('refreshText');
    
    if (refreshBtn) refreshBtn.disabled = true;
    if (refreshIcon) refreshIcon.style.animation = 'spin 1s linear infinite';
    if (refreshText) refreshText.textContent = 'Refreshing...';
    
    setTimeout(() => {
        // Simulate adding new jobs
        const newJob = {
            id: Date.now(),
            title: `Latest UPSC Notification - ${Math.floor(Math.random() * 500) + 100} Posts`,
            organization: "Union Public Service Commission",
            qualification: "graduate",
            state: "all-india",
            mode: "online",
            category: "civil-services",
            lastDate: "2025-09-15",
            salary: "₹56,100 - ₹1,77,500",
            fee: "₹200 (Gen), NIL (SC/ST/Female)",
            link: "https://upsc.gov.in",
            urgent: true,
            status: "working",
            description: "Various central services posts",
            location: "All India",
            ageLimit: "21-32 years",
            fetchedAt: new Date()
        };
        
        allJobs.unshift(newJob);
        filters.applyFilters();
        updateLiveStats();
        
        if (refreshBtn) refreshBtn.disabled = false;
        if (refreshIcon) refreshIcon.style.animation = '';
        if (refreshText) refreshText.textContent = 'Refresh';
        
        utils.showToast('🔄 Data refreshed successfully!', 'success');
    }, 2000);
}

// Load user preferences
function loadUserPreferences() {
    currentTheme = utils.storage.get('theme', 'light');
    currentLanguage = utils.storage.get('language', 'hi');
    
    applyTheme(currentTheme);
}

// Loading functions
function showLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.classList.remove('hidden');
    }
}

function hideLoading() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 500);
    }
}

function updateLoadingStatus(status) {
    const statusElement = document.getElementById('loadingStatus');
    if (statusElement) {
        statusElement.textContent = status;
    }
}

function updateLoadingProgress(percentage) {
    const progressBar = document.getElementById('loadingProgressBar');
    if (progressBar) {
        progressBar.style.width = `${percentage}%`;
    }
}

// Periodic updates
function startPeriodicUpdates() {
    // Update job counts every 30 seconds
    setInterval(() => {
        updateLiveStats();
    }, 30000);
    
    // Check for new jobs every 5 minutes
    setInterval(() => {
        console.log('Checking for new jobs...');
        // In real implementation, this would fetch from API
    }, 300000);
}

// Event handlers
function handleWindowResize() {
    // Handle responsive adjustments if needed
}

function handleOnlineStatus() {
    utils.showToast('🌐 Internet connection restored', 'success');
}

function handleOfflineStatus() {
    utils.showToast('📵 Working offline', 'warning');
}

function handleVisibilityChange() {
    if (!document.hidden) {
        // Page became visible, check for updates
        updateLiveStats();
    }
}

// Export global functions
window.allJobs = allJobs;
window.filteredJobs = filteredJobs;
window.selectedJobs = selectedJobs;
window.toggleJobSelection = toggleJobSelection;
window.shareJob = shareJob;
window.saveJob = saveJob;
window.toggleTheme = toggleTheme;
window.toggleLanguage = toggleLanguage;
window.toggleSidebar = toggleSidebar;
window.closeSidebar = closeSidebar;
window.refreshData = refreshData;
window.displayJobs = displayJobs;
window.updateJobCounter = updateJobCounter;
