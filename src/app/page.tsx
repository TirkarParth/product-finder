"use client";

import { ProductResults } from "@/components/ProductResults";
import { SearchForm } from "@/components/SearchForm";
import type { Product, ProductSearchResponse } from "@/lib/types";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [source, setSource] = useState<"serpapi" | "catalog" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch(nextQuery: string) {
    setQuery(nextQuery);
    setHasSearched(true);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `/api/products?q=${encodeURIComponent(nextQuery)}`,
      );
      const data = (await response.json()) as ProductSearchResponse & {
        error?: string;
      };

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong while searching.");
      }

      setProducts(data.products);
      setSource(data.source);
    } catch (searchError) {
      setProducts([]);
      setSource(null);
      setError(
        searchError instanceof Error
          ? searchError.message
          : "Something went wrong while searching.",
      );
    } finally {
      setIsLoading(false);
    }
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
            <SearchForm
              initialQuery={query}
              onSearch={handleSearch}
              isLoading={isLoading}
            />
          </div>
        </section>

        <section className="animate-rise-delay-2 mx-auto mt-14 w-full">
          {!hasSearched ? (
            <p className="text-center text-sm text-muted">
              Suggestions: laptop stand · trail running shoes · cast iron skillet
            </p>
          ) : (
            <ProductResults
              query={query}
              products={products}
              source={source}
              isLoading={isLoading}
              error={error}
            />
          )}
        </section>
      </main>
    </div>
  );
}
