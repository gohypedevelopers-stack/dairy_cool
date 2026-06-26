"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

const stats = [
  { value: "30+", label: "Years of Tradition" },
  { value: "5L+", label: "Orders Delivered" },
  { value: "100%", label: "Natural & Pure" },
  { value: "3rd", label: "Generation Recipe" },
];

const timeline = [
  {
    year: "1990s",
    title: "Dadi's Village Kitchen",
    desc: "Grandmother Kamlesh Gurjari began her daily ritual — churning fresh curd with a wooden bilona at sunrise, just as her mother had taught her.",
  },
  {
    year: "2018",
    title: "A Promise to Preserve",
    desc: "Her granddaughter, inspired by decades of watching Dadi work, decided this tradition must not disappear. Dairy Cool Farm was born.",
  },
  {
    year: "2020",
    title: "From Village to Doorstep",
    desc: "What started in a small village in Greater Noida now reaches thousands of Indian homes — same wooden churner, same morning ritual, same purity.",
  },
  {
    year: "Today",
    title: "Still Dadi's Recipe",
    desc: "Every jar of Dairy Cool ghee is made under Dadi's supervision. No shortcuts. No compromises. Just 30 litres of milk crafted into 1 litre of golden ghee.",
  },
];

const values = [
  {
    icon: "🌿",
    title: "No Shortcuts",
    desc: "Traditional bidirectional wooden churning. Never machine-made.",
  },
  {
    icon: "🔥",
    title: "Mud Chulha",
    desc: "Slow-cooked on dung-cake fires — the only way to preserve medicinal properties.",
  },
  {
    icon: "🥛",
    title: "30L → 1L",
    desc: "It takes 30 litres of fresh buffalo milk to yield just one litre of our ghee.",
  },
  {
    icon: "👵",
    title: "Dadi's Supervision",
    desc: "Every batch is hand-poured and quality-checked by our grandmother herself.",
  },
];

