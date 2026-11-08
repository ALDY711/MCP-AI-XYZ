# ==============================================================================
# PEMASANG MANDIRI UNTUK WINDOWS TANPA GIT CLONE: MCP-AI-XYZ
# Penggunaan di PowerShell:
# irm https://raw.githubusercontent.com/ALDY711/MCP-AI-XYZ/main/install-windows.ps1 | iex
# ==============================================================================

$ErrorActionPreference = "Stop"

Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host "   PEMASANGAN OTOMATIS: ANTIGRAVITY MASTER MCP (MCP-AI-XYZ)      " -ForegroundColor Yellow
Write-Host "   Platform: Microsoft Windows (PowerShell Native)               " -ForegroundColor Green
Write-Host "=================================================================" -ForegroundColor Cyan

$InstallDir = "$env:USERPROFILE\.mcp-ai-xyz"
$ZipUrl = "https://github.com/ALDY711/MCP-AI-XYZ/archive/refs/heads/main.zip"
$ZipFile = "$env:TEMP\mcp-ai-xyz.zip"
$ExtractTemp = "$env:TEMP\mcp-extract-tmp"

Write-Host "[*] 1. Mengunduh arsip rilis dari GitHub..." -ForegroundColor Cyan
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
Invoke-WebRequest -Uri $ZipUrl -OutFile $ZipFile -UseBasicParsing

Write-Host "[*] 2. Mengekstrak berkas ke: $InstallDir..." -ForegroundColor Cyan
if (Test-Path $ExtractTemp) { Remove-Item -Recurse -Force $ExtractTemp }
Expand-Archive -Path $ZipFile -DestinationPath $ExtractTemp -Force

if (Test-Path $InstallDir) {
    Write-Host "[*] Memperbarui direktori yang sudah ada..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force $InstallDir
}

Move-Item -Path "$ExtractTemp\MCP-AI-XYZ-main" -Destination $InstallDir -Force
Remove-Item -Recurse -Force $ExtractTemp, $ZipFile

Write-Host "[*] 3. Memasang dependensi @modelcontextprotocol/sdk..." -ForegroundColor Cyan
Set-Location "$InstallDir\mcp-server"
Start-Process -FilePath "cmd.exe" -ArgumentList "/c npm install --silent" -Wait -NoNewWindow

$ServerJsPath = "$InstallDir\mcp-server\server.js" -replace '\\', '/'

Write-Host ""
Write-Host "=================================================================" -ForegroundColor Green
Write-Host "[✔] PEMASANGAN SELESAI DI WINDOWS TANPA GIT CLONE!" -ForegroundColor Green
Write-Host "Lokasi Terpasang: $InstallDir" -ForegroundColor White
Write-Host "-----------------------------------------------------------------" -ForegroundColor Cyan
Write-Host "KONFIGURASI RESMI UNTUK KLIEN AI WINDOWS (Claude Desktop / Cursor):" -ForegroundColor Yellow
Write-Host @"
{
  "mcpServers": {
    "antigravity-master": {
      "command": "node",
      "args": ["$ServerJsPath"],
      "disabled": false
    }
  }
}
"@ -ForegroundColor White
Write-Host "-----------------------------------------------------------------" -ForegroundColor Cyan
Write-Host "Lokasi berkas konfigurasi Claude Desktop di Windows:" -ForegroundColor Gray
Write-Host "%APPDATA%\Claude\claude_desktop_config.json" -ForegroundColor Gray
Write-Host "=================================================================" -ForegroundColor Green
