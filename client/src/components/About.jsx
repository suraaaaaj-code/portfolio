import { profile, stats } from '../data.js';

export default function About() {
  return (
    <section id="about" className="about content-section">
      <div className="section-kicker"><span>01 / ABOUT</span><span>A PRACTICAL ENGINEERING MINDSET</span></div>
      <div className="about-grid">
        <h2 className="display-heading">Thoughtful<br /><em>by design.</em></h2>
        <div className="about-copy">
          <p className="about-intro">I work across the product stack, making frontend experiences, backend services, and data work together.</p>
          <p>{profile.summary}</p>
          <a className="inline-link" href="#experience">A little more about my path <span>↘</span></a>
        </div>
      </div>
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <article key={stat.label} className="stat-card">
            <span className="stat-index">0{index + 1} / IMPACT</span>
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </article>
        ))}
      </div>
    </section>
  );
}
