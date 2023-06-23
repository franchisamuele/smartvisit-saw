const scope = '/';

const CACHE_NAME = 'v1';
const assets = [
  '/',
  '/index.html',
  'images/favicon.ico',
  'images/manifest-icon-192.png',
  'images/manifest-icon-512.png',
  'images/Photos/battistero.jpg',
  'images/Photos/camposanto.jpg',
  'images/Photos/cattedrale.jpg',
  'images/Photos/il_filo_di_mezzogiorno.jpg',
  'images/Photos/madama_butterfly.jpg',
  'images/Photos/museo_nazionale.jpg',
  'images/Photos/navi_antiche.jpg',
  'images/Photos/oggi_e_gia_domani.jpg',
  'images/Photos/palazzo_blu.jpg',
  'images/Photos/janta_maria_della_spina.jpg',
  'images/Photos/teatro_san_andrea.jpg',
  'images/Photos/teatro_verdi.jpg',
  'images/Photos/torre_di_pisa.jpg',
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.googleapis.com/css?family=Poppins:100,200,300,400,500,600,700,800,900',
]

self.addEventListener('install', event => {
  // Wait for cache promise & precache
  event.waitUntil(
    caches
      .open(CACHE_NAME)
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
      .then(keys => keys.filter(key => key !== CACHE_NAME))
      .then(keys => Promise.all(keys.map(key => caches.delete(key))))
  );
});

self.addEventListener('fetch', event => {
  console.log('fetching', event.request.url);

  // Cache-First
  event.respondWith(
    caches
      .match(event.request) // richiesta già in cache
      .then(cached => cached || fetch(event.request)) // cache || richiedi (va avanti con la fetch normale)
  )
});