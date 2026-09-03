import React from "react";

const items = [
  "🍃 100% Organic",
  "🛡️ FSSAI Certified",
  "🔬 Lab Tested",
  "🌟 ISO 9001",
  "🥛 Pure & Natural",
  "🚚 Free Delivery Pan-India",
  "✅ No Preservatives",
  "🏡 Farm to Table",
];

export default function Certifications() {
  return (
    <section className="py-3 bg-[#0078BE] text-white shadow-inner overflow-hidden">
      <div className="relative flex overflow-hidden">
        {/* Marquee track — duplicated for seamless loop */}
        <div className="flex animate-marquee whitespace-nowrap">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 mx-8 text-xs font-extrabold uppercase tracking-widest"
            >
              {item}
              <span className="text-white/40 mx-2">✦</span>
            </span>
          ))}
        </div>
        {/* Second copy for seamless loop */}
        <div className="flex animate-marquee whitespace-nowrap absolute top-0">
          {[...items, ...items].map((item, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 mx-8 text-xs font-extrabold uppercase tracking-widest"
            >
              {item}
              <span className="text-white/40 mx-2">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
