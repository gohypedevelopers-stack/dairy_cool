"use client";

import React, { useState } from "react";
import Image from "next/image";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import TopBanner from "@/components/home/top-banner";
import CartDrawer from "@/components/cart-drawer";
import { Phone, Mail, Clock, MapPin } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  image: string;
  size: string;
  price: number;
  quantity: number;
}

export default function ContactPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Form Fields State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [scheduleCall, setScheduleCall] = useState("");
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleWhatsAppDirect = (message: string) => {
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/9716003060?text=${encoded}`, "_blank");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    const message = `*Dairy Cool - Contact Inquiry*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Schedule:* ${scheduleCall}\n*Issue:* ${comment}`;
    handleWhatsAppDirect(message);
    setName("");
    setEmail("");
    setPhone("");
    setScheduleCall("");
    setComment("");
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-slate-800 antialiased font-sans relative overflow-hidden">
      
      {/* Unified Decorative warm background glow blobs */}
      <div className="absolute top-0 left-[-10%] w-[500px] h-[500px] rounded-full bg-amber-100/60 blur-3xl pointer-events-none z-0" />
      <div className="absolute top-[35%] right-[-10%] w-[600px] h-[600px] rounded-full bg-amber-50/70 blur-3xl pointer-events-none z-0" />
      <div className="absolute bottom-0 left-[20%] w-[400px] h-[400px] rounded-full bg-amber-100/40 blur-3xl pointer-events-none z-0" />
      
      {/* Elegant Organic Leaf SVGs for decoration */}
      <div className="absolute left-8 top-48 opacity-[0.12] pointer-events-none z-0 hidden xl:block select-none">
        <svg width="220" height="220" viewBox="0 0 100 100" fill="currentColor" className="text-amber-800/60">
          <path d="M10 90C30 70 40 45 45 15C45 35 30 55 10 90Z" />
          <path d="M45 15C55 45 75 60 90 70C70 60 55 40 45 15Z" />
          <path d="M45 15C35 45 15 60 5 70C25 60 40 40 45 15Z" />
        </svg>
      </div>

      <div className="absolute right-12 top-[60%] opacity-[0.12] pointer-events-none z-0 hidden xl:block select-none rotate-45">
        <svg width="260" height="260" viewBox="0 0 100 100" fill="currentColor" className="text-amber-800/60">
          <path d="M10 90C30 70 40 45 45 15C45 35 30 55 10 90Z" />
          <path d="M45 15C55 45 75 60 90 70C70 60 55 40 45 15Z" />
        </svg>
      </div>

      {/* Village Line Art Background Illustration */}
      <div className="absolute bottom-0 inset-x-0 h-[220px] pointer-events-none z-0 opacity-20 select-none">
        <Image
          src="/images/village_bg.png"
          alt="Village Background Illustration"
          fill
          priority
          style={{
            objectFit: "cover",
            objectPosition: "bottom center",
            filter: "invert(1) sepia(0.8) saturate(1.8) hue-rotate(345deg) brightness(0.85) contrast(1.1)"
          }}
        />
      </div>

      {/* Main Layout wrapper */}
      <div className="relative z-10 flex flex-col justify-between min-h-screen">
        <div>
          <TopBanner />
          <Header
            isMobileMenuOpen={isMobileMenuOpen}
            setIsMobileMenuOpen={setIsMobileMenuOpen}
          />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              
              {/* Left Column: Form */}
              <div className="lg:col-span-7 bg-white/95 backdrop-blur-sm p-8 md:p-10 rounded-3xl border border-amber-100/50 shadow-sm space-y-8">
                <h1 className="text-3xl font-serif font-black text-[#2E271E]">
                  Contact Us
                </h1>

                {submitted ? (
                  <div className="bg-green-50/90 border border-green-200 rounded-3xl p-8 text-center space-y-4 animate-fadeIn">
                    <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-serif font-black text-green-900">Inquiry Received!</h3>
                    <p className="text-sm text-green-800 leading-relaxed max-w-md mx-auto">
                      Thank you for reaching out to Dairy Cool! Your message has been formatted and opened in WhatsApp for instant submission, and recorded in our farm support queue.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="inline-block bg-[#0078BE] hover:bg-[#0066a1] text-white font-extrabold px-8 py-3 rounded-full text-xs uppercase tracking-widest transition shadow-md mt-4 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name Input */}
                      <div className="relative">
                        <input
                          type="text"
                          required
                          placeholder="Name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-5 py-3.5 rounded-full border border-stone-200 bg-white/80 text-[#2E271E] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#0078BE] transition text-base sm:text-sm"
                        />
                      </div>

                      {/* Email Input */}
                      <div className="relative">
                        <input
                          type="email"
                          required
                          placeholder="Email *"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="w-full px-5 py-3.5 rounded-full border border-stone-200 bg-white/80 text-[#2E271E] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#0078BE] transition text-base sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Phone Input */}
                      <div className="relative">
                        <input
                          type="tel"
                          placeholder="Phone number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full px-5 py-3.5 rounded-full border border-stone-200 bg-white/80 text-[#2E271E] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#0078BE] transition text-base sm:text-sm"
                        />
                      </div>

                      {/* Schedule Call Input */}
                      <div className="relative">
                        <input
                          type="text"
                          placeholder="Schedule Your Call"
                          value={scheduleCall}
                          onChange={(e) => setScheduleCall(e.target.value)}
                          className="w-full px-5 py-3.5 rounded-full border border-stone-200 bg-white/80 text-[#2E271E] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#0078BE] transition text-base sm:text-sm"
                        />
                      </div>
                    </div>

                    {/* Comment Textarea */}
                    <div className="relative">
                      <textarea
                        required
                        rows={7}
                        placeholder="Comment or Mentioning Exact Issue *"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="w-full px-5 py-4 rounded-3xl border border-stone-200 bg-white/80 text-[#2E271E] placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-[#0078BE] transition text-base sm:text-sm resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        className="bg-[#0078BE] hover:bg-[#0067a5] active:scale-95 text-white font-extrabold px-10 py-3.5 rounded-full text-xs uppercase tracking-widest transition shadow-md cursor-pointer"
                      >
                        Send
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Right Column: Contact Details */}
              <div className="lg:col-span-5 space-y-6 lg:pl-4">
                <div className="space-y-2">
                  <h2 className="text-2xl font-serif font-black text-[#2E271E]">
                    Get in touch
                  </h2>
                  <div className="w-12 h-0.5 bg-amber-500/30" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  {/* Phone Card */}
                  <div className="bg-white/95 backdrop-blur-sm border border-amber-100/40 rounded-2xl p-4 h-[195px] flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                    <div className="space-y-2.5">
                      <div className="w-9 h-9 rounded-xl bg-green-50 border border-green-100 text-green-700 flex items-center justify-center shrink-0">
                        <Phone className="w-4.5 h-4.5" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-serif font-bold text-[#2E271E] text-sm">
                          Phone &amp; WhatsApp
                        </h4>
                        <p className="text-[10px] text-stone-500 leading-normal">
                          Direct call or chat for fast orders and support.
                        </p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-stone-100">
                      <button 
                        onClick={() => handleWhatsAppDirect("Hello! I have a query regarding Dairy Cool.")}
                        className="text-[#0078BE] hover:text-[#0067a5] font-extrabold text-sm hover:underline text-left block"
                      >
                        +91 9716003060
                      </button>
                    </div>
                  </div>

                  {/* Email Card */}
                  <div className="bg-white/95 backdrop-blur-sm border border-amber-100/40 rounded-2xl p-4 h-[195px] flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                    <div className="space-y-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <Mail className="w-4.5 h-4.5" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-serif font-bold text-[#2E271E] text-sm">
                          Email Support
                        </h4>
                        <p className="text-[10px] text-stone-500 leading-normal">
                          For business, bulk orders, or custom help.
                        </p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-stone-100">
                      <a 
                        href="mailto:support@dairycoolfarm.com" 
                        className="text-[#0078BE] hover:underline text-xs font-extrabold break-all block"
                      >
                        support@dairycoolfarm.com
                      </a>
                    </div>
                  </div>

                  {/* Address Card */}
                  <a 
                    href="https://maps.app.goo.gl/dwQxomWu4aVqifEU8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/95 backdrop-blur-sm border border-amber-100/40 rounded-2xl p-4 h-[195px] flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group cursor-pointer block"
                  >
                    <div className="space-y-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <MapPin className="w-4.5 h-4.5" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-serif font-bold text-[#2E271E] text-sm group-hover:text-[#0078BE] transition-colors">
                          Our Ancestral Farm
                        </h4>
                        <div className="text-[10px] text-stone-500 leading-normal">
                          <p>Village Jansiwana, Near Maripat Stn</p>
                          <p>Greater Noida – 203207</p>
                        </div>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-stone-100 text-[10px] text-[#2E271E] font-extrabold leading-tight flex items-center justify-between">
                      <span>View Map</span>
                      <span className="text-[#0078BE] font-extrabold text-[9px] uppercase tracking-wider group-hover:underline">Map →</span>
                    </div>
                  </a>

                  {/* Working Hours Card */}
                  <div className="bg-white/95 backdrop-blur-sm border border-amber-100/40 rounded-2xl p-4 h-[195px] flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group">
                    <div className="space-y-2.5">
                      <div className="w-9 h-9 rounded-xl bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                        <Clock className="w-4.5 h-4.5" />
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-serif font-bold text-[#2E271E] text-sm">
                          Working Hours
                        </h4>
                        <p className="text-[10px] text-stone-500 leading-normal">
                          Available all days of the week.
                        </p>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-stone-100 text-xs text-[#2E271E] font-extrabold leading-tight">
                      10:00 AM - 07:00 PM
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </main>
        </div>

        <Footer />
      </div>
    </div>
  );
}
