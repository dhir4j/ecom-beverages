"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/context/cart-context";
import type { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tag, ShoppingCart } from "lucide-react";
import { QuantitySelector } from "../common/quantity-selector";

interface ProductCardProps {
  product: Product;
  isWholesale: boolean;
}

export function ProductCard({ product, isWholesale }: ProductCardProps) {
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0].id);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];
  const price = isWholesale ? selectedVariant.priceWholesale : selectedVariant.priceRetail;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      variantId: selectedVariant.id,
      name: product.name,
      variantName: selectedVariant.name,
      image: product.images[0],
      price: price,
      quantity: quantity,
    });
  };

  return (
    <Card className="flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/product/${product.id}`} className="block overflow-hidden">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={400}
            className="aspect-square w-full object-cover transition-transform duration-300 hover:scale-105"
            data-ai-hint="beverage product"
          />
        </Link>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <CardTitle className="mb-1 text-lg">
          <Link href={`/product/${product.id}`} className="hover:text-primary">
            {product.name}
          </Link>
        </CardTitle>
        <CardDescription className="flex items-center gap-2 text-sm">
          <Tag className="h-4 w-4" /> {product.category}
        </CardDescription>
        
        <div className="mt-4">
          <Select value={selectedVariantId} onValueChange={setSelectedVariantId}>
            <SelectTrigger>
              <SelectValue placeholder="Select size/variant" />
            </SelectTrigger>
            <SelectContent>
              {product.variants.map((variant) => (
                <SelectItem key={variant.id} value={variant.id}>
                  {variant.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mt-4">
            <p className="text-2xl font-bold text-primary">₹{price.toFixed(2)}</p>
            <p className="text-xs text-muted-foreground">{isWholesale ? "Wholesale Price" : "Retail Price"}</p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4 p-4 pt-0">
        <div className="flex w-full items-center justify-between">
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} max={selectedVariant.stock} />
          <Button onClick={handleAddToCart} disabled={selectedVariant.stock < quantity}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            {selectedVariant.stock < quantity ? "Out of Stock" : "Add"}
          </Button>
        </div>
        {selectedVariant.stock < 10 && selectedVariant.stock > 0 && (
          <p className="text-sm text-destructive">Only {selectedVariant.stock} left in stock!</p>
        )}
      </CardFooter>
    </Card>
  );
}
