import type { ReactNode } from 'react'

export interface TextSegment {
  text: string
  strong?: boolean
}

export type RichText = string | TextSegment[]

export const strong = (text: string): TextSegment => ({ text, strong: true })

export const rich = (...segments: Array<string | TextSegment>): RichText =>
  segments.map((segment) => typeof segment === 'string' ? { text: segment } : segment)

export function plainText(content: RichText): string {
  return typeof content === 'string' ? content : content.map((segment) => segment.text).join('')
}

export function renderRichText(content: RichText, emphasisClassName?: string): ReactNode {
  if (typeof content === 'string') return content

  return content.map((segment, index) =>
    segment.strong ? (
      <strong key={index} className={emphasisClassName}>{segment.text}</strong>
    ) : (
      <span key={index}>{segment.text}</span>
    ),
  )
}
