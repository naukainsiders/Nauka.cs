# NAUKA — Coming Soon Landing Page

A static "Coming Soon" page for [nauka.co.in](https://nauka.co.in), designed to introduce the NAUKA brand and collect email waitlist signups ahead of launch.

---

## Quick Start

This is a plain HTML / CSS / JS page with no build step.

### Preview locally

Open `index.html` directly in a browser, **or** serve it with any static server:

```bash
# Python 3
python3 -m http.server 8000

# Node (npx, no install needed)
npx -y serve .
```

Then visit **http://localhost:8000**.

---

## Project Structure

```
coming-soon-site-nauka/
├── index.html        ← Page markup and meta tags
├── style.css         ← All styles (design tokens at the top)
├── script.js         ← Email form logic and Supabase client config
├── supabase-schema.sql ← Waitlist table and RLS setup
├── favicon.svg       ← Browser tab icon
├── assets/
│   └── hero.jpg      ← Hero background image
└── README.md         ← This file
```

---

## Editing Content

| What                   | Where to edit                                      |
| ---------------------- | -------------------------------------------------- |
| Page title & meta tags | `index.html` → `<head>`                            |
| Headline & body text   | `index.html` → the `.headline` and `.subtext` elements |
| Colors & fonts         | `style.css` → `:root { … }` design tokens          |
| Hero image             | Replace `assets/hero.jpg` (keep the same filename) |
| Social share image     | Update the `og:image` / `twitter:image` URLs       |
| Footer year            | Auto-generated from JS; no manual edit needed      |

---

## Connecting the Email Signup to Supabase

1. Open `supabase-schema.sql` and run it in Supabase Dashboard → SQL Editor.
2. In Supabase Dashboard → Settings → API Keys, copy the Project URL and Publishable key.
3. Paste them into the `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` values at the top of `script.js`.
4. If your project uses restricted Data API exposure, expose the `waitlist` table in Integrations → Data API.
5. Deploy the files through a web server. The Supabase CDN client is already loaded by `index.html`.

The browser can insert a signup, but Row Level Security prevents public visitors from reading, updating, or deleting the list. Never put a Supabase secret or `service_role` key in this project.

---

## Swapping the Hero Image

1. Replace `assets/hero.jpg` with your new image (JPEG or WebP).
2. If the filename differs, update the path in:
   - `style.css` → `.bg { background-image: … }`
   - `index.html` → `og:image` and `twitter:image` meta tags.
3. For best results use a landscape image ≥ 1920 px wide.

---

## Before Publishing — Checklist

- [ ] Run `supabase-schema.sql` in the Supabase SQL Editor.
- [ ] Set `SUPABASE_URL` and `SUPABASE_PUBLISHABLE_KEY` in `script.js`.
- [ ] Submit a test email and confirm it appears in the `waitlist` table.
- [ ] Update `og:image` and `twitter:image` URLs with the full production URL.
- [ ] Replace `https://nauka.co.in/` in `og:url` if the domain differs.
- [ ] (Optional) Add a `robots.txt` and `sitemap.xml`.
- [ ] (Optional) Compress `assets/hero.jpg` further with a tool like [Squoosh](https://squoosh.app).

---

## Accessibility Notes

- Semantic HTML5 landmarks (`<header>`, `<main>`/`<section>`, `<footer>`).
- Visible focus rings on all interactive elements.
- `aria-live="polite"` status region for form feedback.
- `prefers-reduced-motion` disables all animations.
- Color contrast meets WCAG AA against the overlay.

---

## License

Private — NAUKA brand assets. Not for redistribution.
