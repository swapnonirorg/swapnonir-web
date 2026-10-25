# স্বপ্ননীড় | Swapnonir Website
**Plain HTML + CSS + JS frontend · tiny zero-dependency Node server for forms**

## Files
| File | Purpose |
|------|---------|
| `server.js` | Local server — static files + form API (`/api/donate`, `/api/volunteer`, `/api/contact`) |
| `style.css` | ALL styling — design tokens, components, layouts |
| `main.js` | ALL logic — counters, forms, pie chart, member filter |
| `nav.js` | Injects navbar + footer into every page |
| `index.html` | Home — hero, prose, program list, pull-quote, donate strip |
| `donate.html` | Full donation flow — reveal, copy, TxID form |
| `about.html` | How it started, what it does, who runs it |
| `programs.html` | 3 programs with detail |
| `impact.html` | This year's account + financial pie chart |
| `stories.html` | Success stories |
| `team.html` | The team, in brief |
| `members.html` | Member directory with filter + search |
| `advisors.html` | Advisory council (being formed) |
| `doctor-bari.html` | Heritage timeline page |
| `get-involved.html` | Volunteer application form |
| `contact.html` | Contact form + details |
| `why-us.html` | How we work — 3 short paragraphs |
| `legal.html` | Privacy, terms, official notice |
| `404.html` | Not found page |

## Run locally
```bash
node server.js
# → swapnonir running on http://localhost:3000
```
Open http://localhost:3000. `PORT=… node server.js` overrides the port; the
server binds to 127.0.0.1 by default.

The three forms POST JSON to the local API. The server validates (required
fields, Bangladeshi phone `01XXXXXXXXX`, TxID patterns per bKash/Nagad, a
`_gotcha` honeypot) and appends accepted submissions to `data/submissions.json`
(never committed — see `.gitignore`).

## Before going live — replace these in main.js
```js
const CFG = {
  bkash: '01XXXXXXXXX',   // ← real bKash number
  nagad: '01XXXXXXXXX',   // ← real Nagad number
  wa:    '880XXXXXXXXXX', // ← WhatsApp with country code
};
```

## Deploy
Note: the Node server in `server.js` is dev-only; the static HTML still deploys
unchanged to Vercel/GitHub Pages, but the forms will 404 there until you wire a
serverless handler or Formspree back in (`main.js` `CFG` endpoints).

### Deploy to Vercel (free)
1. Push folder to GitHub
2. vercel.com → New Project → Import repo
3. Framework: **Other** (static)
4. Done — HTTPS auto-configured

### Deploy to GitHub Pages (also free)
1. Push to GitHub repo
2. Settings → Pages → Source: main branch / root
3. Site live at `username.github.io/repo-name`

## Design System (Humanity & Trust)
| Token | Value | Use |
|-------|-------|-----|
| `--coral` | `#E86A58` | Primary CTA only (Donate, Join) |
| `--forest` | `#1B4D3E` | Headlines, trust indicators |
| `--bg` | `#FFF8F6` | Page background (Alabaster) |
| `--sans` | Public Sans | Body, buttons, labels |
| `--serif` | Newsreader | All headings, impact numbers |
| `--bangla` | Hind Siliguri | All Bangla text |
