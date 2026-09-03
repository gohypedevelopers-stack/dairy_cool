import React from "react";
import Image from "next/image";
import { Star, ShieldCheck, Truck, ArrowRight, CheckCircle2 } from "lucide-react";

export default function AvailableOn() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-orange-50 to-transparent pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
          <span className="font-cursive text-2xl text-amber-600 font-bold block">
            Nationwide Delivery
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-black text-slate-900 leading-tight">
            Now Available on <span className="text-[#FF9900]">Amazon</span>
          </h2>
        </div>

        {/* Premium Banner */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl overflow-hidden shadow-2xl relative">
          
          <div className="absolute inset-0 bg-[url('/images/noise.png')] opacity-10 pointer-events-none mix-blend-overlay"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-8 sm:p-12 lg:p-16">
            
            {/* Left: Content */}
            <div className="space-y-8 relative z-10 order-2 md:order-1 text-center md:text-left">
              
<<<<<<< Updated upstream
              {/* Amazon Logo Container JUST ABOVE IMAGE */}
              <div className="relative h-12 w-44 sm:w-52 bg-white rounded-xl border border-slate-200 shadow-2xs flex items-center justify-center p-2">
                <Image
                  src="/images/amazon.jpg"
                  alt="Amazon India Official Partner"
                  fill
                  className="object-contain p-2"
                  priority
                />
=======
              <div className="flex justify-center md:justify-start">
                <div className="bg-white px-4 py-2 rounded-xl inline-block shadow-md">
                  <Image
                    src="/images/amazon.jpg"
                    alt="Amazon Logo"
                    width={100}
                    height={30}
                    className="object-contain"
                  />
                </div>
>>>>>>> Stashed changes
              </div>

              <div className="space-y-4">
                <h3 className="font-serif font-medium text-white text-3xl sm:text-4xl leading-tight">
                  Get Pure Bilona Ghee Delivered Faster
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Enjoy the convenience of Amazon's reliable delivery network. Get authentic Dairy Cool Buffalo Bilona Ghee shipped anywhere in India with secure packaging.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 pt-4">
                <a
                  href="https://www.amazon.in/dp/B0GN2WVHZK?th=1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#FF9900] hover:bg-[#e68a00] text-slate-900 font-bold text-sm px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 w-full sm:w-auto"
                >
                  <span>Buy on Amazon.in</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
                <div className="flex items-center gap-2 text-slate-300 text-xs font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>100% Purchase Protection</span>
                </div>
              </div>
            </div>

            {/* Right: Product Visual */}
            <div className="relative order-1 md:order-2 flex justify-center items-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF9900]/20 to-transparent rounded-full blur-3xl transform scale-150 pointer-events-none"></div>
              
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 drop-shadow-2xl hover:scale-105 transition-transform duration-700 ease-out">
                <Image
                  src="/images/buffalo_ghee_single.png"
                  alt="Dairy Cool Buffalo Bilona Ghee"
                  fill
                  className="object-contain"
                  priority
                />
                
                {/* Floating elements */}
                <div className="absolute top-4 right-4 bg-white text-slate-900 text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg transform rotate-12 flex items-center gap-1">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  4.9 Rated
                </div>
                
                <div className="absolute bottom-4 left-4 bg-emerald-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg transform -rotate-6 flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  Prime Delivery
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
