const CACHE_NAME = "harmony-prototype-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./manifest.json",
  "./assets/harmony-logo-white.png",
  "./assets/harmony-logo-black.png",
  "./assets/harmony-mark-navy.png",
  "./assets/harmony-mark-black.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
