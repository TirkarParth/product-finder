# Findr

Search for products and browse matching results with prices, ratings, and outbound links.

Live site (GitHub Pages): https://tirkarparth.github.io/product-finder/

## Features

- Fast search UI for product queries
- Product catalog search over the public web API at DummyJSON
- Static site ready for GitHub Pages (no server required)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build locally

```bash
npm run build
```

Static files are written to the `out/` folder.

## Deploy with GitHub Pages

Pushing to `main` runs [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml), which builds the static export and publishes it to GitHub Pages.

Site URL pattern:

`https://<your-github-username>.github.io/product-finder/`
