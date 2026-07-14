import React from "react";
import { Droplet, Utensils, RefreshCw, Snowflake, Flame, Award } from "lucide-react";

const steps = [
  { 
    name: "Fresh Milk", 
    icon: Droplet,
    desc: "We start with pure, fresh milk sourced directly from healthy cows on our farms."
  },
  { 
    name: "Dahi (Curd)", 
    icon: Utensils,
    desc: "The milk is boiled in earthen pots and naturally cultured into thick, probiotic-rich curd."
  },
  { 
    name: "Bilona Churning", 
    icon: RefreshCw,
    desc: "The curd is churned bidirectionally using a traditional wooden bilona before dawn."
  },
  { 
    name: "Makhan Separation", 
    icon: Snowflake,
    desc: "Continuous churning separates the rich, pure butter (Makhan) from the buttermilk."
  },
  { 
    name: "Slow Heating", 
    icon: Flame,
    desc: "The Makhan is slow-heated over a low flame using traditional mud chulhas (hearths)."
  },
  { 
    name: "Pure Bilona Ghee", 
    icon: Award,
    desc: "The result is 100% pure, golden, granular Bilona Ghee with an authentic aroma."
  },
];

export default function BilonaProcessSteps() {
  return (
    <section id="bilona-process" className="py-24 bg-sky-50/50 border-b border-sky-100/50 relative overflow-hidden">
      
      {/* Decorative background blur */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-sky-200/30 rounded-full blur-3xl translate-y-1/2 translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="space-y-4 mb-20 text-center max-w-2xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-sky-100 text-[#0078BE] font-extrabold text-[11px] uppercase tracking-widest shadow-sm">
            Authentic & Traditional
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-black text-slate-800 leading-tight">
            The Bilona Process
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Every drop of our ghee is crafted using the ancient Vedic process. We never use machines or raw cream, ensuring maximum nutrition and taste.
          </p>
        </div>

        {/* 3x2 Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative group bg-white p-8 rounded-3xl border border-sky-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
            >
              {/* Background Number Watermark */}
              <div className="absolute -right-4 -bottom-8 text-[120px] font-black text-sky-50 leading-none group-hover:text-sky-100/50 transition-colors pointer-events-none">
                0{index + 1}
              </div>

              {/* Icon */}
              <div className="relative w-16 h-16 rounded-2xl bg-sky-50 flex items-center justify-center text-[#0078BE] mb-6 group-hover:bg-[#0078BE] group-hover:text-white transition-all duration-300 shadow-sm border border-sky-100 group-hover:border-[#0078BE]">
                <step.icon className="w-8 h-8" />
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-[#0078BE] transition-colors font-serif">
                  {step.name}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed group-hover:text-slate-700">
                  {step.desc}
                </p>
              </div>

              {/* Progress Line indicating next step (except last) */}
              {index < steps.length - 1 && (
                <div className="absolute top-16 right-0 w-8 h-[2px] bg-sky-100 hidden lg:block" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
