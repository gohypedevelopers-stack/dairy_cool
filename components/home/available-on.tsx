import React from "react";
import { ShoppingCart, ShoppingBag, Store } from "lucide-react";

export default function AvailableOn() {
  return (
    <section className="py-20 bg-sky-900 border-b border-sky-800 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="space-y-2 mb-12 text-center">
          <span className="font-cursive text-2xl text-sky-300 font-bold block">
            Easily Accessible
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black leading-tight">
            Available Platforms
          </h2>
          <p className="text-sky-200 text-sm md:text-base max-w-2xl mx-auto mt-4">
            You can also order Dairy Cool Ghee from your favorite e-commerce platforms.
          </p>
        </div>

        {/* Platforms Grid */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          
          <div className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 transition-all duration-300 cursor-pointer group w-[220px]">
            <ShoppingCart className="w-8 h-8 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="font-extrabold text-xl tracking-wide uppercase">Amazon</span>
          </div>

          <div className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 transition-all duration-300 cursor-pointer group w-[220px]">
            <ShoppingBag className="w-8 h-8 text-yellow-400 group-hover:scale-110 transition-transform" />
            <span className="font-extrabold text-xl tracking-wide uppercase">Flipkart</span>
          </div>

          <div className="flex items-center gap-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl px-6 py-4 transition-all duration-300 cursor-pointer group w-[220px]">
            <Store className="w-8 h-8 text-red-400 group-hover:scale-110 transition-transform" />
            <span className="font-extrabold text-xl tracking-wide uppercase">JioMart</span>
          </div>

        </div>

      </div>
    </section>
  );
}
