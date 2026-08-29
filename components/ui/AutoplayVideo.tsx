'use client'

import { useEffect, useRef, useState } from 'react'
import type { VideoAsset } from '@/data/media'

interface AutoplayVideoProps {
  asset: VideoAsset
  /** 'preview' uses the lighter grid cut; 'full' the full-width one. */
  variant?: 'preview' | 'full'
  className?: string
}

/**
 * Muted, looping, inline video that plays by itself.
 *
 * Nothing is fetched until the element is near the viewport, and playback
 * pauses whenever it leaves — a page of six films would otherwise pull ~10 MB
 * on load. The poster frame (a still from the film itself) shows until the
 * first frame is decoded, so the layout never flashes empty.
 *
 * Under `prefers-reduced-motion` no video is requested at all and the poster is
 * rendered as a plain image instead.
 */
export function AutoplayVideo({ asset, variant = 'preview', className }: AutoplayVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [reduced, setReduced] = useState<boolean | null>(null)
  const [src, setSrc] = useState<string | null>(null)

  const source = variant === 'full' ? asset.src : asset.srcPreview

  // Resolved on the client so the server render never guesses the preference.
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(query.matches)
    const onChange = (event: MediaQueryListEvent) => setReduced(event.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reduced !== false) return
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (!entry) return
        if (entry.isIntersecting) {
          setSrc(source)
          void video.play().catch(() => undefined)
        } else {
          video.pause()
        }
      },
      { rootMargin: '300px 0px' },
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [reduced, source])

  // Start playing as soon as the source is attached.
  useEffect(() => {
    if (!src) return
    void videoRef.current?.play().catch(() => undefined)
  }, [src])

  if (reduced) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className={className} src={asset.poster} alt={asset.alt} loading="lazy" />
  }

  return (
    <video
      ref={videoRef}
      className={className}
      poster={asset.poster}
      muted
      loop
      playsInline
      autoPlay
      preload="none"
      // Decorative motion: the surrounding link/heading carries the name, and
      // an uncaptioned media element should not be announced on its own.
      aria-hidden
      tabIndex={-1}
      {...(src ? { src } : {})}
    />
  )
}
