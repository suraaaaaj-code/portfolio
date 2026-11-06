import { projects } from '../data.js';

function ProjectVisual({ type }) {
  if (type === 'tracker') {
    return (
      <div className="project-visual tracker-visual" data-build-block data-agent="Brands" data-code="<ProjectVisual />" aria-hidden="true">
        <div className="visual-header"><span>INSIGHT / 01</span><i>LIVE CONCEPT</i></div>
        <div className="tracker-orb"><span>₹</span></div><div className="tracker-copy"><small>MONTHLY SPEND</small><strong>28,450</strong><span>↗ 12.8% spending insights</span></div>
        <div className="tracker-bars">{[32, 55, 42, 76, 62, 89, 55, 72, 46, 83, 58, 96].map((height, index) => <i style={{ '--bar-height': `${height}%` }} key={index} />)}</div>
      </div>
    );
  }
  if (type === 'pipeline') {
    return <div className="project-visual pipeline-visual" data-build-block data-agent="Hub" data-code="<PipelineDiagram />" aria-hidden="true">
      <div className="visual-header"><span>DELIVERY / 03</span><i>PLANNED LAB</i></div>
      <div className="pipeline-flow"><span>COMMIT</span><b>→</b><span>TEST</span><b>→</b><span>BUILD</span><b>→</b><span>DEPLOY</span></div>
      <div className="pipeline-terminal"><i>● ● ●</i><p>$ docker build -t app .</p><p>$ npm run test</p><p className="pipeline-success">✓ pipeline ready for implementation</p></div>
    </div>;
  }
  if (type === 'cloud') {
    return <div className="project-visual cloud-visual" data-build-block data-agent="Layout" data-code="<CloudMap />" aria-hidden="true">
      <div className="visual-header"><span>INFRASTRUCTURE / 04</span><i>PLANNED LAB</i></div>
      <div className="cloud-map"><span>WEB CLIENT</span><b>↓</b><span>API SERVICE</span><b>↓</b><span>DATABASE</span></div>
      <div className="cloud-region">DELHI REGION <i>○ HEALTH CHECK</i></div>
    </div>;
  }
  return (
    <div className="project-visual web-visual" data-build-block data-agent="Brands" data-code="<WebPreview />" aria-hidden="true">
      <div className="visual-header"><span>PRODUCT / 02</span><i>RESPONSIVE WEB</i></div>
      <div className="web-browser"><div className="browser-chrome"><span /><span /><span /><small>app.yourproduct.dev</small></div>
        <div className="web-layout"><i /><div><b /><b /><b /><span /></div></div>
        <div className="web-api">GET /api/v1/products <strong>200 OK</strong></div>
      </div>
    </div>
  );
}

export default function Projects() {
  return <section id="projects" className="content-section projects-section" data-build-section>
      <div className="section-frame">
      <div className="section-heading" data-build-block data-code="<SectionLabel />"><span className="section-number">04 / SELECTED WORK</span><span className="section-aside">IDEAS INTO APPLICATIONS</span></div>
      <div className="section-intro-row"><h2 className="section-title" data-build-block data-code="<ProjectsHeadline />">Made with<br /><em>intention.</em></h2><p data-build-block data-code="<ProjectsIntro />">Selected full-stack work, alongside two clearly marked project ideas on my Full Stack and DevOps roadmap.</p></div>
      <div className="project-grid">
        {projects.map((project) => (
          <article key={project.title} className="project-card">
            <ProjectVisual type={project.visual} />
            <div className="project-meta" data-build-block data-agent="Clients" data-code="<ProjectStatus />"><span>PROJECT {project.index}</span><span className={project.status === 'In development' ? 'status-live' : project.status === 'Planned' ? 'status-planned' : 'status-done'}><i />{project.status}</span></div>
            <h3 data-build-block data-agent="Copy" data-code="<ProjectTitle />">{project.title}</h3>
            <p data-build-block data-code="<ProjectDescription />">{project.desc}</p>
            <div className="tags" data-build-block data-agent="Stack" data-code="<TechTags />">{project.tags.map((tag) => <span key={tag} className="chip">{tag}</span>)}</div>
          </article>
        ))}
      </div>
      </div>
    </section>;
}
