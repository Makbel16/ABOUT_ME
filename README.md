# Portfolio Website

> A modern personal portfolio built with React, Vite, and a Vercel serverless contact form.

## 🌐 Live Demo
Replace the placeholder below with your deployed portfolio URL:

`https://makbel-kebede.vercel.app/`

## [About](https://makbel-kebede.vercel.app/)
A modern personal portfolio built with React, Vite, and a Vercel serverless contact form.

## 🚀 Project Overview
This repository contains a portfolio website that includes:

- A responsive React frontend built with **Vite**
- 3D scenes and animations using **React Three Fiber**
- A contact form that sends messages through a Vercel serverless API
- Email delivery powered by **Nodemailer** via Gmail credentials

## 📁 Project Structure

- `src/` — frontend React components and styles
- `api/send-email.js` — serverless endpoint for form submissions
- `index.html` — app entry page
- `package.json` — project dependencies and scripts

## ⚙️ Environment Variables
The contact form requires these values in Vercel or local environment:

- `GMAIL_USER` = your Gmail address
- `GMAIL_PASS` = your Gmail app password
- `TO_EMAIL` = recipient address for incoming messages
- `FROM_EMAIL` = sender address for outgoing mail

> Note: `GMAIL_PASS` must be a Gmail app password created from your Google Account security settings.

## 💻 Local Setup

```bash
npm install
npm run dev
```

Then open the local address shown in the terminal.

## 📦 Build

```bash
npm run build
```

## 📩 Deployment
Deploy easily on Vercel with these settings:

- Root Directory: `./`
- Build Command: `npm run build`
- Output Directory: `dist`
- Environment Variables: `GMAIL_USER`, `GMAIL_PASS`, `TO_EMAIL`, `FROM_EMAIL`

## 🛠️ Notes

- Keep `.env` or credentials out of Git.
- Use a Gmail app password rather than your normal Google password.
- If you need to change the deployment URL, update the placeholder at the top.

## 📬 Contact

If you want to connect or get a custom project quote, use the contact form on the deployed website.

---

Made with ❤️ and React.
