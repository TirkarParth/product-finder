# Findr

Search for products and browse matching results with prices, ratings, and outbound links.

## Features

- Fast search UI for product queries
- `/api/products?q=...` backend route
- Live Google Shopping results when `SERPAPI_API_KEY` is set
- Public catalog fallback so the app works without an API key

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Optional live shopping search

Copy `.env.example` to `.env.local` and add a [SerpAPI](https://serpapi.com/) key:

```bash
cp .env.example .env.local
```

```env
SERPAPI_API_KEY=your_key_here
```

Without a key, Findr searches a public demo product catalog.

## Deploy

```bash
npx vercel
```

Add `SERPAPI_API_KEY` in the Vercel project environment variables if you want live shopping results in production.
