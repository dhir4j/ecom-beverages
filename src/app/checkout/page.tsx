

"use client";

import { useCart } from "@/context/cart-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { QrCodePayment } from "@/components/checkout/qr-code-payment";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function CheckoutPageContent() {
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') === 'wholesale' ? 'wholesale' : 'retail';
  const { cartItems, totalPrice } = useCart(mode);
  
  const isWholesale = mode === 'wholesale';
  const shipping = isWholesale 
    ? (totalPrice >= 5000 ? 0 : 750)
    : (totalPrice >= 500 ? 0 : 100);
  const total = totalPrice + shipping;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold tracking-tight">Checkout</h1>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <QrCodePayment />
        </div>
        <div className="lg:col-span-2">
          <Card className="sticky top-20">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.variantId} className="flex items-center gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="rounded-md object-cover"
                        data-ai-hint="beverage product"
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-muted-foreground">{item.variantName}</p>
                      <p className="text-sm">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <Separator className="my-4" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
                </div>
                <Separator/>
                 <div className="flex justify-between text-xl font-bold">
                  <span>Total Payable</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}


export default function CheckoutPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutPageContent />
        </Suspense>
    )
}
