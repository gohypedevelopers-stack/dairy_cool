"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import { ShieldCheck, RotateCw, Flame, Heart, ShoppingCart } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { useCart } from "@/components/cart-provider";

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
    desc: "Kamlesh Gurjari (Dadi) ne ghee banana shuru kiya tha — apne ghar aur parivaar ke liye. Bilona vidhi, usi tarah jaise unki maa ne sikhaya tha. Koi maqsad nahi tha, bas ghar ki zaroorat thi.",
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
    icon: ShieldCheck,
    title: "Bina Milawat",
    desc: "Shuddh ghee — koi chemical, koi additive, koi shortcut nahi. Bilkul waise banaya jaata hai jaise ghar ke liye banate hain.",
  },
  {
    icon: RotateCw,
    title: "Bilona Vidhi",
    desc: "Dahi ko haath se bilone se mathaa jaata hai — dheere, pyaar se. Yeh vidhi hazar saalon purani hai aur aaj bhi wahi hai.",
  },
  {
    icon: Flame,
    title: "Dheere Pakaya Hua",
    desc: "Makhan ko chulhe par dheere-dheere pakaya jaata hai. Koi jaldi nahi. Sahi aroma aur poshan isi tarah milta hai.",
  },
  {
    icon: Heart,
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
    <div className="min-h-screen bg-[#FAF6F0] text-[#2E271E] antialiased font-sans">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#18130F] min-h-[500px] lg:min-h-[600px] flex flex-col justify-center text-white">
        <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#18130F]">
          <Image
            src="/images/Dairy Cool banner 2.png"
            alt="Dairy Cool Authentic Bilona Ghee"
            fill
            sizes="100vw"
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent w-[80%] hidden md:block" />
          <div className="absolute inset-0 bg-black/50 md:hidden" />
        </div>

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-12 sm:pt-24 sm:pb-20 flex-grow flex flex-col justify-center items-center">
          <div className="max-w-2xl mx-auto text-center space-y-4 sm:space-y-6">
            <div className="flex items-center justify-center gap-2 sm:gap-3">
              <span className="font-cursive text-xl sm:text-2xl md:text-3xl text-amber-400 block italic drop-shadow-md">
                Our Story ♡
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black leading-[1.2] sm:leading-[1.15] tracking-wide drop-shadow-lg">
              Meet the Heart <br className="hidden sm:block" />
              <span className="text-[#2B92E4] drop-shadow-md">Behind the Ghee</span>
            </h1>

            <p className="text-sm md:text-base font-medium text-stone-200 tracking-wide leading-relaxed drop-shadow-md max-w-xl mx-auto">
              Pichhle kai saalon se Kamlesh Gurjari (Dadi) ghee bana rahi hain — pehle sirf apne ghar aur parivaar ke liye. Aaj unki poti ki soch se yeh ghee aapke ghar tak pahunch raha hai.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-3 sm:pt-4 w-full mx-auto">
              <Link
                href="/products/ghee_500ml"
                className="inline-flex items-center justify-center gap-2 bg-[#0078BE] hover:bg-[#0066a1] text-white font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-lg shadow-sky-500/20 active:scale-95 whitespace-nowrap w-full sm:w-auto"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Shop Dadi's Ghee</span>
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider transition border border-white/30 active:scale-95 whitespace-nowrap w-full sm:w-auto"
              >
                <span>Back to Home</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 sm:pt-20 sm:pb-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 text-center shadow-lg border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <p className="text-3xl md:text-4xl font-black text-[#0284c7] mb-1">{s.value}</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── STORY SPLIT ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
        {/* Story text */}
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="font-cursive text-2xl text-amber-600 font-bold flex items-center gap-1">
              The Dairy Cool Story <span className="text-sm">♡</span>
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black leading-tight text-slate-900">
              Namaste, Main Kamlesh Gurjari (Dadi) hoon, <br />
              <span className="text-[#0284c7]">Jaanchh Wala gaon se.</span>
            </h2>
          </div>
          <div className="w-20 h-1 bg-amber-500/80 rounded" />
          <div className="space-y-4 text-slate-600 leading-relaxed">
            <p>
              Pichhle kai saalon se main ghee bana rahi hoon — pehle sirf apne ghar aur parivaar ke liye. Meri poti (granddaughter) ki soch se yeh ghee aaj aur logon tak pahunch raha hai, wahi shuddhta aur pyaar ke saath.
            </p>
            <p>
              Hum aaj bhi bilona vidhi se, bina milawat, dheere-dheere pakaya hua ghee banate hain — bilkul waise hi jaise ghar ke liye banaya jaata hai. Farq sirf itna hai ki aaj yeh ghee zyada logon ke ghar tak pahunch raha hai.
            </p>
          </div>
          <Link
            href="/products/ghee_500ml"
            className="inline-flex items-center gap-3 bg-[#0284c7] hover:bg-[#0274b3] text-white font-extrabold px-8 py-4 rounded-full text-sm uppercase tracking-widest transition shadow-lg shadow-sky-500/20"
          >
            Shop Our Ghee →
          </Link>
        </div>

        {/* Image side - Polaroid Style */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative bg-white p-4 pb-12 rounded-lg shadow-2xl border border-amber-100/40 rotate-2 max-w-md w-full group hover:rotate-0 transition-transform duration-500">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-8 bg-amber-100/60 backdrop-blur-sm -rotate-1 border border-amber-200/30 shadow-sm z-10" />
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded border border-slate-100">
              <Image
                src="/images/dadi_image.jpg"
                alt="Dadi making bilona ghee"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="font-cursive text-2xl text-amber-700 font-bold">Hamari Pehchaan ♡</p>
            </div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 text-amber-600/20 pointer-events-none">
              🌿
            </div>
          </div>
        </div>
      </div>

      {/* ── PROMOTIONAL BANNER V ── */}
      <section className="py-12 md:py-16 bg-[#FAF6F0]">
        <div className="w-full max-w-[1700px] mx-auto px-2 sm:px-4 md:px-6">
          <Link 
            href="/products/ghee_500ml"
            className="block relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 border border-amber-100/80 transition-all duration-500 group cursor-pointer bg-slate-900"
          >
            <div className="relative w-full overflow-hidden bg-slate-900">
              <Image
                src="/images/Dairy Cool banner v.png"
                alt="Dairy Cool Authentic Bilona Ghee"
                width={1920}
                height={600}
                sizes="100vw"
                className="w-full h-auto object-contain group-hover:scale-[1.01] transition-transform duration-700 block"
                priority
              />
            </div>
          </Link>
        </div>
      </section>

      {/* ── PROCESS PRINCIPLES ── */}
      <div className="bg-white py-16 md:py-20 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14 space-y-3">
            <span className="font-cursive text-2xl text-amber-600 font-bold block">How We Make It</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900">The Four Pillars of Purity</h2>
            <p className="text-slate-500 mt-3 max-w-xl mx-auto text-sm leading-relaxed">
              Every step of our process is deliberate and non-negotiable. This is what makes Dairy Cool ghee different from everything else in the market.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((p, i) => (
              <div
                key={i}
                className="group flex gap-6 bg-[#FAF6F0] border border-amber-100/50 rounded-2xl p-7 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-[#0284c7] text-white flex items-center justify-center font-black text-xl group-hover:scale-110 transition-transform shadow-md">
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
      <div className="bg-[#FAF6F0] py-16 md:py-20 relative overflow-hidden">
        {/* Subtle background SVG */}
        <div className="absolute right-0 top-0 opacity-5 pointer-events-none hidden md:block">
          <svg viewBox="0 0 200 200" className="w-96 h-96 fill-none stroke-amber-900" strokeWidth="0.5">
            <circle cx="100" cy="100" r="80" />
            <circle cx="100" cy="100" r="60" />
            <circle cx="100" cy="100" r="40" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-14 space-y-3">
            <span className="font-cursive text-2xl text-amber-600 font-bold block">Our Journey</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900">A Legacy Built Over Decades</h2>
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
                    className={`relative flex flex-col md:flex-row items-center gap-6 transition-all duration-700 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    } ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}
                  >
                    <div className={`w-full md:w-5/12 ${isLeft ? "md:text-right" : "md:text-left"}`}>
                      <div className="bg-white border border-amber-100/50 rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow">
                        <span className="inline-block bg-[#0284c7] text-white text-xs font-extrabold px-3 py-1 rounded-full mb-3 uppercase tracking-wider">
                          {item.year}
                        </span>
                        <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex w-2/12 justify-center">
                      <div className={`w-5 h-5 rounded-full bg-[#0284c7] border-4 border-white shadow-lg ring-2 ring-sky-200 transition-transform duration-500 ${isVisible ? "scale-100" : "scale-0"}`} />
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
      <div className="bg-[#f0f9f0] py-16 md:py-20 border-t border-sky-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 space-y-3">
            <span className="font-cursive text-2xl text-amber-600 font-bold block">What We Stand For</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900">Our Unbreakable Promises</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <div
                key={i}
                className="group bg-white border border-slate-100 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-2 transition-all duration-300 text-center"
              >
                <div className="flex justify-center mb-5">
                  <div className="p-4 bg-[#e8f4fd] text-[#0284c7] rounded-2xl group-hover:bg-[#0284c7] group-hover:text-white transition-all duration-300 group-hover:scale-110">
                    <v.icon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="font-serif font-bold text-slate-900 text-lg mb-2">{v.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── BOTTOM CTA ── */}
      <div className="relative bg-[#0284c7] overflow-hidden">
        <svg className="absolute top-0 left-0 w-full" viewBox="0 0 1440 70" preserveAspectRatio="none">
          <path d="M0,0 C480,70 960,70 1440,0 L1440,0 L0,0 Z" fill="#f0f9f0" />
        </svg>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 text-center relative z-10">
          <p className="text-sky-200 text-xs font-extrabold tracking-[0.35em] uppercase mb-4">Pure. Traditional. Honest.</p>
          <h2 className="text-3xl md:text-5xl font-serif font-black text-white mb-4 leading-tight">
            Taste the Difference That<br />Three Decades of Tradition Make
          </h2>
          <p className="text-white/80 mb-10 text-lg max-w-xl mx-auto">
            Order Dadi&apos;s Bilona Ghee today — made the right way, delivered to your door.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/products/ghee_500ml"
              className="inline-flex items-center gap-2 bg-[#2B92E4] hover:bg-[#207fcc] text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wider transition shadow-xl"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Order Now</span>
            </Link>
            <button
              onClick={handleWhatsApp}
              className="inline-flex items-center gap-2 bg-[#22c55e] hover:bg-[#1eb052] text-white font-bold px-8 py-4 rounded-full text-sm uppercase tracking-wider transition shadow-xl cursor-pointer"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span>WhatsApp Order</span>
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
