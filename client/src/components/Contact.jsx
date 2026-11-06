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
    <section id="contact" className="content-section contact-section section-frame" data-build-section>
      <div className="section-heading" data-build-block data-code="<SectionLabel />"><span className="section-number">05 / CONTACT</span><span className="section-aside">HAVE SOMETHING GOOD IN MIND?</span></div>
      <div className="contact-grid">
        <div>
          <h2 className="section-title" data-build-block data-code="<ContactHeadline />">Let’s make<br /><em>it matter.</em></h2>
          <p className="contact-intro" data-build-block data-agent="Copy" data-code="<ContactIntro />">Interested in thoughtful software, full-stack engineering, or AI-powered product work? I’d be glad to hear from you.</p>
          <a className="contact-email" data-build-block data-agent="Connect" data-code="<EmailLink />" href={`mailto:${profile.email}`}>{profile.email}<span>↗</span></a>
          <a className="contact-phone" data-build-block data-agent="Connect" data-code="<PhoneLink />" href={`tel:${profile.phone.replaceAll(' ', '')}`}>{profile.phone}</a>
          <p className="contact-location" data-build-block data-code="<Location />">BASED IN {profile.location.toUpperCase()}</p>
        </div>
        {API_URL ? (
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-field" data-build-block data-agent="Connect" data-code="<NameField />"><label htmlFor="contact-name">YOUR NAME</label><input id="contact-name" name="name" placeholder="Name" value={form.name} onChange={handleChange} required /></div>
            <div className="form-field" data-build-block data-agent="Connect" data-code="<EmailField />"><label htmlFor="contact-email">EMAIL ADDRESS</label><input id="contact-email" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required /></div>
            <div className="form-field" data-build-block data-agent="Connect" data-code="<MessageField />"><label htmlFor="contact-message">WHAT WOULD YOU LIKE TO BUILD?</label><textarea id="contact-message" name="message" placeholder="A few lines about it..." value={form.message} onChange={handleChange} required /></div>
            <button className="button-primary" data-build-block data-code="<SendButton />" type="submit" disabled={loading}>
              {loading ? 'Sending...' : 'Send a message'} <span>↗</span>
            </button>
            {status.msg && (
              <p className={`status ${status.type}`} role="status">
                {status.msg}{status.type === 'warning' && <> <a href={`mailto:${profile.email}`}>{profile.email}</a>.</>}
              </p>
            )}
          </form>
        ) : (
          <aside className="contact-note" data-build-block data-agent="Connect" data-code="<ContactNote />">
            <span className="contact-note-index">DIRECT LINE / 01</span>
            <p>My message form is being connected. For now, email is the quickest way to reach me.</p>
            <a className="button-primary" href={`mailto:${profile.email}`}>Write an email <span>↗</span></a>
          </aside>
        )}
      </div>
    </section>
  );
}
