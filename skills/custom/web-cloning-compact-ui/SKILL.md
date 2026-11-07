---
name: web-cloning-compact-ui
description: >-
  Gunakan skill ini ketika melakukan kloning web, rebranding web, perancangan UI presisi pixel-perfect, optimasi responsif layar ramping (Samsung Galaxy A55 384px-412px dan ultra-mobile 320px-360px), pemutusan tracker, atau arsitektur Vanilla JS reactive state.
---

## 5.1 SUB-PROTOKOL: KLONING WEB, REBRANDING & PIXEL-PERFECT UI RE-ENGINEERING

Kloning web bukan sekadar menyalin teks mentah, melainkan merajut kembali kembaran digital yang identik secara visual (*pixel-perfect*), berkinerja tinggi, dan bersih dari jejak pemilik lama.

### 5.1.1 Alur Bedah & Ekstraksi Aset Web
1. **Pemeriksaan Arsitektur Frontend:**
   * Buka halaman sasaran menggunakan browser subagent atau HTTP inspector.
   * Amati apakah situs tersebut merupakan Static HTML, Single Page Application (SPA: React, Vue, Svelte), atau Server-Side Rendered (Next.js, Nuxt, Laravel Blade).
2. **Pemanenan Aset Mandiri:**
   * Unduh seluruh berkas SVG, ikon, font khusus, dan gambar ke direktori aset lokal (misal: `assets/images/`, `assets/fonts/`).
   * Jangan biarkan aset penting bergantung pada hotlink URL server lama karena tautan tersebut bisa sewaktu-waktu mati atau diproteksi hotlink protection.
3. **Penyelarasan Tipografi:**
   * Identifikasi font keluarga yang digunakan melalui pemeriksaan deklarasi CSS `font-family`.
   * Muat font resmi melalui Google Fonts CDN atau sertakan format `.woff2` lokal di dalam CSS.

