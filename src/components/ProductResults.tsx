import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/types";

type ProductResultsProps = {
  query: string;
  products: Product[];
  source: "serpapi" | "catalog" | null;
  isLoading: boolean;
  error: string | null;
};

function LoadingGrid() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl border border-border bg-surface"
        >
          <div className="skeleton aspect-[4/3]" />
          <div className="space-y-3 p-4">
            <div className="skeleton h-3 w-20 rounded" />
            <div className="skeleton h-5 w-full rounded" />
            <div className="skeleton h-5 w-2/3 rounded" />
            <div className="skeleton h-4 w-24 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ProductResults({
  query,
  products,
  source,
  isLoading,
  error,
}: ProductResultsProps) {
  if (isLoading) {
    return <LoadingGrid />;
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-[#fff7f5] px-6 py-10 text-center">
        <p className="font-[family-name:var(--font-syne)] text-lg font-semibold text-brand">
          Search failed
        </p>
        <p className="mt-2 text-sm text-muted">{error}</p>
      </div>
    );
  }

  if (!query) {
    return null;
  }

  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface px-6 py-10 text-center">
        <p className="font-[family-name:var(--font-syne)] text-lg font-semibold text-brand">
          No products found for “{query}”
        </p>
        <p className="mt-2 text-sm text-muted">
          Try a broader term or a different product category.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-[family-name:var(--font-syne)] text-2xl font-semibold text-brand">
            Results for “{query}”
          </h2>
          <p className="mt-1 text-sm text-muted">
            {products.length} product{products.length === 1 ? "" : "s"} found
            {source === "serpapi"
              ? " via live Google Shopping search"
              : source === "catalog"
                ? " from the demo catalog (add SERPAPI_API_KEY on Netlify for real products)"
                : ""}
          </p>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
