
import { Building, Target, Users, Heart } from 'lucide-react';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="relative h-[40vh] min-h-[300px]">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Beverages assortment"
          fill
          className="object-cover"
          data-ai-hint="beverages assortment"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-black/50" />
        <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="text-4xl font-bold md:text-6xl">About SK Traders</h1>
          <p className="mt-4 max-w-2xl text-lg md:text-xl">
            Your trusted partner for premium beverages, serving both retail customers and wholesale clients with excellence.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 sm:py-24">
        <section className="grid grid-cols-1 gap-12 md:grid-cols-2">
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl font-bold text-primary">Our Story</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Founded with a passion for bringing the best beverages to our community, SK Traders started as a small local shop. With a commitment to quality, variety, and unbeatable prices, we have grown into a leading hub for both retail and wholesale customers across Hyderabad and beyond.
            </p>
            <p className="mt-4 text-muted-foreground">
              Our journey is fueled by a simple mission: to be the most reliable and customer-centric beverage supplier. We believe in building lasting relationships, understanding the needs of our clients, and delivering not just products, but satisfaction.
            </p>
          </div>
          <div className="relative h-80 w-full overflow-hidden rounded-lg shadow-lg">
            <Image
              src="https://placehold.co/600x400.png"
              alt="SK Traders storefront"
              fill
              className="object-cover transition-transform duration-500 hover:scale-105"
              data-ai-hint="storefront"
            />
          </div>
        </section>

        <section className="py-24">
          <div className="grid grid-cols-1 gap-8 text-center md:grid-cols-3">
            <div className="flex flex-col items-center">
              <Target className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">Our Mission</h3>
              <p className="mt-2 text-muted-foreground">
                To provide a comprehensive range of high-quality beverages at competitive prices, ensuring timely delivery and exceptional service for every customer.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">Our Vision</h3>
              <p className="mt-2 text-muted-foreground">
                To be the number one beverage distributor in the region, recognized for our reliability, extensive product portfolio, and commitment to customer success.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <Heart className="h-12 w-12 text-primary" />
              <h3 className="mt-4 text-2xl font-bold">Our Values</h3>
              <p className="mt-2 text-muted-foreground">
                Integrity, Customer-Focus, Quality, and Efficiency are the pillars that guide our every action and decision at SK Traders.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
