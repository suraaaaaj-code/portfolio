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

## 3. Deploy the API on Render

1. In Render, choose **New → Web Service**, connect the same repository, and select branch `main`.
2. Set root directory to `server`, build command to `npm install`, and start command to `npm start`.
3. Create the service and copy its `https://<service>.onrender.com` URL into the frontend's `VITE_API_URL` setting in Cloudflare. Trigger a new Pages deployment after changing a build variable.
4. In Render's environment settings, add:
   - `MONGODB_URI`: the Atlas connection string, with the database user's username/password URL-encoded if they contain reserved characters.
   - `CLIENT_URL`: the exact deployed website origin, e.g. `https://your-site.pages.dev`; add the custom-domain origin too if you use one. Separate multiple origins with commas.
   - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM_EMAIL`, and `CONTACT_TO_EMAIL` using the values from your mail provider. Use an SMTP app password, never your normal account password.
5. Confirm `https://<service>.onrender.com/api/health` returns `{"ok":true}`.

### MongoDB Atlas network access

Atlas only accepts connections from addresses in the project's IP access list. In Atlas, open **Security → Network Access → IP Access List → Add IP Address**. For the deployed service, allow the Render service's outbound CIDR ranges for its selected region, found in Render under **Service → Connect → Outbound**. Render's default ranges are shared with other services, so this is less restrictive than a dedicated IP. Never use `0.0.0.0/0` as a shortcut; it allows connections from anywhere. Recheck this list if the service's region or hosting provider changes.

## 4. Understand the free-plan tradeoffs

- Cloudflare Pages keeps the portfolio's static assets on its CDN, so the initial page does not wait for the API.
- Render's free API service sleeps after 15 minutes without traffic and can take about a minute to wake. The first contact-form submission after idle can therefore be slow or time out. There is no way to promise a consistently warm API on that free plan.
- Render's free services block outbound SMTP ports 25, 465, and 587. The current SMTP notification code therefore cannot send email from Render Free. To keep deployment free, switch notifications to an email provider's HTTPS API (such as Resend) and store its API key as a server-side secret; otherwise choose a host/plan that permits SMTP. MongoDB persistence can still work when Atlas access is configured.
- A custom domain registration is not free in general. The free `pages.dev` subdomain works without buying a domain; if you already own a domain, connecting it to Pages does not require a paid Cloudflare Pages plan.

## 5. Check the deployed site

1. Open the Cloudflare Pages URL and verify the page and resume link.
2. Open the API health URL above.
3. Submit one test contact message. Verify it appears in the Atlas collection and check Render logs for the mail result.
4. If the browser reports a CORS error, fix `CLIENT_URL` to match the site's full origin exactly, then redeploy the API.
