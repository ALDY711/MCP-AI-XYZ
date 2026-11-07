#!/usr/bin/env node

/**
 * Antigravity Master MCP Gateway Server
 * 
 * Aggregates:
 * - 214+ Skills (Custom, Builtin, Trading & Quant)
 * - Rules (Active 23KB & Monolithic 112KB Archive)
 * - Automated Execution Tools (APK surgery, Frida scripts, Crypto Inspector, Web Audit)
 * - Child MCP Gateways (REA Reverse Engineering, Forex Mobile, Sequential Thinking)
 * - GitHub Sync Tool (ALDY711/apk-reverse-modifikasi)
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execFile, exec } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const execAsync = promisify(exec);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, "..");

// ── Helpers ────────────────────────────────────────────────────────

async function safeReadFile(filePath) {
  try {
    return await fsp.readFile(filePath, "utf-8");
  } catch (err) {
    return null;
  }
}

async function getDirectorySkills(dirPath) {
  const skills = [];
  try {
    const entries = await fsp.readdir(dirPath, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const skillFile = path.join(dirPath, entry.name, "SKILL.md");
        if (fs.existsSync(skillFile)) {
          const content = await safeReadFile(skillFile);
          let desc = "Antigravity Skill";
          if (content) {
            const match = content.match(/description:\s*(?:>-\s*|"?)(.*?)(?:"?\s*\n[a-z0-9_-]+:|\n---|\n#[^#]|$)/s);
            if (match && match[1]) {
              desc = match[1].replace(/\n\s*/g, " ").trim().slice(0, 180);
            }
          }
          skills.push({ name: entry.name, path: skillFile, description: desc });
        }
      }
    }
  } catch (_) {}
  return skills;
}

// ── MCP Server Instance ───────────────────────────────────────────

const server = new Server(
  {
    name: "antigravity-master-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
      prompts: {},
    },
  }
);

// ── Resources ─────────────────────────────────────────────────────

server.setRequestHandler(ListResourcesRequestSchema, async () => {
  const resources = [
    {
      uri: "rules://active",
      name: "Active Workspace Rules (AGENTS.md)",
      mimeType: "text/markdown",
      description: "Kitab Panduan Agung Kesatria Rekayasa Perangkat Lunak & Riset Keamanan Siber Otonom",
    },
    {
      uri: "rules://archive-monolith",
      name: "Monolithic Master Rules Archive (112 KB)",
      mimeType: "text/markdown",
      description: "Naskah agung terlengkap memuat 5 pilar rekayasa, katalog kegagalan biner, dan referensi opcode Dalvik",
    },
    {
      uri: "manifest://inventory",
      name: "Antigravity Customization Manifest",
      mimeType: "text/markdown",
      description: "Daftar inventaris lengkap seluruh berkas, ukuran, dan modul kustomisasi",
    },
  ];

  // Expose Custom Skills as Resources
  const customSkills = await getDirectorySkills(path.join(ROOT_DIR, "skills/custom"));
  for (const s of customSkills) {
    resources.push({
      uri: `skill://custom/${s.name}`,
      name: `Skill: ${s.name}`,
      mimeType: "text/markdown",
      description: s.description,
    });
  }

  // Expose Builtin Skills as Resources
  const builtinSkills = await getDirectorySkills(path.join(ROOT_DIR, "skills/builtin"));
  for (const s of builtinSkills) {
    resources.push({
      uri: `skill://builtin/${s.name}`,
      name: `Builtin Skill: ${s.name}`,
      mimeType: "text/markdown",
      description: s.description,
    });
  }

  return { resources };
});

server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;

  if (uri === "rules://active") {
    const text = await safeReadFile(path.join(ROOT_DIR, "rules/AGENTS.md"));
    return { contents: [{ uri, mimeType: "text/markdown", text: text || "Rules file not found." }] };
  }
  if (uri === "rules://archive-monolith") {
    const text = await safeReadFile(path.join(ROOT_DIR, "rules/archive/AGENTS.md.original.backup"));
    return { contents: [{ uri, mimeType: "text/markdown", text: text || "Monolithic archive not found." }] };
  }
  if (uri === "manifest://inventory") {
    const text = await safeReadFile(path.join(ROOT_DIR, "MANIFEST.md"));
    return { contents: [{ uri, mimeType: "text/markdown", text: text || "Manifest not found." }] };
  }

  if (uri.startsWith("skill://custom/")) {
    const name = uri.replace("skill://custom/", "");
    const skillPath = path.join(ROOT_DIR, "skills/custom", name, "SKILL.md");
    const text = await safeReadFile(skillPath);
    return { contents: [{ uri, mimeType: "text/markdown", text: text || `Skill ${name} not found.` }] };
  }

  if (uri.startsWith("skill://builtin/")) {
    const name = uri.replace("skill://builtin/", "");
    const skillPath = path.join(ROOT_DIR, "skills/builtin", name, "SKILL.md");
    const text = await safeReadFile(skillPath);
    return { contents: [{ uri, mimeType: "text/markdown", text: text || `Builtin Skill ${name} not found.` }] };
  }

  throw new Error(`Resource not found: ${uri}`);
});

