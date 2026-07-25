"use client";

import React, { useState } from "react";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import { ShieldCheck, RefreshCw, DollarSign, MessageCircle, AlertCircle } from "lucide-react";

export default function ReturnPolicyPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-slate-800 flex flex-col antialiased">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <main className="flex-1 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[#0078BE] font-extrabold text-xs uppercase tracking-widest bg-sky-100 px-3.5 py-1.5 rounded-full inline-block">
              Customer First Guarantee
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-black text-slate-900">Return &amp; Refund Policy</h1>
            <p className="text-slate-600 max-w-xl mx-auto text-base">
              At Dairy Cool, we stand by the absolute purity of our Vedic Bilona Ghee. Your satisfaction and trust are our highest priorities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mx-auto">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">100% Purity Promise</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                If you are ever unsatisfied with the aroma, grainy texture, or quality of our ghee, we will resolve it immediately.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0078BE] flex items-center justify-center mx-auto">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Free Replacement</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Received a damaged or leaked glass jar due to courier mishandling? We ship a fresh replacement jar within 24 hours at zero extra cost.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <DollarSign className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Instant Refunds</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Approved refunds are processed instantly to your original payment method (UPI, Bank Account, or Card) within 2-3 business days.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 border border-amber-100 shadow-sm space-y-8">
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-black text-slate-900 flex items-center gap-2.5">
                <AlertCircle className="w-6 h-6 text-amber-600" />
                <span>How to Request a Replacement or Refund</span>
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                We have made our claim process completely seamless and paperless. You do not need to ship the damaged jar back to our farm. Simply follow these 3 easy steps:
              </p>
            </div>

            <div className="space-y-6 border-t border-slate-100 pt-6">
              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-[#0078BE] text-white font-black text-sm flex items-center justify-center shrink-0">1</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Take a Photo or Video</h4>
                  <p className="text-xs md:text-sm text-slate-600 mt-1">If your glass jar arrived damaged, leaked, or broken during transit, click a clear photograph or short video showing the box and the jar.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-[#0078BE] text-white font-black text-sm flex items-center justify-center shrink-0">2</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Send to our WhatsApp Support</h4>
                  <p className="text-xs md:text-sm text-slate-600 mt-1">Message our direct customer support helpline on WhatsApp at <strong className="text-slate-800">+91 9716003060</strong> along with your Order ID within 7 days of delivery.</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="w-8 h-8 rounded-full bg-[#0078BE] text-white font-black text-sm flex items-center justify-center shrink-0">3</span>
                <div>
                  <h4 className="font-bold text-slate-900 text-base">Instant Resolution</h4>
                  <p className="text-xs md:text-sm text-slate-600 mt-1">Our farm team will review your message within 2 hours and immediately dispatch a complimentary replacement jar or initiate a 100% refund as per your preference.</p>
                </div>
              </div>
            </div>

            <div className="bg-amber-50/70 border border-amber-200/60 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-amber-950 text-sm">Need immediate help with an existing order?</h4>
                <p className="text-xs text-amber-800 mt-0.5">Our support desk is active every day from 10:00 AM to 7:00 PM.</p>
              </div>
              <a
                href="https://wa.me/9716003060?text=Hello%20Dairy%20Cool!%20I%20need%20help%20with%20my%20order%20return/replacement."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-md hover:scale-105 transition flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Us Now</span>
              </a>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
