
import { ShieldCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-background text-foreground">
      <header className="bg-primary/10 py-16 text-center">
        <div className="container mx-auto px-4">
          <ShieldCheck className="h-16 w-16 text-primary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-primary md:text-5xl">Privacy Policy</h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Your privacy is important to us. This policy outlines how we collect, use, and protect your personal information.
          </p>
          <p className="text-sm text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-16 sm:py-24">
        <Card className="p-6 md:p-8">
            <CardContent className="prose prose-lg max-w-none dark:prose-invert">
                <h2>1. Information We Collect</h2>
                <p>
                We collect information that you provide directly to us when you use our services. This may include:
                </p>
                <ul>
                <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and delivery address when you place an order.</li>
                <li><strong>Order Information:</strong> Details about the products you purchase, including wholesale and retail orders.</li>
                <li><strong>Payment Information:</strong> While we use a QR code system for payments, we collect and store the UTR (Unique Transaction Reference) ID to verify transactions. We do not store your bank account or card details.</li>
                <li><strong>Communications:</strong> If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</li>
                </ul>

                <h2>2. How We Use Your Information</h2>
                <p>We use the information we collect for various purposes, including to:</p>
                <ul>
                <li>Provide, operate, and maintain our services.</li>
                <li>Process your transactions and manage your orders.</li>
                <li>Improve, personalize, and expand our services.</li>
                <li>Understand and analyze how you use our services.</li>
                <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes.</li>
                <li>Send you emails and text messages.</li>
                <li>Find and prevent fraud.</li>
                </ul>

                <h2>3. Sharing Your Information</h2>
                <p>
                We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This does not include trusted third parties who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential. We may also release your information when we believe release is appropriate to comply with the law, enforce our site policies, or protect ours or others' rights, property, or safety.
                </p>

                <h2>4. Data Security</h2>
                <p>
                We implement a variety of security measures to maintain the safety of your personal information. Your personal information is contained behind secured networks and is only accessible by a limited number of persons who have special access rights to such systems, and are required to keep the information confidential.
                </p>
                
                <h2>5. Your Data Protection Rights</h2>
                <p>
                    You have certain data protection rights. We will respond to your request to exercise these rights within one month. Your rights include:
                </p>
                <ul>
                <li>The right to access, update or delete the information we have on you.</li>
                <li>The right of rectification.</li>
                <li>The right to object.</li>
                <li>The right of restriction.</li>
                <li>The right to data portability.</li>
                <li>The right to withdraw consent.</li>
                </ul>

                <h2>6. Changes to This Privacy Policy</h2>
                <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                </p>

                <h2>7. Contact Us</h2>
                <p>
                If you have any questions about this Privacy Policy, please contact us at <a href="mailto:sktraders351@gmail.com" className="text-primary hover:underline">sktraders351@gmail.com</a>.
                </p>
            </CardContent>
        </Card>
      </main>
    </div>
  );
}
