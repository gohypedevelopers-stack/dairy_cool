import React from "react";
import Image from "next/image";
import { Play } from "lucide-react";

interface RealVideosProps {
  onPlayVideo: (title: string, videoId: string) => void;
}

const videoCategories = [
  {
    title: "Farm Videos",
    videoId: "farm_video",
    image: "/images/farm_video_thumb.jpg", // placeholder
    desc: "See our happy cows in their natural habitat."
  },
  {
    title: "Dadi Videos",
    videoId: "dadi_video",
    image: "/images/dadi_video_thumb.jpg", // placeholder
    desc: "Watch Dadi crafting the perfect bilona ghee."
  },
  {
    title: "Bilona Process Videos",
    videoId: "process_video",
    image: "/images/process_video_thumb.jpg", // placeholder
    desc: "Experience the authentic wooden churning process."
  }
];

export default function RealVideos({ onPlayVideo }: RealVideosProps) {
  return (
    <section className="py-24 bg-sky-50/50 border-b border-sky-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="space-y-2 mb-16 text-center">
          <span className="font-cursive text-2xl text-sky-600 font-bold block">
            See It To Believe It
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-slate-800 leading-tight">
            Real Videos
          </h2>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videoCategories.map((video, idx) => (
            <div 
              key={idx}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-sm border border-sky-100 hover:shadow-lg transition-all duration-300"
            >
              {/* Thumbnail Container */}
              <div 
                className="relative aspect-[16/10] bg-slate-200 cursor-pointer overflow-hidden"
                onClick={() => onPlayVideo(video.title, video.videoId)}
              >
                {/* Fallback pattern if image is missing */}
                <div className="absolute inset-0 bg-sky-900/10 flex items-center justify-center">
                  <Play className="w-12 h-12 text-white/50" />
                </div>
                
                {/* Video Image (assuming placeholder paths might not exist, but adding next/image setup) */}
                <div className="absolute inset-0 bg-sky-900/30 group-hover:bg-sky-900/10 transition-all duration-500 z-10" />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0078BE]/90 group-hover:border-[#0078BE] transition-all duration-300 shadow-xl">
                    <Play className="w-6 h-6 fill-white text-white ml-1" />
                  </div>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif font-bold text-slate-800 text-xl mb-2 group-hover:text-[#0078BE] transition-colors">
                  {video.title}
                </h3>
                <p className="text-slate-500 text-sm">
                  {video.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
