<script setup lang="ts">
import content from '../../data/content.json'
import { blurHeading } from '../../data/ui'
import audienceSchool from '../../assets/Section Untuk/section-sekolah.webp'
import audienceCommunity from '../../assets/Section Untuk/section-yayasan.webp'
import audienceOffice from '../../assets/Section Untuk/section-kantor.webp'
import audienceEvent from '../../assets/Section Untuk/section-eo.webp'
import BlurText from '../BlurText.vue'
import AccordionGallery from '../AccordionGallery.vue'

const { audience } = content
const images = [audienceSchool, audienceCommunity, audienceOffice, audienceEvent]
const items = audience.items.map((item, index) => ({ ...item, image: images[index] }))
</script>

<template>
  <section class="usecases section-wrap" id="untuk-siapa">
    <div class="section-head">
      <h2><BlurText v-bind="blurHeading" tag="span" :text="audience.heading" /></h2>
    </div>
    <AccordionGallery
      class="mt-12"
      :items="items"
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
</template>
