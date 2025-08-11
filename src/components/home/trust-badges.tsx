import { Award, ShieldCheck, Truck } from "lucide-react";

const badges = [
  {
    icon: <Award className="h-10 w-10 text-primary" />,
    title: "Quality Assured",
    description: "We source directly from trusted brands to ensure 100% authentic products.",
  },
  {
    icon: <Truck className="h-10 w-10 text-primary" />,
    title: "Reliable Delivery",
    description: "Our logistics network ensures timely and safe delivery of all your orders.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Secure Payments",
    description: "Shop with confidence using our secure and encrypted payment gateways.",
  },
];

export function TrustBadges() {
  return (
    <section className="border-y bg-background py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {badges.map((badge) => (
            <div key={badge.title} className="flex flex-col items-center text-center">
              <div className="mb-4">{badge.icon}</div>
              <h3 className="mb-2 text-xl font-semibold text-foreground">
                {badge.title}
              </h3>
              <p className="text-muted-foreground">{badge.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
