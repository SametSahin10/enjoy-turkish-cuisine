# Enjoy Turkish Cuisine

A showcase of Turkish dishes and desserts for tourists: photos, short videos, descriptions, and
"where to eat" recommendations. Built with Next.js (App Router) + TypeScript + Tailwind CSS, with
SEO-first static generation.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build (statically generates all dish pages)
npm run start    # serve the production build
```

## Content

Each dish is an MDX file in `content/dishes/<slug>.mdx`. Frontmatter holds structured fields
(title, category, media, and a `places[]` list with a `sponsored` flag); the MDX body holds the
long-form description. The data layer in `lib/` reads and validates these at build time.

To add a dish: create a new `.mdx` file in `content/dishes/`, drop media into
`public/media/dishes/<slug>/`, and it's automatically picked up (including in the sitemap).

## Deploy (Vercel)

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub.
2. **Add New → Project** → import `sametsahin10/enjoy-turkish-cuisine`.
3. Vercel auto-detects Next.js, no configuration needed. Click **Deploy**.

Every push to a branch gets its own preview URL automatically; pushes to the production branch
update the live site.
