import type { Product, Testimonial } from "@/types";

export const products: Product[] = [
  {
    id: "coke-classic",
    name: "Coca-Cola Classic",
    description: "The original and iconic Coca-Cola, with its refreshing and uplifting taste.",
    images: ["https://placehold.co/600x600.png", "https://placehold.co/600x600.png", "https://placehold.co/600x600.png"],
    category: "Soft Drinks",
    brand: "Coca-Cola",
    isFeatured: true,
    variants: [
      { id: "cc-250", name: "250ml Can", priceRetail: 1.50, priceWholesale: 0.90, stock: 500 },
      { id: "cc-500", name: "500ml Bottle", priceRetail: 2.50, priceWholesale: 1.80, stock: 300 },
      { id: "cc-1l", name: "1L Bottle", priceRetail: 4.00, priceWholesale: 3.20, stock: 150 },
    ],
  },
  {
    id: "pepsi-max",
    name: "Pepsi Max",
    description: "Maximum taste, no sugar. A bold and refreshing sugar-free cola.",
    images: ["https://placehold.co/600x600.png", "https://placehold.co/600x600.png"],
    category: "Soft Drinks",
    brand: "PepsiCo",
    isFeatured: true,
    variants: [
      { id: "pm-330", name: "330ml Can", priceRetail: 1.40, priceWholesale: 0.85, stock: 450 },
      { id: "pm-1.5l", name: "1.5L Bottle", priceRetail: 3.80, priceWholesale: 3.00, stock: 200 },
    ],
  },
  {
    id: "tropicana-orange",
    name: "Tropicana Orange Juice",
    description: "100% pure squeezed orange juice. Not from concentrate.",
    images: ["https://placehold.co/600x600.png"],
    category: "Juices",
    brand: "Tropicana",
    isFeatured: true,
    variants: [
      { id: "to-1l", name: "1L Carton", priceRetail: 5.00, priceWholesale: 4.10, stock: 100 },
      { id: "to-2l", name: "2L Bottle", priceRetail: 8.50, priceWholesale: 7.50, stock: 50 },
    ],
  },
  {
    id: "red-bull",
    name: "Red Bull Energy Drink",
    description: "Red Bull gives you wings. The classic energy drink for mind and body.",
    images: ["https://placehold.co/600x600.png", "https://placehold.co/600x600.png"],
    category: "Energy Drinks",
    brand: "Red Bull",
    isFeatured: false,
    variants: [
      { id: "rb-250", name: "250ml Can", priceRetail: 3.00, priceWholesale: 2.20, stock: 800 },
      { id: "rb-473", name: "473ml Can", priceRetail: 5.00, priceWholesale: 4.00, stock: 400 },
    ],
  },
  {
    id: "evian-water",
    name: "Evian Natural Spring Water",
    description: "Naturally filtered through glacial rocks in the French Alps.",
    images: ["https://placehold.co/600x600.png"],
    category: "Water",
    brand: "Evian",
    isFeatured: false,
    variants: [
      { id: "ew-500", name: "500ml Bottle", priceRetail: 1.80, priceWholesale: 1.10, stock: 1200 },
      { id: "ew-1l", name: "1L Bottle", priceRetail: 3.00, priceWholesale: 2.30, stock: 900 },
    ],
  },
  {
    id: "sprite",
    name: "Sprite",
    description: "Crisp, clean, lemon-lime taste that's caffeine-free.",
    images: ["https://placehold.co/600x600.png"],
    category: "Soft Drinks",
    brand: "Coca-Cola",
    isFeatured: false,
    variants: [
      { id: "sp-330", name: "330ml Can", priceRetail: 1.50, priceWholesale: 0.90, stock: 600 },
      { id: "sp-2l", name: "2L Bottle", priceRetail: 4.20, priceWholesale: 3.50, stock: 250 },
    ],
  },
   {
    id: "gatorade-lemon-lime",
    name: "Gatorade Lemon-Lime",
    description: "The thirst-quenching classic to refuel and rehydrate.",
    images: ["https://placehold.co/600x600.png"],
    category: "Sports Drinks",
    brand: "Gatorade",
    isFeatured: true,
    variants: [
      { id: "gll-591", name: "591ml Bottle", priceRetail: 2.80, priceWholesale: 2.00, stock: 350 },
    ],
  },
  {
    id: "lipton-ice-tea-peach",
    name: "Lipton Iced Tea Peach",
    description: "A refreshing and delicious blend of real tea and peach flavor.",
    images: ["https://placehold.co/600x600.png"],
    category: "Iced Tea",
    brand: "Lipton",
    isFeatured: false,
    variants: [
      { id: "litp-500", name: "500ml Bottle", priceRetail: 2.40, priceWholesale: 1.70, stock: 400 },
    ],
  }
];

export const categories = [
  ...new Set(products.map((p) => p.category)),
];

export const brands = [
  ...new Set(products.map((p) => p.brand)),
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Ramesh Patel",
    title: "Cafe Owner",
    quote: "SK Traders is our go-to for all beverage needs. Their wholesale pricing is unbeatable, and the delivery is always on time. Highly recommended for any business!",
    avatar: "https://placehold.co/100x100.png",
  },
  {
    id: "2",
    name: "Priya Singh",
    title: "Event Manager",
    quote: "The variety and stock availability at Beverage Hub are fantastic. We can always count on them for our large-scale events. The new website makes ordering a breeze.",
    avatar: "https://placehold.co/100x100.png",
  },
  {
    id: "3",
    name: "Anil Kumar",
    title: "Retail Shopkeeper",
    quote: "I've been a customer for over five years. The service is personal, and they always ensure we get the best deals. The team is professional and very helpful.",
    avatar: "https://placehold.co/100x100.png",
  },
];
