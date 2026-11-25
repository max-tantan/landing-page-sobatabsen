# Laporan refactor — SobatAbsen landing page

## Ringkasan

Metrik dihitung dari baris fisik file teks sumber: `src/**/*.{ts,vue,css,json}`, `index.html`, dan `vite.config.ts`. Baseline adalah `HEAD` sebelum refactor. Aset biner tidak dihitung sebagai baris kode.

| Metrik | Sebelum | Sesudah | Selisih |
| --- | ---: | ---: | ---: |
| Total baris sumber (termasuk JSON baru) | 4.315 | 3.809 | **−506 (−11,7%)** |
| Baris kode saja (`.ts/.vue/.css/.html`, JSON tidak dihitung) | 4.315 | 3.511 | **−804 (−18,6%)** |
| Baris data JSON baru | 0 | 298 | +298 |
| File sumber teks | 18 | 28 | +10 |
| Komponen `.vue` | 11 | 18 | +7 |
| File dihapus (2 komponen + 20 aset) | — | 22 file | −3,42 MiB |

Angka jujurnya: penambahan 9 komponen section dan 298 baris JSON mengurangi "penghematan kode murni", tetapi menghapus duplikasi copy dan state yang tersebar.

## Perubahan besar

| Area | Sebelum | Sesudah | Selisih |
| --- | ---: | ---: | ---: |
| `src/App.vue` | 233 | 44 | −189 (−81%) |
| `src/style.css` | 352 | 288 | −64 (−18%) |
| `index.html` | 47 | 17 | −30 (−64%) |
| `src/data/plans.ts` | 23 | 18 | −5 |
| `vite.config.ts` | 8 | 48 | +40 (injeksi SEO saat build) |
| 9 komponen di `src/components/sections/` | 0 | 503 | +503 (dipindah dari `App.vue`) |
| `src/data/content.json` | 0 | 291 | +291 |
| `src/data/plans.json` | 0 | 7 | +7 |
| `src/data/ui.ts` | 0 | 13 | +13 |

Komponen lama yang tersisa juga menyusut: `FeaturesShowcase.vue` 307 → 267, `TestimonialsSection.vue` 166 → 151, `AccordionGallery.vue` 386 → 383, `MockupSection.vue` 84 → 83. Penghapusan `HelloWorld.vue` (95) dan `Antigravity.vue` (920) menyumbang 1.015 baris.

## Yang dikerjakan

- **Copy terpusat:** semua teks UI, aria-label, FAQ, testimoni, fitur, galeri, langkah, plan, dan checkout masuk `src/data/content.json`; harga paket masuk `src/data/plans.json`. `plans.ts` kini hanya tipe, helper, dan helper harga (tidak ada lagi `400`/`430` hardcode).
- **Struktur:** `App.vue` tinggal komposisi + animasi. Section dipecah ke `src/components/sections/`; `CheckoutModal` menyimpan state checkout sendiri dan dibuka lewat `defineExpose({ open })`.
- **SEO:** `vite.config.ts` menyuntik meta/title dan JSON-LD dari JSON yang sama, untuk dev dan build. FAQ dan harga di `index.html` tidak lagi duplikat manual.
- **CSS:** `:root` duplikat digabung, selector mati terkonfirmasi dihapus (hero lama, attendance card, feature art lama, privacy, secure-label, hover art), CSS build turun dari 85,64 kB ke 80,69 kB.
- **Bersih-bersih:** 22 file tak terpakai dihapus setelah pengecekan referensi (komponen starter, WebGL tak terpakai, gambar duplikat/starter, logo ganda).

## Verifikasi

- `npm run build` lolos (`vue-tsc -b && vite build`).
- `dist/index.html` berisi title, meta description, 3 offer harga, dan 3 FAQ dari JSON.
- Assert otomatis mengecek copy JSON (hero, checkout footnote, testimoni) hadir di bundle JS.

## Catatan

- Metrik "baris kode saja" tidak adil secara murni karena copy dipindah ke JSON; baris total (termasuk JSON) adalah angka yang lebih representatif.
- Tidak ada pengecekan visual browser/screenshot: perubahan CSS dibatasi pada selector yang tidak memiliki referensi di template, tetapi tampilan tetap perlu dicek manual di desktop dan mobile.
- GSAP CDN di `index.html` dan dependency npm `gsap` sengaja dibiarkan apa adanya; menyatukannya berisiko mengubah animasi dan di luar scope refactor ini.
