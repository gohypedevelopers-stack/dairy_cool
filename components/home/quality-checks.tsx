"use client";

import React, { useEffect, useRef } from "react";
import { Play } from "lucide-react";

interface QualityChecksProps {
  onPlayVideo?: (title: string, url: string) => void;
}

const processVideos = [
  {
    title: "Step 1: Happy A2 Buffaloes",
    subtitle: "Free grazing on natural farms",
    url: "/videos/video1.MOV",
    poster: "/images/ingredients_cow_milk.png"
  },
  {
    title: "Step 2: Slow Boiling Milk",
    subtitle: "Boiled over mud chulhas",
    url: "/videos/video2.MOV",
    poster: "/images/ingredients_bilona.png"
  },
  {
    title: "Step 3: Wooden Bilona Churning",
    subtitle: "Traditional hand-churning",
    url: "/videos/video3.MOV",
    poster: "/images/ingredients_bilona.png"
  },
  {
    title: "Step 4: Slow Cooking Ghee",
    subtitle: "Low flame granular texture",
    url: "/videos/video4.MOV",
    poster: "/images/buffalo_ghee_single.png"
  },
  {
    title: "Step 5: Dadi's Glass Packaging",
    subtitle: "Hygienic eco-glass jars",
    url: "/videos/video5.MOV",
    poster: "/images/dadi_image.jpg"
  }
];

export default function QualityChecks({ onPlayVideo }: QualityChecksProps) {
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch((err) => {
              console.log("Auto-play prevented", err);
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.2 }
    );

    const currentRefs = videoRefs.current;
    currentRefs.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      currentRefs.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);

  return (
    <section id="watch-process" className="py-12 sm:py-24 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-2 sm:space-y-3 mb-8 sm:mb-16 max-w-2xl mx-auto">
          <span className="font-cursive text-xl sm:text-2xl text-amber-600 font-bold block">
            Watch The Real Process
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 leading-tight">
            Humare gaon se, <span className="text-[#0284c7]">seedha aap tak</span>
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed mt-2 sm:mt-4">
            Experience the authenticity of our process. No machines, no shortcuts—just pure dedication and age-old traditions passed down through generations.
          </p>
        </div>

        {/* Large Prominent Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {processVideos.map((video, idx) => (
            <div 
              key={idx} 
              className="group relative w-full aspect-[16/10] rounded-3xl overflow-hidden bg-stone-900 shadow-lg cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0078BE]/20 transition-all duration-500 border border-stone-200"
              onClick={() => onPlayVideo && onPlayVideo(video.title, video.url)}
            >
              {/* Video Tag (Auto plays on scroll) */}
              <video 
                ref={(el) => {
                  if (el) videoRefs.current[idx] = el;
                }}
                src={video.url}
                poster={video.poster}
                autoPlay
                muted 
                loop 
                playsInline
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-all duration-700 opacity-90 group-hover:opacity-100"
              />
              
              {/* Elegant Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 sm:opacity-80 sm:group-hover:opacity-100 transition-opacity duration-500" />

              {/* Text Info */}
              <div className="absolute bottom-4 left-3.5 right-3.5 sm:bottom-5 sm:left-4 sm:right-4 text-left z-10">
                 <h3 className="text-sm md:text-base font-serif font-bold text-white mb-0.5 sm:mb-1 drop-shadow-md">
                   {video.title}
                 </h3>
                 <p className="text-[11px] md:text-xs text-white/80 font-medium tracking-wide drop-shadow-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500">
                   {video.subtitle}
                 </p>
              </div>

              {/* Glass Play Icon Container - Always visible subtle play ring on mobile, hover effect on desktop */}
              <div className="absolute inset-0 flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black/30 sm:bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current ml-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
