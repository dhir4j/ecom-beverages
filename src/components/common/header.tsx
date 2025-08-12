
"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, ShoppingCart, Bot, Moon, Sun, Search, Briefcase, LayoutGrid } from "lucide-react";
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
  const [showSearch, setShowSearch] = useState(false);
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
    if(isMobile) setShowSearch(false);
  };
  
  const handleSearchIconClick = () => {
    if (isMobile) {
      setShowSearch(!showSearch);
    }
  }

  const CartIcon = currentMode === 'wholesale' ? Briefcase : ShoppingCart;
  const cartLink = currentMode === 'wholesale' ? '/cart?mode=wholesale' : '/cart';

  const desktopHeader = (
    <div className="hidden md:grid grid-cols-12 items-center w-full gap-x-4">
        <div className="col-span-5 flex items-center gap-4">
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
        <div className="col-span-4 flex justify-center">
             <form onSubmit={handleSearchSubmit} className="relative w-full max-w-sm">
                <Input
                  name="search"
                  className="pl-10"
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
        <div className="col-span-3 flex items-center justify-end space-x-2">
            <Button asChild variant="outline" size="sm">
                <Link href={currentMode === 'wholesale' ? '/wholesale' : '/shop'}>All Items</Link>
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
    <>
        <Sheet>
        <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
            <LayoutGrid className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
            </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px] sm:w-[400px] bg-glass-dark">
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <nav className="flex flex-col gap-4">
            <Link href="/" className="mb-4 flex items-center space-x-2">
                <Image
                    src="/images/logo.png"
                    alt="SK Traders Logo"
                    width={58}
                    height={58}
                    className="h-[3.6rem] w-auto"
                />
                <span className="font-logo text-2xl font-bold">SK Traders</span>
            </Link>
             <Link
                href={currentMode === 'wholesale' ? '/wholesale' : '/shop'}
                className={cn("block px-2 py-1 text-lg", pathname.startsWith("/shop") || pathname.startsWith("/wholesale") ? "text-primary" : "")}
                >
                All Items
             </Link>
            </nav>
        </SheetContent>
        </Sheet>
        <div className="flex-1 flex items-center justify-center">
            <Link href="/" className="flex items-center space-x-2">
                <Image
                    src="/images/logo.png"
                    alt="SK Traders Logo"
                    width={50}
                    height={50}
                    className="h-12 w-auto"
                />
                <span className="font-logo text-2xl font-bold">SK Traders</span>
            </Link>
        </div>
        <div className="flex items-center justify-end space-x-1">
            <Button variant="ghost" size="icon" onClick={handleSearchIconClick}>
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
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
         {showSearch && (
            <div className="absolute top-full left-0 w-full bg-background p-4 border-b">
                <form onSubmit={handleSearchSubmit} className="relative w-full max-w-sm mx-auto">
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
                    <Button variant="ghost" size="icon" className="absolute left-1 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground" type="submit">
                        <Search className="h-4 w-4" />
                        <span className="sr-only">Search</span>
                    </Button>
                </form>
            </div>
        )}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary/20 backdrop-blur-md transition-colors duration-300">
      <div className="container flex h-24 items-center">
        {isMobile ? mobileHeader : desktopHeader}
      </div>
      {isMobile && (
        <div className="md:hidden bg-background/80 backdrop-blur-md border-b">
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
