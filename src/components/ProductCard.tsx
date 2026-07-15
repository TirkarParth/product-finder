import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition duration-300 hover:-translate-y-1 hover:border-brand-soft hover:shadow-[var(--shadow)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#e8efe9]">
        {product.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-muted">
            No image
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4 text-left">
        <p className="text-xs font-medium uppercase tracking-wide text-muted">
          {product.source}
        </p>
        <h3 className="line-clamp-2 font-[family-name:var(--font-syne)] text-base font-semibold leading-snug text-brand">
          {product.title}
        </h3>
        {product.description ? (
          <p className="line-clamp-2 text-sm text-muted">{product.description}</p>
        ) : null}
        <div className="mt-auto flex items-center justify-between gap-3 pt-2">
          <p className="text-base font-semibold text-foreground">{product.price}</p>
          {typeof product.rating === "number" ? (
            <p className="text-sm text-muted">{product.rating.toFixed(1)} ★</p>
          ) : null}
        </div>
      </div>
    </a>
  );
}
