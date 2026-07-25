"use client";

import React, { useState } from "react";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import { Lock, EyeOff, Shield, Database, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicyPage() {
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
              100% Secure &amp; Confidential
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-black text-slate-900">Privacy Policy</h1>
            <p className="text-slate-600 max-w-xl mx-auto text-base">
              We respect your personal privacy as much as we value farm purity. Here is exactly how we protect and manage your data.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0078BE] flex items-center justify-center mx-auto">
                <Lock className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">SSL Encryption</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                All website traffic and checkout communications are encrypted using industry-standard 256-bit SSL security.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mx-auto">
                <EyeOff className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Zero Spam Promise</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We never bombard you with automated spam emails or irrelevant promotional SMS messages. We respect your peace.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">No Data Selling</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We never sell, rent, or trade your personal contact details or order history to any third-party marketing agencies.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 border border-amber-100 shadow-sm space-y-8 text-slate-600 text-sm md:text-base leading-relaxed">
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-black text-slate-900 flex items-center gap-2.5 border-b border-slate-100 pb-4">
                <Database className="w-6 h-6 text-[#0078BE]" />
                <span>Information We Collect &amp; How We Use It</span>
              </h2>
              <p>
                When you place an order for Bilona Ghee on Dairy Cool or communicate with our support desk via WhatsApp, we collect only the necessary information required to fulfill and deliver your package safely to your doorstep.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-slate-900">1. Personal Information Collected</h3>
              <ul className="space-y-2 list-none pl-0">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0078BE] shrink-0 mt-1" />
                  <span><strong>Contact Details:</strong> Your Full Name, Phone Number, WhatsApp Number, and Email Address.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0078BE] shrink-0 mt-1" />
                  <span><strong>Delivery Address:</strong> Complete postal address including PIN code and landmark for courier dispatch.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0078BE] shrink-0 mt-1" />
                  <span><strong>Order Preferences:</strong> Products selected, jar sizes, and any specific delivery instructions.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-slate-900">2. Purpose of Information Use</h3>
              <p>
                Your information is strictly utilized for:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-slate-600 text-sm">
                <li>Processing, packing, and dispatching your artisanal ghee orders from our village farm.</li>
                <li>Sharing live shipment tracking links and delivery status updates via SMS or WhatsApp.</li>
                <li>Providing customer support and responding to your queries regarding product usage or storage.</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-slate-900">3. Third-Party Courier Partners</h3>
              <p>
                To deliver your parcel across India, we share your delivery address and phone number exclusively with verified logistics partners (such as BlueDart, Delhivery, DTDC, or India Post) solely for the purpose of package delivery.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-slate-900">4. Data Deletion Rights</h3>
              <p>
                You have absolute ownership over your data. If you wish to view, update, or completely erase your customer profile from our farm records, simply send us a message on WhatsApp at <strong className="text-slate-800">+91 9716003060</strong> or email <strong className="text-[#0078BE]">support@dairycoolfarm.com</strong> with the subject line &ldquo;Data Deletion Request&rdquo;. We will process your request within 24 hours.
              </p>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
