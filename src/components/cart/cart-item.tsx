

"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
import type { CartItem as CartItemType } from "@/types";
import { Button } from "@/components/ui/button";
import { QuantitySelector } from "../common/quantity-selector";
import { X } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CartItemContent({ item }: { item: CartItemType }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const isWholesalePath = pathname.startsWith('/wholesale') || pathname.startsWith('/cart');
  const isWholesaleQuery = searchParams.get('mode') === 'wholesale';
  const isWholesale = isWholesalePath && isWholesaleQuery;
  
  const mode = isWholesale ? 'wholesale' : 'retail';
  const { updateQuantity, removeFromCart } = useCart(mode);
  
  const productUrl = isWholesale ? `/p/${item.productId}?mode=wholesale` : `/p/${item.productId}`;

  return (
    <div className="flex items-center gap-4 py-4">
      <div className="relative h-24 w-24 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="rounded-md object-cover"
          data-ai-hint="beverage product"
        />
      </div>
      <div className="flex-grow">
        <Link href={productUrl}>
          <h3 className="font-semibold hover:text-primary">{item.name}</h3>
        </Link>
        <p className="text-sm text-muted-foreground">{item.variantName}</p>
        <p className="mt-1 text-sm font-medium">₹{item.price.toFixed(2)}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        <QuantitySelector
          quantity={item.quantity}
          setQuantity={(q) => updateQuantity(item.variantId, q)}
          min={isWholesale ? 100 : 1}
        />
        <p className="text-lg font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
      </div>
      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeFromCart(item.variantId)}>
        <X className="h-5 w-5" />
        <span className="sr-only">Remove item</span>
      </Button>
    </div>
  );
}

export function CartItem({ item }: { item: CartItemType }) {
    return (
        <Suspense fallback={<div>Loading item...</div>}>
            <CartItemContent item={item} />
        </Suspense>
    )
}
