<script setup lang="ts">
import content from '../../data/content.json'
import { blurHeading } from '../../data/ui'
import BlurText from '../BlurText.vue'

const { cta } = content
</script>

<template>
  <section class="closing-cta">
    <div>
      <h2><BlurText v-bind="blurHeading" tag="span" :text="cta.heading" /></h2>
      <div class="hero-actions">
        <a class="hero-pill-btn cta-pill-primary" :href="cta.href">{{ cta.primary }}</a>
        <a class="hero-pill-btn cta-pill-outline" :href="cta.href">
          <span>{{ cta.secondary }}</span>
          <svg class="hero-btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M12 19V5" />
            <path d="m5 12 7-7 7 7" />
          </svg>
        </a>
      </div>
    </div>
    <span class="cta-star">✳</span>
  </section>
</template>
