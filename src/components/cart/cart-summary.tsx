"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export function CartSummary() {
  const { totalPrice, itemCount } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const { toast } = useToast();

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === "SAVE10") {
      toast({ title: "Discount applied!", description: "10% has been deducted from your order." });
      // Note: Actual discount logic is not implemented as this is a UI component
    } else {
      toast({ title: "Invalid Code", description: "The discount code is not valid.", variant: "destructive" });
    }
  };

  const subtotal = totalPrice;
  const shipping = subtotal > 500 ? 0 : 50;
  const total = subtotal + shipping;

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between">
          <span>Subtotal ({itemCount} items)</span>
          <span>₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
        </div>
        <Separator />
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>₹{total.toFixed(2)}</span>
        </div>
        <div className="flex space-x-2 pt-2">
            <Input 
              placeholder="Discount code" 
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <Button onClick={handleApplyDiscount}>Apply</Button>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="w-full" disabled={itemCount === 0}>
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
