# Lam7a Static Site

This repo hosts the Lam7a magazine website as a static Next.js export for GitHub Pages.

## Local Development

Use Node 20:

```bash
nvm use
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

Build the static output:

```bash
npm run build
```

Generated files are written to `out/`.

## Deploy to GitHub Pages

Deployment is handled by the GitHub Actions workflow at `.github/workflows/deploy-pages.yml`.

1. In GitHub, open repository settings.
2. Under **Pages**, set source to **GitHub Actions**.
3. Push to `main` to trigger deployment.

## Content Updates

This site is fully file-driven. Update these files and redeploy:

- Magazine issues: `data/sliderItems.tsx`. The newest issue is featured on the homepage automatically. Each issue can carry three optional extras: `theme` (the title on the cover), `ink` (a strong colour from the cover) and `wash` (a pale colour from the cover). The issue's page is tinted with them; leave them out and the default colours are used.
- Page images for the reader: `public/magazine-pages/issueN/page-01.jpg`, … (see `scripts/generate-pages.sh`). The page count is read from this folder at build time.
- Team members: `data/team.ts`
- Gallery images: `data/images.ts`
- Static assets: `public/`

## Notes

- The app uses `output: "export"` in `next.config.js`, so no server runtime is required.
- Internal navigation is built to work correctly under GitHub Pages repo paths. Images use plain `<img>` tags, so wrap any path to a file in `public/` with `asset()` from `app/lib/util.ts`.
- The look of the site lives in `app/globals.css`.

