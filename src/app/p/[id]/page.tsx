


import { getProductById, getProducts } from '@/lib/products';
import { notFound } from 'next/navigation';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { ProductDetailsClient } from './product-details-client';
import type { Product } from '@/types/product';
import { Suspense } from 'react';

type ProductPageProps = {
  params: {
    id: string;
  };
  searchParams: {
    mode?: string;
  }
};

async function ProductPageContent({ params, searchParams }: ProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }
  
  const allProducts = await getProducts();
  const similarProducts = allProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 10);
  const randomProducts = allProducts.filter(p => p.id !== product.id).sort(() => 0.5 - Math.random()).slice(0, 10);
  const isWholesale = searchParams.mode === 'wholesale';

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
            <BreadcrumbItem>
                <BreadcrumbLink asChild>
                    <Link href={isWholesale ? "/wholesale" : "/shop"}>
                      {isWholesale ? 'Wholesale' : 'Shop'}
                    </Link>
                </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
                <Link href={`/c/${encodeURIComponent(product.category)}`}>{product.category}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
           <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <ProductDetailsClient 
        product={product} 
        similarProducts={similarProducts.length > 0 ? similarProducts : randomProducts}
        isWholesale={isWholesale}
      />
    </div>
  );
}

export default function ProductPage(props: ProductPageProps) {
  return (
    <Suspense fallback={<div>Loading product...</div>}>
      <ProductPageContent {...props} />
    </Suspense>
  )
}
