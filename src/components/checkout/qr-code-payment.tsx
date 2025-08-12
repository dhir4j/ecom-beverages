
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { QrCode, ClipboardCheck } from "lucide-react";

export function QrCodePayment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get('mode') === 'wholesale' ? 'wholesale' : 'retail';
  const { clearCart } = useCart(mode);
  const { toast } = useToast();
  const [utr, setUtr] = useState("");
  
  const isUtrValid = /^\d{12}$/.test(utr);

  const handleConfirm = () => {
    if (isUtrValid) {
      console.log("Order confirmed with UTR:", utr);
      toast({
        title: "Payment Submitted!",
        description: "Your payment is being verified. You will be redirected to the invoice page.",
      });
      clearCart();
      const invoicePath = mode === 'wholesale' ? "/invoice?mode=wholesale" : "/invoice";
      router.push(invoicePath);
    } else {
      toast({
        title: "Invalid UTR ID",
        description: "Please enter a valid 12-digit UTR ID.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Your Payment</CardTitle>
        <CardDescription>Scan the QR code with your UPI app and enter the transaction ID below.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6">
        <div className="flex justify-center p-4 bg-white rounded-lg border">
          <Image
            src="https://placehold.co/250x250.png"
            width={250}
            height={250}
            alt="UPI QR Code"
            data-ai-hint="QR code"
          />
        </div>
        <div className="w-full max-w-sm text-center">
            <p className="font-semibold">UPI ID: <span className="text-primary">sktraders@upi</span></p>
            <p className="text-sm text-muted-foreground">Payable to: SK Traders</p>
        </div>
        <div className="w-full max-w-sm space-y-2">
            <Label htmlFor="utr" className="flex items-center gap-2 font-semibold">
                <ClipboardCheck className="h-4 w-4" />
                Enter 12-Digit UTR ID
            </Label>
            <Input 
                id="utr" 
                placeholder="Enter Transaction ID"
                value={utr}
                onChange={(e) => setUtr(e.target.value.replace(/\D/g, '').slice(0, 12))}
                maxLength={12}
            />
        </div>
      </CardContent>
      <CardFooter>
        <Button size="lg" className="w-full" onClick={handleConfirm} disabled={!isUtrValid}>
          Confirm Payment & Generate Invoice
        </Button>
      </CardFooter>
    </Card>
  );
}
