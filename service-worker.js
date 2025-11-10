// Nama cache kita
const CACHE_NAME = 'wisata-explore-v1';

// Daftar file yang akan kita simpan di cache
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/manifest.json',
    '/logo.png',
    '/borobudur.jpg',
    '/bromo.jpg'
];

// Saat 'install', simpan file ke cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache dibuka');
                return cache.addAll(urlsToCache);
            })
    );
});

// Saat ada request (fetch), cek cache dulu
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Jika ada di cache, kembalikan dari cache
                return response || fetch(event.request);
            })
    );
});
