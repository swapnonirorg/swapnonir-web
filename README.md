# Swapnonir (স্বপ্ননীড়)

A grassroots, volunteer-driven social organisation based in Sreepur, Debidwar, Cumilla, Bangladesh — serving the community since 2013.

This repository contains the public-facing website for Swapnonir, built entirely with **zero external dependencies**: no npm packages, no React, no Tailwind, no external CSS frameworks. Just native web standards and a lightweight Node.js backend.

---

## 🏠 About the Organisation

| Attribute | Details |
|-----------|---------|
| **Name** | Swapnonir (স্বপ্ননীড়) |
| **Location** | Sreepur, Debidwar, Cumilla - 3510, Bangladesh |
| **Founded** | 2013 |
| **Structure** | 19-member Executive Committee |
| **Mission** | A grassroots, volunteer-driven social organisation facing the reality of an adverse society, determined to build a secure future (বিপরীতমুখী সমাজের বাস্তবতাকে মেনে নিয়ে নিশ্চিত ভবিষ্যৎ গড়ার প্রত্যয়ে). The organisation avoids corporate jargon and focuses on quiet, documented action. |

### Timeline

| Year | Milestone |
|------|-----------|
| 2013 | Organisation founded |
| 2015 | Winter clothes distribution |
| 2016 | Jamalpur flood relief |
| 2020 | COVID-19 food support |
| 2022 | Sylhet floods relief |
| 2024 | Cumilla / Feni / Noakhali floods relief |
| 2026 | Revamp meeting |

---

## 🛠️ Tech Stack

### Frontend

| Layer | Technology | Notes |
|-------|-----------|-------|
| Markup | HTML5 | Semantic markup |
| Styling | CSS3 | Custom "Humanity & Trust" Design System. No Tailwind, no Bootstrap. |
| Design Features | CSS variables | Dark Mode, mobile-first responsive design |
| Typography | Newsreader (Serif), Helvetica Neue (Sans-serif), Hind Siliguri (Bangla) | — |
| Colors | Forest Green (#1B4D3E), Coral Clay (#E86A58), Alabaster (#FFF8F6) | — |
| Scripting | Vanilla JavaScript (ES6+) | No libraries. Custom bilingual toggle (.text-bn/.text-en), form validation, native lightbox. |

### Backend

| Layer | Technology | Notes |
|-------|-----------|-------|
| Runtime | Node.js | Standard Library only: `http`, `fs`, `path`, `url`, `crypto` |
| Dependencies | **Zero** | No `npm install`, no `package.json` dependencies |
| Server | `server.js` | Custom Node.js HTTP server |
| API Endpoints | `/api/donate`, `/api/volunteer`, `/api/contact` | Form submission handlers |
| Data Storage | `data/submissions.json` | Validated submissions saved locally (gitignored) |

### Key Features

- **Bilingual (Bangla / English)** — content toggles via `.text-bn` / `.text-en` classes
- **Transparent Impact page** — documented milestones and relief activities
- **Fraud Protection warnings** — explicit donor guidance on the site
- **Accessibility** — ARIA attributes and keyboard navigable

---

## 📁 Project Structure

```
swapnonir-web/
├── css/
│   └── style.css          # All styling and design tokens
├── js/
│   ├── main.js            # Core client-side logic
│   └── nav.js             # Navigation, language toggle, and shared UI logic
├── server.js              # Node.js backend server (standard library only)
├── assets/                # Images and logos
├── *.html                 # Individual pages (index, about, journey, etc.)
└── data/                  # Local JSON storage for form submissions (gitignored)
```

---

## 🚀 How to Run Locally

**Requirements:**
- Node.js installed on your system

**Steps:**

1. Clone the repository:
   ```bash
   git clone https://github.com/taskifbin/swapnonir-web.git
   cd swapnonir-web
   ```

2. Start the server:
   ```bash
   node server.js
   ```

   No `npm install` is required — there are no external dependencies.

3. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

The site will be served locally at `http://localhost:3000` with no build step needed.

---

## 🤝 Contributing

This project intentionally avoids external frameworks to keep the codebase lightweight, auditable, and dependency-free. When contributing:

- Do not add npm packages, React, Vue, Tailwind, Bootstrap, or other frontend/backend frameworks.
- Use semantic HTML5, vanilla CSS3 with custom properties, and vanilla JavaScript (ES6+).
- Keep the backend reliant only on Node.js standard library modules.
- Maintain bilingual parity between Bangla (`.text-bn`) and English (`.text-en`) content.

---

## 📄 License

This project is maintained by Swapnonir (স্বপ্ননীড়).
```
