# SobatAbsen — Landing Page (Website Utama)

> Dokumen ini hanya berisi **konteks produk** dan **daftar apa yang harus dibangun** di landing page.
> Tampilan visual mengikuti `design.md`. **Frontend saja**: semua yang berkaitan dengan server (pembayaran, akun, email) cukup berupa tampilan dan data mock.

---

## 1. Apa Itu SobatAbsen

SobatAbsen adalah **aplikasi absensi digital universal** yang bisa dipakai oleh berbagai jenis lembaga: sekolah, yayasan, pabrik, kantor, dan penyelenggara acara (event organizer).

**Cara kerja absen (dari sisi anggota):**
1. Anggota login dan membuka halaman absen.
2. Mengizinkan akses lokasi (GPS) agar posisi diperiksa.
3. Scan kode QR yang ditempel/ditampilkan di lokasi.
4. Ambil selfie langsung dari kamera (tidak bisa dari galeri).
5. Sistem menampilkan hasil: **Berhasil** atau **Gagal** beserta alasannya.

**Sisi pengelola (admin):**
- Memantau kehadiran secara real-time lewat dashboard.
- Mengatur lokasi, radius absen (bawaan 100 m), dan jadwal sesi.
- Mencetak atau menampilkan kode QR untuk tiap lokasi.
- Mengelola anggota dan kelompok (kelas/divisi/tim).
- Melihat rekap kehadiran, mengubah status secara manual (Hadir / Izin / Sakit / Alpa), dan mengekspor ke Excel.

**Nilai utama yang harus tersampaikan di landing page:**

| Nilai | Pesan |
|---|---|
| Cepat | Absen selesai dalam hitungan detik |
| Mudah | Tanpa pelatihan, tanpa aplikasi tambahan (cukup browser) |
| Terpercaya | Kombinasi QR + selfie + lokasi sebagai bukti kehadiran |
| Privat | Foto selfie dihapus otomatis dalam 1–3 hari |
| Fleksibel | Cocok untuk sekolah, yayasan, pabrik, dan acara sekali pakai |

**Siapa pengunjung landing page:** pengelola/admin lembaga (guru, HRD, ketua yayasan, panitia acara) yang sedang mencari solusi absensi dan ingin memilih paket.

**Tujuan halaman:** pengunjung paham SobatAbsen dalam hitungan detik, percaya, lalu **memilih paket** atau **mencoba gratis**.

---

## 2. Daftar Section yang Harus Dibangun

Urutan dari atas ke bawah:

| # | Section | Anchor | Prioritas |
|---|---|---|---|
| 1 | Navbar | — | Wajib |
| 2 | Hero | `#top` | Wajib |
| 3 | Dipakai di mana saja | `#untuk-siapa` | Wajib |
| 4 | Cara kerja (3 langkah) | `#cara-kerja` | Wajib |
| 5 | Fitur utama | `#fitur` | Wajib |
| 6 | Keamanan & privasi | `#keamanan` | Wajib |
| 7 | **Beli Paket** ★ | `#paket` | **Utama** |
| 8 | Perbandingan paket | `#bandingkan` | Wajib |
| 9 | FAQ | `#faq` | Wajib |
| 10 | CTA penutup | — | Wajib |
| 11 | Footer | — | Wajib |

---

## 3. Isi & Fungsi Tiap Section

### 3.1 Navbar
- Logo SobatAbsen (kembali ke atas saat diklik).
- Menu anchor: Cara Kerja · Fitur · Keamanan · Paket · FAQ.
- Tombol **Masuk** (menuju halaman login aplikasi) dan **Mulai Gratis** (menuju bagian paket/daftar).
- Menu sticky di atas saat scroll; menu aktif ikut berubah sesuai section yang terlihat.
- Di ponsel: menu berubah menjadi hamburger yang membuka daftar menu penuh.

