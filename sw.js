// Service Worker for Government Job Portal 2025
// Version 1.0.0

const CACHE_NAME = 'govt-job-portal-2025-v1.0.0';
const STATIC_CACHE = 'govt-job-portal-static-v1.0.0';
const DYNAMIC_CACHE = 'govt-job-portal-dynamic-v1.0.0';

// Files to cache
const STATIC_FILES = [
    '/',
    '/index.html',
    '/manifest.json',
    '/assets/css/main.css',
    '/assets/css/responsive.css',
    '/assets/css/themes.css',
    '/assets/js/app.js',
    '/assets/js/utils.js',
    '/assets/js/filters.js',
    '/assets/js/export.js',
    '/assets/js/departments.js',
    '/data/jobs.json',
    '/data/sources.json',
    '/data/translations.json',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'
];

// External domains to cache dynamically
const EXTERNAL_DOMAINS = [
    'cdnjs.cloudflare.com',
    'fonts.googleapis.com',
    'fonts.gstatic.com'
];

// Install Event
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Service Worker: Static files cached successfully');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker: Error caching static files', error);
            })
    );
});

// Activate Event
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        // Delete old caches
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated successfully');
                return self.clients.claim();
            })
    );
});

// Fetch Event
self.addEventListener('fetch', event => {
    const request = event.request;
    const url = new URL(request.url);
    
    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }
    
    // Skip Chrome extension requests
    if (url.protocol === 'chrome-extension:') {
        return;
    }
    
    // Handle different types of requests
    if (isStaticFile(request.url)) {
        // Static files - Cache First strategy
        event.respondWith(cacheFirst(request));
    } else if (isExternalResource(url.hostname)) {
        // External resources - Stale While Revalidate
        event.respondWith(staleWhileRevalidate(request));
    } else if (isAPICall(request.url)) {
        // API calls - Network First strategy
        event.respondWith(networkFirst(request));
    } else {
        // Default - Network First with fallback
        event.respondWith(networkFirstWithFallback(request));
    }
});

// Cache First Strategy (for static files)
async function cacheFirst(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        const networkResponse = await fetch(request);
        const cache = await caches.open(STATIC_CACHE);
        cache.put(request, networkResponse.clone());
        return networkResponse;
    } catch (error) {
        console.error('Cache First failed:', error);
        return new Response('Offline content not available', { status: 503 });
    }
}

// Network First Strategy (for API calls)
async function networkFirst(request) {
    try {
        const networkResponse = await fetch(request);
        const cache = await caches.open(DYNAMIC_CACHE);
        cache.put(request, networkResponse.clone());
        return networkResponse;
    } catch (error) {
        console.error('Network request failed, trying cache:', error);
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        return new Response('No cached content available', { status: 503 });
    }
}

// Stale While Revalidate Strategy (for external resources)
async function staleWhileRevalidate(request) {
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    const fetchPromise = fetch(request).then(networkResponse => {
        cache.put(request, networkResponse.clone());
        return networkResponse;
    });
    
    return cachedResponse || fetchPromise;
}

// Network First with Fallback
async function networkFirstWithFallback(request) {
    try {
        const networkResponse = await fetch(request);
        
        // Cache successful responses
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        
        return networkResponse;
    } catch (error) {
        console.error('Network failed, trying cache:', error);
        
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline fallback page
        if (request.destination === 'document') {
            return caches.match('/index.html');
        }
        
        return new Response('Resource not available offline', { status: 503 });
    }
}

// Helper functions
function isStaticFile(url) {
    return STATIC_FILES.some(file => url.includes(file)) || 
           url.includes('.css') || 
           url.includes('.js') || 
           url.includes('.json');
}

function isExternalResource(hostname) {
    return EXTERNAL_DOMAINS.includes(hostname);
}

function isAPICall(url) {
    return url.includes('/api/') || 
           url.includes('gov.in') || 
           url.includes('nic.in');
}

// Background Sync for failed requests
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    try {
        console.log('Service Worker: Background sync triggered');
        // Implement background sync logic here
        // e.g., sync failed job applications, update job data, etc.
    } catch (error) {
        console.error('Background sync failed:', error);
    }
}

// Push notification handling
self.addEventListener('push', event => {
    if (!event.data) return;
    
    const data = event.data.json();
    const options = {
        body: data.body || 'New government job notification',
        icon: '/assets/images/icon-192.png',
        badge: '/assets/images/badge-72.png',
        image: data.image,
        tag: 'govt-job-notification',
        renotify: true,
        requireInteraction: true,
        actions: [
            {
                action: 'view',
                title: 'View Job',
                icon: '/assets/images/view-icon.png'
            },
            {
                action: 'dismiss',
                title: 'Dismiss',
                icon: '/assets/images/dismiss-icon.png'
            }
        ],
        data: {
            url: data.url || '/',
            jobId: data.jobId
        }
    };
    
    event.waitUntil(
        self.registration.showNotification(data.title || 'New Government Job', options)
    );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
    event.notification.close();
    
    if (event.action === 'view') {
        const url = event.notification.data.url || '/';
        event.waitUntil(
            clients.openWindow(url)
        );
    } else if (event.action === 'dismiss') {
        // Just close the notification
        return;
    } else {
        // Default action - open the app
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handling (for communication with main thread)
self.addEventListener('message', event => {
    if (event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    } else if (event.data.type === 'GET_CACHE_SIZE') {
        getCacheSize().then(size => {
            event.ports[0].postMessage({ type: 'CACHE_SIZE', size });
        });
    } else if (event.data.type === 'CLEAR_CACHE') {
        clearCache().then(() => {
            event.ports[0].postMessage({ type: 'CACHE_CLEARED' });
        });
    }
});

// Get cache size
async function getCacheSize() {
    const cacheNames = await caches.keys();
    let totalSize = 0;
    
    for (const cacheName of cacheNames) {
        const cache = await caches.open(cacheName);
        const keys = await cache.keys();
        
        for (const key of keys) {
            const response = await cache.match(key);
            if (response) {
                const blob = await response.blob();
                totalSize += blob.size;
            }
        }
    }
    
    return totalSize;
}

// Clear cache
async function clearCache() {
    const cacheNames = await caches.keys();
    await Promise.all(
        cacheNames.map(cacheName => caches.delete(cacheName))
    );
}

// Periodic background sync
self.addEventListener('periodicsync', event => {
    if (event.tag === 'job-update') {
        event.waitUntil(updateJobData());
    }
});

async function updateJobData() {
    try {
        console.log('Service Worker: Updating job data in background');
        // Implement periodic job data update logic
        // This would typically fetch latest jobs from government sources
    } catch (error) {
        console.error('Background job update failed:', error);
    }
}

console.log('Service Worker: Loaded successfully');
