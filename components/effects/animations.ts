import type { ScrollAnimation } from '@/types/portfolio'

/**
 * The template's animation vocabulary, transcribed from `scroll_animations()`
 * in _template-reference/assets/js/main.js. These are the `gsap.from()` starting values, so the
 * element animates *from* them to its natural position.
 */
export const SCROLL_ANIMATIONS: Record<ScrollAnimation, gsap.TweenVars> = {
  slide_up: { y: -180 },
  slide_down: { y: 180 },
  slide_up2: { y: -100 },
  slide_down2: { y: 100 },
  fade_from_bottom: { y: 180, opacity: 0 },
  fade_from_top: { y: -180, opacity: 0 },
  fade_from_left: { x: -180, opacity: 0 },
  fade_from_right: { x: 180, opacity: 0 },
  fade_in: { opacity: 0 },
  rotate_up: { y: 180, rotation: 10, opacity: 0 },
  bronx_zoom_out: { scale: 2 },
  slide_and_scale: { scale: 1, opacity: 1 },
}

export const DEFAULT_ANIMATION: ScrollAnimation = 'fade_from_bottom'

/** Template breakpoint: below 809px the trigger offset widens to 30%. */
export const MOBILE_BREAKPOINT = 809
