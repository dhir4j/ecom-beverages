import { products } from "@/lib/data";
import { ProductCard } from "@/components/product/product-card";

export function FeaturedProducts() {
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Featured Products
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Check out our best-sellers and new arrivals.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} isWholesale={false} />
          ))}
        </div>
      </div>
    </section>
  );
}
