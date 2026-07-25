import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function AdsBanner() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-white via-amber-50/20 to-white">
      <div className="w-full max-w-[1700px] mx-auto px-2 sm:px-4 md:px-6">
        <Link 
          href="#shop"
          className="block relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-amber-500/10 border border-amber-100/80 transition-all duration-500 group cursor-pointer bg-slate-900"
        >
          <div className="relative w-full overflow-hidden bg-slate-900">
            <Image
              src="/images/Dairy Cool banner.png"
              alt="Dairy Cool Special Promotional Offer"
              width={1920}
              height={600}
              sizes="100vw"
              className="w-full h-auto object-contain group-hover:scale-[1.01] transition-transform duration-700 block"
              priority
            />
          </div>

          {/* Subtle Shine Effect on Hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
        </Link>
      </div>
    </section>
  );
}
