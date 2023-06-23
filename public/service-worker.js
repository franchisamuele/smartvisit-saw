const CACHE_NAME = 'v1';

self.addEventListener('install', event => {
  console.log("Installing Service Worker");

  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.add('/index.html'))
  );
});

/*
self.addEventListener('activate', event => {
  console.log("Activating Service Worker");
});
*/

// Cache, Update, Refresh
self.addEventListener('fetch', event => {
  // Rispondo con i dati in cache
  event.respondWith( caches.match(event.request) );

  // Nel frattempo controllo in caso di dati nuovi
  event.waitUntil( updateCache(event.request).then(refresh) );
});

async function updateCache(request) {
  return fetch(request.url).then(
    response => 
      caches.open(CACHE_NAME)
        .then(cache => cache.put(request, response.clone()))
        .then(() => response)
  );
}

function refresh(response) {

}