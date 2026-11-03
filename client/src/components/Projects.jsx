import { projects } from '../data.js';

function ProjectVisual({ type }) {
  if (type === 'tracker') {
    return (
      <div className="project-visual tracker-visual" aria-hidden="true">
        <div className="visual-header"><span>INSIGHT / 01</span><i>LIVE CONCEPT</i></div>
        <div className="tracker-orb"><span>₹</span></div><div className="tracker-copy"><small>MONTHLY SPEND</small><strong>28,450</strong><span>↗ 12.8% spending insights</span></div>
        <div className="tracker-bars">{[32, 55, 42, 76, 62, 89, 55, 72, 46, 83, 58, 96].map((height, index) => <i style={{ '--bar-height': `${height}%` }} key={index} />)}</div>
      </div>
    );
  }
  return (
    <div className="project-visual web-visual" aria-hidden="true">
      <div className="visual-header"><span>PRODUCT / 02</span><i>RESPONSIVE WEB</i></div>
      <div className="web-browser"><div className="browser-chrome"><span /><span /><span /><small>app.yourproduct.dev</small></div>
        <div className="web-layout"><i /><div><b /><b /><b /><span /></div></div>
        <div className="web-api">GET /api/v1/products <strong>200 OK</strong></div>
      </div>
    </div>
  );
}

export default function Projects() {
  return <section id="projects" className="content-section projects-section">
      <div className="section-frame">
      <div className="section-heading"><span className="section-number">04 / SELECTED WORK</span><span className="section-aside">IDEAS INTO APPLICATIONS</span></div>
      <div className="section-intro-row"><h2 className="section-title">Made with<br /><em>intention.</em></h2><p>Personal and full-stack work across mobile apps, APIs, databases, and AI integrations.</p></div>
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
      </div>
    </section>;
}
