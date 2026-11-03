import { projects } from '../data.js';

function ProjectVisual({ type }) {
  if (type === 'tracker') {
    return (
      <div className="project-visual tracker-visual" aria-hidden="true">
        <div className="tracker-top"><span>MONTHLY SPEND</span><b>↗ 12.8%</b></div>
        <strong>₹ 28,450</strong>
        <div className="tracker-chart"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <div className="tracker-legend"><span>● essentials</span><span>● lifestyle</span><span>● savings</span></div>
      </div>
    );
  }
  return (
    <div className="project-visual web-visual" aria-hidden="true">
      <div className="browser-chrome"><span /><span /><span /><small>app.yourproduct.dev</small></div>
      <div className="web-layout"><i /><div><b /><b /><b /><span /></div></div>
      <div className="web-api">GET /api/v1/products <strong>200 OK</strong></div>
    </div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="projects-section content-section">
      <div className="section-kicker"><span>04 / SELECTED WORK</span><span>IDEAS INTO APPLICATIONS</span></div>
      <div className="section-title-row"><h2 className="display-heading">Built with<br /><em>purpose.</em></h2><p>Personal and full-stack work across mobile apps, APIs, databases, and AI integrations.</p></div>
      <div className="project-grid">
        {projects.map((project) => (
          <article key={project.title} className="project-card">
            <ProjectVisual type={project.visual} />
            <div className="project-meta"><span>PROJECT {project.index}</span><span className={project.status === 'In development' ? 'status-live' : 'status-done'}><i />{project.status}</span></div>
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
            <div className="tags">{project.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
