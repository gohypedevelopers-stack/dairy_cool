import React, { useState } from "react";
import { HeartPulse, Zap, ShieldAlert, Activity, Lightbulb, ArrowRight, X, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const benefits = [
  {
    name: "Heart Health & Good Fats",
    icon: HeartPulse,
    summary: "Rich in Omega-3 and Omega-9 essential fatty acids that support cardiovascular wellness.",
    article: "Vedic Bilona Ghee is packed with healthy monounsaturated Omega-3s and Omega-9s. Unlike refined seed oils or industrially processed butter, traditional A2 buffalo bilona ghee contains conjugated linoleic acid (CLA), which actively helps in reducing bad cholesterol (LDL) while boosting good HDL cholesterol. Regular consumption in moderation nourishes the heart muscles and maintains healthy arterial elasticity.",
    readTime: "3 min read",
    tag: "Ayurvedic Cardiology"
  },
  {
    name: "Instant Energy Boost",
    icon: Zap,
    summary: "Loaded with Medium Chain Triglycerides (MCTs) for immediate, sustained vitality.",
    article: "Feeling fatigued? Pure bilona ghee consists primarily of Medium Chain Triglycerides (MCTs), which are directly absorbed by the liver and burned as pure, clean kinetic energy rather than stored as adipose body fat. Athletes and yogis have relied on a spoonful of morning ghee in warm water or coffee for centuries to power through intense physical and mental exertion.",
    readTime: "2 min read",
    tag: "Metabolism"
  },
  {
    name: "Robust Natural Immunity",
    icon: ShieldAlert,
    summary: "Abundant in fat-soluble Vitamins A, D, E, and K that strengthen immune defenses.",
    article: "Your immune system requires fat-soluble vitamins to produce antibodies and fight off seasonal pathogens. Daily Cool Bilona Ghee is naturally fortified by pasture-raised buffalo milk with Vitamins A, D, E, and K2. Furthermore, its butyric acid content promotes a robust gut mucosal barrier, preventing inflammation and protecting against viral infections.",
    readTime: "4 min read",
    tag: "Immunity Defense"
  },
  {
    name: "Gut Health & Digestion",
    icon: Activity,
    summary: "High butyrate content stimulates digestive enzymes and soothes stomach lining.",
    article: "In Ayurveda, digestion (Agni) is the root of all health. Bilona ghee is one of the highest natural dietary sources of butyric acid—a short-chain fatty acid that serves as the primary energy source for your intestinal colon cells. It lubricates the gastrointestinal tract, heals leaky gut symptoms, prevents acid reflux, and ensures smooth daily bowel movements.",
    readTime: "3 min read",
    tag: "Gut Microbiome"
  },
  {
    name: "Brain & Cognitive Enhancement",
    icon: Lightbulb,
    summary: "Nourishes neurons, improves memory retention, and enhances mental clarity (Medhya).",
    article: "Known in ancient Ayurvedic texts as a 'Medhya Rasayana' (brain tonic), pure cultured ghee crosses the blood-brain barrier to lubricate neural pathways and sheath nerve fibers in myelin. It supports sharper memory recall, improves focus during deep work, and combats age-related cognitive decline and brain fog.",
    readTime: "3 min read",
    tag: "Cognitive Focus"
  },
];

export default function HealthBenefits() {
  const [selectedBenefit, setSelectedBenefit] = useState<typeof benefits[0] | null>(null);

  return (
    <section id="blog" className="py-24 bg-white border-b border-sky-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="space-y-3 mb-16 text-center max-w-3xl mx-auto">
          <span className="font-cursive text-2xl text-[#0078BE] font-bold block">
            Nourish Your Body & Mind
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 leading-tight">
            Ayurvedic Health Benefits
          </h2>
          <p className="text-slate-600 text-base md:text-lg">
            Click on any health benefit below to explore the scientific and Ayurvedic research behind pure cultured Bilona Ghee.
          </p>
        </div>

        {/* 5 Column / Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {benefits.map((benefit, idx) => (
            <div 
              key={idx} 
              onClick={() => setSelectedBenefit(benefit)}
              className="bg-sky-50/70 border border-sky-100 rounded-3xl p-6 flex flex-col justify-between items-center text-center shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:bg-white hover:border-sky-300 transition-all duration-300 group cursor-pointer"
            >
              <div className="space-y-4 flex flex-col items-center">
                <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white text-[#0078BE] px-3 py-1 rounded-full border border-sky-100 shadow-2xs">
                  {benefit.tag}
                </span>
                
                <div className="w-16 h-16 rounded-2xl bg-white border border-sky-100 text-[#0078BE] flex items-center justify-center group-hover:bg-[#0078BE] group-hover:text-white transition-all duration-500 shadow-sm group-hover:scale-110">
                  <benefit.icon className="w-8 h-8" />
                </div>

                <h3 className="font-serif font-black text-slate-900 text-lg group-hover:text-[#0078BE] transition-colors">
                  {benefit.name}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {benefit.summary}
                </p>
              </div>

              <button 
                type="button"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-extrabold text-[#0078BE] bg-white group-hover:bg-[#0078BE] group-hover:text-white px-4 py-2 rounded-full border border-sky-200 transition-all duration-300 shadow-2xs"
              >
                <span>Read More</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* Interactive Article Modal */}
      {selectedBenefit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full p-5 sm:p-8 md:p-10 shadow-2xl border border-sky-100 relative max-h-[90vh] overflow-y-auto animate-scaleUp">
            
            {/* Background Blob */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-sky-100/50 rounded-full blur-3xl pointer-events-none" />
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedBenefit(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer z-20 shadow-sm"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3">
                <span className="bg-sky-100 text-[#0078BE] font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {selectedBenefit.tag}
                </span>
                <span className="text-xs font-bold text-slate-400">{selectedBenefit.readTime}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-[#0078BE] text-white flex items-center justify-center shadow-md shrink-0">
                  <selectedBenefit.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl md:text-3xl font-serif font-black text-slate-900 leading-tight">
                  {selectedBenefit.name}
                </h3>
              </div>

              <div className="bg-[#FAF6F0] border border-amber-100 rounded-2xl p-5 text-sm font-medium text-slate-700 leading-relaxed italic">
                &ldquo;{selectedBenefit.summary}&rdquo;
              </div>

              <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed">
                <p>{selectedBenefit.article}</p>
                <div className="flex items-start gap-2 text-xs font-bold text-amber-800 bg-amber-50/80 p-3.5 rounded-xl border border-amber-200/50">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Verified by Traditional Vedic Literature & Modern Nutritional Sciences. Recommended daily serving: 1-2 teaspoons with warm meals.</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedBenefit(null)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Close Article
                </button>
                <Link
                  href="/#shop"
                  onClick={() => setSelectedBenefit(null)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0078BE] hover:bg-[#0066a1] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
                >
                  <span>Order Bilona Ghee Now</span>
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
