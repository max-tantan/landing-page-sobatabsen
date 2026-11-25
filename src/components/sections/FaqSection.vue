<script setup lang="ts">
import { ref } from 'vue'
import content from '../../data/content.json'
import { blurHeading } from '../../data/ui'
import faqImage from '../../assets/sobatabsen1.webp'
import faqImage2 from '../../assets/sobatabsen2.webp'
import BlurText from '../BlurText.vue'

const { faq } = content
const activeFaq = ref(0)
</script>

<template>
  <section class="faq-section section-wrap" id="faq">
    <div class="section-head">
      <h2><BlurText v-bind="blurHeading" tag="span" :text="faq.heading" /></h2>
      <span class="faq-image-swap">
        <img class="faq-image" :src="faqImage" :alt="faq.alt" loading="lazy" />
        <img class="faq-image faq-image-hover" :src="faqImage2" alt="" aria-hidden="true" loading="lazy" />
      </span>
    </div>
    <div class="faq-list">
      <article v-for="(item, index) in faq.items" :key="item.q" class="faq-item">
        <button :aria-expanded="activeFaq === index" @click="activeFaq = activeFaq === index ? -1 : index">
          <span>{{ item.q }}</span>
          <b>{{ activeFaq === index ? '−' : '+' }}</b>
        </button>
        <Transition name="faq-answer">
          <div v-if="activeFaq === index" class="faq-answer"><p>{{ item.a }}</p></div>
        </Transition>
      </article>
    </div>
  </section>
</template>
