
"use client";

import type { CartItem } from "@/types";
import { useToast } from "@/hooks/use-toast";
import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

type CartMode = 'retail' | 'wholesale';

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

const getInitialCartState = (mode: CartMode): CartItem[] => {
    if (typeof window === 'undefined') {
        return [];
    }
    try {
        const storedCart = localStorage.getItem(`${mode}_cart`);
        return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
        console.error(`Failed to parse ${mode} cart from localStorage`, error);
        return [];
    }
};


export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [retailCart, setRetailCart] = useState<CartItem[]>(() => getInitialCartState('retail'));
  const [wholesaleCart, setWholesaleCart] = useState<CartItem[]>(() => getInitialCartState('wholesale'));

  useEffect(() => {
    localStorage.setItem("retail_cart", JSON.stringify(retailCart));
  }, [retailCart]);

  useEffect(() => {
    localStorage.setItem("wholesale_cart", JSON.stringify(wholesaleCart));
  }, [wholesaleCart]);
  
  const getCartActions = (mode: CartMode) => {
    const isRetail = mode === 'retail';
    const cartItems = isRetail ? retailCart : wholesaleCart;
    const setCartItems = isRetail ? setRetailCart : setWholesaleCart;

    const addToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
        const addQuantity = item.quantity || 1;
        let toastTitle = "";
        let toastDescription = "";

        setCartItems((prevItems) => {
            const existingItem = prevItems.find((i) => i.variantId === item.variantId);

            if (existingItem) {
                toastTitle = `Item updated in ${mode} cart`;
                toastDescription = `${existingItem.name} (${existingItem.variantName}) quantity increased.`;
                return prevItems.map((i) =>
                    i.variantId === item.variantId
                        ? { ...i, quantity: i.quantity + addQuantity }
                        : i
                );
            } else {
                toastTitle = `Item added to ${mode} cart`;
                toastDescription = `${item.name} (${item.variantName}) has been added.`;
                return [...prevItems, { ...item, quantity: addQuantity }];
            }
        });

        toast({
            title: toastTitle,
            description: toastDescription,
        });
    };

    const removeFromCart = (variantId: string) => {
        const itemToRemove = cartItems.find((i) => i.variantId === variantId);
        setCartItems((prevItems) => prevItems.filter((item) => item.variantId !== variantId));
        
        if (itemToRemove) {
          toast({
            title: "Item removed from cart",
            description: `${itemToRemove.name} (${itemToRemove.variantName}) has been removed.`,
            variant: "destructive",
          });
        }
    };

    const updateQuantity = (variantId: string, quantity: number) => {
        const minQuantity = isRetail ? 1 : 100;
        if (quantity < minQuantity) {
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
    };

    const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    return {
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      itemCount,
      totalPrice,
    };
  }

  const contextValue = { getCartActions };

  return (
    <CartContext.Provider value={contextValue as any}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (mode: CartMode = 'retail') => {
  const context = useContext(CartContext as any);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context.getCartActions(mode);
};
