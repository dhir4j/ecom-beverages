"use client";

import { useCart } from "@/context/cart-context";
import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart } from "lucide-react";

export default function CartPage() {
  const { cartItems, itemCount } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Your Cart</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Review your items and proceed to checkout.
        </p>
      </div>
      {itemCount > 0 ? (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Items</CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.map((item, index) => (
                  <div key={item.variantId}>
                    <CartItem item={item} />
                    {index < cartItems.length - 1 && <Separator />}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
          <div>
            <CartSummary />
          </div>
        </div>
      ) : (
        <div className="flex min-h-[400px] flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
            <ShoppingCart className="h-16 w-16 text-muted-foreground" />
            <h2 className="mt-6 text-2xl font-semibold">Your cart is empty</h2>
            <p className="mt-2 text-muted-foreground">
                Looks like you haven't added anything to your cart yet.
            </p>
            <Button asChild className="mt-6">
                <Link href="/shop">Start Shopping</Link>
            </Button>
        </div>
      )}
    </div>
  );
}
