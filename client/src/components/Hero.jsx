import { profile, stats } from '../data.js';

export default function Hero() {
  return (
    <>
      <section id="top" className="hero">
        <div className="hero-text">
          <p className="eyebrow">Hi, I'm</p>
          <h1>{profile.name}</h1>
          <h2 className="gradient-text">{profile.title}</h2>
          <p className="lead">{profile.tagline}</p>
          <p className="hero-location">{profile.location}</p>
          <p className="hero-availability"><span aria-hidden="true" />Open to Full Stack AI Developer roles · Delhi NCR and remote</p>
          <div className="actions">
            <a className="btn" href={profile.resume} download>Download Resume</a>
            <a className="btn ghost" href="#experience">View Experience</a>
          </div>
          <div className="socials">
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
              <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.55.1.76-.24.76-.53v-2.08c-3.1.67-3.75-1.32-3.75-1.32-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 1.7 2.62 1.2 3.26.91.1-.71.39-1.2.71-1.48-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.15a10.7 10.7 0 0 1 5.57 0c2.12-1.45 3.05-1.15 3.05-1.15.61 1.54.23 2.68.12 2.96.71.78 1.14 1.78 1.14 3.01 0 4.29-2.61 5.23-5.1 5.5.4.35.75 1.03.75 2.08V22c0 .29.2.63.77.52A11.1 11.1 0 0 0 12 .9Z" /></svg>
              <span>GitHub</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
              <svg className="social-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.44c.98 0 1.79-.77 1.79-1.72V1.72C24 .77 23.19 0 22.21 0h.01Z" /></svg>
              <span>LinkedIn</span>
            </a>
            <a href={`mailto:${profile.email}`} aria-label={`Email ${profile.name}`}>
              <svg className="social-icon social-icon--mail" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="2.5" y="4.5" width="19" height="15" rx="2" /><path d="m3.5 6 8.5 7 8.5-7" /></svg>
              <span>Email</span>
            </a>
          </div>
        </div>
        <div className="hero-art" role="img" aria-label="Illustration of a code editor showing Suraj's development stack">
          <div className="orbit-ring" />
          <div className="code-window">
            <div className="window-bar">
              <span className="window-dots" aria-hidden="true"><i /><i /><i /></span>
              <span className="window-title">portfolio.js</span>
            </div>
            <div className="code-content" aria-hidden="true">
              <p className="code-comment">// building for the web</p>
              <p><span className="code-keyword">const</span> <span className="code-var">developer</span> <span className="code-brace">= {'{'}</span></p>
              <div className="code-stack">
                {profile.heroChips.map((chip) => <span key={chip}>{chip}</span>)}
              </div>
              <p className="code-brace">{'};'}</p>
              <div className="code-status">{stats[0].value} {stats[0].label}</div>
            </div>
          </div>
          <div className="floating-note" aria-hidden="true">
            <strong>✳</strong>
            <span>Design · Build · Grow</span>
          </div>
        </div>
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
    </>
  );
}
