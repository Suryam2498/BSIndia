# BSIndia Bank – Demo Website

Static, green-themed banking website (demo brand, not a real bank). Built with a tiny Node generator, no framework.

## Run locally
```bash
node build.js          # generates ./dist (42 pages + sitemap.xml + robots.txt)
npx serve dist         # or: python -m http.server 5173 --directory dist
```
Requires Node 18+. No npm dependencies.

## Structure
- `CLAUDE.md` – project rules (RBI terminology, compliance, design system)
- `src/` – layout (header/footer), product data, page templates, icons
- `public/` – static assets: CSS, JS, self-hosted fonts, logo set, `data/branches.json`
- `build.js` – generates `dist/`
- `netlify.toml` – build, redirects, security headers (CSP), caching

## Deploy on Netlify
1. Push this folder to GitHub (or use drag-and-drop of the `dist/` folder).
2. Netlify → Add new site → Import from Git. Build command `node build.js`, publish directory `dist`.
3. Site settings → Environment variables → `SITE_URL` = your final URL (used for canonical, sitemap, OG tags).
4. Forms: Netlify detects the forms (`open-account`, `service-request`, `grievance`) on deploy; view submissions under Forms.
5. Domain management → add custom domain; HTTPS is automatic.

## Edit content
- Products, rates, fees, FAQs: `src/products.js`
- Home and other pages: `src/pages.js`
- Branches: `public/data/branches.json`
- Colours: `public/assets/css/tokens.css`

All rates, charges, addresses, helplines and registration numbers are placeholders. Replace before any real use.
