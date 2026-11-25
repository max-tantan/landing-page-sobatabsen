<script setup lang="ts">
import { ref } from 'vue'
import BlurText from './BlurText.vue'
import mockupLokasi from '../assets/section fitur/mockup1.webp'
import mockupQr from '../assets/section fitur/mockup2.webp'
import mockupSelfie from '../assets/section fitur/mockup3.webp'
import mockupAdmin from '../assets/mockup-kehadiran.webp'

const heading = {
  effect: 'blur',
  'animate-by': 'words',
  direction: 'top',
  'stagger-from': 'start',
  trigger: 'view',
  delay: 40,
  'step-duration': 0.28,
  blur: 8,
  distance: 18
} as const

const activeIndex = ref(0)

const items = [
  {
    id: 'lokasi',
    title: 'Deteksi Lokasi',
    desc: 'Presensi hanya sah di dalam radius yang ditentukan.',
    img: mockupLokasi,
    alt: 'Tampilan verifikasi lokasi GPS SobatAbsen dengan radius 100m'
  },
  {
    id: 'qr',
    title: 'Scan Kode QR',
    desc: 'Scan lewat browser ponsel tanpa instal aplikasi.',
    img: mockupQr,
    alt: 'Tampilan pemindaian kode QR lokasi SobatAbsen'
  },
  {
    id: 'selfie',
    title: 'Foto Selfie',
    desc: 'Foto langsung di tempat, terhapus otomatis demi privasi.',
    img: mockupSelfie,
    alt: 'Tampilan verifikasi wajah dan foto selfie langsung SobatAbsen'
  },
  {
    id: 'admin',
    title: 'Control Penuh Lewat Admin',
    desc: 'Pantau kehadiran real-time dan ekspor ke Excel.',
    img: mockupAdmin,
    alt: 'Dashboard admin SobatAbsen untuk memantau rekap kehadiran'
  }
]
</script>

<template>
  <section class="features-section section-wrap" id="fitur" aria-labelledby="features-heading">
    <div class="section-head">
      <h2 id="features-heading">
        Fitur <em><BlurText v-bind="heading" tag="span" text="utama." /></em>
      </h2>
    </div>

    <div class="features-inner">
      <!-- PILIHAN FITUR (Sebelah Kiri) -->
      <div class="features-list" role="tablist" aria-label="Daftar Fitur">
        <button
          v-for="(item, index) in items"
          :key="item.id"
          type="button"
          role="tab"
          :aria-selected="activeIndex === index"
          class="feature-step"
          :class="{ 'is-active': activeIndex === index }"
          @click="activeIndex = index"
          @mouseenter="activeIndex = index"
        >
          <div class="feature-step-content">
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </button>
      </div>

      <!-- INFOGRAFIS / FOTO MOCKUP (Sebelah Kanan) -->
      <div class="features-visual" :class="{ 'is-admin-view': activeIndex === 3 }" aria-hidden="true">
        <div
          v-for="(item, index) in items"
          :key="item.id"
          class="visual-panel"
          :class="{ active: activeIndex === index }"
        >
          <img :src="item.img" :alt="item.alt" loading="lazy" />
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.features-section {
  padding-top: 70px;
  padding-bottom: 70px;
}

.features-section .section-head {
  margin-bottom: 36px;
}

.features-inner {
  display: grid;
  grid-template-columns: 1fr 1.25fr;
  gap: 32px;
  align-items: center;
}

/* Kolom Kiri: Tombol Pilihan Fitur */
.features-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.feature-step {
  display: block;
  width: 100%;
  min-height: 0;
  padding: 16px 20px;
  border: 1px solid #e0e8e2;
  border-radius: 14px;
  background: #ffffff;
  font-family: inherit;
  text-align: left;
  color: inherit;
  cursor: pointer;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.15s ease;
}

.feature-step:hover {
  border-color: #b8d4f5;
  transform: translateY(-1px);
}

.feature-step.is-active {
  border-color: #1878ec;
  box-shadow: 0 10px 24px rgba(24, 120, 236, 0.1);
  background: #ffffff;
}

.feature-step-content {
  display: block;
}

.feature-step-content h3 {
  margin: 0 0 5px;
  font-size: 16px;
  font-weight: 700;
  color: #111;
  letter-spacing: -0.3px;
  transition: color 0.15s ease;
}

.feature-step.is-active .feature-step-content h3 {
  color: #1878ec;
}

.feature-step-content p {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: #606060;
}

/* Kolom Kanan: Infografis / Foto Mockup */
.features-visual {
  position: relative;
  min-height: 520px;
  height: 100%;
  padding: 10px;
  border-radius: 20px;
  background: #f0f2f5;
  border: 1px solid #e2e8f0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: width 0.25s ease, max-width 0.25s ease;
}

.visual-panel {
  position: absolute;
  inset: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 14px;
  background: #ffffff;
  border: 1px solid #ffffff;
  padding: 8px;
  opacity: 0;
  transform: translateY(6px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  pointer-events: none;
}

.visual-panel.active {
  opacity: 1;
  transform: none;
  pointer-events: auto;
}

.visual-panel img {
  max-width: 100%;
  max-height: 480px;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
  box-shadow: 0 12px 30px rgba(17, 24, 39, 0.08);
}

/* Mobile Responsive */
@media (max-width: 800px) {
  .features-inner {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .features-list {
    display: flex;
    flex-direction: row;
    gap: 8px;
    order: 1;
    overflow-x: auto;
    padding-bottom: 4px;
    -webkit-overflow-scrolling: touch;
  }
  .feature-step {
    flex: 1;
    width: auto;
    min-width: max-content;
    padding: 10px 14px;
    border-radius: 999px;
    text-align: center;
    justify-content: center;
    gap: 0;
  }
  .feature-step-content p {
    display: none;
  }
  .feature-step-content h3 {
    margin: 0;
    font-size: 12px;
    white-space: nowrap;
  }
  .feature-step.is-active {
    background: #1878ec;
    border-color: #1878ec;
    box-shadow: none;
    color: #ffffff;
  }
  .feature-step.is-active .feature-step-content h3 {
    color: #ffffff;
  }

  /* Container fokus mobile: pas di layar, tidak terlalu lebar, mockup lebih dekat dan besar */
  .features-visual {
    order: 2;
    width: min(100%, 280px);
    margin: 0 auto;
    min-height: 490px;
    height: 500px;
    padding: 8px;
    border-radius: 18px;
  }

  .features-visual.is-admin-view {
    width: min(100%, 380px);
    min-height: 380px;
    height: auto;
  }

  .visual-panel {
    inset: 6px;
    padding: 6px;
  }

  .visual-panel img {
    max-height: 470px;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .features-visual.is-admin-view .visual-panel img {
    max-height: 340px;
  }
}

@media (max-width: 650px) {
  .features-section {
    padding-top: 50px;
    padding-bottom: 50px;
  }
  .features-section .section-head {
    margin-bottom: 20px;
  }
}
</style>
