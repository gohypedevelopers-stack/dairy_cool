"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import CartDrawer from "@/components/cart-drawer";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

interface CartContextType {
  cartItems: CartItem[];
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  addToCart: (productId: string, name: string, image: string, size: string, price: number, quantity: number) => void;
  buyNow: (productId: string, name: string, image: string, size: string, price: number, quantity: number) => void;
  updateQuantity: (id: string, newQty: number) => void;
  removeItem: (id: string) => void;
  totalCartCount: number;
  handleWhatsAppOrder: (customMsg?: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("dairy_cool_cart");
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
    } catch (e) {
      console.error("Failed to load cart", e);
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("dairy_cool_cart", JSON.stringify(cartItems));
      } catch (e) {
        console.error("Failed to save cart", e);
      }
    }
  }, [cartItems, isInitialized]);

  const addToCart = (productId: string, name: string, image: string, size: string, price: number, quantity: number) => {
    const cartItemId = `${productId}-${size}`;

    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === cartItemId);
      if (existing) {
        return prevItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prevItems,
        {
          id: cartItemId,
          name,
          price,
          quantity,
          size,
          image,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const buyNow = (productId: string, name: string, image: string, size: string, price: number, quantity: number) => {
    addToCart(productId, name, image, size, price, quantity);
    window.location.href = "/checkout";
  };

  const updateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) return;
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleWhatsAppOrder = (customMsg?: string) => {
    const message = customMsg || "Hello Dairy Cool! I want to place an order from my cart.";
    window.open(`https://wa.me/9716003060?text=${encodeURIComponent(message)}`, "_blank");
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        buyNow,
        updateQuantity,
        removeItem,
        totalCartCount,
        handleWhatsAppOrder,
      }}
    >
      {children}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
