
import { TrustBadges } from "@/components/home/trust-badges";
import { TopPicks } from "@/components/home/top-picks";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { Hero } from "@/components/home/hero";

export default function Home() {
  return (
    <>
      <Hero />
      <TopPicks />
      <CategoryShowcase />
      <TrustBadges />
    </>
  );
}
