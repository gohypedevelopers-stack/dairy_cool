import React from "react";
import Image from "next/image";
import { Play, ShoppingCart, Droplet, RefreshCw, Heart, Award } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";

interface HeroProps {
  onPlayVideo: (title: string, url: string) => void;
  onWhatsAppOrder?: () => void;
}

export default function Hero({ onPlayVideo, onWhatsAppOrder }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-[#18130F] min-h-[560px] sm:min-h-[580px] lg:min-h-[650px] flex flex-col justify-end md:justify-center text-white pb-6 md:pb-0">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#18130F]">
        <Image
          src="/images/Dairy cool bannner.png"
          alt="Dairy Cool Authentic Bilona Ghee"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center hidden md:block"
        />
        <Image
          src="/images/Dairy cool bannner mobile view.png"
          alt="Dairy Cool Authentic Bilona Ghee Mobile"
          fill
          sizes="100vw"
          priority
          className="object-cover object-top md:hidden"
        />
        
        {/* Gradient overlay for desktop */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent w-[80%] hidden md:block" />
        {/* Soft bottom vignette overlay for mobile to ground content without darkening image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50 md:hidden pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 lg:px-8 relative z-10 pt-16 md:pt-24 pb-4 md:pb-20 flex-grow flex flex-col justify-end md:justify-center">
        {/* Mobile Ultra-Transparent Container / Standard Desktop Block */}
        <div className="max-w-xl space-y-3 sm:space-y-6 bg-black/10 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none border border-white/10 md:border-none rounded-2xl md:rounded-none p-3 sm:p-6 md:p-0 shadow-lg md:shadow-none">
          
          {/* Trust Badge on Mobile */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-300 text-[10px] sm:text-xs font-medium">
            <span>⭐⭐⭐⭐⭐</span>
            <span className="font-bold text-sky-300">4.9/5</span>
            <span className="text-stone-300 hidden sm:inline">•</span>
            <span className="text-stone-300 text-[10px] sm:text-xs">10,000+ Happy Families</span>
          </div>

          {/* Cursive subtitle with line decoration */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 sm:w-10 h-[1px] bg-sky-400/50 relative hidden sm:block">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-sky-400 rounded-full" />
            </div>
            <span className="font-cursive text-base sm:text-2xl md:text-3xl text-sky-300 block italic drop-shadow-md">
              Experience true purity ♡
            </span>
          </div>

          <h1 className="text-xl sm:text-5xl lg:text-6xl font-serif font-black leading-[1.2] sm:leading-[1.15] tracking-wide drop-shadow-lg text-stone-50">
            Factory ka nahi, <br className="hidden sm:block" />
            <span className="text-[#2B92E4] drop-shadow-md">Dadi ke haathon ka</span> <br />
            Asli Bilona Ghee
          </h1>

          {/* Product Highlights / Badges */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2.5 items-center text-[10px] sm:text-xs md:text-sm font-medium text-stone-200 tracking-wide pt-0.5 sm:pt-0">
            <span className="bg-sky-500/15 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2.5 py-0.5 md:p-0 rounded-full border border-sky-400/30 md:border-none text-stone-200">
              Traditional Bilona Method
            </span>
            <span className="text-sky-300/80 hidden sm:inline">•</span>
            <span className="bg-sky-500/15 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2.5 py-0.5 md:p-0 rounded-full border border-sky-400/30 md:border-none text-stone-200">
              Small Batches
            </span>
            <span className="text-sky-300/80 hidden sm:inline">•</span>
            <span className="bg-sky-500/15 md:bg-transparent backdrop-blur-xs md:backdrop-blur-none px-2.5 py-0.5 md:p-0 rounded-full border border-sky-400/30 md:border-none text-stone-200">
              Pure & Natural
            </span>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-4 pt-1 sm:pt-4 w-full sm:max-w-none">
            {/* Top 2 primary buttons side-by-side on mobile */}
            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:gap-4">
              <a
                href="#shop"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-gradient-to-r from-[#2B92E4] to-[#1E75BE] hover:from-[#207fcc] hover:to-[#175fa0] text-white font-bold px-3.5 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-full text-xs uppercase tracking-wider transition shadow-lg shadow-sky-500/25 active:scale-95 whitespace-nowrap"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Order Now</span>
              </a>

              <button
                onClick={onWhatsAppOrder || (() => window.open("https://wa.me/9716003060?text=Hello%20Dairy%20Cool!%20I%20want%20to%20place%20a%20quick%20order.", "_blank"))}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-3.5 sm:px-6 py-2.5 sm:py-3.5 rounded-xl sm:rounded-full text-xs uppercase tracking-wider transition shadow-lg shadow-green-500/25 active:scale-95 whitespace-nowrap cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 fill-white text-white" />
                <span>WhatsApp</span>
              </button>
            </div>

            {/* Video Action Button */}
            <button
              onClick={() => {
                const el = document.getElementById("watch-process") || document.getElementById("videos") || document.getElementById("real-videos");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                } else {
                  onPlayVideo("Sacred Bilona Churning", "/videos/video3.MOV");
                }
              }}
              className="inline-flex items-center justify-center gap-2 bg-stone-900/60 hover:bg-stone-900/80 md:bg-black/40 md:hover:bg-black/60 backdrop-blur-md text-stone-200 hover:text-white font-semibold px-4 sm:px-6 py-2 sm:py-3.5 rounded-xl sm:rounded-full text-[11px] sm:text-xs uppercase tracking-wider transition border border-amber-500/20 md:border-white/20 active:scale-95 whitespace-nowrap cursor-pointer w-full sm:w-auto"
            >
              <Play className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Watch Process Video</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
