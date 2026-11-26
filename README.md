# L’Walida — الوالدة

> **Every street holds a memory.**

The official landing page for **L’Walida**, an emotional narrative adventure inspired by the historic medina of Rabat, Morocco. Built by **PROJET_29** for the **Game Jam VGC** under the theme *Lost in the Medina*.

- **Live site:** [landing-page-game-lwalida.vercel.app](https://landing-page-game-lwalida.vercel.app)
- **Repository:** [github.com/ELMACHHOUNE/landing-page-game-lwalida](https://github.com/ELMACHHOUNE/landing-page-game-lwalida)
- **Game genre:** 2D narrative adventure · exploration · puzzle
- **Setting:** Rabat, Morocco
- **Status:** In development

---

## About the project

This repository is the **marketing and information site** for L’Walida. It presents the game’s story, world, art direction, sound design, team, and production journey, and gives visitors a place to follow the project until release.

The game follows a young man who returns to his mother’s childhood neighbourhood with an old photograph, exploring the streets, voices, and memories that shaped her world. The landing page reflects that tone through an editorial, book-inspired visual language: warm paper textures, deep teal, gold accents, and Moroccan architectural motifs.

## Tech stack

- **Next.js 16** (App Router, React Server Components)
- **React 19**
- **TypeScript 5.7**
- **Tailwind CSS v4** via `@tailwindcss/postcss`
- **shadcn/ui** primitives (Base UI) and **lucide-react** icons
- **Vercel Analytics** for privacy-friendly traffic insights
- Custom CSS in `app/globals.css` for the art direction and scroll animations

## Features

- Cinematic hero with a scroll-driven “opening book” reveal and parallax.
- Story, memory journal, world/locations, art direction, sound, team, process, and jam sections.
- Interactive memory journal with arrow, swipe, and keyboard navigation.
- Fully responsive layout with `prefers-reduced-motion` support.
- SEO metadata, Open Graph/Twitter cards, sitemap, robots, PWA manifest, and JSON-LD structured data.
- Brand favicon set generated from the L’Walida open-book mark.

## Getting started

### Prerequisites

- Node.js 20+ (recommended)
- npm, pnpm, or yarn

### Install and run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production build

```bash
npm run build
npm run start
```

> `package.json` declares `pnpm` as the package manager, so `pnpm install && pnpm dev` also works. An `npm` lockfile is committed as well.

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical site origin used by `metadataBase`, Open Graph URLs, `robots.txt`, and `sitemap.xml`. Defaults to `https://landing-page-game-lwalida.vercel.app`. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional | Google Search Console verification token. |

Example `.env.local`:

```bash
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-verification-token
```

## Project structure

```
app/
  layout.tsx        Root layout, SEO metadata, viewport, analytics
  page.tsx          Landing page entry + JSON-LD structured data
  globals.css       Design system, layout, and responsive styles
  manifest.ts       Web app manifest (/manifest.webmanifest)
  robots.ts         robots.txt (/robots.txt)
  sitemap.ts        sitemap.xml (/sitemap.xml)
components/
  site-experience.tsx  All page sections and client-side interactions
  ui/button.tsx        shadcn/ui button primitive
lib/
  site.ts           Site config, keywords, and team data
  utils.ts          Class name helpers
public/
  logo.png          L’Walida open-book logo
  og-image.jpg      1200×630 social sharing image
  icon.svg          Vector favicon / app icon
  icon-192.png      PWA icon
  icon-512.png      PWA icon
  apple-icon.png    180×180 Apple touch icon
  favicon.ico       Classic favicon
  favicon-16x16.png
  favicon-32x32.png
  images/           Rabat artwork and environment illustrations
```

## SEO and metadata

SEO is centralised in `app/layout.tsx` and `lib/site.ts`:

- Title template, description, keywords, author, and category.
- Canonical URL via `metadataBase` and `alternates.canonical`.
- Open Graph and Twitter `summary_large_image` cards using `/og-image.jpg`.
- `robots.txt` (`app/robots.ts`) and `sitemap.xml` (`app/sitemap.ts`).
- Web app manifest (`app/manifest.ts`) with 192/512 icons.
- JSON-LD `VideoGame`, `WebSite`, and `Organization` schemas in `app/page.tsx`.

When deploying, set `NEXT_PUBLIC_SITE_URL` to the production origin so canonical and social URLs resolve correctly.

## Brand assets

The favicon set is generated from the L’Walida open-book mark in the brand palette:

| Token | Hex |
|---|---|
| Midnight Teal | `#0A272E` |
| Gold | `#E3A43E` |
| Leather / Terracotta | `#BD6B31` |
| Paper | `#FCE9D3` |

To regenerate icons, edit `public/icon.svg` and export PNGs at 16, 32, 180, 192, and 512 px, plus `favicon.ico`.

## Deployment

The site is built for [Vercel](https://vercel.com):

1. Import the repository into Vercel.
2. Add `NEXT_PUBLIC_SITE_URL` (and optionally the Google verification token) in **Project → Settings → Environment Variables**.
3. Deploy. The default build command `next build` is detected automatically.

## The team

| Member | Role |
|---|---|
| Montassir BENTAHAR | Graphic Designer — environment illustrations, character artwork |
| Mohamed EL MACHHOUNE | UX/UI & Graphic Designer — visual identity, logo, game interfaces |
| Saad abdoulmoulah | Writer & Producer — screenwriting, production coordination |
| Salma MAHDAR | Game Designer — game mechanics, level design |
| Nouhaila MAADI | Sound Effects Designer — environmental soundscapes, Foley |
| OUFFATA Fatima Ezzahrae | Music Designer — original soundtrack, musical identity |
| EL-HILALY Yahya | Game Narrative — interactive storytelling, dialogue |
| EL RHALLOUCH Mohamed Amine | Game Developer — Unity development, gameplay |

## Credits

- Concept, art direction, and content by **PROJET_29**.
- Inspired by the people, architecture, and living heritage of **Rabat, Morocco**.
- Created for the **Game Jam VGC** — theme: *Lost in the Medina*.
- Illustrations and the L’Walida logo are original project assets.

The game’s narrative and characters are fictional.

---

**L’Walida — Every street holds a memory.**  
Made in Morocco. © 2026 PROJET_29.
