"use client";

import React, { useState } from "react";
import Image from "next/image";
import { HeartPulse, Zap, ShieldCheck, Activity, Sparkles, ArrowUpRight, X, CheckCircle2, BookOpen } from "lucide-react";
import Link from "next/link";

const qualities = [
  {
    id: "fats",
    name: "Hearty Dietary Fats",
    icon: HeartPulse,
    tag: "Nutrition",
    subtitle: "Essential Lipid Balance for Daily Wellness",
    summary: "Rich in natural fatty acid profiles including Omega-3 & Omega-9 suited for balanced traditional diets.",
    highlights: [
      "Naturally slow-churned from cultured dahi, retaining natural fatty acid structures.",
      "Complements traditional Indian meals with wholesome dietary lipids.",
      "Contains no hydrogenated fats, trans-fats, or synthetic additives."
    ],
    article: "Vedic Bilona Ghee is naturally rich in essential fatty acids. Unlike refined cooking oils, traditional A2 bilona ghee is prepared by slow-churning curd, retaining vital lipid profile nutrients that complement a balanced Indian diet when consumed in moderation.",
    readTime: "3 min read"
  },
  {
    id: "energy",
    name: "Sustained Energy Source",
    icon: Zap,
    tag: "Energy",
    subtitle: "Clean, Easy-to-Digest Fuel for Active Lifestyles",
    summary: "Contains easy-to-digest short and medium-chain fatty acids for clean, active daily energy.",
    highlights: [
      "Short and medium-chain fatty acids provide readily available fuel for daily activities.",
      "Traditionally enjoyed with warm milk or rotis in morning meals.",
      "Gentle on the metabolic system without heavy sluggish feelings."
    ],
    article: "Pure bilona ghee consists primarily of short and medium chain fatty acids that are readily absorbed by the body, serving as a rich, clean source of energy. Traditionally enjoyed with warm milk, rotis, or warm water in the morning.",
    readTime: "2 min read"
  },
  {
    id: "purity",
    name: "Pure & Unadulterated Quality",
    icon: ShieldCheck,
    tag: "Purity",
    subtitle: "Pasture-Fed Milk Fortified with Fat-Soluble Vitamins",
    summary: "Naturally rich in fat-soluble vitamins A, D, E, and K derived from pasture-fed livestock milk.",
    highlights: [
      "100% natural fat-soluble vitamins without any artificial fortification.",
      "Sourced exclusively from healthy, free-grazing farm buffaloes.",
      "Lab tested for purity, heavy metals, and zero chemical preservatives."
    ],
    article: "DAIRY COOL Bilona Ghee is prepared using fresh milk from pasture-fed livestock. The traditional bilona process preserves natural fat-soluble vitamins without synthetic fortification or artificial additives.",
    readTime: "4 min read"
  },
  {
    id: "digestion",
    name: "Digestive Comfort",
    icon: Activity,
    tag: "Digestion",
    subtitle: "Ayurvedic Agni Stimulation for Soothing Meals",
    summary: "Contains natural butyric acid, traditionally valued in Ayurveda for soothing daily cooked meals.",
    highlights: [
      "High natural butyrate content soothes and lubricates the digestive tract.",
      "Revered in Ayurveda for kindling Agni (digestive fire) naturally.",
      "Adds rich aroma and digestibility to daily lentil and grain dishes."
    ],
    article: "In Ayurveda, pure ghee is revered for enhancing meal digestion (Agni). Its natural butyrate content makes it easy on the stomach, providing a soothing addition to daily cooked food.",
    readTime: "3 min read"
  },
  {
    id: "heritage",
    name: "Traditional Ayurvedic Nourishment",
    icon: Sparkles,
    tag: "Heritage",
    subtitle: "A Cherished Household Wellness Tradition",
    summary: "Cherished across generations as a daily wellness cornerstone for wholesome Indian cooking.",
    highlights: [
      "Handmade by Kamlesh Gurjari (Dadi) following 30+ years of family tradition.",
      "Cooked slowly on low heat in traditional vessels to achieve golden granularity.",
      "Poured into clean glass jars for authentic taste, aroma, and longevity."
    ],
    article: "For generations, cultured ghee has been an integral cornerstone of Indian household traditions, prized for its rich aroma, golden color, and wholesome culinary benefits.",
    readTime: "3 min read"
  }
];

