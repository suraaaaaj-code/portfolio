import { experience } from '../data.js';

export default function Experience() {
  return (
    <section id="experience" className="experience">
      <div className="section-head">
        <span>02</span>
        <h2>Experience</h2>
      </div>
      <div className="timeline">
        {experience.map((job) => (
          <div key={job.role + job.company} className="job">
            <div className="job-heading">
              <div className={`company-mark company-mark--${job.logoClass}`}>
                <img src={job.logo} alt={`${job.company} logo`} loading="lazy" />
              </div>
              <div className="job-heading-copy">
                <h3>{job.role}</h3>
                <p className="company-name">{job.company}</p>
              </div>
            </div>
            <p className="meta">{job.period} · {job.location}</p>
            <ul>
              {job.points.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
