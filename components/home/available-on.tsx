import React from "react";
import Image from "next/image";
import { Star, ShieldCheck, Truck, ArrowUpRight, CheckCircle2 } from "lucide-react";

export default function AvailableOn() {
  return (
    <section className="py-20 bg-[#FAF8F5] border-y border-amber-100/40">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-12">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#0284c7] block">
            Online Store Availability
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-slate-800 tracking-tight">
            Order Dairy Cool Ghee On <span className="text-[#0284c7]">Amazon</span>
          </h2>
          <p className="text-slate-600 text-sm md:text-base max-w-lg mx-auto font-normal leading-relaxed">
            Get authentic Dairy Cool Buffalo Bilona Ghee by Kamlesh Gurjari delivered straight to your home via Amazon India.
          </p>
        </div>

        {/* Clean Marketplace Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow duration-300 overflow-hidden">
          <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            
            {/* Left: Product Image & Amazon Logo directly above */}
            <div className="md:col-span-5 flex flex-col items-center gap-3">
              
              {/* Amazon Logo Container JUST ABOVE IMAGE - FULL SIZE */}
              <div className="relative h-14 w-52 sm:w-60 bg-white rounded-xl border-2 border-slate-300 shadow-sm flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/amazon.jpg"
                  alt="Amazon India Official Partner"
                  fill
                  className="object-contain scale-[2.3]"
                  priority
                />
              </div>

              <div className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-xl bg-[#FAF8F5] border border-slate-100 p-4 flex items-center justify-center">
                <Image
                  src="/images/buffalo_ghee_single.png"
                  alt="Dairy Cool Buffalo Bilona Ghee on Amazon"
                  fill
                  className="object-contain p-2"
                  priority
                />
              </div>
              
              <span className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Delivered by Amazon India
              </span>
            </div>

            {/* Right: Real Listing Info & Action */}
            <div className="md:col-span-7 space-y-5 text-left">
              
              <div className="flex items-center justify-between flex-wrap gap-2 pb-2 border-b border-slate-100">
                <span className="text-xs text-amber-900 font-semibold bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                  Official Amazon Store Listing
                </span>
              </div>

              {/* Exact Amazon Product Title */}
              <div className="space-y-2">
                <h3 className="font-serif font-medium text-slate-900 text-lg sm:text-xl leading-snug">
                  Dairy Cool Buffalo Bilona Ghee by Kamlesh Gurjari
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Hand Churned Cultured Butter • Traditional Low Heat Method (28°C) • Blend of Authentic Fragrance &amp; Flavour.
                </p>
              </div>

              {/* Pricing & Offer */}
              <div className="flex items-baseline gap-3">
                <span className="text-sm font-medium text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-100">-26%</span>
                <span className="text-2xl font-serif font-semibold text-slate-900">₹1,490</span>
                <span className="text-xs text-slate-400 line-through">M.R.P.: ₹2,000</span>
                <span className="text-xs text-slate-500 font-normal">(₹149 / 100g)</span>
              </div>

              {/* Available Sizes Pills */}
              <div className="space-y-1.5 pt-1">
                <span className="text-xs text-slate-500 font-medium block">Available Sizes on Amazon:</span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="bg-sky-50 text-[#0284c7] border border-sky-200 font-medium px-2.5 py-1 rounded-md">1 Kg (₹1,490)</span>
                  <span className="bg-slate-50 text-slate-700 border border-slate-200 font-medium px-2.5 py-1 rounded-md">2 Kg (₹2,949)</span>
                  <span className="bg-slate-50 text-slate-700 border border-slate-200 font-medium px-2.5 py-1 rounded-md">5 Kg (₹7,399)</span>
                  <span className="bg-slate-50 text-slate-700 border border-slate-200 font-medium px-2.5 py-1 rounded-md">200 Gm (₹299)</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center gap-4 flex-wrap text-xs text-slate-600 font-normal pt-1">
                <div className="flex items-center gap-1.5 text-slate-600">
                  <Truck className="w-4 h-4 text-[#0284c7]" />
                  <span>Free Delivery</span>
                </div>

                <div className="flex items-center gap-1.5 text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Secure Transaction</span>
                </div>
              </div>

              {/* Professional Amazon CTA */}
              <div className="pt-2">
                <a
                  href="https://www.amazon.in/dp/B0GN2WVHZK?th=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#FF9900] hover:bg-[#e68a00] text-slate-900 font-semibold text-sm px-7 py-3 rounded-xl shadow-2xs hover:shadow-sm transition-all duration-200 w-full sm:w-auto text-center cursor-pointer"
                >
                  <span>Buy Now on Amazon.in</span>
                  <ArrowUpRight className="w-4 h-4 text-slate-900" />
                </a>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}