export default function AboutDadi() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = parseInt(entry.target.getAttribute("data-idx") || "0");
            setVisibleItems((prev) => [...new Set([...prev, idx])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const items = timelineRef.current?.querySelectorAll("[data-idx]");
    items?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about-dadi" className="bg-[#f9f5ee] overflow-hidden">

      {/* ── Hero Strip ── */}
      <div className="relative bg-[#0078BE] overflow-hidden">
        {/* Decorative arcs */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,80 C360,0 1080,0 1440,80 L1440,80 L0,80 Z" fill="#f9f5ee" />
        </svg>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1 text-white z-10">
            <p className="text-xs font-extrabold tracking-[0.3em] uppercase text-sky-200 mb-3">Our Story</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-black leading-tight mb-4">
              Meet the Heart<br />
              <span className="text-sky-300">Behind the Ghee</span>
            </h2>
            <p className="text-white/80 text-base md:text-lg max-w-lg leading-relaxed">
              Every morning, before the world wakes up, an elderly woman in a small village near Greater Noida sits beside her mud chulha. She is our Dadi — and she has been making ghee this way for over 30 years.
            </p>
          </div>

          {/* Dadi Image */}
          <div className="flex-shrink-0 z-10 relative">
            <div className="relative w-64 h-72 md:w-80 md:h-96 rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl">
              <Image
                src="/images/dadi_illustration.png"
                alt="Dadi — Grandmother Kamlesh Gurjari"
                fill
                style={{ objectFit: "cover" }}
                className="object-cover"
                priority
              />
              {/* Floating badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg">
                <p className="text-xs font-black text-slate-900">Grandmother Kamlesh Gurjari</p>
                <p className="text-[10px] text-sky-600 font-semibold">Chief Ghee Maker · Greater Noida</p>
              </div>
            </div>
            {/* Floating stat pill */}
            <div className="absolute -top-4 -right-4 bg-amber-400 text-white rounded-2xl px-4 py-2 shadow-xl font-black text-sm rotate-3">
              30+ Years 🤍
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats Row ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-1 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 text-center shadow-sm border border-amber-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <p className="text-3xl md:text-4xl font-black text-[#0078BE] mb-1">{s.value}</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Our Story Split ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: Decorative visual */}
        <div className="relative">
          {/* Background blob */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-sky-50 rounded-[3rem] -rotate-3 scale-95 opacity-60" />
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-amber-100 p-2">
            <Image
              src="/images/dadi_illustration.png"
              alt="Traditional ghee making process"
              width={600}
              height={500}
              className="rounded-[2rem] w-full object-cover"
            />
            {/* Overlaid quote */}
            <div className="absolute inset-x-6 bottom-6 bg-[#0078BE]/90 backdrop-blur-sm rounded-2xl p-4 text-white">
              <p className="text-sm font-serif italic leading-relaxed">
                &quot;Ghee is not just food. It is memory, medicine, and love — all in one jar.&quot;
              </p>
              <p className="text-xs text-sky-200 font-bold mt-2">— Dadi Kamlesh Gurjari</p>
            </div>
          </div>
        </div>

        {/* Right: Story text */}
        <div className="space-y-6">
          <div>
            <p className="text-xs font-extrabold tracking-[0.3em] uppercase text-[#0078BE] mb-2">The Dairy Cool Story</p>
            <h3 className="text-3xl md:text-4xl font-serif font-black text-slate-900 leading-tight mb-4">
              From a Village Kitchen to<br />
              <span className="text-[#0078BE]">Your Family Table</span>
            </h3>
          </div>
          <p className="text-slate-600 leading-relaxed">
            Dairy Cool Farm was born from a simple but powerful observation: the best ghee in the world was being made in small Indian villages — and nobody was bringing it to cities with its purity intact.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Our Dadi, Grandmother Kamlesh Gurjari, has been making ghee the old way for over three decades. Every morning she begins before sunrise — fermenting fresh buffalo milk into curd, churning it with a wooden bilona, separating the butter by hand, and slow-cooking it over a mud chulha fuelled by dung cakes.
          </p>
          <p className="text-slate-600 leading-relaxed">
            The result is a ghee that is grainy, golden, and deeply aromatic — rich in fat-soluble vitamins, butyric acid, and the warmth of tradition. It takes <span className="font-bold text-slate-900">30 litres of milk</span> to produce just <span className="font-bold text-slate-900">1 litre of ghee</span>. We would not have it any other way.
          </p>

          {/* CTA */}
          <a
            href="#shop"
            className="inline-flex items-center gap-3 bg-[#0078BE] hover:bg-[#0067a5] text-white font-extrabold px-8 py-4 rounded-xl text-sm uppercase tracking-widest transition shadow-lg shadow-sky-500/20 cursor-pointer"
          >
            Shop Our Ghee
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-extrabold tracking-[0.3em] uppercase text-[#0078BE] mb-2">Our Journey</p>
            <h3 className="text-3xl md:text-4xl font-serif font-black text-slate-900">A Legacy Built Over Decades</h3>
          </div>

          <div ref={timelineRef} className="relative">
            {/* Central line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-200 via-amber-200 to-sky-200 -translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                const isVisible = visibleItems.includes(i);
                return (
                  <div
                    key={i}
                    data-idx={i}
                    className={`relative flex flex-col md:flex-row items-center gap-6 transition-all duration-700 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                    } ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    {/* Content Card */}
                    <div className={`w-full md:w-5/12 ${isLeft ? "md:text-right" : "md:text-left"}`}>
                      <div className="bg-[#f9f5ee] border border-amber-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <span className="inline-block bg-[#0078BE] text-white text-xs font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                          {item.year}
                        </span>
                        <h4 className="text-lg font-serif font-bold text-slate-900 mb-2">{item.title}</h4>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden md:flex w-2/12 justify-center">
                      <div className={`w-5 h-5 rounded-full bg-[#0078BE] border-4 border-white shadow-lg ring-2 ring-sky-200 transition-transform duration-500 ${isVisible ? "scale-100" : "scale-0"}`} />
                    </div>

                    {/* Empty spacer */}
                    <div className="hidden md:block w-5/12" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── Our Values ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="text-center mb-12">
          <p className="text-xs font-extrabold tracking-[0.3em] uppercase text-[#0078BE] mb-2">What We Stand For</p>
          <h3 className="text-3xl md:text-4xl font-serif font-black text-slate-900">Our Unbreakable Promises</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, i) => (
            <div
              key={i}
              className="group bg-white border border-amber-100 rounded-2xl p-7 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 text-center"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">{v.icon}</div>
              <h4 className="font-serif font-bold text-slate-900 text-lg mb-2">{v.title}</h4>
              <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA Banner ── */}
      <div className="relative bg-[#0078BE] overflow-hidden">
        <svg className="absolute top-0 left-0 w-full rotate-180" viewBox="0 0 1440 60" preserveAspectRatio="none">
          <path d="M0,60 C360,0 1080,0 1440,60 L1440,0 L0,0 Z" fill="#f9f5ee" />
        </svg>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center relative z-10">
          <p className="text-sky-200 text-xs font-extrabold tracking-[0.3em] uppercase mb-3">Pure. Traditional. Honest.</p>
          <h3 className="text-3xl md:text-4xl font-serif font-black text-white mb-6 leading-tight">
            Taste the Difference That<br />Three Decades of Tradition Make
          </h3>
          <a
            href="#shop"
            className="inline-flex items-center gap-3 bg-white hover:bg-amber-50 text-[#0078BE] font-extrabold px-10 py-4 rounded-xl text-sm uppercase tracking-widest transition shadow-xl cursor-pointer"
          >
            Order Dadi&apos;s Ghee
            <span className="text-lg">→</span>
          </a>
        </div>
      </div>

    </section>
  );
}
