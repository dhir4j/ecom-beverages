import { getCategories } from "@/lib/products";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export async function CategoryShowcase() {
  const allCategories = await getCategories();
  
  // Define the structure of the pyramid
  const pyramidRows = [
    allCategories.slice(0, 3),
    allCategories.slice(3, 7),
    allCategories.slice(7, 12),
  ];

  return (
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Find what you need from our wide range of beverage categories.
          </p>
        </div>
        <div className="flex flex-col items-center gap-4">
          {pyramidRows.map((row, rowIndex) => (
            <div key={rowIndex} className="flex justify-center flex-wrap gap-4">
              {row.map((category) => (
                <Button
                  key={category}
                  asChild
                  variant="outline"
                  className="bg-background hover:bg-accent hover:text-accent-foreground transition-all duration-300 transform hover:scale-105 shadow-md"
                  size="lg"
                >
                  <Link href={`/c/${encodeURIComponent(category)}`}>
                    {category}
                  </Link>
                </Button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
