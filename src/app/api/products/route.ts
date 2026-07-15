import { searchProducts } from "@/lib/search-products";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() ?? "";

  if (!query) {
    return NextResponse.json(
      { error: "Missing search query. Use ?q=your+product" },
      { status: 400 },
    );
  }

  if (query.length > 120) {
    return NextResponse.json(
      { error: "Query is too long. Keep it under 120 characters." },
      { status: 400 },
    );
  }

  try {
    const result = await searchProducts(query);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "Could not search products right now. Try again shortly." },
      { status: 502 },
    );
  }
}
