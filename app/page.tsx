import { MenuProvider } from '@/components/layout/MenuContext'
import { PopupMenu } from '@/components/layout/PopupMenu'
import { Preloader } from '@/components/layout/Preloader'
import { MagicCursor } from '@/components/layout/MagicCursor'
import { Footer } from '@/components/layout/Footer'
import { TemplateEffects } from '@/components/effects/TemplateEffects'

import { Hero } from '@/components/sections/Hero'
import { FullImage } from '@/components/sections/FullImage'
import { FeaturedWork } from '@/components/sections/FeaturedWork'
import { About } from '@/components/sections/About'
import { Partners } from '@/components/sections/Partners'
import { Expertise } from '@/components/sections/Expertise'
import { Philosophy } from '@/components/sections/Philosophy'
import { Career } from '@/components/sections/Career'
import { Process } from '@/components/sections/Process'
import { Engagements } from '@/components/sections/Engagements'
import { Faq } from '@/components/sections/Faq'
import { Contact } from '@/components/sections/Contact'

/**
 * Section order follows the Bronx template exactly. Only the content and media
 * change: the Awards block carries factual engagements, and the template's
 * testimonial block is omitted rather than filled with invented quotes.
 */
export default function HomePage() {
  return (
    <MenuProvider>
      <MagicCursor />
      <Preloader />

      <main className="bronx-main home-page">
        <PopupMenu />

        <div id="smooth-wrapper">
          <div id="smooth-content">
            <Hero />
            <FullImage mediaKey="stillPrimary" priority className="pt-30" />
            <FeaturedWork />
            <About />
            <Partners />
            <Expertise />
            <Philosophy />
            <FullImage mediaKey="stillSecondary" />
            <Career />
            <Process />
            <Engagements />
            <FullImage mediaKey="stillTertiary" />
            <Faq />
            <Contact />
            <Footer />
          </div>
        </div>
      </main>

      <TemplateEffects />
    </MenuProvider>
  )
}
