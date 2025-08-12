

import { getProducts, getCategories } from "@/lib/products";
import { ShopClientPage } from "./shop-client-page";
import { Suspense } from "react";

export default async function ShopPage() {
  const products = await getProducts();
  const categories = await getCategories();
  const brands = [...new Set(products.map(p => p.product_information["GENERAL INFORMATION"]?.Brand).filter(Boolean))];

  return (
    <Suspense fallback={<div>Loading products...</div>}>
      <ShopClientPage products={products} categories={categories} brands={brands} isWholesale={false} />
    </Suspense>
  );
}
