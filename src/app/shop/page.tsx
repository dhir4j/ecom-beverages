import { getProducts, getCategories } from "@/lib/products";
import { ProductCard } from "@/components/product/product-card";
import { ShopClientPage } from "./shop-client-page";

export default async function ShopPage() {
  const products = await getProducts();
  const categories = await getCategories();
  const brands = [...new Set(products.map(p => p.product_information["GENERAL INFORMATION"]?.Brand).filter(Boolean))];

  return <ShopClientPage products={products} categories={categories} brands={brands} />;
}
