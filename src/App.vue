<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { PLANS, rupiah, calcEvent, calcCustom, type Plan } from './data/plans'
import { animatePlanTabChange, setupAnimations } from './animations'
import SplitText from './components/SplitText.vue'
import CheckoutStepper from './components/CheckoutStepper.vue'
import Antigravity from './components/Antigravity.vue'
import faqImage from './assets/sobatabsen1.jpeg'

const planTab = ref<'monthly' | 'oneoff'>('monthly')
const eventPeople = ref('250')
const eventDays = ref(5)
const customPeople = ref('800')
const activeFaq = ref(0)
const menuOpen = ref(false)
const checkout = ref(false)
const step = ref(1)
const selectedPlan = ref<Plan>(PLANS[0])
const activePayment = ref('QRIS')
const checkoutForm = ref({ institution: '', manager: '', email: '', whatsapp: '' })
const paymentState = ref<'pending' | 'success' | 'expired' | 'failed'>('pending')
let cleanupAnimations = () => {}
let cleanupPlanTabAnimation = () => {}
const eventCount = computed(() => eventPeople.value === '' ? null : Number(eventPeople.value))
const customCount = computed(() => customPeople.value === '' ? null : Number(customPeople.value))
const eventValid = computed(() => eventCount.value !== null && Number.isFinite(eventCount.value) && eventCount.value >= 41)
const customValid = computed(() => customCount.value !== null && Number.isFinite(customCount.value) && customCount.value >= 501)
const chosenTotal = computed(() => selectedPlan.value.id === 'event' ? calcEvent(Number(eventPeople.value)) : selectedPlan.value.id === 'custom' ? calcCustom(Number(customPeople.value)) : selectedPlan.value.promoFirstMonth ?? selectedPlan.value.priceMonthly ?? 0)

const faqs = [
  ['Apa itu SobatAbsen?', 'Aplikasi absensi digital dengan QR, selfie, dan pengecekan lokasi untuk memastikan kehadiran tercatat dengan benar.'],
  ['Apakah anggota harus mengunduh aplikasi?', 'Tidak. Anggota cukup membuka halaman absen lewat browser ponsel.'],
  ['Bagaimana jika ponsel anggota rusak atau tidak ada sinyal?', 'Admin dapat mengubah status kehadiran secara manual dari halaman rekap.'],
  ['Apakah foto selfie disimpan selamanya?', 'Tidak. Foto dihapus otomatis dalam 1–3 hari sesuai pengaturan lembaga.'],
  ['Bisakah satu lembaga punya banyak lokasi?', 'Bisa, dengan satu dashboard pada paket Hemat ke atas.'],
  ['Apa bedanya Event dan Hemat/Pro?', 'Paket Event dirancang untuk kegiatan sekali pakai selama 3–7 hari dan dibayar per peserta.'],
  ['Bagaimana jika anggota melebihi kapasitas?', 'SobatAbsen akan mengarahkan Anda memilih paket dengan kapasitas yang sesuai.'],
  ['Metode bayar apa saja?', 'Tersedia QRIS, Virtual Account, dan e-wallet. Pembayaran pada halaman ini masih simulasi.'],
]
const compareRows = [
  ['Kapasitas', '40', '200', '500', 'min. 41', 'min. 501'],
  ['Absen QR + selfie + lokasi', '✓', '✓', '✓', '✓', '✓'],
  ['Dashboard real-time', '✓', '✓', '✓', '✓', '✓'],
  ['Ekspor Excel', '✓', '✓', '✓', '✓', '✓'],
  ['Banyak lokasi', '—', '✓', '✓', '✓', '✓'],
  ['Jadwal sesi lanjutan', '—', '—', '✓', '—', '✓'],
  ['Pendampingan onboarding', '—', '—', '—', '—', '✓'],
  ['Masa aktif', 'Selamanya', 'Bulanan', 'Bulanan', '3–7 hari', 'Bulanan'],
]

