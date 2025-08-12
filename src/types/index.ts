export type Product = {
  id: string;
  name: string;
  description: string;
  image_url: string;
  category: string;
  product_information: {
      [section: string]: {
          [key: string]: string;
      };
  };
  discounted_price: string;
  original_price: string;
  discount_percentage: string;
  size: string;
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
