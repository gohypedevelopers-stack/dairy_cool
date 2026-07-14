"use client";

import React, { useState } from "react";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";

export default function PrivacyPolicyPage() {
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
          <h1 className="text-3xl md:text-5xl font-serif font-black text-[#0078BE] mb-8">Privacy Policy</h1>
          <div className="prose prose-sky max-w-none text-slate-600">
            <p>We respect your privacy. This policy document is currently being drafted and will outline exactly how we protect and use your data. Rest assured, your contact details and order information are strictly confidential and solely used to process your orders.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
