
"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { ShopClientPage } from "../shop/shop-client-page";
import { getProducts } from "@/lib/products";

export default function WholesalePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

   useEffect(() => {
    async function fetchData() {
      const fetchedProducts = await getProducts();
      const fetchedCategories = [...new Set(fetchedProducts.map(p => p.category))];
      const fetchedBrands = [...new Set(fetchedProducts.map(p => p.product_information["GENERAL INFORMATION"]?.Brand).filter(Boolean))];
      setProducts(fetchedProducts);
      setCategories(fetchedCategories);
      setBrands(fetchedBrands);
    }
    fetchData();
  }, []);

  return (
    <>
      <ShopClientPage products={products} categories={categories} brands={brands} />
    </>
  );
}
