import fs from 'fs/promises';
import path from 'path';
import type { Product, ProductData } from '@/types/product';

// Utility to generate a URL-friendly slug from a string
function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w-]+/g, '') // Remove all non-word chars
    .replace(/--+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

async function loadProducts(): Promise<Product[]> {
  const filePath = path.join(process.cwd(), 'data', 'product_data.json');
  try {
    const jsonString = await fs.readFile(filePath, 'utf-8');
    const data: ProductData[] = JSON.parse(jsonString);

    // Map and add a unique ID and a category field based on product type
    return data.map((product) => ({
      ...product,
      id: slugify(product.name),
      category: product.product_information['PRODUCT SPECIFICATIONS']?.['Product Type'] || 'Uncategorized',
    }));
  } catch (error) {
    console.error('Failed to read or parse product data:', error);
    return [];
  }
}

export async function getProducts(): Promise<Product[]> {
  return await loadProducts();
}

export async function getProductById(id: string): Promise<Product | undefined> {
  const products = await loadProducts();
  return products.find((p) => p.id === id);
}

export async function getCategories(): Promise<string[]> {
    const products = await loadProducts();
    const categories = new Set(products.map(p => p.category));
    return Array.from(categories);
}

export async function getFeaturedProducts(): Promise<Product[]> {
    const products = await loadProducts();
    // For now, let's feature the first 4 products as a mock implementation
    return products.slice(0, 4);
}
