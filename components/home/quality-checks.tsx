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
          <span className="font-cursive text-xl sm:text-2xl text-[#0078BE] font-bold block">
            Watch The Real Process
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 leading-tight">
            Humare gaon se, <span className="text-[#0284c7]">seedha aap tak</span>
          </h2>
          <p className="text-slate-500 text-xs sm:text-sm md:text-base leading-relaxed mt-2 sm:mt-4">
            Experience the authenticity of our process. No machines, no shortcuts—just pure dedication and age-old traditions passed down through generations.
          </p>
        </div>

        {/* Single Row 5-Column Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-5">
          {processVideos.map((video, idx) => (
            <div 
              key={idx} 
              className="group relative w-full aspect-[9/16] rounded-2xl overflow-hidden bg-stone-900 shadow-md cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0078BE]/20 transition-all duration-500 border border-stone-200"
              onClick={() => onPlayVideo && onPlayVideo(video.title, video.url)}
            >
              {/* Rotated Inner Wrapper to fit 100% of video height with zero cropping and zero black bars */}
              <div className="absolute top-1/2 left-1/2 w-[177.78%] h-[56.25%] -translate-x-1/2 -translate-y-1/2 -rotate-90 pointer-events-none">
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
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                />
              </div>
              
              {/* Elegant Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-90 sm:opacity-80 sm:group-hover:opacity-100 transition-opacity duration-500" />

              {/* Text Info */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-left z-10">
                 <h3 className="text-xs sm:text-sm md:text-base font-serif font-bold text-white mb-0.5 drop-shadow-md leading-snug">
                   {video.title}
                 </h3>
                 <p className="text-[10px] sm:text-xs text-white/80 font-medium tracking-wide drop-shadow-md opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 line-clamp-1">
                   {video.subtitle}
                 </p>
              </div>

              {/* Glass Play Icon Container */}
              <div className="absolute inset-0 flex items-center justify-center opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-black/30 sm:bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
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
