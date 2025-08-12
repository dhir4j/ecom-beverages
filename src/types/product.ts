// Represents the raw structure of a product in product_data.json
export interface ProductData {
    name: string;
    image_url: string;
    discounted_price: string;
    original_price: string;
    discount_percentage: string;
    size: string;
    product_url: string;
    description: string;
    product_information: {
        [section: string]: {
            [key: string]: string;
        };
    };
}

// Represents the processed product data used within the application
export interface Product extends ProductData {
    id: string;
    category: string;
}
