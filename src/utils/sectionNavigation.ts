export const portfolioSections = [
  { label: 'About', target: 'about' },
  { label: 'Career', target: 'career' },
  { label: 'Projects', target: 'projects' },
  { label: 'Open Source', target: 'opensource' },
  { label: 'Skills', target: 'skills' },
  { label: 'Education', target: 'education' },
  { label: 'Awards', target: 'awards' },
  { label: 'Activity', target: 'activity' },
  { label: 'Blog', target: 'blog' },
  { label: 'Contact', target: 'contact' },
] as const

export type SectionId = typeof portfolioSections[number]['target']

export function isSectionId(value: unknown): value is SectionId {
  return portfolioSections.some((section) => section.target === value)
}

export function scrollToSection(target: SectionId) {
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  const section = document.getElementById(target)
  if (!section) return
  if (!section.hasAttribute('tabindex')) section.tabIndex = -1
  section.focus({ preventScroll: true })
  const behavior = reducedMotion ? 'instant' : 'smooth'

  if (target === 'about') {
    window.scrollTo({ top: 0, behavior })
    return
  }

  const scrollTarget = section.querySelector<HTMLElement>('.section__title') ?? section
  scrollTarget.scrollIntoView({
    behavior,
    block: 'start',
  })
}
