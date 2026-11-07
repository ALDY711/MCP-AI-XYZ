#!/usr/bin/env bash
set -e

# ==============================================================================
# PEMASANG RESMI ANTIGRAVITY MASTER MCP GATEWAY (MCP-AI-XYZ)
# ==============================================================================
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SERVER_DIR="$SCRIPT_DIR/mcp-server"
SERVER_JS="$SERVER_DIR/server.js"

echo "================================================================="
echo "   TEMPAAN RESMI: ANTIGRAVITY MASTER MCP GATEWAY SERVER         "
echo "   Repository: ALDY711/MCP-AI-XYZ                               "
echo "================================================================="
echo "[*] Jalur Server: $SERVER_JS"

# 1. Pastikan dependensi SDK terpasang di mcp-server
if [ ! -d "$SERVER_DIR/node_modules/@modelcontextprotocol/sdk" ]; then
    echo "[*] Memasang dependensi @modelcontextprotocol/sdk..."
    (cd "$SERVER_DIR" && npm install --silent)
    echo "[+] Dependensi SDK berhasil dipasang."
fi

# 2. Pastikan izin eksekusi
chmod +x "$SERVER_JS"
echo "[+] Izin eksekusi server.js terverifikasi."

# 3. Pengujian Mandiri Singkat
echo "[*] Menjalankan verifikasi mandiri..."
node -c "$SERVER_JS"
echo "[+] Sintaks Node.js 100% valid dan siap tempur."

# 4. Snippet Konfigurasi Klien
CONFIG_SNIPPET=$(cat <<EOF
{
  "mcpServers": {
    "antigravity-master": {
      "command": "node",
      "args": ["$SERVER_JS"],
      "disabled": false
    }
  }
}
EOF
)

echo ""
echo "-----------------------------------------------------------------"
echo "KONFIGURASI RESMI UNTUK KLIEN AI PADUKA (Claude, Cursor, Cline):"
echo "-----------------------------------------------------------------"
echo "$CONFIG_SNIPPET"
echo "-----------------------------------------------------------------"
echo ""

# 5. Opsi Penyuntikan Otomatis ke ~/.gemini/config/mcp_config.json
if [ "$1" == "--inject-gemini" ] || [ "$1" == "-i" ]; then
    GEMINI_MCP_CFG="$HOME/.gemini/config/mcp_config.json"
    if [ -f "$GEMINI_MCP_CFG" ]; then
        echo "[*] Menyuntikkan antigravity-master ke $GEMINI_MCP_CFG..."
        node -e "
        const fs = require('fs');
        const cfg = JSON.parse(fs.readFileSync('$GEMINI_MCP_CFG', 'utf-8'));
        cfg.mcpServers = cfg.mcpServers || {};
        cfg.mcpServers['antigravity-master'] = {
            command: 'node',
            args: ['$SERVER_JS'],
            disabled: false
        };
        fs.writeFileSync('$GEMINI_MCP_CFG', JSON.stringify(cfg, null, 2));
        console.log('[+] Berhasil disuntikkan ke konfigurasi Antigravity / Gemini!');
        "
    fi
fi

echo "[✔] TEMPAAN SELESAI DENGAN GILANG-GEMILANG!"
