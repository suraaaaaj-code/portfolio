import { useState } from 'react';
import { profile } from '../data.js';

const API_URL = import.meta.env.VITE_API_URL || '';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState({ type: '', msg: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', msg: '' });
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not send message.');
      setStatus({
        type: data.emailSent ? 'success' : 'warning',
        msg: data.emailSent
          ? 'Thanks! Your message was sent.'
          : 'Your message was saved, but email notification is unavailable. You can email me directly at',
      });
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus({
        type: 'error',
        msg: `${err.message} You can also email me at ${profile.email}.`,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact">
      <div className="section-head">
        <span>05</span>
        <h2>Contact</h2>
      </div>
      <p className="contact-intro">
        Open to Full Stack AI Developer roles in Delhi NCR, Gurugram, Hyderabad, Bengaluru, Mohali, Chandigarh, and remote. Send a message and I'll reply soon.
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Your email" value={form.email} onChange={handleChange} required />
        <textarea name="message" placeholder="Your message" value={form.message} onChange={handleChange} required />
        <button className="btn" type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Message'}
        </button>
        {status.msg && (
          <p className={`status ${status.type}`}>
            {status.msg}{status.type === 'warning' && <> <a href={`mailto:${profile.email}`}>{profile.email}</a>.</>}
          </p>
        )}
      </form>
    </section>
  );
}
