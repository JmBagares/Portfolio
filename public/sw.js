// Lightweight service worker: makes the portfolio installable and resilient
// offline without risking stale content on updates.
//
// Strategy:
//   - Navigations (HTML): network-first, fall back to cached shell when offline.
//   - Static assets (Vite emits content-hashed, immutable files): cache-first.
//   - Old caches are pruned on activate.

const CACHE_VERSION = 'v1'
const CACHE_NAME = `jm-portfolio-${CACHE_VERSION}`
const APP_SHELL = '/'

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.add(APP_SHELL)).catch(() => {}),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))),
    ),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event

  // Only handle GET requests from our own origin.
  if (request.method !== 'GET' || new URL(request.url).origin !== self.location.origin) {
    return
  }

  // Navigations: network-first so users always get the latest page when online.
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(APP_SHELL, copy)).catch(() => {})
          return response
        })
        .catch(() => caches.match(APP_SHELL).then((cached) => cached ?? caches.match(request))),
    )
    return
  }

  // Static assets: cache-first (filenames are content-hashed, so safe to keep).
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) {
        return cached
      }

      return fetch(request).then((response) => {
        if (response.ok && response.type === 'basic') {
          const copy = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy)).catch(() => {})
        }
        return response
      })
    }),
  )
})
