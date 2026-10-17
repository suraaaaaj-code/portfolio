import { projects } from '../data.js';

export default function Projects() {
  return (
    <section id="projects">
      <div className="section-head">
        <span>04</span>
        <h2>Projects</h2>
      </div>
      <div className="grid">
        {projects.map((p) => (
          <article key={p.title} className="card">
            <h3>{p.title}</h3>
            <p>{p.desc}</p>
            <div className="tags">
              {p.tags.map((t) => <span key={t} className="chip">{t}</span>)}
            </div>
            {(p.link || p.github) && (
              <div className="links">
                {p.link && <a href={p.link} target="_blank" rel="noreferrer">Live demo →</a>}
                {p.github && <a href={p.github} target="_blank" rel="noreferrer">Code →</a>}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
