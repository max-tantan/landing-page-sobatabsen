export type AnimationValues = Record<string, unknown>

export type GsapContext = { revert: () => void }
export type GsapTween = { restart: () => void }
export type ScrollTriggerInstance = { kill: () => void }
export type ScrollTriggerApi = {
  create: (options: Record<string, unknown>) => ScrollTriggerInstance
}
export type GsapSplitTextInstance = {
  chars: HTMLElement[]
  words: HTMLElement[]
  lines: HTMLElement[]
  revert: () => void
}
export type GsapSplitTextPlugin = {
  create: (element: HTMLElement, options: Record<string, unknown>) => GsapSplitTextInstance
}
type GsapMatchMedia = {
  add: (query: string, callback: () => void) => void
  revert: () => void
}
export type GsapApi = {
  registerPlugin: (...plugins: unknown[]) => void
  context: (callback: () => void, scope?: Element) => GsapContext
  matchMedia: () => GsapMatchMedia
  fromTo: (target: Element | Element[] | string, from: AnimationValues, to: AnimationValues) => GsapTween
}

declare global {
  interface Window {
    gsap?: GsapApi
    ScrollTrigger?: ScrollTriggerApi
    SplitText?: GsapSplitTextPlugin
  }
}

export function setupAnimations() {
  const { gsap, ScrollTrigger } = window
  if (!gsap || !ScrollTrigger) return () => {}

  gsap.registerPlugin(ScrollTrigger)
  const media = gsap.matchMedia()
  const context = gsap.context(() => {
    ScrollTrigger.create({
      trigger: document.querySelector('.hero'),
      start: 'top top-=24',
      end: 'max',
      onEnter: () => document.querySelector('.topbar')?.classList.add('is-scrolled'),
      onLeaveBack: () => document.querySelector('.topbar')?.classList.remove('is-scrolled'),
    })

    media.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo('.hero-text > :not(.hero-title)',
        { autoAlpha: 0, y: 22 },
        { autoAlpha: 1, y: 0, duration: 0.65, stagger: 0.11, ease: 'power2.out', clearProps: 'all' },
      )
      document.querySelectorAll('.section-head').forEach((heading) => {
        gsap.fromTo(heading,
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.55, ease: 'power2.out', clearProps: 'all', scrollTrigger: { trigger: heading, start: 'top 88%', once: true } },
        )
      })

      document.querySelectorAll('.usecase-grid, .feature-grid, .problem-grid, .faq-list, .testimonials-intro, .testimonials-wall').forEach((group) => {
        const items = Array.from(group.children)
        if (!items.length) return
        gsap.fromTo(items,
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.09, ease: 'power2.out', clearProps: 'all', scrollTrigger: { trigger: group, start: 'top 86%', once: true } },
        )
      })

      const steps = document.querySelector('.steps')
      if (steps) {
        const flow = Array.from(steps.querySelectorAll('.step, .step-line'))
        const result = steps.querySelector('.step-result')
        gsap.fromTo(flow,
          { autoAlpha: 0, y: 22 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out', clearProps: 'all', scrollTrigger: { trigger: steps, start: 'top 86%', once: true } },
        )
        if (result) {
          gsap.fromTo(result,
            { autoAlpha: 0, y: 16, scale: 0.94 },
            { autoAlpha: 1, y: 0, scale: 1, duration: 0.55, delay: 0.45, ease: 'power2.out', clearProps: 'all', scrollTrigger: { trigger: steps, start: 'top 86%', once: true } },
          )
        }
      }
    })
  }, document.querySelector('main') ?? undefined)

  return () => {
    media.revert()
    context.revert()
  }
}

export function animatePlanTabChange(previousHeight?: number) {
  const { gsap } = window
  if (!gsap || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {}

  const context = gsap.context(() => {
    if (previousHeight !== undefined) {
      gsap.fromTo('.plans-grid',
        { height: previousHeight, overflow: 'hidden' },
        { height: 'auto', duration: 0.42, ease: 'power2.inOut', clearProps: 'height,overflow' },
      )
    }
    gsap.fromTo('.plans-grid .plan-card',
      { autoAlpha: 0, y: 14, scale: 0.985 },
      { autoAlpha: 1, y: 0, scale: 1, duration: 0.38, stagger: 0.08, ease: 'power2.out', clearProps: 'all' },
    )
  }, document.querySelector('#paket') ?? undefined)

  return () => context.revert()
}
