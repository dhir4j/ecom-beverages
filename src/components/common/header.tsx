"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, ShoppingCart, Bot, Moon, Sun, Search } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/context/theme-provider";
import { Input } from "../ui/input";

const navLinks: { href: string; label: string }[] = [
];

function ThemeSwitcher() {
    const { theme, setTheme } = useTheme();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
        </Button>
    )
}

export function Header() {
  const { itemCount } = useCart();
  const isMobile = useIsMobile();
  const router = useRouter();
  const pathname = usePathname();

  const handleModeChange = (value: string) => {
    if (value === 'retail') {
      router.push('/');
    } else if (value === 'wholesale') {
      router.push('/wholesale');
    }
  };

  const currentMode = pathname.startsWith('/wholesale') ? 'wholesale' : 'retail';

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    router.push(`/shop?q=${encodeURIComponent(query)}`);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm transition-colors duration-300">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden items-center md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Bot className="h-6 w-6 text-primary" />
            <span className="font-bold">SK Traders</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {isMobile && (
           <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-glass-dark">
              <nav className="flex flex-col gap-4">
                <Link href="/" className="mb-4 flex items-center space-x-2">
                    <Bot className="h-6 w-6 text-primary" />
                    <span className="font-bold">SK Traders</span>
                </Link>
                {navLinks.map((link) => (
                    <Link
                    key={link.href}
                    href={link.href}
                    className="block px-2 py-1 text-lg"
                    >
                    {link.label}
                    </Link>
                ))}
                 <RadioGroup value={currentMode} onValueChange={handleModeChange} className="flex rounded-full bg-background p-1 border border-border">
                    <RadioGroupItem value="retail" id="r1" className="sr-only" />
                    <Label htmlFor="r1" className="flex-1 cursor-pointer rounded-full py-1.5 text-center text-sm data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground">Retail</Label>
                    <RadioGroupItem value="wholesale" id="r2" className="sr-only" />
                    <Label htmlFor="r2" className="flex-1 cursor-pointer rounded-full py-1.5 text-center text-sm data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground">Wholesale</Label>
                </RadioGroup>
              </nav>
            </SheetContent>
          </Sheet>
        )}
        
        <div className="flex flex-1 items-center justify-start gap-4">
             {!isMobile && (
                <RadioGroup value={currentMode} onValueChange={handleModeChange} className="flex rounded-full bg-muted p-1 border">
                    <RadioGroupItem value="retail" id="r1-desktop" className="sr-only" />
                    <Label htmlFor="r1-desktop" className="cursor-pointer rounded-full px-4 py-1.5 text-sm data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground transition-colors">Retail</Label>
                    <RadioGroupItem value="wholesale" id="r2-desktop" className="sr-only" />
                    <Label htmlFor="r2-desktop" className="cursor-pointer rounded-full px-4 py-1.5 text-sm data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground transition-colors">Wholesale</Label>
                </RadioGroup>
             )}
             <form onSubmit={handleSearch} className="relative w-full max-w-sm ml-auto">
                <Input
                  name="search"
                  className="pl-10"
                  placeholder="Search products..."
                />
                <Button variant="ghost" size="icon" className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
            </form>
        </div>
         
        <div className="flex items-center justify-end space-x-2">
            <ThemeSwitcher />
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute top-1 right-1 h-5 w-5 justify-center p-0">{itemCount}</Badge>
                )}
                <span className="sr-only">Shopping Cart</span>
              </Button>
            </Link>
        </div>
      </div>
    </header>
  );
}
