<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { PLANS, rupiah, calcEvent, calcCustom, type Plan } from './data/plans'
import { animatePlanTabChange, setupAnimations } from './animations'
import BlurText from './components/BlurText.vue'
import VariableProximity from './components/VariableProximity.vue'
import CheckoutStepper from './components/CheckoutStepper.vue'
import RubberSegment from './components/RubberSegment.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'
import MockupSection from './components/MockupSection.vue'
import SplitText from './components/SplitText.vue'
import FeaturesShowcase from './components/FeaturesShowcase.vue'
import AccordionGallery from './components/AccordionGallery.vue'
import headerPhoto from './assets/header2.webp'
import faqImage from './assets/sobatabsen1.webp'
import faqImage2 from './assets/sobatabsen2.webp'
import stepImage1 from './assets/langkah-langkah/gambar1.webp'
import stepImage2 from './assets/langkah-langkah/gambar2.webp'
import stepImage3 from './assets/langkah-langkah/gambar3.webp'
import audienceSchool from './assets/Section Untuk/section-sekolah.webp'
import audienceCommunity from './assets/Section Untuk/section-yayasan.webp'
import audienceOffice from './assets/Section Untuk/section-kantor.webp'
import audienceEvent from './assets/Section Untuk/section-eo.webp'

const blurHeading = { effect: 'blur', 'animate-by': 'words', direction: 'top', 'stagger-from': 'start', trigger: 'view', delay: 40, 'step-duration': 0.28, blur: 8, distance: 18 } as const
const heroProximityRef = ref<HTMLElement | null>(null)
const planTab = ref<'monthly' | 'oneoff'>('monthly')
const eventPeople = ref('250')
const eventDays = ref(5)
const customPeople = ref('800')
const customCategory = ref('Sekolah')
const activeStep = ref(0)
const howSteps = [
  { title: 'Aktifkan lokasi', desc: 'Absen dari radius yang ditentukan.', img: stepImage1 },
  { title: 'Scan QR', desc: 'Gunakan QR yang tersedia di lokasi.', img: stepImage2 },
  { title: 'Ambil selfie', desc: 'Gunakan kamera langsung, bukan galeri.', img: stepImage3 },
]
const audienceItems = [
  { image: audienceSchool, label: 'Sekolah & Kampus', alt: 'Absen siswa per kelas, tanpa kertas.' },
  { image: audienceCommunity, label: 'Yayasan & Komunitas', alt: 'Pantau kehadiran kegiatan dan pengurus.' },
  { image: audienceOffice, label: 'Pabrik & Kantor', alt: 'Kehadiran karyawan di titik kerja yang tepat.' },
  { image: audienceEvent, label: 'Event Organizer', alt: 'Absen peserta acara, aktif hanya beberapa hari.' },
]
const activeFaq = ref(0)
const menuOpen = ref(false)
const checkout = ref(false)
const step = ref(1)
const selectedPlan = ref<Plan>(PLANS[0])
const activePayment = ref('QRIS')
const checkoutForm = ref({ institution: '', category: '', manager: '', email: '', whatsapp: '' })
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
function handlePlanTabChange(value: string) {
  if (value === 'monthly' || value === 'oneoff') void switchPlanTab(value)
}

onMounted(() => { cleanupAnimations = setupAnimations() })
onBeforeUnmount(() => { cleanupAnimations(); cleanupPlanTabAnimation() })
</script>

