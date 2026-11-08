# 🌌 ANTIGRAVITY MASTER MCP GATEWAY (`MCP-AI-XYZ`)
> **The Sovereign All-in-One Model Context Protocol (MCP) Gateway, Knowledge Arsenal, and Automation Engine for Autonomous AI Agents.**

[![Protocol](https://img.shields.io/badge/MCP-Protocol%202024--11--05-blue.svg)](https://modelcontextprotocol.io/)
[![Node](https://img.shields.io/badge/Node.js-v18%2B-green.svg)](https://nodejs.org/)
[![Python](https://img.shields.io/badge/Python-3.9%2B-yellow.svg)](https://python.org/)
[![Status](https://img.shields.io/badge/Status-Production%20Ready-brightgreen.svg)]()
[![License](https://img.shields.io/badge/License-MIT-purple.svg)](LICENSE)
[![Repository](https://img.shields.io/badge/GitHub-ALDY711%2FMCP--AI--XYZ-black.svg)](https://github.com/ALDY711/MCP-AI-XYZ)

---

## ⚡ CARA CEPAT: PEMASANGAN SATU BARIS (CARA 2 - ONE-LINER CURL)
> **Paling direkomendasikan jika Anda ingin memasang seluruh arsenal MCP ini secara instan TANPA PERLU `git clone`!**

Cukup salin dan jalankan satu baris perintah sakti ini di terminal Linux / macOS / WSL Anda:

```bash
curl -fsSL https://raw.githubusercontent.com/ALDY711/MCP-AI-XYZ/main/install-remote.sh | bash
```

### Apa yang Otomatis Dilakukan oleh Perintah Ini?
1. Mengunduh rilis tarball terbaru langsung dari GitHub `ALDY711/MCP-AI-XYZ` tanpa perlu Git.
2. Mengekstrak seluruh berkas ke direktori mandiri: `~/.mcp-ai-xyz/`.
3. Memasang pustaka resmi `@modelcontextprotocol/sdk`.
4. Menguji sintaks dan kesiapan protokol JSON-RPC 2.0 Stdio.
5. Otomatis menyuntikkan konfigurasi ke `~/.gemini/config/mcp_config.json`.

### Konfigurasi Siap Tempel untuk Claude Desktop / Cursor / Windsurf / Cline:
Setelah perintah di atas selesai, tambahkan blok JSON berikut ke pengaturan MCP aplikasi Anda:

```json
{
  "mcpServers": {
    "antigravity-master": {
      "command": "node",
      "args": ["/home/YOUR_USERNAME/.mcp-ai-xyz/mcp-server/server.js"],
      "disabled": false
    }
  }
}
```
*(Catatan: Ganti `/home/YOUR_USERNAME` sesuai dengan direktori `$HOME` pada komputer Anda).*

---

### 🪟 Panduan Khusus Pengguna Windows (Tanpa Git Clone)

Bagi Anda yang menggunakan **Microsoft Windows 10 / 11**, tersedia cara yang sama mudahnya:

#### Opsi 1: Satu Baris PowerShell (One-Liner Paling Direkomendasikan di Windows)
Buka **PowerShell** (tekan `Win + X`, lalu pilih **Windows PowerShell** atau **Terminal**), lalu salin dan jalankan:

```powershell
irm https://raw.githubusercontent.com/ALDY711/MCP-AI-XYZ/main/install-windows.ps1 | iex
```
*Skrip ini akan otomatis mengunduh, mengekstrak ke `C:\Users\NamaAnda\.mcp-ai-xyz`, memasang dependensi Node.js, dan menampilkan konfigurasi siap pakai.*

#### Opsi 2: Langsung via `npx` di Konfigurasi MCP Windows (Nol Unduhan Manual)
Tanpa menjalankan skrip apa pun, cukup tambahkan konfigurasi berikut ke Claude Desktop (`%APPDATA%\Claude\claude_desktop_config.json`) atau Cursor di Windows:

```json
{
  "mcpServers": {
    "antigravity-master": {
      "command": "cmd.exe",
      "args": ["/c", "npx -y github:ALDY711/MCP-AI-XYZ"]
    }
  }
}
```

#### Opsi 3: Menggunakan Git Bash atau WSL
Jika Anda membuka terminal **Git Bash** atau **WSL (Ubuntu di Windows)**, perintah curl Linux berjalan 100% identik:
```bash
curl -fsSL https://raw.githubusercontent.com/ALDY711/MCP-AI-XYZ/main/install-remote.sh | bash
```

---

## 📖 MUKADIMAH & DESKRIPSI PROYEK

**`MCP-AI-XYZ`** adalah peladen terpadu (*Unified Master MCP Gateway Server*) yang mengonvergensi seluruh perbendaharaan kustomisasi sistem **Antigravity** ke dalam satu gerbang tunggal berbasis standar terbuka **Model Context Protocol (MCP)**.

Alih-alih mengonfigurasi puluhan server terpisah dan membebani memori model AI dengan ratusan berkas teks di awal sesi, **MCP-AI-XYZ** memungkinkan klien AI (Claude Desktop, Cursor, Windsurf, Cline, Antigravity CLI/IDE) untuk terhubung ke **satu pintu masuk tunggal**. Di balik layar, peladen ini secara cerdas mengatur:

1. **214+ Skills Mendalam:** 22 Master Skills (Reverse Engineering APK, Frida Hooking, Web Cloning Compact UI, Bypass WAF/Cloudflare, OWASP Audit), 12 Builtin Skills Sistem, serta 181 Algoritma Kuantitatif & Trading Finansial.
2. **Kitab Aturan (Rules):** Konvensi hukum rekayasa tingkat tinggi (`AGENTS.md` / `GEMINI.md`) baik edisi aktif (23 KB) maupun naskah monolitik historis (112 KB).
3. **Perkakas Biner Terintegrasi (237 Tools):** Pintu gerbang langsung ke 230 perkakas biner **REA (Reverse Engineering Anything)**, data broker & kurs riil **Forex-Suite**, serta protokol **Sequential Thinking**.
4. **Alat Eksekusi Lokal Otomatis:** Skrip Python untuk bedah biner Android (debloat iklan, injeksi Network Security Config untuk MITM, align/repack) dan generator skrip Frida dinamis.
5. **Sinkronisasi Terpadu:** Terkoneksi ke repositori upstream [`ALDY711/apk-reverse-modifikasi`](https://github.com/ALDY711/apk-reverse-modifikasi) dengan kemampuan pembaruan *on-demand*.

---

## 🏛️ ARSITEKTUR SISTEM

```
+---------------------------------------------------------------------------------------+
|              KLIEN AI (Claude Desktop / Cursor / Windsurf / Cline / Antigravity)      |
+---------------------------------------------------------------------------------------+
                                           |
                                  Koneksi MCP Tunggal
                                           v
+---------------------------------------------------------------------------------------+
|                    ANTIGRAVITY MASTER MCP GATEWAY (mcp-server/server.js)              |
+---------------------------------------------------------------------------------------+
         |                        |                         |                    |
         v                        v                         v                    v
  [10 NATIVE TOOLS]       [37 RESOURCES]           [5 PROMPT RECIPES]     [CHILD GATEWAYS]
  - list_skills           - rules://active         - apk-reverse-surgery  - REA (230 tools)
  - get_skill_guide       - rules://monolith       - frida-hooking        - Forex-Suite
  - search_skills         - manifest://inventory   - compact-ui-cloning   - Sequential Thinking
  - get_rule              - skill://custom/*       - quant-ea-engineer
  - sync_from_github      - skill://builtin/*      - guardrail-soother
  - generate_frida
  - execute_apk_tool
```

---

## ⚡ FITUR-FITUR UTAMA

### 1. Sepuluh Perkakas Bawaan (Native Tools)
| Nama Perkakas | Keterangan & Kegunaan | Parameter Masukan |
| :--- | :--- | :--- |
| `list_antigravity_skills` | Menampilkan seluruh inventaris 214+ keahlian terdaftar. | `category`: `"all"`, `"custom"`, `"builtin"`, `"trading"` |
| `get_skill_guide` | Membuka pedoman teknis lengkap dan kode referensi suatu keahlian *on-demand*. | `skill_name`: `string` (misal: `"android-apk-smali-surgery"`) |
| `search_skills` | Mencari keahlian atau modul berdasarkan kata kunci masalah. | `query`: `string` (misal: `"ssl pinning"`, `"smali"`) |
| `get_rule` | Membaca pasal hukum rekayasa perangkat lunak dan arsitektur otonom. | `version`: `"active"` (23 KB) atau `"monolith"` (112 KB) |
| `sync_skills_from_github` | Menarik dan menyinkronkan pembaruan dari repositori GitHub. | `repo`: `string` (default: `"ALDY711/apk-reverse-modifikasi"`) |
| `generate_frida_script` | Menghasilkan skrip Frida instan (Universal SSL Unpinning, Flutter BoringSSL, Root Cloak). | `preset`: `"ssl_unpinning_universal"`, `"flutter_boringssl"`, `"root_cloak"`, `"crypto_snooper"` |
| `execute_apk_tool` | Menjalankan skrip Python automasi APK lokal (Debloat iklan, patch MITM NSC, align/repack). | `action`: `"debloat"`, `"mitm_patch"`, `"repack"`, `"crypto_inspect"`, `target_path`: `string` |
| `rea_execute` | Pintu gerbang eksekusi langsung ke 230 perkakas biner REA (*Reverse Engineering Anything*). | `command_args`: `string[]` |
| `forex_execute` | Mengambil data kurs valas riil, skor broker, dan perbandingan broker dari forex.mobile API. | `endpoint`: `"rates"`, `"brokers"`, `"broker"`, `"compare"` |
| `sequential_thinking` | Pelacak alur kontemplasi nalar mendalam bertingkat (*multi-step reasoning*). | `thought`, `thoughtNumber`, `totalThoughts`, `nextThoughtNeeded` |

---

### 2. Tiga Puluh Tujuh Sumber Daya Teks (Resources)
Model AI dapat membaca berkas pengetahuan tanpa membebani jendela percakapan:
* `rules://active` — Kitab Undang-Undang Rekayasa Otonom (`AGENTS.md` / `GEMINI.md` ringkas 23 KB).
* `rules://archive-monolith` — Naskah Asli Monolitik (112 KB) dengan referensi opcode Dalvik & katalog kegagalan.
* `manifest://inventory` — Inventaris berkas dan neraca data salinan resmi.
* `skill://custom/{skill_name}` — 22 Sumber daya mandiri untuk setiap Master Skill (Reverse, Frida, Web, Android).
* `skill://builtin/{skill_name}` — 12 Sumber daya mandiri untuk keahlian bawaan sistem Antigravity.

---

### 3. Lima Resep Alur Kerja Cerdas (Prompts)
* `apk-reverse-surgery` — Alur kerja bedah logika biner APK Dalvik, dekompilasi, dan re-signing.
* `frida-dynamic-hooking` — Prosedur penyadapan dan penembusan SSL Pinning runtime.
* `web-cloning-compact-ui` — Desain responsif ultra-kompak untuk Samsung Galaxy A55 (384px-412px) dan layar mini.
* `quant-ea-engineer` — Perancangan algoritma kuantitatif MQL5 & Smart Money Concepts.
* `safety-guardrail-soothing` — Protokol kamuflase aksara halus (*Anti-Filter Lexicon*) penjinak false-positives.

---

## 📦 STRUKTUR DIREKTORI REPOSITORI

```text
MCP-AI-XYZ/
├── README.md                      # Panduan utama ini
├── MANIFEST.md                    # Inventaris biner & audit komparatif
├── install-mcp.sh                 # Skrip sakti pemasang & penguji otomatis
├── .gitignore                     # Aturan pengecualian berkas git
│
├── mcp-server/                    # 🚀 JANTUNG PELADEN MCP (Node.js ESM)
│   ├── server.js                  # Entrypoint peladen JSON-RPC 2.0 Stdio
│   └── package.json               # Konfigurasi dependensi (@modelcontextprotocol/sdk)
│
├── rules/                         # 📜 KITAB ATURAN & HUKUM ARSITEKTUR
│   ├── AGENTS.md                  # Standar Terbuka Lintas-Agen
│   ├── GEMINI.md                  # Standar Antigravity/Gemini
│   ├── docs/rules.md              # Dokumentasi arsitektur rules
│   └── archive/                   # Edisi Monolitik Asli Kuno (112 KB)
│
├── skills/                        # 🗡️ PETI PUSAKA KEAHLIAN (214+ SKILLS)
│   ├── custom/                    # 22 Master Skills Khusus (.agents/skills)
│   ├── builtin/                   # 12 Skills Mesin Antigravity CLI
│   ├── trading-quantitative/      # 181 Skills Trading & Quant Finansial
│   └── docs/skills.md             # Panduan penyusunan skills
│
├── mcp/                           # 🔮 LUMBUNG SKEMA MCP ASLI
│   ├── mcp_config.json            # Konfigurasi referensi MCP
│   └── servers/                   # 237 Skema JSON Asli (REA, Forex, Thinking)
│
├── plugins/                       # 📦 TEMPLATE & BUNDEL SISTEM
├── hooks/                         # ⚡ PEMICU SIKLUS HIDUP (Pre/Post Tool Hooks)
└── configs/                       # ⚙️ KONFIGURASI LINGKUNGAN SISTEM
```

---

## ⚡ CARA MEMASANG TANPA GIT CLONE (ZERO-CLONE SETUP)

Paduka dan pengguna lain dapat menikmati peladen ini secara instan **tanpa perlu melakukan git clone secara manual**. Pilih salah satu dari dua cara sakti berikut:

### 🌟 Opsi A: Menggunakan `npx` Langsung di Klien AI (Paling Ringkas & Otomatis)
Tidak perlu mengunduh atau mengekstrak folder apa pun ke komputer Anda! Cukup daftarkan konfigurasi berikut ke Claude Desktop, Cursor, Windsurf, atau Antigravity Anda:

```json
{
  "mcpServers": {
    "antigravity-master": {
      "command": "npx",
      "args": ["-y", "github:ALDY711/MCP-AI-XYZ"]
    }
  }
}
```
*Ketika aplikasi AI Anda menyala, `npx` secara otomatis akan mengunduh repositori GitHub, memasang pustaka yang diperlukan di cache sementara, dan mengeksekusi peladen MCP secara mulus.*

---

### 🚀 Opsi B: Skrip Otomatis Satu Baris Terminal (One-Liner Curl)
Jika Anda ingin memasangnya ke direktori lokal tanpa menggunakan Git:
```bash
curl -fsSL https://raw.githubusercontent.com/ALDY711/MCP-AI-XYZ/main/install-remote.sh | bash
```
*Perintah ini akan mengunduh arsip repositori langsung dari GitHub, mengekstraknya ke `~/.mcp-ai-xyz`, dan otomatis menyuntikkannya ke sistem Antigravity.*

---

## 🚀 PANDUAN PEMASANGAN LENGKAP (DENGAN GIT CLONE)

### Prasyarat Sistem
* **Node.js**: Versi 18.0.0 atau lebih baru (`node -v`)
* **Python**: Versi 3.9 atau lebih baru (`python3 --version`)
* **Git**: Terpasang di sistem (`git --version`)

---

### Langkah 1: Kloning Repositori
Jalankan perintah berikut di terminal Anda:
```bash
git clone https://github.com/ALDY711/MCP-AI-XYZ.git
cd MCP-AI-XYZ
```

### Langkah 2: Jalankan Skrip Pemasang Otomatis
Skrip ini akan memeriksa dependensi, memasang `@modelcontextprotocol/sdk` jika belum ada, memverifikasi sintaks, dan menampilkan cuplikan JSON konfigurasi:
```bash
chmod +x install-mcp.sh
./install-mcp.sh
```

---

## 🛠️ PANDUAN INTEGRASI KE BERBAGAI PLATFORM AI

Gunakan konfigurasi di bawah ini sesuai dengan aplikasi klien AI yang Anda gunakan. Ganti `/path/to/MCP-AI-XYZ` dengan jalur absolut ke folder tempat Anda mengkloning repositori ini (misal: `/home/ubuntu/MCP-AI-XYZ` atau `C:/Users/Nama/MCP-AI-XYZ`).

### 1. Google Antigravity (CLI & IDE)
Jika Anda menggunakan **Antigravity CLI** atau **Antigravity IDE**:
* **Jalur Berkas Konfigurasi:** `~/.gemini/config/mcp_config.json`
* **Cara Paling Cepat:**
  ```bash
  ./install-mcp.sh --inject-gemini
  ```
* **Atau Edit Manual:**
  ```json
  {
    "mcpServers": {
      "antigravity-master": {
        "command": "node",
        "args": ["/path/to/MCP-AI-XYZ/mcp-server/server.js"],
        "disabled": false
      }
    }
  }
  ```

---

### 2. Claude Desktop
Buka berkas konfigurasi Claude Desktop di sistem operasi Anda:
* **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
* **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`
* **Linux:** `~/.config/Claude/claude_desktop_config.json`

Tambahkan entri berikut di dalam blok `"mcpServers"`:
```json
{
  "mcpServers": {
    "antigravity-master": {
      "command": "node",
      "args": [
        "/path/to/MCP-AI-XYZ/mcp-server/server.js"
      ]
    }
  }
}
```
*Mulai ulang (Restart) Claude Desktop. Ikon palu (tools) dan dokumen (resources) akan otomatis muncul.*

---

### 3. Cursor
1. Buka **Cursor Settings** (`Ctrl + ,` atau `Cmd + ,`).
2. Masuk ke tab **Features** ➡️ **MCP**.
3. Klik tombol **+ Add New MCP Server**.
4. Isi data berikut:
   * **Name:** `antigravity-master`
   * **Type:** `command`
   * **Command:** `node /path/to/MCP-AI-XYZ/mcp-server/server.js`
5. Klik **Save**. Cursor akan langsung mendeteksi seluruh perkakas secara instan.

---

### 4. Windsurf
* **Jalur Berkas Konfigurasi:** `~/.codeium/windsurf/mcp_config.json`
Tambahkan konfigurasi berikut:
```json
{
  "mcpServers": {
    "antigravity-master": {
      "command": "node",
      "args": ["/path/to/MCP-AI-XYZ/mcp-server/server.js"]
    }
  }
}
```

---

### 5. Cline / Roo Code (VS Code Extension)
1. Buka ekstensi **Cline** di bilah samping VS Code.
2. Klik ikon gerigi **Settings** di pojok kanan atas jendela Cline.
3. Masuk ke tab **MCP Servers**.
4. Tambahkan konfigurasi JSON berikut atau sunting berkas `cline_mcp_settings.json`:
```json
{
  "mcpServers": {
    "antigravity-master": {
      "command": "node",
      "args": ["/path/to/MCP-AI-XYZ/mcp-server/server.js"],
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

---

### 6. Zed Editor
Buka pengaturan Zed (`~/.config/zed/settings.json`), lalu tambahkan:
```json
{
  "experimental.model_context_protocol": {
    "servers": {
      "antigravity-master": {
        "command": "node",
        "args": ["/path/to/MCP-AI-XYZ/mcp-server/server.js"]
      }
    }
  }
}
```

---

## 🧪 CARA VERIFIKASI & PENGUJIAN

Untuk memastikan peladen MCP merespons protokol standar dengan sempurna tanpa perlu membuka aplikasi klien AI, jalankan uji Stdio JSON-RPC:

```bash
node -e '
import { spawn } from "node:child_process";
const child = spawn("node", ["mcp-server/server.js"]);
child.stdout.once("data", (d) => {
  console.log("Respon Initialize Berhasil:\n", d.toString());
  child.kill();
});
child.stdin.write(JSON.stringify({
  jsonrpc: "2.0",
  id: 1,
  method: "initialize",
  params: { protocolVersion: "2024-11-05", capabilities: {}, clientInfo: { name: "test", version: "1.0" } }
}) + "\n");
'
```

---

## 🔄 CARA MEMPERBARUI (*UPDATING*)

1. **Memperbarui Repositori MCP-AI-XYZ:**
   ```bash
   cd MCP-AI-XYZ
   git pull origin main
   ```
2. **Menyinkronkan Skill Baru dari GitHub Upstream:**
   Cukup perintahkan klien AI Anda (atau panggil perkakas MCP):
   > *"Tolong jalankan tool `sync_skills_from_github` untuk memperbarui skills terbaru."*

---

## 📄 LISENSI & HAK CIPTA

Proyek ini dirilis di bawah lisensi terbuka **[MIT License](LICENSE)**. 
Ditempa dan dipersembahkan oleh **[ALDY711](https://github.com/ALDY711)** untuk kemajuan ekosistem agen cerdas dan riset keamanan siber dunia.
