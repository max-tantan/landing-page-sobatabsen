<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { AnimationValues, GsapContext, GsapSplitTextInstance, GsapTween } from '../animations'

type Effect = 'rise' | 'fade' | 'blur' | 'flip' | 'pop' | 'skew' | 'wave'
type SplitKind = 'chars' | 'words' | 'lines' | 'words, chars'
type StaggerFrom = 'start' | 'center' | 'end' | 'edges' | 'random'
type Trigger = 'view' | 'load' | 'hover' | 'click'

const props = withDefaults(defineProps<{
  text: string
  tag?: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
  effect?: Effect
  splitType?: SplitKind
  delay?: number
  duration?: number
  ease?: string
  staggerFrom?: StaggerFrom
  trigger?: Trigger
  loop?: boolean
  loopDelay?: number
  mask?: boolean
  threshold?: number
  rootMargin?: string
  textAlign?: string
  color?: string
  accentColor?: string
  from?: AnimationValues
  to?: AnimationValues
}>(), {
  tag: 'span', className: '', effect: 'rise', splitType: 'chars', delay: 35,
  duration: 0.8, staggerFrom: 'start', trigger: 'view', loop: false,
  loopDelay: 1.5, mask: false, threshold: 0.1, rootMargin: '-100px', textAlign: 'left',
})

const emit = defineEmits<{ letterAnimationComplete: [] }>()
const element = ref<HTMLElement | null>(null)
let cleanup = () => {}

function effectValues(fontSize: number) {
  switch (props.effect) {
    case 'fade': return { from: { opacity: 0 }, to: { opacity: 1 }, ease: 'power2.inOut' }
    case 'blur': return { from: { opacity: 0, filter: `blur(${Math.max(2, fontSize * 0.08)}px)` }, to: { opacity: 1, filter: 'blur(0px)' }, ease: 'power2.out' }
    case 'flip': return { from: { opacity: 0, rotationX: -90, transformPerspective: fontSize * 6, transformOrigin: '50% 100%' }, to: { opacity: 1, rotationX: 0, transformPerspective: fontSize * 6, transformOrigin: '50% 100%' }, ease: 'power3.out' }
    case 'pop': return { from: { opacity: 0, scale: 0.65 }, to: { opacity: 1, scale: 1 }, ease: 'back.out(1.6)' }
    case 'skew': return { from: { opacity: 0, x: -fontSize * 0.4, skewX: -20 }, to: { opacity: 1, x: 0, skewX: 0 }, ease: 'expo.out' }
    case 'wave': return { from: { opacity: 0, y: fontSize * 0.45 }, to: { opacity: 1, y: 0 }, ease: 'power3.out' }
    default: return { from: { opacity: 0, y: 40 }, to: { opacity: 1, y: 0 }, ease: 'power3.out' }
  }
}

async function setup() {
  cleanup()
  let active = true
  cleanup = () => { active = false }
  const el = element.value
  const { gsap, SplitText, ScrollTrigger } = window
  if (!el || !gsap || !SplitText) return

  if (document.fonts && document.fonts.status !== 'loaded') await document.fonts.ready
  if (!active || !element.value) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    emit('letterAnimationComplete')
    cleanup = () => { active = false }
    return
  }

  gsap.registerPlugin(SplitText, ...(ScrollTrigger ? [ScrollTrigger] : []))
  let split: GsapSplitTextInstance | undefined
  let tween: { restart: () => void } | undefined
  let didComplete = false
  const context: GsapContext = gsap.context(() => {
    const look = effectValues(parseFloat(getComputedStyle(el).fontSize) || 16)
    const fromVars = props.from ?? look.from
    const toVars = props.to ?? look.to
    const unit = props.splitType.includes('chars') ? 'chars' : props.splitType.includes('words') ? 'words' : 'lines'
    const marginMatch = /^(-?\d+(?:\.\d+)?)(px|em|rem|%)?$/.exec(props.rootMargin)
    const margin = marginMatch ? `${Number(marginMatch[1]) < 0 ? '-=' : '+='}${Math.abs(Number(marginMatch[1]))}${marginMatch[2] || 'px'}` : ''
    const start = `top ${(1 - props.threshold) * 100}%${margin}`

    split = SplitText.create(el, {
      type: props.splitType,
      tag: 'span',
      smartWrap: true,
      autoSplit: props.splitType.includes('lines'),
      mask: props.mask ? unit : undefined,
      aria: 'auto',
      charsClass: 'split-char',
      wordsClass: 'split-word',
      linesClass: 'split-line',
      onSplit: (parts: GsapSplitTextInstance) => {
        const targets = parts[unit]
        const animation = gsap.fromTo(targets, { ...fromVars, ...(props.accentColor ? { color: props.accentColor } : {}), willChange: 'transform, opacity' }, {
          ...toVars,
          color: props.accentColor ? props.color ?? getComputedStyle(el).color : undefined,
          duration: props.duration,
          ease: props.ease ?? look.ease,
          stagger: { each: props.delay / 1000, from: props.staggerFrom },
          repeat: props.loop ? -1 : 0,
          repeatDelay: props.loopDelay,
          yoyo: props.loop,
          scrollTrigger: props.trigger === 'load' ? undefined : {
            trigger: el,
            start,
            once: true,
            fastScrollEnd: true,
          },
          onComplete: () => {
            if (!didComplete) {
              didComplete = true
              emit('letterAnimationComplete')
            }
          },
        }) as GsapTween
        tween = animation
        return animation
      },
    })
  }, el)

  const replay = () => {
    if (props.trigger === 'hover') tween?.restart()
  }
  const replayOnClick = () => {
    if (props.trigger === 'click') tween?.restart()
  }
  el.addEventListener('pointerenter', replay)
  el.addEventListener('click', replayOnClick)
  cleanup = () => {
    active = false
    el.removeEventListener('pointerenter', replay)
    el.removeEventListener('click', replayOnClick)
    context.revert()
    split?.revert()
  }
}

onMounted(setup)
watch(() => [props.text, props.effect, props.splitType, props.delay, props.duration, props.ease, props.staggerFrom, props.trigger, props.loop, props.loopDelay, props.mask, props.threshold, props.rootMargin, props.color, props.accentColor, props.from, props.to], setup)
onBeforeUnmount(() => cleanup())
</script>

<template>
  <component
    :is="tag"
    ref="element"
    class="split-parent"
    :class="className"
    :style="{ textAlign, color, display: 'inline-block', whiteSpace: 'normal' }"
  >{{ text }}</component>
</template>

<style scoped>
.split-parent { max-width: 100%; }
:deep(.split-char), :deep(.split-word) { display: inline-block; }
:deep(.split-line) { display: block; }
</style>
