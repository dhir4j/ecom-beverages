
import { Package, XCircle, CheckCircle } from 'lucide-react';

export default function RefundCancellationPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="bg-primary/10 py-16 text-center">
        <div className="container mx-auto px-4">
          <Package className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-primary md:text-5xl">Refund & Cancellation Policy</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Our policy on refunds and cancellations for both retail and wholesale orders.
          </p>
           <p className="text-sm text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-16 sm:py-24 prose prose-lg max-w-4xl">
        <h2>Order Cancellation</h2>
        <p>
          You can cancel your order before it has been dispatched. To cancel an order, please contact our customer care team immediately at <a href="tel:+919100513018" className="text-primary">9100513018</a> or email us at <a href="mailto:sktraders351@gmail.com" className="text-primary">sktraders351@gmail.com</a> with your order details.
        </p>
        <p>
          Once an order has been dispatched, it cannot be cancelled.
        </p>
        
        <h2>Refund Policy</h2>
        <p>
          We are committed to ensuring the quality of our products. Refunds will be considered under the following conditions:
        </p>
        <ul>
          <li><strong>Damaged or Defective Products:</strong> If you receive products that are damaged, expired, or otherwise defective, please contact us within 24 hours of delivery with photographic evidence. We will arrange for a return and issue a full refund or replacement.</li>
          <li><strong>Incorrect Products:</strong> If you receive items different from what you ordered, please notify us within 24 hours. We will arrange for the correct items to be delivered or issue a refund upon return of the incorrect items.</li>
        </ul>

        <h2>Non-Refundable Items</h2>
        <p>
          Please note that we do not offer refunds or exchanges for:
        </p>
        <ul>
          <li>Change of mind after purchase.</li>
          <li>Products that have been opened or used, unless they are defective.</li>
        </ul>

        <h2>Wholesale Orders</h2>
        <p>
            For wholesale orders, all sales are considered final once the payment is made and the invoice is generated. Cancellations are not permitted. Refunds or replacements for wholesale orders will only be provided in cases of significant damage during transit or major discrepancies in the order, which must be reported with proof within 48 hours of delivery.
        </p>
        
        <h2>Refund Process</h2>
        <p>
          Once your return is received and inspected, we will send you an email to notify you that we have received your returned item. We will also notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment or provided as store credit within 7-10 business days.
        </p>

        <h2>Contact Us</h2>
        <p>
          For any questions related to refunds and cancellations, please contact our customer support team. We are here to assist you.
        </p>
      </main>
    </div>
  );
}
