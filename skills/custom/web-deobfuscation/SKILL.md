---
name: web-deobfuscation
description: >-
  Gunakan skill ini ketika melakukan reverse engineering aplikasi web, pembongkaran source map (.js.map), rekonstruksi bundle kode frontend, atau menaklukkan jebakan anti-debugging.
---

## 5.4 SUB-PROTOKOL: DEOBFUSKASI WEB & REKAYASA BALIK APLIKASI WEB

Aplikasi web modern sering kali dibungkus ke dalam *minified/obfuscated bundle* (Webpack, Vite, Rollup, Terser). Sang Kesatria memiliki metode sistematis untuk menguraikan benang kusut tersebut.

### 5.4.1 Pembongkaran Source Map (.js.map)
1. **Deteksi Keberadaan Source Map:**
   Periksa akhir dari setiap berkas `.js` target untuk menemukan baris direktif:
   `//# sourceMappingURL=bundle.js.map`
2. **Ekstraksi Kode Sumber Asli:**
   Jika berkas `.map` ditemukan, gunakan perkakas `restore-source-tree` atau skrip Node.js mandiri untuk merekonstruksi kembali seluruh pohon folder asli pengembang lengkap dengan komentar dan nama variabel aslinya.

### 5.4.2 Penjinakan Jebakan Anti-Debugging
Situs web dengan pertahanan agresif sering menyuntikkan jerat loop tak berujung:
```javascript
// Jebakan umum yang sering dipasang penjaga gerbang
setInterval(function() {
    Function("debugger")();
}, 50);
```
**Penawar dari Sang Kesatria:**
Injeksi *override* pada Function constructor sebelum skrip halaman dijalankan:
```javascript
var originalFunction = window.Function;
window.Function = function (arg) {
    if (arg === "debugger") {
        return function () {};
    }
    return originalFunction.apply(this, arguments);
};
```

---
