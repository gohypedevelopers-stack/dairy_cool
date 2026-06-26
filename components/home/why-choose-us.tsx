import React from "react";
import { Leaf, Flame } from "lucide-react";
import { ChurnIcon, MilkIcon } from "@/components/icons";

const features = [
  {
    Icon: Leaf,
    title: "Grass-Fed A2 Cows",
    desc: "Our native cows graze freely in green fields, yielding highly nutritive A2 milk.",
    bg: "bg-sky-100",
    border: "border-sky-200",
    shadow: "shadow-sky-100",
  },
  {
    Icon: MilkIcon,
    title: "Clay Pot Setting",
    desc: "We slowly convert fresh warm milk into thick curd in earthenware clay pots overnight.",
    bg: "bg-sky-100",
    border: "border-sky-200",
    shadow: "shadow-sky-100",
  },
  {
    Icon: ChurnIcon,
    title: "Traditional Churning",
    desc: "Bidirectional slow churning with wooden Bilona churns to extract sweet Makhan.",
    bg: "bg-sky-100",
    border: "border-sky-200",
    shadow: "shadow-sky-100",
  },
  {
    Icon: Flame,
    title: "Slow Wood Fire",
    desc: "Slow-heated on low chulha fires for hours to bring out maximum aroma and grain sizes.",
    bg: "bg-sky-100",
    border: "border-sky-200",
    shadow: "shadow-sky-100",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-white border-b border-sky-100/50">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-14">
        <div className="space-y-2">
          <span className="text-primary font-extrabold text-[11px] uppercase tracking-widest block">Why Choose Dairy Cool</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 leading-tight">Why Choose Dairy Cool?</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((f, i) => (
            <div key={i} className="flex flex-col items-center space-y-4 group">
              {/* Icon circle */}
              <div
                className={`w-24 h-24 ${f.bg} border-2 ${f.border} rounded-full flex items-center justify-center text-primary shadow-lg ${f.shadow} transition-transform duration-300 group-hover:scale-110`}
              >
                <f.Icon className="w-10 h-10" />
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-xl">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed max-w-[220px] mx-auto">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
