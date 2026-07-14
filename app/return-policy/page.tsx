"use client";

import React, { useState } from "react";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";

export default function ReturnPolicyPage() {
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
          <h1 className="text-3xl md:text-5xl font-serif font-black text-[#0078BE] mb-8">Return Policy</h1>
          <div className="prose prose-sky max-w-none text-slate-600">
            <p>Our return policy is currently being updated. As we deal in consumable food products, returns are typically only accepted for damaged or incorrect deliveries. Please contact our support team on WhatsApp within 48 hours of delivery if you face any issues.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
