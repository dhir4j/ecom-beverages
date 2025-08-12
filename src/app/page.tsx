
import { TrustBadges } from "@/components/home/trust-badges";
import { TopPicks } from "@/components/home/top-picks";
import { CategoryShowcase } from "@/components/home/category-showcase";

export default function Home() {
  return (
    <>
      <CategoryShowcase />
      <TopPicks />
      <TrustBadges />
    </>
  );
}
