import Script from 'next/script'
import { site } from '@/data/site'

/**
 * Google Analytics (gtag.js).
 *
 * `afterInteractive` defers both scripts until the page is interactive, so the
 * tag never competes with the hero reel or the work-grid films for bandwidth.
 *
 * Loads in production builds only — `npm run dev` would otherwise report every
 * local page view into the live property. To check the tag on your own machine,
 * run `npm run build && npm start` rather than `npm run dev`.
 *
 * This is a single page with hash anchors and no client-side routing, so the
 * automatic pageview on load is the whole story; there is no route-change
 * listener to add.
 */
export function Analytics() {
  const gaId = site.analyticsId

  if (!gaId || process.env.NODE_ENV !== 'production') return null

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(gaId)}`}
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', ${JSON.stringify(gaId)});`}
      </Script>
    </>
  )
}
