---
name: android-apk-smali-surgery
description: >-
  Gunakan skill ini ketika melakukan bedah biner APK Android, dekompilasi bersih, package refactoring, debloating iklan, network security config, bedah logika smali, tabel opcodes Dalvik, studi kasus override lisensi/logcat, serta otomatisasi zipalign dan apksigner.
---

## 5.2 SUB-PROTOKOL: BEDAH BINER ANDROID, REBRANDING INTERNAL & SMALI SURGERY

Membedah berkas APK adalah salah satu ilmu tertinggi sang Kesatria. Diperlukan ketelitian mikroskopis agar biner hasil modifikasi dapat berjalan mulus tanpa terkena kutukan *VerifyError* atau *Crash on Launch*.

### 5.2.1 Anatomi Lengkap Bangunan APK
Sebuah berkas APK sejatinya adalah arsip terkompresi berstruktur khusus yang memuat elemen-elemen berikut:
1. `AndroidManifest.xml`: Piagam undang-undang aplikasi yang mendaftarkan nama package, izin (*permissions*), activities, services, receivers, dan providers.
2. `classes.dex` (`classes2.dex`, dst.): Kompilasi bytecode Dalvik/ART yang menyimpan seluruh logika executable aplikasi.
3. `resources.arsc`: Tabel indeks sumber daya terkompilasi yang memetakan string, warna, dan ID layout.
4. `res/`: Direktori layout XML biner, menu, animasi, dan aset gambar.
5. `lib/`: Pustaka biner native C/C++ (`.so`) yang dibagi berdasarkan arsitektur CPU (`arm64-v8a`, `armeabi-v7a`, `x86_64`).
6. `assets/`: Berkas mentah yang dapat diakses langsung oleh aplikasi (database sqlite, bundle JS webview, sertifikat, font).
7. `META-INF/`: Lembaran segel tanda tangan lama pembuat aplikasi (`CERT.RSA`, `CERT.SF`, `MANIFEST.MF`).

### 5.2.2 Prosedur Dekompilasi Bersih (Clean Decompilation)
Gunakan perintah Apktool yang tepat sesuai dengan tujuan modifikasi:

```bash
# Dekompilasi standar (Membongkar resources dan menghasilkan kode smali)
apktool d -f -o output_dir target.apk

# Dekompilasi cepat tanpa membongkar dex (Hanya jika ingin mengubah XML/Resource saja)
apktool d -s -f -o output_dir target.apk

# Dekompilasi tanpa membongkar resource (Jika hanya ingin fokus bedah smali)
apktool d -r -f -o output_dir target.apk
```

### 5.2.3 Operasi Rename Identitas Internal Menyeluruh (Package Refactoring)
Jika titah mengharuskan mengubah identitas aplikasi dari nama lama (misal: `com.lama.kerajaan`) menjadi nama baru (misal: `com.baru.istanakode`):

1. **Ubah Piagam `AndroidManifest.xml`:**
   * Perbarui atribut `package="com.baru.istanakode"`.
   * Ganti `android:authorities` pada setiap tag `<provider>` agar unik:
     ```xml
     <!-- Sebelum -->
     <provider android:name="com.lama.kerajaan.InitProvider" android:authorities="com.lama.kerajaan.initprovider" />
     <!-- Sesudah -->
     <provider android:name="com.baru.istanakode.InitProvider" android:authorities="com.baru.istanakode.initprovider" />
     ```
     *Penting:* Jika authorities bentrok dengan aplikasi lain di perangkat, sistem Android akan membatalkan instalasi dengan error `INSTALL_FAILED_CONFLICTING_PROVIDER`.

2. **Restrukturisasi Bilik Direktori Smali:**
   * Di dalam direktori `smali/` (dan `smali_classes2/`, `smali_classes3/`, dst.):
     Pindahkan berkas dari folder `smali/com/lama/kerajaan/` ke struktur folder baru `smali/com/baru/istanakode/`.

3. **Operasi Penggantian Referensi Bytecode (Global Smali Replacement):**
   * Gunakan perkakas pencari teks presisi untuk mengganti seluruh deklarasi descriptor tipe kelas di seluruh berkas `.smali`:
     * Dari: `Lcom/lama/kerajaan/`
     * Menjadi: `Lcom/baru/istanakode/`
   * Ganti seluruh path slash: `com/lama/kerajaan/` -> `com/baru/istanakode/`
   * Ganti seluruh package dot notation pada string konstanta: `"com.lama.kerajaan"` -> `"com.baru.istanakode"`

4. **Penggantian Nama Layar & Lambang Mahkota:**
   * Ubah nama tampilan aplikasi pada `res/values/strings.xml`:
     ```xml
     <string name="app_name">Nama Aplikasi Baru</string>
     ```
   * Gantikan berkas gambar ikon mahkota di seluruh bilik `res/mipmap-*/ic_launcher.png` dan `res/drawable-*/ic_launcher.png` dengan ikon baru berdimensi sepadan.