<template>
  <main>
    <header class="topbar" :class="{ 'menu-open': menuOpen }">
      <div class="topbar-pill">
        <a href="#top" class="brand" aria-label="SobatAbsen beranda">sobat<span>absen</span><i>✳</i></a>
        <button class="menu-toggle" aria-label="Buka menu" :aria-expanded="menuOpen" aria-controls="primary-nav" @click="menuOpen = !menuOpen"><span></span><span></span><span></span></button>
        <nav id="primary-nav" :class="{ open: menuOpen }" aria-label="Navigasi utama" @click="menuOpen = false">
          <a href="#cara-kerja">Cara Kerja</a><a href="#fitur">Fitur</a><a href="#paket">Paket</a><a href="#faq">FAQ</a>
          <a class="button button-small" href="#paket">Mulai Gratis</a>
        </nav>
      </div>
    </header>

    <section class="hero" id="top">
      <img class="hero-photo" :src="headerPhoto" alt="" aria-hidden="true" />
      <div class="hero-text">
        <h1 class="hero-title" ref="heroProximityRef">
          <span class="hero-split"><VariableProximity label="Absen selesai" :container-ref="heroProximityRef" :radius="110" falloff="gaussian" :smoothing="0.25" :scale="1.03" :lift="0.04" from-font-variation-settings="'wght' 400, 'opsz' 14" to-font-variation-settings="'wght' 900, 'opsz' 60" /></span>
          <span class="hero-split hero-split-accent"><VariableProximity label="dalam hitungan detik." :container-ref="heroProximityRef" :radius="110" falloff="gaussian" :smoothing="0.25" :scale="1.03" :lift="0.04" from-color="#c5e0ff" to-color="#ffffff" from-font-variation-settings="'wght' 400, 'opsz' 14" to-font-variation-settings="'wght' 900, 'opsz' 60" /></span>
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
      <div class="hero-corner" aria-hidden="true">
        <SplitText text="sobat" tag="span" color="#111" effect="rise" split-type="chars" trigger="load" :delay="35" :duration="1.6" :mask="true" text-align="left" />
        <SplitText text="absen" tag="span" color="#1878ec" effect="rise" split-type="chars" trigger="load" :delay="35" :duration="1.6" :mask="true" text-align="left" />
        <i>✳</i>
      </div>
    </section>

    <section class="usecases section-wrap" id="untuk-siapa">
      <div class="section-head">
        <h2><BlurText v-bind="blurHeading" tag="span" text="Untuk berbagai lembaga." /></h2>
      </div>
      <AccordionGallery
        class="mt-12"
        :items="audienceItems"
        :default-index="0"
        :expand-ratio="0.42"
        trigger="hover"
        accent-color="#1878ec"
        overlay-color="#060010"
        text-color="#ffffff"
        grayscale
        show-labels
        :duration="0.5"
        ease="power3.out"
        :parallax="0.35"
        :tilt="6"
        :stagger="0.05"
        :height="480"
        :gap="8"
        :radius="14"
        orientation="horizontal"
      />
    </section>

    <section class="how-section" id="cara-kerja">
      <div class="section-wrap">
        <div class="section-head">
          <h2>Absen dalam <em><BlurText v-bind="blurHeading" tag="span" text="tiga langkah." /></em></h2>
        </div>
        <div class="how-inner">
          <div class="how-visual" aria-hidden="true">
            <div v-for="(step, index) in howSteps" :key="step.title" class="how-visual-panel" :class="{ active: activeStep === index }"><img :src="step.img" :alt="step.title" /></div>
          </div>
          <div class="steps" role="tablist" aria-label="Alur absensi">
            <button v-for="(step, index) in howSteps" :key="step.title" type="button" role="tab" :aria-selected="activeStep === index" class="step" :class="{ 'is-active': activeStep === index }" @click="activeStep = index" @mouseenter="activeStep = index">
              <h3>{{ step.title }}</h3>
              <p>{{ step.desc }}</p>
            </button>
          </div>
        </div>
      </div>
    </section>

    <MockupSection />

    <FeaturesShowcase />

    <section class="plans-section section-wrap" id="paket"><div class="section-head centered"><h2><BlurText v-bind="blurHeading" tag="span" text="Mulai gratis. Naik kelas saat butuh." /></h2></div><RubberSegment :items="[{ value: 'monthly', label: 'Langganan Bulanan' }, { value: 'oneoff', label: 'Eceran & Custom' }]" :value="planTab" track-color="#fff" thumb-color="#111" text-color="#111" active-text-color="#fff" size="md" :radius="999" :inset="3" equal-slots :stretch="100" :squash="3" :speed="1" :glide="75" draggable aria-label="Jenis paket" class-name="plan-tabs rubber-segment-plan" @change="handlePlanTabChange" />
      <div v-if="planTab === 'monthly'" class="plans-grid"><article v-for="plan in PLANS.filter(p => p.type === 'bulanan')" :key="plan.id" class="plan-card" :class="{popular:plan.id === 'pro', value:plan.id === 'hemat'}"><div class="plan-summary"><svg v-if="plan.id === 'pro' || plan.id === 'custom'" class="plan-orbit" viewBox="0 0 100 100" fill="none" aria-hidden="true"><circle cx="50" cy="50" r="34" stroke="currentColor" stroke-width="1" opacity=".35"/><path d="M50 16a34 34 0 0 1 29.4 17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle class="plan-orbit-dot" cx="79" cy="33" r="3.5" fill="currentColor"/><circle cx="50" cy="50" r="9" stroke="currentColor" stroke-width="1" opacity=".45"/><path d="M50 41v18M41 50h18" stroke="currentColor" stroke-width="1" opacity=".5"/></svg><div class="plan-top"><h3>{{ plan.name }}</h3><span v-if="plan.id === 'hemat'" class="plan-highlight">Paling hemat</span><span v-else-if="plan.id === 'pro'" class="plan-highlight">Paling lengkap</span></div><p class="capacity">{{ plan.capacity.max }} anggota</p><div class="plan-price" v-if="plan.id === 'starter'"><strong>Gratis</strong><small>selamanya</small></div><div class="plan-price" v-else><strong>{{ rupiah(plan.promoFirstMonth!) }}</strong><small>Bulan pertama</small><small>Berikutnya {{ rupiah(plan.priceMonthly!) }}/bln</small></div><button class="button plan-button" :class="{'button-dark':plan.id !== 'pro'}" @click="openCheckout(plan)">{{ plan.id === 'starter' ? 'Mulai Gratis' : `Pilih ${plan.name}` }} <span>→</span></button></div><ul><li v-for="feature in plan.features" :key="feature"><b>✓</b>{{ feature }}</li></ul></article></div>
      <div v-else class="plans-grid oneoff-grid"><article v-for="plan in PLANS.filter(p => p.type === 'eceran')" :key="plan.id" class="plan-card calc-card" :class="{ value: plan.id === 'event', popular: plan.id === 'custom' }"><div class="plan-summary"><svg v-if="plan.id === 'pro' || plan.id === 'custom'" class="plan-orbit" viewBox="0 0 100 100" fill="none" aria-hidden="true"><circle cx="50" cy="50" r="34" stroke="currentColor" stroke-width="1" opacity=".35"/><path d="M50 16a34 34 0 0 1 29.4 17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/><circle class="plan-orbit-dot" cx="79" cy="33" r="3.5" fill="currentColor"/><circle cx="50" cy="50" r="9" stroke="currentColor" stroke-width="1" opacity=".45"/><path d="M50 41v18M41 50h18" stroke="currentColor" stroke-width="1" opacity=".5"/></svg><div class="plan-top"><h3>{{ plan.name }}</h3><span class="plan-highlight">{{ plan.id === 'event' ? plan.badge : 'Paling lengkap' }}</span></div><p class="capacity">{{ plan.id === 'event' ? 'Absen acara tanpa komitmen bulanan.' : 'Solusi untuk institusi berskala besar.' }}</p><label class="calc-label">{{ plan.id === 'event' ? 'Jumlah peserta' : 'Jumlah anggota' }}<input v-if="plan.id === 'event'" v-model="eventPeople" type="text" inputmode="numeric" placeholder="250" @input="eventPeople=eventPeople.replace(/\D/g,'')" /><input v-else v-model="customPeople" type="text" inputmode="numeric" placeholder="800" @input="customPeople=customPeople.replace(/\D/g,'')" /></label><label v-if="plan.id === 'custom'" class="calc-label">Kategori institusi<select v-model="customCategory"><option>Sekolah</option><option>Yayasan</option><option>Pabrik</option><option>Kantor</option><option>Event</option></select></label><label v-if="plan.id === 'event'" class="calc-label">Lama aktif<select v-model="eventDays"><option :value="3">3 hari</option><option :value="5">5 hari</option><option :value="7">7 hari</option></select></label><p v-if="plan.id === 'event' && eventCount !== null && eventCount < 41" class="validation">Minimal 41 peserta. Untuk di bawahnya, <a href="#paket" @click="planTab='monthly'">Starter gratis cukup.</a></p><p v-if="plan.id === 'custom' && customCount !== null && customCount < 501" class="validation">Minimal 501 anggota. Pilih Pro untuk hingga 500.</p><div class="estimate plan-price"><small>{{ plan.id === 'event' ? 'Estimasi total' : 'Estimasi per bulan' }}</small><strong>{{ (plan.id === 'event' ? eventValid : customValid) ? rupiah(plan.id === 'event' ? calcEvent(eventCount!) : calcCustom(customCount!)) : '—' }}</strong><small>{{ plan.id === 'event' ? `${Number(eventPeople || 0).toLocaleString('id-ID')} peserta × Rp400 · aktif ${eventDays} hari` : `${Number(customPeople || 0).toLocaleString('id-ID')} anggota × Rp430` }}</small></div><button class="button plan-button" :disabled="plan.id === 'event' ? !eventValid : !customValid" @click="openCheckout(plan)">Pilih {{ plan.name }} <span>→</span></button></div><ul><li v-for="feature in plan.features" :key="feature"><b>✓</b>{{ feature }}</li></ul></article></div>
    </section>

    <section class="faq-section section-wrap" id="faq"><div class="section-head"><h2><BlurText v-bind="blurHeading" tag="span" text="Pertanyaan umum." /></h2><span class="faq-image-swap"><img class="faq-image" :src="faqImage" alt="SobatAbsen" loading="lazy" /><img class="faq-image faq-image-hover" :src="faqImage2" alt="" aria-hidden="true" loading="lazy" /></span></div><div class="faq-list"><article v-for="(faq,index) in faqs" :key="faq[0]" class="faq-item"><button :aria-expanded="activeFaq === index" @click="activeFaq=activeFaq === index ? -1 : index"><span>{{ faq[0] }}</span><b>{{ activeFaq === index ? '−' : '+' }}</b></button><Transition name="faq-answer"><div v-if="activeFaq === index" class="faq-answer"><p>{{ faq[1] }}</p></div></Transition></article></div></section>

    <TestimonialsSection />

    <section class="closing-cta">
      <div>
        <h2><BlurText v-bind="blurHeading" tag="span" text="Mulai absen lebih mudah." /></h2>
        <div class="hero-actions">
          <a class="hero-pill-btn cta-pill-primary" href="#paket">Mulai Gratis</a>
          <a class="hero-pill-btn cta-pill-outline" href="#paket">
            <span>Lihat Paket</span>
            <svg class="hero-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M12 19V5" />
              <path d="m5 12 7-7 7 7" />
            </svg>
          </a>
        </div>
      </div>
      <span class="cta-star">✳</span>
    </section>

    <footer class="site-footer">
      <div class="footer-main">
        <a href="#top" class="brand footer-brand">sobat<span>absen</span><i>✳</i></a>
        <nav class="footer-nav" aria-label="Footer">
          <a href="#cara-kerja">Cara Kerja</a>
          <a href="#fitur">Fitur</a>
          <a href="#paket">Paket</a>
          <a href="#faq">FAQ</a>
        </nav>
      </div>
      <div class="footer-bottom">
        <span>© 2026 SobatAbsen</span>
        <div class="footer-contact">
          <a href="mailto:sobatabsen@gmail.com">sobatabsen@gmail.com</a>
          <a href="https://wa.me/62812345678910">0812345678910</a>
        </div>
      </div>
    </footer>

    <div v-if="checkout" class="modal-backdrop" @click.self="checkout=false" @keydown.esc="checkout=false"><section class="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title"><div class="checkout-topline"><a href="#top" class="brand modal-brand">sobat<span>absen</span><i>✳</i></a><button class="modal-close" aria-label="Tutup" @click="checkout=false">×</button></div><CheckoutStepper :current-step="paymentState === 'success' ? 4 : step" :steps="['Paket', 'Data lembaga', 'Pembayaran', 'Selesai']" /><Transition name="checkout-panel" mode="out-in"><div :key="`${paymentState}-${step}`" class="checkout-content"><template v-if="paymentState==='success'"><div class="modal-result success-result"><span>✓</span><p class="eyebrow">Pembayaran diterima</p><h2 id="checkout-title">Paketmu siap dimulai.</h2><p>Cek email Anda untuk membuat akun admin.</p><button class="button" @click="checkout=false">Selesai</button></div></template><template v-else-if="paymentState==='expired'"><div class="modal-result"><span>◷</span><p class="eyebrow">Waktu pembayaran habis</p><h2 id="checkout-title">Buat instruksi baru.</h2><button class="button" @click="paymentState='pending';step=4">Buat ulang</button></div></template><template v-else-if="paymentState==='failed'"><div class="modal-result"><span>!</span><p class="eyebrow">Pembayaran gagal</p><h2 id="checkout-title">Coba metode lain.</h2><button class="button" @click="step=3;paymentState='pending'">Kembali ke metode bayar</button></div></template><template v-else>
      <template v-if="step===1"><h2 id="checkout-title">Paket pilihanmu</h2><div class="checkout-summary"><div class="summary-icon">✳</div><div><b>{{ selectedPlan.name }}</b><small>{{ selectedPlan.type === 'bulanan' ? 'Paket bulanan' : 'Paket eceran' }}</small></div><strong>{{ rupiah(chosenTotal) }}</strong></div><button class="button modal-primary" @click="step=2">Lanjutkan <span>→</span></button></template>
      <template v-else-if="step===2"><h2 id="checkout-title">Data pengelola</h2><p class="modal-lead">Isi nama lembaga dan kontak pengelola.</p><div class="form-grid"><label>Nama lembaga<input v-model="checkoutForm.institution" required placeholder="Contoh: SMP Harapan" /></label><label>Kategori lembaga<select v-model="checkoutForm.category" required><option value="" disabled>Pilih kategori</option><option>Sekolah</option><option>Yayasan</option><option>Pabrik</option><option>Kantor</option><option>Event</option></select></label><label>Nama pengelola<input v-model="checkoutForm.manager" required placeholder="Nama lengkap" /></label><label>Email<input v-model="checkoutForm.email" type="email" required placeholder="nama@email.com" /></label><label class="full-field">Nomor WhatsApp<input v-model="checkoutForm.whatsapp" type="tel" required placeholder="08xxxxxxxxxx" /></label></div><div class="modal-actions"><button class="text-button" @click="step=1">← Kembali</button><button class="button" :disabled="!Object.values(checkoutForm).every(Boolean)" @click="submitInstitution">Lanjutkan →</button></div></template>
      <template v-else-if="step===3"><h2 id="checkout-title">Pilih cara membayar.</h2><div class="checkout-summary payment-total"><span>Total pembayaran</span><strong>{{ rupiah(chosenTotal) }}</strong></div><div class="payment-options"><label v-for="method in [{id:'QRIS',label:'Q-ris'},{id:'Virtual Account',label:'VA (Virtual Account)'},{id:'E-Wallet',label:'E - Wallet'}]" :key="method.id" :class="{chosen:activePayment===method.id}"><input v-model="activePayment" type="radio" :value="method.id" /><span class="payment-option-label">{{ method.label }}</span><span class="payment-radio"></span></label></div><div class="modal-actions"><button class="text-button" @click="step=2">← Kembali</button><button class="button" @click="step=4">Bayar {{ rupiah(chosenTotal) }} →</button></div></template>
      <template v-else><h2 id="checkout-title">Selesaikan pembayaran.</h2><div class="pay-instruction"><template v-if="activePayment==='QRIS'"><div class="fake-qr">▦</div><b>Scan QR untuk membayar</b><small>Kedaluwarsa dalam 14:59</small></template><template v-else-if="activePayment==='Virtual Account'"><b>Nomor Virtual Account</b><strong>8808 1234 5678 9012</strong><button class="text-button">Salin nomor</button></template><template v-else><b>Lanjutkan pembayaran melalui {{ activePayment }}</b><button class="button">Buka aplikasi</button></template></div><div class="modal-actions"><button class="text-button" @click="step=3">← Kembali</button><button class="button" @click="paymentState='success'">Simulasikan berhasil</button></div><div class="dev-actions"><button @click="paymentState='expired'">Simulasikan kedaluwarsa</button><button @click="paymentState='failed'">Simulasikan gagal</button></div></template>
      </template></div></Transition><p class="checkout-footnote">Tidak ada pembayaran atau data yang dikirim.</p></section></div>
  </main>
</template>
