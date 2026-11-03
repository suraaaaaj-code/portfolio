import { skillGroups, education, certifications } from '../data.js';

export default function Skills() {
  return (
    <section id="skills" className="skills-section content-section">
      <div className="section-kicker"><span>03 / TOOLKIT</span><span>SKILLS, SYSTEMS & STUDY</span></div>
      <div className="section-title-row"><h2 className="display-heading">Tools for<br /><em>the whole stack.</em></h2><p>Grounded in practical web engineering, with a growing focus on mobile and AI APIs.</p></div>
      <div className="skills-layout">
        <div className="skill-groups">
          {skillGroups.map((group, index) => (
            <div key={group.title} className="skill-group">
              <h3><span>0{index + 1}</span>{group.title}</h3>
              <div className="chip-row">
                {group.items.map((item) => <span key={item} className="chip">{item}</span>)}
              </div>
            </div>
          ))}
        </div>
        <aside className="education-card">
          <span className="education-index">EDUCATION / 2022—26</span>
          <div className="education-orbit" aria-hidden="true"><span>SK</span><i /><b /></div>
          <h3>{education.school}</h3>
          <p>{education.degree}</p>
          <div className="education-score"><span>{education.period}</span><strong>{education.detail}</strong></div>
          <div className="coursework"><span>RELEVANT COURSEWORK</span><p>{education.coursework.join(' · ')}</p></div>
          <div className="certification"><span> CERTIFICATION</span><p>{certifications.join(', ')}</p></div>
        </aside>
      </div>
    </section>
  );
}