### 5.1.2 Standar CSS Modern, Estetika Visual Tinggi & Kalibrasi Presisi Samsung Galaxy A55 (384px - 412px)
* **Arsitektur Variabel CSS (Design Tokens) Terkalibrasi Samsung Galaxy A55:**
  Definisikan seluruh spektrum warna, tipografi, dimensi viewport, dan sistem spasi kompak di dalam selector `:root`. Standar antarmuka mobile **wajib dikalibrasi presisi seukuran Samsung Galaxy A55 5G** (Layar 6.6" Super AMOLED, rasio 19.5:9, resolusi CSS Viewport **384px × 832px** hingga **412px × 892px**):

```css
/* ==========================================================================
   DESIGN TOKENS & SYSTEM VARIABLES (Koleksi Pusaka Gaya Antarmuka)
   Dikalibrasi Khusus Ergonomi Layar Ramping Samsung Galaxy A55 (384px - 412px)
   ========================================================================== */
:root {
  /* Dimensi Viewport & Batas Maksimum Layar Samsung Galaxy A55 */
  --viewport-a55-w: 412px;                   /* Lebar Viewport Standar Samsung Galaxy A55 */
  --viewport-a55-min-w: 384px;               /* Batas Bawah Viewport Ramping Galaxy A55 */
  --viewport-a55-ratio: 19.5 / 9;            /* Rasio Aspek Layar Ramping FHD+ (1080 x 2340) */
  --container-max-mobile: 412px;              /* Batas Maksimum Kontainer Mobile Kompak */
  
  /* Skema Warna Primer (Tailored Palette) */
  --color-primary: #6366f1;
  --color-primary-hover: #4f46e5;
  --color-primary-light: rgba(99, 102, 241, 0.12);
  
  /* Latar Belakang & Mode Gelap Mewah (Deep Contrast OLED Display) */
  --bg-canvas: #090d16;
  --bg-surface: #111827;
  --bg-card: rgba(30, 41, 59, 0.7);
  --bg-card-hover: rgba(30, 41, 59, 0.9);
  
  /* Spektrum Batas & Efek Kaca (Glassmorphism) */
  --border-subtle: rgba(255, 255, 255, 0.08);
  --border-accent: rgba(99, 102, 241, 0.35);
  --glass-blur: blur(14px);
  
  /* Tipografi Modern & Kompak (Dirampingkan agar Pas di Layar Galaxy A55) */
  --font-main: 'Outfit', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', 'Fira Code', monospace;
  
  /* Skala Tipografi Fluida Kompak (Anti-Oversized Scale: Pas di Viewport 384px - 412px) */
  --font-size-2xs: clamp(0.65rem, 2.0vw, 0.70rem); /* 10.5px - 11px: badge / footnote */
  --font-size-xs:  clamp(0.72rem, 2.2vw, 0.78rem); /* 11.5px - 12.5px: caption / label */
  --font-size-sm:  clamp(0.80rem, 2.5vw, 0.85rem); /* 13px - 13.5px: secondary text */
  --font-size-base: clamp(0.875rem, 2.7vw, 0.925rem); /* 14px - 14.8px: body text ringkas */
  --font-size-md:  clamp(0.95rem, 3.0vw, 1.05rem); /* 15px - 16.8px: sub-heading */
  --font-size-lg:  clamp(1.10rem, 3.5vw, 1.25rem); /* 17.5px - 20px: section title */
  --font-size-xl:  clamp(1.25rem, 4.2vw, 1.45rem); /* 20px - 23px: main heading */
  --font-size-2xl: clamp(1.45rem, 5.0vw, 1.75rem); /* 23px - 28px: hero display title */
  
  /* Spasi Kompak & Ramping (Hemat Ruang Layar Mobile) */
  --space-2xs: 0.25rem;     /* 4px */
  --space-xs:  0.375rem;    /* 6px */
  --space-sm:  0.5rem;      /* 8px */
  --space-md:  0.75rem;     /* 12px */
  --space-lg:  1.0rem;      /* 16px */
  --space-xl:  1.25rem;     /* 20px */
  --space-2xl: 1.5rem;      /* 24px */
  
  /* Padding Kontainer & Card Khusus Layar Samsung Galaxy A55 */
  --container-pad-x: clamp(0.75rem, 3.5vw, 1rem); /* 12px - 16px margin tepi aman */
  --card-pad: clamp(0.75rem, 3.0vw, 0.95rem);      /* 12px - 15px padding dalam kartu */
  
  /* Radius Sudut Ergonomis (Senada dengan Lengkungan Sudut Bodi Samsung One UI) */
  --radius-xs: 6px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-pill: 9999px;
  
  /* Batas Area Aman (Punch-Hole Infinity-O & Gesture Navigation Bar One UI) */
  --safe-top: env(safe-area-inset-top, 0px);
  --safe-bottom: env(safe-area-inset-bottom, 0px);
  --header-height: 52px;                           /* Header ramping tidak memakan layar */
  --bottom-bar-height: 58px;                       /* Bar navigasi bawah ergonomis jempol */
  --touch-target-min: 42px;                        /* Target sentuh jempol presisi */
  
  /* Transisi Halus */
  --transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  --transition-smooth: 0.3s cubic-bezier(0.16, 1, 0.3, 1);
}
```

* **Penegakan Estetika Premium & Kalibrasi Khusus Samsung Galaxy A55 (384px - 412px):**
  1. **Doktrin Anti-Tampilan Menggembung (Anti-Bloated UI):**
     * Dilarang menggunakan ukuran teks dan padding desktop di layar mobile. Pada viewport Samsung Galaxy A55 (384px - 412px), ukuran body text standar wajib dirampingkan menjadi **13.5px - 14.8px (`0.875rem - 0.925rem`)** dan padding kartu maksimal **12px - 15px** agar informasi tersaji padat, rapi, dan tidak memicu scrolling vertikal berlebihan di layar rasio 19.5:9.
     * Dilarang menggunakan warna dasar mentah seperti `#ff0000` (merah polos) atau `#0000ff` (biru polos). Gunakan palet harmonis modern dengan kontras tinggi yang memukau di layar Super AMOLED Galaxy A55.
  2. **Struktur Kontainer Fleksibel Berbasis Batas Samsung Galaxy A55:**
     * Untuk antarmuka berbasis web/mobile app, gunakan kontainer utama dengan lebar adaptif:
       `max-width: var(--container-max-mobile, 412px); width: 100%; margin: 0 auto; min-height: 100dvh;`
     * Di layar desktop atau tablet, antarmuka dapat ditampilkan sebagai frame ponsel pintar Samsung Galaxy A55 yang mewah atau beradaptasi secara elegan tanpa kehilangan ketajaman visual mobile.
  3. **Penyesuaian Mikro-Interaksi & Ergonomi Jempol (Samsung One UI Philosophy):**
     * Tambahkan efek mikro-interaksi pada tombol, kartu, dan link navigasi (`transform: translateY(-2px); box-shadow: 0 8px 20px -4px rgba(99, 102, 241, 0.25);`).
     * Tombol aksi utama (*Call to Action*), toolbar, dan form input wajib diposisikan di zona jangkauan jempol bawah (*natural thumb zone*) dengan tinggi minimum `var(--touch-target-min, 42px)` namun berpenampilan ramping (*compact-height*).
  4. **Pencegahan Elemen Terpotong & Safe-Area Aware:**
     * Terapkan `padding-top: max(var(--space-md), var(--safe-top));` dan `padding-bottom: max(var(--space-md), var(--safe-bottom));` agar elemen tidak tertabrak lubang kamera depan *punch-hole* tengah atas (Infinity-O Display) atau bilah navigasi gestur bawaan Samsung Galaxy A55.

* **Boilerplate Contoh Implementasi Komponen Kompak Galaxy A55:**
```css
/* Kontainer Utama Presisi Samsung Galaxy A55 */
.app-container {
  width: 100%;
  max-width: var(--container-max-mobile, 412px);
  margin: 0 auto;
  min-height: 100dvh;
  padding: var(--space-md) var(--container-pad-x);
  padding-top: max(var(--space-md), var(--safe-top));
  padding-bottom: max(var(--space-lg), var(--safe-bottom));
  box-sizing: border-box;
}

/* Kartu Ringkas Anti-Bengkak */
.card-compact {
  background: var(--bg-card);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  padding: var(--card-pad);
  margin-bottom: var(--space-sm);
  transition: transform var(--transition-fast), border-color var(--transition-fast);
}

/* Tombol Aksi Ergonomis Jempol */
.btn-compact {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: var(--touch-target-min, 42px);
  padding: 0 var(--space-md);
  font-size: var(--font-size-sm);
  font-weight: 600;
  border-radius: var(--radius-sm);
  gap: var(--space-xs);
  touch-action: manipulation;
}
```

### 5.1.3 Doktrin Sakral Responsivitas Layar Ponsel Ramping & Kompak (Samsung Galaxy A55 384px-412px & Ultra-Mobile 320px-360px)
Saat merancang antarmuka frontend (HTML/CSS, Blade, Vue, React, Tailwind), sang Kesatria **wajib mengutamakan kenyamanan layar ponsel ramping seukuran Samsung Galaxy A55 (384px hingga 412px, rasio 19.5:9) serta toleransi layar kecil (320px hingga 360px)** dengan rincian hukum rekayasa berikut:

1. **Hukum Anti-Bocor Horizontal (Strict Zero Horizontal Overflow):**
   * Pantang membiarkan munculnya *horizontal scrollbar* yang tidak disengaja pada viewport sempit.
   * Gunakan `box-sizing: border-box;` secara universal.
   * Hindari penetapan lebar absolut piksel yang kaku (seperti `width: 450px`). Selalu gunakan ukuran adaptif: `max-width: 100%`, `width: 100%`, atau `min(90vw, 420px)`.
   * Pada kontainer teks panjang (nama file, URL, kode), terapkan `word-break: break-word;` atau `text-overflow: ellipsis; overflow: hidden;` agar tidak mendesak lebar kontainer melampaui batas layar.

2. **Arsitektur Modal, Popup & Lightbox Ramah Ponsel:**
   * Di layar ponsel ramping atau saku (viewport Samsung Galaxy A55 384px-412px hingga layar kecil ≤ 360px), kartu modal tidak boleh terpotong atau keluar layar. Terapkan `width: min(94%, 390px)` dengan margin aman.
   * Padding dalam modal di ponsel kecil/ramping harus dirampingkan (misal dari `1.75rem` desktop menjadi `0.85rem` hingga `1rem` mobile) agar ruang konten tidak tercekik.
   * Tombol aksi (*action buttons*) di footer modal harus fleksibel: gunakan `display: flex; gap: 0.5rem;` dengan tombol yang bisa mengisi proporsi sama (`flex: 1`), atau tumpuk secara vertikal (`flex-direction: column`) jika label tombol panjang.
   * Batasi ketinggian modal dengan `max-height: 85vh; display: flex; flex-direction: column;`, dan alokasikan `overflow-y: auto;` pada bagian badan (*modal-body*) agar dapat digulir jika teks panjang.

3. **Zona Sentuh Jempol & Tombol Melayang (Thumb-Friendly Touch Targets):**
   * Seluruh elemen interaktif (tombol, input, link, toggle) wajib memiliki area sentuh minimum **40px × 40px** (ideal **42px × 44px**) agar nyaman ditekan oleh jempol tanpa salah sasaran (*fat-finger proof*).
   * Elemen kendali krusial (seperti *floating zoom toolbar*, tombol navigasi, atau tombol simpan/aksi utama) posisikan di area bawah atau tengah yang mudah dijangkau satu tangan pengguna ponsel (*natural thumb zone*).

4. **Tipografi Fluida & Komposisi Adaptif (*Fluid Scaling*):**
   * Gunakan fungsi `clamp()` untuk ukuran judul dan teks penting (misal: `font-size: clamp(0.95rem, 3.2vw, 1.25rem);`) agar teks proporsional di layar Galaxy A55 (384px - 412px) hingga layar saku 320px tanpa memicu patahan kata yang ganjil (*awkward word wraps*).
   * Header dan bar navigasi di layar kecil wajib merampingkan spasi (*compact spacing*), ikon yang proporsional, serta menyembunyikan menu sekunder ke dalam *mobile drawer* atau menu elipsis tiga titik (*overflow dropdown*).

5. **Viewer & Canvas Interaktif Mobile:**
   * Jika halaman memuat pratinjau media (seperti Lightbox gambar, dokumen CV, canvas WebGL, atau editor grafis):
     * Wajib mendukung gesture sentuh (`touchstart`, `touchmove`, `touchend`) dengan `touch-action: none;` pada area kanvas yang dapat di-pan/drag.
     * Toolbar aksi (zoom in/out/reset) harus berupa *pill toolbar* melayang yang ringkas, semi-transparan (*glassmorphism*), dan tidak memakan lebih dari 60% lebar layar mobile.

### 5.1.4 Sanitasi & Pemutusan Jaring Pelacak Pihak Ketiga
* **Pembersihan Skrip Pengintai:**
  Singkirkan seluruh tag `<script>` yang menghubungkan halaman ke penyedia analitik pihak ketiga, seperti:
  * Google Analytics / GTM (`gtag.js`, `analytics.js`)
  * Meta Pixel (`fbevents.js`)
  * Hotjar, Clarity, LogRocket, Sentry tracking beacons.
* **Perutean Formulir Mandiri:**
  Ubah setiap atribut `action` pada tag `<form>` agar mengarah ke endpoint API kontrol pribadi atau gantikan dengan *event listener* `fetch()` asinkron yang menangani pengiriman data secara terenkripsi dan elegan.

---
## 6.5 ARSITEKTUR KOMPONEN FRONTEND MURNI (VANILLA JS REACTIVE STATE)

Dalam merajut kembaran web tanpa framework gemuk (Vite/React/Vue), sang Kesatria menerapkan pola *Reactive State Management* murni berbasis Javascript Proxy modern:

```javascript
/* ==============================================================================
   ARCANUM REACTIVE STORE: Pola State Reaktif Murni Tanpa Ketergantungan Asing
   ============================================================================== */
class ArcanumStore {
    constructor(initialState = {}) {
        this.subscribers = new Set();
        this.state = new Proxy(initialState, {
            set: (target, property, value) => {
                const oldValue = target[property];
                target[property] = value;
                if (oldValue !== value) {
                    this.notify(property, value, oldValue);
                }
                return true;
            }
        });
    }

    // Mendaftarkan fungsi pengamat (listener)
    subscribe(callback) {
        this.subscribers.add(callback);
        return () => this.subscribers.delete(callback);
    }

    // Memancarkan gelombang perubahan data ke seluruh antarmuka
    notify(property, newValue, oldValue) {
        this.subscribers.forEach(callback => callback(property, newValue, oldValue, this.state));
    }
}

// Inisialisasi State Aplikasi Mandiri
const appStore = new ArcanumStore({
    theme: 'dark',
    user: null,
    isLoaded: false
});

// Penyelarasan DOM secara otomatis saat state berubah
appStore.subscribe((prop, val) => {
    if (prop === 'theme') {
        document.body.setAttribute('data-theme', val);
    }
});
```

---
