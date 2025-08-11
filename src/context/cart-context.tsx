"use client";

import type { CartItem } from "@/types";
import { useToast } from "@/hooks/use-toast";
import React, { createContext, useContext, useEffect, useState } from "react";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (i) => i.variantId === item.variantId
      );
      const addQuantity = item.quantity || 1;

      if (existingItem) {
        toast({
          title: "Item updated in cart",
          description: `${existingItem.name} (${existingItem.variantName}) quantity increased.`,
        });
        return prevItems.map((i) =>
          i.variantId === item.variantId
            ? { ...i, quantity: i.quantity + addQuantity }
            : i
        );
      } else {
        toast({
          title: "Item added to cart",
          description: `${item.name} (${item.variantName}) has been added.`,
        });
        return [...prevItems, { ...item, quantity: addQuantity }];
      }
    });
  };

  const removeFromCart = (variantId: string) => {
    setCartItems((prevItems) => {
      const itemToRemove = prevItems.find((i) => i.variantId === variantId);
      if (itemToRemove) {
        toast({
          title: "Item removed from cart",
          description: `${itemToRemove.name} (${itemToRemove.variantName}) has been removed.`,
          variant: "destructive",
        });
      }
      return prevItems.filter((item) => item.variantId !== variantId);
    });
  };

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(variantId);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.variantId === variantId ? { ...item, quantity } : item
        )
      );
    }
  };
  
  const clearCart = () => {
    setCartItems([]);
  }

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
