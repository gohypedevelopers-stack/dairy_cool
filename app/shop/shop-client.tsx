"use client";

import React, { useState } from "react";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import ProductGrid from "@/components/home/product-grid";
import { useCart } from "@/components/cart-provider";

interface ShopClientProps {
  wpProducts: any[];
}

export default function ShopClient({ wpProducts }: ShopClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { addToCart, buyNow } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        cartItemsCount={0}
        setIsCartOpen={setIsCartOpen}
        onWhatsAppOrder={() => window.open(`https://wa.me/9716003060?text=Hello`, "_blank")}
      />
      <div className="pt-8">
        <div className="max-w-4xl mx-auto px-4 text-center mb-4">
          <h1 className="text-4xl md:text-6xl font-serif font-black text-[#0078BE] mb-4">Our Shop</h1>
          <p className="text-slate-600 text-lg">Buy 100% pure Bilona Ghee directly from our farm to your doorstep.</p>
        </div>
        <ProductGrid onAddToCart={addToCart} onBuyNow={buyNow} wpProducts={wpProducts} />
      </div>
      <Footer />
    </div>
  );
}
