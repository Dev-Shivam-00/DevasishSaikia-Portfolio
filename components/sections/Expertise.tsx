'use client'

import { useEffect, useRef, useState } from 'react'
import { focusWhenVisible } from '@/lib/focus'
import { expertise } from '@/data/experience'
import { site } from '@/data/site'
import type { Expertise as ExpertiseItem } from '@/types/portfolio'
import { Media } from '@/components/ui/Media'
import { RevealLines } from '@/components/effects/ScrollReveal'

const PlusIcon = () => (
  <svg
    width="18"
    height="18"
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
)

export function Expertise() {
  const [active, setActive] = useState<ExpertiseItem | null>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastTrigger = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    if (!active) return
    const cancelFocus = focusWhenVisible(() => closeRef.current)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActive(null)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      cancelFocus()
      window.removeEventListener('keydown', onKey)
    }
  }, [active])

  const close = () => {
    setActive(null)
    lastTrigger.current?.focus()
  }

  return (
    <>
      <section className="experience-sec" id="expertise" aria-labelledby="expertise-heading">
        <div className="section-header">
          <div className="left">
            <h2 id="expertise-heading">
              <RevealLines lines={['WHAT I', 'CREATE']} />
            </h2>
          </div>
        </div>

        <div className="experience-list-wrap">
          <div className="experience-lists">
            {expertise.map((item, index) => (
              <div className="experience-box" key={item.id}>
                <div className="experience-button-box">
                  <button
                    type="button"
                    className="experience-button"
                    aria-haspopup="dialog"
                    onClick={(event) => {
                      lastTrigger.current = event.currentTarget
                      setActive(item)
                    }}
                  >
                    <span className="sr-only">More about {item.title}</span>
                    <PlusIcon />
                  </button>
                </div>
                <h3>
                  <span>({index + 1})</span>
                  <span>{item.title}</span>
                </h3>
                <p>{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div
        className={`experience-popup${active ? ' active' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label={active ? active.title : 'Expertise detail'}
        inert={!active}
      >
        <div className="experience-popup-content-wrap">
          <div className="close-experience-popup-btn">
            <button type="button" ref={closeRef} onClick={close}>
              <span className="sr-only">Close</span>
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

          <div className="experience-popup-content">
            <div className="experience-popup-header">
              <h3>{active?.title ?? ''}</h3>
            </div>
            <p>{active?.detail ?? ''}</p>

            <div className="experience-popup-features">
              <h4>WHAT IT INVOLVES</h4>
              <div className="experience-popup-feature-lists">
                {active?.points.map((point, index) => (
                  <div className="experience-popup-feature" key={point}>
                    <span>({index + 1})</span> {point}
                  </div>
                ))}
              </div>
            </div>

            <div className="experience-popup-btns">
              <a href="#contact" className="theme-btn2" onClick={close}>
                Start a project
              </a>
              {site.email ? (
                <a href={`mailto:${site.email}`} className="theme-btn3">
                  E-Mail
                </a>
              ) : null}
            </div>
          </div>

          <div className="experience-popup-img">
            <Media mediaKey="stillTertiary" sizes="(max-width: 809px) 100vw, 420px" />
          </div>
        </div>
      </div>
    </>
  )
}
