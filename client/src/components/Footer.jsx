import { profile } from '../data.js';

export default function Footer() {
  return (
    <footer className="site-footer">
      <a href="#top" className="footer-brand"><span className="brand-mark">s<span>.</span></span><span>{profile.name}<small>BUILT WITH CURIOSITY</small></span></a>
      <span>© {new Date().getFullYear()} {profile.name} · {profile.location.toUpperCase()}</span>
      <a href="#top">BACK TO TOP ↑</a>
    </footer>
  );
}
