import React from "react";
import { ChurnIcon, MilkIcon, ButterIcon, HoneyIcon, WellnessIcon } from "@/components/icons";

const categories = [
  {
    Icon: ChurnIcon,
    title: "A2 Bilona Ghee",
    subtitle: "Handcrafted & pure",
    bg: "from-sky-50 to-blue-100",
    border: "border-sky-200",
    hover: "hover:shadow-sky-200/60",
    dot: "bg-sky-400",
  },
  {
    Icon: MilkIcon,
    title: "Fresh A2 Milk",
    subtitle: "Farm to your door",
    bg: "from-sky-50 to-blue-100",
    border: "border-sky-200",
    hover: "hover:shadow-sky-200/60",
    dot: "bg-sky-400",
  },
  {
    Icon: ButterIcon,
    title: "Desi Makhan",
    subtitle: "Churned with love",
    bg: "from-sky-50 to-blue-100",
    border: "border-sky-200",
    hover: "hover:shadow-sky-200/60",
    dot: "bg-sky-400",
  },
  {
    Icon: HoneyIcon,
    title: "Raw Honey",
    subtitle: "Wild & unprocessed",
    bg: "from-sky-50 to-blue-100",
    border: "border-sky-200",
    hover: "hover:shadow-sky-200/60",
    dot: "bg-sky-400",
  },
  {
    Icon: WellnessIcon,
    title: "Wellness Combos",
    subtitle: "Nature's best kits",
    bg: "from-sky-50 to-blue-100",
    border: "border-sky-200",
    hover: "hover:shadow-sky-200/60",
    dot: "bg-sky-400",
  },
];

export default function Categories() {
  return (
    <section className="py-16 bg-white border-b border-sky-100/50">
      <div className="max-w-7xl mx-auto px-4 text-center space-y-12">

        {/* Heading */}
        <div className="space-y-2">
          <span className="text-primary font-extrabold text-[11px] uppercase tracking-widest block">
            Dairy Cool Farm Store
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 leading-tight">
            Your One-Stop Dairy &amp; Organic Store
          </h2>
          <p className="text-slate-500 text-sm max-w-md mx-auto mt-1">
            Sourced fresh from our farm — pure, natural and full of goodness.
          </p>
        </div>

        {/* Cards */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-4 md:flex-wrap md:justify-center md:pb-0 scrollbar-none">
          {categories.map((cat, i) => (
            <a
              key={i}
              href="#shop"
              className={`group relative flex flex-col items-center gap-3 w-40 shrink-0 snap-center md:w-44 py-7 px-4 rounded-2xl bg-gradient-to-b ${cat.bg} border ${cat.border} shadow-sm hover:shadow-lg ${cat.hover} transition-all duration-300 hover:-translate-y-1`}
            >
              {/* Dot badge */}
              <span className={`absolute top-3 right-3 w-2.5 h-2.5 rounded-full ${cat.dot} opacity-70`} />

              {/* Icon */}
              <div className="text-primary group-hover:scale-110 transition-transform duration-300 drop-shadow-sm w-12 h-12 flex items-center justify-center">
                <cat.Icon className="w-10 h-10" />
              </div>

              {/* Text */}
              <div className="space-y-0.5 text-center">
                <p className="text-sm font-extrabold text-slate-800 tracking-wide group-hover:text-primary transition-colors">
                  {cat.title}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  {cat.subtitle}
                </p>
              </div>

              {/* Hover arrow */}
              <span className="text-xs font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200 tracking-wider">
                Shop →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
