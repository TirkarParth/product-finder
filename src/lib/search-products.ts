import type { ProductSearchResponse } from "@/lib/types";
import { searchCatalog } from "@/lib/search-catalog";

/** Prefer Netlify serverless search; fall back to demo catalog on static hosts. */
export async function searchProducts(
  query: string,
): Promise<ProductSearchResponse> {
  try {
    const response = await fetch(
      `/api/products?q=${encodeURIComponent(query.trim())}`,
    );

    const data = (await response.json()) as ProductSearchResponse & {
      error?: string;
    };

    if (response.ok) {
      return data;
    }

    if (response.status >= 500) {
      throw new Error(data.error || "Search service unavailable.");
    }

    throw new Error(data.error || "Invalid search request.");
  } catch (error) {
    if (
      error instanceof TypeError ||
      (error instanceof Error &&
        /fetch|network|failed/i.test(error.message))
    ) {
      return searchCatalog(query);
    }

    throw error;
  }
}
