<script setup lang="ts">
import content from '../../data/content.json'

const { brand, nav, footer } = content
</script>

<template>
  <footer class="site-footer">
    <div class="footer-main">
      <a href="#top" class="brand footer-brand">{{ brand.prefix }}<span>{{ brand.suffix }}</span><i>{{ brand.mark }}</i></a>
      <nav class="footer-nav" :aria-label="footer.ariaLabel">
        <a v-for="item in nav" :key="item.href" :href="item.href">{{ item.label }}</a>
      </nav>
    </div>
    <div class="footer-bottom">
      <span>{{ footer.copyright }}</span>
      <div class="footer-contact">
        <a :href="footer.emailHref">{{ footer.email }}</a>
        <a :href="footer.phoneHref">{{ footer.phone }}</a>
      </div>
    </div>
  </footer>
</template>
