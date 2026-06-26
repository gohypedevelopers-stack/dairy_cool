import React from "react";
import { FlaskConical, Microscope, ShieldCheck, PackageCheck } from "lucide-react";

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

        {/* Tree 2 - medium */}
        <rect x="330" y="350" width="7" height="80" rx="3" fill="#c5dfe9" />
        <circle cx="333" cy="310" r="42" fill="#d0e6ef" />
        <circle cx="310" cy="330" r="30" fill="#d0e6ef" />
        <circle cx="358" cy="325" r="32" fill="#d0e6ef" />
        <circle cx="333" cy="295" r="25" fill="#d8ebf2" />

        {/* Leaves/foliage ground */}
        <path d="M380 440 Q390 425 395 440" stroke="#c5dfe9" strokeWidth="1.2" fill="none" />
        <path d="M400 438 Q408 420 416 438" stroke="#c5dfe9" strokeWidth="1.2" fill="none" />
        <ellipse cx="440" cy="435" rx="15" ry="8" fill="#d8ebf2" />

        {/* Tree 3 - small round */}
        <rect x="495" y="370" width="6" height="60" rx="2" fill="#c5dfe9" />
        <circle cx="498" cy="340" r="32" fill="#d0e6ef" />
        <circle cx="480" cy="355" r="22" fill="#d0e6ef" />
        <circle cx="518" cy="350" r="24" fill="#d0e6ef" />

        {/* Basket 2 */}
        <path d="M560 415 L568 440 L588 440 L596 415 Z" stroke="#b8d4e3" strokeWidth="1.5" fill="none" />
        <path d="M563 415 Q578 402 593 415" stroke="#b8d4e3" strokeWidth="1.5" fill="none" />
        <line x1="566" y1="422" x2="586" y2="422" stroke="#b8d4e3" strokeWidth="1" />

        {/* Grass patches center */}
        <path d="M620 445 Q625 430 630 445" stroke="#c5dfe9" strokeWidth="1" fill="none" />
        <path d="M640 443 Q647 425 654 443" stroke="#c5dfe9" strokeWidth="1" fill="none" />
        <path d="M660 445 Q665 432 670 445" stroke="#c5dfe9" strokeWidth="1" fill="none" />

        {/* Tree 4 - large center-right */}
        <rect x="720" y="330" width="9" height="100" rx="4" fill="#c5dfe9" />
        <circle cx="724" cy="285" r="52" fill="#d0e6ef" />
        <circle cx="695" cy="310" r="38" fill="#d0e6ef" />
        <circle cx="755" cy="305" r="40" fill="#d0e6ef" />
        <circle cx="724" cy="265" r="32" fill="#d8ebf2" />

        {/* Small bush */}
        <ellipse cx="830" cy="425" rx="25" ry="15" fill="#d0e6ef" />
        <ellipse cx="820" cy="420" rx="15" ry="10" fill="#d8ebf2" />

        {/* Tree 5 - medium */}
        <rect x="900" y="355" width="7" height="75" rx="3" fill="#c5dfe9" />
        <circle cx="903" cy="320" r="38" fill="#d0e6ef" />
        <circle cx="882" cy="335" r="26" fill="#d0e6ef" />
        <circle cx="926" cy="332" r="28" fill="#d0e6ef" />
        <circle cx="903" cy="300" r="22" fill="#d8ebf2" />

        {/* Leaves cluster */}
        <path d="M970 440 Q978 418 986 440" stroke="#c5dfe9" strokeWidth="1.2" fill="none" />
        <path d="M990 438 Q996 422 1002 438" stroke="#c5dfe9" strokeWidth="1.2" fill="none" />
        <ellipse cx="1020" cy="432" rx="12" ry="7" fill="#d8ebf2" />

        {/* Tree 6 - large right */}
        <rect x="1060" y="335" width="8" height="95" rx="3" fill="#c5dfe9" />
        <circle cx="1064" cy="290" r="50" fill="#d0e6ef" />
        <circle cx="1040" cy="315" r="35" fill="#d0e6ef" />
        <circle cx="1090" cy="310" r="37" fill="#d0e6ef" />
        <circle cx="1064" cy="272" r="28" fill="#d8ebf2" />

        {/* Small plants right */}
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

        {/* Ground foliage right */}
        <ellipse cx="1400" cy="428" rx="30" ry="14" fill="#d0e6ef" />
        <path d="M1420 440 Q1428 420 1436 440" stroke="#c5dfe9" strokeWidth="1.2" fill="none" />

        {/* Ground line */}
        <path d="M0 445 Q60 438 120 445 Q200 450 280 442 Q360 448 440 445 Q520 440 600 445 Q680 450 760 443 Q840 448 920 445 Q1000 440 1080 445 Q1160 450 1240 443 Q1320 448 1440 445 L1440 500 L0 500 Z" fill="#d0e6ef" opacity="0.5" />
      </svg>
    </div>
  );
}

