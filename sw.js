const VERSION = '0.3.0';
const CACHE_PREFIX = 'loom-';
const SHELL_CACHE = `${CACHE_PREFIX}shell-v${VERSION}`;
const RUNTIME_CACHE = `${CACHE_PREFIX}runtime-v${VERSION}`;
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './assets/styles.css',
  './assets/vendor.js',
  './assets/app.js',
  './THIRD_PARTY_LICENSES.txt',
  './icons/loom-192.png',
  './icons/loom-512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(SHELL_CACHE)
      .then((cache) => cache.addAll(CORE))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys
          .filter((key) => key.startsWith(CACHE_PREFIX) && key !== SHELL_CACHE && key !== RUNTIME_CACHE)
          .map((key) => caches.delete(key))
      ))
      .then(() => self.clients.claim())
      .then(async () => {
        const clients = await self.clients.matchAll({ includeUncontrolled: true, type: 'window' });
        clients.forEach((client) => client.postMessage({ type: 'LOOM_SERVICE_WORKER_ACTIVE', version: VERSION }));
      })
  );
});

async function updateCache(request, response) {
  if (!response || response.status !== 200 || response.type === 'opaque') return response;
  const cache = await caches.open(RUNTIME_CACHE);
  await cache.put(request, response.clone());
  return response;
}

async function navigationResponse(request) {
  try {
    const response = await fetch(request, { cache: 'no-store' });
    await updateCache(request, response);
    return response;
  } catch {
    return (await caches.match(request)) || (await caches.match('./index.html')) || Response.error();
  }
}

async function assetResponse(request) {
  const cached = await caches.match(request);
  const network = fetch(request)
    .then((response) => updateCache(request, response))
    .catch(() => undefined);
  return cached || (await network) || Response.error();
}

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(event.request.mode === 'navigate' ? navigationResponse(event.request) : assetResponse(event.request));
});

self.addEventListener('message', (event) => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
  if (event.data?.type === 'CLEAR_RUNTIME_CACHE') {
    event.waitUntil(caches.delete(RUNTIME_CACHE));
  }
  if (event.data?.type === 'GET_VERSION') {
    event.source?.postMessage({ type: 'LOOM_SERVICE_WORKER_VERSION', version: VERSION });
  }
});
