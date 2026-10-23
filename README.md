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
├── script.js         ← Email form logic (endpoint config at the top)
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
| Headline & body text   | `index.html` → inside `.hero__body`                |
| Colors & fonts         | `style.css` → `:root { … }` design tokens          |
| Hero image             | Replace `assets/hero.jpg` (keep the same filename) |
| Social share image     | Update the `og:image` / `twitter:image` URLs       |
| Footer year            | Auto-generated from JS; no manual edit needed      |

---

## Connecting the Email Signup

Open **`script.js`** and set the `SIGNUP_ENDPOINT` constant:

```js
const SIGNUP_ENDPOINT = 'https://your-api.example.com/waitlist';
```

### Expected server contract

The form sends a **POST** request with:

```
Content-Type: application/json

{ "email": "user@example.com" }
```

The server should respond with:

| Status  | Meaning                                             |
| ------- | --------------------------------------------------- |
| 200/201 | Success — the email was recorded                    |
| 4xx/5xx | Failure — optionally return `{ "message": "…" }`   |

While `SIGNUP_ENDPOINT` is `null`, the form will display:

> "Signup is not yet available — we're still setting things up."

No fake success messages will be shown.

---

## Swapping the Hero Image

1. Replace `assets/hero.jpg` with your new image (JPEG or WebP).
2. If the filename differs, update the path in:
   - `style.css` → `.hero__backdrop { background-image: … }`
   - `index.html` → `og:image` and `twitter:image` meta tags.
3. For best results use a landscape image ≥ 1920 px wide.

---

## Before Publishing — Checklist

- [ ] Set `SIGNUP_ENDPOINT` in `script.js` to a real API URL.
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
