import { experience } from '../data.js';

export default function Experience() {
  return (
    <section id="experience" className="experience content-section">
      <div className="section-kicker"><span>02 / EXPERIENCE</span><span>SELECTED PROFESSIONAL WORK</span></div>
      <div className="section-title-row"><h2 className="display-heading">Where I’ve<br /><em>contributed.</em></h2><p>Shipping useful software with product, design, and engineering teams.</p></div>
      <div className="timeline">
        {experience.map((job, index) => (
          <div key={job.role + job.company} className="job">
            <span className="job-number">0{index + 1}</span>
            <div className="job-heading">
              <div className={`company-mark company-mark--${job.logoClass}`}>
                <img src={job.logo} alt={`${job.company} logo`} loading="lazy" />
              </div>
              <div className="job-heading-copy">
                <h3>{job.role}</h3>
                <p className="company-name">{job.company}</p>
              </div>
            </div>
            <p className="meta">{job.period} <span>·</span> {job.location}</p>
            <ul>
              {job.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
            <div className="job-stack"><span>TOOLS</span>{job.stack.map((item) => <span key={item}>{item}</span>)}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
