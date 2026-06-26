import React from "react";
import { Phone, Clock } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";

interface LocationsProps {
  onWhatsAppDirect: (message: string) => void;
}

export default function Locations({ onWhatsAppDirect }: LocationsProps) {
  return (
    <section id="store-location" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-primary font-extrabold text-[11px] uppercase tracking-widest block">Locate Our Farms</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 leading-tight">Our Store & Farm Locations</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Shop location */}
          <div className="bg-sky-50/20 border border-sky-100 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-block bg-sky-100 text-primary text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                🏪 Local Shop
              </span>
              <h3 className="font-serif font-extrabold text-slate-900 text-xl sm:text-2xl">Gaur City 1 Store</h3>
              <p className="text-xs text-slate-550 leading-relaxed">
                Near Bharat Petrol Pump & Hanuman Mandir, Gaur City 1, Greater Noida West, UP - 201301
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>11:00 AM – 8:00 PM</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+91 9716003060</span>
                </div>
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-205">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.562215848529!2d77.4246!3d28.6133!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cee22!2sGaur%20City%201%20Greater%20Noida!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  className="w-full h-full border-none"
                  allowFullScreen
                  loading="lazy"
                  title="Gaur City Location"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <a
                href="tel:9716003060"
                className="bg-white hover:bg-slate-50 text-slate-850 text-center font-bold py-2.5 rounded-lg text-[10px] border border-slate-200 transition uppercase tracking-wider"
              >
                Call
              </a>
              <button
                onClick={() => onWhatsAppDirect("Hello! I want to visit Gaur City 1 store.")}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-lg text-[10px] flex items-center justify-center gap-1 shadow-md transition uppercase tracking-wider cursor-pointer"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
              <a
                href="https://maps.app.goo.gl/CsrfGksR2gA4pLoj8"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-sky-600 text-white text-center font-bold py-2.5 rounded-lg text-[10px] shadow-md transition uppercase tracking-wider"
              >
                Directions
              </a>
            </div>
          </div>

          {/* Farm Location */}
          <div className="bg-sky-50/20 border border-sky-100 rounded-3xl p-6 md:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <span className="inline-block bg-sky-100 text-primary text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                🌾 Organic Farm
              </span>
              <h3 className="font-serif font-extrabold text-slate-900 text-xl sm:text-2xl">Village Jansiwana Farm</h3>
              <p className="text-xs text-slate-555 leading-relaxed">
                Village Jansiwana, Near Maripat Railway Station, Greater Noida - 203207
              </p>
              <div className="text-xs font-semibold text-slate-500 space-y-1">
                <p>• Nearby: <span className="text-slate-800">Achheja, Vaidpura</span></p>
                <p>• Visits: <span className="text-slate-800">Appointment required via WhatsApp before visit</span></p>
              </div>

              <div className="relative aspect-video rounded-xl overflow-hidden border border-slate-205">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3503.74312384!2d77.4721!3d28.5723!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDM0JzIwLjMiTiA3N8KwMjgnMTkuNiJF!5e0!3m2!1sen!2sin!4v1700000000001!5m2!1sen!2sin"
                  className="w-full h-full border-none"
                  allowFullScreen
                  loading="lazy"
                  title="Jansiwana Farm Location"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <a
                href="tel:9716003060"
                className="bg-white hover:bg-slate-50 text-slate-850 text-center font-bold py-2.5 rounded-lg text-[10px] border border-slate-200 transition uppercase tracking-wider"
              >
                Call
              </a>
              <button
                onClick={() => onWhatsAppDirect("Hello! I want to visit the Jansiwana farm.")}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 rounded-lg text-[10px] flex items-center justify-center gap-1 shadow-md transition uppercase tracking-wider cursor-pointer"
              >
                <WhatsAppIcon className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>
              <a
                href="https://maps.app.goo.gl/dwQxomWu4aVqifEU8"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary hover:bg-sky-600 text-white text-center font-bold py-2.5 rounded-lg text-[10px] shadow-md transition uppercase tracking-wider"
              >
                Directions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
