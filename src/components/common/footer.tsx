import { Bot, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { getCategories } from "@/lib/products";

export async function Footer() {
  const categories = (await getCategories()).slice(0, 4);

  return (
    <footer className="bg-muted text-muted-foreground no-print">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4">
        <div className="flex flex-col space-y-4">
            <Link href="/" className="flex items-center space-x-2">
                <Bot className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold text-foreground">SK Traders</span>
            </Link>
            <p className="text-sm">
                Your one-stop destination for wholesale and retail beverages. Quality products, unbeatable prices.
            </p>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-foreground">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link href="/" className="hover:text-primary">Home</Link></li>
            <li><Link href="/shop" className="hover:text-primary">Shop</Link></li>
            <li><Link href="/wholesale" className="hover:text-primary">Wholesale Inquiry</Link></li>
            <li><Link href="/cart" className="hover:text-primary">My Cart</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="mb-4 text-lg font-semibold text-foreground">Categories</h3>
           <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <Link href={`/c/${encodeURIComponent(category)}`} className="hover:text-primary capitalize">
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-semibold text-foreground">Contact Us</h3>
          <ul className="space-y-3">
            <li className="flex items-start space-x-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
              <span>123 Beverage Lane, Market City, Mumbai, 400001</span>
            </li>
            <li className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-primary" />
              <a href="tel:+919876543210" className="hover:text-primary">+91 98765 43210</a>
            </li>
            <li className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-primary" />
              <a href="mailto:contact@sktraders.com" className="hover:text-primary">contact@sktraders.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t bg-background py-4">
        <div className="container mx-auto flex flex-col items-center justify-between px-4 sm:flex-row">
            <p className="text-sm">
                © {new Date().getFullYear()} SK Traders. All rights reserved.
            </p>
            <p className="text-sm">
                Designed with ♥ by a Firebase Dev
            </p>
        </div>
      </div>
    </footer>
  );
}
