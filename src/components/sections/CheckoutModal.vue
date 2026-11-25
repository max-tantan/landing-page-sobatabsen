<script setup lang="ts">
import { ref } from 'vue'
import content from '../../data/content.json'
import { PLANS, rupiah, type Plan } from '../../data/plans'
import CheckoutStepper from '../CheckoutStepper.vue'

const { brand, checkout: copy } = content
const visible = ref(false)
const step = ref(1)
const selectedPlan = ref<Plan>(PLANS[0])
const total = ref(0)
const activePayment = ref(copy.payment.methods[0].id)
const checkoutForm = ref({ institution: '', category: '', manager: '', email: '', whatsapp: '' })
const paymentState = ref<'pending' | 'success' | 'expired' | 'failed'>('pending')

function open(plan: Plan, amount: number) {
  selectedPlan.value = plan
  total.value = amount
  step.value = 1
  paymentState.value = 'pending'
  visible.value = true
}
function close() { visible.value = false }
function submitInstitution() { if (Object.values(checkoutForm.value).every(Boolean)) step.value = 3 }

defineExpose({ open })
</script>

<template>
  <div v-if="visible" class="modal-backdrop" @click.self="close" @keydown.esc="close">
    <section class="checkout-modal" role="dialog" aria-modal="true" aria-labelledby="checkout-title">
      <div class="checkout-topline">
        <a href="#top" class="brand modal-brand">{{ brand.prefix }}<span>{{ brand.suffix }}</span><i>{{ brand.mark }}</i></a>
        <button class="modal-close" :aria-label="copy.closeLabel" @click="close">×</button>
      </div>
      <CheckoutStepper :current-step="paymentState === 'success' ? 4 : step" :steps="copy.steps" />
      <Transition name="checkout-panel" mode="out-in">
        <div :key="`${paymentState}-${step}`" class="checkout-content">
          <template v-if="paymentState === 'success'">
            <div class="modal-result success-result">
              <span>✓</span>
              <p class="eyebrow">{{ copy.results.success.eyebrow }}</p>
              <h2 id="checkout-title">{{ copy.results.success.title }}</h2>
              <p>{{ copy.results.success.body }}</p>
              <button class="button" @click="close">{{ copy.results.success.button }}</button>
            </div>
          </template>
          <template v-else-if="paymentState === 'expired'">
            <div class="modal-result">
              <span>◷</span>
              <p class="eyebrow">{{ copy.results.expired.eyebrow }}</p>
              <h2 id="checkout-title">{{ copy.results.expired.title }}</h2>
              <button class="button" @click="paymentState = 'pending'; step = 4">{{ copy.results.expired.button }}</button>
            </div>
          </template>
          <template v-else-if="paymentState === 'failed'">
            <div class="modal-result">
              <span>!</span>
              <p class="eyebrow">{{ copy.results.failed.eyebrow }}</p>
              <h2 id="checkout-title">{{ copy.results.failed.title }}</h2>
              <button class="button" @click="step = 3; paymentState = 'pending'">{{ copy.results.failed.button }}</button>
            </div>
          </template>
          <template v-else>
            <template v-if="step === 1">
              <h2 id="checkout-title">{{ copy.plan.heading }}</h2>
              <div class="checkout-summary">
                <div class="summary-icon">✳</div>
                <div>
                  <b>{{ selectedPlan.name }}</b>
                  <small>{{ selectedPlan.type === 'bulanan' ? copy.plan.monthly : copy.plan.oneoff }}</small>
                </div>
                <strong>{{ rupiah(total) }}</strong>
              </div>
              <button class="button modal-primary" @click="step = 2">{{ copy.plan.continue }} <span>→</span></button>
            </template>
            <template v-else-if="step === 2">
              <h2 id="checkout-title">{{ copy.form.heading }}</h2>
              <p class="modal-lead">{{ copy.form.lead }}</p>
              <div class="form-grid">
                <label>{{ copy.form.institution }}<input v-model="checkoutForm.institution" required :placeholder="copy.form.institutionPlaceholder" /></label>
                <label>{{ copy.form.category }}
                  <select v-model="checkoutForm.category" required>
                    <option value="" disabled>{{ copy.form.categoryPlaceholder }}</option>
                    <option v-for="category in content.plans.oneoff.categories" :key="category">{{ category }}</option>
                  </select>
                </label>
                <label>{{ copy.form.manager }}<input v-model="checkoutForm.manager" required :placeholder="copy.form.managerPlaceholder" /></label>
                <label>{{ copy.form.email }}<input v-model="checkoutForm.email" type="email" required :placeholder="copy.form.emailPlaceholder" /></label>
                <label class="full-field">{{ copy.form.whatsapp }}<input v-model="checkoutForm.whatsapp" type="tel" required :placeholder="copy.form.whatsappPlaceholder" /></label>
              </div>
              <div class="modal-actions">
                <button class="text-button" @click="step = 1">{{ copy.form.back }}</button>
                <button class="button" :disabled="!Object.values(checkoutForm).every(Boolean)" @click="submitInstitution">{{ copy.form.continue }}</button>
              </div>
            </template>
            <template v-else-if="step === 3">
              <h2 id="checkout-title">{{ copy.payment.heading }}</h2>
              <div class="checkout-summary payment-total">
                <span>{{ copy.payment.total }}</span>
                <strong>{{ rupiah(total) }}</strong>
              </div>
              <div class="payment-options">
                <label v-for="method in copy.payment.methods" :key="method.id" :class="{ chosen: activePayment === method.id }">
                  <input v-model="activePayment" type="radio" :value="method.id" />
                  <span class="payment-option-label">{{ method.label }}</span>
                  <span class="payment-radio"></span>
                </label>
              </div>
              <div class="modal-actions">
                <button class="text-button" @click="step = 2">{{ copy.form.back }}</button>
                <button class="button" @click="step = 4">{{ copy.payment.pay }} {{ rupiah(total) }} →</button>
              </div>
            </template>
            <template v-else>
              <h2 id="checkout-title">{{ copy.finish.heading }}</h2>
              <div class="pay-instruction">
                <template v-if="activePayment === 'QRIS'">
                  <div class="fake-qr">▦</div>
                  <b>{{ copy.finish.qrTitle }}</b>
                  <small>{{ copy.finish.qrExpiry }}</small>
                </template>
                <template v-else-if="activePayment === 'Virtual Account'">
                  <b>{{ copy.finish.vaTitle }}</b>
                  <strong>{{ copy.finish.vaNumber }}</strong>
                  <button class="text-button">{{ copy.finish.copy }}</button>
                </template>
                <template v-else>
                  <b>{{ copy.finish.otherTitle }}{{ activePayment }}</b>
                  <button class="button">{{ copy.finish.openApp }}</button>
                </template>
              </div>
              <div class="modal-actions">
                <button class="text-button" @click="step = 3">{{ copy.form.back }}</button>
                <button class="button" @click="paymentState = 'success'">{{ copy.finish.simulateSuccess }}</button>
              </div>
              <div class="dev-actions">
                <button @click="paymentState = 'expired'">{{ copy.finish.simulateExpired }}</button>
                <button @click="paymentState = 'failed'">{{ copy.finish.simulateFailed }}</button>
              </div>
            </template>
          </template>
        </div>
      </Transition>
      <p class="checkout-footnote">{{ copy.footnote }}</p>
    </section>
  </div>
</template>
