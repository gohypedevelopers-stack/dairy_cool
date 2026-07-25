"use client";

import React, { useState } from "react";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import { Truck, PackageCheck, Clock, MapPin, ShieldCheck, MessageCircle } from "lucide-react";

export default function ShippingPolicyPage() {
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
              Express Pan-India Delivery
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-black text-slate-900">Shipping &amp; Delivery Policy</h1>
            <p className="text-slate-600 max-w-xl mx-auto text-base">
              From our village mud chulhas in Jansiwana directly to your kitchen table—safely, securely, and swiftly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-[#0078BE] flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">24-Hour Dispatch</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Orders placed before 2:00 PM are packed and handed over to express courier partners on the exact same day.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center mx-auto">
                <PackageCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">Glass-Safe Packing</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Every glass jar is shielded in 3-layer protective bubble wrap and nested inside heavy-duty corrugated export boxes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-amber-100 shadow-sm space-y-3 text-center">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-slate-900">28,000+ PIN Codes</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We deliver across India through premier courier networks including BlueDart, Delhivery, DTDC, and Express Mail.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 border border-amber-100 shadow-sm space-y-8 text-slate-600 text-sm md:text-base leading-relaxed">
            
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-black text-slate-900 flex items-center gap-2.5 border-b border-slate-100 pb-4">
                <Truck className="w-6 h-6 text-[#0078BE]" />
                <span>Estimated Delivery Timelines</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-sky-50/70 border border-sky-100 p-5 rounded-2xl">
                  <h4 className="font-serif font-bold text-slate-900 text-base mb-1">Delhi - NCR Region</h4>
                  <p className="text-xs text-slate-500 mb-2">Noida, Greater Noida, Delhi, Gurgaon, Ghaziabad, Faridabad</p>
                  <span className="inline-block bg-[#0078BE] text-white font-extrabold text-xs px-3 py-1 rounded-full">
                    24 to 48 Hours
                  </span>
                </div>

                <div className="bg-amber-50/70 border border-amber-100 p-5 rounded-2xl">
                  <h4 className="font-serif font-bold text-slate-900 text-base mb-1">Rest of India (Pan-India)</h4>
                  <p className="text-xs text-slate-500 mb-2">Mumbai, Bangalore, Hyderabad, Chennai, Kolkata, Pune &amp; more</p>
                  <span className="inline-block bg-amber-600 text-white font-extrabold text-xs px-3 py-1 rounded-full">
                    3 to 5 Business Days
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-slate-900">Shipping Charges &amp; COD</h3>
              <p>
                We offer <strong className="text-slate-900">Free Express Shipping</strong> on all twin-pack combo orders and orders above ₹999. For single jar orders below ₹999, a nominal subsidized shipping fee of ₹49 is applied at checkout. Cash on Delivery (COD) is available nationwide with zero extra COD handling fees.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-slate-900">Shipment Tracking</h3>
              <p>
                Once your package leaves our Jansiwana farm hub, you will instantly receive an SMS and WhatsApp notification containing your Air Waybill (AWB) tracking number and a live tracking link. You can also track your parcel directly on our website by visiting the <strong className="text-[#0078BE]">Track Order</strong> page.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-serif font-bold text-lg text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span>Transit Damage Guarantee</span>
              </h3>
              <p>
                Because we use premium glass jars to preserve the chemical-free purity and aroma of our ghee, we take extraordinary care in packaging. In the rare event that a glass jar breaks or leaks during courier transit, simply send us a photograph on WhatsApp within 7 days, and we will send a fresh replacement jar immediately at our expense.
              </p>
            </div>

            <div className="bg-slate-50 border border-slate-200/60 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Need urgent delivery for a puja or family function?</h4>
                <p className="text-xs text-slate-500 mt-0.5">Message us on WhatsApp to check same-day express delivery options in Delhi-NCR.</p>
              </div>
              <a
                href="https://wa.me/9716003060?text=Hello%20Dairy%20Cool!%20I%20have%20an%20urgent%20shipping%20request."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#0078BE] hover:bg-[#0066a1] text-white font-extrabold px-6 py-3 rounded-xl text-xs uppercase tracking-wider shadow-md hover:scale-105 transition flex items-center gap-2 shrink-0 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contact Shipping Desk</span>
              </a>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
