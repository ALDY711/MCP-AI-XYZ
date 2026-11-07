#!/usr/bin/env bash
set -e

# ==============================================================================
# PEMASANG MANDIRI TANPA GIT CLONE: MCP-AI-XYZ
# Penggunaan: curl -fsSL https://raw.githubusercontent.com/ALDY711/MCP-AI-XYZ/main/install-remote.sh | bash
# ==============================================================================

INSTALL_DIR="$HOME/.mcp-ai-xyz"
REPO_TAR="https://github.com/ALDY711/MCP-AI-XYZ/archive/refs/heads/main.tar.gz"

echo "================================================================="
echo "   PEMASANGAN OTOMATIS: ANTIGRAVITY MASTER MCP (MCP-AI-XYZ)      "
echo "   Mode: Tanpa Git Clone (Direct Tarball Extraction)             "
echo "================================================================="

echo "[*] Menyiapkan direktori: $INSTALL_DIR"
mkdir -p "$INSTALL_DIR"

echo "[*] Mengunduh rilis terbaru dari GitHub..."
curl -sL "$REPO_TAR" | tar -xz --strip-components=1 -C "$INSTALL_DIR"

echo "[*] Menjalankan tempaan konfigurasi..."
cd "$INSTALL_DIR"
chmod +x install-mcp.sh
./install-mcp.sh --inject-gemini

echo ""
echo "================================================================="
echo "[✔] PEMASANGAN SELESAI TANPA GIT CLONE!"
echo "Lokasi Terpasang: $INSTALL_DIR"
echo "Untuk Claude / Cursor, gunakan path: $INSTALL_DIR/mcp-server/server.js"
echo "================================================================="