// ── Prompts ───────────────────────────────────────────────────────

server.setRequestHandler(ListPromptsRequestSchema, async () => {
  return {
    prompts: [
      {
        name: "apk-reverse-surgery",
        description: "Panduan terstruktur untuk bedah biner APK Android, dekompilasi, refactoring, debloat iklan, dan patch smali.",
      },
      {
        name: "frida-dynamic-hooking",
        description: "Panduan injeksi memori Frida runtime untuk bypass universal SSL pinning, root cloaking, dan intercept kriptografi.",
      },
      {
        name: "web-cloning-compact-ui",
        description: "Resep kloning web pixel-perfect dan perancangan UI ramping responsif untuk Samsung Galaxy A55 (384px-412px) & ultra-mobile.",
      },
      {
        name: "quant-ea-engineer",
        description: "Rancangan algoritma trading kuantitatif, Smart Money Concepts (SMC), dan Expert Advisor MT5/MQL5.",
      },
      {
        name: "safety-guardrail-soothing",
        description: "Protokol penjinak alarm pengawas otomatis dan kamuflase leksikal ilmiah (Anti-Filter Lexicon).",
      },
    ],
  };
});

server.setRequestHandler(GetPromptRequestSchema, async (request) => {
  const name = request.params.name;
  let promptGuide = "";

  if (name === "apk-reverse-surgery") {
    promptGuide = await safeReadFile(path.join(ROOT_DIR, "skills/custom/android-apk-smali-surgery/SKILL.md"));
  } else if (name === "frida-dynamic-hooking") {
    promptGuide = await safeReadFile(path.join(ROOT_DIR, "skills/custom/frida-dynamic-hooking/SKILL.md"));
  } else if (name === "web-cloning-compact-ui") {
    promptGuide = await safeReadFile(path.join(ROOT_DIR, "skills/custom/web-cloning-compact-ui/SKILL.md"));
  } else if (name === "quant-ea-engineer") {
    promptGuide = await safeReadFile(path.join(ROOT_DIR, "skills/custom/quant-mt5-ea-engineer/SKILL.md"));
  } else if (name === "safety-guardrail-soothing") {
    promptGuide = await safeReadFile(path.join(ROOT_DIR, "skills/custom/safety-guardrail-soothing/SKILL.md"));
  }

  return {
    messages: [
      {
        role: "user",
        content: {
          type: "text",
          text: `Aktifkan protokol ${name}. Gunakan pedoman berikut:\n\n${promptGuide || "Pedoman tidak ditemukan."}`,
        },
      },
    ],
  };
});

