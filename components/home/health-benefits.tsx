"use client";

import React, { useState } from "react";
import { HeartPulse, Zap, ShieldCheck, Activity, Brain, ArrowRight, X, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    name: "Heart Health & Good Fats",
    icon: HeartPulse,
    colorTheme: "from-rose-500/10 to-rose-500/5 text-rose-600 border-rose-200/60 hover:border-rose-400 group-hover:bg-rose-600",
    badgeBg: "bg-rose-50 text-rose-700 border-rose-200",
    iconBg: "bg-rose-100 text-rose-600",
    summary: "Rich in Omega-3 & Omega-9 fatty acids that support heart health and arterial elasticity.",
    article: "Vedic Bilona Ghee is packed with healthy monounsaturated Omega-3s and Omega-9s. Unlike refined seed oils or industrially processed butter, traditional A2 buffalo bilona ghee contains conjugated linoleic acid (CLA), which actively helps in reducing bad cholesterol (LDL) while boosting good HDL cholesterol. Regular consumption in moderation nourishes the heart muscles and maintains healthy arterial elasticity.",
    readTime: "3 min read",
    tag: "Cardiology"
  },
  {
    name: "Instant Sustained Energy",
    icon: Zap,
    colorTheme: "from-amber-500/10 to-amber-500/5 text-amber-600 border-amber-200/60 hover:border-amber-400 group-hover:bg-amber-500",
    badgeBg: "bg-amber-50 text-amber-800 border-amber-200",
    iconBg: "bg-amber-100 text-amber-700",
    summary: "Packed with MCTs that convert directly into clean energy without spiking blood sugar.",
    article: "Feeling fatigued? Pure bilona ghee consists primarily of Medium Chain Triglycerides (MCTs), which are directly absorbed by the liver and burned as pure, clean kinetic energy rather than stored as adipose body fat. Athletes and yogis have relied on a spoonful of morning ghee in warm water or coffee for centuries to power through intense physical and mental exertion.",
    readTime: "2 min read",
    tag: "Metabolism"
  },
  {
    name: "Robust Natural Immunity",
    icon: ShieldCheck,
    colorTheme: "from-emerald-500/10 to-emerald-500/5 text-emerald-600 border-emerald-200/60 hover:border-emerald-400 group-hover:bg-emerald-600",
    badgeBg: "bg-emerald-50 text-emerald-800 border-emerald-200",
    iconBg: "bg-emerald-100 text-emerald-700",
    summary: "Loaded with fat-soluble Vitamins A, D, E & K2 that reinforce immune defenses.",
    article: "Your immune system requires fat-soluble vitamins to produce antibodies and fight off seasonal pathogens. Daily Cool Bilona Ghee is naturally fortified by pasture-raised buffalo milk with Vitamins A, D, E, and K2. Furthermore, its butyric acid content promotes a robust gut mucosal barrier, preventing inflammation and protecting against viral infections.",
    readTime: "4 min read",
    tag: "Immunity"
  },
  {
    name: "Gut Health & Digestion",
    icon: Activity,
    colorTheme: "from-sky-500/10 to-sky-500/5 text-sky-600 border-sky-200/60 hover:border-sky-400 group-hover:bg-sky-600",
    badgeBg: "bg-sky-50 text-sky-800 border-sky-200",
    iconBg: "bg-sky-100 text-sky-700",
    summary: "High butyrate content heals stomach lining and stimulates digestive fire (Agni).",
    article: "In Ayurveda, digestion (Agni) is the root of all health. Bilona ghee is one of the highest natural dietary sources of butyric acid—a short-chain fatty acid that serves as the primary energy source for your intestinal colon cells. It lubricates the gastrointestinal tract, heals leaky gut symptoms, prevents acid reflux, and ensures smooth daily bowel movements.",
    readTime: "3 min read",
    tag: "Gut Health"
  },
  {
    name: "Brain & Focus Tonic",
    icon: Brain,
    colorTheme: "from-indigo-500/10 to-indigo-500/5 text-indigo-600 border-indigo-200/60 hover:border-indigo-400 group-hover:bg-indigo-600",
    badgeBg: "bg-indigo-50 text-indigo-800 border-indigo-200",
    iconBg: "bg-indigo-100 text-indigo-700",
    summary: "Nourishes brain neurons, sharpens memory recall, and combats brain fog.",
    article: "Known in ancient Ayurvedic texts as a 'Medhya Rasayana' (brain tonic), pure cultured ghee crosses the blood-brain barrier to lubricate neural pathways and sheath nerve fibers in myelin. It supports sharper memory recall, improves focus during deep work, and combats age-related cognitive decline and brain fog.",
    readTime: "3 min read",
    tag: "Cognitive"
  },
];

