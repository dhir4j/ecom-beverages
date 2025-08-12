
import type { Product, ProductData } from '@/types/product';
import productData from '@/../data/product_data.json';

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

function loadProducts(): Product[] {
  try {
    const data: ProductData[] = productData;

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

const products = loadProducts();

export async function getProducts(): Promise<Product[]> {
  return products;
}

export async function getProductById(id: string): Promise<Product | undefined> {
  return products.find((p) => p.id === id);
}

export async function getCategories(): Promise<string[]> {
    const categories = new Set(products.map(p => p.category));
    return Array.from(categories);
}

export async function getFeaturedProducts(): Promise<Product[]> {
    // For now, let's feature the first 4 products as a mock implementation
    return products.slice(0, 4);
}
