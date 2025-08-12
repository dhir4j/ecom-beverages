
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
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
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

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
  const searchParams = useSearchParams();

  const handleModeChange = (value: string) => {
    if (value === 'retail') {
      router.push('/');
    } else if (value === 'wholesale') {
      router.push('/wholesale');
    }
  };

  const isWholesalePath = pathname.startsWith('/wholesale');
  const isWholesaleQuery = searchParams.get('mode') === 'wholesale';
  const currentMode = isWholesalePath || isWholesaleQuery ? 'wholesale' : 'retail';

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get('search') as string;
    router.push(`/shop?q=${encodeURIComponent(query)}`);
  };

  const desktopHeader = (
    <div className="hidden md:grid grid-cols-3 items-center w-full">
        <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center space-x-2">
                <Bot className="h-6 w-6 text-primary" />
                <span className="font-bold">SK Traders</span>
            </Link>
            <RadioGroup value={currentMode} onValueChange={handleModeChange} className="grid grid-cols-2 gap-2 rounded-full border bg-muted p-1 w-52">
                <div>
                    <RadioGroupItem value="retail" id="r1-desktop" className="sr-only" />
                    <Label htmlFor="r1-desktop" className={cn("block w-full rounded-full py-1.5 text-center text-sm font-medium cursor-pointer transition-colors", currentMode === 'retail' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent')}>Retail</Label>
                </div>
                <div>
                    <RadioGroupItem value="wholesale" id="r2-desktop" className="sr-only" />
                    <Label htmlFor="r2-desktop" className={cn("block w-full rounded-full py-1.5 text-center text-sm font-medium cursor-pointer transition-colors", currentMode === 'wholesale' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent')}>Wholesale</Label>
                </div>
            </RadioGroup>
        </div>
        <div className="flex justify-center">
             <form onSubmit={handleSearch} className="relative w-full max-w-sm">
                <Input
                  name="search"
                  className="pl-10"
                  placeholder="Search products..."
                />
                <Button variant="ghost" size="icon" className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground" type="submit">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
            </form>
        </div>
        <div className="flex items-center justify-end space-x-2">
            <Button asChild variant="outline" size="sm">
                <Link href="/shop">All Items</Link>
             </Button>
            <ThemeSwitcher />
            <div className="relative">
              <Link href="/cart">
                <Button variant="ghost" size="icon">
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Shopping Cart</span>
                </Button>
                 {itemCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">{itemCount}</Badge>
                  )}
              </Link>
            </div>
        </div>
    </div>
  );

  const mobileHeader = (
    <>
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
             <Link
                href="/shop"
                className={cn("block px-2 py-1 text-lg", pathname.startsWith("/shop") ? "text-primary" : "")}
                >
                All Items
             </Link>
                <RadioGroup value={currentMode} onValueChange={handleModeChange} className="grid grid-cols-2 gap-2 rounded-full border bg-muted p-1">
                <div>
                    <RadioGroupItem value="retail" id="r1-mobile" className="sr-only" />
                    <Label htmlFor="r1-mobile" className={cn("block w-full rounded-full py-1.5 text-center text-sm font-medium cursor-pointer", currentMode === 'retail' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent')}>Retail</Label>
                </div>
                <div>
                    <RadioGroupItem value="wholesale" id="r2-mobile" className="sr-only" />
                    <Label htmlFor="r2-mobile" className={cn("block w-full rounded-full py-1.5 text-center text-sm font-medium cursor-pointer", currentMode === 'wholesale' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent')}>Wholesale</Label>
                </div>
            </RadioGroup>
            </nav>
        </SheetContent>
        </Sheet>
        <div className="flex-1">
             <form onSubmit={handleSearch} className="relative w-full max-w-sm mx-auto">
                <Input
                    name="search"
                    className="pl-10"
                    placeholder="Search products..."
                />
                <Button variant="ghost" size="icon" className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground" type="submit">
                    <Search className="h-4 w-4" />
                    <span className="sr-only">Search</span>
                </Button>
            </form>
        </div>
        <div className="flex items-center justify-end space-x-2">
            <ThemeSwitcher />
            <div className="relative">
                <Link href="/cart">
                    <Button variant="ghost" size="icon">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="sr-only">Shopping Cart</span>
                    </Button>
                    {itemCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 justify-center p-0">{itemCount}</Badge>
                    )}
                </Link>
            </div>
        </div>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-secondary/20 backdrop-blur-md transition-colors duration-300">
      <div className="container flex h-24 items-center">
        {isMobile ? mobileHeader : desktopHeader}
      </div>
    </header>
  );
}