### 5.2.4 Operasi Pembersihan Parasit Iklan (Debloating & Ad Removal)
1. **Memotong Saluran di `AndroidManifest.xml`:**
   Komentari atau hapus pendaftaran komponen dari jaringan iklan raksasa:
   ```xml
   <!-- Musnahkan aktivitas iklan AdMob, AppLovin, UnityAds -->
   <!-- <activity android:name="com.google.android.gms.ads.AdActivity" ... /> -->
   <!-- <activity android:name="com.applovin.adview.AppLovinInterstitialActivity" ... /> -->
   ```
2. **Penyuntikan Mantra Penenang Smali (No-Op Return Stubs):**
   Jangan pernah menghapus pemanggilan method iklan secara membabi buta jika method tersebut mengembalikan nilai atau dipanggil di banyak tempat, karena dapat menyebabkan aplikasi tertutup paksa (*crash*).
   Suntikkan *no-op return* langsung pada tubuh method pemanggil iklan di smali:

   * **Untuk method void:**
     ```smali
     .method public static showAd(Landroid/content/Context;)V
         .registers 1
         return-void
     .end method
     ```
   * **Untuk method boolean (misal: `isAdLoaded()`):**
     ```smali
     .method public isAdLoaded()Z
         .registers 2
         const/4 v0, 0x0
         return v0
     .end method
     ```

### 5.2.5 Penyiapan Inspeksi Jaringan (Network Security Config & MITM Interception)
Agar aliran data HTTPS dapat diamati melalui Cermin Pengungkap Kebenaran (Burp Suite / mitmproxy) pada Android versi modern (Android 7.0 hingga Android 15):

1. Buat berkas baru di `res/xml/network_security_config.xml`:
   ```xml
   <?xml version="1.0" encoding="utf-8"?>
   <network-security-config>
       <base-config cleartextTrafficPermitted="true">
           <trust-anchors>
               <!-- Percayai sertifikat bawaan sistem -->
               <certificates src="system" />
               <!-- Percayai sertifikat proxy yang dipasang oleh pengguna -->
               <certificates src="user" />
           </trust-anchors>
       </base-config>
   </network-security-config>
   ```
2. Daftarkan konfigurasi tersebut ke dalam tag `<application>` pada `AndroidManifest.xml`:
   ```xml
   <application
       android:name=".MainApplication"
       android:icon="@mipmap/ic_launcher"
       android:label="@string/app_name"
       android:networkSecurityConfig="@xml/network_security_config"
       android:usesCleartextTraffic="true">
   ```

### 5.2.6 Kaidah Bedah Logika Smali Presisi (Surgical Patching)
Ketika memodifikasi alur logika verifikasi klien (misal: status pemeriksaan lokal):
* **Hukum Register:** Selalu cermati deklarasi `.registers` atau `.locals`. Jangan menggunakan register di luar batas indeks yang dideklarasikan, karena akan memicu `VerifyError`.
* **Koreksi Logika Percabangan:**
  * Jika alur asli menggunakan `if-eqz v0, :cond_0` (lompat jika v0 sama dengan nol/false), dan kita ingin membalik alurnya agar selalu lolos, kita dapat mengubah instruksi menjadi `if-nez v0, :cond_0` atau mengganti pengecekan dengan lompatan mutlak `goto :cond_0`.
  * Atau paksa register pembawa hasil verifikasi bernilai benar (*true*):
    ```smali
    const/4 v0, 0x1
    return v0
    ```

### 5.2.7 Penyatuan Kembali, Penyelarasan Biner, & Pemeteraian Cincin Segel
Ini adalah ritual penempaan akhir. Urutan langkah-langkah di bawah ini pantang ditukar:

```bash
# 1. Rakit kembali folder smali dan resource menjadi file APK mentah
apktool b -o build_unaligned.apk output_dir

# 2. Lakukan Penyelarasan 4-Byte (Zipalign)
# Penyelarasan ini wajib agar OS Android dapat memetakan memori secara efisien (mmap)
zipalign -p -f 4 build_unaligned.apk build_aligned.apk

# 3. Verifikasi apakah perataan telah sempurna
zipalign -c -v 4 build_aligned.apk

# 4. Musnahkan jejak segel tanda tangan lama jika ada
# (Apktool b secara default tidak menyertakan META-INF lama, namun jika ada, pastikan bersih)

# 5. Tera tanda tangan baru menggunakan apksigner dengan skema V1, V2, dan V3
apksigner sign --ks release.keystore \
               --ks-key-alias mykey \
               --ks-pass pass:password123 \
               --key-pass pass:password123 \
               --v1-signing-enabled true \
               --v2-signing-enabled true \
               --v3-signing-enabled true \
               --out final_signed_app.apk \
               build_aligned.apk

# 6. Uji keabsahan segel tanda tangan
apksigner verify --verbose --print-certs final_signed_app.apk
```

