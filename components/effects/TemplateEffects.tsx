'use client'

import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import {
  DEFAULT_ANIMATION,
  MOBILE_BREAKPOINT,
  SCROLL_ANIMATIONS,
} from './animations'
import type { ScrollAnimation } from '@/types/portfolio'

/**
 * Recreates the Bronx template's motion system (_template-reference/assets/js/main.js +
 * _template-reference/assets/js/themescroll.js) as a single React effect, with jQuery replaced by
 * DOM APIs and GSAP driven from npm rather than bundled plugin files.
 *
 * Everything is torn down on unmount, and the whole system is skipped when the
 * visitor prefers reduced motion — the page then renders as plain static
 * layout, which is what the template's markup already is without JS.
 */
export function TemplateEffects() {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin)

    const isMobile = () => window.innerWidth < MOBILE_BREAKPOINT
    const ctx = gsap.context(() => {
      /* ── Smooth scrolling (themescroll.js: ScrollSmoother.create({smooth:2})) ──
         Desktop only. The template itself unpins `main.bronx-main` below 809px,
         and a transform-driven smoother fights native momentum scrolling on
         touch devices — which left the page unable to scroll at all. */
      let smoother: ScrollSmoother | undefined
      if (
        !isMobile() &&
        document.getElementById('smooth-wrapper') &&
        document.getElementById('smooth-content')
      ) {
        smoother = ScrollSmoother.create({
          wrapper: '#smooth-wrapper',
          content: '#smooth-content',
          smooth: 2,
          normalizeScroll: true,
          ignoreMobileResize: true,
          effects: false,
        })
        // Lets the stylesheet restore the template's fixed scroll container.
        document.documentElement.classList.add('smoother-active')
      }

      /* ── Scroll reveals (main.js: scroll_animations) ── */
      const offset = isMobile() ? '30%' : '10%'
      gsap.utils.toArray<HTMLElement>('.scroll-animation').forEach((box) => {
        const name = (box.dataset.animation as ScrollAnimation | undefined) ?? DEFAULT_ANIMATION
        const from = SCROLL_ANIMATIONS[name] ?? SCROLL_ANIMATIONS[DEFAULT_ANIMATION]

        gsap.from(box, {
          ...from,
          ...(box.dataset.animationDuration
            ? { duration: Number(box.dataset.animationDuration) }
            : {}),
          scrollTrigger: {
            trigger: box,
            // bronx_zoom_out fires flush with the viewport edge in the original
            start: name === 'bronx_zoom_out' ? 'top bottom' : `top bottom+=${offset}`,
            toggleActions: 'play none none reverse',
          },
        })
      })

      /* ── Full-bleed image scrub (themescroll.js: .scaleDown 1.4 → 1) ── */
      gsap.utils.toArray<HTMLElement>('.scaleDown').forEach((image) => {
        gsap.fromTo(
          image,
          { scale: 1.4 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: image.closest('.full-image-sec') ?? image,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })

      /* ── Sticky section headings (themescroll.js: .sticky-statement*) ── */
      const stickyGroups: ReadonlyArray<readonly [string, number]> = [
        ['.sticky-statement', 1000],
        ['.sticky-statement3', 700],
        ['.sticky-statement4', 1400],
      ]
      for (const [selector, distance] of stickyGroups) {
        gsap.utils.toArray<HTMLElement>(selector).forEach((element) => {
          ScrollTrigger.create({
            trigger: element,
            pin: !isMobile(),
            start: 'top top+=100',
            end: `+=${distance}`,
          })
        })
      }

      /* ── Parallax (replaces jarallax's data-jarallax-element) ── */
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((element) => {
        const shift = Number(element.dataset.parallax || -20)
        gsap.fromTo(
          element,
          { yPercent: -shift / 2 },
          {
            yPercent: shift / 2,
            ease: 'none',
            scrollTrigger: {
              trigger: element.parentElement ?? element,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        )
      })

      /* ── In-page anchors ──────────────────────────────────────
         Native hash navigation scrolls ScrollSmoother's #smooth-wrapper —
         it is overflow:hidden, but anchors and focus still scroll it — while
         the smoother's own transform stays at 0. The page then sits on the
         target with dead space below it and cannot be scrolled back up.
         So drive the smoother instead, and convert any native wrapper scroll
         that slips through (keyboard focus, find-in-page) into a real one. */
      const wrapper = document.getElementById('smooth-wrapper')

      const scrollToHash = (hash: string, smooth: boolean): boolean => {
        if (!smoother || hash.length < 2) return false
        let target: Element | null = null
        try {
          target = document.querySelector(hash)
        } catch {
          return false
        }
        if (!target) return false
        if (wrapper) wrapper.scrollTop = 0
        smoother.scrollTo(target, smooth)
        return true
      }

      const onAnchorClick = (event: MouseEvent) => {
        if (!smoother) return
        if (event.defaultPrevented || event.button !== 0) return
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

        const link = (event.target as Element | null)?.closest?.('a[href]')
        const href = link?.getAttribute('href')
        if (!href || !href.startsWith('#')) return

        if (scrollToHash(href, true)) {
          event.preventDefault()
          window.history.pushState(null, '', href)
        }
      }

      const onWrapperScroll = () => {
        if (!wrapper || !smoother || wrapper.scrollTop === 0) return
        const slipped = wrapper.scrollTop
        wrapper.scrollTop = 0
        smoother.scrollTop(smoother.scrollTop() + slipped)
      }

      document.addEventListener('click', onAnchorClick)
      wrapper?.addEventListener('scroll', onWrapperScroll)

      // A shared link like /#contact lands mid-page the same way.
      if (window.location.hash) {
        gsap.delayedCall(0.35, () => scrollToHash(window.location.hash, false))
      }

      /* ── Back to top (themescroll.js) ── */
      const backToTop = document.getElementById('back-to-top')
      if (backToTop) {
        const onClick = (event: Event) => {
          event.preventDefault()
          if (smoother) smoother.scrollTo(0, true)
          else gsap.to(window, { scrollTo: 0 })
        }
        backToTop.addEventListener('click', onClick)
        return () => {
          backToTop.removeEventListener('click', onClick)
          document.removeEventListener('click', onAnchorClick)
          wrapper?.removeEventListener('scroll', onWrapperScroll)
        }
      }
      return () => {
        document.removeEventListener('click', onAnchorClick)
        wrapper?.removeEventListener('scroll', onWrapperScroll)
      }
    })

    // Sections mount with images still loading; refresh once they settle.
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      document.documentElement.classList.remove('smoother-active')
      ctx.revert()
      ScrollSmoother.get()?.kill()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return null
}
