
import { Testimonials } from "@/components/home/testimonials";
import { TrustBadges } from "@/components/home/trust-badges";
import { TopPicks } from "@/components/home/top-picks";

export default function Home() {
  return (
    <>
      <TopPicks />
      <Testimonials />
      <TrustBadges />
    </>
  );
}
