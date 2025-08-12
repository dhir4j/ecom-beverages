
import { FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function TermsOfServicePage() {
  return (
    <div className="bg-background text-foreground">
      <header className="bg-primary/10 py-16 text-center">
        <div className="container mx-auto px-4">
          <FileText className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-primary md:text-5xl">Terms of Service</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Please read these terms carefully before using our services.
          </p>
          <p className="text-sm text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-16 sm:py-24">
        <Card className="p-6 md:p-8">
            <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <h2>1. Agreement to Terms</h2>
                <p>
                By accessing or using our website and services, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, then you may not access the service.
                </p>

                <h2>2. Use of Our Service</h2>
                <p>
                SK Traders provides an online platform for purchasing beverages for both retail and wholesale purposes. You agree to use our service for lawful purposes only and in a way that does not infringe the rights of, restrict or inhibit anyone else's use and enjoyment of the service.
                </p>
                
                <h2>3. Accounts</h2>
                <p>
                When you create an order with us, you must provide us with information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your service.
                </p>
                
                <h2>4. Products and Pricing</h2>
                <p>
                We make every effort to display as accurately as possible the colors, features, specifications, and details of the products available on the site. However, we do not guarantee that the colors, features, specifications, and details of the products will be accurate, complete, reliable, current, or free of other errors.
                </p>
                <p>
                All prices are subject to change without notice. We reserve the right to modify or discontinue a product at any time.
                </p>

                <h2>5. Wholesale Orders</h2>
                <p>
                Wholesale orders are subject to minimum quantity requirements as specified on the product pages. Prices for wholesale are different from retail and are applicable only when the minimum order criteria are met.
                </p>

                <h2>6. Payment</h2>
                <p>
                All payments must be made through the UPI QR code system provided at checkout. You agree to provide a valid 12-digit UTR ID to confirm your payment. Orders will only be processed upon successful verification of payment.
                </p>

                <h2>7. Intellectual Property</h2>
                <p>
                The Service and its original content, features, and functionality are and will remain the exclusive property of SK Traders and its licensors.
                </p>
                
                <h2>8. Limitation of Liability</h2>
                <p>
                In no event shall SK Traders, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the Service.
                </p>
                
                <h2>9. Governing Law</h2>
                <p>
                These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>

                <h2>10. Changes</h2>
                <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page.
                </p>
                
                <h2>Contact Us</h2>
                <p>
                If you have any questions about these Terms, please contact us at <a href="mailto:sktraders351@gmail.com" className="text-primary hover:underline">sktraders351@gmail.com</a>.
                </p>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
