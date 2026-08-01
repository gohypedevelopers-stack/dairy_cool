import React from "react";
import { Play } from "lucide-react";

interface IngredientsProps {
  onPlayVideo?: (title: string, url: string) => void;
}

const steps = [
  {
    num: "01",
    title: "Fresh Milk",
    hindi: "Hamari khush gaay ka taaza aur shuddh doodh",
    videoUrl: "/videos/video1.MOV",
    poster: "/images/ingredients_cow_milk.png"
  },
  {
    num: "02",
    title: "Dahi Jamana",
    hindi: "Doodh ko jamakar tayar kiya jata hai dahi",
    videoUrl: "/videos/video2.MOV",
    poster: "/images/ingredients_slow_cooked.png"
  },
  {
    num: "03",
    title: "Bilona Mathna",
    hindi: "Paramparik bilona se dahi ko matha jata hai",
    videoUrl: "/videos/video3.MOV",
    poster: "/images/ingredients_bilona.png"
  },
  {
    num: "04",
    title: "Makkhan Nikalna",
    hindi: "Mathne ke baad nikalte hai taaza makkhan",
    videoUrl: "/videos/video4.MOV",
    poster: "/images/ingredients_slow_cooked.png"
  },
  {
    num: "05",
    title: "Ghee Tayar",
    hindi: "Makkhan ko dheemi aanch par pakakar banta hai ghee",
    videoUrl: "/videos/video5.MOV",
    poster: "/images/ghee_jar.png"
  }
];

export default function Ingredients({ onPlayVideo }: IngredientsProps) {
  return (
    <section className="py-24 bg-[#FAF6F0] border-b border-amber-100/30 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Title */}
        <div className="text-center space-y-3 mb-20">
          <span className="font-cursive text-2xl text-amber-600 font-bold block">
            Bilona Journey
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-[#2E271E] leading-tight">
            Bilona Method – Step by Step
          </h2>
          <p className="text-sm font-semibold text-amber-700/80 tracking-wider uppercase">
            Dekhiye kaise banta hai hamara Daily Cool Bilona Ghee
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[100px] left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-amber-600/20 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-4 group">
                
                {/* Step Image/Video Card */}
                <div className="relative w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-xl shadow-amber-950/10 group-hover:scale-105 transition-transform duration-500 cursor-pointer"
                  onClick={() => onPlayVideo && onPlayVideo(step.title, step.videoUrl)}
                >
                  {/* Step Number Badge */}
                  <span className="absolute top-2 left-1/2 -translate-x-1/2 bg-[#0078BE] text-white text-xs font-black px-2.5 py-1 rounded-full z-20 border border-white">
                    {step.num}
                  </span>

                  {/* Thumbnail / Video */}
                  <video
                    src={step.videoUrl}
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                  />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-100 group-hover:bg-black/40 transition-colors z-10">
                    <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center text-[#0078BE] shadow-md group-hover:scale-110 transition-transform duration-300">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                {/* Step Info */}
                <div className="space-y-1 max-w-[180px]">
                  <h3 className="font-serif font-black text-[#2E271E] text-lg leading-tight group-hover:text-[#0078BE] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs text-[#5A4F43] font-medium leading-relaxed">
                    {step.hindi}
                  </p>
                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
