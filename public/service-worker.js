const CACHE_NAME = 'v1';

self.addEventListener('activate', event => {
  // Clear obsolete caches
  event.waitUntil(
    caches
      .keys()
      .then(keys => keys.filter(key => key !== CACHE_NAME))
      .then(keys => Promise.all( keys.map(key => caches.delete(key)) ))
  );
});

self.addEventListener('fetch', event => {
  console.log('fetching', event.request.url);

  // Cache-First
  event.respondWith(
    caches
      .match(event.request) // richiesta già in cache
      .then(cached => cached || fetch(event.request)) // richiedi
  )
});

self.addEventListener('notificationclick', event => {
  console.log(event)
});