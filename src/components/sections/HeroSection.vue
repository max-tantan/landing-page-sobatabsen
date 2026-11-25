<script setup lang="ts">
import { ref } from 'vue'
import content from '../../data/content.json'
import headerPhoto from '../../assets/header2.webp'
import VariableProximity from '../VariableProximity.vue'
import SplitText from '../SplitText.vue'

const { hero, brand } = content
const heroProximityRef = ref<HTMLElement | null>(null)
</script>

<template>
  <section class="hero" id="top">
    <img class="hero-photo" :src="headerPhoto" alt="" aria-hidden="true" />
    <div class="hero-text">
      <h1 class="hero-title" ref="heroProximityRef">
        <span class="hero-split">
          <VariableProximity :label="hero.lines[0]" :container-ref="heroProximityRef" :radius="110" falloff="gaussian" :smoothing="0.25" :scale="1.03" :lift="0.04" from-font-variation-settings="'wght' 400, 'opsz' 14" to-font-variation-settings="'wght' 900, 'opsz' 60" />
        </span>
        <span class="hero-split hero-split-accent">
          <VariableProximity :label="hero.lines[1]" :container-ref="heroProximityRef" :radius="110" falloff="gaussian" :smoothing="0.25" :scale="1.03" :lift="0.04" :from-color="hero.accentColor" to-color="#ffffff" from-font-variation-settings="'wght' 400, 'opsz' 14" to-font-variation-settings="'wght' 900, 'opsz' 60" />
        </span>
      </h1>
      <div class="hero-actions">
        <a class="hero-pill-btn hero-pill-light" :href="hero.primaryCtaHref">{{ hero.primaryCta }}</a>
        <a class="hero-pill-btn hero-pill-dark" :href="hero.secondaryCtaHref">
          <span>{{ hero.secondaryCta }}</span>
          <svg class="hero-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </a>
      </div>
    </div>
    <div class="hero-corner" aria-hidden="true">
      <SplitText :text="brand.prefix" tag="span" :color="hero.brandColors[0]" effect="rise" split-type="chars" trigger="load" :delay="35" :duration="1.6" :mask="true" text-align="left" />
      <SplitText :text="brand.suffix" tag="span" :color="hero.brandColors[1]" effect="rise" split-type="chars" trigger="load" :delay="35" :duration="1.6" :mask="true" text-align="left" />
      <i>{{ brand.mark }}</i>
    </div>
  </section>
</template>
