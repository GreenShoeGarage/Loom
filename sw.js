const CACHE_NAME = 'loom-v0.1.0';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/styles.css',
  './assets/vendor.js',
  './assets/app.js',
  './THIRD_PARTY_LICENSES.txt'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetched = fetch(event.request)
        .then((response) => {
          if (response && response.status === 200 && response.type !== 'opaque') {
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, response.clone()));
          }
          return response;
        })
        .catch(() => cached || (event.request.mode === 'navigate' ? caches.match('./index.html') : undefined));
      return cached || fetched;
    })
  );
});
