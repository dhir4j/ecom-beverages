
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function CustomerCarePage() {
  return (
    <div className="bg-background text-foreground">
      <header className="bg-primary/10 py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-primary md:text-5xl">Customer Care</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            We're here to help! Find answers to your questions and get in touch with our team.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg">How do I place a wholesale order?</h3>
                  <p className="text-muted-foreground mt-1">
                    To place a wholesale order, navigate to our "Wholesale" section. You can browse products and add them to your wholesale cart. Minimum order quantities apply, as indicated on the product pages.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">What are your delivery areas for retail orders?</h3>
                  <p className="text-muted-foreground mt-1">
                    We currently offer retail delivery within select pincodes in Hyderabad. For orders outside this area, please use our wholesale service which delivers PAN India.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">What payment methods do you accept?</h3>
                  <p className="text-muted-foreground mt-1">
                    We accept payments via UPI. You can scan the QR code at checkout and provide the UTR number to confirm your payment.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-lg">How can I track my order?</h3>
                  <p className="text-muted-foreground mt-1">
                    Once your payment is verified and your order is confirmed, you will receive an invoice. For delivery updates, please contact our customer care with your invoice number.
                  </p>
                </div>
                 <div>
                  <h3 className="font-semibold text-lg">What is your return policy?</h3>
                  <p className="text-muted-foreground mt-1">
                    Please refer to our <a href="/legal/refund-cancellation" className="text-primary underline">Refund & Cancellation Policy</a> for detailed information on returns and exchanges.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Our Address</h4>
                    <p className="text-muted-foreground">H.no.2-43 Sai nagar colony, chaithanyapuri, dilsukhnagar, Hyderabad - 500060</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <a href="tel:+919100513018" className="text-muted-foreground hover:text-primary">9100513018</a>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <a href="mailto:sktraders351@gmail.com" className="text-muted-foreground hover:text-primary">sktraders351@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1" />
                  <div>
                    <h4 className="font-semibold">Business Hours</h4>
                    <p className="text-muted-foreground">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                    <p className="text-muted-foreground">Sunday: Closed</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

        </div>
      </main>
    </div>
  );
}
