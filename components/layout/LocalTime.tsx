'use client'

import { useEffect, useState } from 'react'
import { site } from '@/data/site'

/**
 * The template's live clock (main.js `startTime()`), pinned to Devasish's
 * timezone rather than the visitor's. Renders a stable placeholder on the
 * server so hydration never mismatches.
 */
export function LocalTime() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    const format = new Intl.DateTimeFormat('en-GB', {
      timeZone: site.timeZone,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    })

    const tick = () => setTime(format.format(new Date()))
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [])

  return (
    <span id="realtime" suppressHydrationWarning>
      {time ?? '00:00:00'}
    </span>
  )
}