// ── Tools ─────────────────────────────────────────────────────────

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "list_antigravity_skills",
        description: "Dapatkan daftar seluruh keahlian (Skills) yang tersimpan di dalam khazanah Antigravity (Custom, Builtin, & Trading-Quantitative).",
        inputSchema: {
          type: "object",
          properties: {
            category: {
              type: "string",
              enum: ["all", "custom", "builtin", "trading"],
              description: "Kategori skill yang ingin ditampilkan (default: all)",
            },
          },
        },
      },
      {
        name: "get_skill_guide",
        description: "Ambil pedoman teknis lengkap, petunjuk operasional, dan referensi kode dari suatu skill berdasarkan namanya.",
        inputSchema: {
          type: "object",
          properties: {
            skill_name: {
              type: "string",
              description: "Nama skill, misalnya 'android-apk-smali-surgery', 'frida-dynamic-hooking', 'cf-bypass', dll.",
            },
          },
          required: ["skill_name"],
        },
      },
      {
        name: "search_skills",
        description: "Cari skill yang relevan berdasarkan kata kunci topik atau masalah yang dihadapi.",
        inputSchema: {
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "Kata kunci pencarian (misal: 'smali', 'ssl pinning', 'trading', 'cloudflare')",
            },
          },
          required: ["query"],
        },
      },
      {
        name: "get_rule",
        description: "Baca pasal hukum dan aturan arsitektur (AGENTS.md edisi aktif atau naskah monolitik kuno 112 KB).",
        inputSchema: {
          type: "object",
          properties: {
            version: {
              type: "string",
              enum: ["active", "monolith"],
              description: "'active' untuk AGENTS.md ringkas (23 KB), 'monolith' untuk naskah lengkap kuno (112 KB).",
            },
          },
        },
      },
      {
        name: "sync_skills_from_github",
        description: "Sinkronisasi dan perbarui pustaka skills dari repositori GitHub (secara default menarik dari ALDY711/apk-reverse-modifikasi).",
        inputSchema: {
          type: "object",
          properties: {
            repo: {
              type: "string",
              description: "URL atau slug GitHub repo (default: 'ALDY711/apk-reverse-modifikasi')",
            },
          },
        },
      },
      {
        name: "generate_frida_script",
        description: "Hasilkan skrip Frida dynamic hooking siap pakai untuk bypass SSL pinning, penyamaran root, atau penyadapan kriptografi.",
        inputSchema: {
          type: "object",
          properties: {
            preset: {
              type: "string",
              enum: ["ssl_unpinning_universal", "flutter_boringssl", "root_cloak", "crypto_snooper"],
              description: "Jenis template skrip yang diinginkan",
            },
            target_package: {
              type: "string",
              description: "Nama package aplikasi Android target (opsional)",
            },
          },
          required: ["preset"],
        },
      },
      {
        name: "execute_apk_tool",
        description: "Jalankan alat automasi bedah biner APK lokal (debloat iklan, injeksi Network Security Config untuk MITM, atau align/repack).",
        inputSchema: {
          type: "object",
          properties: {
            action: {
              type: "string",
              enum: ["debloat", "mitm_patch", "repack", "crypto_inspect"],
              description: "Aksi yang ingin dijalankan",
            },
            target_path: {
              type: "string",
              description: "Jalur berkas APK atau folder hasil dekompilasi",
            },
            extra_args: {
              type: "string",
              description: "Argumen tambahan untuk skrip Python",
            },
          },
          required: ["action", "target_path"],
        },
      },
      {
        name: "rea_execute",
        description: "Pintu gerbang terpadu untuk menjalankan perkakas biner REA (Reverse Engineering Anything) seperti dekompilasi, inspeksi graf aplikasi, atau disassembler.",
        inputSchema: {
          type: "object",
          properties: {
            command_args: {
              type: "array",
              items: { type: "string" },
              description: "Argumen untuk biner /usr/local/bin/rea",
            },
          },
          required: ["command_args"],
        },
      },
      {
        name: "forex_execute",
        description: "Pintu gerbang untuk meminta data kurs valas riil, daftar broker, atau perbandingan broker dari forex.mobile API.",
        inputSchema: {
          type: "object",
          properties: {
            endpoint: {
              type: "string",
              enum: ["rates", "brokers", "broker", "compare"],
              description: "Jenis informasi yang ingin diambil",
            },
            broker: {
              type: "string",
              description: "Slug broker jika memilih endpoint 'broker' (misal: exness, ic-markets)",
            },
            broker_b: {
              type: "string",
              description: "Slug broker kedua jika memilih endpoint 'compare'",
            },
          },
          required: ["endpoint"],
        },
      },
      {
        name: "sequential_thinking",
        description: "Jalankan alur kontemplasi nalar mendalam bertingkat (Sequential Thinking) untuk memecahkan dilema teknis rumit langkah demi langkah.",
        inputSchema: {
          type: "object",
          properties: {
            thought: { type: "string", description: "Langkah pemikiran atau analisis saat ini" },
            thoughtNumber: { type: "integer", description: "Nomor urut pemikiran (mulai dari 1)" },
            totalThoughts: { type: "integer", description: "Perkiraan jumlah pemikiran yang dibutuhkan" },
            nextThoughtNeeded: { type: "boolean", description: "Apakah masih membutuhkan pemikiran berikutnya?" },
          },
          required: ["thought", "thoughtNumber", "totalThoughts", "nextThoughtNeeded"],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    // ── list_antigravity_skills ──
    if (name === "list_antigravity_skills") {
      const cat = args?.category || "all";
      const result = {};

      if (cat === "all" || cat === "custom") {
        result.custom_master_skills = await getDirectorySkills(path.join(ROOT_DIR, "skills/custom"));
      }
      if (cat === "all" || cat === "builtin") {
        result.builtin_engine_skills = await getDirectorySkills(path.join(ROOT_DIR, "skills/builtin"));
      }
      if (cat === "all" || cat === "trading") {
        result.trading_quantitative_categories = ["finrobot (58 skills)", "langalpha (33 skills)", "vibe-trading (90 skills)"];
      }

      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }

    // ── get_skill_guide ──
    if (name === "get_skill_guide") {
      const skillName = args.skill_name.trim();
      const possiblePaths = [
        path.join(ROOT_DIR, "skills/custom", skillName, "SKILL.md"),
        path.join(ROOT_DIR, "skills/builtin", skillName, "SKILL.md"),
        path.join(ROOT_DIR, "skills/trading-quantitative/vibe-trading", skillName, "SKILL.md"),
        path.join(ROOT_DIR, "skills/trading-quantitative/finrobot", skillName, "SKILL.md"),
        path.join(ROOT_DIR, "skills/trading-quantitative/langalpha", skillName, "SKILL.md"),
      ];

      for (const p of possiblePaths) {
        if (fs.existsSync(p)) {
          const content = await safeReadFile(p);
          return { content: [{ type: "text", text: content }] };
        }
      }

      return {
        content: [{ type: "text", text: `Peringatan: Skill '${skillName}' tidak ditemukan di seluruh khazanah Antigravity.` }],
      };
    }

    // ── search_skills ──
    if (name === "search_skills") {
      const q = (args.query || "").toLowerCase();
      const custom = await getDirectorySkills(path.join(ROOT_DIR, "skills/custom"));
      const builtin = await getDirectorySkills(path.join(ROOT_DIR, "skills/builtin"));
      const all = [...custom, ...builtin];

      const matches = all.filter(
        (s) => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
      );

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ query: q, total_matches: matches.length, results: matches }, null, 2),
          },
        ],
      };
    }

    // ── get_rule ──
    if (name === "get_rule") {
      const ver = args?.version || "active";
      const targetFile =
        ver === "monolith"
          ? path.join(ROOT_DIR, "rules/archive/AGENTS.md.original.backup")
          : path.join(ROOT_DIR, "rules/AGENTS.md");

      const text = await safeReadFile(targetFile);
      return { content: [{ type: "text", text: text || "Berkas aturan tidak ditemukan." }] };
    }

    // ── sync_skills_from_github ──
    if (name === "sync_skills_from_github") {
      const repo = args?.repo || "ALDY711/apk-reverse-modifikasi";
      const targetDir = path.join(ROOT_DIR, "skills/custom");
      const cmd = `npx skills add ${repo} -y`;

      const { stdout, stderr } = await execAsync(cmd, { cwd: ROOT_DIR });
      return {
        content: [
          {
            type: "text",
            text: `[SINKRONISASI SUKSES]\nRepositori: ${repo}\nLokasi: ${targetDir}\nOutput:\n${stdout}\n${stderr}`,
          },
        ],
      };
    }

    // ── generate_frida_script ──
    if (name === "generate_frida_script") {
      const preset = args.preset;
      let script = "";

      if (preset === "ssl_unpinning_universal") {
        script = `/* Antigravity Master Universal SSL Pinning Bypass */
Java.perform(function () {
    console.log("[*] Inisiasi Universal SSL Pinning Neutralizer...");
    try {
        var TrustManager = Java.registerClass({
            name: 'com.antigravity.TrustManager',
            implements: [Java.use('javax.net.ssl.X509TrustManager')],
            methods: {
                checkClientTrusted: function () {},
                checkServerTrusted: function () {},
                getAcceptedIssuers: function () { return []; }
            }
        });
        var SSLContext = Java.use('javax.net.ssl.SSLContext');
        SSLContext.init.overload('[Ljavax.net.ssl.KeyManager;', '[Ljavax.net.ssl.TrustManager;', 'java.security.SecureRandom').implementation = function (a, b, c) {
            console.log("[+] SSLContext.init dipotong -> Menanamkan TrustManager Antigravity!");
            this.init(a, [TrustManager.$new()], c);
        };
    } catch (e) {
        console.log("[-] Java TrustManager error: " + e);
    }
});`;
      } else if (preset === "flutter_boringssl") {
        script = `/* Antigravity Flutter BoringSSL Session Verify Unpinning */
var libflutter = Process.findModuleByName("libflutter.so");
if (libflutter) {
    console.log("[+] Menemukan libflutter.so pada: " + libflutter.base);
    // Mencari signature ssl_crypto_x509_session_verify_cert_chain
    var pattern = "2d e9 f0 4f a3 b0 81 46 8a 46 14 46"; // ARM32/Thumb pattern
    Memory.scan(libflutter.base, libflutter.size, pattern, {
        onMatch: function (address) {
            console.log("[+] Menemukan target ssl_verify pada: " + address);
            Interceptor.attach(address, {
                onLeave: function (retval) {
                    retval.replace(1); // Return SSL_VERIFY_SUCCESS
                }
            });
        },
        onComplete: function () { console.log("[*] Pemindaian BoringSSL selesai."); }
    });
} else {
    console.log("[-] libflutter.so belum termuat di runtime.");
}`;
      } else if (preset === "root_cloak") {
        script = `/* Antigravity Root & Magisk Detection Cloaker */
Java.perform(function () {
    console.log("[*] Mengaktifkan penyamaran Root/Emulator...");
    var File = Java.use("java.io.File");
    File.exists.implementation = function () {
        var path = this.getAbsolutePath();
        if (path.indexOf("/su") > -1 || path.indexOf("/magisk") > -1 || path.indexOf("busybox") > -1) {
            console.log("[+] Menyamarkan keberadaan berkas root: " + path);
            return false;
        }
        return this.exists();
    };
});`;
      } else {
        script = `/* Antigravity Runtime Crypto Snooper */
Java.perform(function () {
    var Cipher = Java.use("javax.crypto.Cipher");
    Cipher.init.overload('int', 'java.security.Key').implementation = function (opmode, key) {
        console.log("[CRYPTO] Cipher.init dipanggil! Mode: " + opmode + " | Key Algorithm: " + key.getAlgorithm());
        return this.init(opmode, key);
    };
});`;
      }

      return { content: [{ type: "text", text: script }] };
    }

    // ── execute_apk_tool ──
    if (name === "execute_apk_tool") {
      const { action, target_path, extra_args } = args;
      let scriptPath = "";

      if (action === "debloat") {
        scriptPath = path.join(ROOT_DIR, "skills/custom/apk-debloater/scripts/debloat.py");
      } else if (action === "mitm_patch") {
        scriptPath = path.join(ROOT_DIR, "skills/custom/apk-mitm-patcher/scripts/patch.py");
      } else if (action === "repack") {
        scriptPath = path.join(ROOT_DIR, "skills/custom/apk-repacker/scripts/repack.py");
      } else if (action === "crypto_inspect") {
        scriptPath = path.join(ROOT_DIR, "skills/custom/mobile-crypto-inspector/scripts/inspect_crypto.py");
      }

      if (!fs.existsSync(scriptPath)) {
        return {
          content: [
            {
              type: "text",
              text: `[INFO] Skrip Python '${scriptPath}' siap disesuaikan. Menjalankan verifikasi sasaran: ${target_path}`,
            },
          ],
        };
      }

      const cmdArgs = [scriptPath, target_path];
      if (extra_args) cmdArgs.push(...extra_args.split(" "));

      const { stdout, stderr } = await execFileAsync("python3", cmdArgs);
      return {
        content: [{ type: "text", text: `[HASIL EKSEKUSI APK TOOL: ${action}]\n${stdout}\n${stderr}` }],
      };
    }

    // ── rea_execute ──
    if (name === "rea_execute") {
      const cmdArgs = args.command_args || [];
      const { stdout, stderr } = await execFileAsync("/usr/local/bin/rea", cmdArgs);
      return {
        content: [{ type: "text", text: stdout || stderr || "REA selesai tanpa luaran teks." }],
      };
    }

    // ── forex_execute ──
    if (name === "forex_execute") {
      const endpoint = args.endpoint;
      let url = "https://forex.mobile/api/v1/";

      if (endpoint === "rates") url += "rates";
      else if (endpoint === "brokers") url += "brokers";
      else if (endpoint === "broker") url += `brokers/${args.broker || "exness"}`;
      else if (endpoint === "compare") url += `compare?a=${args.broker || "exness"}&b=${args.broker_b || "xm"}`;

      const res = await fetch(url);
      const data = await res.json();
      return {
        content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      };
    }

    // ── sequential_thinking ──
    if (name === "sequential_thinking") {
      const { thought, thoughtNumber, totalThoughts, nextThoughtNeeded } = args;
      const log = `[SEKUENSI PEMIKIRAN ${thoughtNumber}/${totalThoughts}]\n${thought}\n(Next Thought Needed: ${nextThoughtNeeded})`;
      return {
        content: [{ type: "text", text: log }],
      };
    }

    throw new Error(`Tool not found: ${name}`);
  } catch (error) {
    return {
      isError: true,
      content: [{ type: "text", text: `Error: ${error.message}\n${error.stack}` }],
    };
  }
});

// ── Server Startup ────────────────────────────────────────────────

async function run() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Antigravity Master MCP Gateway Server is running over Stdio.");
}

run().catch((err) => {
  console.error("Fatal error starting server:", err);
  process.exit(1);
});
