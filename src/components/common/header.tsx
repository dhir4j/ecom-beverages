
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetHeader,
  SheetClose
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, ShoppingCart, Bot, Moon, Sun, Search, Briefcase, LayoutGrid, Home, Info, Phone } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useIsMobile } from "@/hooks/use-mobile";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useTheme } from "@/context/theme-provider";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useEffect, useState, Suspense, useCallback } from "react";
import Image from "next/image";
import { Separator } from "../ui/separator";

function useDebounce(value: string, delay: number) {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}


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

function HeaderContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentMode, setCurrentMode] = useState<'retail' | 'wholesale'>('retail');
  const [searchValue, setSearchValue] = useState(searchParams.get('q') || '');
  const debouncedSearchValue = useDebounce(searchValue, 300);


  useEffect(() => {
    const isWholesalePath = pathname.startsWith('/wholesale');
    const isWholesaleQuery = searchParams.get('mode') === 'wholesale';
    setCurrentMode(isWholesalePath || isWholesaleQuery ? 'wholesale' : 'retail');
  }, [pathname, searchParams]);

  const { itemCount } = useCart(currentMode);
  const isMobile = useIsMobile();


  const handleModeChange = (value: string) => {
    if (value === 'retail') {
      router.push('/');
    } else if (value === 'wholesale') {
      router.push('/wholesale');
    }
  };
  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
 
      return params.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    const searchPath = currentMode === 'wholesale' ? '/wholesale' : '/shop';
    if(pathname === searchPath) {
        router.push(searchPath + '?' + createQueryString('q', debouncedSearchValue));
    }
  }, [debouncedSearchValue, currentMode, pathname, router, createQueryString]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchPath = currentMode === 'wholesale' ? '/wholesale' : '/shop';
    router.push(searchPath + '?' + createQueryString('q', searchValue));
  };
  
  const CartIcon = currentMode === 'wholesale' ? Briefcase : ShoppingCart;
  const cartLink = currentMode === 'wholesale' ? '/cart?mode=wholesale' : '/cart';
  const allItemsLink = currentMode === 'wholesale' ? '/wholesale' : '/shop';

  const desktopNav = (
    <div className="flex items-center w-full">
        <div className="flex items-center gap-4 flex-1">
            <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
                <Image
                    src="/images/logo.png"
                    alt="SK Traders Logo"
                    width={70}
                    height={70}
                    className="h-[4.4rem] w-auto"
                />
                <span className="font-logo text-3xl font-bold whitespace-nowrap">SK Traders</span>
            </Link>
            <RadioGroup value={currentMode} onValueChange={handleModeChange} className="hidden xl:grid grid-cols-2 gap-2 rounded-full border bg-muted p-1 w-52">
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
        <div className="hidden lg:flex justify-center flex-1">
             <form onSubmit={handleSearchSubmit} className="relative w-full max-w-sm">
                <Input
                  name="search"
                  className="pl-10 rounded-full"
                  placeholder="Search products..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onClick={() => {
                    const searchPath = currentMode === 'wholesale' ? '/wholesale' : '/shop';
                    if (pathname !== searchPath) {
                      router.push(searchPath);
                    }
                  }}
                />
                <Button variant="ghost" size="icon" className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground" type="submit">
                  <Search className="h-4 w-4" />
                  <span className="sr-only">Search</span>
                </Button>
            </form>
        </div>
        <div className="flex items-center justify-end space-x-2 flex-1">
            <Button asChild variant="outline" size="sm">
                <Link href={allItemsLink}>All Items</Link>
             </Button>
            <ThemeSwitcher />
            <div className="relative">
              <Link href={cartLink}>
                <Button variant="ghost" size="icon">
                  <CartIcon className="h-5 w-5" />
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
    <div className="flex w-full items-center justify-between">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-full max-w-sm bg-background">
          <SheetHeader className="mb-6 border-b pb-4">
            <SheetTitle className="text-left">Menu</SheetTitle>
          </SheetHeader>
          <div className="flex h-full flex-col">
            <form onSubmit={handleSearchSubmit} className="relative mb-6">
              <Input
                name="search"
                className="pl-10"
                placeholder="Search products..."
                autoFocus
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onClick={() => {
                  const searchPath = currentMode === 'wholesale' ? '/wholesale' : '/shop';
                  if (pathname !== searchPath) {
                    router.push(searchPath);
                  }
                }}
              />
              <Button variant="ghost" size="icon" className="absolute left-1 top-1/2 h-8 w-8 -translate-y-1/2 text-muted-foreground" type="submit">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </form>
            <nav className="flex flex-col gap-4 text-lg">
              <SheetClose asChild>
                  <Link href="/" className="flex items-center gap-3 rounded-md p-2 hover:bg-muted"><Home className="h-5 w-5" />Home</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href={allItemsLink} className="flex items-center gap-3 rounded-md p-2 hover:bg-muted"><LayoutGrid className="h-5 w-5" />All Items</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/about" className="flex items-center gap-3 rounded-md p-2 hover:bg-muted"><Info className="h-5 w-5" />About Us</Link>
              </SheetClose>
              <SheetClose asChild>
                <Link href="/customer-care" className="flex items-center gap-3 rounded-md p-2 hover:bg-muted"><Phone className="h-5 w-5" />Customer Care</Link>
              </SheetClose>
            </nav>
            <div className="mt-auto border-t pt-4">
            </div>
          </div>
        </SheetContent>
      </Sheet>

      <Link href="/" className="flex items-center space-x-1">
        <Image src="/images/logo.png" alt="SK Traders Logo" width={50} height={50} className="h-12 w-auto" />
        <span className="font-logo text-2xl font-bold whitespace-nowrap">SK Traders</span>
      </Link>

      <div className="flex items-center justify-end">
        <ThemeSwitcher />
        <div className="relative">
          <Link href={cartLink}>
            <Button variant="ghost" size="icon">
              <CartIcon className="h-5 w-5" />
              <span className="sr-only">Shopping Cart</span>
            </Button>
            {itemCount > 0 && (
              <Badge className="absolute -right-1 -top-1 h-5 w-5 justify-center p-0">{itemCount}</Badge>
            )}
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md transition-colors duration-300">
      <div className="container flex h-20 items-center">
        {isMobile ? mobileHeader : desktopNav}
      </div>
       {isMobile && (
          <div className="xl:hidden bg-background/80 backdrop-blur-md border-b">
            <div className="container p-2">
              <RadioGroup value={currentMode} onValueChange={handleModeChange} className="grid grid-cols-2 gap-2 rounded-full border bg-muted p-1">
                <div>
                    <RadioGroupItem value="retail" id="r1-mobile-bar" className="sr-only" />
                    <Label htmlFor="r1-mobile-bar" className={cn("block w-full rounded-full py-1.5 text-center text-sm font-medium cursor-pointer transition-colors", currentMode === 'retail' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent')}>Retail</Label>
                </div>
                <div>
                    <RadioGroupItem value="wholesale" id="r2-mobile-bar" className="sr-only" />
                    <Label htmlFor="r2-mobile-bar" className={cn("block w-full rounded-full py-1.5 text-center text-sm font-medium cursor-pointer transition-colors", currentMode === 'wholesale' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent')}>Wholesale</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
       )}
    </header>
  );
}

export function Header() {
    return (
        <Suspense fallback={<div className="h-24" />}>
            <HeaderContent />
        </Suspense>
    )
}

    
