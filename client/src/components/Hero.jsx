import { useState } from 'react';
import { profile, stats } from '../data.js';

const stack = [
  { name: 'React.js', mark: 'Re', note: 'Interactive interfaces' },
  { name: 'Node.js', mark: 'No', note: 'Server-side JavaScript' },
  { name: 'MongoDB', mark: 'Mo', note: 'Flexible data layers' },
  { name: 'OpenAI', mark: 'AI', note: 'Production AI features' },
  { name: 'TypeScript', mark: 'Ts', note: 'Typed application code' },
  { name: 'Flutter', mark: 'Fl', note: 'Cross-platform apps' },
];

function StackScene() {
  const [active, setActive] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const selected = stack[active];

  function handlePointerMove(event) {
    if (event.pointerType === 'touch') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    setTilt({
      x: ((event.clientY - bounds.top) / bounds.height - 0.5) * -12,
      y: ((event.clientX - bounds.left) / bounds.width - 0.5) * 14,
    });
  }

  return (
    <div className="stack-scene-wrap">
      <div
        className="stack-scene"
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setTilt({ x: 0, y: 0 })}
        style={{ '--tilt-x': `${tilt.x}deg`, '--tilt-y': `${tilt.y}deg` }}
        aria-label="Interactive 3D technology stack. Move the pointer to tilt; select a badge to inspect a technology."
      >
        <div className="scene-backdrop" aria-hidden="true" />
        <div className="scene-orbit scene-orbit--outer" aria-hidden="true" />
        <div className="scene-orbit scene-orbit--inner" aria-hidden="true" />
        <div className="scene-platform" aria-hidden="true" />
        <div className="scene-core" aria-live="polite">
          <span className="core-mark">{selected.mark}</span>
          <strong>{selected.name}</strong>
          <span>{selected.note}</span>
        </div>
        <div className="scene-satellites">
          {stack.map((item, index) => (
            <button
              key={item.name}
              className={`satellite ${active === index ? 'is-active' : ''}`}
              style={{ '--satellite-angle': `${index * 60}deg` }}
              onClick={() => setActive(index)}
              aria-pressed={active === index}
              aria-label={`Show ${item.name}`}
            >
              <span>{item.mark}</span>
              <small>{item.name}</small>
            </button>
          ))}
        </div>
        <span className="scene-index scene-index--top">FIG. 01 / STACK</span>
        <span className="scene-index scene-index--bottom">MOVE TO EXPLORE <i>↗</i></span>
      </div>
      <div className="scene-caption">
        <span><i /> INTERACTIVE TECH STACK</span>
        <span>01 — 06</span>
      </div>
    </div>
  );
}

function SocialLinks() {
  return (
    <div className="socials">
      <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
        <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.2 3.26.91.1-.71.39-1.2.71-1.48-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.15a10.7 10.7 0 0 1 5.57 0c2.12-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3.01 0 4.29-2.61 5.23-5.1 5.5.4.35.75 1.03.75 2.08V22c0 .29.2.63.77.52A11.1 11.1 0 0 0 12 .9Z" /></svg>
        <span>GitHub</span><i>↗</i>
      </a>
      <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
        <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.44c.98 0 1.79-.77 1.79-1.72V1.72C24 .77 23.19 0 22.21 0h.01Z" /></svg>
        <span>LinkedIn</span><i>↗</i>
      </a>
      <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.name}`}>
        <svg className="social-icon social-icon--mail" viewBox="0 0 24 24" aria-hidden="true"><rect x="2.5" y="4.5" width="19" height="15" rx="2" /><path d="m3.5 6 8.5 7 8.5-7" /></svg>
        <span>Email</span><i>↗</i>
      </a>
    </div>
  );
}

export default function Hero() {
  return (
    <>
      <section id="top" className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-dot" /> SOFTWARE ENGINEER <span className="eyebrow-rule" /> DELHI, INDIA</p>
          <h1>{profile.name.split(' ')[0]}<br /><span>{profile.name.split(' ').slice(1).join(' ')}</span><sup>®</sup></h1>
          <div className="hero-role"><span>01</span><h2>{profile.title}</h2></div>
          <p className="lead">{profile.tagline}</p>
          <div className="hero-actions">
            <a className="btn" href={profile.resume} download>View my resume <span>↗</span></a>
            <a className="text-link" href="#projects">Explore selected work <span>↓</span></a>
          </div>
          <SocialLinks />
          <p className="availability"><span /> OPEN TO SOFTWARE ENGINEERING OPPORTUNITIES</p>
        </div>
        <StackScene />
        <div className="hero-footnote"><span>BUILDING THE USEFUL, ONE RELEASE AT A TIME.</span><span>SCROLL TO EXPLORE ↓</span></div>
      </section>
      <div className="skills-marquee" aria-label="Core technologies">
        <span className="sr-only">Core technologies: {profile.heroChips.join(', ')}</span>
        <div className="marquee-track" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div className="marquee-set" key={copy}>
              {profile.heroChips.map((chip) => <span className="marquee-item" key={`${copy}-${chip}`}>{chip}</span>)}
            </div>
          ))}
        </div>
      </div>
      <div className="proof-strip" aria-label="Selected career metrics">
        {stats.slice(0, 3).map((stat, index) => (
          <div className="proof-item" key={stat.label}><span>0{index + 1}</span><strong>{stat.value}</strong><small>{stat.label}</small></div>
        ))}
        <a href="#experience" className="proof-link">CAREER<br />SNAPSHOT <span>↘</span></a>
      </div>
    </>
  );
}
