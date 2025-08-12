
"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { usePathname } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const pathname = usePathname();
  const isWholesale = pathname.startsWith('/wholesale');
  const productUrl = isWholesale ? `/p/${product.id}?mode=wholesale` : `/p/${product.id}`;

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg group">
       <Link href={productUrl} className="flex flex-col h-full">
        <CardHeader className="p-0">
            <div className="aspect-square relative w-full overflow-hidden">
                <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint="beverage product"
                />
            </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
            <CardTitle className="mb-2 text-lg h-12 overflow-hidden leading-tight group-hover:text-primary">{product.name}</CardTitle>
            <CardDescription>{product.size}</CardDescription>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex-col items-start">
             {isWholesale ? (
               <>
                <div className="flex items-baseline gap-2 mb-2">
                  <p className="text-xl font-bold text-primary">{product.discounted_price}</p>
                  {product.original_price && <p className="text-sm text-muted-foreground line-through">{product.original_price}</p>}
                </div>
                {product.discount_percentage && <Badge variant="destructive">{product.discount_percentage}</Badge>}
               </>
             ) : (
                <p className="text-xl font-bold text-primary">{product.original_price}</p>
             )}
        </CardFooter>
       </Link>
    </Card>
  );
}
