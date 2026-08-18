"use client";

import React, { useState, useEffect } from "react";
import { getWooProducts } from "@/lib/woocommerce";

import VideoModal from "@/components/video-modal";
import { useCart } from "@/components/cart-provider";

// Home Page Section Components
import TopBanner from "@/components/home/top-banner";
import Header from "@/components/home/header";
import Hero from "@/components/home/hero";
import MeetDadi from "@/components/home/meet-dadi";
import Categories from "@/components/home/categories";
import ProductGrid from "@/components/home/product-grid";
import WhyChooseUs from "@/components/home/why-choose-us";

import QualityChecks from "@/components/home/quality-checks";
import BilonaProcessSteps from "@/components/home/bilona-process-steps";
import HealthBenefits from "@/components/home/health-benefits";
import AvailableOn from "@/components/home/available-on";
import Testimonials from "@/components/home/testimonials";
import Certifications from "@/components/home/certifications";
import Locations from "@/components/home/locations";
import FAQ from "@/components/home/faq";
import AdsBanner from "@/components/home/ads-banner";
import CtaBanner from "@/components/home/cta-banner";
import Footer from "@/components/home/footer";

export default function Home() {
  // Mobile Nav State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wpProducts, setWpProducts] = useState<any[]>([]);

  const { addToCart, buyNow, totalCartCount, setIsCartOpen } = useCart();

  useEffect(() => {
    getWooProducts().then((data) => {
      if (data && data.length > 0) {
        setWpProducts(data);
      }
    }).catch(console.error);
  }, []);

  // Video Modal State
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string; url: string }>({
    isOpen: false,
    title: "",
    url: "",
  });

  // Pre-filled WhatsApp direct chat
  const handleWhatsAppDirect = (message: string) => {
    window.open(`https://wa.me/9716003060?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Video click trigger
  const playVideo = (title: string, url: string) => {
    setVideoModal({ isOpen: true, title, url });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 selection:bg-sky-500 selection:text-white antialiased font-sans">
      
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
        onPlayVideo={playVideo}
        onWhatsAppOrder={() => handleWhatsAppDirect("Hello Dairy Cool! I want to place a quick order.")}
      />
      
      <BilonaProcessSteps />
      
      <MeetDadi />

      <ProductGrid
        onAddToCart={addToCart}
        onBuyNow={buyNow}
        wpProducts={wpProducts}
      />

      <AdsBanner />

      <QualityChecks
        onPlayVideo={playVideo}
      />

      <Categories />

      <AvailableOn />

      <WhyChooseUs />

      <HealthBenefits />

      <Testimonials />
      <Certifications />

      <Locations onWhatsAppDirect={handleWhatsAppDirect} />

      <FAQ />
      <CtaBanner onWhatsAppDirect={handleWhatsAppDirect} />
      <Footer />

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
