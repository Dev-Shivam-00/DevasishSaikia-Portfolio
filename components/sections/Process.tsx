import { processSteps } from '@/data/experience'

/** Maps onto the template's sticky Favourite Stack section. */
export function Process() {
  return (
    <section
      className="favourite-stack-sec sticky-elem-sec"
      id="process"
      aria-labelledby="process-heading"
    >
      <div className="custom-row">
        <div className="left">
          <h2 className="sticky-statement" id="process-heading">
            FROM IDEA
            <br />
            TO FRAME
          </h2>
        </div>

        <div className="right">
          <div className="favourite-stack-lists">
            {processSteps.map((step) => (
              <div className="favourite-stack-box" key={step.index}>
                <div className="favourite-stack-box-left">
                  <div className="icon" aria-hidden>
                    <span className="process-index">{step.index}</span>
                  </div>
                </div>
                <div className="content">
                  <h3>{step.title}</h3>
                  <div className="content-body">
                    <p className="stack-meta">
                      {step.discipline} <span>{step.index}</span>
                    </p>
                    <p>{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
