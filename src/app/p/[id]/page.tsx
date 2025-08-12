import { getProductById } from '@/lib/products';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

type ProductPageProps = {
  params: {
    id: string;
  };
};

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id);

  if (!product) {
    notFound();
  }

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
                <Link href={`/c/${encodeURIComponent(product.category)}`}>{product.category}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
           <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{product.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
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

          <div>
            <h2 className="text-2xl font-bold mb-4">Description</h2>
            <div className="prose prose-blue max-w-none text-muted-foreground">
              {product.description.split('\n').map((para, i) => <p key={i}>{para}</p>)}
            </div>
          </div>
        </div>
      </div>
       <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Product Information</h2>
            <Card>
                <CardContent className="p-6">
                    <div className="space-y-6">
                        {Object.entries(product.product_information).map(([sectionTitle, sectionContent]) => (
                            <div key={sectionTitle}>
                                <h3 className="text-xl font-semibold mb-3 capitalize">{sectionTitle.toLowerCase()}</h3>
                                <Table>
                                    <TableBody>
                                        {Object.entries(sectionContent).map(([key, value]) => (
                                            <TableRow key={key}>
                                                <TableCell className="font-medium w-1/3">{key}</TableCell>
                                                <TableCell>{value}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
       </div>
    </div>
  );
}
