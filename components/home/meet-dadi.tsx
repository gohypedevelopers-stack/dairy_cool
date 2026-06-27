import React from "react";
import Image from "next/image";

export default function MeetDadi() {
  return (
    <section className="py-20 bg-[#FAF6F0] relative overflow-hidden">
      {/* Decorative background sketch placeholder */}
      <div className="absolute right-4 bottom-4 w-80 h-80 opacity-5 pointer-events-none md:block hidden">
        <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#2E271E]" strokeWidth="0.5">
          <path d="M10 90 L10 50 L50 20 L90 50 L90 90 Z" />
          <path d="M40 90 L40 70 L60 70 L60 90" />
          <path d="M20 90 L80 90" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Polaroid Image Block */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative bg-white p-4 pb-12 rounded-lg shadow-xl border border-amber-100/40 -rotate-2 max-w-sm w-full group hover:rotate-0 transition-transform duration-500">
              {/* Tape Effect on Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-8 bg-amber-100/60 backdrop-blur-sm -rotate-1 border border-amber-200/30 shadow-sm" />
              
              <div className="relative aspect-square w-full overflow-hidden rounded border border-slate-100">
                <Image
                  src="/images/dadi_image.webp"
                  alt="Kamlesh Khari - Chief Ghee Maker"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              {/* Polaroid Label */}
              <div className="mt-4 text-center">
                <p className="font-cursive text-2xl text-amber-700 font-bold">Dadi making bilona ghee</p>
              </div>

              {/* Decorative Leaf Overlay */}
              <div className="absolute -bottom-4 -left-4 w-12 h-12 text-amber-600/20 pointer-events-none">
                🌱
              </div>
            </div>
          </div>

          {/* Right: Content Block */}
          <div className="lg:col-span-7 space-y-6 text-[#2E271E]">
            <div className="space-y-2">
              <span className="font-cursive text-2xl text-amber-600 font-bold flex items-center gap-1">
                Meet Our Dadi <span className="text-sm">♡</span>
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black leading-tight">
                Shuddhta Aur Swad, <br />
                <span className="text-[#0078BE]">Dadi Ka Aashirwad</span>
              </h2>
            </div>

            <div className="w-20 h-1 bg-amber-500/80 rounded" />

            <div className="space-y-4 text-[#5A4F43] text-sm md:text-base leading-relaxed">
              <p>
                Daily Cool Ghee ki shurusaat hoti hai Dadi ke paramparik Bilona process se. Unka maanna hai ki ghee sirf ek khaadya padarth nahi, balki sehat aur sanskaron ka prateek hai, isi liye har batch pyaar, dhairya aur parampara ke saath tayar kiya jaata hai.
              </p>
              <p>
                Hum aaj bhi bilona vidhi se, bina milawat, dheere-dheere pakaya hua ghee banate hain — bilkul waise hi jaise ghar ke liye banaya jaata hai. Farq sirf itna hai ki aaj yeh ghee zyada logon ke ghar tak pahunch raha hai.
              </p>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <span className="font-cursive text-4xl text-amber-700 font-bold rotate-[-3deg] select-none">
                Dadi ♡
              </span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
