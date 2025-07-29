// Filter and Search Functionality

let searchTimeout;
let filteredJobs = [];

// Debounced search function
const debounceSearch = utils.debounce(() => {
    applyFilters();
}, 300);

// Apply all filters
function applyFilters() {
    const qualFilter = document.getElementById('qualificationFilter')?.value || '';
    const stateFilter = document.getElementById('stateFilter')?.value || '';
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    filteredJobs = window.allJobs.filter(job => {
        let matches = true;

        // Qualification filter
        if (qualFilter && job.qualification !== qualFilter) {
            matches = false;
        }

        // State filter
        if (stateFilter && job.state !== stateFilter) {
            matches = false;
        }

        // Search filter
        if (searchTerm) {
            const searchableText = [
                job.title,
                job.organization,
                job.description || '',
                job.location || '',
                utils.getQualificationText(job.qualification)
            ].join(' ').toLowerCase();
            
            matches = matches && searchableText.includes(searchTerm);
        }

        return matches;
    });

    displayJobs(filteredJobs);
    updateJobCounter();
}

// Clear all filters
function clearAllFilters() {
    document.getElementById('qualificationFilter').value = '';
    document.getElementById('stateFilter').value = '';
    document.getElementById('searchInput').value = '';
    
    applyFilters();
    utils.showToast('🔄 All filters cleared', 'info');
}

// Save current filters
function saveFilters() {
    const filters = {
        qualification: document.getElementById('qualificationFilter').value,
        state: document.getElementById('stateFilter').value,
        search: document.getElementById('searchInput').value,
        savedAt: new Date().toISOString()
    };
    
    utils.storage.set('savedFilters', filters);
    utils.showToast('💾 Filters saved successfully!', 'success');
}

// Load saved filters
function loadSavedFilters() {
    const savedFilters = utils.storage.get('savedFilters');
    
    if (savedFilters) {
        document.getElementById('qualificationFilter').value = savedFilters.qualification || '';
        document.getElementById('stateFilter').value = savedFilters.state || '';
        document.getElementById('searchInput').value = savedFilters.search || '';
        
        applyFilters();
        utils.showToast('📂 Saved filters loaded!', 'success');
    } else {
        utils.showToast('ℹ️ No saved filters found', 'info');
    }
}

// Advanced search with multiple criteria
function advancedSearch(criteria) {
    return window.allJobs.filter(job => {
        let matches = true;
        
        // Check each criterion
        Object.entries(criteria).forEach(([key, value]) => {
            if (!value) return; // Skip empty criteria
            
            switch (key) {
                case 'qualification':
                    matches = matches && job.qualification === value;
                    break;
                case 'state':
                    matches = matches && job.state === value;
                    break;
                case 'category':
                    matches = matches && job.category === value;
                    break;
                case 'salary':
                    matches = matches && checkSalaryRange(job.salary, value);
                    break;
                case 'urgency':
                    matches = matches && checkUrgency(job.lastDate, value);
                    break;
                case 'text':
                    const searchableText = [
                        job.title,
                        job.organization,
                        job.description || ''
                    ].join(' ').toLowerCase();
                    matches = matches && searchableText.includes(value.toLowerCase());
                    break;
            }
        });
        
        return matches;
    });
}

// Check salary range
function checkSalaryRange(jobSalary, range) {
    // Implementation for salary range checking
    // This is a simplified version
    const salaryText = jobSalary.toLowerCase();
    
    switch (range) {
        case 'under-20k':
            return salaryText.includes('18,000') || salaryText.includes('19,');
        case '20k-50k':
            return salaryText.includes('25,') || salaryText.includes('30,') || salaryText.includes('44,');
        case 'above-50k':
            return salaryText.includes('56,') || salaryText.includes('1,');
        default:
            return true;
    }
}

// Check urgency
function checkUrgency(lastDate, urgency) {
    const daysLeft = utils.getDaysLeft(lastDate);
    
    switch (urgency) {
        case 'today':
            return daysLeft <= 1;
        case '3days':
            return daysLeft <= 3;
        case 'week':
            return daysLeft <= 7;
        case 'month':
            return daysLeft <= 30;
        default:
            return true;
    }
}

// Sort jobs
function sortJobs(criteria) {
    const sortFunctions = {
        'date-asc': (a, b) => new Date(a.lastDate) - new Date(b.lastDate),
        'date-desc': (a, b) => new Date(b.lastDate) - new Date(a.lastDate),
        'title-asc': (a, b) => a.title.localeCompare(b.title),
        'title-desc': (a, b) => b.title.localeCompare(a.title),
        'organization-asc': (a, b) => a.organization.localeCompare(b.organization),
        'salary-desc': (a, b) => extractSalaryNumber(b.salary) - extractSalaryNumber(a.salary),
        'urgent-first': (a, b) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0)
    };
    
    if (sortFunctions[criteria]) {
        filteredJobs.sort(sortFunctions[criteria]);
        displayJobs(filteredJobs);
    }
}

// Extract salary number for comparison
function extractSalaryNumber(salaryString) {
    const matches = salaryString.match(/₹([\d,]+)/);
    return matches ? parseInt(matches[1].replace(/,/g, '')) : 0;
}

// Export filter functions
window.filters = {
    applyFilters,
    clearAllFilters,
    saveFilters,
    loadSavedFilters,
    advancedSearch,
    sortJobs,
    debounceSearch
};
