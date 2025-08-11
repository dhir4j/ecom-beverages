import { CategoryHighlights } from "@/components/home/category-highlights";
import { FeaturedProducts } from "@/components/home/featured-products";
import { Hero } from "@/components/home/hero";
import { Testimonials } from "@/components/home/testimonials";
import { TrustBadges } from "@/components/home/trust-badges";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBadges />
      <CategoryHighlights />
      <FeaturedProducts />
      <Testimonials />
    </>
  );
}
