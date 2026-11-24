<script setup lang="ts">
import { ref } from 'vue'
import BlurText from './BlurText.vue'
import beranda from '../assets/mockup-beranda.png'
import kehadiran from '../assets/mockup-kehadiran.png'
import sesiAbsensi from '../assets/mockup-sesi-absensi.png'

const heading = { effect: 'blur', 'animate-by': 'words', direction: 'top', 'stagger-from': 'start', trigger: 'view', delay: 40, 'step-duration': 0.28, blur: 8, distance: 18 } as const
const slides = [
  { label: 'Beranda', img: beranda, alt: 'Dashboard beranda dengan ringkasan kehadiran anggota' },
  { label: 'Kehadiran dan rekap', img: kehadiran, alt: 'Daftar kehadiran anggota beserta status dan hasil rekap harian' },
  { label: 'Sesi absensi', img: sesiAbsensi, alt: 'Daftar sesi absensi dengan lokasi, jam, dan toleransi' },
]
const index = ref(0)
const preview = ref<HTMLDialogElement | null>(null)
// shortcut: manual controls only; add swipe or autoplay if engagement data justifies it
function step(delta: number) { index.value = (index.value + delta + slides.length) % slides.length }
function openPreview() { preview.value?.showModal() }
function closePreview() { preview.value?.close() }
</script>

<template>
  <section class="mockup-section section-wrap" id="mockup" aria-labelledby="mockup-title" @keydown.left.prevent="step(-1)" @keydown.right.prevent="step(1)">
    <div class="section-head">
      <h2 id="mockup-title"><BlurText v-bind="heading" tag="span" text="Semua kehadiran dalam satu layar." /></h2>
    </div>
    <div class="mockup-viewer">
      <button class="mockup-arrow mockup-prev" type="button" aria-label="Sebelumnya" @click="step(-1)">←</button>
      <button class="mockup-stage" type="button" aria-label="Perbesar tampilan" @click="openPreview">
        <Transition name="mockup-swap" mode="out-in">
          <img :key="index" :src="slides[index].img" :alt="slides[index].alt" loading="lazy" />
        </Transition>
      </button>
      <button class="mockup-arrow mockup-next" type="button" aria-label="Berikutnya" @click="step(1)">→</button>
    </div>
    <div class="mockup-controls">
      <div class="mockup-dots" role="group" aria-label="Pilih tampilan">
        <button v-for="(slide, i) in slides" :key="slide.label" type="button" :class="{ active: index === i }" :aria-current="index === i ? 'true' : undefined" :aria-label="slide.label" @click="index = i"></button>
      </div>
      <p class="mockup-caption" aria-live="polite">{{ slides[index].label }}</p>
    </div>
    <dialog ref="preview" class="mockup-dialog" aria-label="Pratinjau tampilan" @click.self="closePreview">
      <button class="mockup-close" type="button" aria-label="Tutup pratinjau" @click="closePreview">×</button>
      <img :src="slides[index].img" :alt="slides[index].alt" />
    </dialog>
  </section>
</template>

<style scoped>
.mockup-section{padding-top:96px;padding-bottom:96px}
.mockup-section .section-head h2{max-width:680px;margin:0}
.mockup-viewer{display:grid;grid-template-columns:44px minmax(0,760px) 44px;justify-content:center;align-items:center;gap:14px;margin:36px auto 0}
.mockup-stage{width:100%;aspect-ratio:1460/1268;padding:10px;border:1px solid #fff;border-radius:18px;background:var(--mint2);cursor:zoom-in}
.mockup-dialog{width:min(92vw,1200px);max-width:none;max-height:92dvh;padding:0;border:0;background:transparent;overflow:visible}
.mockup-dialog::backdrop{background:rgba(5,11,18,.82);backdrop-filter:blur(6px)}
.mockup-dialog img{display:block;max-width:100%;max-height:86dvh;object-fit:contain;border-radius:12px}
.mockup-close{position:absolute;top:-14px;right:-14px;width:40px;height:40px;border:1px solid rgba(255,255,255,.35);border-radius:999px;background:#111;color:#fff;font-size:20px;line-height:1}
.mockup-stage img{display:block;width:100%;height:100%;object-fit:contain}
.mockup-swap-enter-active,.mockup-swap-leave-active{transition:opacity .18s ease,transform .18s ease}
.mockup-swap-enter-from{opacity:0;transform:translateX(8px)}
.mockup-swap-leave-to{opacity:0;transform:translateX(-8px)}
.mockup-controls{display:flex;align-items:center;justify-content:space-between;gap:20px;width:min(100%,760px);margin:20px auto 0}
.mockup-dots{display:flex;align-items:center;gap:2px}
.mockup-dots button{display:grid;place-items:center;width:24px;height:24px;padding:0;border:0;border-radius:999px;background:transparent}
.mockup-dots button::after{content:'';width:8px;height:8px;border-radius:999px;background:var(--line);transition:width .2s ease,background-color .2s ease}
.mockup-dots button.active::after{width:22px;background:var(--green)}
.mockup-caption{margin:0;color:var(--muted);font-size:13px!important;font-weight:600}
.mockup-arrow{width:44px;height:44px;border:1px solid var(--line);border-radius:999px;background:#fff;color:var(--ink);font-size:17px;line-height:1;transition:border-color .2s ease,color .2s ease,transform .12s ease}
.mockup-arrow:hover{border-color:var(--green);color:var(--green)}
.mockup-arrow:active{transform:translateY(1px)}
@media(max-width:950px){.mockup-viewer{grid-template-columns:1fr 1fr;gap:12px}.mockup-stage{grid-column:1/-1;grid-row:1}.mockup-prev{grid-column:1;grid-row:2;justify-self:end}.mockup-next{grid-column:2;grid-row:2;justify-self:start}}
@media(max-width:650px){.mockup-section{padding-top:70px;padding-bottom:70px}.mockup-viewer{margin-top:26px}.mockup-controls{flex-wrap:wrap;justify-content:center}.mockup-caption{order:3;width:100%;text-align:center}.mockup-close{top:6px;right:6px;background:rgba(17,17,17,.85)}}
</style>
