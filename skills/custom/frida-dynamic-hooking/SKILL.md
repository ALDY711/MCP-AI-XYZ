---
name: frida-dynamic-hooking
description: >-
  Gunakan skill ini ketika melakukan dynamic hooking memori runtime dengan Frida, bypass universal SSL pinning, penyamaran root/emulator, penyadapan kriptografi runtime, atau injeksi BoringSSL Flutter.
---

## 5.3 SUB-PROTOKOL: DYNAMIC HOOKING & RUNTIME MEMORY INTERCEPTION (FRIDA TOOLKIT)

Jika benteng aplikasi membentengi diri dengan *anti-tamper*, *obfuscator* ganas (DexGuard, SecNeo), atau pemeriksaan integritas hash yang menolak modifikasi biner statis, sang Kesatria mengaktifkan sihir tembus pandang: **Frida Dynamic Instrumentation**.

### 5.3.1 Universal SSL Pinning Neutralizer
Skrip berikut melumpuhkan seluruh lapisan penguncian SSL modern pada runtime (TrustManager Java, OkHttp3, dan OpenSSL):

```javascript
/* ==========================================================================
   UNIVERSAL SSL PINNING BYPASS (Mantra Pelepasan Segel Rantai Cahaya)
   ========================================================================== */
Java.perform(function () {
    console.log("[*] Memulai ritual pelepasan belenggu SSL Pinning...");

    // 1. Lumpuhkan Java X509TrustManager standar
    try {
        var X509TrustManager = Java.use('javax.net.ssl.X509TrustManager');
        var SSLContext = Java.use('javax.net.ssl.SSLContext');
        
        var TrustManager = Java.registerClass({
            name: 'com.antigravity.PemberaniTrustManager',
            implements: [X509TrustManager],
            methods: {
                checkClientTrusted: function (chain, authType) {},
                checkServerTrusted: function (chain, authType) {},
                getAcceptedIssuers: function () { return []; }
            }
        });

        var TrustManagers = [TrustManager.$new()];
        var SSLContext_init = SSLContext.init.overload(
            '[Ljavax.net.ssl.KeyManager;', 
            '[Ljavax.net.ssl.TrustManager;', 
            'Ljava.security.SecureRandom;'
        );
        
        SSLContext_init.implementation = function (keyManager, trustManager, secureRandom) {
            console.log("[+] Menjinakkan SSLContext.init dengan TrustManager mandiri!");
            SSLContext_init.call(this, keyManager, TrustManagers, secureRandom);
        };
    } catch (err) {
        console.log("[-] Catatan TrustManager: " + err);
    }

    // 2. Lumpuhkan OkHttp3 CertificatePinner
    try {
        var CertificatePinner = Java.use('okhttp3.CertificatePinner');
        CertificatePinner.check.overload('java.lang.String', 'java.util.List').implementation = function (str, list) {
            console.log("[+] Menetralkan OkHttp3 CertificatePinner.check(String, List) untuk host: " + str);
            return;
        };
        CertificatePinner.check.overload('java.lang.String', '[Ljava.security.cert.Certificate;').implementation = function (str, certs) {
            console.log("[+] Menetralkan OkHttp3 CertificatePinner.check(String, Certs) untuk host: " + str);
            return;
        };
    } catch (err) {
        console.log("[-] Catatan OkHttp3: " + err);
    }

    // 3. Lumpuhkan WebViewClient onReceivedSslError
    try {
        var WebViewClient = Java.use('android.webkit.WebViewClient');
        WebViewClient.onReceivedSslError.implementation = function (view, handler, error) {
            console.log("[+] Memaksa WebView untuk melanjutkan koneksi SSL!");
            handler.proceed();
        };
    } catch (err) {
        console.log("[-] Catatan WebViewClient: " + err);
    }
});
```

### 5.3.2 Penyamaran Root & Lingkungan Emulator (Root & Emulation Cloaking)
Mengelabui pengawas keamanan yang mendeteksi apakah sistem Android telah di-root atau berjalan di emulator:

