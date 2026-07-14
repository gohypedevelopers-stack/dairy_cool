"use client";

import React, { useState } from "react";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import { Truck } from "lucide-react";

export default function TrackOrderPage() {
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
      
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <div className="max-w-md w-full bg-sky-50 border border-sky-100 p-8 rounded-3xl shadow-sm text-center">
          <div className="w-20 h-20 bg-white border border-sky-100 rounded-full flex items-center justify-center mx-auto mb-6 text-[#0078BE]">
            <Truck className="w-10 h-10" />
          </div>
          
          <h1 className="text-3xl font-serif font-black text-slate-800 mb-2">Track Your Order</h1>
          <p className="text-slate-600 mb-8 text-sm">
            Enter your Order ID or AWB number below to track the real-time status of your pure Bilona Ghee.
          </p>
          
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Enter Order ID or AWB Number" 
              className="w-full px-4 py-3 rounded-xl border border-sky-200 focus:outline-none focus:ring-2 focus:ring-[#0078BE]/50 focus:border-[#0078BE] transition"
            />
            <button className="w-full bg-[#0078BE] hover:bg-sky-600 active:scale-95 text-white font-extrabold py-3.5 rounded-xl uppercase tracking-wider transition-all shadow-md">
              Track Package
            </button>
          </div>
          
          <p className="mt-6 text-xs text-slate-500">
            Having trouble? <a href="https://wa.me/9716003060" className="text-[#0078BE] font-bold hover:underline">Contact Support</a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
