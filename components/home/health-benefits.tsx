import React from "react";
import { HeartPulse, Zap, ShieldAlert, Activity, Lightbulb } from "lucide-react";

const benefits = [
  { name: "Heart Health", icon: HeartPulse },
  { name: "Energy", icon: Zap },
  { name: "Immunity", icon: ShieldAlert },
  { name: "Digestion", icon: Activity },
  { name: "Brain Development", icon: Lightbulb },
];

export default function HealthBenefits() {
  return (
    <section id="blog" className="py-24 bg-white border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="space-y-2 mb-16 text-center">
          <span className="font-cursive text-2xl text-sky-600 font-bold block">
            Nourish Your Body
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-slate-800 leading-tight">
            Health Benefits
          </h2>
        </div>

        {/* 5 Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 lg:gap-8">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx} 
              className="bg-sky-50 border border-sky-100 rounded-2xl p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 group"
            >
              <div className="w-16 h-16 rounded-full bg-white border border-sky-100 text-[#0078BE] flex items-center justify-center mb-4 group-hover:bg-[#0078BE] group-hover:text-white transition-colors">
                <benefit.icon className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-slate-800 text-lg">
                {benefit.name}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
