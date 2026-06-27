import React from "react";
import { Leaf, Flame, Star, Droplet, ShieldAlert, HeartPulse } from "lucide-react";

const cards = [
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

const sidePoints = [
  {
    title: "Rich in Good Fats",
    desc: "Essential healthy fatty acids",
    icon: Droplet
  },
  {
    title: "Boosts Immunity",
    desc: "Loaded with natural antioxidants",
    icon: ShieldAlert
  },
  {
    title: "Good for Heart",
    desc: "Supports active cardiovascular health",
    icon: HeartPulse
  }
];

export default function WhyChooseUs() {
  return (
    <section className="py-24 bg-[#FAF6F0] border-b border-amber-100/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="space-y-2 mb-16 text-center">
          <span className="font-cursive text-2xl text-amber-600 font-bold block">
            Why Daily Cool Ghee
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#2E271E] leading-tight">
            Kyun Hai Hum Alag?
          </h2>
        </div>

        {/* Two Equal Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: 3 Core Benefits */}
          <div className="space-y-6">
            <h3 className="text-lg font-serif font-bold text-[#2E271E] pb-2 border-b border-amber-150/30 uppercase tracking-wide">
              Core Benefits
            </h3>
            <div className="space-y-4">
              {cards.map((card, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-amber-100/40 rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100/60 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors">
                    <card.icon className="w-5.5 h-5.5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-[#2E271E] text-base">
                      {card.title}
                    </h4>
                    <p className="text-xs text-[#5A4F43] leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center md:justify-start pt-4">
              <a
                href="#shop"
                className="bg-[#0078BE] hover:bg-[#0067a5] text-white font-extrabold px-10 py-4 rounded-full text-xs uppercase tracking-widest transition shadow-lg shadow-sky-500/20 active:scale-95 inline-block"
              >
                Order Now
              </a>
            </div>
          </div>

          {/* Right Column: 3 Health Benefits */}
          <div className="space-y-6">
            <h3 className="text-lg font-serif font-bold text-[#2E271E] pb-2 border-b border-amber-150/30 uppercase tracking-wide">
              Health &amp; Nutrition
            </h3>
            <div className="space-y-4">
              {sidePoints.map((pt, idx) => (
                <div 
                  key={idx} 
                  className="bg-white border border-amber-100/40 rounded-2xl p-5 flex items-start gap-4 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100/60 text-amber-700 flex items-center justify-center shrink-0 group-hover:bg-amber-100 transition-colors">
                    <pt.icon className="w-5.5 h-5.5" />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-serif font-bold text-[#2E271E] text-base">
                      {pt.title}
                    </h4>
                    <p className="text-xs text-[#5A4F43] leading-relaxed">
                      {pt.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
