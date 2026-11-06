import { experience } from '../data.js';

export default function Experience() {
  return <section id="experience" className="content-section experience-section section-frame" data-build-section>
    <div className="section-heading" data-build-block data-code="<SectionLabel />"><span className="section-number">02 / EXPERIENCE</span><span className="section-aside">SELECTED PROFESSIONAL WORK</span></div>
    <div className="section-intro-row"><h2 className="section-title" data-build-block data-code="<ExperienceHeadline />">Work that<br /><em>moves things.</em></h2><p data-build-block data-code="<ExperienceIntro />">Shipping useful software with product, design, and engineering teams.</p></div>
    <div className="experience-list">{experience.map((job, index) => <article className="experience-card" key={job.role + job.company}>
      <div className="experience-meta"><span>0{index + 1}</span><span>{job.period}</span><span>{job.location}</span></div>
      <div className="experience-company" data-build-block data-agent="Work" data-code="<RoleAndCompany />"><div className={`company-mark company-mark--${job.logoClass}`}><img src={job.logo} alt={`${job.company} logo`} loading="lazy" /></div><div><h3>{job.role}</h3><p>{job.company}</p></div></div>
      <ul>{job.points.map((point) => <li data-build-block data-agent="Work" data-code="<ExperienceDetail />" key={point}>{point}</li>)}</ul>
      <div className="experience-tools"><b data-build-block data-code="<ToolsLabel />">TOOLS</b>{job.stack.map((tool) => <span data-build-block data-agent="Stack" data-code="<ToolChip />" key={tool}>{tool}</span>)}</div>
    </article>)}</div>
  </section>;
}
