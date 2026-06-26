"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";

const stats = [
  { value: "30+", label: "Saalon Ka Anubhav" },
  { value: "5L+", label: "Orders Delivered" },
  { value: "100%", label: "Bina Milawat" },
  { value: "2nd", label: "Generation Se Aaya" },
];

const timeline = [
  {
    year: "Shuruaat",
    title: "Sirf Ghar ke Liye",
    desc: "Kamlesh Khari ji ne ghee banana shuru kiya tha — apne ghar aur parivaar ke liye. Bilona vidhi, usi tarah jaise unki maa ne sikhaya tha. Koi maqsad nahi tha, bas ghar ki zaroorat thi.",
  },
  {
    year: "Pehchaan",
    title: "Gaon mein Mashhoor",
    desc: "Unka ghee dhire-dhire Jaanchh Wala gaon mein mashhoor hone laga. Log unse maangte the — wahi shuddhata, wahi khushboo, wahi swad jo ghar ka ghee deta tha.",
  },
  {
    year: "Badlaav",
    title: "Poti Ki Soch",
    desc: "Unki poti ne socha — yeh ghee sirf gaon tak kyun simit rahe? Usi soch ne Dairy Cool Farm ko janam diya. Dadi ka recipe, poti ka sapna.",
  },
  {
    year: "Aaj",
    title: "Zyada Gharon Tak",
    desc: "Farq sirf itna hai ki aaj yeh ghee zyada logon ke ghar tak pahunch raha hai. Bilona, chulha, haath — sab kuch wahi hai. Sirf daayra bada hua hai.",
  },
];

const values = [
  {
    icon: "🌿",
    title: "Bina Milawat",
    desc: "Shuddh ghee — koi chemical, koi additive, koi shortcut nahi. Bilkul waise banaya jaata hai jaise ghar ke liye banate hain.",
  },
  {
    icon: "🔥",
    title: "Bilona Vidhi",
    desc: "Dahi ko haath se bilone se mathaa jaata hai — dheere, pyaar se. Yeh vidhi hazar saalon purani hai aur aaj bhi wahi hai.",
  },
  {
    icon: "🥛",
    title: "Dheere Pakaya Hua",
    desc: "Makhan ko chulhe par dheere-dheere pakaya jaata hai. Koi jaldi nahi. Sahi aroma aur poshan isi tarah milta hai.",
  },
  {
    icon: "👵",
    title: "Imaandaar Tareeqa",
    desc: "Hamari pehchaan hai — shuddh ghee, imaandaar tareeke se banaya hua, sehat ke liye behtar.",
  },
];

const principles = [
  {
    num: "01",
    title: "Bilona Vidhi",
    desc: "Dahi ko lakdi ke bilone se haath se mathaa jaata hai. Yeh makhan ko doodh se alag karta hai — bilkul purani aur shuddh tarah se. Koi machine nahi.",
  },
  {
    num: "02",
    title: "Chulhe Par Dhimi Aanch",
    desc: "Makhan ko chulhe par dheere-dheere pakaya jaata hai. Iss dhimi aanch mein ghee ki asli khushboo aur poshan bacha rehta hai — factory jaisi tezi nahi.",
  },
  {
    num: "03",
    title: "Haath Se Bhara, Haath Se Banda",
    desc: "Har jar Kamlesh ji ki nigrani mein haath se bhara aur banda jaata hai. Koi assembly line nahi. Jo andar hai, woh aapko pata hai.",
  },
  {
    num: "04",
    title: "Koi Milawat Nahi, Kabhi Nahi",
    desc: "Sirf ghee. Aur kuch nahi. Yahi hamari pehchaan hai aur yahi hamara waada hai — aaj bhi, kal bhi.",
  },
];

