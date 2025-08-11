"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import { products } from "@/lib/data";
import { useCart } from "@/context/cart-context";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

import { QuantitySelector } from "@/components/common/quantity-selector";
import { CheckCircle, ShoppingCart, Tag, Warehouse, MessageSquare } from "lucide-react";

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default function ProductPage({ params }: ProductPageProps) {
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === params.id);

  const [selectedVariantId, setSelectedVariantId] = useState(product?.variants[0].id || "");
  const [quantity, setQuantity] = useState(1);
  
  if (!product) {
    notFound();
  }

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      variantName: selectedVariant.name,
      image: product.images[0],
      price: selectedVariant.priceRetail, // Default to retail price for direct add
      quantity,
    });
  };

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <Carousel className="w-full">
            <CarouselContent>
              {product.images.map((img, index) => (
                <CarouselItem key={index}>
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-0">
                      <Image
                        src={img}
                        alt={`${product.name} image ${index + 1}`}
                        width={600}
                        height={600}
                        className="rounded-lg object-cover"
                        data-ai-hint="beverage product"
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold">{product.name}</h1>
          <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">{product.brand}</Badge>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Tag className="h-4 w-4" /> {product.category}
              </div>
          </div>
          <p className="text-lg text-muted-foreground">{product.description}</p>
          <Separator />
          <div>
            <Label className="text-base font-semibold">Select Size / Variant</Label>
            <RadioGroup
              value={selectedVariantId}
              onValueChange={setSelectedVariantId}
              className="mt-2 grid grid-cols-2 gap-4"
            >
              {product.variants.map((variant) => (
                <Label
                  key={variant.id}
                  htmlFor={variant.id}
                  className="flex cursor-pointer flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                >
                  <RadioGroupItem value={variant.id} id={variant.id} className="sr-only" />
                  <span className="font-semibold">{variant.name}</span>
                  <span className="text-sm text-muted-foreground">₹{variant.priceRetail.toFixed(2)}</span>
                </Label>
              ))}
            </RadioGroup>
          </div>
          <Separator />
          <div className="flex items-baseline gap-4">
            <div>
                <p className="text-3xl font-bold text-primary">₹{selectedVariant.priceRetail.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Retail Price (incl. GST)</p>
            </div>
             <div>
                <p className="text-2xl font-bold text-secondary">₹{selectedVariant.priceWholesale.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">Wholesale Price (excl. GST)</p>
            </div>
          </div>
          
           <div className="flex items-center gap-2">
            {selectedVariant.stock > 0 ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
                <CheckCircle className="h-5 w-5 text-red-500" />
            )}
            <span className={selectedVariant.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                {selectedVariant.stock > 0 ? `${selectedVariant.stock} in stock` : 'Out of Stock'}
            </span>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <QuantitySelector quantity={quantity} setQuantity={setQuantity} max={selectedVariant.stock} />
            <Button size="lg" onClick={handleAddToCart} disabled={selectedVariant.stock < quantity} className="flex-grow">
              <ShoppingCart className="mr-2 h-5 w-5" />
              {selectedVariant.stock < quantity ? "Out of Stock" : "Add to Cart"}
            </Button>
          </div>
          <Button size="lg" variant="outline" className="w-full">
            <MessageSquare className="mr-2 h-5 w-5" /> Enquire on WhatsApp
          </Button>

        </div>
      </div>
    </div>
  );
}
