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

type SerpShoppingResult = {
  product_id?: string;
  position?: number;
  title?: string;
  price?: string;
  extracted_price?: number;
  thumbnail?: string;
  source?: string;
  link?: string;
  product_link?: string;
  rating?: number;
};

function formatPrice(value: number | string | undefined): string {
  if (typeof value === "number" && Number.isFinite(value)) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(value);
  }

  if (typeof value === "string" && value.trim()) {
    return value.trim();
  }

  return "Price unavailable";
}

async function searchCatalog(query: string): Promise<Product[]> {
  const url = new URL("https://dummyjson.com/products/search");
  url.searchParams.set("q", query);
  url.searchParams.set("limit", "24");

  const response = await fetch(url, { next: { revalidate: 300 } });
  if (!response.ok) {
    throw new Error("Catalog search failed");
  }

  const data = (await response.json()) as { products?: DummyProduct[] };
  return (data.products ?? []).map((product) => ({
    id: `catalog-${product.id}`,
    title: product.title,
    price: formatPrice(product.price),
    image: product.thumbnail,
    rating: product.rating,
    source: product.brand || product.category || "Catalog",
    url: `https://dummyjson.com/products/${product.id}`,
    description: product.description,
  }));
}

async function searchSerpApi(query: string, apiKey: string): Promise<Product[]> {
  const url = new URL("https://serpapi.com/search.json");
  url.searchParams.set("engine", "google_shopping");
  url.searchParams.set("q", query);
  url.searchParams.set("api_key", apiKey);
  url.searchParams.set("num", "24");

  const response = await fetch(url, { next: { revalidate: 300 } });
  if (!response.ok) {
    throw new Error("Live shopping search failed");
  }

  const data = (await response.json()) as {
    shopping_results?: SerpShoppingResult[];
  };

  return (data.shopping_results ?? []).map((item, index) => ({
    id: item.product_id || `serp-${item.position ?? index}`,
    title: item.title || "Untitled product",
    price: formatPrice(item.price ?? item.extracted_price),
    image: item.thumbnail || "",
    rating: item.rating,
    source: item.source || "Google Shopping",
    url: item.product_link || item.link || "#",
  }));
}

export async function searchProducts(
  query: string,
): Promise<ProductSearchResponse> {
  const trimmed = query.trim();
  if (!trimmed) {
    return { query: "", source: "catalog", products: [] };
  }

  const apiKey = process.env.SERPAPI_API_KEY?.trim();
  if (apiKey) {
    try {
      const products = await searchSerpApi(trimmed, apiKey);
      if (products.length > 0) {
        return { query: trimmed, source: "serpapi", products };
      }
    } catch {
      // Fall through to catalog so the app still works without a paid key.
    }
  }

  const products = await searchCatalog(trimmed);
  return { query: trimmed, source: "catalog", products };
}