### 3.2 Hero
- Label kecil: *Absensi digital untuk semua lembaga*
- Headline: **"Absen selesai dalam hitungan detik."**
- Subheadline: *"Scan QR, ambil selfie, selesai. Tanpa kartu, tanpa pelatihan. Cocok untuk sekolah, yayasan, pabrik, dan acara."*
- Dua tombol: **Mulai Gratis** dan **Lihat Paket** (scroll ke `#paket`).
- Catatan kecil: *Gratis hingga 40 anggota · Tanpa kartu kredit*
- Visual pendukung: tampilan layar aplikasi yang menunjukkan hasil "Absen Berhasil".

### 3.3 Dipakai di Mana Saja
Empat kartu use case:

| Kartu | Teks singkat |
|---|---|
| Sekolah & Kampus | Absen siswa per kelas, tanpa kertas. |
| Yayasan & Komunitas | Pantau kehadiran kegiatan dan pengurus. |
| Pabrik & Kantor | Kehadiran karyawan di titik kerja yang tepat. |
| Event Organizer | Absen peserta acara, aktif hanya beberapa hari. |

### 3.4 Cara Kerja
Judul: **"Tiga langkah. Itu saja."**

| Langkah | Judul | Penjelasan |
|---|---|---|
| 1 | Aktifkan lokasi | Kami memastikan Anda berada di area absen. |
| 2 | Scan QR | Arahkan kamera ke kode QR di lokasi. |
| 3 | Ambil selfie | Foto langsung, bukan dari galeri. |

Ditutup dengan penunjuk hasil: **Absen Berhasil ✓**.

### 3.5 Fitur Utama
Enam fitur:

| Fitur | Penjelasan |
|---|---|
| Absen QR + Selfie | Dua lapis bukti kehadiran dalam satu alur singkat. |
| Radius lokasi | Atur jarak absen. Bawaan 100 m, bisa disesuaikan. |
| Dashboard real-time | Lihat siapa yang sudah hadir saat itu juga. |
| Rekap & ekspor Excel | Laporan harian siap unduh. |
| Banyak lokasi | Satu lembaga, banyak titik, satu dashboard. |
| Ubah status manual | Izin, sakit, atau kendala ponsel? Admin bisa mencatat. |

### 3.6 Keamanan & Privasi
Judul: **"Privasi dijaga. Foto tidak disimpan selamanya."**

1. **Foto terhapus otomatis** — 1–3 hari, sesuai pengaturan lembaga.
2. **Hanya data yang perlu** — identitas, lokasi saat absen, dan selfie.
3. **Anti kecurangan** — selfie wajib langsung dari kamera, lokasi diperiksa.
4. **Persetujuan jelas** — anggota menyetujui penggunaan data di awal.

Tautan: *Baca kebijakan privasi*.

---

## 4. ★ Section Beli Paket (`#paket`)

Ini section terpenting. Semua pembayaran **hanya tampilan + mock** (tanpa payment gateway).

### 4.1 Data Paket (sumber tunggal, `src/data/plans.ts`)

```ts
export type Plan = {
  id: "starter" | "hemat" | "pro" | "event" | "custom";
  name: string;
  type: "bulanan" | "eceran";
  priceMonthly?: number;      // Rp per bulan
  promoFirstMonth?: number;   // Rp untuk bulan pertama
  pricePerPerson?: number;    // Rp per orang
  capacity: { min?: number; max?: number };
  badge?: string;
  features: string[];
};

export const PLANS: Plan[] = [
  { id: "starter", name: "Starter", type: "bulanan", priceMonthly: 0,
    capacity: { max: 40 },
    features: ["Hingga 40 anggota", "Absen QR + selfie + lokasi", "Dashboard & rekap", "Ekspor Excel"] },

  { id: "hemat", name: "Hemat", type: "bulanan", priceMonthly: 50000, promoFirstMonth: 40000,
    capacity: { max: 200 }, badge: "Promo bulan pertama",
    features: ["Hingga 200 anggota", "Semua fitur Starter", "Banyak lokasi", "Prioritas bantuan"] },

  { id: "pro", name: "Pro", type: "bulanan", priceMonthly: 100000, promoFirstMonth: 90000,
    capacity: { max: 500 }, badge: "Paling populer",
    features: ["Hingga 500 anggota", "Semua fitur Hemat", "Jadwal sesi lanjutan", "Prioritas bantuan utama"] },

  { id: "event", name: "Event", type: "eceran", pricePerPerson: 400,
    capacity: { min: 41 }, badge: "Sekali pakai",
    features: ["Min. 41 peserta", "Aktif 3–7 hari", "Semua fitur dasar", "Foto terhapus saat acara selesai"] },

  { id: "custom", name: "Custom Institusi", type: "eceran", pricePerPerson: 430,
    capacity: { min: 501 },
    features: ["Min. 501 anggota", "Dibayar per bulan", "Semua fitur Pro", "Pendampingan onboarding"] },
];
```

