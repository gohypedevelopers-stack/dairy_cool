"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Dadi", href: "/about-dadi" },
    { name: "Bilona Process", href: "/bilona-process" },
    { name: "Shop", href: "/shop" },
    { name: "Blog", href: "/blog" },
    { name: "Gallery", href: "/gallery" },
    { name: "Track Order", href: "/track-order" },
    { name: "Our Location", href: "/location" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md text-slate-800 border-b border-sky-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1.5 shrink-0 group">
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
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-6 font-extrabold text-xs uppercase tracking-wider whitespace-nowrap mx-auto">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`transition-colors duration-300 ${
                  isActive ? "text-[#0078BE]" : "text-slate-600 hover:text-[#0078BE]"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-4 shrink-0">
          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 text-slate-700 hover:text-[#0078BE] hover:bg-sky-50 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center"
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
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-slate-700 flex items-center justify-center"
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
            className="p-2 text-slate-700 hover:text-[#0078BE]"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-sky-100 bg-white px-4 py-6 space-y-4 shadow-lg text-slate-800 font-bold text-sm tracking-wider uppercase">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)} 
                  className={`px-3 py-2 rounded-lg transition ${
                    isActive ? "bg-sky-50 text-[#0078BE]" : "hover:bg-sky-50 hover:text-[#0078BE]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
          <div className="pt-4 border-t border-sky-100 flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onWhatsAppOrder();
              }}
              className="w-full flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#1eb052] text-white font-extrabold py-3.5 rounded-full text-xs uppercase tracking-widest cursor-pointer whitespace-nowrap shadow-md transition"
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
