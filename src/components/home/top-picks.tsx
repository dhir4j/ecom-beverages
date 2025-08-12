import { getProducts } from "@/lib/products";
import { ProductCard } from "@/components/product/product-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

async function TopPicksForCategory({ category }: { category: string }) {
  const allProducts = await getProducts();
  const products = allProducts
    .filter((p) => p.category.toLowerCase() === category.toLowerCase())
    .slice(0, 5);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-2xl font-bold tracking-tight text-foreground">
          Top Picks For {category}
        </h3>
        <Button asChild variant="link">
            <Link href={`/c/${encodeURIComponent(category)}`}>View All</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export async function TopPicks() {
  const categories = ["Cold Drinks", "Nutritional Drinks", "Juices", "Energy Drinks", "Packaged Water"];

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        {categories.map((category) => (
          <TopPicksForCategory key={category} category={category} />
        ))}
      </div>
    </section>
  );
}
