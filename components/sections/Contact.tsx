import { externalLinks, site } from '@/data/site'
import { Media } from '@/components/ui/Media'
import { ContactForm } from './ContactForm'

/** The template's CTA section, closing the page with the contact form. */
export function Contact() {
  return (
    <section className="cta-sec" id="contact" aria-labelledby="contact-heading">
      <div className="section-header2">
        <h2 className="title" id="contact-heading">
          <span>LET&rsquo;S MAKE</span>
          <span>SOMETHING</span>
        </h2>
        <a href="#name" className="theme-btn">
          CONTACT NOW
        </a>
      </div>

      <div className="cta-content about-bottom-content-wrap">
        <div className="img-box">
          <div className="img-box-inner" data-parallax="-20">
            <Media mediaKey="ctaStill" sizes="(max-width: 809px) 100vw, 760px" />
          </div>
        </div>

        <div className="about-bottom-content">
          <div>
            <p>
              BASED IN {site.location}, WORKING ON AI FILMS, AI ADVERTISING <br />
              AND CREATIVE DIRECTION. LET&rsquo;S CREATE SOMETHING THAT <br />
              WOULDN&rsquo;T HAVE BEEN POSSIBLE YESTERDAY.
            </p>
          </div>

          <ContactForm />

          <ul className="social-links">
            {site.email ? (
              <li>
                <a href={`mailto:${site.email}`}>
                  {site.email}
                  <svg xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 24 24" aria-hidden>
                    <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
                  </svg>
                </a>
              </li>
            ) : null}
            {externalLinks().map((link) => (
              <li key={link.label}>
                <a href={link.href} target="_blank" rel="noopener noreferrer">
                  {link.label}
                  <svg xmlns="http://www.w3.org/2000/svg" focusable="false" viewBox="0 0 24 24" aria-hidden>
                    <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
