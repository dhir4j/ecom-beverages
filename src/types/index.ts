export type Product = {
  id: string;
  name: string;
  description: string;
  images: string[];
  category: string;
  brand: string;
  isFeatured: boolean;
  variants: {
    id: string;
    name: string; // e.g., '250ml Can', '1L Bottle'
    priceRetail: number;
    priceWholesale: number;
    stock: number;
  }[];
};

export type Testimonial = {
  id: string;
  name: string;
  title: string;
  quote: string;
  avatar: string;
};

export type CartItem = {
  productId: string;
  variantId: string;
  name: string;
  variantName: string;
  image: string;
  quantity: number;
  price: number;
};
