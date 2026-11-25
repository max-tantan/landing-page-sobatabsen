import { readFileSync } from 'node:fs'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

const readJson = (path: string) => JSON.parse(readFileSync(new URL(path, import.meta.url), 'utf8'))
const content = readJson('./src/data/content.json')
const plans = readJson('./src/data/plans.json')
const entities: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (char) => entities[char])

function seoHtml() {
  const { meta, seo, faq } = content
  const metaTags = [
    `<meta name="theme-color" content="${escapeHtml(meta.themeColor)}" />`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:type" content="${escapeHtml(meta.ogType)}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.ogTitle)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:card" content="${escapeHtml(meta.twitterCard)}" />`,
    `<title>${escapeHtml(meta.title)}</title>`,
  ].join('\n    ')
  const offers = seo.offerPlanIds.map((id: string) => {
    const plan = plans.find((item: { id: string }) => item.id === id)
    return { '@type': 'Offer', name: plan.name, price: String(plan.promoFirstMonth ?? plan.priceMonthly ?? 0), priceCurrency: 'IDR' }
  })
  const questions = seo.faqIndexes.map((index: number) => faq.items[index]).map((item: { q: string; a: string }) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: { '@type': 'Answer', text: item.a },
  }))
  const jsonLd = [
    { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: seo.softwareName, applicationCategory: seo.applicationCategory, operatingSystem: seo.operatingSystem, offers },
    { '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: questions },
  ].map((data) => `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`).join('\n    ')
  return `${metaTags}\n    ${jsonLd}`
}

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    {
      name: 'seo-from-content',
      transformIndexHtml: (html) => html.replace('<!--SEO_META-->', seoHtml()).replace('<!--JSONLD-->', ''),
    },
  ],
})
