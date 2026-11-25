<script setup lang="ts">
import { ref } from 'vue'
import content from '../../data/content.json'
import { blurHeading } from '../../data/ui'
import stepImage1 from '../../assets/langkah-langkah/gambar1.webp'
import stepImage2 from '../../assets/langkah-langkah/gambar2.webp'
import stepImage3 from '../../assets/langkah-langkah/gambar3.webp'
import BlurText from '../BlurText.vue'

const { how } = content
const images = [stepImage1, stepImage2, stepImage3]
const steps = how.steps.map((step, index) => ({ ...step, img: images[index] }))
const activeStep = ref(0)
</script>

<template>
  <section class="how-section" id="cara-kerja">
    <div class="section-wrap">
      <div class="section-head">
        <h2>{{ how.headingPrefix }}<em><BlurText v-bind="blurHeading" tag="span" :text="how.headingAccent" /></em></h2>
      </div>
      <div class="how-inner">
        <div class="how-visual" aria-hidden="true">
          <div v-for="(step, index) in steps" :key="step.title" class="how-visual-panel" :class="{ active: activeStep === index }"><img :src="step.img" :alt="step.title" /></div>
        </div>
        <div class="steps" role="tablist" :aria-label="how.ariaLabel">
          <button v-for="(step, index) in steps" :key="step.title" type="button" role="tab" :aria-selected="activeStep === index" class="step" :class="{ 'is-active': activeStep === index }" @click="activeStep = index" @mouseenter="activeStep = index">
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
