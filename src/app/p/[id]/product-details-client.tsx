
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ProductCard } from '@/components/product/product-card';
import type { Product } from '@/types/product';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';

interface ProductDetailsClientProps {
  product: Product;
  similarProducts: Product[];
  isWholesale: boolean;
}

const Description = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const words = text.split(' ');
  const isLongText = words.length > 75;
  const displayText = isLongText && !isExpanded ? words.slice(0, 75).join(' ') + '...' : text;

  return (
    <div className="prose prose-blue max-w-none text-muted-foreground">
      {displayText.split('\n').map((para, i) => <p key={i}>{para}</p>)}
      {isLongText && (
        <Button variant="link" onClick={() => setIsExpanded(!isExpanded)} className="px-0">
          {isExpanded ? 'Read Less' : 'Read More'}
        </Button>
      )}
    </div>
  );
};

export function ProductDetailsClient({ product, similarProducts, isWholesale }: ProductDetailsClientProps) {
    const mode = isWholesale ? 'wholesale' : 'retail';
    const { addToCart } = useCart(mode);
    const router = useRouter();
    
    const discountedPrice = parseFloat(product.discounted_price.replace('₹', ''));
    const originalPrice = parseFloat(product.original_price.replace('₹', ''));

    const handleAddToCart = () => {
        addToCart({
            productId: product.id,
            variantId: product.id,
            name: product.name,
            variantName: product.size || 'Standard',
            image: product.image_url,
            price: isWholesale ? discountedPrice : originalPrice,
            quantity: isWholesale ? 100 : 1,
        });
    };

    const handleBuyNow = () => {
        handleAddToCart();
        const cartUrl = isWholesale ? '/cart?mode=wholesale' : '/cart';
        router.push(cartUrl);
    };

    const generalInfo = product.product_information['GENERAL INFORMATION'];

    const priceFor100 = discountedPrice * 100;
    const savings = (originalPrice * 100) - priceFor100;

  return (
    <>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <Card>
            <CardContent className="p-4">
              <Image
                src={product.image_url}
                alt={product.name}
                width={600}
                height={600}
                className="w-full rounded-lg object-contain"
                data-ai-hint="beverage product"
              />
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
            <div className="p-6 rounded-lg bg-card border">
                 <h1 className="text-3xl font-bold">{product.name}</h1>
                 {product.size && <p className="text-lg text-muted-foreground mt-1">{product.size}</p>}
                 <Separator className="my-4" />
                <div className="flex items-baseline gap-4">
                  {isWholesale ? (
                    <>
                      <p className="text-4xl font-bold text-primary">{product.discounted_price}</p>
                      {product.original_price && (
                          <p className="text-xl text-muted-foreground line-through">{product.original_price}</p>
                      )}
                    </>
                  ) : (
                    <p className="text-4xl font-bold text-primary">{product.original_price}</p>
                  )}
                </div>
                {isWholesale && product.discount_percentage && (
                    <Badge variant="destructive" className="mt-2 text-base">{product.discount_percentage}</Badge>
                )}
                {isWholesale && (
                  <div className="mt-4 space-y-2 text-sm">
                      <div className="flex justify-between">
                          <span className="text-muted-foreground">Price for 100 units:</span>
                          <span className="font-semibold">₹{priceFor100.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-green-600">
                          <span className="text-muted-foreground">Your Savings:</span>
                          <span className="font-semibold">₹{savings.toFixed(2)}</span>
                      </div>
                  </div>
                )}
            </div>

            {isWholesale && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle>Wholesale Notice</AlertTitle>
                <AlertDescription>
                  Minimum order quantity is 100 units.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex gap-4">
                <Button size="lg" className="flex-1" onClick={handleBuyNow}>Buy Now</Button>
                <Button size="lg" variant="secondary" className="flex-1" onClick={handleAddToCart}>Add to Cart</Button>
            </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <Description text={product.description} />
          </div>
        </div>
      </div>
       <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Product Information</h2>
            <Card>
                <CardContent className="p-6">
                    <div className="space-y-6">
                        {generalInfo && (
                             <div>
                                <h3 className="text-xl font-semibold mb-3 capitalize">General Information</h3>
                                <Table>
                                    <TableBody>
                                        {Object.entries(generalInfo).map(([key, value]) => (
                                            <TableRow key={key}>
                                                <TableCell className="font-medium w-1/3">{key}</TableCell>
                                                <TableCell>{value}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
       </div>
       <div className="mt-16">
            <h2 className="text-2xl font-bold mb-4 text-center">You Might Also Like</h2>
            <div className="md:hidden">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {similarProducts.map((p) => (
                            <CarouselItem key={p.id} className="basis-2/3 sm:basis-1/2">
                                <div className="p-1">
                                    <ProductCard product={p} isWholesale={isWholesale} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="ml-12" />
                    <CarouselNext className="mr-12" />
                </Carousel>
            </div>
            <div className="hidden md:block">
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {similarProducts.map((p) => (
                            <CarouselItem key={p.id} className="md:basis-1/2 lg:basis-1/4">
                                <div className="p-1">
                                    <ProductCard product={p} isWholesale={isWholesale} />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="ml-12" />
                    <CarouselNext className="mr-12" />
                </Carousel>
            </div>
       </div>
    </>
  );
}
