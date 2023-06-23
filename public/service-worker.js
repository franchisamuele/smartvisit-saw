const STATIC_CACHE = 'static-v1';
const DYNAMIC_CACHE = 'dynamic-v1';

const assets = [
  '/',
  '/index.html',
  'images/favicon.ico',
  'images/manifest-icon-192.png',
  'images/manifest-icon-512.png',
  'images/Photos/battistero.jpg',
  'images/Photos/cattedrale.jpg',
  'images/Photos/torre_di_pisa.jpg',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900',
]

self.addEventListener('install', event => {
  // Wait for cache promise & precache
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then(cache => {
        cache.addAll(assets);
      })
  );
});

self.addEventListener('activate', event => {
  // Clear obsolete caches
  event.waitUntil(
    caches
      .keys()
      .then(keys => keys.filter(key => key !== STATIC_CACHE))
      .then(keys => Promise.all(keys.map(key => caches.delete(key))))
  );
});

self.addEventListener('fetch', event => {
  console.log('fetching', event.request.url);

  // No caching for firestore
  if (event.request.url.indexOf('firestore.googleapis.com') === -1) {
    // Cache-First
    event.respondWith(
      caches
        .match(event.request) // richiesta già in cache
        .then(cached => cached || fetch(event.request).then(fetchRes => // cache || richiedi (va avanti con la fetch normale e salva in cache)
          caches.open(DYNAMIC_CACHE)
            .then(cache => {
              cache.put(event.request.url, fetchRes.clone());
              return fetchRes;
            })
        )
        )
    );
  }
});