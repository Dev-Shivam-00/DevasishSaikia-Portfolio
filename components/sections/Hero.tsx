import { site } from '@/data/site'
import { Header } from '@/components/layout/Header'
import { ScrollReveal } from '@/components/effects/ScrollReveal'

export function Hero() {
  return (
    <section className="hero-sec" id="top">
      <Header />

      <div className="hero-sec-content">
        <span className="available-status">{site.availability}</span>

        <h1>
          <span>
            <span className="timeline-anim scroll-animation" data-animation="slide_down">
              {site.firstName}
            </span>
          </span>
          <span>
            <span className="timeline-anim scroll-animation" data-animation="slide_down">
              {site.lastName}
            </span>
          </span>
        </h1>
      </div>

      <ScrollReveal animation="slide_down" className="hero-footer-wrap">
        <p>BASED IN {site.location}</p>
        <div className="hero-footer-right">
          <a href="#work" className="link-with-line">
            {site.disciplinePrimary}
          </a>
          <p>{site.disciplineSecondary}</p>
        </div>
      </ScrollReveal>
    </section>
  )
}