> **Asumsi:** harga Event Rp400/orang berlaku untuk seluruh masa aktif 3–7 hari (lama aktif tidak mengubah harga). Sesuaikan fungsi `calcEvent()` bila R&D menetapkan lain.

### 4.2 Header Section
- Label: `PAKET`
- Judul: **"Mulai gratis. Naik kelas saat butuh."**
- Subjudul: *"Pilih paket sesuai jumlah anggota Anda. Bisa upgrade kapan saja."*
- Pemilih tab: **Langganan Bulanan | Eceran & Custom**.

### 4.3 Tab Langganan Bulanan
Tiga kartu: **Starter, Hemat, Pro**. Isi tiap kartu:
- Nama paket dan badge (jika ada).
- Harga. Untuk Hemat dan Pro tampilkan harga promo bulan pertama, harga normal, dan keterangan *"bulan pertama, lalu Rp…/bln"*. Starter tampil sebagai **Gratis**.
- Daftar fitur.
- Tombol: Starter → **Mulai Gratis**; Hemat/Pro → **Pilih {nama paket}**.
- **Pro** ditandai sebagai paket "Paling populer".
- Catatan di bawah kartu: *Harga dalam Rupiah. Berhenti kapan saja.*

### 4.4 Tab Eceran & Custom
Dua kartu dengan **kalkulator biaya langsung** di dalamnya.

**Kartu Event**
- Input **jumlah peserta** (minimal 41; di bawah itu tampil pesan *"Minimal 41 peserta. Untuk di bawahnya, Starter gratis cukup."* dengan tautan ke Starter).
- Input **lama aktif**: 3 / 5 / 7 hari.
- Hasil: *Estimasi total* = peserta × Rp400, ditambah rincian (mis. `250 peserta × Rp400 · aktif 5 hari`).
- Tombol **Pilih Event**.
- Keterangan: *Cocok untuk seminar, pelatihan, dan acara sekali pakai.*

**Kartu Custom Institusi**
- Input **jumlah anggota** (minimal 501; di bawah itu tampil pesan *"Minimal 501 anggota. Pilih Pro untuk hingga 500."*).
- Hasil: *Estimasi per bulan* = anggota × Rp430, dengan rincian.
- Tombol **Pilih Custom** dan tautan **"Tanya tim kami"** (membuka form kontak).

```ts
export const rupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);

export const calcEvent  = (people: number) => people * 400;
export const calcCustom = (members: number) => members * 430;
```

### 4.5 Pemilih Cepat "Berapa anggota Anda?"
Slider jumlah anggota (1 – 1000+). Saat digeser, paket yang sesuai ditandai **"Cocok untuk Anda"**:

| Jumlah anggota | Paket |
|---|---|
| 1–40 | Starter |
| 41–200 | Hemat |
| 201–500 | Pro |
| 501+ | Custom Institusi |

Keterangan: *"Untuk acara sekali pakai, lihat tab Eceran."*

