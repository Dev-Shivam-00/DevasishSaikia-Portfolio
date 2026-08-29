import { getMedia, type MediaKey } from '@/data/media'
import { AutoplayVideo } from '@/components/ui/AutoplayVideo'

interface FullImageProps {
  mediaKey: MediaKey
  /** Only the first full-bleed frame sits near the fold. */
  priority?: boolean
  className?: string
}

/**
 * The template's full-bleed frame, including its `scaleDown` scrub.
 *
 * A film in this slot plays; a still uses <picture>, because the frame is
 * art-directed — the template's box is 548px tall at 390px wide, so the
 * landscape crop has to be swapped for a portrait one on narrow screens. Both
 * still sources are Cloudinary URLs that already carry `q_auto`/`f_auto`, so
 * nothing is lost by not routing them through the Next image optimiser.
 */
export function FullImage({ mediaKey, priority = false, className }: FullImageProps) {
  const asset = getMedia(mediaKey)

  return (
    <div className={className ? `full-image-sec ${className}` : 'full-image-sec'}>
      <div className="full-image-box">
        {asset.kind === 'video' ? (
          <AutoplayVideo asset={asset} variant="full" className="scaleDown" />
        ) : (
          <picture>
            {asset.portraitSrc ? (
              <source media="(max-width: 809px)" srcSet={asset.portraitSrc} />
            ) : null}
            <img
              className="scaleDown"
              src={asset.src}
              alt={asset.alt}
              decoding={priority ? 'sync' : 'async'}
              loading={priority ? 'eager' : 'lazy'}
              {...(priority ? { fetchPriority: 'high' as const } : {})}
            />
          </picture>
        )}
      </div>
    </div>
  )
}
