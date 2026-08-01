import React from "react";
import { Phone, Clock, MapPin, ExternalLink, Calendar } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";

interface LocationsProps {
  onWhatsAppDirect: (message: string) => void;
}

export default function Locations({ onWhatsAppDirect }: LocationsProps) {
  return (
    <section id="store-location" className="py-24 bg-white border-t border-slate-100">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center space-y-3 mb-16 max-w-2xl mx-auto">
          <span className="font-sans text-sm font-bold text-[#0284c7] uppercase tracking-widest">
            Locate Our Farms
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-black text-slate-900 leading-tight">
            Our Store &amp; Farm Locations
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Shop Location Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 sm:p-8 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-500">
            <div className="space-y-6">
              
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block bg-sky-50 text-[#0078BE] border border-sky-100 text-xs font-extrabold px-3.5 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                    Local Shop
                  </span>
                  <h3 className="font-serif font-black text-slate-900 text-xl sm:text-2xl">Gaur City 1 Store</h3>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-600">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-[#0078BE]" />
                <p className="text-xs sm:text-sm leading-relaxed">
                  Near Bharat Petrol Pump &amp; Hanuman Mandir, Gaur City 1, Greater Noida West, UP - 201301
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>11:00 AM – 8:00 PM</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-600">
                  <Phone className="w-4 h-4 text-[#0078BE] shrink-0" />
                  <span>+91 9716003060</span>
                </div>
              </div>

              {/* Map iframe container */}
              <div className="relative aspect-[16/9] bg-slate-100 mt-6 rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.562215848529!2d77.4246!3d28.6133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cee22!2sGaur%20City%201%20Greater%20Noida!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-none grayscale-[20%] contrast-125 opacity-90"
                  allowFullScreen
                  loading="lazy"
                  title="Gaur City Location"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6 sm:mt-8">
              <a
                href="tel:9716003060"
                className="flex items-center justify-center gap-1 sm:gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-2.5 sm:py-3 px-1.5 sm:px-3 text-[11px] sm:text-xs md:text-sm rounded-xl transition-all active:scale-95 whitespace-nowrap min-w-0"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-slate-700" />
                <span>Call</span>
              </a>
              <button
                onClick={() => onWhatsAppDirect("Hello! I want to visit Gaur City 1 store.")}
                className="flex items-center justify-center gap-1 sm:gap-1.5 bg-[#22c55e] hover:bg-[#1eb052] text-white font-bold py-2.5 sm:py-3 px-1.5 sm:px-3 text-[11px] sm:text-xs md:text-sm rounded-xl transition-all shadow-sm sm:shadow-md active:scale-95 cursor-pointer whitespace-nowrap min-w-0"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 fill-current" />
                <span>WhatsApp</span>
              </button>
              <a
                href="https://maps.app.goo.gl/CsrfGksR2gA4pLoj8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 sm:gap-1.5 bg-[#0078BE] hover:bg-[#0066a1] text-white font-bold py-2.5 sm:py-3 px-1.5 sm:px-3 text-[11px] sm:text-xs md:text-sm rounded-xl transition-all shadow-sm sm:shadow-md active:scale-95 whitespace-nowrap min-w-0"
              >
                <span>Directions</span>
                <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              </a>
            </div>
          </div>

          {/* Farm Location Card */}
          <div className="bg-white border border-slate-100 rounded-3xl p-5 sm:p-8 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-500">
            <div className="space-y-6">
              
              <div className="flex justify-between items-start">
                <div>
                  <span className="inline-block bg-sky-50 text-[#0078BE] border border-sky-100 text-xs font-extrabold px-3.5 py-1.5 rounded-full mb-4 uppercase tracking-wider">
                    Organic Farm
                  </span>
                  <h3 className="font-serif font-black text-slate-900 text-xl sm:text-2xl">Village Jansiwana Farm</h3>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-600">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5 text-[#0078BE]" />
                <p className="text-xs sm:text-sm leading-relaxed">
                  Village Jansiwana, Near Maripat Railway Station, Greater Noida - 203207
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                  <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
                  <p>Nearby: <span className="font-medium text-slate-900">Achheja, Vaidpura</span></p>
                </div>
                <div className="flex items-start gap-3 text-xs sm:text-sm text-slate-600">
                  <Calendar className="w-4 h-4 shrink-0 mt-0.5 text-[#0078BE]" />
                  <p>Visits: <span className="font-medium text-slate-900">Appointment required via WhatsApp before visit</span></p>
                </div>
              </div>

              {/* Map iframe container */}
              <div className="relative aspect-[16/9] bg-slate-100 mt-6 rounded-2xl overflow-hidden border border-slate-100 shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.74312384!2d77.4721!3d28.5723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM0JzIwLjMiTiA3N8KwMjgnMTkuNiJF!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin"
                  className="w-full h-full border-none grayscale-[20%] contrast-125 opacity-90"
                  allowFullScreen
                  loading="lazy"
                  title="Jansiwana Farm Location"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-6 sm:mt-8">
              <a
                href="tel:9716003060"
                className="flex items-center justify-center gap-1 sm:gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold py-2.5 sm:py-3 px-1.5 sm:px-3 text-[11px] sm:text-xs md:text-sm rounded-xl transition-all active:scale-95 whitespace-nowrap min-w-0"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-slate-700" />
                <span>Call</span>
              </a>
              <button
                onClick={() => onWhatsAppDirect("Hello! I want to visit the Jansiwana farm.")}
                className="flex items-center justify-center gap-1 sm:gap-1.5 bg-[#22c55e] hover:bg-[#1eb052] text-white font-bold py-2.5 sm:py-3 px-1.5 sm:px-3 text-[11px] sm:text-xs md:text-sm rounded-xl transition-all shadow-sm sm:shadow-md active:scale-95 cursor-pointer whitespace-nowrap min-w-0"
              >
                <WhatsAppIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 fill-current" />
                <span>WhatsApp</span>
              </button>
              <a
                href="https://maps.app.goo.gl/dwQxomWu4aVqifEU8"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1 sm:gap-1.5 bg-[#0078BE] hover:bg-[#0066a1] text-white font-bold py-2.5 sm:py-3 px-1.5 sm:px-3 text-[11px] sm:text-xs md:text-sm rounded-xl transition-all shadow-sm sm:shadow-md active:scale-95 whitespace-nowrap min-w-0"
              >
                <span>Directions</span>
                <ExternalLink className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
