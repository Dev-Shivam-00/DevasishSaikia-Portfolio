'use client'

import { useEffect, useRef } from 'react'
import { focusWhenVisible } from '@/lib/focus'
import { navigation } from '@/data/navigation'
import { externalLinks, site } from '@/data/site'
import { useMenu } from './MenuContext'

export function PopupMenu() {
  const { open, closeMenu } = useMenu()
  const panelRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Move focus into the dialog when it opens, and trap it while it is open.
  useEffect(() => {
    if (!open) return
    const cancelFocus = focusWhenVisible(() => closeRef.current)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const panel = panelRef.current
      if (!panel) return
      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (!first || !last) return

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      cancelFocus()
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div
      id="popup-menu"
      ref={panelRef}
      className={`popup-menu-wrap${open ? ' active' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      inert={!open}
    >
      <div className="popup-menu-header">
        <div className="local-temperature">
          <a href="#top" onClick={closeMenu}>
            <span>Local/</span>
            <span id="coordinates">{site.coordinates}</span>
          </a>
        </div>

        <div className="popup-menu-close-btn">
          <button type="button" className="icon" ref={closeRef} onClick={closeMenu}>
            <span className="sr-only">Close menu</span>
            <svg
              width="24"
              height="24"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                d="M6 12h6m6 0h-6m0 0V6m0 6v6"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <div className="right text-right">
          <a href="#contact" className="theme-btn" onClick={closeMenu}>
            Start a project
          </a>
        </div>
      </div>

      <div className="popup-menu">
        <nav aria-label="Primary">
          <ul>
            {navigation.map((item, index) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  onClick={item.external ? undefined : closeMenu}
                  {...(item.external
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                >
                  <span className="count">({index + 1})</span>
                  <span>{item.label}</span>
                  <span aria-hidden>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="popup-menu-footer">
        <div className="copyright">
          <p>
            &copy;{new Date().getFullYear()} {site.name} — ALL RIGHTS RESERVED
          </p>

          <ul className="social-links">
            {externalLinks().map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    focusable="false"
                    viewBox="0 0 24 24"
                    aria-hidden
                  >
                    <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