export default function AboutDadiPage() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
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
      { threshold: 0.15 }
    );
    const items = timelineRef.current?.querySelectorAll("[data-idx]");
    items?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleWhatsApp = () => {
    window.open("https://wa.me/9716003060?text=Hello%20Dairy%20Cool!%20I%20want%20to%20place%20an%20order.", "_blank");
  };

  return (
    <div className="min-h-screen bg-[#f9f5ee] text-slate-800 antialiased font-sans">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        cartItemsCount={0}
        setIsCartOpen={setIsCartOpen}
        onWhatsAppOrder={handleWhatsApp}
      />

      {/* ── HERO ── */}
      <div className="relative bg-[#0078BE] overflow-hidden min-h-[480px] md:min-h-[560px] flex items-center">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "60px 60px" }}
        />
        {/* Wave bottom */}
        <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 1440 90" preserveAspectRatio="none">
          <path d="M0,90 C480,10 960,10 1440,90 L1440,90 L0,90 Z" fill="#f9f5ee" />
        </svg>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center w-full">
          {/* Left text */}
          <div className="text-white">
            <p className="text-xs font-extrabold tracking-[0.35em] uppercase text-sky-300 mb-4">Our Story</p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-black leading-[1.05] mb-6">
              Meet the Heart<br />
              <span className="text-amber-300">Behind the Ghee.</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed max-w-lg mb-8">
              Pichhle kai saalon se Kamlesh Khari ji ghee bana rahi hain — pehle sirf apne ghar aur parivaar ke liye. Aaj unki poti (granddaughter) ki soch se yeh ghee aapke ghar tak pahunch raha hai.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/#shop"
                className="inline-flex items-center gap-2 bg-white text-[#0078BE] font-extrabold px-8 py-3.5 rounded-xl text-sm uppercase tracking-widest hover:bg-amber-50 transition shadow-lg"
              >
                Shop Dadi's Ghee →
              </Link>
              <Link
                href="/"
                className="inline-flex items-center gap-2 border-2 border-white/40 text-white font-bold px-8 py-3.5 rounded-xl text-sm uppercase tracking-widest hover:border-white/80 transition"
              >
                Back to Home
              </Link>
            </div>
          </div>

          {/* Right: Dadi image */}
          <div className="relative flex justify-center md:justify-end">
            <div className="relative w-72 h-80 md:w-96 md:h-[420px] rounded-[2.5rem] overflow-hidden border-4 border-white/20 shadow-2xl">
              <Image
                src="/images/dadi_illustration_new.webp"
                alt="Grandmother Kamlesh Khari making ghee"
                fill
                style={{ objectFit: "cover" }}
                className="object-cover"
                priority
              />
              {/* Badge */}
              <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur rounded-2xl px-4 py-3 shadow-xl">
                <p className="text-sm font-black text-slate-900">Kamlesh Khari</p>
                <p className="text-xs text-[#0078BE] font-semibold">Jaanchh Wala gaon, Greater Noida</p>
              </div>
            </div>
            {/* Floating pill */}
            <div className="absolute -top-3 -left-3 md:left-auto md:-right-3 bg-amber-400 text-white rounded-2xl px-4 py-2 shadow-xl font-black text-sm rotate-3 whitespace-nowrap">
              Traditional Bilona Ghee
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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

      {/* ── STORY SPLIT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* Image side */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-sky-50 rounded-[3rem] -rotate-2 scale-95 opacity-70" />
          <div className="relative bg-white rounded-[2.5rem] overflow-hidden shadow-xl border border-amber-100 p-2">
            <Image
              src="/images/dadi_image.webp"
              alt="Dadi making bilona ghee"
              width={600}
              height={480}
              className="rounded-[2rem] w-full object-cover"
            />
            <div className="absolute inset-x-6 bottom-6 bg-[#0078BE]/92 backdrop-blur-sm rounded-2xl p-5 text-white">
              <p className="text-sm font-serif italic leading-relaxed">
                &quot;Hamari pehchaan hai — shuddh ghee, imaandaar tareeke se banaya hua, sehat ke liye behtar.&quot;
              </p>
              <p className="text-xs text-sky-200 font-bold mt-2">— Kamlesh Khari</p>
            </div>
          </div>
        </div>

        {/* Story text */}
        <div className="space-y-5">
          <p className="text-xs font-extrabold tracking-[0.35em] uppercase text-[#0078BE]">The Dairy Cool Story</p>
          <h2 className="text-3xl md:text-4xl font-serif font-black text-slate-900 leading-tight">
            Namaste, Main Kamlesh Khari hoon,<br />
            <span className="text-[#0078BE]">Jaanchh Wala gaon, Greater Noida se.</span>
          </h2>
          <p className="text-slate-600 leading-relaxed">
            Pichhle kai saalon se main ghee bana rahi hoon — pehle sirf apne ghar aur parivaar ke liye. Meri poti (granddaughter) ki soch se yeh ghee aaj aur logon tak pahunch raha hai, wahi shuddhta aur pyaar ke saath.
          </p>
          <p className="text-slate-600 leading-relaxed">
            Hum aaj bhi bilona vidhi se, bina milawat, dheere-dheere pakaya hua ghee banate hain — bilkul waise hi jaise ghar ke liye banaya jaata hai. Farq sirf itna hai ki aaj yeh ghee zyada logon ke ghar tak pahunch raha hai.
          </p>
          <Link
            href="/#shop"
            className="inline-flex items-center gap-3 bg-[#0078BE] hover:bg-[#0067a5] text-white font-extrabold px-8 py-4 rounded-xl text-sm uppercase tracking-widest transition shadow-lg shadow-sky-500/20"
          >
            Shop Our Ghee →
          </Link>
        </div>
      </div>

      {/* ── PROCESS PRINCIPLES ── */}
      <div className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-extrabold tracking-[0.35em] uppercase text-[#0078BE] mb-2">How We Make It</p>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-slate-900">The Four Pillars of Purity</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Every step of our process is deliberate and non-negotiable. This is what makes Dairy Cool ghee different from everything else in the market.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((p, i) => (
              <div
                key={i}
                className="group flex gap-6 bg-[#f9f5ee] border border-amber-100 rounded-2xl p-7 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#0078BE] text-white flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform">
                  {p.num}
                </div>
                <div>
                  <h3 className="font-serif font-bold text-slate-900 text-lg mb-2">{p.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── TIMELINE ── */}
      <div className="bg-[#f9f5ee] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-extrabold tracking-[0.35em] uppercase text-[#0078BE] mb-2">Our Journey</p>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-slate-900">A Legacy Built Over Decades</h2>
          </div>

          <div ref={timelineRef} className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-200 via-amber-300 to-sky-200 -translate-x-1/2" />
            <div className="space-y-12">
              {timeline.map((item, i) => {
                const isLeft = i % 2 === 0;
                const isVisible = visibleItems.includes(i);
                return (
                  <div
                    key={i}
                    data-idx={i}
                    className={`relative flex flex-col md:flex-row items-center gap-6 transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                      } ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div className={`w-full md:w-5/12 ${isLeft ? "md:text-right" : "md:text-left"}`}>
                      <div className="bg-white border border-amber-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                        <span className="inline-block bg-[#0078BE] text-white text-xs font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                          {item.year}
                        </span>
                        <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex w-2/12 justify-center">
                      <div className={`w-5 h-5 rounded-full bg-[#0078BE] border-4 border-white shadow-lg ring-2 ring-sky-200 transition-transform duration-500 ${isVisible ? "scale-100" : "scale-0"}`} />
                    </div>
                    <div className="hidden md:block w-5/12" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── VALUES ── */}
      <div className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs font-extrabold tracking-[0.35em] uppercase text-[#0078BE] mb-2">What We Stand For</p>
            <h2 className="text-3xl md:text-4xl font-serif font-black text-slate-900">Our Unbreakable Promises</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="group bg-[#f9f5ee] border border-amber-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 text-center"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{v.icon}</div>
                <h3 className="font-serif font-bold text-slate-900 text-lg mb-2">{v.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="relative bg-[#0078BE] overflow-hidden">
        <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path d="M0,0 C480,70 960,70 1440,0 L1440,0 L0,0 Z" fill="white" />
        </svg>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center relative z-10">
          <p className="text-sky-200 text-xs font-extrabold tracking-[0.35em] uppercase mb-4">Pure. Traditional. Honest.</p>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-white mb-4 leading-tight">
            Taste the Difference That<br />Three Decades of Tradition Make
          </h2>
          <p className="text-white/70 mb-10 text-lg max-w-xl mx-auto">
            Order Dadi&apos;s Bilona Ghee today — made the right way, delivered to your door.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#shop"
              className="inline-flex items-center gap-3 bg-white hover:bg-amber-50 text-[#0078BE] font-extrabold px-10 py-4 rounded-xl text-sm uppercase tracking-widest transition shadow-2xl"
            >
              Order Now →
            </Link>
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-3 border-2 border-white/50 hover:border-white text-white font-extrabold px-10 py-4 rounded-xl text-sm uppercase tracking-widest transition cursor-pointer"
            >
              WhatsApp Order
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
