<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { setupAnimations } from './animations'
import type { Plan } from './data/plans'
import SiteHeader from './components/sections/SiteHeader.vue'
import HeroSection from './components/sections/HeroSection.vue'
import AudienceSection from './components/sections/AudienceSection.vue'
import HowItWorksSection from './components/sections/HowItWorksSection.vue'
import PlansSection from './components/sections/PlansSection.vue'
import ComparisonSection from './components/sections/ComparisonSection.vue'
import FaqSection from './components/sections/FaqSection.vue'
import CtaSection from './components/sections/CtaSection.vue'
import SiteFooter from './components/sections/SiteFooter.vue'
import CheckoutModal from './components/sections/CheckoutModal.vue'
import MockupSection from './components/MockupSection.vue'
import FeaturesShowcase from './components/FeaturesShowcase.vue'
import TestimonialsSection from './components/TestimonialsSection.vue'

const checkoutRef = ref<InstanceType<typeof CheckoutModal> | null>(null)
let cleanupAnimations = () => {}

function openCheckout(plan: Plan, total: number) {
  checkoutRef.value?.open(plan, total)
}

onMounted(() => { cleanupAnimations = setupAnimations() })
onBeforeUnmount(() => cleanupAnimations())
</script>

<template>
  <main>
    <SiteHeader />
    <HeroSection />
    <AudienceSection />
    <HowItWorksSection />
    <MockupSection />
    <FeaturesShowcase />
    <PlansSection @select="openCheckout" />
    <ComparisonSection />
    <FaqSection />
    <TestimonialsSection />
    <CtaSection />
    <SiteFooter />
    <CheckoutModal ref="checkoutRef" />
  </main>
</template>
