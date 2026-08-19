import React from "react";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const steps = [
  { 
    name: "Fresh Milk", 
    image: "/images/DSC_5108.JPG",
    desc: "We start with pure, fresh milk sourced directly from healthy cows on our farms."
  },
  { 
    name: "Dahi (Curd)", 
    image: "/images/Dahicurd.png",
    desc: "The milk is boiled in earthen pots and naturally cultured into thick, probiotic-rich curd."
  },
  { 
    name: "Bilona Churning", 
    image: "/images/DSC_5404.JPG",
    desc: "The curd is churned bidirectionally using a traditional wooden bilona before dawn."
  },
  { 
    name: "Makhan Separation", 
    image: "/images/DSC_5283.JPG",
    desc: "Continuous churning separates the rich, pure butter (Makhan) from the buttermilk."
  },
  { 
    name: "Slow Heating", 
    image: "/images/heatingghee.png",
    desc: "The Makhan is slow-heated over a low flame using traditional mud chulhas (hearths)."
  },
  { 
    name: "Pure Bilona Ghee", 
    image: "/images/DSC_5447.JPG",
    desc: "The result is 100% pure, golden, granular Bilona Ghee with an authentic aroma."
  },
];

export default function BilonaProcessSteps() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === "left" ? -320 : 320;
      current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section id="bilona-process" className="py-24 bg-[#FAF6F0] relative overflow-hidden">
      
      {/* Decorative background styling */}
      <div className="absolute top-0 right-0 w-1/3 h-[600px] bg-gradient-to-bl from-sky-100/50 to-transparent opacity-70 pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        
        {/* Header with Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="text-left space-y-3 max-w-2xl">
            <span className="font-cursive text-2xl text-[#0078BE] font-bold block">
              Authentic & Traditional
            </span>
            <h2 className="text-4xl md:text-5xl font-serif font-black text-slate-900 leading-tight">
              The Bilona Process
            </h2>
            <p className="text-slate-500 text-sm md:text-base leading-relaxed pt-2">
              Every drop of our ghee is crafted using the ancient Vedic process. We never use machines or raw cream, ensuring maximum nutrition and taste.
            </p>
          </div>

          {/* Carousel Navigation Buttons */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-end">
            <button
              onClick={() => scroll("left")}
              aria-label="Previous Step"
              className="w-12 h-12 rounded-full bg-white border border-sky-200/80 text-slate-800 flex items-center justify-center shadow-md hover:bg-[#0078BE] hover:text-white hover:border-[#0078BE] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              aria-label="Next Step"
              className="w-12 h-12 rounded-full bg-white border border-sky-200/80 text-slate-800 flex items-center justify-center shadow-md hover:bg-[#0078BE] hover:text-white hover:border-[#0078BE] transition-all duration-300 active:scale-95 cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Horizontally Scrolling Single Row Container */}
        <div className="relative group/slider -mx-4 px-4 sm:mx-0 sm:px-0">
          <div 
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-12 pt-4 scrollbar-none"
          >
            {steps.map((step, index) => (
              <div 
                key={index} 
                className="group relative flex flex-col w-[280px] shrink-0 snap-start bg-white rounded-3xl overflow-hidden border border-sky-100/50 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
              >
                {/* Image Section */}
                <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                  <Image
                    src={step.image}
                    alt={step.name}
                    fill
                    sizes="(max-width: 768px) 280px, 280px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Step Number Badge */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center font-black text-amber-600 font-serif">
                    {index + 1}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 relative z-10 bg-white flex-1 flex flex-col">
                  <h3 className="text-xl font-bold font-serif text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {step.name}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors">
                    {step.desc}
                  </p>
                </div>

                {/* Connecting Arrow (except last) - Visible only on large screens if they fit, but flex keeps them connected conceptually */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-24 -right-3 w-6 h-6 bg-white shadow-md rounded-full items-center justify-center z-20 text-slate-300">
                    <ArrowRight className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
