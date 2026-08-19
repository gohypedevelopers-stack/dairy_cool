import React from "react";
import Image from "next/image";
import { Leaf, Flame, Star, Droplet, ShieldAlert, HeartPulse } from "lucide-react";
import Link from "next/link";

const coreBenefits = [
  {
    title: "Bilona Method",
    desc: "100% traditional bilona process",
    icon: Flame
  },
  {
    title: "Pure & Natural",
    desc: "Sirf 1 ingredient - Shuddh makkhan",
    icon: Leaf
  },
  {
    title: "Rich Aroma",
    desc: "Lajawab khushboo aur swad",
    icon: Star
  }
];

const healthBenefits = [
  {
    title: "Rich in Good Fats",
    desc: "Essential healthy fatty acids for nourishment",
    icon: Droplet
  },
  {
    title: "Pure Energy Source",
    desc: "Provides natural, sustained daily energy",
    icon: ShieldAlert
  },
  {
    title: "Aromatic Goodness",
    desc: "Supports traditional balanced lifestyle",
    icon: HeartPulse
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#FAF6F0] overflow-hidden relative border-t border-sky-100">
      
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-[600px] bg-gradient-to-bl from-sky-100/40 to-transparent opacity-70 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/4 h-[400px] bg-gradient-to-tr from-sky-100/40 to-transparent opacity-70 pointer-events-none" />
      
      <div className="w-full max-w-[1300px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-20 max-w-2xl mx-auto">
          <span className="font-cursive text-2xl text-[#0078BE] font-bold block">
            Why DAIRY COOL Ghee
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-black text-[#2E271E] leading-tight">
            Kyun Hai <span className="text-[#0284c7]">Hum Alag?</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
          
          {/* Left Column: Core Benefits */}
          <div className="flex-1 w-full space-y-8 lg:space-y-6">
            <h3 className="text-center lg:text-right text-sm font-bold text-amber-600/80 uppercase tracking-[0.2em] mb-4 lg:mb-6">
              Core Benefits
            </h3>
            <div className="space-y-5">
              {coreBenefits.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group bg-white/80 backdrop-blur-sm p-4 rounded-3xl flex flex-col sm:flex-row lg:flex-row-reverse items-center lg:items-center gap-4 lg:gap-5 text-center lg:text-right border border-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 shrink-0 rounded-[1.25rem] bg-gradient-to-br from-amber-50 to-amber-100 text-amber-600 flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-amber-200/50 transition-all duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-black text-lg text-slate-900 group-hover:text-amber-700 transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-[13px] leading-relaxed max-w-[280px] mx-auto lg:ml-auto lg:mr-0">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center Column: Product Image Focus */}
          <div className="w-full lg:w-[420px] shrink-0 relative flex justify-center py-6 lg:py-0 overflow-hidden sm:overflow-visible">
            {/* Elegant Glow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] sm:w-[300px] sm:h-[300px] lg:w-[380px] lg:h-[380px] bg-gradient-to-tr from-amber-200/50 to-sky-200/50 rounded-full blur-[50px] opacity-80 pointer-events-none" />
            
            {/* The Image Container - Styled beautifully */}
            <div className="relative w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] lg:w-[380px] lg:h-[380px] rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden border-6 sm:border-8 border-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] transform group-hover:scale-105 transition-transform duration-700">
              <Image 
                src="/images/buffalo_ghee_single.png"
                alt="DAIRY COOL Pure Bilona Ghee"
                fill
                className="object-cover hover:scale-110 transition-transform duration-1000 ease-out"
                priority
              />
              {/* Inner shadow overlay for depth */}
              <div className="absolute inset-0 rounded-[2rem] sm:rounded-[2.5rem] shadow-[inset_0_0_20px_rgba(0,0,0,0.05)] pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Health & Nutrition */}
          <div className="flex-1 w-full space-y-8 lg:space-y-6">
            <h3 className="text-center lg:text-left text-sm font-bold text-[#0284c7]/80 uppercase tracking-[0.2em] mb-4 lg:mb-6">
              Health & Nutrition
            </h3>
            <div className="space-y-5">
              {healthBenefits.map((item, idx) => (
                <div 
                  key={idx} 
                  className="group bg-white/80 backdrop-blur-sm p-4 rounded-3xl flex flex-col sm:flex-row items-center lg:items-center gap-4 lg:gap-5 text-center lg:text-left border border-white shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="w-14 h-14 shrink-0 rounded-[1.25rem] bg-gradient-to-br from-sky-50 to-sky-100 text-[#0284c7] flex items-center justify-center shadow-inner group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-sky-200/50 transition-all duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-black text-lg text-slate-900 group-hover:text-[#0284c7] transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-[13px] leading-relaxed max-w-[280px] mx-auto lg:ml-0 lg:mr-auto">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom CTA */}
        <div className="mt-20 flex justify-center">
          <Link
            href="/#shop"
            className="group relative inline-flex items-center justify-center gap-3 px-12 py-4 rounded-full bg-[#0284c7] hover:bg-[#0274b3] text-white font-black text-sm uppercase tracking-widest overflow-hidden shadow-[0_8px_20px_rgba(2,132,199,0.3)] hover:shadow-[0_12px_30px_rgba(2,132,199,0.4)] transition-all hover:-translate-y-1"
          >
            <span className="relative z-10">Order Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform z-0" />
          </Link>
        </div>

      </div>
    </section>
  );
}
