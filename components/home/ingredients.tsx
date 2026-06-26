import React from "react";
import { Flame, Leaf, ChevronLeft, ChevronRight } from "lucide-react";
import { ChurnIcon } from "@/components/icons";

const CowIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="10" width="18" height="10" rx="2" />
    <path d="M7 10V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v4" />
    <path d="M21 14h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-1" />
    <path d="M3 14H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h1" />
    <circle cx="8" cy="14" r="1.5" fill="currentColor" />
    <circle cx="16" cy="14" r="1.5" fill="currentColor" />
  </svg>
);

function FarmTreesSvgBg() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <svg
        className="w-full h-full"
        viewBox="0 0 1440 500"
        preserveAspectRatio="xMidYMax slice"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Sun */}
        <circle cx="120" cy="60" r="18" stroke="#b0d4e8" strokeWidth="1.5" fill="none" />
        <line x1="120" y1="35" x2="120" y2="28" stroke="#b0d4e8" strokeWidth="1.2" />
        <line x1="120" y1="85" x2="120" y2="92" stroke="#b0d4e8" strokeWidth="1.2" />
        <line x1="95" y1="60" x2="88" y2="60" stroke="#b0d4e8" strokeWidth="1.2" />
        <line x1="145" y1="60" x2="152" y2="60" stroke="#b0d4e8" strokeWidth="1.2" />
        <line x1="102" y1="42" x2="97" y2="37" stroke="#b0d4e8" strokeWidth="1.2" />
        <line x1="138" y1="78" x2="143" y2="83" stroke="#b0d4e8" strokeWidth="1.2" />
        <line x1="138" y1="42" x2="143" y2="37" stroke="#b0d4e8" strokeWidth="1.2" />
        <line x1="102" y1="78" x2="97" y2="83" stroke="#b0d4e8" strokeWidth="1.2" />
        {/* Tree 1 - large left */}
        <rect x="60" y="340" width="8" height="90" rx="3" fill="#c5dfe9" />
        <circle cx="64" cy="300" r="50" fill="#d0e6ef" />
        <circle cx="40" cy="320" r="35" fill="#d0e6ef" />
        <circle cx="90" cy="315" r="38" fill="#d0e6ef" />
        <circle cx="64" cy="280" r="30" fill="#d8ebf2" />
        {/* Bush 1 */}
        <ellipse cx="170" cy="420" rx="35" ry="20" fill="#d0e6ef" />
        <ellipse cx="155" cy="415" rx="20" ry="15" fill="#d8ebf2" />
        {/* Basket 1 */}
        <path d="M200 410 L210 440 L230 440 L240 410 Z" stroke="#b8d4e3" strokeWidth="1.5" fill="none" />
        <path d="M205 410 Q220 395 235 410" stroke="#b8d4e3" strokeWidth="1.5" fill="none" />
        <line x1="210" y1="418" x2="230" y2="418" stroke="#b8d4e3" strokeWidth="1" />
        <line x1="212" y1="426" x2="228" y2="426" stroke="#b8d4e3" strokeWidth="1" />
        {/* Small plants left */}
        <path d="M280 440 Q285 420 290 440" stroke="#c5dfe9" strokeWidth="1.5" fill="none" />
        <path d="M275 440 Q285 415 295 440" stroke="#c5dfe9" strokeWidth="1.2" fill="none" />
        <ellipse cx="285" cy="435" rx="8" ry="5" fill="#d8ebf2" />
        {/* Tree 2 */}
        <rect x="330" y="350" width="7" height="80" rx="3" fill="#c5dfe9" />
        <circle cx="333" cy="310" r="42" fill="#d0e6ef" />
        <circle cx="310" cy="330" r="30" fill="#d0e6ef" />
        <circle cx="358" cy="325" r="32" fill="#d0e6ef" />
        <circle cx="333" cy="295" r="25" fill="#d8ebf2" />
        <path d="M380 440 Q390 425 395 440" stroke="#c5dfe9" strokeWidth="1.2" fill="none" />
        <path d="M400 438 Q408 420 416 438" stroke="#c5dfe9" strokeWidth="1.2" fill="none" />
        <ellipse cx="440" cy="435" rx="15" ry="8" fill="#d8ebf2" />
        {/* Tree 3 - small */}
        <rect x="495" y="370" width="6" height="60" rx="2" fill="#c5dfe9" />
        <circle cx="498" cy="340" r="32" fill="#d0e6ef" />
        <circle cx="480" cy="355" r="22" fill="#d0e6ef" />
        <circle cx="518" cy="350" r="24" fill="#d0e6ef" />
        {/* Basket 2 */}
        <path d="M560 415 L568 440 L588 440 L596 415 Z" stroke="#b8d4e3" strokeWidth="1.5" fill="none" />
        <path d="M563 415 Q578 402 593 415" stroke="#b8d4e3" strokeWidth="1.5" fill="none" />
        <line x1="566" y1="422" x2="586" y2="422" stroke="#b8d4e3" strokeWidth="1" />
        {/* Center grass */}
        <path d="M620 445 Q625 430 630 445" stroke="#c5dfe9" strokeWidth="1" fill="none" />
        <path d="M640 443 Q647 425 654 443" stroke="#c5dfe9" strokeWidth="1" fill="none" />
        <path d="M660 445 Q665 432 670 445" stroke="#c5dfe9" strokeWidth="1" fill="none" />
        {/* Tree 4 - large center */}
        <rect x="720" y="330" width="9" height="100" rx="4" fill="#c5dfe9" />
        <circle cx="724" cy="285" r="52" fill="#d0e6ef" />
        <circle cx="695" cy="310" r="38" fill="#d0e6ef" />
        <circle cx="755" cy="305" r="40" fill="#d0e6ef" />
        <circle cx="724" cy="265" r="32" fill="#d8ebf2" />
        {/* Small bush */}
        <ellipse cx="830" cy="425" rx="25" ry="15" fill="#d0e6ef" />
        <ellipse cx="820" cy="420" rx="15" ry="10" fill="#d8ebf2" />
        {/* Tree 5 */}
        <rect x="900" y="355" width="7" height="75" rx="3" fill="#c5dfe9" />
        <circle cx="903" cy="320" r="38" fill="#d0e6ef" />
        <circle cx="882" cy="335" r="26" fill="#d0e6ef" />
        <circle cx="926" cy="332" r="28" fill="#d0e6ef" />
        <circle cx="903" cy="300" r="22" fill="#d8ebf2" />
        <path d="M970 440 Q978 418 986 440" stroke="#c5dfe9" strokeWidth="1.2" fill="none" />
        <path d="M990 438 Q996 422 1002 438" stroke="#c5dfe9" strokeWidth="1.2" fill="none" />
        <ellipse cx="1020" cy="432" rx="12" ry="7" fill="#d8ebf2" />
        {/* Tree 6 - large right */}
        <rect x="1060" y="335" width="8" height="95" rx="3" fill="#c5dfe9" />
        <circle cx="1064" cy="290" r="50" fill="#d0e6ef" />
        <circle cx="1040" cy="315" r="35" fill="#d0e6ef" />
        <circle cx="1090" cy="310" r="37" fill="#d0e6ef" />
        <circle cx="1064" cy="272" r="28" fill="#d8ebf2" />
        <path d="M1150 440 Q1155 425 1160 440" stroke="#c5dfe9" strokeWidth="1.2" fill="none" />
        <ellipse cx="1180" cy="430" rx="20" ry="12" fill="#d0e6ef" />
        {/* Basket 3 */}
        <path d="M1210 412 L1218 440 L1238 440 L1246 412 Z" stroke="#b8d4e3" strokeWidth="1.5" fill="none" />
        <path d="M1213 412 Q1228 399 1243 412" stroke="#b8d4e3" strokeWidth="1.5" fill="none" />
        {/* Tree 7 - far right */}
        <rect x="1300" y="350" width="7" height="80" rx="3" fill="#c5dfe9" />
        <circle cx="1303" cy="310" r="42" fill="#d0e6ef" />
        <circle cx="1280" cy="330" r="30" fill="#d0e6ef" />
        <circle cx="1328" cy="325" r="32" fill="#d0e6ef" />
        <circle cx="1303" cy="292" r="24" fill="#d8ebf2" />
        <ellipse cx="1400" cy="428" rx="30" ry="14" fill="#d0e6ef" />
        <path d="M1420 440 Q1428 420 1436 440" stroke="#c5dfe9" strokeWidth="1.2" fill="none" />
        {/* Ground */}
        <path d="M0 445 Q60 438 120 445 Q200 450 280 442 Q360 448 440 445 Q520 440 600 445 Q680 450 760 443 Q840 448 920 445 Q1000 440 1080 445 Q1160 450 1240 443 Q1320 448 1440 445 L1440 500 L0 500 Z" fill="#d0e6ef" opacity="0.5" />
      </svg>
    </div>
  );
}

