/**
 * Minimal in-process fixed-window limiter. Enough to blunt casual abuse of the
 * contact endpoint without introducing a datastore. On a multi-instance deploy
 * each instance keeps its own window — acceptable for this endpoint's purpose.
 */
const WINDOW_MS = 10 * 60 * 1000
// Tolerant enough that a visitor correcting a mistyped field is never locked
// out, tight enough to make scripted submission pointless.
const MAX_REQUESTS = 8
const MAX_TRACKED_KEYS = 5000

interface Window {
  count: number
  resetAt: number
}

const windows = new Map<string, Window>()

export function rateLimit(key: string, now = Date.now()): { allowed: boolean; retryAfter: number } {
  const existing = windows.get(key)

  if (!existing || now >= existing.resetAt) {
    // Opportunistic sweep so the map cannot grow without bound.
    if (windows.size >= MAX_TRACKED_KEYS) {
      for (const [k, w] of windows) if (now >= w.resetAt) windows.delete(k)
    }
    windows.set(key, { count: 1, resetAt: now + WINDOW_MS })
    return { allowed: true, retryAfter: 0 }
  }

  existing.count += 1
  if (existing.count > MAX_REQUESTS) {
    return { allowed: false, retryAfter: Math.ceil((existing.resetAt - now) / 1000) }
  }
  return { allowed: true, retryAfter: 0 }
}

/** Best-effort client identity from proxy headers. */
export function clientKey(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]?.trim() || 'unknown'
  return headers.get('x-real-ip')?.trim() || 'unknown'
}
