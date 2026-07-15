import type { Handler } from "@netlify/functions";
import { searchProducts } from "./lib/search-products";

const jsonHeaders = {
  "Content-Type": "application/json",
} as const;

export const handler: Handler = async (event) => {
  const query = event.queryStringParameters?.q?.trim() ?? "";

  if (!query) {
    return {
      statusCode: 400,
      headers: jsonHeaders,
      body: JSON.stringify({
        error: "Missing search query. Use ?q=your+product",
      }),
    };
  }

  if (query.length > 120) {
    return {
      statusCode: 400,
      headers: jsonHeaders,
      body: JSON.stringify({
        error: "Query is too long. Keep it under 120 characters.",
      }),
    };
  }

  try {
    const result = await searchProducts(query);
    return {
      statusCode: 200,
      headers: {
        ...jsonHeaders,
        "Cache-Control": "public, max-age=300",
      },
      body: JSON.stringify(result),
    };
  } catch {
    return {
      statusCode: 502,
      headers: jsonHeaders,
      body: JSON.stringify({
        error: "Could not search products right now. Try again shortly.",
      }),
    };
  }
};
