import { profile } from '../data.js';

const links = [
  ['About', '#about'],
  ['Experience', '#experience'],
  ['Skills', '#skills'],
  ['Projects', '#projects'],
  ['Contact', '#contact'],
];

export default function Navbar() {
  return (
    <header className="nav">
      <a href="#top" className="logo" aria-label={`${profile.name} — home`}>
        <img src="/logo.svg" alt="Suraj Kumar" />
      </a>
      <nav>
        {links.map(([label, href]) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </nav>
      <a className="btn small" href={profile.resume} download>Resume</a>
    </header>
  );
}
