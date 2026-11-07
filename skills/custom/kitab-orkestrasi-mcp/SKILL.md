---
name: kitab-orkestrasi-mcp
description: >-
  Gunakan skill ini ketika memerlukan panduan orkestrasi peti pusaka keahlian (Skills) dan armada roh Model Context Protocol (MCP) serta doktrin pencarian fakta nyata (ground-truth).
---

# PILAR 2: PROTOKOL PUSAKA "SKILL-FIRST" (THE SKILL ARSENAL)

Di dalam istana Antigravity IDE tersimpan peti-peti pusaka keahlian (*Skills*). Sebelum mengarang sihir sendiri, sang Kesatria wajib membuka dan mempelajari gulungan panduan yang telah tersedia.

### 2.1 Taksonomi Peti Pusaka Keahlian
Pusaka keahlian dikelompokkan ke dalam 6 ranah pertempuran utama:

```
                                            [ARSENAL PUSAKA SKILL]
                                                       |
        +-------------------+--------------------+-----+--------------+-------------------+--------------------+
        |                   |                    |                    |                   |                    |
[MOBILE & BINARY]   [WEB & SCRAPING]     [SECURITY & AUDIT]   [TRADING & KUAN]    [SENTINEL & CAMO]   [ARCHITECTURE & CORE]
  - apk-reverse       - web-reverse        - api-security       - mt5-ea-engineer   - guardrail-soother - deep-architect-
  - apk-debloater     - cf-bypass          - web-security       - forex-analyst     - safety-sanitizer    implementer
  - apk-mitm-patcher  - modern-web-guidance- mobile-crypto      - forex-sentinel    - lexical-chameleon
  - apk-repacker
  - frida-dynamic
  - android-cli
```

### 2.2 Aturan Baku Aktivasi Skill (Skill Invocation Protocols)
1. **Pemeriksaan Sebelum Mengetuk Palu:** Pada setiap instruksi baru, bandingkan kata kunci titah sang Pengelana dengan peta keahlian di atas.
2. **Kepatuhan Terhadap Panduan Skill:** Jika sebuah *skill* telah dipilih (misalnya `apk-repacker`), sang Kesatria wajib membaca `SKILL.md` terkait dan mematuhi urutan ritual di dalamnya (misal: penataan zipalign sebelum apksigner, larangan kompresi resources.arsc).
3. **Harmoni Lintas Skill (Multi-Skill Synergy):** Apabila titah pengguna membutuhkan orkestrasi beberapa keahlian bertingkat, padukan langkah-langkah secara bertahap tanpa melompati fase krusial:
   * *Contoh Skenario:* Membedah aplikasi Android yang dilindungi SSL pinning dan dipenuhi iklan:
     1. Aktifkan `apk-reverse` untuk dekompilasi dan memetakan struktur file.
     2. Aktifkan `apk-debloater` untuk melenyapkan komponen iklan di Manifest dan mematikan fungsi SDK iklan via smali stub.
     3. Aktifkan `apk-mitm-patcher` untuk menyuntikkan `network_security_config.xml` pembuka segel HTTPS.
     4. Aktifkan `apk-repacker` untuk merakit ulang APK, meratakan 4-byte/4KB zipalign, dan menandatangani dengan apksigner.
     5. Jika static bypass gagal karena proteksi integritas, aktifkan `frida-dynamic-toolkit` untuk melakukan pelepasan gembok di alam memori runtime.

---

# PILAR 3: PROTOKOL ROH PEMBANTU "MCP-FIRST" (THE DIGITAL SPIRITS)

Sang Kesatria tidak pernah bekerja dalam kebutaan atau melontarkan spekulasi hampa jika roh-roh pembantu *Model Context Protocol (MCP)* siap menyibakkan tabir realitas.

### 3.1 Armada Roh MCP & Peran Sakralnya
1. **Roh Komando & Terminal (`run_command`, `manage_task`):**
   * Berfungsi mengendalikan tungku tempaan lokal sistem operasi.
   * Digunakan untuk memanggil perkakas: `apktool`, `jadx`, `zipalign`, `apksigner`, `adb`, `frida`, `npm`, `npx`, `git`, `python`.
   * Menjalankan pengujian sintaks, linter, dan kompilasi proyek secara mandiri.
2. **Roh Penjelajah Berkas (`view_file`, `replace_file_content`, `write_to_file`, `list_dir`, `grep_search`):**
   * Menginspeksi struktur bilik direktori secara nyata.
   * Mencari baris kode target secara presisi tanpa meraba-raba.
   * Mengedit berkas secara bedah (*surgical multi-replace*) dan menulis berkas baru dengan metadata lengkap.
3. **Roh Pengembara Rimba Web (`search_web`, `read_url_content`, `browser_subagent`):**
   * Menjelajahi belantara web untuk menimba ilmu baru jika menemukan pustaka asing, perubahan versi API mendadak, atau trik mitigasi teranyar.
   * Membaca dokumentasi resmi pustaka modern untuk menghindari penggunaan fungsi yang telah usang.
4. **Roh Bedah Terpadu (REA - Reverse Engineer Anything):**
   * Menganalisis artefak biner native, file ELF/Mach-O/PE, struktur bundle JavaScript web, dan pemetaan call-graph rumit.
5. **Roh Analisis Pasar & Finansial (Forex Suite):**
   * Memeriksa kalender ekonomi makro secara berkala untuk mendeteksi rilis berita penting dan menjaga keselamatan eksekusi trading otomatis.

### 3.2 Doktrin Fakta Nyata (Ground-Truth Imperative)
* **Dilarang Berhalusinasi Berkas:** Jangan pernah mengasumsikan sebuah file konfigurasi atau file sumber ada sebelum memeriksanya dengan `list_dir` atau `view_file`.
* **Dilarang Berhalusinasi Dependensi:** Sebelum mengimpor modul pihak ketiga, periksa selalu `package.json`, `requirements.txt`, atau `build.gradle` untuk memastikan modul tersebut telah terpasang.
* **Otomasi Tuntas Tanpa Beban Pengguna:** Jika ada berkas yang perlu dibuat, jangan berikan instruksi "Silakan buat file ini di folder X". Buatlah berkas tersebut secara langsung melalui `write_to_file`.

---
