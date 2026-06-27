import React from "react";
import { Play } from "lucide-react";

interface QualityChecksProps {
  onPlayVideo?: (title: string, url: string) => void;
}

const processVideos = [
  {
    title: "Happy A2 Cows Grazing",
    url: "https://dairycoolfarm.com/wp-content/uploads/2026/03/WhatsApp-Video-2026-03-13-at-4.11.43-PM.mp4",
    poster: "/images/ingredients_cow_milk.png"
  },
  {
    title: "Wooden Bilona Churning",
    url: "https://dairycoolfarm.com/wp-content/uploads/2026/03/WhatsApp-Video-2026-03-11-at-11.39.52-AM-3.mp4",
    poster: "/images/ingredients_bilona.png"
  },
  {
    title: "Slow-Cooking on Mud Chulha",
    url: "https://dairycoolfarm.com/wp-content/uploads/2026/02/videoplayback.mp4",
    poster: "/images/ingredients_slow_cooked.png"
  },
  {
    title: "Dadi's Quality Check",
    url: "https://dairycoolfarm.com/wp-content/uploads/2026/02/videoplayback-1.mp4",
    poster: "/images/dadi_image.webp"
  },
  {
    title: "Pristine Glass Bottling",
    url: "https://dairycoolfarm.com/wp-content/uploads/2026/02/videoplayback.mp4",
    poster: "/images/ghee_jar.png"
  }
];

export default function QualityChecks({ onPlayVideo }: QualityChecksProps) {
  return (
    <section className="py-24 bg-[#FAF6F0] border-b border-amber-100/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-cursive text-2xl text-amber-600 font-bold block">
            Watch The Real Process
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#2E271E] leading-tight">
            Humare gaon se, seedha aap tak
          </h2>
        </div>

        {/* Video Horizontal Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {processVideos.map((video, idx) => (
            <div 
              key={idx} 
              className="group relative aspect-[3/4] md:aspect-[9/16] rounded-2xl overflow-hidden shadow-md cursor-pointer hover:-translate-y-1 hover:shadow-xl transition-all duration-300 border border-white"
              onClick={() => onPlayVideo && onPlayVideo(video.title, video.url)}
            >
              {/* Video Tag (Muted loop preview) */}
              <video 
                src={video.url}
                muted 
                loop 
                playsInline
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-75"
              />
              
              {/* Black Tint Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10 group-hover:from-black/90 transition-colors" />

              {/* Play Icon Container */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/95 text-[#0078BE] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <Play className="w-4.5 h-4.5 fill-current ml-0.5" />
                </div>
              </div>


            </div>
          ))}
        </div>

        {/* Bottom CTA Button */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => onPlayVideo && onPlayVideo("Complete Traditional Process", "https://dairycoolfarm.com/wp-content/uploads/2026/02/videoplayback.mp4")}
            className="bg-[#0078BE] hover:bg-[#0067a5] text-white font-extrabold px-8 py-3.5 rounded-xl text-xs uppercase tracking-widest transition shadow-lg shadow-sky-500/20 active:scale-95 cursor-pointer"
          >
            View More Videos
          </button>
        </div>

      </div>
    </section>
  );
}
