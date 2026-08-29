import Image from 'next/image'
import { clientLogos } from '@/data/media'

/**
 * Orglife's own client-logo marquee, consumed from their live URLs.
 * Presented as studio association — not as a personal client roster.
 */
export function Partners() {
  return (
    <div className="partner-sec" aria-label="Brands and institutions Orglife has worked with">
      <ul>
        {clientLogos.map((src, index) => (
          <li key={src}>
            <span className="partner-box">
              <span className="partner-box-inner">
                <Image
                  src={src}
                  alt=""
                  width={160}
                  height={90}
                  sizes="160px"
                  loading="lazy"
                  style={{ width: 'auto', height: 'auto' }}
                />
              </span>
            </span>
            <span className="sr-only">Client {index + 1}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
