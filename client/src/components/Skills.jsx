import { skillGroups, education, certifications } from '../data.js';

const focusAreas = [
  'MERN stack development',
  'OpenAI & LLM integration',
  'TypeScript and Next.js',
  'REST APIs and MongoDB',
  'Product-focused engineering',
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="section-head">
        <span>03</span>
        <h2>Skills & Education</h2>
      </div>
      <div className="skill-showcase">
        <div className="skill-showcase-banner">
          <span className="skill-showcase-kicker">FULL STACK · AI DEVELOPMENT</span>
          <h3 id="skill-showcase-title">Full Stack Engineer</h3>
          <svg className="skill-showcase-wave" viewBox="0 0 1000 70" preserveAspectRatio="none" aria-hidden="true">
            <path d="M0 26C155 48 235 12 390 27s218 24 350 1 179-11 260 4v38H0z" />
          </svg>
        </div>
        <div className="skill-showcase-focus">
          <span className="skill-focus-label">FOCUS AREAS</span>
          <div className="skill-focus-window" aria-hidden="true">
            <div className="skill-focus-track">
              {focusAreas.map((area) => <span key={area}>{area}</span>)}
            </div>
          </div>
          <p className="sr-only">Focus areas: {focusAreas.join(', ')}.</p>
        </div>
      </div>
      {skillGroups.map((group) => (
        <div key={group.title} className="skill-group">
          <h3>{group.title}</h3>
          <div className="chip-row">
            {group.items.map((item) => (
              <span key={item} className="chip">{item}</span>
            ))}
          </div>
        </div>
      ))}
      <div className="grid" style={{ marginTop: 40 }}>
        <div className="card">
          <h3>{education.school}</h3>
          <p>{education.degree}</p>
          <p>{education.period} · {education.detail}</p>
        </div>
        <div className="card">
          <h3>Certifications</h3>
          {certifications.map((c) => <p key={c}>{c}</p>)}
        </div>
      </div>
    </section>
  );
}
