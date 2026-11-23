<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const comments = [
  'Absensi QR dan selfie membuat pencatatan hadir lebih praktis.',
  'Admin bisa melihat rekap kehadiran dari satu dashboard.',
  'Anggota dapat absen melalui browser tanpa memasang aplikasi.',
  'Jadwal absensi lebih tertib karena lokasi ikut dicatat.',
  'Laporan harian jadi lebih mudah disiapkan untuk tim.',
  'Pengecekan lokasi membantu memastikan anggota hadir di titik yang sesuai.',
  'Beberapa lokasi bisa dikelola lewat satu dashboard.',
  'Data kehadiran lebih mudah diekspor untuk kebutuhan laporan.',
  'Admin bisa memantau kehadiran saat itu juga.',
  'Foto selfie digunakan untuk validasi dan dihapus sesuai pengaturan lembaga.',
]
const avatarPhotos = [
  'https://images.unsplash.com/photo-1578933301026-3e5e901126dc',
  'https://images.unsplash.com/photo-1745434159123-5b99b94206ca',
  'https://images.unsplash.com/photo-1543965170-4c01a586684e',
  'https://images.unsplash.com/photo-1654516311866-5db2ae873c25',
  'https://images.unsplash.com/photo-1746813629025-67ccab1f4edd',
  'https://images.unsplash.com/photo-1687360440741-f5df549b352d',
]
const leftComments = comments.slice(0, 5)
const rightComments = comments.slice(5)
const quoteIndex = ref(0)
const pointerOver = ref(false)
const focusWithin = ref(false)
const reducedMotion = ref(false)
const motionPaused = computed(() => pointerOver.value || focusWithin.value)
const currentComment = computed(() => comments[quoteIndex.value])
const avatarFor = (index: number, offset = 0) => `${avatarPhotos[(index + offset) % avatarPhotos.length]}?auto=format&fit=crop&w=80&h=80&q=72`
let rotation: ReturnType<typeof setInterval> | undefined
let motionPreference: MediaQueryList | undefined

function syncRotation() {
  clearInterval(rotation)
  if (motionPaused.value || reducedMotion.value) return
  rotation = setInterval(() => { quoteIndex.value = (quoteIndex.value + 1) % comments.length }, 10_000)
}
function updateMotionPreference() {
  reducedMotion.value = motionPreference?.matches ?? false
}

watch([motionPaused, reducedMotion], syncRotation)
onMounted(() => {
  motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)')
  motionPreference.addEventListener('change', updateMotionPreference)
  updateMotionPreference()
  syncRotation()
})
onBeforeUnmount(() => {
  clearInterval(rotation)
  motionPreference?.removeEventListener('change', updateMotionPreference)
})
</script>

<template>
  <section class="testimonials-section" aria-labelledby="testimonials-title">
    <div class="testimonials-inner">
      <div class="testimonials-intro">
        <h2 id="testimonials-title">Kehadiran yang lebih mudah dikelola.</h2>
        <a class="testimonials-cta" href="#paket"><span aria-hidden="true">✳</span> Lihat paket <b aria-hidden="true">↗</b></a>

        <div class="testimonials-divider"></div>
        <div class="featured-comment" aria-live="off">
          <span class="quote-mark" aria-hidden="true">“</span>
          <Transition name="comment-change" mode="out-in">
            <blockquote :key="quoteIndex">{{ currentComment }}</blockquote>
          </Transition>
          <div class="featured-attribution">
            <img :src="avatarFor(quoteIndex)" alt="" width="36" height="36" loading="lazy" decoding="async" />
            <small>Contoh isi komentar · ganti dengan ulasan pelanggan</small>
          </div>
        </div>
      </div>

      <div
        class="testimonials-wall"
        :class="{ 'is-paused': motionPaused || reducedMotion }"
        role="region"
        tabindex="0"
        aria-label="Komentar bergerak; arahkan pointer atau fokuskan untuk menghentikan sementara."
        @pointerenter="pointerOver = true"
        @pointerleave="pointerOver = false"
        @focusin="focusWithin = true"
        @focusout="focusWithin = false"
      >
        <div class="testimonial-columns" aria-label="Contoh komentar SobatAbsen">
          <div class="testimonial-window">
            <div class="testimonial-track move-up">
              <div class="testimonial-stack">
                <article v-for="(comment, index) in leftComments" :key="`left-${index}`" class="comment-card">
                  <p>{{ comment }}</p>
                  <div class="comment-attribution"><img :src="avatarFor(index)" alt="" width="36" height="36" loading="lazy" decoding="async" /><small>Contoh komentar</small></div>
                </article>
              </div>
              <div class="testimonial-stack" aria-hidden="true">
                <article v-for="(comment, index) in leftComments" :key="`left-copy-${index}`" class="comment-card">
                  <p>{{ comment }}</p>
                  <div class="comment-attribution"><img :src="avatarFor(index)" alt="" width="36" height="36" loading="lazy" decoding="async" /><small>Contoh komentar</small></div>
                </article>
              </div>
            </div>
          </div>
          <div class="testimonial-window">
            <div class="testimonial-track move-down">
              <div class="testimonial-stack">
                <article v-for="(comment, index) in rightComments" :key="`right-${index}`" class="comment-card">
                  <p>{{ comment }}</p>
                  <div class="comment-attribution"><img :src="avatarFor(index, 5)" alt="" width="36" height="36" loading="lazy" decoding="async" /><small>Contoh komentar</small></div>
                </article>
              </div>
              <div class="testimonial-stack" aria-hidden="true">
                <article v-for="(comment, index) in rightComments" :key="`right-copy-${index}`" class="comment-card">
                  <p>{{ comment }}</p>
                  <div class="comment-attribution"><img :src="avatarFor(index, 5)" alt="" width="36" height="36" loading="lazy" decoding="async" /><small>Contoh komentar</small></div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style>
