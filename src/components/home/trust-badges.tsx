
import { Award, ShieldCheck, Truck } from "lucide-react";

const badges = [
  {
    icon: <Award className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
    title: "Quality Assured",
    description: "We source directly from trusted brands to ensure 100% authentic products.",
  },
  {
    icon: <Truck className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
    title: "Reliable Delivery",
    description: "Our logistics network ensures timely and safe delivery of all your orders.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 md:h-10 md:w-10 text-primary" />,
    title: "Secure Payments",
    description: "Shop with confidence using our secure and encrypted payment gateways.",
  },
];

export function TrustBadges() {
  return (
    <section className="border-y bg-background py-12 sm:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
          {badges.map((badge) => (
            <div key={badge.title} className="flex items-center gap-4 text-left md:flex-col md:text-center">
              <div className="shrink-0">{badge.icon}</div>
              <div>
                <h3 className="mb-1 text-lg font-semibold text-foreground md:mb-2">
                  {badge.title}
                </h3>
                <p className="text-sm text-muted-foreground md:text-base">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