> [!IMPORTANT]
> **Kutukan 16KB Page Alignment di Android 14 & 15:**
> Untuk aplikasi modern yang memuat pustaka biner native C/C++ (`.so`), Android 15 mulai menegakkan perataan memori 16KB/4KB. Pastikan perintah `zipalign -p -f 4` dijalankan dengan flag `-p` (*page-align shared object files*) agar berkas `.so` selaras dengan batas halaman kernel.

---
# PUSTAKA KODE REFERENSI BEDAH (THE GRAND CODE REPERTORY)

Bagian ini memuat template kode, skrip otomasi, tabel opcodes smali, dan modul runtime yang siap digunakan oleh sang Kesatria untuk menaklukkan rintangan teknis nyata.

---

## 6.1 TABEL PUSAKA OPCODES DALVIK / SMALI (BYTECODE CHEAT SHEET)

Dalam membedah `classes.dex`, sang Kesatria menguasai instruksi smali berikut dengan presisi mutlak:

| Kategori Operasi | Smali Opcode | Format Parameter | Efek Eksekusi pada Register Dalvik |
| :--- | :--- | :--- | :--- |
| **Konstanta Integer** | `const/4` | `vx, #+N` | Memuat integer 4-bit (-8 sampai +7) ke register `vx`. Contoh: `const/4 v0, 0x1` (true). |
| **Konstanta Integer** | `const/16` | `vx, #+NNNN` | Memuat integer 16-bit bertanda ke register `vx`. Contoh: `const/16 v0, 0x1f4` (500). |
| **Konstanta Integer** | `const` | `vx, #+NNNNNNNN` | Memuat integer 32-bit arbitrary ke register `vx`. |
| **Konstanta String** | `const-string` | `vx, "string"` | Memuat referensi objek string ke register `vx`. |
| **Pengembalian Nilai** | `return-void` | *(none)* | Mengakhiri eksekusi method bertipe `void` seketika. |
| **Pengembalian Nilai** | `return` | `vx` | Mengembalikan nilai integer, boolean, atau float dari `vx`. |
| **Pengembalian Nilai** | `return-object`| `vx` | Mengembalikan referensi objek (String, List, Map, dll.) dari `vx`. |
| **Percabangan Nol** | `if-eqz` | `vx, :target` | Lompat ke label `:target` jika `vx == 0` (false atau null). |
| **Percabangan Nol** | `if-nez` | `vx, :target` | Lompat ke label `:target` jika `vx != 0` (true atau non-null). |
| **Komparasi 2 Reg** | `if-eq` | `vx, vy, :target`| Lompat ke label `:target` jika `vx == vy`. |
| **Komparasi 2 Reg** | `if-ne` | `vx, vy, :target`| Lompat ke label `:target` jika `vx != vy`. |
| **Lompatan Mutlak** | `goto` | `:target` | Lompat tanpa syarat ke label `:target`. |
| **Pindah Data Reg** | `move` | `vx, vy` | Menyalin nilai primitive dari `vy` ke `vx`. |
| **Pindah Objek Reg**| `move-object` | `vx, vy` | Menyalin referensi objek dari `vy` ke `vx`. |
| **Tangkap Hasil** | `move-result` | `vx` | Menangkap nilai return primitive dari pemanggilan method sebelumnya. |
| **Tangkap Hasil Obj**| `move-result-object` | `vx` | Menangkap referensi objek return dari pemanggilan method sebelumnya. |
| **Panggil Virtual** | `invoke-virtual`| `{parameters}, Method` | Memanggil instance method normal (overridable). |
| **Panggil Statis** | `invoke-static` | `{parameters}, Method` | Memanggil static method kelas tanpa instansiasi objek. |
| **Panggil Direct** | `invoke-direct` | `{parameters}, Method` | Memanggil constructor (`<init>`) atau private instance method. |
| **Panggil Interface**| `invoke-interface`| `{parameters}, Method` | Memanggil method dari antarmuka (*interface*). |

---

## 6.2 STUDI KASUS BEDAH SMALI NYATA (SURGICAL SMALI EXAMPLES)

### Kasus A: Meremukkan Pengecekan Lisensi Lokal (License/Check Override)
Sebuah method di dalam `com/target/security/LicenseManager.smali`:

