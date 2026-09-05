import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, Inter_Tight } from 'next/font/google'
import { site } from '@/data/site'
import { buildStructuredData } from '@/lib/structured-data'
import { Analytics } from '@/components/analytics/Analytics'

// The template's own type system, loaded through next/font instead of a
// render-blocking Google Fonts <link>.
import '../styles/base.css'
import '../styles/template/style.css'
import '../styles/template/dark-mode.css'
import '../styles/template/responsive.css'
import '../styles/overrides.css'

const instrument = Instrument_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font_instrument',
  display: 'swap',
})

const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font_inter_tight',
  display: 'swap',
})

const title = `${site.name} — AI Films, AI Advertising & Creative Direction`
const description =
  'Devasish Saikia is an AI filmmaker and creative director making AI films, AI advertising films and cinematic visual stories. Founder / Director, Orglife Industries, Ahmedabad.'

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s — ${site.name}` },
  description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: [
    'Devasish Saikia',
    'AI filmmaker',
    'AI films',
    'AI advertising',
    'AI advertising films',
    'creative direction',
    'cinematic storytelling',
    'AI storytelling',
    'creative technology',
    'visual storytelling',
    'Orglife Industries',
    'Ahmedabad',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title,
    description,
    locale: 'en_IN',
    images: [
      {
        // A frame from Devasish's own AI film work, served from Orglife's CDN.
        url: 'https://res.cloudinary.com/dpblcamaw/video/upload/so_16,q_auto:good,f_jpg,w_1200,h_630,c_fill,g_auto/v1787655396/AI_Films_dtmc77.jpg',
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [
      'https://res.cloudinary.com/dpblcamaw/video/upload/so_16,q_auto:good,f_jpg,w_1200,h_630,c_fill,g_auto/v1787655396/AI_Films_dtmc77.jpg',
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  category: 'Film & Advertising',
}

export const viewport: Viewport = {
  themeColor: '#000000',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${instrument.variable} ${interTight.variable}`}>
      <head>
        {/* Orglife's CDNs serve every image and video on the page. */}
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://orglife.vercel.app" />
      </head>
      <body className="dark-mode">
        <a href="#work" className="skip-link">
          Skip to content
        </a>
        {children}
        <script
          type="application/ld+json"
          // Built from a fixed object in lib/structured-data.ts — no user input.
          dangerouslySetInnerHTML={{ __html: buildStructuredData() }}
        />
        <Analytics />
      </body>
    </html>
  )
}