### 4.6 Alur Checkout (Mock)
Tombol **Pilih paket** membuka panel checkout bertahap (4 langkah, bisa kembali di tiap langkah):

1. **Ringkasan paket**
   - Nama paket, rincian harga, periode. Untuk Event/Custom, input kalkulator bisa diubah di sini.
   - Kolom kode promo opsional (mock, mis. `SOBAT10` menampilkan potongan).
2. **Data lembaga**
   - Field: nama lembaga, jenis (Sekolah / Yayasan / Pabrik / Event), nama pengelola, email, nomor WhatsApp.
   - Validasi form; tombol lanjut aktif saat semua valid.
3. **Metode pembayaran**
   - **QRIS** (ditandai *Direkomendasikan*)
   - **Virtual Account** (BCA / BNI / BRI / Mandiri)
   - **E-Wallet** (GoPay / OVO / DANA / ShopeePay)
   - Ringkasan total tetap terlihat + tombol **Bayar Rp…**.
4. **Instruksi bayar & hasil**
   - Menampilkan sesuai metode: QR palsu dengan hitung mundur 15 menit / nomor VA dengan tombol salin / tombol buka aplikasi e-wallet.
   - Tombol bantu development **"Simulasikan berhasil"** → layar sukses: *"Pembayaran diterima. Cek email Anda untuk membuat akun admin."*
   - State yang wajib ada: **kedaluwarsa** (tombol "Buat ulang") dan **gagal**.

**Form "Tanya tim kami"** (khusus Custom): nama, institusi, jumlah anggota, WhatsApp, kebutuhan → setelah kirim tampil pesan *"Terima kasih, kami hubungi dalam 1 hari kerja."*

> Tidak ada data yang dikirim ke server. Beri komentar `// TODO: ganti dengan API pembayaran` pada fungsi submit.

### 4.7 Elemen Kepercayaan
Di bawah kartu paket: *"Pembayaran aman"* · logo metode bayar (QRIS, VA, e-wallet) · *"Bisa upgrade atau berhenti kapan saja."*

### 4.8 Kasus Khusus yang Harus Ditangani

| Kasus | Perilaku |
|---|---|
| Peserta Event < 41 | Tampilkan pesan minimum + arahkan ke Starter |
| Anggota Custom < 501 | Tampilkan pesan minimum + arahkan ke Pro |
| Input kosong / bukan angka | Total tampil `—`, tombol pilih nonaktif |
| Angka besar | Pemisah ribuan (`1.000.000`) |

---

## 5. Perbandingan Paket (`#bandingkan`)
Tabel dengan kolom Starter · Hemat · Pro · Event · Custom:

| Fitur | Starter | Hemat | Pro | Event | Custom |
|---|---|---|---|---|---|
| Kapasitas | 40 | 200 | 500 | min. 41 | min. 501 |
| Absen QR + selfie + lokasi | ✓ | ✓ | ✓ | ✓ | ✓ |
| Dashboard real-time | ✓ | ✓ | ✓ | ✓ | ✓ |
| Ekspor Excel | ✓ | ✓ | ✓ | ✓ | ✓ |
| Banyak lokasi | — | ✓ | ✓ | ✓ | ✓ |
| Jadwal sesi lanjutan | — | — | ✓ | — | ✓ |
| Pendampingan onboarding | — | — | — | — | ✓ |
| Masa aktif | Selamanya | Bulanan | Bulanan | 3–7 hari | Bulanan |

Kebutuhan: header kolom tetap terlihat saat scroll; tabel tetap bisa dibaca di ponsel.

---

## 6. FAQ

