# Deploying the portfolio

This repository has a static React/Vite frontend in `client/` and an Express API in `server/`. Deploy them separately. The frontend is cached on a global CDN; the API handles the MongoDB-backed contact form.

## 1. Push the code to GitHub

Create a repository named `portfolio` under your GitHub account. From this folder, run:

```powershell
git remote add origin https://github.com/suraaaaaj-code/portfolio.git
git add .
git status --short
git commit -m "Prepare portfolio for deployment"
git push -u origin main
```

Before committing, confirm `server/.env` is ignored (`git check-ignore server/.env`). Do not commit real MongoDB or SMTP credentials.

## 2. Deploy the frontend on Cloudflare Pages

1. Sign in to Cloudflare and open **Workers & Pages → Create → Pages → Connect to Git**.
2. Choose the `portfolio` repository and production branch `main`.
3. Set the root directory to `client`.
4. Set the build command to `npm run build` and output directory to `dist`.
5. Add the build environment variable `VITE_API_URL` with the API's public base URL, for example `https://your-api.onrender.com` (no trailing slash).
6. Save and deploy. Cloudflare will give the site a `*.pages.dev` URL.

The site is static and delivered from Cloudflare's CDN. A custom domain name itself is usually paid; Cloudflare provides the `pages.dev` address at no charge. If you already own a domain, add it under **Workers & Pages → your project → Custom domains**, then follow Cloudflare's DNS instructions. For an apex domain, Cloudflare requires the domain's nameservers to use Cloudflare.

## 3. Deploy the API and configure Gmail SMTP

1. In the Google Account for `webdev.2301@gmail.com`, turn on 2-Step Verification. Then create a Google App Password for the portfolio mailer. Google only offers App Passwords when 2-Step Verification is enabled. Never use your regular Google password.
2. In Render, choose **New → Web Service**, connect `suraaaaaj-code/portfolio`, and select branch `main`.
3. Set root directory to `server`, build command to `npm install`, and start command to `npm start`.
4. Choose a plan that allows outbound SMTP. Render Free blocks connections on SMTP ports `25`, `465`, and `587`, so Gmail SMTP will not work on its Free web service.
5. In the service's **Environment** settings, add these values. Paste the Google App Password into `SMTP_PASS` (remove spaces); keep it private and never commit it.

   | Key | Value |
   | --- | --- |
   | `MONGODB_URI` | Your MongoDB Atlas connection string; URL-encode reserved characters in the database user's username/password. |
   | `CLIENT_URL` | `https://suraj-kumar-portfolio.pages.dev` |
   | `SMTP_HOST` | `smtp.gmail.com` |
   | `SMTP_PORT` | `587` |
   | `SMTP_SECURE` | `false` |
   | `SMTP_USER` | `webdev.2301@gmail.com` |
   | `SMTP_PASS` | The 16-character Google App Password, with spaces removed. |
   | `SMTP_FROM_EMAIL` | `webdev.2301@gmail.com` |
   | `CONTACT_TO_EMAIL` | `webdev.2301@gmail.com` |

6. In MongoDB Atlas, allow the backend host's outbound IP addresses in **Security → Network Access → IP Access List**. Do not rely on the local computer's IP for a hosted service, and do not use `0.0.0.0/0` as a shortcut.
7. Deploy the service and copy its public `https://<service>.onrender.com` base URL. Confirm `https://<service>.onrender.com/api/health` returns `{"ok":true}`.
8. In Cloudflare Pages, open the project **Settings → Variables and Secrets**, add `VITE_API_URL` with that base URL (no trailing slash), then redeploy the frontend. This connects the contact form to the API.
9. Submit a test contact message and confirm it is saved in Atlas and an email arrives at `webdev.2301@gmail.com`.

### MongoDB Atlas network access

Atlas only accepts connections from addresses in the project's IP access list. In Atlas, open **Security → Network Access → IP Access List → Add IP Address**. For the deployed service, allow the Render service's outbound CIDR ranges for its selected region, found in Render under **Service → Connect → Outbound**. Render's default ranges are shared with other services, so this is less restrictive than a dedicated IP. Never use `0.0.0.0/0` as a shortcut; it allows connections from anywhere. Recheck this list if the service's region or hosting provider changes.

## 4. Understand the free-plan tradeoffs

- Cloudflare Pages keeps the portfolio's static assets on its CDN, so the initial page does not wait for the API.
- Render's free API service sleeps after 15 minutes without traffic and can take about a minute to wake. The first contact-form submission after idle can therefore be slow or time out. There is no way to promise a consistently warm API on that free plan.
- Gmail SMTP requires a Google App Password, and Render Free blocks outbound SMTP ports 25, 465, and 587. Use a backend host/plan that permits SMTP, or choose an HTTPS email API instead of SMTP if keeping the backend free is a requirement.
- A custom domain registration is not free in general. The free `pages.dev` subdomain works without buying a domain; if you already own a domain, connecting it to Pages does not require a paid Cloudflare Pages plan.

## 5. Check the deployed site

1. Open the Cloudflare Pages URL and verify the page and resume link.
2. Open the API health URL above.
3. Submit one test contact message. Verify it appears in the Atlas collection and check Render logs for the mail result.
4. If the browser reports a CORS error, fix `CLIENT_URL` to match the site's full origin exactly, then redeploy the API.
