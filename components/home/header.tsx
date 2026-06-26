import React from "react";
import Image from "next/image";
import { ShoppingCart, Menu, X } from "lucide-react";
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
    <header className="sticky top-0 z-40 bg-[#0078BE] text-white border-b border-white/10 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center">
          <div className="relative h-18 w-56">
            <Image
              src="https://dairycoolfarm.com/wp-content/uploads/2026/01/PicsArt_08-17-04.14.09-Edited-1-1.png"
              alt="Dairy Cool Farm Logo"
              fill
              style={{ objectFit: "contain" }}
              className="object-contain object-left"
              priority
            />
          </div>
        </a>

        {/* Desktop Navigation & Actions */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 font-bold text-xs uppercase tracking-wider text-sky-100/90 whitespace-nowrap ml-auto">
          <a href="/" className="text-white transition">Home</a>
          <a href="/about-dadi" className="hover:text-white transition">About Dadi</a>
          <a href="#bilona-process" className="hover:text-white transition">Bilona Process</a>
          <a href="#shop" className="hover:text-white transition">Shop</a>
          <a href="#benefits" className="hover:text-white transition">Blog</a>
          <a href="#reviews" className="hover:text-white transition">Gallery</a>
          <a href="#store-location" className="hover:text-white transition">Our Location</a>
          <a href="#faqs" className="hover:text-white transition">Contact Us</a>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-white/10 text-white transition flex items-center justify-center"
            aria-label="Open Cart"
          >
            <ShoppingCart className="w-5.5 h-5.5" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-white text-primary font-extrabold text-[10px] w-5 h-5 flex items-center justify-center rounded-full border border-primary shadow-sm animate-pulse">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* WhatsApp Quick Link */}
          <button
            onClick={onWhatsAppOrder}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 active:scale-[0.97] text-white font-extrabold px-5 py-3 rounded-lg text-xs transition uppercase tracking-wider shadow-md cursor-pointer whitespace-nowrap"
          >
            WhatsApp Order
            <WhatsAppIcon className="w-4.5 h-4.5" />
          </button>
        </nav>

        {/* Header Action Buttons (Tablet View - hidden on mobile and desktop) */}
        <div className="hidden sm:flex lg:hidden items-center gap-4 justify-end">
          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-full hover:bg-white/10 text-white transition"
            aria-label="Open Cart"
          >
            <ShoppingCart className="w-5.5 h-5.5" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-white text-primary font-extrabold text-[10px] w-5 h-5 flex items-center justify-center rounded-full border border-primary shadow-sm animate-pulse">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* WhatsApp Quick Link */}
          <button
            onClick={onWhatsAppOrder}
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 active:scale-[0.97] text-white font-extrabold px-5 py-3 rounded-lg text-xs transition uppercase tracking-wider shadow-md cursor-pointer whitespace-nowrap"
          >
            WhatsApp Order
            <WhatsAppIcon className="w-4.5 h-4.5" />
          </button>
        </div>

        {/* Mobile Menu & Cart Triggers */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-full hover:bg-white/10 text-white transition"
            aria-label="Open Cart Mobile"
          >
            <ShoppingCart className="w-5.5 h-5.5" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 bg-white text-primary font-extrabold text-[9px] w-4.5 h-4.5 flex items-center justify-center rounded-full">
                {cartItemsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full hover:bg-white/10 text-white transition"
            aria-label="Open Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#0078BE] px-4 py-6 space-y-4 shadow-lg text-white font-bold text-sm tracking-wider uppercase">
          <div className="flex flex-col gap-3">
            <a href="/" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/10 hover:text-sky-100 transition">Home</a>
            <a href="/about-dadi" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/10 hover:text-sky-100 transition">About Dadi</a>
            <a href="#bilona-process" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/10 hover:text-sky-100 transition">Bilona Process</a>
            <a href="#shop" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/10 hover:text-sky-100 transition">Shop</a>
            <a href="#benefits" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/10 hover:text-sky-100 transition">Blog</a>
            <a href="#store-location" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/10 hover:text-sky-100 transition">Our Location</a>
            <a href="#faqs" onClick={() => setIsMobileMenuOpen(false)} className="px-3 py-2 rounded-lg hover:bg-white/10 hover:text-sky-100 transition">FAQ</a>
          </div>
          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onWhatsAppOrder();
              }}
              className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-extrabold py-3.5 rounded-lg text-xs uppercase tracking-widest cursor-pointer whitespace-nowrap"
            >
              WhatsApp Order
              <WhatsAppIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
