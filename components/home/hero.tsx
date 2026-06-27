import React from "react";
import Image from "next/image";
import { Play, ShoppingCart, Droplet, RefreshCw, Heart, Award } from "lucide-react";

interface HeroProps {
  onPlayVideo: (title: string, url: string) => void;
}

export default function Hero({ onPlayVideo }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#18130F] min-h-[550px] lg:min-h-[650px] flex flex-col justify-center text-white">
      {/* Background Image & Overlay */}
      <div className="absolute top-0 right-0 bottom-0 w-full md:w-[58%] lg:w-[50%] z-0 h-full overflow-hidden bg-[#18130F]">
        <Image
          src="/images/dadi_hero_temp.png"
          alt="Dadi making authentic bilona ghee"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Perfect gradients starting solid at the left edge of the wrapper to blend seamlessly with the section background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#18130F] via-[#18130F]/20 to-transparent md:block hidden" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#18130F] via-[#18130F]/70 to-transparent md:hidden block" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 pt-20 pb-20 flex-grow flex flex-col justify-center">
        <div className="max-w-xl space-y-6">
          {/* Cursive subtitle with line decoration */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-[1px] bg-amber-400/40 relative hidden sm:block">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-amber-400 rounded-full" />
            </div>
            <span className="font-cursive text-2xl md:text-3xl text-amber-400 block italic">
              Dadi ke haathon se bana ♡
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-black leading-[1.1] tracking-wide uppercase">
            Asli Bilona <br />
            <span className="text-[#2B92E4]">Ghee</span>
          </h1>

          <p className="text-xs md:text-sm font-medium text-stone-300 tracking-wide flex flex-wrap gap-x-2.5 gap-y-1 items-center">
            <span>Traditional Bilona Method</span>
            <span className="text-amber-500/80">•</span>
            <span>Small Batches</span>
            <span className="text-amber-500/80">•</span>
            <span>Pure & Natural</span>
          </p>

          <div className="flex flex-row items-center gap-4 pt-2">
            <a
              href="#shop"
              className="inline-flex items-center justify-center gap-2 bg-[#2B92E4] hover:bg-[#207fcc] text-white font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition shadow-lg shadow-sky-500/20 active:scale-95 whitespace-nowrap"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Order Now</span>
            </a>
            <button
              onClick={() => onPlayVideo("Sacred Bilona Churning", "TraditionalChurn")}
              className="inline-flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white font-bold px-6 py-3 rounded-full text-xs uppercase tracking-wider transition border border-white/60 cursor-pointer active:scale-95 whitespace-nowrap"
            >
              <Play className="w-3.5 h-3.5 fill-white text-white" />
              <span>Watch Process</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
