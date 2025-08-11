"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableFooter } from "@/components/ui/table";
import { Bot, Download } from "lucide-react";

// Mock data for the invoice as cart would be cleared
const mockInvoiceData = {
  invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
  invoiceDate: new Date().toLocaleDateString(),
  dueDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toLocaleDateString(),
  items: [
    { name: "Coca-Cola Classic (500ml Bottle)", quantity: 10, price: 2.50 },
    { name: "Tropicana Orange Juice (1L Carton)", quantity: 5, price: 5.00 },
    { name: "Red Bull Energy Drink (250ml Can)", quantity: 24, price: 3.00 },
  ],
  customer: {
    name: "Retail Customer",
    address: "Online Order",
  },
  payment: {
    method: "UPI / QR Code",
    status: "Paid",
    utr: `UTR${Math.floor(100000000000 + Math.random() * 900000000000)}`,
  }
};

export function InvoiceDetails() {
  const subtotal = mockInvoiceData.items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const gst = subtotal * 0.18;
  const total = subtotal + gst;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="no-print mb-8 flex justify-end gap-2">
        <Button onClick={handlePrint}>
            <Download className="mr-2 h-4 w-4" />
            Download PDF
        </Button>
      </div>

      <Card className="p-4 sm:p-8" id="invoice-content">
        <CardHeader className="p-0">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-3">
              <Bot className="h-10 w-10 text-primary" />
              <div>
                <h1 className="text-2xl font-bold">SK Traders</h1>
                <p className="text-sm text-muted-foreground">123 Beverage Lane, Market City, Mumbai, 400001</p>
              </div>
            </div>
            <div className="text-left sm:text-right">
              <h2 className="text-3xl font-bold">INVOICE</h2>
              <p className="text-sm text-muted-foreground">{mockInvoiceData.invoiceNumber}</p>
            </div>
          </div>
          <hr className="my-6" />
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-semibold text-muted-foreground">BILL TO</p>
              <p>{mockInvoiceData.customer.name}</p>
              <p>{mockInvoiceData.customer.address}</p>
            </div>
            <div className="text-right">
                <p><span className="font-semibold text-muted-foreground">Invoice Date: </span>{mockInvoiceData.invoiceDate}</p>
                <p><span className="font-semibold text-muted-foreground">Due Date: </span>{mockInvoiceData.dueDate}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="mt-8 p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-center">Quantity</TableHead>
                <TableHead className="text-right">Unit Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockInvoiceData.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-right">₹{item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">₹{(item.price * item.quantity).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3} className="text-right font-semibold">Subtotal</TableCell>
                    <TableCell className="text-right">₹{subtotal.toFixed(2)}</TableCell>
                </TableRow>
                 <TableRow>
                    <TableCell colSpan={3} className="text-right font-semibold">GST (18%)</TableCell>
                    <TableCell className="text-right">₹{gst.toFixed(2)}</TableCell>
                </TableRow>
                 <TableRow className="text-lg font-bold">
                    <TableCell colSpan={3} className="text-right">Total</TableCell>
                    <TableCell className="text-right">₹{total.toFixed(2)}</TableCell>
                </TableRow>
            </TableFooter>
          </Table>
        </CardContent>

        <div className="mt-8 rounded-lg border bg-muted/50 p-4 text-sm">
            <h3 className="font-semibold">Payment Details</h3>
            <p><strong>Method:</strong> {mockInvoiceData.payment.method}</p>
            <p><strong>Status:</strong> <span className="font-bold text-green-600">{mockInvoiceData.payment.status}</span></p>
            <p><strong>UTR/ID:</strong> {mockInvoiceData.payment.utr}</p>
        </div>

        <div className="mt-8 text-center text-xs text-muted-foreground">
            <p>Thank you for your business!</p>
            <p>For any queries, contact us at contact@sktraders.com</p>
        </div>
      </Card>
    </div>
  );
}