```smali
# ==============================================================================
# KODE SEBELUM BEDAH (Kutukan Pengecekan Berkelit)
# ==============================================================================
.method public isProAccountValid()Z
    .registers 3

    iget-object v0, p0, Lcom/target/security/LicenseManager;->userToken:Ljava/lang/String;
    if-eqz v0, :cond_0

    invoke-direct {p0, v0}, Lcom/target/security/LicenseManager;->verifyTokenWithServer(Ljava/lang/String;)Z
    move-result v0
    if-eqz v0, :cond_0

    const/4 v0, 0x1
    return v0

    :cond_0
    const/4 v0, 0x0
    return v0
.end method
```

**Mantra Penawar Sang Kesatria (Surgical Smali Patch):**
Kita potong seluruh percabangan rumit dan langsung paksa pengembalian `true` (`0x1`):

```smali
# ==============================================================================
# KODE SESUDAH BEDAH (Alur Logika Dibuat Selalu Mengembalikan Benar)
# ==============================================================================
.method public isProAccountValid()Z
    .registers 2

    const/4 v0, 0x1
    return v0
.end method
```

### Kasus B: Menginjeksi Logcat Telemetri Mandiri ke Smali
Jika kita ingin memata-matai nilai string token yang diproses oleh sebuah fungsi di runtime tanpa menggunakan Frida:

```smali
# Injeksi panggilan Android Log.d("ANTIGRAVITY", tokenString)
const-string v0, "ANTIGRAVITY"
iget-object v1, p0, Lcom/target/security/AuthManager;->secretToken:Ljava/lang/String;
invoke-static {v0, v1}, Landroid/util/Log;->d(Ljava/lang/String;Ljava/lang/String;)I
```

---

## 6.3 SKRIP OTOMASI TEMPAAN LENGKAP APK (BASH & POWERSHELL ENGINE)

Untuk memastikan bahwa proses *Recompile*, *Zipalign*, dan *Apksigner* berjalan 100% konsisten tanpa kelalaian manusia, sang Kesatria menggunakan skrip otomasi tempaan berikut:

```powershell
<#
==============================================================================
SKRIP OTOMASI SANG KESATRIA: BUILD, ZIPALIGN, & SIGN APK (PowerShell Engine)
==============================================================================
#>
param (
    [Parameter(Mandatory=$true)][string]$SourceDir,
    [Parameter(Mandatory=$true)][string]$OutputApkName
)

$ErrorActionPreference = "Stop"

Write-Host "[*] Memulai Tungku Tempaan Magis Antigravity..." -ForegroundColor Cyan

# 1. Kompilasi folder smali & resource menjadi APK mentah
Write-Host "[1/4] Mengompilasi sumber daya dengan Apktool..." -ForegroundColor Yellow
apktool b -o "temp_unaligned.apk" $SourceDir

# 2. Penyelarasan 4-Byte (Zipalign) dengan perataan halaman biner native
Write-Host "[2/4] Menyelaraskan batas memori (zipalign -p -f 4)..." -ForegroundColor Yellow
zipalign -p -f 4 "temp_unaligned.apk" "temp_aligned.apk"

# 3. Verifikasi hasil perataan zipalign
Write-Host "[3/4] Menguji integritas perataan memori..." -ForegroundColor Yellow
zipalign -c -v 4 "temp_aligned.apk"

# 4. Pemeteraian tanda tangan resmi (Apksigner V1, V2, V3)
Write-Host "[4/4] Memeteraikan cincin segel tanda tangan (apksigner)..." -ForegroundColor Yellow
$KeystorePath = "$env:USERPROFILE\.android\debug.keystore"
if (-not (Test-Path $KeystorePath)) {
    Write-Host "[!] debug.keystore tidak ditemukan, membuat keystore baru..." -ForegroundColor Magenta
    keytool -genkeypair -v -keystore $KeystorePath -alias androiddebugkey `
            -keypass android -storepass android -keyalg RSA -keysize 2048 `
            -validity 10000 -dname "CN=Antigravity, OU=Forge, O=Guild, L=Cyber, S=Aether, C=ID"
}

apksigner sign --ks $KeystorePath `
               --ks-key-alias androiddebugkey `
               --ks-pass pass:android `
               --key-pass pass:android `
               --v1-signing-enabled true `
               --v2-signing-enabled true `
               --v3-signing-enabled true `
               --out $OutputApkName `
               "temp_aligned.apk"

# 5. Uji keabsahan segel tanda tangan
Write-Host "[+] Memverifikasi segel artefak akhir..." -ForegroundColor Green
apksigner verify --verbose $OutputApkName

# Pembersihan residu sementara
Remove-Item -Force "temp_unaligned.apk"
Remove-Item -Force "temp_aligned.apk"

Write-Host "[+] MAHA KARYA TELAH SELESAI DITEMPA: $OutputApkName" -ForegroundColor Green
```

---
