import nodemailer from 'nodemailer';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let transporter;

function readSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS;
  const hasAnySmtpSetting = Boolean(host || user || pass || process.env.SMTP_PORT || process.env.SMTP_SECURE);

  if (!hasAnySmtpSetting) return null;
  if (!host || !user || !pass) {
    throw new Error('Incomplete SMTP configuration. Set SMTP_HOST, SMTP_USER, and SMTP_PASS.');
  }

  const port = Number(process.env.SMTP_PORT || 587);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('SMTP_PORT must be a valid port number.');
  }

  const secureValue = process.env.SMTP_SECURE?.trim().toLowerCase();
  if (secureValue && !['true', 'false'].includes(secureValue)) {
    throw new Error('SMTP_SECURE must be true or false.');
  }

  const from = process.env.SMTP_FROM_EMAIL?.trim() || user;
  const to = process.env.CONTACT_TO_EMAIL?.trim() || user;
  if (!emailRegex.test(from) || !emailRegex.test(to)) {
    throw new Error('SMTP_FROM_EMAIL and CONTACT_TO_EMAIL must be valid email addresses.');
  }

  return {
    host,
    port,
    secure: secureValue ? secureValue === 'true' : port === 465,
    auth: { user, pass },
    from,
    to,
  };
}

export async function sendContactNotification({ name, email, message }) {
  const config = readSmtpConfig();
  if (!config) return { sent: false, reason: 'not_configured' };

  transporter ??= nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: config.auth,
  });

  const safeName = name.replace(/[\r\n]+/g, ' ').slice(0, 100);
  await transporter.sendMail({
    from: { name: 'Portfolio contact form', address: config.from },
    to: config.to,
    replyTo: { name: safeName, address: email },
    subject: `Portfolio contact: ${safeName}`,
    text: [
      'You received a new message from your portfolio contact form.',
      '',
      `Name: ${safeName}`,
      `Email: ${email}`,
      '',
      message,
    ].join('\n'),
  });

  return { sent: true };
}
