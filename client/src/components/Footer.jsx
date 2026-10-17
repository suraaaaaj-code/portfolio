import { profile } from '../data.js';

export default function Footer() {
  return (
    <footer className="footer">
      © {new Date().getFullYear()} {profile.name}. Built with React, Node.js & MongoDB.
    </footer>
  );
}
