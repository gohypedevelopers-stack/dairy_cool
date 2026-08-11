"use client";

import React, { useState } from "react";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import GalleryGrid from "@/components/gallery/gallery-grid";

export default function GalleryPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-slate-800 flex flex-col">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <main className="flex-grow pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="font-cursive text-2xl text-amber-600 font-bold block mb-1">
              Dairy Cool Moments
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-black text-[#2E271E] mb-4">
              Our Media Gallery
            </h1>
            <p className="text-slate-600 text-base sm:text-lg">
              Explore authentic photos & videos directly from our farm, traditional Vedic Bilona process, and fresh dairy crafting.
            </p>
          </div>

          <GalleryGrid />
        </div>
      </main>
      <Footer />
    </div>
  );
}
