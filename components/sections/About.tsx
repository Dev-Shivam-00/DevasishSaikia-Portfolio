import { site } from '@/data/site'
import { Media } from '@/components/ui/Media'
import { RevealLines } from '@/components/effects/ScrollReveal'

export function About() {
  return (
    <section className="about-sec" id="about" aria-labelledby="about-heading">
      <div className="section-header2">
        <h2 className="title sticky-statement2" id="about-heading">
          <span className="transform-anim">
            <RevealLines lines={['MORE ABOUT']} />
          </span>
          <span className="transform-anim">
            <RevealLines lines={[`${site.firstName}©`]} />
          </span>
        </h2>
      </div>

      <div className="about-bottom-content-wrap">
        <div className="img-box">
          <div className="img-box-inner" data-parallax="-20">
            <Media
              mediaKey="aboutStill"
              sizes="(max-width: 809px) 100vw, 760px"
            />
          </div>
        </div>

        <div className="about-bottom-content">
          <div>
            <p className="lead-statement">
              I&rsquo;M A CREATIVE STRATEGIST, FILMMAKER AND CREATIVE TECHNOLOGIST.
              <br />
              MY WORK SITS WHERE CINEMA, ADVERTISING AND ARTIFICIAL INTELLIGENCE MEET —
              <br />
              AND WHERE A GOOD IDEA STILL DECIDES EVERYTHING THAT FOLLOWS.
            </p>
          </div>

          <p>
            A consciously evolving polymath who enjoys putting creativity and technology in the
            same room. Thirteen-plus years across branding, communication, content, media and
            emerging technology — a route through marketing management, regional operations and
            brand strategy before founding {site.companyShort}, where I continue as {site.role}.
            That range is the point: designing around <i>&ldquo;XR and AI applications&rdquo;</i>{' '}
            is less a change of discipline than the same instinct arriving at a new medium.
          </p>

          <p className="responsive-mode">
            Creative strategist and filmmaker working across cinema, advertising and AI.
          </p>

          <a
            href={site.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="theme-btn"
          >
            {site.role}, {site.companyShort}
          </a>
        </div>
      </div>
    </section>
  )
}
