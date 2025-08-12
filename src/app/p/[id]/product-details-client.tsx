
"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { ProductCard } from '@/components/product/product-card';
import type { Product } from '@/types/product';
import { useCart } from '@/context/cart-context';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

interface ProductDetailsClientProps {
  product: Product;
  similarProducts: Product[];
}

const Description = ({ text }: { text: string }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const words = text.split(' ');
  const isLongText = words.length > 150;
  const displayText = isLongText && !isExpanded ? words.slice(0, 150).join(' ') + '...' : text;

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

export function ProductDetailsClient({ product, similarProducts }: ProductDetailsClientProps) {
    const { addToCart } = useCart();
    const router = useRouter();
    const { toast } = useToast();

    const handleAddToCart = () => {
        const price = parseFloat(product.discounted_price.replace('₹', ''));
        addToCart({
            productId: product.id,
            variantId: product.id, // Using product id as variantId for simplicity
            name: product.name,
            variantName: product.size || 'Standard',
            image: product.image_url,
            price: price,
        });
    };

    const handleBuyNow = () => {
        handleAddToCart();
        router.push('/cart');
    };

    const generalInfo = product.product_information['GENERAL INFORMATION'];

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
                    <p className="text-4xl font-bold text-primary">{product.discounted_price}</p>
                    {product.original_price && (
                        <p className="text-xl text-muted-foreground line-through">{product.original_price}</p>
                    )}
                </div>
                {product.discount_percentage && (
                    <Badge variant="destructive" className="mt-2 text-base">{product.discount_percentage}</Badge>
                )}
            </div>

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
                                <ProductCard product={p} />
                             </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="ml-12" />
                <CarouselNext className="mr-12" />
            </Carousel>
       </div>
    </>
  );
}