.testimonials-section{padding:96px 0;background:#f8f9fb}
.testimonials-inner{display:grid;grid-template-columns:minmax(280px,.8fr) minmax(0,1.2fr);gap:58px;max-width:1280px;margin:0 auto;padding:0 42px}
.testimonials-intro{padding:28px 0}
.testimonials-intro .eyebrow{margin-bottom:12px;color:#1878ec}
.testimonials-intro h2{max-width:440px;margin:0;color:var(--ink);font-family:Manrope,sans-serif;font-size:var(--text-section-heading);font-weight:800;letter-spacing:-2px;line-height:1.12;text-wrap:balance}
.testimonials-cta{display:inline-flex;align-items:center;gap:9px;margin-top:22px;padding:8px 13px;border-radius:999px;background:#eceef1;color:#17181b;font-size:.875rem;font-weight:700}
.testimonials-cta>span{color:#1878ec}
.testimonials-cta b{margin-left:5px;font-size:1rem}
.testimonials-divider{height:1px;margin:46px 0 34px;background:linear-gradient(90deg,#dfe2e7,transparent)}
.featured-comment{max-width:440px;min-height:174px}
.quote-mark{display:block;height:37px;color:#d7dbe2;font:700 4.5rem/.75 Georgia,serif}
.featured-comment blockquote{margin:0;color:#24262b;font-size:1rem;line-height:1.65}
.featured-attribution{display:flex;align-items:center;gap:10px;margin-top:14px}
.featured-attribution img{width:36px;height:36px;flex:0 0 36px;border-radius:50%;object-fit:cover;background:#e8ebef}
.featured-attribution small{margin:0;color:#737986;font-size:.8125rem}
.comment-change-enter-active,.comment-change-leave-active{transition:opacity .22s ease}
.comment-change-enter-from,.comment-change-leave-to{opacity:0}
.testimonials-wall{position:relative;min-width:0;isolation:isolate;padding-top:30px;background-image:radial-gradient(#d6e2f3 .8px,transparent .8px);background-position:0 0;background-size:8px 8px}
.testimonial-columns{display:grid;height:520px;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;overflow:hidden}
.testimonial-window{min-width:0;overflow:hidden;mask-image:linear-gradient(to bottom,transparent 0%,#000 9%,#000 91%,transparent 100%);-webkit-mask-image:linear-gradient(to bottom,transparent 0%,#000 9%,#000 91%,transparent 100%)}
.testimonial-track{display:flex;flex-direction:column;will-change:transform}
.testimonial-track.move-up{animation:testimonials-up 72s linear infinite}
.testimonial-track.move-down{animation:testimonials-down 84s linear infinite}
.testimonial-stack{display:grid;gap:14px;padding-bottom:14px}
.comment-card{padding:16px;border:1px solid #e4e6e9;border-radius:16px;background:rgba(255,255,255,.96)}
.comment-card p{margin:0;color:#22252a;font-size:.875rem!important;line-height:1.5}
.comment-attribution{display:flex;align-items:center;gap:10px;margin-top:14px}
.comment-attribution img{width:36px;height:36px;flex:0 0 36px;border-radius:50%;object-fit:cover;background:#e8ebef}
.comment-card small{display:block;margin-top:0;color:#737986;font-size:.75rem}
.testimonials-wall.is-paused .testimonial-track{animation-play-state:paused}
.testimonials-wall:focus-visible{outline:3px solid #1878ec;outline-offset:4px}
@keyframes testimonials-up{to{transform:translateY(-50%)}}
@keyframes testimonials-down{from{transform:translateY(-50%)}to{transform:translateY(0)}}
@media(max-width:900px){.testimonials-section{padding:72px 0}.testimonials-inner{grid-template-columns:1fr;gap:30px;padding:0 25px}.testimonials-intro{padding:0}.testimonials-intro h2,.featured-comment{max-width:600px}.testimonials-divider{margin:30px 0 22px}.testimonials-wall{padding-top:34px}.testimonial-columns{height:460px}}
@media(max-width:650px){.testimonials-section{padding:62px 0}.testimonials-inner{gap:22px;padding:0 22px}.testimonials-divider{margin:26px 0 20px}.featured-comment{min-height:150px}.testimonial-columns{height:400px;gap:10px}.testimonial-stack{gap:10px;padding-bottom:10px}.comment-card{padding:13px;border-radius:13px}.comment-card p{font-size:.875rem!important}.comment-attribution{gap:8px;margin-top:12px}.comment-attribution img{width:32px;height:32px;flex-basis:32px}.comment-card small{font-size:.75rem}}
@media(prefers-reduced-motion:reduce){.testimonial-track{animation:none!important}.comment-change-enter-active,.comment-change-leave-active{transition:none}}
</style>
