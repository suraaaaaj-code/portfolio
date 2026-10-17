import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import Message from '../models/Message.js';
import { sendContactNotification } from '../services/mailer.js';

const router = Router();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: 'Too many messages. Please try again later.' },
});

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

router.post('/', limiter, async (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if ([name, email, message].some((value) => typeof value !== 'string' || !value.trim())) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanMessage = message.trim();

    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ error: 'Please enter a valid email.' });
    }
    if (cleanName.length > 100 || cleanEmail.length > 150 || cleanMessage.length > 2000) {
      return res.status(400).json({ error: 'Please shorten your message and try again.' });
    }

    const contactMessage = { name: cleanName, email: cleanEmail, message: cleanMessage };
    await Message.create(contactMessage);

    let emailSent = false;
    try {
      const result = await sendContactNotification(contactMessage);
      emailSent = result.sent;
      if (!emailSent) console.warn('Contact message saved; SMTP is not configured, so no email notification was sent.');
    } catch (mailError) {
      console.error('Contact message saved, but SMTP notification failed:', mailError.code || mailError.name);
    }

    res.status(201).json({ ok: true, emailSent });
  } catch (err) {
    console.error('Contact message could not be saved:', err.message);
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

export default router;
