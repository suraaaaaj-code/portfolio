import { profile, stats } from '../data.js';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="section-head">
        <span>01</span>
        <h2>About</h2>
      </div>
      <p>{profile.summary}</p>
      <div className="stats">
        {stats.map((s) => (
          <div key={s.label} className="stat">
            <strong>{s.value}</strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
