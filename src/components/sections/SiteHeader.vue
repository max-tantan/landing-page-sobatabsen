<script setup lang="ts">
import { ref } from 'vue'
import content from '../../data/content.json'

const { header, nav, plans, brand } = content
const menuOpen = ref(false)
</script>

<template>
  <header class="topbar" :class="{ 'menu-open': menuOpen }">
    <div class="topbar-pill">
      <a href="#top" class="brand" :aria-label="brand.homeLabel">{{ brand.prefix }}<span>{{ brand.suffix }}</span><i>{{ brand.mark }}</i></a>
      <button class="menu-toggle" :aria-label="header.menuLabel" :aria-expanded="menuOpen" aria-controls="primary-nav" @click="menuOpen = !menuOpen"><span></span><span></span><span></span></button>
      <nav id="primary-nav" :class="{ open: menuOpen }" :aria-label="header.navAria" @click="menuOpen = false">
        <a v-for="item in nav" :key="item.href" :href="item.href">{{ item.label }}</a>
        <a class="button button-small" href="#paket">{{ plans.free.button }}</a>
      </nav>
    </div>
  </header>
</template>
