"use client";

import React, { useState } from "react";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import BilonaProcessSteps from "@/components/home/bilona-process-steps";
import RealVideos from "@/components/home/real-videos";

export default function BilonaProcessPage() {
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
      <div className="pt-8">
        <div className="max-w-4xl mx-auto px-4 text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-serif font-black text-[#0078BE] mb-4">The Authentic Bilona Method</h1>
          <p className="text-slate-600 text-lg">Discover the ancient Vedic way of making the purest Ghee, churned bidirectionally in clay pots.</p>
        </div>
        <BilonaProcessSteps />
        <RealVideos onPlayVideo={() => {}} />
      </div>
      <Footer />
    </div>
  );
}
