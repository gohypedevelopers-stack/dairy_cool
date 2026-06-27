import React from "react";

const items = [
  "Factory Ka Nahi, Dadi Ke Haathon Ka Asli Bilona Ghee",
  "100% Pure A2 Ghee",
  "No Preservatives",
  "Farm Fresh Daily",
  "FSSAI Certified",
];

export default function TopBanner() {
  const track = items.map((item, i) => (
    <span key={i} className="inline-flex items-center">
      <span className="px-10">{item}</span>
      <span className="text-sky-400 opacity-60">◆</span>
    </span>
  ));

  return (
    <div className="bg-sky-100 text-sky-800 text-[11px] font-extrabold tracking-widest uppercase border-b border-sky-200/40 overflow-hidden py-3">
      <div className="relative flex">
        <span className="flex animate-marquee whitespace-nowrap">
          {track}{track}
        </span>
        <span className="flex animate-marquee whitespace-nowrap absolute top-0">
          {track}{track}
        </span>
      </div>
    </div>
  );
}

