
import { Mail, MapPin, Phone, FileText, Shield, Truck, Package, HelpCircle, Info } from "lucide-react";
import Link from "next/link";
import { getCategories } from "@/lib/products";
import Image from "next/image";

export async function Footer() {
  const categories = (await getCategories()).slice(0, 4);

  return (
    <footer className="bg-muted text-muted-foreground no-print">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col space-y-4 md:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center space-x-2">
                <Image
                    src="/images/logo.png"
                    alt="SK Traders Logo"
                    width={70}
                    height={70}
                    className="h-[4.4rem] w-auto"
                />
                <span className="font-logo text-3xl font-bold">SK Traders</span>
            </Link>
            <p className="text-sm">
                Your one-stop destination for wholesale and retail beverages. Quality products, unbeatable prices.
            </p>
             <div className="space-y-2 pt-2">
                <p className="text-sm font-semibold text-foreground">FSSAI Licensed</p>
                <Image
                    src="/images/fssai.jpg"
                    alt="FSSAI Licensed"
                    width={120}
                    height={60}
                    className="rounded-md"
                />
                <p className="text-xs">Lic. No. 12345678901234</p>
             </div>
             <p className="text-xs pt-2"><span className="font-semibold">GSTIN:</span> 36CLPPN3613N1ZJ</p>
        </div>

        <div className="grid grid-cols-2 gap-8 md:col-span-2 lg:col-span-3 lg:grid-cols-3">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-foreground">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:text-primary flex items-center gap-2"><Info className="h-4 w-4"/>About Us</Link></li>
                <li><Link href="/legal/privacy-policy" className="hover:text-primary flex items-center gap-2"><Shield className="h-4 w-4"/>Privacy Policy</Link></li>
                <li><Link href="/legal/terms-of-service" className="hover:text-primary flex items-center gap-2"><FileText className="h-4 w-4"/>Terms of Service</Link></li>
                <li><Link href="/legal/shipping-delivery" className="hover:text-primary flex items-center gap-2"><Truck className="h-4 w-4"/>Shipping & Delivery</Link></li>
                <li><Link href="/legal/refund-cancellation" className="hover:text-primary flex items-center gap-2"><Package className="h-4 w-4"/>Refund & Cancellation</Link></li>
                 <li><Link href="/customer-care" className="hover:text-primary flex items-center gap-2"><HelpCircle className="h-4 w-4"/>Customer Care</Link></li>
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
                 <li><Link href="/shop" className="hover:text-primary">View All</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-lg font-semibold text-foreground">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <MapPin className="mt-1 h-5 w-5 shrink-0 text-primary" />
                  <span>H.no.2-43 Sai nagar colony chaithanyapuri dilsukhnagar Hyderabad.500060</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-primary" />
                  <a href="tel:+919100513018" className="hover:text-primary">9100513018</a>
                </li>
                <li className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href="mailto:sktraders351@gmail.com" className="hover:text-primary">sktraders351@gmail.com</a>
                </li>
              </ul>
            </div>
        </div>
      </div>
      <div className="border-t bg-background py-4">
        <div className="container mx-auto flex flex-col items-center justify-between gap-2 px-4 sm:flex-row">
            <p className="text-sm">
                © {new Date().getFullYear()} SK Traders. All rights reserved.
            </p>
            <p className="text-sm">
                Designed with ♥ by <a href="https://t.me/INTRXEL" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">JacK</a>
            </p>
        </div>
      </div>
    </footer>
  );
}