export default function QualityChecks() {
  return (
    <section className="relative py-20 bg-[#dceef5] border-b border-sky-100/50 overflow-hidden">
      {/* SVG Farm Trees Background */}
      <FarmTreesSvgBg />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 mb-16">
          <span className="text-primary font-extrabold text-[11px] uppercase tracking-widest block">Strict Quality Checks</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 leading-tight">
            Only Perfect Makes The Cut
          </h2>
          <p className="text-slate-550 text-sm max-w-md mx-auto">
            Our ghee goes through severe quality, hygiene, and lab testing checkpoints before arriving at your table.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="bg-white/70 backdrop-blur-sm border border-sky-100/40 p-4 md:p-6 rounded-2xl relative space-y-4 flex flex-col justify-between">
            <span className="absolute top-3 right-3 bg-[#0078BE] text-white text-[10px] md:text-xs font-black px-2 md:px-2.5 py-0.5 md:py-1 rounded-full tracking-widest shadow-sm">01</span>
            <div className="space-y-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-sky-100/50 rounded-lg flex items-center justify-center text-[#0284c7]">
                <FlaskConical className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-sm md:text-lg">Raw Milk Tested</h3>
              <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed">
                Checked daily at the farm for fat %, SNF, water adulterations, and synthetic components.
              </p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border border-sky-100/40 p-4 md:p-6 rounded-2xl relative space-y-4 flex flex-col justify-between">
            <span className="absolute top-3 right-3 bg-[#0078BE] text-white text-[10px] md:text-xs font-black px-2 md:px-2.5 py-0.5 md:py-1 rounded-full tracking-widest shadow-sm">02</span>
            <div className="space-y-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-sky-100/50 rounded-lg flex items-center justify-center text-[#0284c7]">
                <Microscope className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-sm md:text-lg">Lab-Report Cleared</h3>
              <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed">
                Periodically tested for heavy metals, pesticides, and microbial counts to ensure clean safety levels.
              </p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border border-sky-100/40 p-4 md:p-6 rounded-2xl relative space-y-4 flex flex-col justify-between">
            <span className="absolute top-3 right-3 bg-[#0078BE] text-white text-[10px] md:text-xs font-black px-2 md:px-2.5 py-0.5 md:py-1 rounded-full tracking-widest shadow-sm">03</span>
            <div className="space-y-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-sky-100/50 rounded-lg flex items-center justify-center text-[#0284c7]">
                <ShieldCheck className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-sm md:text-lg">Hygiene Bottled</h3>
              <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed">
                Bottled in sterilized, food-grade glass jars to prevent toxic plastic leaching and keep flavor fresh.
              </p>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border border-sky-100/40 p-4 md:p-6 rounded-2xl relative space-y-4 flex flex-col justify-between">
            <span className="absolute top-3 right-3 bg-[#0078BE] text-white text-[10px] md:text-xs font-black px-2 md:px-2.5 py-0.5 md:py-1 rounded-full tracking-widest shadow-sm">04</span>
            <div className="space-y-4">
              <div className="w-10 h-10 md:w-12 md:h-12 bg-sky-100/50 rounded-lg flex items-center justify-center text-[#0284c7]">
                <PackageCheck className="w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h3 className="font-serif font-bold text-slate-900 text-sm md:text-lg">Freshly Hand-Packed</h3>
              <p className="text-[10px] md:text-xs text-slate-500 leading-relaxed">
                Hand-wrapped in cloth lids, labeled carefully, and shipped via express network inside corrugated boxes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
