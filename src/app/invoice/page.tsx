
import { InvoiceDetails } from "@/components/invoice/invoice-details";
import { Suspense } from "react";

export default function InvoicePage() {
  return (
    <div className="bg-muted/40">
        <Suspense fallback={<div>Loading invoice...</div>}>
            <InvoiceDetails />
        </Suspense>
    </div>
  );
}
