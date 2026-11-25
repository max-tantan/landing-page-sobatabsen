<script setup lang="ts">
import { ref } from 'vue'
import content from '../../data/content.json'
import { blurHeading } from '../../data/ui'
import BlurText from '../BlurText.vue'

const { comparison, brand } = content
const mobileView = ref<'legacy' | 'sobat'>('legacy')
</script>

<template>
  <section class="comparison-section section-wrap" id="bandingkan">
    <div class="section-head centered">
      <h2>
        <BlurText v-bind="blurHeading" tag="span" :text="comparison.headingPrefix" />
        <span class="comparison-brand">{{ brand.prefix }}<span>{{ brand.suffix }}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true" focusable="false"><path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1" /></svg></span>
      </h2>
    </div>
    <div class="comparison-shell" :data-view="mobileView">
      <div class="comparison-pills" role="group" :aria-label="comparison.pillAria">
        <button type="button" :class="{ 'is-active': mobileView === 'legacy' }" :aria-pressed="mobileView === 'legacy'" @click="mobileView = 'legacy'">{{ comparison.columns.legacy }}</button>
        <button type="button" :class="{ 'is-active': mobileView === 'sobat' }" :aria-pressed="mobileView === 'sobat'" @click="mobileView = 'sobat'">{{ comparison.columns.sobat }}</button>
      </div>
      <div class="comparison-table-wrap" role="region" tabindex="0" aria-labelledby="comparison-caption">
        <table class="comparison-table">
          <caption id="comparison-caption" class="sr-only">{{ comparison.caption }}</caption>
          <thead>
            <tr>
              <th scope="col">{{ comparison.columns.aspect }}</th>
              <th scope="col">{{ comparison.columns.legacy }}</th>
              <th scope="col">{{ comparison.columns.sobat }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in comparison.rows" :key="row.aspect">
              <th scope="row">{{ row.aspect }}</th>
              <td>{{ row.legacy }}</td>
              <td>{{ row.sobat }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="comparison-cards">
        <article class="comparison-card comparison-card-legacy">
          <header><h3>{{ comparison.columns.legacy }}</h3></header>
          <dl>
            <div v-for="row in comparison.rows" :key="row.aspect">
              <dt>{{ row.aspect }}</dt>
              <dd>{{ row.legacy }}</dd>
            </div>
          </dl>
        </article>
        <article class="comparison-card comparison-card-sobat">
          <header><h3>{{ comparison.columns.sobat }}</h3></header>
          <dl>
            <div v-for="row in comparison.rows" :key="row.aspect">
              <dt>{{ row.aspect }}</dt>
              <dd>{{ row.sobat }}</dd>
            </div>
          </dl>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
</style>
