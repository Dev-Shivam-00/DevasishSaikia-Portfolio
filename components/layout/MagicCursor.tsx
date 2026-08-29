'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * The template's magic cursor (main.js): a ball that follows the pointer and
 * expands away on any link hover. Pointer-only — touch devices never mount it,
 * and it is hidden from assistive technology.
 */
export function MagicCursor() {
  const ballRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ball = ballRef.current
    if (!ball) return

    const fine = window.matchMedia('(pointer: fine)').matches
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || prefersReduced) return

    const onMove = (event: MouseEvent) => {
      gsap.to(ball, {
        duration: 0.3,
        x: event.clientX,
        y: event.clientY,
        opacity: 1,
        ease: 'power2.out',
      })
    }

    const onEnter = () => {
      ball.classList.add('hovered')
      gsap.to(ball, { duration: 0.3, scale: 2, opacity: 0 })
    }

    const onLeave = () => {
      ball.classList.remove('hovered')
      gsap.to(ball, { duration: 0.3, scale: 1, opacity: 1, ease: 'power2.out' })
    }

    // Delegated so links rendered later still get the effect.
    const onOver = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest('a, button')) onEnter()
    }
    const onOut = (event: MouseEvent) => {
      if ((event.target as Element | null)?.closest('a, button')) onLeave()
    }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    document.body.classList.add('has-magic-cursor')

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      document.body.classList.remove('has-magic-cursor')
    }
  }, [])

  return (
    <div id="magic-cursor" aria-hidden>
      <div id="ball" ref={ballRef} />
    </div>
  )
}
