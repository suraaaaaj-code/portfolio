import { experience } from '../data.js';

export default function Experience() {
  return <section id="experience" className="content-section experience-section section-frame">
    <div className="section-heading"><span className="section-number">02 / EXPERIENCE</span><span className="section-aside">SELECTED PROFESSIONAL WORK</span></div>
    <div className="section-intro-row"><h2 className="section-title">Work that<br /><em>moves things.</em></h2><p>Shipping useful software with product, design, and engineering teams.</p></div>
    <div className="experience-list">{experience.map((job, index) => <article className="experience-card" key={job.role + job.company}>
      <div className="experience-meta"><span>0{index + 1}</span><span>{job.period}</span><span>{job.location}</span></div>
      <div className="experience-company"><div className={`company-mark company-mark--${job.logoClass}`}><img src={job.logo} alt={`${job.company} logo`} loading="lazy" /></div><div><h3>{job.role}</h3><p>{job.company}</p></div></div>
      <ul>{job.points.map((point) => <li key={point}>{point}</li>)}</ul>
      <div className="experience-tools"><b>TOOLS</b>{job.stack.map((tool) => <span key={tool}>{tool}</span>)}</div>
    </article>)}</div>
  </section>;
}
