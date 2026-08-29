'use client'

import { useEffect, useState } from 'react'
import { site } from '@/data/site'

/**
 * The template ships a 1.7 MB animated GIF as its loader. This keeps the same
 * beat — a held black screen that fades into the hero — using the name as the
 * loading mark, so nothing is downloaded to show a spinner.
 */
export function Preloader() {
  const [hidden, setHidden] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const hold = prefersReduced ? 0 : 700

    const start = () => {
      window.setTimeout(() => setHidden(true), hold)
      // Matches the template's 1s fade before the node leaves the tree.
      window.setTimeout(() => setRemoved(true), hold + 1000)
    }

    if (document.readyState === 'complete') start()
    else window.addEventListener('load', start, { once: true })

    return () => window.removeEventListener('load', start)
  }, [])

  if (removed) return null

  return (
    <div className={`preloader-wrap${hidden ? ' is-hidden' : ''}`} aria-hidden>
      <div className="loader">
        <span className="preloader-mark">
          {site.firstName}
          <em>{site.lastName}</em>
        </span>
      </div>
    </div>
  )
}
