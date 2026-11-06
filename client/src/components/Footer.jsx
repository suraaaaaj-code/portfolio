import { profile } from '../data.js';

export default function Footer() {
  return (
    <footer className="site-footer" data-build-section>
      <a href="#top" className="footer-brand" data-build-block data-agent="Hub" data-code="<FooterBrand />"><span className="brand-mark">s<span>.</span></span><span>{profile.name}<small>BUILT WITH CURIOSITY</small></span></a>
      <span data-build-block data-code="<Copyright />">© {new Date().getFullYear()} {profile.name} · {profile.location.toUpperCase()}</span>
      <a href="#top" data-build-block data-code="<BackToTop />">BACK TO TOP ↑</a>
    </footer>
  );
}
