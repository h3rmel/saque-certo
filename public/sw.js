// This is the service worker with the Cache-first network

const CACHE = "saque-certo-cache-v1";
const precacheFiles = [
  "/",
  "/index.html",
  "/manifest.json"
];

// Install SW
self.addEventListener('install', function(event) {
  console.log('Service Worker: Installed');

  event.waitUntil(
    caches.open(CACHE).then(function(cache) {
      console.log('Service Worker: Caching Files');
      return cache.addAll(precacheFiles);
    })
  );
});

// Activate SW
self.addEventListener('activate', function(event) {
  console.log('Service Worker: Activated');
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName !== CACHE) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Fetch event
self.addEventListener('fetch', function(event) {
  console.log('Service Worker: Fetching');
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        console.log('Service Worker: Found in Cache', event.request.url);
        return response;
      }
      
      return fetch(event.request)
        .then(function(response) {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response
          let responseToCache = response.clone();
          
          caches.open(CACHE)
            .then(function(cache) {
              cache.put(event.request, responseToCache);
            });
            
          return response;
        })
        .catch(function(err) {
          console.log('Service Worker: Fetch Error', err);
        });
    })
  );
}); 