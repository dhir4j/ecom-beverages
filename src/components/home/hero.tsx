import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="w-full">
      <div className="container mx-auto grid grid-cols-1 items-center gap-8 px-4 py-16 md:grid-cols-2 md:py-24 lg:px-8">
        <div className="flex flex-col items-start space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter text-foreground sm:text-5xl md:text-6xl">
            Your Premier Beverage Distributor
          </h1>
          <p className="max-w-[600px] text-lg text-muted-foreground">
            SK Traders offers a vast selection of beverages for retail and wholesale. Discover top brands, competitive pricing, and reliable service all in one place.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="text-lg">
              <Link href="/shop">Shop Now</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="text-lg">
              <Link href="/wholesale">Wholesale Inquiry</Link>
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <Image
            src="https://placehold.co/600x400.png"
            width={600}
            height={400}
            alt="Assortment of beverages"
            className="rounded-xl shadow-2xl"
            data-ai-hint="beverages drinks"
          />
        </div>
      </div>
    </section>
  );
}
