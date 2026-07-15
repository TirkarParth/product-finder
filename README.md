# Findr

Search for products and browse matching results with prices, ratings, and outbound links.

Live site (Netlify): https://findr-product-search.netlify.app

GitHub Pages mirror: https://tirkarparth.github.io/product-finder/

## Features

- Fast search UI for product queries
- Live Google Shopping results on Netlify when `SERPAPI_API_KEY` is set
- Demo catalog fallback when no API key is configured
- Static GitHub Pages mirror (catalog only)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

For local testing with Netlify serverless functions:

```bash
cp .env.example .env
# add SERPAPI_API_KEY
npm run dev:netlify
```

## Real product search on Netlify

Netlify deployment alone is not enough — you also need a shopping search API key.

1. Create a free trial at [SerpAPI](https://serpapi.com/)
2. In Netlify go to **Site settings → Environment variables**
3. Add `SERPAPI_API_KEY` with your key
4. Trigger a new deploy

Without that key, Findr keeps using the DummyJSON demo catalog.

## Build locally

```bash
npm run build
```

Static files are written to the `out/` folder. Netlify functions live in `netlify/functions/`.

## Deploy with GitHub Pages

Pushing to `main` runs [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml), which builds the static export and publishes it to GitHub Pages.

Site URL pattern:

`https://<your-github-username>.github.io/product-finder/`
