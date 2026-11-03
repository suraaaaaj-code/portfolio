import { profile } from '../data.js';

export default function Footer() {
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} {profile.name} · BUILT WITH CURIOSITY.</span>
      <a href="#top">BACK TO TOP ↑</a>
    </footer>
  );
}
