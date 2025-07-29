// Utility Functions

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Format date to Indian format
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('hi-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Calculate days left
function getDaysLeft(dateStr) {
    const today = new Date();
    const lastDate = new Date(dateStr);
    const diffTime = lastDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
}

// Get qualification text in Hindi
function getQualificationText(qual) {
    const qualMap = {
        '10th': '10वीं पास',
        '12th': '12वीं पास',
        'graduate': 'स्नातक',
        'postgraduate': 'परास्नातक',
        'btech': 'B.Tech',
        'bca': 'BCA',
        'mca': 'MCA',
        'diploma': 'डिप्लोमा',
        'iti': 'ITI'
    };
    return qualMap[qual] || qual;
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };
    
    toast.innerHTML = `<i class="fas ${icons[type]}"></i> ${message}`;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 4000);
}

// Generate random ID
function generateId() {
    return Date.now() + Math.random().toString(36).substr(2, 9);
}

// Validate URL
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Local storage helper
const storage = {
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (e) {
            console.error('Failed to save to localStorage:', e);
        }
    },
    
    get: (key, defaultValue = null) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            console.error('Failed to read from localStorage:', e);
            return defaultValue;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error('Failed to remove from localStorage:', e);
        }
    }
};

// Animation helper
function animateElement(element, animationClass) {
    element.classList.add(animationClass);
    element.addEventListener('animationend', () => {
        element.classList.remove(animationClass);
    });
}

// Copy to clipboard
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('📋 Copied to clipboard!', 'success');
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('📋 Copied to clipboard!', 'success');
    }
}

// Scroll to element
function scrollToElement(element, offset = 0) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Format number with Indian numbering system
function formatIndianNumber(num) {
    return num.toLocaleString('hi-IN');
}

// Get relative time (e.g., "2 hours ago")
function getRelativeTime(date) {
    const now = new Date();
    const diff = now - new Date(date);
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) return `${days} दिन पहले`;
    if (hours > 0) return `${hours} घंटे पहले`;
    if (minutes > 0) return `${minutes} मिनट पहले`;
    return 'अभी';
}

// Check network status
function checkNetworkStatus() {
    return navigator.onLine;
}

// Add event listener for network status
window.addEventListener('online', () => {
    showToast('🌐 Internet connection restored', 'success');
});

window.addEventListener('offline', () => {
    showToast('📵 No internet connection', 'warning');
});

// Export all utilities
window.utils = {
    debounce,
    formatDate,
    getDaysLeft,
    getQualificationText,
    showToast,
    generateId,
    isValidUrl,
    storage,
    animateElement,
    copyToClipboard,
    scrollToElement,
    isInViewport,
    formatIndianNumber,
    getRelativeTime,
    checkNetworkStatus
};
