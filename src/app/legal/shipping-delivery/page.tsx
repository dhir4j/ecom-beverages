
import { Truck, Map, Clock } from 'lucide-react';

export default function ShippingDeliveryPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="bg-primary/10 py-16 text-center">
        <div className="container mx-auto px-4">
          <Truck className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-primary md:text-5xl">Shipping & Delivery</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Information about our shipping policies, delivery times, and charges.
          </p>
           <p className="text-sm text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 sm:py-24 prose prose-lg max-w-4xl">
        <h2>Delivery Areas</h2>
        
        <h3>Retail Orders</h3>
        <p>
          We currently offer retail delivery to select pincodes within <strong>Hyderabad</strong>. You can check the serviceability of your pincode on the cart page before proceeding to checkout. We are continuously working to expand our delivery network.
        </p>

        <h3>Wholesale Orders</h3>
        <p>
          We are pleased to offer <strong>PAN India delivery</strong> for all our wholesale orders. We have partnered with reliable logistics providers to ensure your bulk orders reach you safely and on time, anywhere in the country.
        </p>
        
        <h2>Shipping Charges</h2>

        <h3>Retail Orders</h3>
        <ul>
          <li><strong>Free Shipping:</strong> Enjoy free delivery on all retail orders of ₹500 or more.</li>
          <li><strong>Standard Shipping:</strong> A flat shipping fee of ₹100 is applicable on all orders below ₹500.</li>
        </ul>

        <h3>Wholesale Orders</h3>
        <ul>
          <li><strong>Free Shipping:</strong> Wholesale orders with a total value of ₹5,000 or more are eligible for free shipping.</li>
          <li><strong>Standard Shipping:</strong> For wholesale orders below ₹5,000, a standard shipping and handling fee of ₹750 will be applied.</li>
        </ul>
        
        <h2>Delivery Time</h2>
        <p>
          Our team works diligently to dispatch your orders as quickly as possible.
        </p>
        <ul>
          <li><strong>Retail (Hyderabad):</strong> Orders are typically delivered within 1-2 business days.</li>
          <li><strong>Wholesale (PAN India):</strong> Delivery times may vary from 3-7 business days, depending on your location.</li>
        </ul>
        <p>
          Please note that delivery times are estimates and may vary due to unforeseen circumstances such as weather conditions, logistical delays, or public holidays.
        </p>

        <h2>Order Tracking</h2>
        <p>
          Once your order is dispatched, you will receive confirmation. For wholesale orders, tracking information will be provided so you can monitor the status of your delivery. For any assistance with tracking, please contact our customer care team with your invoice number.
        </p>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about our shipping and delivery policies, please feel free to reach out to us at <a href="mailto:sktraders351@gmail.com" className="text-primary hover:underline">sktraders351@gmail.com</a>.
        </p>
      </main>
    </div>
  );
}
