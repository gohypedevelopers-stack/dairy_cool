"use client";

import React, { useState } from "react";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";

export default function TermsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        cartItemsCount={0}
        setIsCartOpen={() => {}}
        onWhatsAppOrder={() => window.open(`https://wa.me/9716003060?text=Hello`, "_blank")}
      />
      
      <div className="flex-1 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-5xl font-serif font-black text-[#0078BE] mb-8">Terms of Service</h1>
          <div className="prose prose-sky max-w-none text-slate-600">
            <p>Our Terms of Service document is currently being updated. By placing an order, you agree to our standard terms of purchase. Please contact us on WhatsApp if you have any questions.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
