"use client";

import React, { useEffect, useRef } from "react";
import { Play } from "lucide-react";

interface QualityChecksProps {
  onPlayVideo?: (title: string, url: string) => void;
}

const processVideos = [
  {
    title: "Happy A2 Cows",
    subtitle: "Free grazing on natural farms",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    poster: "/images/ingredients_cow_milk.png"
  },
  {
    title: "Wooden Bilona",
    subtitle: "Traditional hand-churning",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    poster: "/images/ingredients_bilona.png"
  },
  {
    title: "Mud Chulha",
    subtitle: "Slow-cooking for rich aroma",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    poster: "/images/ingredients_slow_cooked.png"
  },
  {
    title: "Dadi's Approval",
    subtitle: "Strict quality checks",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
    poster: "/images/dadi_image.jpg"
  },
  {
    title: "Pure Bottling",
    subtitle: "Hygienic glass packaging",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    poster: "/images/ghee_jar.png"
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

        {/* Video Reel: Horizontal scrollable story cards on mobile, grid on desktop */}
        <div className="flex sm:grid sm:grid-cols-2 md:grid-cols-5 gap-3.5 md:gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-4 sm:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 scrollbar-none">
          {processVideos.map((video, idx) => (
            <div 
              key={idx} 
              className="group relative flex-none w-[68vw] sm:w-auto aspect-[9/14] sm:aspect-[4/5] lg:aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900 shadow-md cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0284c7]/20 transition-all duration-500 border border-slate-200/50 snap-center"
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
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
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
