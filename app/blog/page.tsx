"use client";

import React, { useState } from "react";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import HealthBenefits from "@/components/home/health-benefits";
import WhyChooseUs from "@/components/home/why-choose-us";

export default function BlogPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        cartItemsCount={0}
        setIsCartOpen={() => {}}
        onWhatsAppOrder={() => window.open(`https://wa.me/9716003060?text=Hello`, "_blank")}
      />
      <div className="pt-16 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-black text-[#0078BE] mb-4">Dairy Cool Blog</h1>
          <p className="text-slate-600 text-lg">Learn about the incredible health benefits of incorporating Bilona Ghee into your daily diet.</p>
        </div>
        <HealthBenefits />
        <WhyChooseUs />
      </div>
      <Footer />
    </div>
  );
}
