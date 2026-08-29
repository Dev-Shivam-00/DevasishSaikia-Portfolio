/**
 * Moves focus into an overlay that is still being revealed by a CSS transition.
 *
 * The template shows its dialogs by transitioning `visibility` over 0.5s. Two
 * things make this harder than it looks:
 *
 *  - `focus()` is refused while the element is still `visibility: hidden`, but
 *    Chrome sets `document.activeElement` for a moment anyway before reverting,
 *    so a single "did it focus?" check reports a false success.
 *  - Reading computed style inside a rAF callback can report the transition's
 *    end value a frame early, so that is not a reliable gate either.
 *
 * So gate on `checkVisibility()`, which accounts for `visibility` properly, and
 * only stop once focus has held across two consecutive frames.
 */
function canSee(element: HTMLElement): boolean {
  if (typeof element.checkVisibility === 'function') {
    return element.checkVisibility({ visibilityProperty: true, opacityProperty: true })
  }
  return element.offsetParent !== null
}

export function focusWhenVisible(
  getTarget: () => HTMLElement | null,
  timeoutMs = 2000,
): () => void {
  let frame = 0
  let heldFrames = 0
  const start = performance.now()

  const attempt = () => {
    const target = getTarget()

    if (target && canSee(target)) {
      if (document.activeElement === target) {
        heldFrames += 1
        if (heldFrames >= 2) return
      } else {
        heldFrames = 0
        target.focus()
      }
    }

    if (performance.now() - start < timeoutMs) {
      frame = requestAnimationFrame(attempt)
    }
  }

  frame = requestAnimationFrame(attempt)
  return () => cancelAnimationFrame(frame)
}
