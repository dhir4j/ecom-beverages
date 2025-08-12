"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Product } from "@/types/product";
import { ProductCard } from "@/components/product/product-card";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function FilterSidebar({
  selectedCategories,
  setSelectedCategories,
  selectedBrands,
  setSelectedBrands,
  clearFilters,
  categories,
  brands,
}: {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  clearFilters: () => void;
  categories: string[];
  brands: string[];
}) {
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleBrandChange = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <Card className="sticky top-20">
      <CardContent className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Filters</h3>
          <Button variant="ghost" size="sm" onClick={clearFilters}>Clear All</Button>
        </div>
        <Separator className="my-4" />
        
        <div>
          <h4 className="mb-2 font-semibold">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${category}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <Label htmlFor={`cat-${category}`} className="font-normal capitalize">{category}</Label>
              </div>
            ))}
          </div>
        </div>
        <Separator className="my-4" />
        <div>
          <h4 className="mb-2 font-semibold">Brand</h4>
          <div className="max-h-60 overflow-y-auto space-y-2">
            {brands.map((brand) => (
              <div key={brand} className="flex items-center space-x-2">
                <Checkbox
                  id={`brand-${brand}`}
                  checked={selectedBrands.includes(brand)}
                  onCheckedChange={() => handleBrandChange(brand)}
                />
                <Label htmlFor={`brand-${brand}`} className="font-normal">{brand}</Label>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

interface ShopClientPageProps {
  products: Product[];
  categories: string[];
  brands: string[];
}

export function ShopClientPage({ products, categories, brands }: ShopClientPageProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialCategory ? [decodeURIComponent(initialCategory)] : []);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const filteredProducts = products.filter((product) => {
    const categoryMatch =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const brandMatch =
      selectedBrands.length === 0 || selectedBrands.includes(product.product_information["GENERAL INFORMATION"]?.Brand);
    return categoryMatch && brandMatch;
  });

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Our Products</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Browse our extensive collection of beverages.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <FilterSidebar
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            clearFilters={clearFilters}
            categories={categories}
            brands={brands}
          />
        </div>
        <div className="md:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-lg border-2 border-dashed">
                <div className="text-center">
                    <h3 className="text-xl font-semibold">No Products Found</h3>
                    <p className="text-muted-foreground mt-2">Try adjusting your filters.</p>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
