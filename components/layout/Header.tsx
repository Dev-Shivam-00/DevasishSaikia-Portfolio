'use client'

import { ScrollReveal } from '@/components/effects/ScrollReveal'
import { useMenu } from './MenuContext'
import { LocalTime } from './LocalTime'

export function Header() {
  const { openMenu } = useMenu()

  return (
    <ScrollReveal as="header" animation="slide_up" className="header-wrap">
      <div className="custom-row">
        <div className="header-local-time-box">
          <a href="#top">
            <span>Local/</span>
          </a>
          <LocalTime />
        </div>

        <div className="header-right">
          <button
            type="button"
            className="theme-btn"
            onClick={openMenu}
            aria-haspopup="dialog"
            aria-controls="popup-menu"
          >
            Navigate Here
          </button>
        </div>
      </div>
    </ScrollReveal>
  )
}
