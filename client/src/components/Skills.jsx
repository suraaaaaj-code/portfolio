import { skillGroups, education, certifications } from '../data.js';

export default function Skills() {
  return <section id="skills" className="content-section skills-section section-frame">
    <div className="section-heading"><span className="section-number">03 / TOOLKIT</span><span className="section-aside">SKILLS, SYSTEMS & STUDY</span></div>
    <div className="section-intro-row"><h2 className="section-title">Built for the<br /><em>whole stack.</em></h2><p>Practical web engineering with a growing focus on mobile development and AI integrations.</p></div>
    <div className="skills-layout"><div className="skill-groups">{skillGroups.map((group, index) => <article className="skill-group" key={group.title}><div className="skill-label"><span>0{index + 1}</span><h3>{group.title}</h3></div><div className="skill-chips">{group.items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div>
      <aside className="education-card"><div className="education-top"><span>EDUCATION / 2022—26</span><div className="education-seal" aria-hidden="true">SK</div></div><h3>{education.school}</h3><p>{education.degree}</p><div className="education-score"><span>{education.period}</span><strong>{education.detail}</strong></div><div className="education-detail"><span>RELEVANT COURSEWORK</span><p>{education.coursework.join(' · ')}</p></div><div className="education-detail"><span>CERTIFICATION</span><p>{certifications.join(', ')}</p></div></aside>
    </div>
  </section>;
}
