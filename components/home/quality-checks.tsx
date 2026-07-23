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
    url: "https://dairycoolfarm.com/wp-content/uploads/2026/03/WhatsApp-Video-2026-03-13-at-4.11.43-PM.mp4",
    poster: "/images/ingredients_cow_milk.png"
  },
  {
    title: "Wooden Bilona",
    subtitle: "Traditional hand-churning",
    url: "https://dairycoolfarm.com/wp-content/uploads/2026/03/WhatsApp-Video-2026-03-11-at-11.39.52-AM-3.mp4",
    poster: "/images/ingredients_bilona.png"
  },
  {
    title: "Mud Chulha",
    subtitle: "Slow-cooking for rich aroma",
    url: "https://dairycoolfarm.com/wp-content/uploads/2026/02/videoplayback.mp4",
    poster: "/images/ingredients_slow_cooked.png"
  },
  {
    title: "Dadi's Approval",
    subtitle: "Strict quality checks",
    url: "https://dairycoolfarm.com/wp-content/uploads/2026/02/videoplayback-1.mp4",
    poster: "/images/dadi_image.webp"
  },
  {
    title: "Pure Bottling",
    subtitle: "Hygienic glass packaging",
    url: "https://dairycoolfarm.com/wp-content/uploads/2026/02/videoplayback.mp4",
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
    <section className="py-24 bg-white border-b border-slate-100">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
          <span className="font-cursive text-2xl text-amber-600 font-bold block">
            Watch The Real Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 leading-tight">
            Humare gaon se, <span className="text-[#0284c7]">seedha aap tak</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed mt-4">
            Experience the authenticity of our process. No machines, no shortcuts—just pure dedication and age-old traditions passed down through generations.
          </p>
        </div>

        {/* Video Horizontal Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-5">
          {processVideos.map((video, idx) => (
            <div 
              key={idx} 
              className="group relative aspect-[3/4] md:aspect-[4/5] lg:aspect-[9/16] rounded-2xl overflow-hidden bg-slate-900 shadow-sm cursor-pointer hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#0284c7]/20 transition-all duration-500 border border-slate-200/50"
              onClick={() => onPlayVideo && onPlayVideo(video.title, video.url)}
            >
              {/* Video Tag (Auto plays on scroll) */}
              <video 
                ref={(el) => {
                  if (el) videoRefs.current[idx] = el;
                }}
                src={video.url}
                poster={video.poster}
                muted 
                loop 
                playsInline
                className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
              />
              
              {/* Elegant Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Text Info */}
              <div className="absolute bottom-5 left-4 right-4 text-left z-10 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                 <h3 className="text-sm md:text-base font-serif font-bold text-white mb-1 drop-shadow-md">
                   {video.title}
                 </h3>
                 <p className="text-[10px] md:text-xs text-white/70 font-medium tracking-wide drop-shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                   {video.subtitle}
                 </p>
              </div>

              {/* Glass Play Icon Container */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white flex items-center justify-center shadow-[0_8px_32px_rgba(0,0,0,0.12)] group-hover:scale-110 transition-transform duration-500">
                  <Play className="w-5 h-5 fill-current ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
