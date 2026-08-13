"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, Mail, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setMessage(data.message || "Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to subscribe. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <footer className="relative bg-[#040E1B] text-slate-300 pt-24 pb-8 overflow-hidden border-t-4 border-amber-500">
      
      {/* Subtle Premium Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0A2440] to-[#040E1B] opacity-80 pointer-events-none" />

      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section: Newsletter & Brand Message */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 pb-16 border-b border-slate-800/80">
          <div className="space-y-4">
            <span className="font-sans text-xs font-bold text-amber-500 uppercase tracking-[0.2em]">
              Join The Family
            </span>
            <h3 className="font-serif font-black text-3xl sm:text-4xl text-white leading-tight">
              Fresh from our farm, <br className="hidden sm:block" />
              straight to your inbox.
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              Subscribe for exclusive farm updates, seasonal offers, and traditional health wisdom straight from Dadi.
            </p>
          </div>
          
          <div className="w-full max-w-md lg:ml-auto space-y-3">
            <form className="relative flex items-center group" onSubmit={handleSubscribe}>
              <input 
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address" 
                className="w-full bg-[#0A1A2F]/50 border border-slate-700 text-white text-base sm:text-sm rounded-full py-3.5 sm:py-4 pl-4 sm:pl-6 pr-28 sm:pr-36 focus:outline-none focus:border-amber-500/50 transition-colors placeholder:text-slate-500 shadow-inner"
              />
              <button 
                type="submit"
                onClick={handleSubscribe}
                disabled={status === "loading"}
                className="absolute right-1.5 top-1.5 bottom-1.5 bg-amber-500 hover:bg-amber-400 text-slate-900 px-4 sm:px-8 rounded-full text-[10px] sm:text-xs font-black uppercase tracking-widest transition-colors shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.4)] cursor-pointer disabled:opacity-60 flex items-center gap-1.5"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Sending</span>
                  </>
                ) : (
                  <span>Subscribe</span>
                )}
              </button>
            </form>

            {status === "success" && (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs font-bold flex items-center gap-2 animate-fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>{message}</span>
              </div>
            )}

            {status === "error" && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-xs font-bold flex items-center gap-2 animate-fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{message}</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <div className="relative h-12 w-44">
              <Image
                src="https://dairycoolfarm.com/wp-content/uploads/2026/01/PicsArt_08-17-04.14.09-Edited-1-1.png"
                alt="Dairy Cool Farm Logo"
                fill
                sizes="176px"
                className="object-contain object-left brightness-0 invert opacity-100 drop-shadow-md"
              />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Preserving traditional Indian dairy recipes and heritage, overseen by grandmother Kamlesh Gurjari at our Greater Noida farms.
            </p>
            <div className="flex items-center gap-4 pt-4">
              <a href="#" className="w-10 h-10 rounded-full bg-[#0A1A2F] border border-slate-700 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400 transition-all hover:-translate-y-1 shadow-sm">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#0A1A2F] border border-slate-700 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400 transition-all hover:-translate-y-1 shadow-sm">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-[#0A1A2F] border border-slate-700 flex items-center justify-center text-slate-400 hover:text-amber-400 hover:border-amber-400 transition-all hover:-translate-y-1 shadow-sm">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.512 3.5 12 3.5 12 3.5s-7.512 0-9.388.555A3.002 3.002 0 0 0 .5 6.163C0 8.07 0 12 0 12s0 3.93.5 5.837a3.003 3.003 0 0 0 2.11 2.108C4.488 20.5 12 20.5 12 20.5s7.512 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-2 space-y-6 lg:ml-auto">
            <h4 className="font-serif font-bold text-lg text-white">Explore</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="/" className="hover:text-amber-400 transition-colors">Home</a></li>
              <li><a href="/about-dadi" className="hover:text-amber-400 transition-colors">Our Story</a></li>
              <li><a href="/bilona-process" className="hover:text-amber-400 transition-colors">The Bilona Process</a></li>
              <li><a href="/shop" className="hover:text-amber-400 transition-colors">Shop Products</a></li>
              <li><a href="/#store-location" className="hover:text-amber-400 transition-colors">Farm Locations</a></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="lg:col-span-2 space-y-6 lg:ml-auto">
            <h4 className="font-serif font-bold text-lg text-white">Policies</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li><a href="/shipping-policy" className="hover:text-amber-400 transition-colors">Shipping Policy</a></li>
              <li><a href="/return-policy" className="hover:text-amber-400 transition-colors">Return Policy</a></li>
              <li><a href="/privacy-policy" className="hover:text-amber-400 transition-colors">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</a></li>
              <li><a href="/#faqs" className="hover:text-amber-400 transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-4 space-y-6 lg:ml-auto max-w-xs">
            <h4 className="font-serif font-bold text-lg text-white">Contact Us</h4>
            <ul className="space-y-5 text-sm text-slate-400">
              <li className="flex items-center gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-[#0A1A2F] flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-colors">
                  <Phone className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-900 transition-colors" />
                </div>
                <a href="tel:+919716003060" className="hover:text-white transition-colors font-medium">+91 9716003060</a>
              </li>
              <li className="flex items-center gap-3 group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-[#0A1A2F] flex items-center justify-center shrink-0 group-hover:bg-amber-500 transition-colors">
                  <Mail className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-900 transition-colors" />
                </div>
                <a href="mailto:hello@dairycool.farm" className="hover:text-white transition-colors font-medium">hello@dairycool.farm</a>
              </li>
              <li className="flex items-start gap-3 group">
                <div className="w-8 h-8 rounded-full bg-[#0A1A2F] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-amber-500 transition-colors">
                  <MapPin className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-900 transition-colors" />
                </div>
                <span className="leading-relaxed font-medium">
                  Village Jansiwana, Near Maripat Railway Station, Greater Noida West, UP - 203207
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 border-t border-slate-800/80 text-xs font-medium text-slate-500">
          <p>© {new Date().getFullYear()} Dairy Cool Farm. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span>Crafted with</span>
            <span className="text-amber-500 text-sm">♥</span>
            <span>in India</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
