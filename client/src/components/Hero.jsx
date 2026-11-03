import { profile, stats } from '../data.js';

function SocialLinks() {
  return <div className="hero-socials">
    <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><span>GH</span> GitHub ↗</a>
    <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><span>in</span> LinkedIn ↗</a>
    <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.name}`}><span>@</span> Email ↗</a>
  </div>;
}

function OrbitCard() {
  return <div className="hero-art" aria-label="Interactive illustration of a full stack developer's technology stack">
    <div className="art-topline"><span>INDEPENDENTLY CURIOUS</span><span>28° 36′ N / 77° 12′ E</span></div>
    <div className="art-orbit art-orbit-one" /><div className="art-orbit art-orbit-two" />
    <div className="art-core"><span className="core-glint" /><span className="core-monogram">SK</span><strong>FULL<br />STACK</strong><small>ENGINEERING</small></div>
    <span className="tech-float tech-react">React<span>UI / 01</span></span>
    <span className="tech-float tech-node">Node.js<span>API / 02</span></span>
    <span className="tech-float tech-data">MongoDB<span>DATA / 03</span></span>
    <span className="tech-float tech-ai">AI<span>IDEAS / 04</span></span>
    <div className="art-base" />
    <span className="art-side-label">MAKING SOFTWARE<br />WORK TOGETHER</span>
    <span className="art-number">FIG. 01</span>
  </div>;
}

export default function Hero() {
  return <>
    <section id="top" className="hero section-frame">
      <div className="hero-copy">
        <p className="hero-eyebrow"><span className="availability-dot" /> OPEN TO OPPORTUNITIES <i /> {profile.location.toUpperCase()}</p>
        <h1>Suraj<br /><em>Kumar</em><sup>✳</sup></h1>
        <div className="hero-role"><span className="role-rule" /><h2>{profile.title}</h2></div>
        <p className="hero-intro">I turn complex ideas into <span>useful digital products</span> — from thoughtful interfaces and robust APIs to practical AI features.</p>
        <div className="hero-actions">
          <a className="button-primary" href={profile.resume} download>Explore my resume <span>↗</span></a>
          <a className="button-text" href="#projects">See selected work <span>↓</span></a>
        </div>
        <SocialLinks />
        <span className="hero-index">PORTFOLIO / 2026</span>
      </div>
      <OrbitCard />
      <div className="hero-bottom"><span>DESIGNING · BUILDING · LEARNING</span><a href="#about">SCROLL TO DISCOVER ↓</a></div>
    </section>
    <div className="ticker" aria-label={`Core technologies: ${profile.heroChips.join(', ')}`}><div className="ticker-track" aria-hidden="true">{[0, 1].map((copy) => <div className="ticker-set" key={copy}>{profile.heroChips.map((skill) => <span key={`${copy}-${skill}`}>{skill}<i>✳</i></span>)}</div>)}</div></div>
    <div className="quick-stats section-frame" aria-label="Career highlights">{stats.slice(0, 3).map((stat, index) => <div className="quick-stat" key={stat.label}><span>0{index + 1}</span><strong>{stat.value}</strong><small>{stat.label}</small></div>)}<a href="#experience" className="stats-more">A closer look <span>↘</span></a></div>
  </>;
}
