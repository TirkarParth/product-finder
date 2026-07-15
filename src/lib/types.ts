export type Product = {
  id: string;
  title: string;
  price: string;
  image: string;
  rating?: number;
  source: string;
  url: string;
  description?: string;
};

export type ProductSearchResponse = {
  query: string;
  source: "serpapi" | "catalog";
  products: Product[];
};
