import { getProducts, getCategories } from '@/lib/products';
import { ProductCard } from '@/components/product/product-card';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { notFound } from 'next/navigation';
import Link from 'next/link';

type CategoryPageProps = {
  params: {
    category: string;
  };
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const products = await getProducts();
  const categories = await getCategories();
  const decodedCategory = decodeURIComponent(params.category);

  if (!categories.map(c => c.toLowerCase()).includes(decodedCategory.toLowerCase())) {
    notFound();
  }

  const filteredProducts = products.filter(
    (product) => product.category.toLowerCase() === decodedCategory.toLowerCase()
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{decodedCategory}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight">{decodedCategory}</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Browse our selection of {decodedCategory.toLowerCase()}.
        </p>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed">
            <div className="text-center">
                <h3 className="text-xl font-semibold">No Products Found</h3>
                <p className="text-muted-foreground mt-2">There are no products in this category.</p>
            </div>
        </div>
      )}
    </div>
  );
}
