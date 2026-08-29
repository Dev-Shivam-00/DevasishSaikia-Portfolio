'use client'

import { useState } from 'react'
import { faqs } from '@/data/experience'

/**
 * Reimplements Bootstrap's collapse accordion in React, keeping the template's
 * class names so its stylesheet applies unchanged — and adding the ARIA
 * wiring Bootstrap's markup only half provided.
 */
export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null)

  return (
    <section className="faq-sec" aria-labelledby="faq-heading">
      <div className="section-header3">
        <h2 className="title" id="faq-heading">
          <span>
            <span className="timeline-anim scroll-animation" data-animation="slide_down">
              FREQUENTLY
            </span>
          </span>
          <span>
            <span className="timeline-anim scroll-animation" data-animation="slide_down">
              ASKED QUESTIONS
            </span>
          </span>
        </h2>
      </div>

      <div className="accordion faq-wrap">
        {faqs.map((faq) => {
          const isOpen = openId === faq.id
          return (
            <div className="accordion-item faq-item" key={faq.id}>
              <h3 className="accordion-header">
                <button
                  type="button"
                  className={`accordion-button${isOpen ? '' : ' collapsed'}`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${faq.id}`}
                  id={`faq-button-${faq.id}`}
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                >
                  {faq.question}
                  <i className="faq-icon" aria-hidden>
                    {isOpen ? '−' : '+'}
                  </i>
                </button>
              </h3>

              <div
                id={`faq-panel-${faq.id}`}
                role="region"
                aria-labelledby={`faq-button-${faq.id}`}
                className={`accordion-collapse collapse${isOpen ? ' show' : ''}`}
                hidden={!isOpen}
              >
                <div className="accordion-body">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
