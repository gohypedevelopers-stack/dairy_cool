"use client";

import React, { useState } from "react";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import Locations from "@/components/home/locations";

export default function LocationPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <div className="flex-1 pt-8">
        <div className="max-w-4xl mx-auto px-4 text-center mb-4">
          <h1 className="text-4xl md:text-6xl font-serif font-black text-[#0078BE] mb-4">Visit Us</h1>
          <p className="text-slate-600 text-lg">We'd love to have you over! Check out our store and farm locations below.</p>
        </div>
        <Locations onWhatsAppDirect={(msg) => window.open(`https://wa.me/9716003060?text=${encodeURIComponent(msg)}`, "_blank")} />
      </div>

      <Footer />
    </div>
  );
}
