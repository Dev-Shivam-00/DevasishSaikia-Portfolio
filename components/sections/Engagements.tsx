import { engagements } from '@/data/experience'

/**
 * Occupies the template's Awards block. No award is claimed — the source
 * material supports none — so the same layout carries current professional
 * engagements instead.
 */
export function Engagements() {
  return (
    <section
      className="awards-sec experience2-sec sticky-elem-sec"
      aria-labelledby="engagements-heading"
    >
      <div className="custom-row">
        <div className="left">
          <h2 className="sticky-statement3" id="engagements-heading">
            ENGAGEMENTS
          </h2>
        </div>

        <div className="right">
          <div className="experience2-lists">
            {engagements.map((entry) => (
              <div
                className="experience2-box awards-box"
                key={`${entry.organisation}-${entry.period}`}
              >
                <div className="experience2-box-header">{entry.organisation}</div>
                <div className="experience2-box-body">
                  <h3>
                    {entry.role} <span>{entry.period}</span>
                  </h3>
                  <p>{entry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