export default function Ingredients() {
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
    <section className="relative py-12 md:py-20 bg-[#dceef5] border-b border-sky-100/50 overflow-hidden">
      {/* SVG Farm Trees Background */}
      <FarmTreesSvgBg />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-2 mb-10 md:mb-16">
          <div className="flex items-center justify-center gap-4 text-[#0284c7] font-extrabold text-[11px] uppercase tracking-widest">
            <span className="h-[1px] w-12 bg-sky-200"></span>
            <span>Pure Clean Origins</span>
            <span className="h-[1px] w-12 bg-sky-200"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 leading-tight">
            Honest Ingredients, No Substitutes
          </h2>
          <p className="text-slate-650 text-sm max-w-2xl mx-auto leading-relaxed">
            Our Bilona Ghee is made with pure A2 cow milk, traditional churning, and slow heating — with no preservatives, no artificial flavors, and no shortcuts.
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="relative px-2">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll("left")}
            className="absolute -left-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 border border-sky-200 flex items-center justify-center text-[#0284c7] shadow-md active:scale-95 transition md:hidden cursor-pointer"
            aria-label="Previous Ingredients"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Cards */}
          <div
            ref={scrollRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 max-w-7xl mx-auto scrollbar-none pb-6 md:grid md:grid-cols-4 md:overflow-visible md:pb-0"
          >
            {/* Card 1 */}
            <div className="group bg-white rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl transition duration-300 relative aspect-[3/4] border border-slate-100 w-[280px] shrink-0 snap-center md:w-auto md:shrink">
              <video
                src="https://dairycoolfarm.com/wp-content/uploads/2026/03/WhatsApp-Video-2026-03-13-at-4.11.43-PM.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 space-y-3 text-white">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0284c7] shadow-md">
                  <CowIcon className="w-5.5 h-5.5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg leading-tight text-white">Pure A2 Cow Milk</h3>
                  <p className="text-[11px] text-sky-100/90 leading-normal">
                    Made from fresh A2 cow milk sourced from trusted farms.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group bg-white rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl transition duration-300 relative aspect-[3/4] border border-slate-100 w-[280px] shrink-0 snap-center md:w-auto md:shrink">
              <video
                src="https://dairycoolfarm.com/wp-content/uploads/2026/03/WhatsApp-Video-2026-03-11-at-11.39.52-AM-3.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 space-y-3 text-white">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0284c7] shadow-md">
                  <ChurnIcon className="w-5.5 h-5.5 text-[#0284c7]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg leading-tight text-white">Traditional Bilona Method</h3>
                  <p className="text-[11px] text-sky-100/90 leading-normal">
                    Curd is hand-churned using the age-old Bilona process.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="group bg-white rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl transition duration-300 relative aspect-[3/4] border border-slate-100 w-[280px] shrink-0 snap-center md:w-auto md:shrink">
              <video
                src="https://dairycoolfarm.com/wp-content/uploads/2026/02/videoplayback.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 space-y-3 text-white">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0284c7] shadow-md">
                  <Flame className="w-5.5 h-5.5 fill-[#0284c7] text-[#0284c7]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg leading-tight text-white">Slow-Cooked Ghee</h3>
                  <p className="text-[11px] text-sky-100/90 leading-normal">
                    Prepared on low flame to keep the natural aroma, texture, and richness.
                  </p>
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="group bg-white rounded-[2rem] overflow-hidden shadow-md hover:shadow-xl transition duration-300 relative aspect-[3/4] border border-slate-100 w-[280px] shrink-0 snap-center md:w-auto md:shrink">
              <video
                src="https://dairycoolfarm.com/wp-content/uploads/2026/02/videoplayback-1.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 p-6 space-y-3 text-white">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#0284c7] shadow-md">
                  <Leaf className="w-5.5 h-5.5 fill-[#0284c7] text-[#0284c7]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif font-bold text-lg leading-tight text-white">No Preservatives</h3>
                  <p className="text-[11px] text-sky-100/90 leading-normal">
                    Free from hydrogenated oils, artificial colors, flavors, and additives.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll("right")}
            className="absolute -right-1 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 border border-sky-200 flex items-center justify-center text-[#0284c7] shadow-md active:scale-95 transition md:hidden cursor-pointer"
            aria-label="Next Ingredients"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Explore Featured Products Button */}
        <div className="flex justify-center mt-12">
          <a
            href="#shop"
            className="inline-flex items-center gap-2 bg-[#0284c7] hover:bg-[#0274b3] text-white font-extrabold px-8 py-3.5 rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-sky-500/10 cursor-pointer"
          >
            Explore Featured Products
            <span className="text-sm">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
