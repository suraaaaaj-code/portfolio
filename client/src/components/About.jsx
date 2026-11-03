import { profile, stats } from '../data.js';

export default function About() {
  return <section id="about" className="content-section section-frame">
    <div className="section-heading"><span className="section-number">01 / THE PERSON</span><span className="section-aside">A PRACTICAL ENGINEERING MINDSET</span></div>
    <div className="about-layout">
      <h2 className="section-title">Curious mind.<br /><em>Careful craft.</em></h2>
      <div className="about-description"><p className="about-lead">Good software feels simple to use because someone cared about all the details behind it.</p><p>{profile.summary}</p><a className="button-text" href="#experience">How I got here <span>↘</span></a></div>
    </div>
    <div className="impact-grid">{stats.map((stat, index) => <article className="impact-card" key={stat.label}><span>0{index + 1} / IMPACT</span><strong>{stat.value}</strong><p>{stat.label}</p><i>✳</i></article>)}</div>
  </section>;
}
