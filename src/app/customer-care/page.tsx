
import { Mail, MapPin, Phone, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg">How do I place a wholesale order?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  To place a wholesale order, navigate to our "Wholesale" section. You can browse products and add them to your wholesale cart. Minimum order quantities apply, as indicated on the product pages.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg">What are your delivery areas for retail orders?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We currently offer retail delivery within select pincodes in Hyderabad. For orders outside this area, please use our wholesale service which delivers PAN India.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="text-lg">What payment methods do you accept?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  We accept payments via UPI. You can scan the QR code at checkout and provide the UTR number to confirm your payment.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-lg">How can I track my order?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Once your payment is verified and your order is confirmed, you will receive an invoice. For delivery updates, please contact our customer care with your invoice number.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="text-lg">What is your return policy?</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  Please refer to our <a href="/legal/refund-cancellation" className="text-primary underline">Refund & Cancellation Policy</a> for detailed information on returns and exchanges.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Our Address</h4>
                    <p className="text-muted-foreground">SK TRADERS, FLAT NO 2-43, SAI NAGAR COLONY, CHAITANYAPURI COLONY , Saroor Nagar Circle No.05, Hyderabad, Telangana-500060</p>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <Phone className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Phone</h4>
                    <a href="tel:+919100513018" className="text-muted-foreground hover:text-primary">9100513018</a>
                  </div>
                </div>
                 <div className="flex items-start gap-4">
                  <Mail className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold">Email</h4>
                    <a href="mailto:sktraders351@gmail.com" className="text-muted-foreground hover:text-primary">sktraders351@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Clock className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
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
