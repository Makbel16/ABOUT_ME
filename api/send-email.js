import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Basic server-side validation
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Read credentials from environment variables
  const GMAIL_USER = process.env.GMAIL_USER;
  const GMAIL_PASS = process.env.GMAIL_PASS;
  const TO_EMAIL = process.env.TO_EMAIL || GMAIL_USER;
  const FROM_EMAIL = process.env.FROM_EMAIL || GMAIL_USER;

  if (!GMAIL_USER || !GMAIL_PASS) {
    console.error('Missing email credentials in environment');
    return res.status(500).json({ error: 'Email service not configured' });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER, pass: GMAIL_PASS }
    });

    const mailOptions = {
      from: `${name} <${FROM_EMAIL}>`,
      to: TO_EMAIL,
      subject: `[Portfolio Contact] ${subject || 'New message'}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Subject:</strong> ${subject}</p><hr/><p>${message}</p>`
    };

    const info = await transporter.sendMail(mailOptions);
    return res.status(200).json({ ok: true, messageId: info.messageId });
  } catch (err) {
    console.error('Error sending email:', err);
    return res.status(500).json({ error: 'Failed to send email' });
  }
}
