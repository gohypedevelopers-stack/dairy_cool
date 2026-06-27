import React from "react";
import Image from "next/image";
import { ShoppingCart, Menu, X, Truck } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";

interface HeaderProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  cartItemsCount: number;
  setIsCartOpen: (open: boolean) => void;
  onWhatsAppOrder: () => void;
}

export default function Header({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  cartItemsCount,
  setIsCartOpen,
  onWhatsAppOrder,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md text-[#2E271E] border-b border-amber-100/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <a href="/" className="flex items-center gap-1.5 shrink-0 group">
          <div className="relative h-18 w-36">
            <Image
              src="/images/logo.png"
              alt="Dairy Cool Logo"
              fill
              style={{ 
                objectFit: "contain",
                filter: "brightness(0) saturate(100%) invert(33%) sepia(97%) saturate(1478%) hue-rotate(179deg) brightness(91%) contrast(101%)"
              }}
              className="object-contain object-left"
              priority
            />
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6 font-extrabold text-xs uppercase tracking-wider text-[#5A4F43] whitespace-nowrap mx-auto">
          <a href="/" className="text-[#0078BE] transition-colors duration-300">Home</a>
          <a href="/about-dadi" className="hover:text-[#0078BE] transition-colors duration-300">About Dadi</a>
          <a href="#bilona-process" className="hover:text-[#0078BE] transition-colors duration-300">Bilona Process</a>
          <a href="#shop" className="hover:text-[#0078BE] transition-colors duration-300">Shop</a>
          <a href="#benefits" className="hover:text-[#0078BE] transition-colors duration-300">Blog</a>
          <a href="#reviews" className="hover:text-[#0078BE] transition-colors duration-300">Gallery</a>
          <a href="/contact" className="hover:text-[#0078BE] transition-colors duration-300">Contact Us</a>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          {/* Track Order Icon Link */}
          <a
            href="/track-order"
            className="p-2.5 text-[#2E271E] hover:text-[#0078BE] hover:bg-amber-50 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center"
            aria-label="Track Order"
            title="Track Order"
          >
            <Truck className="w-5.5 h-5.5" />
          </a>

          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 text-[#2E271E] hover:text-[#0078BE] hover:bg-amber-50 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center"
            aria-label="Open Cart"
          >
            <ShoppingCart className="w-5.5 h-5.5" />
            {cartItemsCount > 0 && (
              <span className="absolute top-1.5 right-1.5 bg-[#0078BE] text-white font-extrabold text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* WhatsApp Order Button */}
          <button
            onClick={onWhatsAppOrder}
            className="flex items-center gap-2 bg-[#22c55e] hover:bg-[#1eb052] active:scale-95 text-white font-extrabold px-6 py-3 rounded-full text-xs uppercase tracking-wider shadow-md transition-all duration-300 cursor-pointer whitespace-nowrap"
          >
            <span>WhatsApp Order</span>
            <WhatsAppIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Mobile Menu & Cart Trigger */}
        <div className="flex items-center gap-2 lg:hidden ml-auto">
          {/* Track Order Icon Link Mobile */}
          <a
            href="/track-order"
            className="p-2 text-[#2E271E] hover:text-[#0078BE] rounded-full transition-all duration-300 flex items-center justify-center"
            aria-label="Track Order Mobile"
            title="Track Order"
          >
            <Truck className="w-5.5 h-5.5" />
          </a>

          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#2E271E] flex items-center justify-center"
            aria-label="Open Cart Mobile"
          >
            <ShoppingCart className="w-5.5 h-5.5" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-[#0078BE] text-white font-extrabold text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full">
                {cartItemsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 text-[#2E271E]"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-amber-100/50 bg-[#FAF6F0] px-4 py-6 space-y-4 shadow-lg text-[#2E271E] font-bold text-sm tracking-wider uppercase">
          <div className="flex flex-col gap-3">
            <a href="/" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-[#0078BE] transition">Home</a>
            <a href="/about-dadi" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-[#0078BE] transition">About Dadi</a>
            <a href="#bilona-process" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-[#0078BE] transition">Bilona Process</a>
            <a href="#shop" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-[#0078BE] transition">Shop</a>
            <a href="#benefits" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-[#0078BE] transition">Blog</a>
            <a href="#reviews" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-[#0078BE] transition">Gallery</a>
            <a href="/track-order" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-[#0078BE] transition">Track Order</a>
            <a href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-amber-50 hover:text-[#0078BE] transition">Contact Us</a>
          </div>
          <div className="pt-4 border-t border-amber-100/50 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onWhatsAppOrder();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#22c55e] text-white font-extrabold py-3.5 rounded-full text-xs uppercase tracking-widest cursor-pointer whitespace-nowrap shadow-md"
            >
              <span>WhatsApp Order</span>
              <WhatsAppIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
