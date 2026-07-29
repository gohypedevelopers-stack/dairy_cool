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
    <section className="relative overflow-hidden bg-[#18130F] min-h-[550px] lg:min-h-[650px] flex flex-col justify-center text-white">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-[#18130F]">
        <Image
          src="/images/Dairy cool bannner.png"
          alt="Dairy Cool Authentic Bilona Ghee"
          fill
          sizes="100vw"
          priority
          className="object-cover object-center"
        />
        
        {/* Gradient overlay for desktop to ensure text is highly readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent w-[80%] hidden md:block" />
        {/* Subtle mobile overlay just to ensure text pops, without hiding the new mobile image */}
        <div className="absolute inset-0 bg-black/30 md:hidden" />
      </div>

      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 relative z-10 pt-16 pb-12 sm:pt-24 sm:pb-20 flex-grow flex flex-col justify-center sm:justify-center justify-start mt-8 sm:mt-0">
        <div className="max-w-xl space-y-4 sm:space-y-6">
          {/* Cursive subtitle with line decoration */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-[1px] bg-amber-400/40 relative hidden sm:block">
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-amber-400 rounded-full" />
            </div>
            <span className="font-cursive text-xl sm:text-2xl md:text-3xl text-amber-400 block italic drop-shadow-md">
              Experience true purity ♡
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black leading-[1.2] sm:leading-[1.15] tracking-wide drop-shadow-lg">
            Factory ka nahi, <br className="hidden sm:block" />
            <span className="text-[#2B92E4] drop-shadow-md">Dadi ke haathon ka</span> <br />
            Asli Bilona Ghee
          </h1>

          <p className="text-[10px] sm:text-xs md:text-sm font-medium text-stone-200 tracking-wide flex flex-wrap gap-x-2.5 gap-y-1 sm:gap-y-2 items-center drop-shadow-md">
            <span>Traditional Bilona Method</span>
            <span className="text-amber-500/80 hidden sm:inline">•</span>
            <span>Small Batches</span>
            <span className="text-amber-500/80 hidden sm:inline">•</span>
            <span>Pure & Natural</span>
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 pt-3 sm:pt-4 w-full max-w-[340px] sm:max-w-none">
            <a
              href="#shop"
              className="inline-flex items-center justify-center gap-2 bg-[#2B92E4] hover:bg-[#207fcc] text-white font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-lg shadow-sky-500/20 active:scale-95 whitespace-nowrap"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Order Now</span>
            </a>
            
            <button
              onClick={() => {
                const el = document.getElementById("watch-process") || document.getElementById("videos") || document.getElementById("real-videos");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                } else {
                  onPlayVideo("Sacred Bilona Churning", "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4");
                }
              }}
              className="inline-flex items-center justify-center gap-2 bg-black/40 hover:bg-black/60 backdrop-blur-sm text-white font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider transition border border-white/30 active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 fill-white text-white" />
              <span>Watch Process</span>
            </button>

            <button
              onClick={onWhatsAppOrder || (() => window.open("https://wa.me/9716003060?text=Hello%20Dairy%20Cool!%20I%20want%20to%20place%20a%20quick%20order.", "_blank"))}
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-6 py-3.5 rounded-full text-xs uppercase tracking-wider transition shadow-lg shadow-green-500/20 active:scale-95 whitespace-nowrap cursor-pointer"
            >
              <WhatsAppIcon className="w-4 h-4 fill-white text-white" />
              <span>WhatsApp Order</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
