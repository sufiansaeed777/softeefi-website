/* Service Worker for SofTee Solutions
 * Implements caching strategies for better performance and offline support
 */

const CACHE_NAME = 'softee-v1';
const RUNTIME_CACHE = 'runtime-cache-v1';
const IMAGE_CACHE = 'image-cache-v1';

// Files to cache on install (critical resources)
const STATIC_CACHE_URLS = [
  '/',
  '/index.html',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json',
  '/favicon.ico',
  // Add your critical assets here
];

// Install event - cache critical resources
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caching critical resources');
        return cache.addAll(STATIC_CACHE_URLS.map(url => new Request(url, { cache: 'reload' })));
      })
      .catch((error) => {
        console.error('Failed to cache:', error);
      })
  );
  
  // Force waiting SW to become the active SW
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName !== CACHE_NAME && 
                   cacheName !== RUNTIME_CACHE && 
                   cacheName !== IMAGE_CACHE;
          })
          .map((cacheName) => {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );
  
  // Take control of all clients immediately
  self.clients.claim();
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http(s) protocols
  if (!request.url.startsWith('http')) {
    return;
  }
  
  // Handle different types of resources with appropriate strategies
  if (request.destination === 'image') {
    // Images: Cache First strategy
    event.respondWith(handleImageFetch(request));
  } else if (url.pathname.startsWith('/api/')) {
    // API calls: Network First strategy
    event.respondWith(handleAPIFetch(request));
  } else if (request.destination === 'document' || 
             request.destination === 'script' || 
             request.destination === 'style') {
    // HTML, JS, CSS: Stale While Revalidate strategy
    event.respondWith(handleDocumentFetch(request));
  } else {
    // Default: Network First with cache fallback
    event.respondWith(handleDefaultFetch(request));
  }
});

// Cache First strategy for images
async function handleImageFetch(request) {
  const cache = await caches.open(IMAGE_CACHE);
  
  try {
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      // Return from cache, but update in background
      fetchAndCache(request, IMAGE_CACHE);
      return cachedResponse;
    }
    
    // Not in cache, fetch from network
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Return placeholder image if offline
    return new Response(
      `<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#1a1a1a"/>
        <text x="50%" y="50%" font-family="Arial" font-size="16" fill="#666" text-anchor="middle">
          Image unavailable offline
        </text>
      </svg>`,
      {
        headers: { 'Content-Type': 'image/svg+xml' }
      }
    );
  }
}

// Network First strategy for API calls
async function handleAPIFetch(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return error response
    return new Response(
      JSON.stringify({ error: 'Offline - No cached data available' }),
      {
        status: 503,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// Stale While Revalidate strategy for documents
async function handleDocumentFetch(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  
  // Return from cache immediately if available
  const cachedResponse = await cache.match(request);
  
  // Fetch from network in background
  const fetchPromise = fetch(request).then((networkResponse) => {
    // Update cache with fresh response
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // Network failed, return cached response if available
    return cachedResponse;
  });
  
  // Return cached response immediately, or wait for network
  return cachedResponse || fetchPromise;
}

// Network First with cache fallback for other resources
async function handleDefaultFetch(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  
  try {
    // Try network first
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Network failed, try cache
    const cachedResponse = await cache.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline page for navigation requests
    if (request.mode === 'navigate') {
      return caches.match('/offline.html') || 
        new Response('Offline', { status: 503 });
    }
    
    throw error;
  }
}

// Helper function to fetch and cache in background
async function fetchAndCache(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response);
    }
  } catch (error) {
    // Silently fail background updates
  }
}

// Listen for messages from clients
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CACHE_URLS') {
    const urls = event.data.payload;
    caches.open(RUNTIME_CACHE).then((cache) => {
      cache.addAll(urls);
    });
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    caches.keys().then((cacheNames) => {
      cacheNames.forEach((cacheName) => {
        caches.delete(cacheName);
      });
    });
  }
});