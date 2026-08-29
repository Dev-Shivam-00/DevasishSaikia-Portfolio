import type { ElementType, ReactNode } from 'react'
import type { ScrollAnimation } from '@/types/portfolio'

interface ScrollRevealProps {
  children: ReactNode
  /** Defaults to the template's own default, `fade_from_bottom`. */
  animation?: ScrollAnimation
  as?: ElementType
  className?: string
  duration?: number
}

/**
 * Emits the template's `class="scroll-animation" data-animation="…"` contract.
 * TemplateEffects picks these up with GSAP; without JS the element renders in
 * its natural position, exactly as the static template does.
 */
export function ScrollReveal({
  children,
  animation = 'fade_from_bottom',
  as: Tag = 'div',
  className,
  duration,
}: ScrollRevealProps) {
  return (
    <Tag
      className={className ? `scroll-animation ${className}` : 'scroll-animation'}
      data-animation={animation}
      {...(duration ? { 'data-animation-duration': String(duration) } : {})}
    >
      {children}
    </Tag>
  )
}

/**
 * The template's two-line masked heading: an outer <span> per line wrapping an
 * inner `.timeline-anim.scroll-animation` span.
 */
export function RevealLines({
  lines,
  animation = 'slide_down',
}: {
  lines: readonly string[]
  animation?: ScrollAnimation
}) {
  return (
    <>
      {lines.map((line) => (
        <span key={line}>
          <span className="timeline-anim scroll-animation" data-animation={animation}>
            {line}
          </span>
        </span>
      ))}
    </>
  )
}
