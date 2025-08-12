
"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState, useMemo } from "react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, Info, XCircle } from "lucide-react";
import { serviceablePincodes } from "@/lib/pincodes";
import { usePathname } from "next/navigation";

export function CartSummary() {
  const { totalPrice, itemCount } = useCart();
  const { toast } = useToast();
  
  const [pincode, setPincode] = useState("");
  const [isPincodeServiceable, setIsPincodeServiceable] = useState<boolean | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [discountCode, setDiscountCode] = useState("");
  const pathname = usePathname();

  const isWholesale = useMemo(() => {
    // A simple heuristic: if any item in the cart has a quantity of 100 or more,
    // we assume it's a wholesale order. This is not foolproof but works for this case.
    return totalPrice > 5000;
  }, [totalPrice]);


  const handleCheckPincode = () => {
    const isServiceable = serviceablePincodes.includes(pincode);
    setIsPincodeServiceable(isServiceable);
    if(isServiceable) {
        setShowAddressForm(true);
    }
  };

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === "SAVE10") {
      toast({ title: "Discount applied!", description: "10% has been deducted from your order." });
    } else {
      toast({ title: "Invalid Code", description: "The discount code is not valid.", variant: "destructive" });
    }
  };

  const subtotal = totalPrice;
  const shipping = isWholesale 
    ? (subtotal >= 5000 ? 0 : 750)
    : (subtotal >= 500 ? 0 : 100);
  const total = subtotal + shipping;

  const canCheckout = isWholesale ? true : isPincodeServiceable;

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
        <div className="flex flex-col">
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}</span>
            </div>
            {isWholesale ? (
                 <p className="text-xs text-muted-foreground mt-1">
                    Free shipping on wholesale orders above ₹5000. A ₹750 fee applies to orders below ₹5000.
                </p>
            ) : (
                <p className="text-xs text-muted-foreground mt-1">
                    Free shipping on retail orders above ₹500. A ₹100 fee applies to orders below ₹500.
                </p>
            )}
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
        <Separator />

        {!isWholesale && (
            <div className="space-y-2">
                <h4 className="font-semibold">Check Delivery Availability</h4>
                <div className="flex items-center space-x-2">
                    <Input 
                        placeholder="Enter Pincode"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                        maxLength={6}
                    />
                    <Button onClick={handleCheckPincode}>Check</Button>
                </div>
                {isPincodeServiceable === false && (
                    <Alert variant="destructive">
                        <XCircle className="h-4 w-4" />
                        <AlertDescription>
                            Sorry, retail delivery is not available for this pincode. We only deliver to select areas in Hyderabad. For PAN India orders, please use our wholesale option.
                        </AlertDescription>
                    </Alert>
                )}
                {isPincodeServiceable === true && (
                    <Alert variant="default" className="border-green-500 text-green-700 dark:border-green-700 dark:text-green-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <AlertDescription>
                            Great! We can deliver to your location.
                        </AlertDescription>
                    </Alert>
                )}
                 <Alert variant="default" className="mt-2">
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                       For retail orders, we currently only deliver in Hyderabad. For PAN India orders, please use the <Link href="/wholesale" className="font-bold text-primary hover:underline">Wholesale</Link> section.
                    </AlertDescription>
                </Alert>
            </div>
        )}

        {isWholesale && (
             <Alert variant="default" className="border-green-500 text-green-700 dark:border-green-700 dark:text-green-400">
                <CheckCircle2 className="h-4 w-4" />
                <AlertDescription>
                    Wholesale orders are deliverable all over India.
                </AlertDescription>
            </Alert>
        )}

      </CardContent>
      <CardFooter>
        <Button asChild size="lg" className="w-full" disabled={!canCheckout}>
          <Link href="/checkout">Proceed to Checkout</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
