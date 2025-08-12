
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
    const addQuantity = item.quantity || 1;
    let itemUpdated = false;

    const newCartItems = cartItems.map((i) => {
      if (i.variantId === item.variantId) {
        itemUpdated = true;
        return { ...i, quantity: i.quantity + addQuantity };
      }
      return i;
    });

    if (itemUpdated) {
        setCartItems(newCartItems);
        const existingItem = cartItems.find(i => i.variantId === item.variantId);
        if (existingItem) {
             toast({
                title: "Item updated in cart",
                description: `${existingItem.name} (${existingItem.variantName}) quantity increased.`,
            });
        }
    } else {
        setCartItems([...cartItems, { ...item, quantity: addQuantity }]);
        toast({
            title: "Item added to cart",
            description: `${item.name} (${item.variantName}) has been added.`,
        });
    }
  };

  const removeFromCart = (variantId: string) => {
    const itemToRemove = cartItems.find((i) => i.variantId === variantId);
    setCartItems((prevItems) => {
      return prevItems.filter((item) => item.variantId !== variantId);
    });
    if (itemToRemove) {
      toast({
        title: "Item removed from cart",
        description: `${itemToRemove.name} (${itemToRemove.variantName}) has been removed.`,
        variant: "destructive",
      });
    }
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