export default function HealthBenefits() {
  const [selectedBenefit, setSelectedBenefit] = useState<typeof benefits[0] | null>(null);

  return (
    <section id="benefits" className="py-20 md:py-28 bg-gradient-to-b from-[#FAF6F0] via-white to-[#FAF6F0] border-y border-amber-100/60 relative overflow-hidden">
      {/* Decorative ambient background glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-4 mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-amber-100/70 border border-amber-200 text-amber-900 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Nourish Your Body & Mind</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 leading-tight">
            Ayurvedic Health Benefits
          </h2>
          <p className="text-slate-600 text-base md:text-lg leading-relaxed">
            Discover how pure, cultured Bilona Ghee transforms your daily vitality with ancient wisdom and proven nutrition.
          </p>
        </div>

        {/* 5 Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedBenefit(benefit)}
              className="bg-white/80 backdrop-blur-sm border border-slate-200/80 rounded-3xl p-6 flex flex-col justify-between items-center text-center shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-[#0078BE]/40 transition-all duration-300 group cursor-pointer relative overflow-hidden"
            >
              {/* Subtle card top gradient line */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-[#0078BE] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="space-y-4 flex flex-col items-center w-full">
                <span className={`text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full border ${benefit.badgeBg} shadow-2xs`}>
                  {benefit.tag}
                </span>
                
                <div className={`w-16 h-16 rounded-2xl ${benefit.iconBg} flex items-center justify-center group-hover:scale-110 group-hover:shadow-md transition-all duration-300`}>
                  <benefit.icon className="w-8 h-8" />
                </div>

                <h3 className="font-serif font-black text-slate-900 text-lg group-hover:text-[#0078BE] transition-colors leading-snug">
                  {benefit.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {benefit.summary}
                </p>
              </div>

              <button 
                type="button"
                className="mt-6 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-[#0078BE] group-hover:text-[#005a90] bg-sky-50 group-hover:bg-[#0078BE] group-hover:text-white w-full py-2.5 rounded-full border border-sky-100 transition-all duration-300 shadow-2xs"
              >
                <span>Explore Science</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Modal */}
      {selectedBenefit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 md:p-10 shadow-2xl border border-amber-100 relative max-h-[90vh] overflow-y-auto animate-scaleUp">
            
            <button 
              onClick={() => setSelectedBenefit(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer z-20 shadow-sm"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3">
                <span className={`font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 border ${selectedBenefit.badgeBg}`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  {selectedBenefit.tag}
                </span>
                <span className="text-xs font-bold text-slate-400">{selectedBenefit.readTime}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl ${selectedBenefit.iconBg} flex items-center justify-center shadow-sm shrink-0`}>
                  <selectedBenefit.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-black text-slate-900 leading-tight">
                  {selectedBenefit.name}
                </h3>
              </div>

              <div className="bg-[#FAF6F0] border border-amber-200/60 rounded-2xl p-5 text-sm font-medium text-slate-700 leading-relaxed italic">
                &ldquo;{selectedBenefit.summary}&rdquo;
              </div>

              <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed">
                <p>{selectedBenefit.article}</p>
                <div className="flex items-start gap-2.5 text-xs font-bold text-amber-900 bg-amber-50 p-4 rounded-2xl border border-amber-200">
                  <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <span>Verified by Traditional Vedic Literature & Modern Nutritional Studies. Recommended daily serving: 1 to 2 teaspoons with warm meals.</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedBenefit(null)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Close
                </button>
                <Link
                  href="/#shop"
                  onClick={() => setSelectedBenefit(null)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0078BE] hover:bg-[#0066a1] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
                >
                  <span>Experience Shuddh Bilona Ghee</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}
