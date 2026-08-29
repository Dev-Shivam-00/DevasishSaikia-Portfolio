import { site } from '@/data/site'

/** Maps onto the template's Motivation section. */
export function Philosophy() {
  return (
    <section className="motivation-sec" aria-labelledby="philosophy-heading">
      <div className="custom-row">
        <div className="left">
          <h2 id="philosophy-heading">PHILOSOPHY</h2>
        </div>
        <div className="right">
          <div className="motivation-content">
            <p>
              Technology changes. Stories remain. A camera was never the reason films worked; it
              was the reason they became possible. AI is the same kind of shift — an expansion of
              what can be imagined and afforded, not a replacement for the judgement that decides{' '}
              <i>&ldquo;what is worth making&rdquo;</i> in the first place.
            </p>
            <p>
              So the tool is never the idea. AI widens what direction can reach for, and the human
              judgement in the middle — selecting, correcting, cutting — is what keeps a sequence
              of frames from becoming merely output. The objective has not moved: make something
              people remember.
            </p>
            <p className="motivation-signature">
              {site.name} — {site.role}, {site.companyShort}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
