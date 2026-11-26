<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref } from 'vue'
import content from '../../data/content.json'
import { blurHeading } from '../../data/ui'
import { PLANS, calcCustom, calcEvent, rupiah, type Plan } from '../../data/plans'
import { animatePlanTabChange } from '../../animations'
import BlurText from '../BlurText.vue'
import RubberSegment from '../RubberSegment.vue'

const emit = defineEmits<{ select: [plan: Plan, total: number] }>()
const { plans: copy } = content
const oneoff = copy.oneoff
const customMax = PLANS.find(plan => plan.id === 'custom')!.capacity.max!
const planTab = ref<'monthly' | 'oneoff'>('monthly')
const eventPeople = ref('250')
const eventDays = ref(5)
const customPeople = ref('800')
const customCategory = ref('Sekolah')
const eventCount = computed(() => eventPeople.value === '' ? null : Number(eventPeople.value))
const customCount = computed(() => customPeople.value === '' ? null : Number(customPeople.value))
const eventValid = computed(() => eventCount.value !== null && Number.isFinite(eventCount.value) && eventCount.value >= oneoff.minimums.event)
const customValid = computed(() => customCount.value !== null && Number.isFinite(customCount.value) && customCount.value >= oneoff.minimums.custom && customCount.value <= customMax)
let cleanupPlanTabAnimation = () => {}

function clampCustomPeople() {
  const digits = customPeople.value.replace(/\D/g, '')
  customPeople.value = digits === '' ? '' : String(Math.min(Number(digits), customMax))
}

function choose(plan: Plan) {
  const total = plan.id === 'event'
    ? (eventValid.value ? calcEvent(eventCount.value!) : 0)
    : plan.id === 'custom'
      ? (customValid.value ? calcCustom(customCount.value!) : 0)
      : (plan.promoFirstMonth ?? plan.priceMonthly ?? 0)
  emit('select', plan, total)
}

async function switchPlanTab(tab: 'monthly' | 'oneoff') {
  if (planTab.value === tab) return
  const previousHeight = document.querySelector('.plans-grid')?.getBoundingClientRect().height
  planTab.value = tab
  await nextTick()
  cleanupPlanTabAnimation()
  cleanupPlanTabAnimation = animatePlanTabChange(previousHeight)
}

function handlePlanTabChange(value: string) {
  if (value === 'monthly' || value === 'oneoff') void switchPlanTab(value)
}

onBeforeUnmount(() => cleanupPlanTabAnimation())
</script>

