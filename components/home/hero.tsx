import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";


interface HeroProps {
  onPlayVideo: (title: string, url: string) => void;
}

export default function Hero({ onPlayVideo }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-sky-500 to-sky-600 text-white border-b border-sky-600/10 min-h-[540px] flex items-stretch">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8 lg:gap-0 items-center py-10 lg:py-0">
        
        {/* Banner Left Info Block */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-4.5 z-10 pr-0 lg:pr-8 py-10 lg:py-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-white/20 text-white font-extrabold text-[10px] uppercase tracking-widest rounded-full w-fit">
            ⭐ 10,000+ Happy Families Trusted
          </div>

          <h1 className="text-4xl sm:text-5xl font-serif font-extrabold leading-[1.15] tracking-tight text-white">
            Pure Ghee, Crafted By Dadi. <br />
            <span className="text-amber-300">Traditional &amp; Pure.</span>
          </h1>

          <p className="text-sm md:text-base text-sky-100 leading-relaxed max-w-xl">
            Handcrafted A2 Bilona Ghee from grass-fed cows — slow-churned &amp; slow-heated on mud chulhas.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
            <a
              href="#shop"
              className="bg-white hover:bg-sky-50 text-primary font-extrabold px-8 py-2 rounded-[12px] text-xs uppercase tracking-wider shadow-lg transition text-center"
            >
              Order Direct Online
            </a>
            <button
              onClick={() => onPlayVideo("Sacred Bilona Churning", "TraditionalChurn")}
              className="flex items-center justify-center gap-2 text-white border-2 border-white/70 hover:border-white hover:bg-white/10 font-extrabold text-xs uppercase tracking-wider px-5 py-2 rounded-[12px] transition cursor-pointer"
            >
              <Play className="w-4 h-4 fill-white text-white" />
              Watch Process
            </button>
          </div>
        </div>

        {/* Banner Right Image block (Full bleed, absolute on desktop to fill full height, no padding/spacing) */}
        <div className="lg:col-span-5 relative w-full h-80 lg:h-full min-h-[350px] lg:absolute lg:right-0 lg:top-0 lg:bottom-0 lg:w-[42%] overflow-hidden">
          <Image
            src="/images/farmers_banner_new.png"
            alt="Traditional Indian Farmers making Ghee"
            fill
            style={{ objectFit: "cover" }}
            className="object-cover"
            priority
          />
          {/* Overlay Label */}
          <div className="absolute bottom-4 right-4 bg-sky-950/90 text-white backdrop-blur px-4 py-2.5 rounded-xl border border-white/10 text-right">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-amber-300 leading-none">Traditional Farm</p>
            <p className="font-serif font-bold text-sm mt-0.5">Village Jansiwana</p>
          </div>
        </div>

      </div>
    </section>
  );
}
