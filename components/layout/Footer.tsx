import { site } from '@/data/site'

export function Footer() {
  return (
    <footer className="footer-area">
      <div className="footer-big-text">
        <span className="timeline-anim scroll-animation" data-animation="slide_down">
          {site.lastName}
        </span>
      </div>

      <div className="copyright">
        <p>
          &copy;{new Date().getFullYear()} {site.name} — {site.role}, {site.companyShort}
        </p>
        <div className="right">
          <a href="#top" id="back-to-top">
            GO BACK TO TOP
          </a>
        </div>
      </div>
    </footer>
  )
}