| Pertanyaan | Jawaban |
|---|---|
| Apa itu SobatAbsen? | Aplikasi absensi digital dengan QR, selfie, dan pengecekan lokasi. |
| Apakah anggota harus mengunduh aplikasi? | Tidak. Cukup buka lewat browser ponsel (bisa dipasang ke layar utama). |
| Bagaimana jika ponsel anggota rusak atau tidak ada sinyal? | Admin bisa mengubah status secara manual dari halaman rekap. |
| Apakah foto selfie disimpan selamanya? | Tidak. Foto dihapus otomatis dalam 1–3 hari sesuai pengaturan lembaga. |
| Bisakah satu lembaga punya banyak lokasi? | Bisa, dengan satu dashboard (paket Hemat ke atas). |
| Apa bedanya Event dan Hemat/Pro? | Event untuk acara sekali pakai 3–7 hari, dibayar per peserta. |
| Bagaimana jika anggota melebihi kapasitas? | Anda diajak upgrade ke paket yang sesuai. |
| Metode bayar apa saja? | QRIS, Virtual Account, dan e-wallet. |

Perilaku: satu jawaban terbuka dalam satu waktu. Sertakan data terstruktur `FAQPage` (JSON-LD) untuk SEO.

---

## 7. CTA Penutup & Footer

**CTA penutup**
- Judul: **"Siap membuat absen jadi mudah?"**
- Teks: *"Mulai gratis hari ini. Tidak perlu kartu kredit."*
- Tombol: **Mulai Gratis** dan **Lihat Paket**.

**Footer**
- **Produk:** Fitur · Cara Kerja · Paket · FAQ
- **Perusahaan:** Tentang · Kontak
- **Hukum:** Kebijakan Privasi · Syarat & Ketentuan
- **Bantuan:** Pusat Bantuan · WhatsApp
- Baris bawah: `© 2026 SobatAbsen`, pemilih bahasa (ID/EN), pemilih tema (terang/gelap/otomatis).

---

## 8. Fungsi Lintas Halaman

- **Dua bahasa:** Indonesia (bawaan) dan English; semua teks dari file terjemahan.
- **Responsif:** nyaman di ponsel (360 px) sampai desktop.
- **Tombol "Lihat Paket" melayang** di ponsel setelah hero terlewat, menghilang saat section Paket terlihat.
- **Dark mode** mengikuti pengaturan sistem + pilihan manual.
- **Aksesibilitas dasar:** bisa dioperasikan keyboard, tab paket memakai peran `tablist`, hasil kalkulator diumumkan ke pembaca layar, panel checkout mengunci fokus dan bisa ditutup dengan `Esc`.

## 9. SEO

- `title`: `SobatAbsen — Absensi Digital QR + Selfie untuk Sekolah, Yayasan & Pabrik`
- `description` (≤ 155 karakter): *"Absen cepat dengan scan QR dan selfie. Aman, privat, dan mudah. Mulai gratis hingga 40 anggota."*
- Open Graph & Twitter card.
- JSON-LD: `SoftwareApplication` (dengan `offers` dari data paket) dan `FAQPage`.

---

## 10. Kriteria Selesai

- [ ] Seluruh 11 section tampil sesuai urutan dengan isi di dokumen ini.
- [ ] Menu navbar berpindah ke section yang benar.
- [ ] Kelima paket tampil dengan harga, kapasitas, dan promo yang sesuai `plans.ts`.
- [ ] Kalkulator Event & Custom menghitung benar, menolak input di bawah minimum, dan memformat Rupiah.
- [ ] Slider anggota menandai paket yang tepat.
- [ ] Checkout mock bisa diselesaikan dari "Pilih paket" sampai layar sukses dalam 4 langkah dan bisa kembali di tiap langkah.
- [ ] State kedaluwarsa dan gagal pada pembayaran tersedia.
- [ ] FAQ, tabel perbandingan, dan footer lengkap.
- [ ] Bahasa ID/EN dan dark mode berfungsi.
- [ ] Tidak ada data yang dikirim ke server mana pun.

## 11. Di Luar Lingkup (Sekarang)

Payment gateway nyata, pembuatan akun otomatis setelah bayar, pengiriman email, CMS/blog, serta halaman login dan dashboard (dibahas di panduan aplikasi).
