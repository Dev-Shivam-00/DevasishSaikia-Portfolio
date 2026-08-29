import { projects } from '@/data/projects'
import { Media } from '@/components/ui/Media'
import { RevealLines } from '@/components/effects/ScrollReveal'

export function FeaturedWork() {
  return (
    <section className="featured-work-sec" id="work" aria-labelledby="work-heading">
      <div className="section-header">
        <div className="left">
          <h2 id="work-heading">
            <RevealLines lines={['SELECTED', 'WORK']} />
          </h2>
        </div>
        <div className="right">
          <p>
            Films, advertising and direction made where human imagination meets machine
            intelligence — chosen for the idea rather than the client list.
          </p>
        </div>
      </div>

      <div className="featured-work-lists">
        {projects.map((project) => (
          <article className="featured-card" key={project.slug}>
            <a
              className="link-overlay"
              href="#contact"
              aria-label={`${project.title} — ${project.category}. Enquire about this project.`}
            />
            <div className="img-box">
              <Media
                mediaKey={project.media}
                sizes="(max-width: 809px) 100vw, 50vw"
              />
            </div>
            <div className="content">
              <div className="left">
                <p className="title">{project.title}</p>
                <p className="subtitle">{project.category}</p>
              </div>
              <div className="right">
                {project.year ? <span className="date">{project.year}</span> : null}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