export default function HealthBenefits() {
  const [activeTabId, setActiveTabId] = useState(qualities[0].id);
  const [modalQuality, setModalQuality] = useState<typeof qualities[0] | null>(null);

  const activeQuality = qualities.find(q => q.id === activeTabId) || qualities[0];

  return (
    <section id="benefits" className="py-20 md:py-24 bg-[#FAF8F5] border-y border-amber-100/40 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-2 mb-12 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0284c7] block">
            Heritage &amp; Wellness
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-medium text-slate-800 tracking-tight">
            Traditional Ghee Qualities
          </h2>
          <p className="text-slate-600 text-sm sm:text-base font-normal leading-relaxed">
            Rooted in centuries of Vedic culinary wisdom, prepared using the traditional hand-churned Bilona method.
          </p>
        </div>

        {/* Top Quality Selector Tabs */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {qualities.map((item) => {
            const isActive = item.id === activeTabId;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTabId(item.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? "bg-[#0284c7] text-white shadow-xs"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200/80 hover:border-slate-300"
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span>{item.name}</span>
              </button>
            );
          })}
        </div>

        {/* Active Feature Spotlight Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-10 shadow-xs transition-all duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Visual Product Card */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative w-full aspect-square max-w-[260px] rounded-xl bg-[#FAF8F5] border border-slate-100 p-4 flex items-center justify-center">
                <Image
                  src="/images/buffalo_ghee_single.png"
                  alt={`DAIRY COOL Ghee - ${activeQuality.name}`}
                  fill
                  className="object-contain p-2"
                  priority
                />
                <span className="absolute top-3 left-3 text-[10px] font-medium text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                  Ayurvedic Bilona Recipe
                </span>
              </div>

              <div className="mt-4 bg-[#FAF8F5] rounded-xl p-3.5 border border-amber-100 text-xs text-slate-600 font-normal leading-relaxed italic text-center w-full max-w-[260px]">
                &ldquo;Pure ghee is revered as a daily staple of warmth and authentic Indian kitchen heritage.&rdquo;
              </div>
            </div>

            {/* Right: Detailed Quality Insights */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-[#0284c7] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                    {activeQuality.tag}
                  </span>
                  <span className="text-xs text-slate-400 font-normal">{activeQuality.readTime}</span>
                </div>

                <h3 className="font-serif font-medium text-slate-900 text-2xl sm:text-3xl leading-snug">
                  {activeQuality.name}
                </h3>
                
                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                  {activeQuality.subtitle}
                </p>
              </div>

              {/* Bullet Highlights */}
              <div className="space-y-2.5 pt-1">
                {activeQuality.highlights.map((point, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 font-normal leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#0284c7] shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Read Full Article Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
                <button
                  onClick={() => setModalQuality(activeQuality)}
                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#0284c7] hover:text-[#026aa3] transition-colors cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Read Full Vedic &amp; Science Insight →</span>
                </button>

                <Link
                  href="/#shop"
                  className="inline-flex items-center gap-1.5 bg-[#0284c7] hover:bg-[#0274b3] text-white text-xs font-medium px-5 py-2.5 rounded-xl transition shadow-2xs"
                >
                  <span>Explore Products</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

            </div>

          </div>
        </div>

      </div>

      {/* Refined Modal */}
      {modalQuality && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 shadow-xl border border-slate-200 relative max-h-[85vh] overflow-y-auto">
            
            <button 
              onClick={() => setModalQuality(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center transition cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-5">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-[#0284c7] bg-sky-50 px-3 py-1 rounded-full border border-sky-100">
                  {modalQuality.tag}
                </span>
                <span className="text-xs text-slate-400">{modalQuality.readTime}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-sky-50 text-[#0284c7] flex items-center justify-center border border-sky-100 shrink-0">
                  <modalQuality.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl sm:text-2xl font-serif font-medium text-slate-900">
                  {modalQuality.name}
                </h3>
              </div>

              <div className="bg-[#FAF8F5] border border-amber-100 rounded-xl p-4 text-xs sm:text-sm font-normal text-slate-700 leading-relaxed italic">
                &ldquo;{modalQuality.summary}&rdquo;
              </div>

              <div className="space-y-3 text-slate-600 text-xs sm:text-sm font-normal leading-relaxed">
                <p>{modalQuality.article}</p>
                <div className="flex items-start gap-2 text-xs text-amber-900 bg-amber-50/80 p-3.5 rounded-xl border border-amber-200/60 font-normal">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>Verified by Traditional Vedic Literature &amp; Culinary Heritage.</span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex justify-between items-center">
                <button
                  onClick={() => setModalQuality(null)}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition cursor-pointer"
                >
                  Close
                </button>
                <Link
                  href="/#shop"
                  onClick={() => setModalQuality(null)}
                  className="px-6 py-2.5 rounded-xl bg-[#0284c7] hover:bg-[#0274b3] text-white font-medium text-xs transition inline-flex items-center gap-1.5 shadow-2xs"
                >
                  <span>Explore Products</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </section>
  );
}


