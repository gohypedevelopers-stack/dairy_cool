import React from "react";
import { Play } from "lucide-react";

interface RealVideosProps {
  onPlayVideo: (title: string, videoId: string) => void;
}

const videoCategories = [
  {
    title: "Video 1: Farm & Free-Grazing Buffaloes",
    videoId: "/videos/video1.MOV",
    image: "/images/ingredients_cow_milk.png",
    desc: "See our happy, grass-fed buffaloes roaming freely at Dairy Cool Farm."
  },
  {
    title: "Video 2: Fresh Milk Slow-Boiling over Mud Chulhas",
    videoId: "/videos/video2.MOV",
    image: "/images/ingredients_bilona.png",
    desc: "Fresh raw milk slow-boiled in clay pots to eliminate harmful bacteria."
  },
  {
    title: "Video 3: Traditional Wooden Bilona Churning",
    videoId: "/videos/video3.MOV",
    image: "/images/ingredients_bilona.png",
    desc: "Bi-directional wooden churning before dawn to extract pure golden makhan."
  },
  {
    title: "Video 4: Slow-Cooking Makhan into Granular Ghee",
    videoId: "/videos/video4.MOV",
    image: "/images/buffalo_ghee_single.png",
    desc: "Low-flame copper pot heating that gives Dairy Cool Ghee its rich granular texture."
  },
  {
    title: "Video 5: Dadi's Purity Check & Glass Jar Packaging",
    videoId: "/videos/video5.MOV",
    image: "/images/dadi_image.jpg",
    desc: "Inspected by Kamlesh Gurjari (Dadi) & packed in transit-safe, non-reactive glass jars."
  }
];

export default function RealVideos({ onPlayVideo }: RealVideosProps) {
  return (
    <section id="real-videos" className="py-16 sm:py-24 bg-[#FAF6F0] border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="space-y-2 mb-12 sm:mb-16 text-center">
          <span className="font-cursive text-2xl text-amber-600 font-bold block">
            See It To Believe It
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#2E271E] leading-tight">
            Real Farm &amp; Bilona Videos
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm max-w-lg mx-auto">
            Watch our authentic 5-step Vedic Bilona process recorded live on location at Dairy Cool Farm.
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {videoCategories.map((video, idx) => (
            <div 
              key={idx}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-xs border border-stone-200 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Thumbnail Container */}
              <div 
                className="relative aspect-[16/10] bg-black cursor-pointer overflow-hidden"
                onClick={() => onPlayVideo(video.title, video.videoId)}
              >
                <video
                  src={video.videoId}
                  poster={video.image}
                  muted
                  playsInline
                  preload="metadata"
                  className="object-cover w-full h-full group-hover:scale-105 transition-all duration-700 opacity-90 group-hover:opacity-100"
                />
                
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500 z-10 flex items-center justify-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/30 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0078BE] group-hover:border-[#0078BE] transition-all duration-300 shadow-xl z-20">
                    <Play className="w-6 h-6 fill-white text-white ml-0.5" />
                  </div>
                </div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/30 backdrop-blur-sm border border-white/50 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#0078BE] group-hover:border-[#0078BE] transition-all duration-300 shadow-xl">
                    <Play className="w-6 h-6 fill-white text-white ml-0.5" />
                  </div>
                </div>

                {/* Video Badge */}
                <div className="absolute top-3 left-3 z-20 bg-[#2E271E] text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Video {idx + 1}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5 sm:p-6 flex-grow flex flex-col justify-between space-y-2">
                <div>
                  <h3 className="font-serif font-bold text-[#2E271E] text-base sm:text-lg mb-1 group-hover:text-[#0078BE] transition-colors leading-snug">
                    {video.title}
                  </h3>
                  <p className="text-stone-600 text-xs leading-relaxed">
                    {video.desc}
                  </p>
                </div>

                <button
                  onClick={() => onPlayVideo(video.title, video.videoId)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0078BE] hover:underline pt-2 cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-[#0078BE]" />
                  <span>Watch Video {idx + 1} →</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
