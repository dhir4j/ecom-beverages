
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProducts } from "@/lib/products";
import { ProductCard } from "@/components/product/product-card";
import { Product } from "@/types/product";
import { useEffect, useState } from "react";
import { ShopClientPage } from "../shop/shop-client-page";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  companyName: z.string().min(2, "Company name must be at least 2 characters."),
  email: z.string().email("Invalid email address."),
  phone: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits."),
  orderDetails: z.string().min(10, "Please provide details about your order."),
  upload: z.any().optional(),
});

export default function WholesalePage() {
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

   useEffect(() => {
    async function fetchData() {
      const fetchedProducts = await getProducts();
      const fetchedCategories = [...new Set(fetchedProducts.map(p => p.category))];
      const fetchedBrands = [...new Set(fetchedProducts.map(p => p.product_information["GENERAL INFORMATION"]?.Brand).filter(Boolean))];
      setProducts(fetchedProducts);
      setCategories(fetchedCategories);
      setBrands(fetchedBrands);
    }
    fetchData();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      companyName: "",
      email: "",
      phone: "",
      orderDetails: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Quote Request Sent!",
      description: "Thank you for your inquiry. Our team will get back to you shortly.",
    });
    form.reset();
  }

  return (
    <>
      <div className="container mx-auto max-w-4xl px-4 py-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Wholesale Inquiry</CardTitle>
            <CardDescription>
              Fill out the form below to request a quote for bulk orders. You can also browse products below and add to cart with a minimum quantity of 100.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Doe & Co." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@doe.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="9876543210" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="orderDetails"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Order Details</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Please list the products and quantities you are interested in."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="upload"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Order List (Optional)</FormLabel>
                      <FormControl>
                        <Input type="file" {...form.register('upload')} />
                      </FormControl>
                      <FormDescription>
                        You can upload a spreadsheet (e.g., .xls, .csv) with your order details.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" size="lg">Request a Quote</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
      <ShopClientPage products={products} categories={categories} brands={brands} />
    </>
  );
}
