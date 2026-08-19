import React from "react";
import { WhatsAppIcon } from "@/components/icons";

interface CtaBannerProps {
  onWhatsAppDirect: (message: string) => void;
}

export default function CtaBanner({ onWhatsAppDirect }: CtaBannerProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div 
          className="rounded-[2rem] p-8 md:p-12 text-center text-white space-y-6 shadow-xl relative overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.7)), url('/images/DSC_5500.JPG')`
          }}
        >
          {/* Decorative circle */}
          <div className="absolute -top-12 -right-12 w-36 h-36 bg-white/5 rounded-full" />

          <span className="bg-white/10 px-4 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest border border-white/5 inline-block">
            Organic Farm Freshness
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold max-w-2xl mx-auto leading-snug text-white">
            Shuddh Bilona Ghee Ghar Mangwana Chahte Hain?
          </h2>
          <p className="text-sky-100/80 max-w-md mx-auto text-xs md:text-sm leading-relaxed">
            Feed your family the pristine nutrition of authentic, zero-chemical Ghee, churned bidirectionally with wooden churns.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href="#shop"
              className="w-full sm:w-auto bg-white hover:bg-sky-50 text-primary font-extrabold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-lg"
            >
              Order Direct Online
            </a>
            <button
              onClick={() => onWhatsAppDirect("Hello! I want to order Pure Bilona Ghee from your bottom banner.")}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 active:scale-95 text-white font-extrabold px-6 py-3.5 rounded-lg text-xs uppercase tracking-wider transition shadow-lg shadow-green-500/20 cursor-pointer whitespace-nowrap"
            >
              WhatsApp Order
              <WhatsAppIcon className="w-4.5 h-4.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
