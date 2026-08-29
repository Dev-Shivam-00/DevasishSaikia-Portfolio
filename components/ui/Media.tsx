import Image from 'next/image'
import { getMedia, type MediaKey } from '@/data/media'
import { AutoplayVideo } from './AutoplayVideo'

interface MediaProps {
  mediaKey: MediaKey
  sizes: string
  priority?: boolean
  className?: string
  alt?: string
  /** Video only: 'full' pulls the full-width cut instead of the grid one. */
  variant?: 'preview' | 'full'
}

/**
 * Renders whatever the manifest actually holds: a video asset plays, an image
 * asset is an image. Callers pass a key and do not care which it is, so a slot
 * can be swapped from still to film in `data/media.ts` alone.
 */
export function Media({ mediaKey, sizes, priority = false, className, alt, variant }: MediaProps) {
  const asset = getMedia(mediaKey)

  if (asset.kind === 'video') {
    return <AutoplayVideo asset={asset} variant={variant} className={className} />
  }

  return (
    <Image
      src={asset.src}
      alt={alt ?? asset.alt}
      fill
      sizes={sizes}
      priority={priority}
      loading={priority ? undefined : 'lazy'}
      className={className}
    />
  )
}
