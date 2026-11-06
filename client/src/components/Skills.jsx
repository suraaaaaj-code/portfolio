import { skillGroups, education, certifications } from '../data.js';

export default function Skills() {
  return <section id="skills" className="content-section skills-section section-frame" data-build-section>
    <div className="section-heading" data-build-block data-code="<SectionLabel />"><span className="section-number">03 / TOOLKIT</span><span className="section-aside">SKILLS, SYSTEMS & STUDY</span></div>
    <div className="section-intro-row"><h2 className="section-title" data-build-block data-code="<SkillsHeadline />">Built for the<br /><em>whole stack.</em></h2><p data-build-block data-code="<SkillsIntro />">Full stack web development with React.js, Node.js, Express.js, SQL, and MongoDB, alongside mobile development and AI API integrations.</p></div>
    <div className="skills-layout"><div className="skill-groups">{skillGroups.map((group, index) => <article className="skill-group" data-build-block data-agent="Stack" data-code="<SkillGroup />" key={group.title}><div className="skill-label"><span>0{index + 1}</span><h3>{group.title}</h3></div><div className="skill-chips">{group.items.map((item) => <span key={item}>{item}</span>)}</div></article>)}</div>
      <aside className="education-card" data-build-block data-agent="Students" data-code="<EducationCard />"><div className="education-top"><span>EDUCATION / 2022—26</span><div className="education-seal" aria-hidden="true">SK</div></div><h3>{education.school}</h3><p>{education.degree}</p><div className="education-score"><span>{education.period}</span><strong>{education.detail}</strong></div><div className="education-detail"><span>RELEVANT COURSEWORK</span><p>{education.coursework.join(' · ')}</p></div><div className="education-detail"><span>CERTIFICATION</span><p>{certifications.join(', ')}</p></div></aside>
    </div>
  </section>;
}
