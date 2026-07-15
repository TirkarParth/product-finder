import type { Product, ProductSearchResponse } from "@/lib/types";

type DummyProduct = {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  thumbnail: string;
  brand?: string;
  category?: string;
};

function formatPrice(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

/** Client-safe catalog search for static GitHub Pages hosting. */
export async function searchCatalog(
  query: string,
): Promise<ProductSearchResponse> {
  const trimmed = query.trim();
  if (!trimmed) {
    return { query: "", source: "catalog", products: [] };
  }

  const url = new URL("https://dummyjson.com/products/search");
  url.searchParams.set("q", trimmed);
  url.searchParams.set("limit", "24");

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error("Could not search products right now. Try again shortly.");
  }

  const data = (await response.json()) as { products?: DummyProduct[] };
  const products: Product[] = (data.products ?? []).map((product) => ({
    id: `catalog-${product.id}`,
    title: product.title,
    price: formatPrice(product.price),
    image: product.thumbnail,
    rating: product.rating,
    source: product.brand || product.category || "Catalog",
    url: `https://dummyjson.com/products/${product.id}`,
    description: product.description,
  }));

  return { query: trimmed, source: "catalog", products };
}