```javascript
Java.perform(function () {
    console.log("[*] Merajut kabut penyamaran Root & Emulator...");

    var File = Java.use('java.io.File');
    File.exists.implementation = function () {
        var filename = this.getAbsolutePath();
        if (filename.indexOf('/system/bin/su') !== -1 ||
            filename.indexOf('/system/xbin/su') !== -1 ||
            filename.indexOf('/sbin/su') !== -1 ||
            filename.indexOf('/data/local/xbin/su') !== -1 ||
            filename.indexOf('Magisk') !== -1) {
            console.log("[!] Mengelabui pengecekan file root: " + filename);
            return false;
        }
        return this.exists.call(this);
    };

    var Build = Java.use('android.os.Build');
    Build.TAGS.value = "release-keys";
    Build.FINGERPRINT.value = "google/taimen/taimen:9/PQ3A.190801.002/5670241:user/release-keys";
});
```

### 5.3.3 Penyadapan Kunci Kriptografi Runtime (Crypto Snooper)
Menangkap teks rahasia dan kunci AES langsung saat method enkripsi dieksekusi di memori:

```javascript
Java.perform(function () {
    var Cipher = Java.use('javax.crypto.Cipher');
    var SecretKeySpec = Java.use('javax.crypto.spec.SecretKeySpec');

    Cipher.doFinal.overload('[B').implementation = function (inputBytes) {
        var result = this.doFinal.overload('[B').call(this, inputBytes);
        try {
            var ByteString = Java.use('com.android.okhttp.okio.ByteString');
            console.log("\n[+] === CRYPTO SNOOPER MENANGKAP TRANSAKSI ===");
            console.log("    Algoritma: " + this.getAlgorithm());
            console.log("    Input Hex : " + ByteString.of(inputBytes).hex());
            console.log("    Output Hex: " + ByteString.of(result).hex());
        } catch (e) {
            console.log("[-] Gagal mencetak hex crypto: " + e);
        }
        return result;
    };
});
```

---
## 6.4 SKRIP INJEKSI DINAMIS TINGKAT LANJUT: FLUTTER BORINGSSL UNPINNING

Banyak aplikasi modern dibangun menggunakan Google Flutter. Flutter tidak menggunakan TrustManager bawaan Android Java, melainkan membawa kompilasi engine C++ sendiri dengan pustaka biner `libflutter.so` (BoringSSL).

Skrip pusaka berikut digunakan sang Kesatria untuk menembus penguncian SSL pada aplikasi berbasis Flutter:

```javascript
/* ==============================================================================
   FLUTTER BORINGSSL PINNING BYPASS (Penetral Segel Native libflutter.so)
   ============================================================================== */
function bypassFlutterPinning() {
    console.log("[*] Memindai modul libflutter.so di dalam peta memori...");

    var m = Process.findModuleByName("libflutter.so");
    if (!m) {
        console.log("[-] libflutter.so belum dimuat. Menunggu detak berikutnya...");
        setTimeout(bypassFlutterPinning, 1000);
        return;
    }

    console.log("[+] Menemukan libflutter.so di alamat basis: " + m.base);

    // Pola byte instruction x86_64 / arm64 untuk fungsi session_verify_cert_chain
    // Pada arsitektur ARM64, fungsi ini biasanya diawali dengan:
    // MOV X0, #1 ; RET
    // Pola opcode hex: 20 00 80 D2 C0 03 5F D6

    var targetPattern = "20 00 80 D2 C0 03 5F D6"; // ARM64 stub return 1
    console.log("[*] Melakukan pemindaian tanda tangan memori native...");

    Memory.scan(m.base, m.size, targetPattern, {
        onMatch: function (address, size) {
            console.log("[+] Pola penawar ditemukan pada alamat: " + address);
            // Pasang hook intervensi
            Interceptor.attach(address, {
                onLeave: function (retval) {
                    console.log("[+] Memaksa kembalian fungsi verifikasi Flutter menjadi 1 (VALID)!");
                    retval.replace(ptr(1));
                }
            });
        },
        onError: function (reason) {
            console.log("[-] Pemindaian pola memori gagal: " + reason);
        },
        onComplete: function () {
            console.log("[*] Ritual pemindaian memori native selesai.");
        }
    });
}

Java.perform(function () {
    bypassFlutterPinning();
});
```

---
