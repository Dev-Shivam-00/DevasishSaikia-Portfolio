import { career } from '@/data/experience'

/** The template's sticky Experience section. */
export function Career() {
  return (
    <section
      className="experience2-sec sticky-elem-sec"
      id="career"
      aria-labelledby="career-heading"
    >
      <div className="custom-row">
        <div className="left">
          <h2 className="sticky-statement" id="career-heading">
            EXPERIENCE
          </h2>
        </div>

        <div className="right">
          <div className="experience2-lists">
            {career.map((entry) => (
              <div className="experience2-box" key={`${entry.organisation}-${entry.period}`}>
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
