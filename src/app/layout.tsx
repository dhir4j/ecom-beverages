
import type {Metadata} from 'next';
import './globals.css';
import { Inter, Poppins, Pacifico, Playfair_Display } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Header } from '@/components/common/header';
import { Footer } from '@/components/common/footer';
import { Toaster } from '@/components/ui/toaster';
import { CartProvider } from '@/context/cart-context';
import { ThemeProvider } from '@/context/theme-provider';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['600', '700'],
  variable: '--font-poppins'
});
const pacifico = Pacifico({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-pacifico',
});
const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-playfair-display',
});


export const metadata: Metadata = {
  title: 'SK Traders - Beverage Hub',
  description: 'Your one-stop destination for wholesale and retail beverages.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&family=Pacifico&family=Poppins:wght@600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased flex flex-col min-h-screen', inter.variable, poppins.variable, pacifico.variable, playfairDisplay.variable)}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
        >
            <CartProvider>
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
                <Toaster />
            </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