<template>
  <section class="plans-section section-wrap" id="paket">
    <div class="section-head centered">
      <h2><BlurText v-bind="blurHeading" tag="span" :text="copy.heading" /></h2>
    </div>
    <RubberSegment :items="copy.tabs" :value="planTab" track-color="#fff" thumb-color="#111" text-color="#111" active-text-color="#fff" size="md" :radius="999" :inset="3" equal-slots :stretch="100" :squash="3" :speed="1" :glide="75" draggable :aria-label="copy.ariaLabel" class-name="plan-tabs rubber-segment-plan" @change="handlePlanTabChange" />

    <div v-if="planTab === 'monthly'" class="plans-grid">
      <article v-for="plan in PLANS.filter(p => p.type === 'bulanan')" :key="plan.id" class="plan-card" :class="{ popular: plan.id === 'pro', value: plan.id === 'hemat' }">
        <div class="plan-summary">
          <svg v-if="plan.id === 'pro'" class="plan-orbit" viewBox="0 0 100 100" fill="none" aria-hidden="true">
            <circle cx="50" cy="50" r="34" stroke="currentColor" stroke-width="1" opacity=".35" />
            <path d="M50 16a34 34 0 0 1 29.4 17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            <circle class="plan-orbit-dot" cx="79" cy="33" r="3.5" fill="currentColor" />
            <circle cx="50" cy="50" r="9" stroke="currentColor" stroke-width="1" opacity=".45" />
            <path d="M50 41v18M41 50h18" stroke="currentColor" stroke-width="1" opacity=".5" />
          </svg>
          <div class="plan-top">
            <h3>{{ plan.name }}</h3>
            <span v-if="plan.id === 'hemat'" class="plan-highlight">{{ copy.badges.hemat }}</span>
            <span v-else-if="plan.id === 'pro'" class="plan-highlight">{{ copy.badges.pro }}</span>
          </div>
          <p class="capacity">{{ plan.capacity.max }}{{ copy.capacitySuffix }}</p>
          <div v-if="plan.id === 'starter'" class="plan-price">
            <strong>{{ copy.free.price }}</strong>
            <small>{{ copy.free.note }}</small>
          </div>
          <div v-else class="plan-price">
            <strong>{{ rupiah(plan.promoFirstMonth!) }}</strong>
            <small>{{ copy.promoNote }}</small>
            <small>{{ copy.renewalNote }} {{ rupiah(plan.priceMonthly!) }}{{ copy.renewalSuffix }}</small>
          </div>
          <button class="button plan-button" :class="{ 'button-dark': plan.id !== 'pro' }" @click="choose(plan)">{{ plan.id === 'starter' ? copy.free.button : copy.choose + plan.name }} <span>→</span></button>
        </div>
        <ul>
          <li v-for="feature in plan.features" :key="feature"><b>✓</b>{{ feature }}</li>
        </ul>
      </article>
    </div>

    <div v-else class="plans-grid oneoff-grid">
      <article v-for="plan in PLANS.filter(p => p.type === 'eceran')" :key="plan.id" class="plan-card calc-card" :class="{ value: plan.id === 'event', popular: plan.id === 'custom' }">
        <div class="plan-summary">
          <svg v-if="plan.id === 'custom'" class="plan-orbit" viewBox="0 0 100 100" fill="none" aria-hidden="true">
            <circle cx="50" cy="50" r="34" stroke="currentColor" stroke-width="1" opacity=".35" />
            <path d="M50 16a34 34 0 0 1 29.4 17" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
            <circle class="plan-orbit-dot" cx="79" cy="33" r="3.5" fill="currentColor" />
            <circle cx="50" cy="50" r="9" stroke="currentColor" stroke-width="1" opacity=".45" />
            <path d="M50 41v18M41 50h18" stroke="currentColor" stroke-width="1" opacity=".5" />
          </svg>
          <div class="plan-top">
            <h3>{{ plan.name }}</h3>
            <span class="plan-highlight">{{ plan.id === 'event' ? plan.badge : copy.badges.custom }}</span>
          </div>
          <p class="capacity">{{ plan.id === 'event' ? oneoff.descriptions.event : oneoff.descriptions.custom }}</p>
          <label class="calc-label">{{ plan.id === 'event' ? oneoff.labels.event : `${oneoff.labels.custom} (maks. ${customMax})` }}
            <input v-if="plan.id === 'event'" v-model="eventPeople" type="text" inputmode="numeric" :placeholder="oneoff.placeholders.event" @input="eventPeople = eventPeople.replace(/\D/g, '')" />
            <input v-else v-model="customPeople" type="text" inputmode="numeric" :maxlength="String(customMax).length" :placeholder="oneoff.placeholders.custom" @input="clampCustomPeople" />
          </label>
          <label v-if="plan.id === 'custom'" class="calc-label">{{ oneoff.categoriesLabel }}
            <select v-model="customCategory">
              <option v-for="category in oneoff.categories" :key="category">{{ category }}</option>
            </select>
          </label>
          <label v-if="plan.id === 'event'" class="calc-label">{{ oneoff.durationLabel }}
            <select v-model="eventDays">
              <option v-for="duration in oneoff.durations" :key="duration.value" :value="duration.value">{{ duration.label }}</option>
            </select>
          </label>
          <p v-if="plan.id === 'event' && eventCount !== null && eventCount < oneoff.minimums.event" class="validation">{{ oneoff.validation.event }}<a href="#paket" @click="planTab = 'monthly'">{{ oneoff.validation.eventLink }}</a></p>
          <p v-if="plan.id === 'custom' && customCount !== null && customCount < oneoff.minimums.custom" class="validation">{{ oneoff.validation.custom }}</p>
          <div class="estimate plan-price">
            <small>{{ plan.id === 'event' ? oneoff.estimate.event : oneoff.estimate.custom }}</small>
            <strong>{{ (plan.id === 'event' ? eventValid : customValid) ? rupiah(plan.id === 'event' ? calcEvent(eventCount!) : calcCustom(customCount!)) : oneoff.emptyEstimate }}</strong>
            <small>{{ plan.id === 'event' ? `${Number(eventPeople || 0).toLocaleString('id-ID')}${oneoff.rateLabel.event}${PLANS.find(p => p.id === 'event')!.pricePerPerson}${oneoff.activeSuffix}${eventDays}${oneoff.daySuffix}` : `${Number(customPeople || 0).toLocaleString('id-ID')}${oneoff.rateLabel.custom}${PLANS.find(p => p.id === 'custom')!.pricePerPerson}` }}</small>
          </div>
          <button class="button plan-button" :disabled="plan.id === 'event' ? !eventValid : !customValid" @click="choose(plan)">{{ copy.choose + plan.name }} <span>→</span></button>
        </div>
        <ul>
          <li v-for="feature in plan.features" :key="feature"><b>✓</b>{{ feature }}</li>
        </ul>
      </article>
    </div>
  </section>
</template>
