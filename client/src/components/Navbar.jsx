import { useState } from 'react';
import { profile } from '../data.js';

const links = [['About', '#about'], ['Experience', '#experience'], ['Skills', '#skills'], ['Projects', '#projects'], ['Contact', '#contact']];

export default function Navbar({ theme, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <a href="#top" className="brand" aria-label={`${profile.name}, home`} onClick={() => setMenuOpen(false)}>
        <span className="brand-mark" aria-hidden="true">s<span>.</span></span>
        <span className="brand-name">Suraj Kumar<small>FULL STACK ENGINEER</small></span>
      </a>
      <button className="nav-menu-button" type="button" aria-expanded={menuOpen} aria-controls="site-navigation" onClick={() => setMenuOpen(!menuOpen)}>
        <span>{menuOpen ? 'Close' : 'Menu'}</span><i aria-hidden="true">{menuOpen ? '×' : '☰'}</i>
      </button>
      <nav id="site-navigation" className={`site-nav${menuOpen ? ' is-open' : ''}`} aria-label="Main navigation">
        {links.map(([label, href]) => <a href={href} key={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <button type="button" className="theme-switch" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
          <span aria-hidden="true">{theme === 'dark' ? '☼' : '◐'}</span><small>{theme === 'dark' ? 'LIGHT' : 'DARK'}</small>
        </button>
        <a className="header-resume" href={profile.resume} download>Resume <span aria-hidden="true">↗</span></a>
      </div>
    </header>
  );
}
