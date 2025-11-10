# Mengajar Materi PWA

Projek ini adalah contoh **Progressive Web App (PWA)** sederhana bernama **Wisata Explore**, yang menampilkan informasi wisata populer di Indonesia seperti Candi Borobudur dan Gunung Bromo. Projek ini dibuat untuk keperluan belajar PWA, termasuk penggunaan **Service Worker** dan **manifest.json**.

## Fitur

* Tampilan modern dengan **HTML + CSS** sederhana.
* **PWA-ready**: bisa diinstall di perangkat mobile maupun desktop.
* **Offline-first**: konten tetap bisa diakses meskipun tidak ada koneksi internet, menggunakan **Service Worker** dan caching.
* Icon aplikasi untuk berbagai ukuran melalui `manifest.json`.

## Struktur File

```
/ (root)
│-- index.html           # Halaman utama
│-- style.css            # Styling halaman
│-- manifest.json        # Manifest untuk PWA
│-- service-worker.js    # Service Worker untuk caching offline
│-- logo.png             # Icon aplikasi
│-- borobudur.jpg        # Gambar Candi Borobudur
└-- bromo.jpg            # Gambar Gunung Bromo
```

## Cara Menjalankan

1. Buka projek di **VS Code**.
2. Pastikan extension **Live Server** sudah terpasang.
3. Klik kanan `index.html` → pilih **Open with Live Server**.

   * Browser akan terbuka otomatis, biasanya di alamat `http://127.0.0.1:5500/` atau serupa.
4. Pastikan **Service Worker** terdaftar di console browser.

   * Jika berhasil, akan muncul pesan:

     ```
     Service Worker berhasil didaftarkan
     ```
5. Kamu bisa menambahkan aplikasi ke homescreen di perangkat mobile atau desktop.

## Penjelasan Teknis

### 1. `manifest.json`

* Mendefinisikan **nama aplikasi**, **start_url**, **warna tema**, dan **ikon**.
* Memungkinkan browser mengenali aplikasi sebagai PWA dan dapat diinstall.

### 2. `service-worker.js`

* Meng-cache semua file penting (`index.html`, CSS, gambar, dll.) saat **install**.
* Menyediakan **offline-first** experience dengan mengembalikan file dari cache jika internet tidak tersedia.

```javascript
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
              .then(response => response || fetch(event.request))
    );
});
```

### 3. `index.html`

* Memuat manifest dan mendaftarkan Service Worker.
* Menampilkan kartu wisata dengan gambar dan deskripsi singkat.

## Cara Menambah Konten

1. Tambahkan gambar baru di root folder.
2. Tambahkan `<div class="card">` di `index.html` dengan format:

```html
<div class="card">
    <img src="nama-gambar.jpg" alt="Nama Wisata" width="300" height="200">
    <h2>Nama Wisata</h2>
    <p>Deskripsi singkat tentang wisata.</p>
</div>
```

3. Update `urlsToCache` di `service-worker.js` agar file baru ikut dicache:

```javascript
const urlsToCache = [
    '/index.html',
    '/style.css',
    '/logo.png',
    '/nama-gambar.jpg',
    ...
];
