import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { getCategories } from "@/lib/products";

const categoryImages: { [key: string]: { image: string, hint: string } } = {
  "cold drinks": { image: "https://placehold.co/400x300.png", hint: "soda cans" },
  "juices": { image: "https://placehold.co/400x300.png", hint: "juice cartons" },
  "energy drinks": { image: "https://placehold.co/400x300.png", hint: "energy drinks" },
  "nutritional drinks": { image: "https://placehold.co/400x300.png", hint: "health drinks" },
  "packaged water": { image: "https://placehold.co/400x300.png", hint: "water bottles" },
};

export async function CategoryHighlights() {
  const categories = (await getCategories()).slice(0, 4);

  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Shop by Category
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Explore our wide range of beverage categories.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const categoryInfo = categoryImages[category.toLowerCase()] || { image: "https://placehold.co/400x300.png", hint: "beverages" };
            return (
              <Link key={category} href={`/c/${encodeURIComponent(category)}`} className="group block">
                <Card className="overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-1">
                  <CardContent className="p-0">
                    <Image
                      src={categoryInfo.image}
                      alt={category}
                      width={400}
                      height={300}
                      className="aspect-[4/3] w-full object-cover"
                      data-ai-hint={categoryInfo.hint}
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-foreground capitalize">
                        {category}
                      </h3>
                      <p className="mt-2 flex items-center text-sm font-medium text-primary">
                        View Products <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  );
}
