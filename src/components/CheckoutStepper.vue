<script setup lang="ts">
import content from '../data/content.json'

withDefaults(defineProps<{
  steps: string[]
  currentStep: number
}>(), { currentStep: 1 })
</script>

<template>
  <nav class="checkout-stepper" :aria-label="content.checkout.stepperAria">
    <ol>
      <li v-for="(label, index) in steps" :key="label" :class="{ active: currentStep === index + 1, complete: currentStep > index + 1 }">
        <span class="stepper-marker" :aria-current="currentStep === index + 1 ? 'step' : undefined">
          <span v-if="currentStep > index + 1" aria-hidden="true">✓</span>
          <span v-else>{{ index + 1 }}</span>
        </span>
        <span class="stepper-label">{{ label }}</span>
        <span v-if="index < steps.length - 1" class="stepper-connector" aria-hidden="true"><i :style="{ width: currentStep > index + 1 ? '100%' : '0%' }"></i></span>
      </li>
    </ol>
  </nav>
</template>

<style scoped>
.checkout-stepper { width: 100%; margin: 4px 0 30px; }
ol { display: flex; margin: 0; padding: 0; list-style: none; }
li { position: relative; display: flex; flex: 1; flex-direction: column; align-items: center; gap: 8px; min-width: 0; }
.stepper-marker { position: relative; z-index: 1; display: grid; width: 30px; height: 30px; place-items: center; border: 1px solid #d9d9d9; border-radius: 50%; background: #fff; color: #9099a2; font-size: 11px; font-weight: 700; transition: color .25s, background .25s, border-color .25s, transform .25s; }
.stepper-label { max-width: 100%; overflow: hidden; color: #9aa1a8; font-size: 10px; font-weight: 600; text-overflow: ellipsis; white-space: nowrap; transition: color .25s; }
.active .stepper-marker,.complete .stepper-marker { border-color: #1878ec; background: #1878ec; color: white; }
.active .stepper-marker { transform: scale(1.08); box-shadow: 0 0 0 4px #eaf3ff; }
.active .stepper-label,.complete .stepper-label { color: #253442; }
.stepper-connector { position: absolute; z-index: 0; top: 14px; left: calc(50% + 20px); width: calc(100% - 40px); height: 2px; overflow: hidden; border-radius: 2px; background: #e6e9ec; }
.stepper-connector i { display: block; height: 100%; border-radius: inherit; background: #1878ec; transition: width .35s ease; }
@media(max-width:480px) { .checkout-stepper { margin-bottom: 24px; } .stepper-label { font-size: 9px; } }
@media(prefers-reduced-motion:reduce) { *,*::before,*::after { transition-duration:.01ms!important; } }
</style>
