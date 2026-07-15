"use client";

import { SearchForm } from "@/components/SearchForm";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  function handleSearch(nextQuery: string) {
    setQuery(nextQuery);
    setHasSearched(true);
  }

  return (
    <div className="page-shell">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 pt-8">
        <p className="font-[family-name:var(--font-syne)] text-2xl font-bold tracking-tight text-brand">
          Findr
        </p>
        <p className="text-sm text-muted">Product search</p>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 pb-16 pt-16 sm:pt-24">
        <section className="mx-auto w-full max-w-3xl text-center">
          <h1 className="animate-rise font-[family-name:var(--font-syne)] text-4xl font-bold leading-tight tracking-tight text-brand sm:text-6xl">
            Find products across the web
          </h1>
          <p className="animate-rise-delay mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg">
            Search once. See matching products with prices, ratings, and links to
            dig deeper.
          </p>

          <div className="mt-10">
            <SearchForm initialQuery={query} onSearch={handleSearch} />
          </div>
        </section>

        <section className="animate-rise-delay-2 mx-auto mt-14 w-full max-w-3xl">
          {!hasSearched ? (
            <p className="text-center text-sm text-muted">
              Suggestions: laptop stand · trail running shoes · cast iron skillet
            </p>
          ) : (
            <div className="rounded-2xl border border-dashed border-border bg-surface px-6 py-10 text-center">
              <p className="font-[family-name:var(--font-syne)] text-lg font-semibold text-brand">
                Ready for “{query}”
              </p>
              <p className="mt-2 text-sm text-muted">
                Product results will appear here once search is connected.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
