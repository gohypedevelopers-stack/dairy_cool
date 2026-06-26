"use client";

import React, { useState } from "react";
import { WhatsAppIcon } from "@/components/icons";
import CartDrawer from "@/components/cart-drawer";
import VideoModal from "@/components/video-modal";

// Home Page Section Components
import TopBanner from "@/components/home/top-banner";
import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import Categories from "@/components/home/categories";
import ProductGrid from "@/components/home/product-grid";
import WhyChooseUs from "@/components/home/why-choose-us";
import Ingredients from "@/components/home/ingredients";
import QualityChecks from "@/components/home/quality-checks";
import Testimonials from "@/components/home/testimonials";
import Certifications from "@/components/home/certifications";
import Locations from "@/components/home/locations";
import FAQ from "@/components/home/faq";
import CtaBanner from "@/components/home/cta-banner";
import Footer from "@/components/home/footer";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

export default function Home() {
  // Mobile Nav State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Video Modal State
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string; url: string }>({
    isOpen: false,
    title: "",
    url: "",
  });

  // Cart Operations
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
    // Redirect to checkout page
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

  // Pre-filled WhatsApp direct chat
  const handleWhatsAppDirect = (message: string) => {
    window.open(`https://wa.me/9716003060?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Video click trigger
  const playVideo = (title: string, url: string) => {
    setVideoModal({ isOpen: true, title, url });
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-sky-500 selection:text-white antialiased font-sans">
      
      {/* WhatsApp Floating Button */}
      <button
        onClick={() => handleWhatsAppDirect("Hello! I want to order Pure Bilona A2 Ghee.")}
        className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 active:scale-95 transition-all text-white p-4 rounded-full shadow-2xl flex items-center justify-center group cursor-pointer"
        aria-label="Order on WhatsApp"
      >
        <WhatsAppIcon className="w-6 h-6" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 ease-out font-bold text-sm whitespace-nowrap">
          Order on WhatsApp
        </span>
      </button>

      {/* Page Sections */}
      <TopBanner />
      
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        cartItemsCount={totalCartCount}
        setIsCartOpen={setIsCartOpen}
        onWhatsAppOrder={() => handleWhatsAppDirect("Hello Dairy Cool! I want to place a quick order.")}
      />

      <Hero
        onWhatsAppOrder={handleWhatsAppDirect}
        onPlayVideo={playVideo}
      />

      <Categories />

      <ProductGrid
        onAddToCart={addToCart}
        onBuyNow={buyNow}
      />

      <WhyChooseUs />
      <Ingredients />
      <QualityChecks />
      <Testimonials />
      <Certifications />

      <Locations onWhatsAppDirect={handleWhatsAppDirect} />

      <FAQ />
      <CtaBanner onWhatsAppDirect={handleWhatsAppDirect} />
      <Footer />

      {/* Cart Drawer Component */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />

      {/* Video Modal Component */}
      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ ...videoModal, isOpen: false })}
        videoTitle={videoModal.title}
        videoUrl={videoModal.url}
      />

    </div>
  );
}
