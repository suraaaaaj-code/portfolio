import { useState } from 'react';
import { profile } from '../data.js';

const links = [
  ['About', '#about'],
  ['Experience', '#experience'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Contact', '#contact'],
];

function ThemeToggle({ theme, onToggle }) {
  const dark = theme === 'dark';
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={`Switch to ${dark ? 'light' : 'dark'} theme`}
      aria-pressed={dark}
      title={`Switch to ${dark ? 'light' : 'dark'} theme`}
    >
      {dark ? (
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>
      ) : (
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.3A8.5 8.5 0 0 1 8.7 3.5 8.6 8.6 0 1 0 20.5 15.3Z" /><path d="m16.5 3 .6 1.9L19 5.5l-1.9.6-.6 1.9-.6-1.9-1.9-.6 1.9-.6Z" /></svg>
      )}
    </button>
  );
}

export default function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="nav">
      <a href="#top" className="logo" aria-label={`${profile.name} - home`} onClick={closeMenu}>
        <span className="logo-mark" aria-hidden="true">SK</span>
        <span className="logo-copy"><strong>{profile.name}</strong><small>Full Stack Engineer</small></span>
      </a>
      <nav className={menuOpen ? 'nav-links is-open' : 'nav-links'} id="primary-navigation" aria-label="Main navigation">
        {links.map(([label, href], index) => (
          <a key={href} href={href} onClick={closeMenu}><span>0{index + 1}</span>{label}</a>
        ))}
      </nav>
      <div className="nav-actions">
        <ThemeToggle theme={theme} onToggle={onToggleTheme} />
        <a className="btn small nav-resume" href={profile.resume} download>Resume <span>↗</span></a>
        <button
          className={menuOpen ? 'menu-toggle is-open' : 'menu-toggle'}
          type="button"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span />
        </button>
      </div>
    </header>
  );
}
