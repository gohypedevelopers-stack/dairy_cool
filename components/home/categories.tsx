import React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

const categories = [
  {
    title: "Pure Buffalo Milk",
    subtitle: "Thick & Creamy",
    image: "/images/purebuffalomilk.png",
    link: "/#shop"
  },
  {
    title: "Farm Fresh Milk",
    subtitle: "Pure & Natural",
    image: "/images/DSC_5108.JPG",
    link: "/#shop"
  },
  {
    title: "A2 Bilona Ghee",
    subtitle: "Authentic & Handcrafted",
    image: "/images/DSC_5378.JPG",
    link: "/#shop"
  },
  {
    title: "Desi Ghee",
    subtitle: "Traditionally Churned",
    image: "/images/DSC_5208.JPG",
    link: "/#shop"
  },
  {
    title: "Wellness Combos",
    subtitle: "Curated for Health",
    image: "/images/buffalo_ghee_combo.png",
    link: "/#shop"
  }
];

export default function Categories() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7; // Scroll slightly less than full width
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#f9f8f6] -skew-x-12 opacity-40 pointer-events-none" />

      <div className="w-full max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-12 xl:px-16 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="font-cursive text-2xl text-amber-600 font-bold block tracking-wide">
              Farm Fresh
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 leading-[1.1]">
              Explore Our <br className="hidden md:block" />
              <span className="text-[#0284c7]">Pure Collections</span>
            </h2>
          </div>
          
          <div className="md:max-w-md pb-2">
            <p className="text-slate-500 text-sm md:text-base leading-relaxed">
              Every product is sourced directly from our farm, ensuring you get only the most natural, unadulterated goodness delivered to your table.
            </p>
          </div>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative group/slider -mx-4 px-4 sm:mx-0 sm:px-0">
          
          {/* Cards */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-4 md:gap-6 pb-12 pt-4 scrollbar-none"
          >
            {categories.map((cat, i) => (
              <a
                key={i}
                href={cat.link}
                className="group relative flex flex-col w-[260px] md:w-[320px] aspect-[4/5] shrink-0 snap-start overflow-hidden rounded-[2rem] bg-slate-100 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500"
              >
                {/* Full-bleed Image */}
                <Image
                  src={cat.image}
                  alt={cat.title}
                  fill
                  sizes="(max-width: 768px) 260px, 320px"
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                <div className="absolute inset-0 bg-[#0284c7]/20 opacity-0 group-hover:opacity-100 mix-blend-overlay transition-opacity duration-500" />

                {/* Content aligned to bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col justify-end transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <p className="text-amber-400 font-medium text-xs tracking-widest uppercase mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                    {cat.subtitle}
                  </p>
                  <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-white drop-shadow-md">
                    {cat.title}
                  </h3>
                  
                  {/* Hover Button */}
                  <div className="flex items-center gap-2 text-white font-semibold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <span className="border-b border-white/40 pb-0.5 group-hover:border-white transition-colors tracking-wide">
                      Shop Collection
                    </span>
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 hidden md:flex justify-between pointer-events-none px-4 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-300 z-20">
            <button
              onClick={() => scroll("left")}
              className="w-14 h-14 rounded-full bg-white/90 backdrop-blur border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#0284c7] hover:border-[#0284c7] hover:scale-105 shadow-xl pointer-events-auto transition-all"
              aria-label="Previous Categories"
            >
              <ChevronLeft className="w-6 h-6 ml-[-2px]" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-14 h-14 rounded-full bg-white/90 backdrop-blur border border-slate-200 flex items-center justify-center text-slate-600 hover:text-[#0284c7] hover:border-[#0284c7] hover:scale-105 shadow-xl pointer-events-auto transition-all"
              aria-label="Next Categories"
            >
              <ChevronRight className="w-6 h-6 mr-[-2px]" />
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
}
