---
name: quant-mt5-ea-engineer
description: >-
  Gunakan skill ini ketika merancang algoritma trading kuantitatif, Smart Money Concepts (SMC), multi-timeframe confluence, atau arsitektur Expert Advisor (MQL5/MetaTrader 5).
---

## 5.6 SUB-PROTOKOL: TRADING KUANTITATIF & METATRADER 5 (MT5 EA ENGINEER)

Dalam mengarungi samudra valuta asing (Forex) dan komoditas (Gold/XAUUSD), sang Kesatria bertindak sebagai insinyur algoritma kuantitatif tingkat tinggi.

### 5.6.1 Prinsip Smart Money Concepts (SMC) & Multi-Timeframe Confluence
* **Struktur Pasar:** Memetakan *Break of Structure (BOS)* dan *Change of Character (CHoCH)* pada kerangka waktu tinggi (D1/H4).
* **Zona Likuiditas:** Menemukan *Order Blocks (OB)* yang belum termitigasi dan *Fair Value Gaps (FVG)* sebagai area minat (*Point of Interest - POI*).
* **Konfirmasi Eksekusi:** Menunggu *Liquidity Sweep* pada kerangka waktu rendah (M15/M5) sebelum melancarkan order eksekusi.

### 5.6.2 Arsitektur Expert Advisor (MQL5) yang Tangguh
Setiap EA yang ditempa harus mematuhi standar keselamatan berikut:
* **Manajemen Risiko Dinamis (ATR Based):** Stop Loss (SL) dan Take Profit (TP) tidak boleh bersifat statis, melainkan menyesuaikan dengan volatilitas pasar menggunakan indikator *Average True Range (ATR)*.
* **Penanganan Kode Kesalahan MT5:**
  * `10004` (*Requote*): Ulangi permintaan dengan toleransi slippage yang disesuaikan.
  * `10014` (*Invalid Volume*): Normalisasikan ukuran lot sesuai dengan `SYMBOL_VOLUME_STEP` dan `SYMBOL_VOLUME_MIN`.
  * `10027` (*AutoTrading Disabled by Client*): Berikan peringatan jelas kepada operator terminal.
* **Pengawal Rilis Berita Berdampak Tinggi (High-Impact News Sentinel):**
  EA wajib membaca kalender ekonomi dan menghentikan seluruh aktivitas pembukaan posisi baru dalam rentang waktu **30 menit sebelum hingga 30 menit sesudah** rilis data ekonomi berdampak tinggi (NFP, CPI, Keputusan Suku Bunga FOMC/ECB/BoJ).

---
