"use client";

import { FormEvent, useState } from "react";

type SearchFormProps = {
  initialQuery?: string;
  onSearch: (query: string) => void;
  isLoading?: boolean;
};

export function SearchForm({
  initialQuery = "",
  onSearch,
  isLoading = false,
}: SearchFormProps) {
  const [query, setQuery] = useState(initialQuery);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed || isLoading) return;
    onSearch(trimmed);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="animate-rise-delay flex w-full flex-col gap-3 sm:flex-row sm:items-stretch"
      role="search"
    >
      <label htmlFor="product-query" className="sr-only">
        Search products
      </label>
      <input
        id="product-query"
        type="search"
        name="q"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Try wireless headphones, standing desk, espresso maker…"
        autoComplete="off"
        className="min-h-14 flex-1 rounded-2xl border border-border bg-surface px-5 text-base text-foreground shadow-[var(--shadow)] outline-none transition focus:border-brand-soft focus:ring-2 focus:ring-brand/20"
      />
      <button
        type="submit"
        disabled={isLoading || !query.trim()}
        className="min-h-14 rounded-2xl bg-accent px-7 text-base font-semibold text-white transition hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isLoading ? "Searching…" : "Search"}
      </button>
    </form>
  );
}