function openCheckout(plan: Plan) {
  selectedPlan.value = plan
  step.value = 1
  paymentState.value = 'pending'
  checkout.value = true
}
function submitInstitution() { if (Object.values(checkoutForm.value).every(Boolean)) step.value = 3 }
async function switchPlanTab(tab: 'monthly' | 'oneoff') {
  if (planTab.value === tab) return
  const previousHeight = document.querySelector('.plans-grid')?.getBoundingClientRect().height
  planTab.value = tab
  await nextTick()
  cleanupPlanTabAnimation()
  cleanupPlanTabAnimation = animatePlanTabChange(previousHeight)
}

onMounted(() => { cleanupAnimations = setupAnimations() })
onBeforeUnmount(() => { cleanupAnimations(); cleanupPlanTabAnimation() })
</script>

<template>
  <main>
    <header class="topbar" :class="{ 'menu-open': menuOpen }">
      <div class="topbar-pill">
        <a href="#top" class="brand" aria-label="SobatAbsen beranda">sobat<span>absen</span><i>✳</i></a>
        <button class="menu-toggle" aria-label="Buka menu" :aria-expanded="menuOpen" aria-controls="primary-nav" @click="menuOpen = !menuOpen">{{ menuOpen ? '×' : '☰' }}</button>
        <nav id="primary-nav" :class="{ open: menuOpen }" aria-label="Navigasi utama" @click="menuOpen = false">
          <a href="#cara-kerja">Cara Kerja</a><a href="#fitur">Fitur</a><a href="#keamanan">Keamanan</a><a href="#paket">Paket</a><a href="#faq">FAQ</a>
          <a class="button button-small" href="#paket">Mulai Gratis</a>
        </nav>
      </div>
    </header>

    <section class="hero" id="top">
      <Antigravity
        class="hero-antigravity"
        :colors="['#1268d2', '#1878ec', '#4ea1ff', '#c5e0ff']"
        :count="1500"
        :magnet-radius="9"
        :ring-radius="7"
        :particle-size="0.5"
        :auto-animate="true"
        :interactive="true"
        :click-burst="true"
      />
      <div class="hero-text">
        <h1 class="hero-title">
          <SplitText text="Absen selesai" tag="span" class-name="hero-split" effect="rise" split-type="chars" trigger="load" :delay="50" :duration="1.2" :mask="true" />
          <SplitText text="dalam hitungan detik." tag="span" class-name="hero-split hero-split-accent" effect="rise" split-type="chars" trigger="load" :delay="50" :duration="1.2" :mask="true" color="#c5e0ff" accent-color="#ffffff" />
        </h1>
        <div class="hero-actions">
          <a class="hero-pill-btn hero-pill-light" href="#cara-kerja">Mulai Jelajahi</a>
          <a class="hero-pill-btn hero-pill-dark" href="#paket">
            <span>Paket</span>
            <svg class="hero-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
    </section>

    <section class="usecases section-wrap" id="untuk-siapa"><div class="section-head"><h2>Untuk berbagai lembaga.</h2></div><div class="usecase-grid"><article class="usecase-card"><span class="use-icon school-icon">▤</span><h3>Sekolah & Kampus</h3><p>Absen siswa per kelas, tanpa kertas.</p></article><article class="usecase-card"><span class="use-icon community-icon">✿</span><h3>Yayasan & Komunitas</h3><p>Pantau kehadiran kegiatan dan pengurus.</p></article><article class="usecase-card"><span class="use-icon factory-icon">▥</span><h3>Pabrik & Kantor</h3><p>Kehadiran karyawan di titik kerja yang tepat.</p></article><article class="usecase-card"><span class="use-icon event-icon">✳</span><h3>Event Organizer</h3><p>Absen peserta acara, aktif hanya beberapa hari.</p></article></div></section>

    <section class="how-section" id="cara-kerja">
      <div class="section-wrap how-inner">
        <div class="section-head">
          <h2>Absen dalam <em>tiga langkah.</em></h2>
        </div>
        <div class="steps" aria-label="Alur absensi">
          <article class="step"><span class="step-number">01</span><span class="step-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" stroke-width="1.4" stroke-dasharray="2.5 2.5" opacity=".45"/><circle cx="12" cy="12" r="4.8" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12" r="2" fill="currentColor"/></svg></span><h3>Aktifkan lokasi</h3><p>Absen dari radius yang ditentukan.</p></article>
          <article class="step"><span class="step-number">02</span><span class="step-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="4" y="4" width="7" height="7" rx="1.2" stroke="currentColor" stroke-width="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.2" stroke="currentColor" stroke-width="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.2" stroke="currentColor" stroke-width="1.5"/><path d="M13 13.5h3.2M19.5 13.5H18M13 17h2M16.5 17H19.5M13 20.5h6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg></span><h3>Scan QR</h3><p>Gunakan QR yang tersedia di lokasi.</p></article>
          <article class="step"><span class="step-number">03</span><span class="step-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none"><rect x="3.5" y="6.5" width="17" height="12.5" rx="2.5" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="12.5" r="3.4" stroke="currentColor" stroke-width="1.5"/><path d="M8.5 6.5l1.2-2h4.6l1.2 2" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg></span><h3>Ambil selfie</h3><p>Gunakan kamera langsung, bukan galeri.</p></article>
        </div>
      </div>
    </section>

    <section class="features section-wrap" id="fitur"><div class="section-head centered"><h2>Fitur utama.</h2></div><div class="feature-grid"><article class="feature-card feature-blue"><span class="feature-icon">▦</span><h3>Absen QR + Selfie</h3><p>Validasi kehadiran lewat lokasi.</p><div class="feature-art qr-art">▦</div></article><article class="feature-card"><span class="feature-icon">⌖</span><h3>Radius lokasi</h3><p>Atur radius absen, mulai dari 100 m.</p><div class="radius-art"></div></article><article class="feature-card"><span class="feature-icon">◷</span><h3>Dashboard real-time</h3><p>Pantau kehadiran saat itu juga.</p><div class="chart-art"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></article><article class="feature-card"><span class="feature-icon">↧</span><h3>Rekap & ekspor Excel</h3><p>Unduh laporan harian.</p><div class="sheet-art">XLS <span>↓</span></div></article><article class="feature-card"><span class="feature-icon">⌖</span><h3>Banyak lokasi</h3><p>Kelola beberapa titik dalam satu dashboard.</p><div class="locations-art"><i>●</i><i>●</i><i>●</i><b>＋</b></div></article><article class="feature-card"><span class="feature-icon">✓</span><h3>Ubah status manual</h3><p>Catat status izin, sakit, atau alpa.</p><svg class="status-art" viewBox="0 0 112 72" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g class="status-chip status-chip-a"><rect x="8" y="8" width="72" height="16" rx="5" fill="#fff" stroke="#e4e4e4"/><circle cx="18" cy="16" r="3.5" fill="#1878ec"/><path d="M16.2 16.1l1.3 1.3 2.6-2.8" stroke="#fff" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/><rect x="26" y="13" width="28" height="6" rx="2" fill="#d6e4f8"/></g><g class="status-chip status-chip-b"><rect x="8" y="28" width="72" height="16" rx="5" fill="#f6faff" stroke="#b8d4f5"/><circle cx="18" cy="36" r="3.5" fill="#ffb15c"/><rect x="26" y="33" width="22" height="6" rx="2" fill="#ffe3c2"/></g><g class="status-chip status-chip-c"><rect x="8" y="48" width="72" height="16" rx="5" fill="#fff" stroke="#e4e4e4"/><circle cx="18" cy="56" r="3.5" fill="#c5d0c9"/><rect x="26" y="53" width="34" height="6" rx="2" fill="#e8eee9"/></g><g class="status-pencil"><rect x="84" y="22" width="20" height="28" rx="6" fill="#1878ec"/><path d="M91 36.5l5.2-5.2 3.1 3.1-5.2 5.2H91v-3.1z" fill="#fff"/><path d="M95.4 32.1l1.55-1.55a1.4 1.4 0 0 1 2 0l1.5 1.5a1.4 1.4 0 0 1 0 2L98.9 35.6" stroke="#fff" stroke-width="1.1" stroke-linecap="round"/></g></svg></article></div></section>

    <section class="privacy-section" id="keamanan"><div class="section-wrap privacy-inner"><div class="privacy-copy"><h2>Privasi anggota tetap terjaga.</h2></div><div class="privacy-list"><article><span>01</span><div><h3>Masa simpan foto</h3><p>Dihapus dalam 1–3 hari, sesuai pengaturan lembaga.</p></div><b>↗</b></article><article><span>02</span><div><h3>Hanya data yang perlu</h3><p>Identitas, lokasi saat absen, dan selfie untuk validasi.</p></div><b>↗</b></article><article><span>03</span><div><h3>Perlindungan anti kecurangan</h3><p>Selfie langsung dari kamera dan lokasi diperiksa.</p></div><b>↗</b></article><article><span>04</span><div><h3>Persetujuan yang jelas</h3><p>Anggota menyetujui penggunaan data di awal.</p></div><b>↗</b></article></div></div></section>

    <section class="plans-section section-wrap" id="paket"><div class="section-head centered"><h2>Mulai gratis. Naik kelas saat butuh.</h2></div><div class="plan-tabs" role="tablist" aria-label="Jenis paket"><button role="tab" :aria-selected="planTab === 'monthly'" :class="{selected:planTab === 'monthly'}" @click="switchPlanTab('monthly')">Langganan Bulanan</button><button role="tab" :aria-selected="planTab === 'oneoff'" :class="{selected:planTab === 'oneoff'}" @click="switchPlanTab('oneoff')">Eceran & Custom</button></div>
      <div v-if="planTab === 'monthly'" class="plans-grid"><article v-for="plan in PLANS.filter(p => p.type === 'bulanan')" :key="plan.id" class="plan-card" :class="{popular:plan.id === 'pro'}"><div class="plan-summary"><div class="plan-top"><h3>{{ plan.name }}</h3><span v-if="plan.badge" class="plan-badge">{{ plan.badge }}</span></div><p class="capacity">{{ plan.capacity.max }} anggota</p><div class="plan-price" v-if="plan.id === 'starter'"><strong>Gratis</strong><small>selamanya</small></div><div class="plan-price" v-else><strong>{{ rupiah(plan.promoFirstMonth!) }}</strong><small>Bulan pertama</small><small>Berikutnya {{ rupiah(plan.priceMonthly!) }}/bln</small></div><button class="button plan-button" :class="{'button-dark':plan.id !== 'pro'}" @click="openCheckout(plan)">{{ plan.id === 'starter' ? 'Mulai Gratis' : `Pilih ${plan.name}` }} <span>→</span></button></div><ul><li v-for="feature in plan.features" :key="feature"><b>✓</b>{{ feature }}</li></ul></article></div>
      <div v-else class="plans-grid oneoff-grid"><article v-for="plan in PLANS.filter(p => p.type === 'eceran')" :key="plan.id" class="plan-card calc-card"><div class="plan-top"><h3>{{ plan.name }}</h3><span v-if="plan.badge" class="plan-badge">{{ plan.badge }}</span></div><p class="capacity">{{ plan.id === 'event' ? 'Absen acara tanpa komitmen bulanan.' : 'Solusi untuk institusi berskala besar.' }}</p><label class="calc-label">{{ plan.id === 'event' ? 'Jumlah peserta' : 'Jumlah anggota' }}<input v-if="plan.id === 'event'" v-model="eventPeople" type="text" inputmode="numeric" placeholder="250" @input="eventPeople=eventPeople.replace(/\D/g,'')" /><input v-else v-model="customPeople" type="text" inputmode="numeric" placeholder="800" @input="customPeople=customPeople.replace(/\D/g,'')" /></label><label v-if="plan.id === 'event'" class="calc-label">Lama aktif<select v-model="eventDays"><option :value="3">3 hari</option><option :value="5">5 hari</option><option :value="7">7 hari</option></select></label><p v-if="plan.id === 'event' && eventCount !== null && eventCount < 41" class="validation">Minimal 41 peserta. Untuk di bawahnya, <a href="#paket" @click="planTab='monthly'">Starter gratis cukup.</a></p><p v-if="plan.id === 'custom' && customCount !== null && customCount < 501" class="validation">Minimal 501 anggota. Pilih Pro untuk hingga 500.</p><div class="estimate"><small>{{ plan.id === 'event' ? 'Estimasi total' : 'Estimasi per bulan' }}</small><strong>{{ (plan.id === 'event' ? eventValid : customValid) ? rupiah(plan.id === 'event' ? calcEvent(eventCount!) : calcCustom(customCount!)) : '—' }}</strong><small>{{ plan.id === 'event' ? `${Number(eventPeople || 0).toLocaleString('id-ID')} peserta × Rp400 · aktif ${eventDays} hari` : `${Number(customPeople || 0).toLocaleString('id-ID')} anggota × Rp430` }}</small></div><button class="button plan-button button-dark" :disabled="plan.id === 'event' ? !eventValid : !customValid" @click="openCheckout(plan)">Pilih {{ plan.name }} <span>→</span></button></article></div>
    </section>

    <section class="compare-section" id="bandingkan"><div class="section-wrap"><div class="section-head"><h2>Bandingkan paket.</h2></div><div class="table-scroll"><table><thead><tr><th>Fitur</th><th>Starter</th><th>Hemat</th><th>Pro</th><th>Event</th><th>Custom</th></tr></thead><tbody><tr v-for="row in compareRows" :key="row[0]"><th>{{ row[0] }}</th><td v-for="(value,index) in row.slice(1)" :key="index" :class="{'check-cell':value==='✓'}">{{ value }}</td></tr></tbody></table></div></div></section>

    <section class="faq-section section-wrap" id="faq"><div class="section-head"><h2>Pertanyaan umum.</h2><img class="faq-image" :src="faqImage" alt="SobatAbsen" loading="lazy" /></div><div class="faq-list"><article v-for="(faq,index) in faqs" :key="faq[0]" class="faq-item"><button :aria-expanded="activeFaq === index" @click="activeFaq=activeFaq === index ? -1 : index"><span>{{ faq[0] }}</span><b>{{ activeFaq === index ? '−' : '+' }}</b></button><p v-if="activeFaq === index">{{ faq[1] }}</p></article></div></section>

    <section class="closing-cta">
      <div>
        <h2>Mulai absen lebih mudah.</h2>
        <div class="hero-actions">
          <a class="hero-pill-btn cta-pill-primary" href="#paket">Mulai Gratis</a>
          <a class="hero-pill-btn cta-pill-outline" href="#paket">
            <span>Lihat Paket</span>
            <svg class="hero-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 5v14" />
              <path d="m19 12-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>
      <span class="cta-star">✳</span>
    </section>

    <section class="brand-outro" aria-label="SobatAbsen">
      <h2>SobatAbs<span class="brand-outro-e">e</span><span class="brand-outro-n">n</span><svg class="brand-outro-star" aria-hidden="true" viewBox="0 0 100 100"><path d="M50 2 61 36 96 21 76 50 97 78 62 64 50 98 38 64 3 79 24 50 3 22 38 36Z" /></svg></h2>
    </section>

    <footer class="site-footer">
      <div class="footer-main">
        <a href="#top" class="brand footer-brand">sobat<span>absen</span><i>✳</i></a>
        <nav class="footer-nav" aria-label="Footer">
          <a href="#cara-kerja">Cara Kerja</a>
          <a href="#fitur">Fitur</a>
          <a href="#keamanan">Keamanan</a>
          <a href="#paket">Paket</a>
          <a href="#faq">FAQ</a>
        </nav>
      </div>
      <div class="footer-bottom">
        <span>© 2026 SobatAbsen</span>
      </div>
    </footer>

    <div v-if="checkout" class="modal-backdrop" @click.self="checkout=false" @keydown.esc="checkout=false"><section class="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title"><div class="checkout-topline"><a href="#top" class="brand modal-brand">sobat<span>absen</span><i>✳</i></a><button class="modal-close" aria-label="Tutup" @click="checkout=false">×</button></div><CheckoutStepper :current-step="paymentState === 'success' ? 4 : step" :steps="['Paket', 'Data lembaga', 'Pembayaran', 'Selesai']" /><Transition name="checkout-panel" mode="out-in"><div :key="`${paymentState}-${step}`" class="checkout-content"><template v-if="paymentState==='success'"><div class="modal-result success-result"><span>✓</span><p class="eyebrow">Pembayaran diterima</p><h2 id="checkout-title">Paketmu siap dimulai.</h2><p>Cek email Anda untuk membuat akun admin.</p><button class="button" @click="checkout=false">Selesai</button></div></template><template v-else-if="paymentState==='expired'"><div class="modal-result"><span>◷</span><p class="eyebrow">Waktu pembayaran habis</p><h2 id="checkout-title">Buat instruksi baru.</h2><button class="button" @click="paymentState='pending';step=4">Buat ulang</button></div></template><template v-else-if="paymentState==='failed'"><div class="modal-result"><span>!</span><p class="eyebrow">Pembayaran gagal</p><h2 id="checkout-title">Coba metode lain.</h2><button class="button" @click="step=3;paymentState='pending'">Kembali ke metode bayar</button></div></template><template v-else>
      <template v-if="step===1"><h2 id="checkout-title">Paket pilihanmu</h2><div class="checkout-summary"><div class="summary-icon">✳</div><div><b>{{ selectedPlan.name }}</b><small>{{ selectedPlan.type === 'bulanan' ? 'Paket bulanan' : 'Paket eceran' }}</small></div><strong>{{ rupiah(chosenTotal) }}</strong></div><button class="button modal-primary" @click="step=2">Lanjutkan <span>→</span></button></template>
      <template v-else-if="step===2"><h2 id="checkout-title">Data pengelola</h2><p class="modal-lead">Isi nama lembaga dan kontak pengelola.</p><div class="form-grid"><label>Nama lembaga<input v-model="checkoutForm.institution" required placeholder="Contoh: SMP Harapan" /></label><label>Nama pengelola<input v-model="checkoutForm.manager" required placeholder="Nama lengkap" /></label><label>Email<input v-model="checkoutForm.email" type="email" required placeholder="nama@email.com" /></label><label class="full-field">Nomor WhatsApp<input v-model="checkoutForm.whatsapp" type="tel" required placeholder="08xxxxxxxxxx" /></label></div><div class="modal-actions"><button class="text-button" @click="step=1">← Kembali</button><button class="button" :disabled="!Object.values(checkoutForm).every(Boolean)" @click="submitInstitution">Lanjutkan →</button></div></template>
      <template v-else-if="step===3"><h2 id="checkout-title">Pilih cara membayar.</h2><div class="checkout-summary payment-total"><span>Total pembayaran</span><strong>{{ rupiah(chosenTotal) }}</strong></div><div class="payment-options"><label v-for="method in [{id:'QRIS',label:'Q-ris'},{id:'Virtual Account',label:'VA (Virtual Account)'},{id:'E-Wallet',label:'E - Wallet'}]" :key="method.id" :class="{chosen:activePayment===method.id}"><input v-model="activePayment" type="radio" :value="method.id" /><span class="payment-option-label">{{ method.label }}</span><span class="payment-radio"></span></label></div><div class="modal-actions"><button class="text-button" @click="step=2">← Kembali</button><button class="button" @click="step=4">Bayar {{ rupiah(chosenTotal) }} →</button></div></template>
      <template v-else><h2 id="checkout-title">Selesaikan pembayaran.</h2><div class="pay-instruction"><template v-if="activePayment==='QRIS'"><div class="fake-qr">▦</div><b>Scan QR untuk membayar</b><small>Kedaluwarsa dalam 14:59</small></template><template v-else-if="activePayment==='Virtual Account'"><b>Nomor Virtual Account</b><strong>8808 1234 5678 9012</strong><button class="text-button">Salin nomor</button></template><template v-else><b>Lanjutkan pembayaran melalui {{ activePayment }}</b><button class="button">Buka aplikasi</button></template></div><div class="modal-actions"><button class="text-button" @click="step=3">← Kembali</button><button class="button" @click="paymentState='success'">Simulasikan berhasil</button></div><div class="dev-actions"><button @click="paymentState='expired'">Simulasikan kedaluwarsa</button><button @click="paymentState='failed'">Simulasikan gagal</button></div></template>
      </template></div></Transition><p class="checkout-footnote">Tidak ada pembayaran atau data yang dikirim.</p></section></div>
  </main>
</template>
