import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Testimonials() {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="reviews" className="py-20 bg-[#FAF6F0] border-b border-amber-100/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-16">
          <span className="text-primary font-extrabold text-[11px] uppercase tracking-widest block">Customer Testimonials</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 leading-tight">
            What Our Community Says
          </h2>
          <div className="flex items-center justify-center gap-1.5 bg-sky-50 border border-sky-100/40 px-4 py-2 rounded-full w-fit mx-auto mt-2 text-xs font-bold text-primary">
            <span>Google Rating: 4.9 ★★★★★</span>
            <span className="border-l border-slate-300 pl-2">320+ Verified Buyers</span>
          </div>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative px-2">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 border border-sky-200 flex items-center justify-center text-primary shadow-md active:scale-95 transition md:hidden cursor-pointer"
            aria-label="Previous Testimonials"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Cards */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 scrollbar-none pb-6 md:grid md:grid-cols-3 md:overflow-visible md:pb-0"
          >
            <div className="p-6 rounded-2xl bg-white border border-amber-100/40 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 w-[280px] shrink-0 snap-center md:w-auto md:shrink">
              <div className="space-y-3">
                <div className="flex items-center text-amber-500 text-sm">
                  ★ ★ ★ ★ ★
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  &ldquo;Authentic village aroma! The granules are beautifully formed and the taste is rich and warm. My family is highly satisfied and will continue ordering.&rdquo;
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center font-bold text-primary text-xs">
                  RS
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Rajesh Sharma</h4>
                  <p className="text-[10px] text-slate-450">Verified Buyer</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-amber-100/40 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 w-[280px] shrink-0 snap-center md:w-auto md:shrink">
              <div className="space-y-3">
                <div className="flex items-center text-amber-500 text-sm">
                  ★ ★ ★ ★ ★
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  &ldquo;Feeding my baby only Dairy Cool Ghee now. Since it is handcrafted by Dadi with zero chemicals, I feel completely secure. Excellent packing!&rdquo;
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center font-bold text-primary text-xs">
                  PP
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Pooja Patel</h4>
                  <p className="text-[10px] text-slate-450">Noida, Parent</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-amber-100/40 flex flex-col justify-between shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 w-[280px] shrink-0 snap-center md:w-auto md:shrink">
              <div className="space-y-3">
                <div className="flex items-center text-amber-500 text-sm">
                  ★ ★ ★ ★ ★
                </div>
                <p className="text-xs text-slate-600 leading-relaxed italic">
                  &ldquo;Ordered the combo. Arrived quickly. Lab tested the purity by heating it on a pan, and it is 100% genuine bilona. Love the local farm support.&rdquo;
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-sky-100 flex items-center justify-center font-bold text-primary text-xs">
                  AK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">Amit Kumar</h4>
                  <p className="text-[10px] text-slate-450">Gym Enthusiast</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 border border-sky-200 flex items-center justify-center text-primary shadow-md active:scale-95 transition md:hidden cursor-pointer"
            aria-label="Next Testimonials"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
