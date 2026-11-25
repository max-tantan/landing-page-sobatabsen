import data from './plans.json'

export type Plan = {
  id: string
  name: string
  type: string
  priceMonthly?: number
  promoFirstMonth?: number
  pricePerPerson?: number
  capacity: { min?: number; max?: number }
  badge?: string
  features: string[]
}

export const PLANS: Plan[] = data
export const rupiah = (amount: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(amount)
export const calcEvent = (people: number) => people * PLANS.find((plan) => plan.id === 'event')!.pricePerPerson!
export const calcCustom = (members: number) => members * PLANS.find((plan) => plan.id === 'custom')!.pricePerPerson!
