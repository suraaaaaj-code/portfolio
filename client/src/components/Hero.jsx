import { profile, stats } from '../data.js';

function SocialLinks() {
  return <div className="hero-socials" data-build-block data-agent="Clients" data-code="<SocialLinks />">
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
    <section id="top" className="hero section-frame" data-build-section>
      <div className="hero-copy">
        <p className="hero-eyebrow" data-build-block data-code="<Availability />"><span className="availability-dot" /> OPEN TO OPPORTUNITIES <i /> {profile.location.toUpperCase()}</p>
        <h1 data-build-block data-agent="Claude" data-code="<Name />">Suraj<br /><em>Kumar</em><sup>✳</sup></h1>
        <div className="hero-role" data-build-block data-code="<Role />"><span className="role-rule" /><h2>{profile.title}</h2></div>
        <p className="hero-intro" data-build-block data-code="<Introduction />">I build <span>full stack digital products</span> with React.js, Node.js, and Express.js — from reusable interfaces and REST APIs to reliable data layers and practical AI features.</p>
        <div className="hero-actions">
          <a className="button-primary" data-build-block data-agent="Hub" data-code="<ResumeButton />" href={profile.resume} download>Explore my resume <span>↗</span></a>
          <a className="button-text" data-build-block data-agent="Clients" data-code="<ProjectsButton />" href="#projects">See selected work <span>↓</span></a>
        </div>
        <SocialLinks />
        <span className="hero-index" data-build-block data-code="<PortfolioIndex />">PORTFOLIO / 2026</span>
      </div>
      <div data-build-block data-agent="Layout" data-code="<OrbitCard />"><OrbitCard /></div>
      <div className="hero-bottom" data-build-block data-code="<ScrollPrompt />"><span>DESIGNING · BUILDING · LEARNING</span><a href="#about">SCROLL TO DISCOVER ↓</a></div>
    </section>
    <div className="ticker" data-build-section aria-label={`Core technologies: ${profile.heroChips.join(', ')}`}><div className="ticker-track" data-build-block data-agent="Stack" data-code="<TechMarquee />" data-log="rolled out the technology stack" aria-hidden="true">{[0, 1].map((copy) => <div className="ticker-set" key={copy}>{profile.heroChips.map((skill) => <span key={`${copy}-${skill}`}>{skill}<i>✳</i></span>)}</div>)}</div></div>
    <div className="quick-stats section-frame" data-build-section aria-label="Career highlights">{stats.slice(0, 3).map((stat, index) => <div className="quick-stat" data-build-block data-agent="Clients" data-code="<CareerHighlight />" key={stat.label}><span>0{index + 1}</span><strong>{stat.value}</strong><small>{stat.label}</small></div>)}<a href="#experience" className="stats-more" data-build-block data-code="<MoreExperienceLink />">A closer look <span>↘</span></a></div>
  </>;
}
