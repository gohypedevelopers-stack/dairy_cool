import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">

      {/* Main Footer Content */}
      <div className="bg-[#0078BE] text-white/90 pt-16 pb-8 border-t border-white/20 relative overflow-hidden">
        {/* Background radial */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-900/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 pb-12 border-b border-white/20 z-10 relative">
          
          {/* Logo Column */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="relative h-12 w-40">
              <Image
                src="https://dairycoolfarm.com/wp-content/uploads/2026/01/PicsArt_08-17-04.14.09-Edited-1-1.png"
                alt="Dairy Cool Farm Logo"
                fill
                style={{ objectFit: "contain" }}
                className="object-contain object-left brightness-0 invert"
                priority
              />
            </div>
            <p className="text-xs text-white/70 leading-relaxed">
              We preserve traditional Indian dairy recipes and heritage, overseen by grandmother Kamlesh Gurjari at Greater Noida.
            </p>
            <div className="flex gap-2.5 pt-1">
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-white transition text-xs font-bold">
                FB
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-white transition text-xs font-bold">
                IG
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-white transition text-xs font-bold">
                YT
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs tracking-wider uppercase text-white">Explore</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#about-dadi" className="hover:text-white transition">About Dadi</a></li>
              <li><a href="#bilona-process" className="hover:text-white transition">Bilona Process</a></li>
              <li><a href="#shop" className="hover:text-white transition">Buy Direct Ghee</a></li>
              <li><a href="#store-location" className="hover:text-white transition">Our Store Location</a></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs tracking-wider uppercase text-white">Policies</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#faqs" className="hover:text-white transition">Shipping Policy</a></li>
              <li><a href="#faqs" className="hover:text-white transition">Return Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#faqs" className="hover:text-white transition">FAQs</a></li>
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-4">
            <h4 className="font-bold text-xs tracking-wider uppercase text-white">Contact Us</h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-white" />
                <span>+91 9716003060</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-white" />
                <span>hello@dairycool.farm</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-white mt-0.5" />
                <span>Village Jansiwana, Greater Noida West, UP - 203207</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/60 z-10 relative">
          <p>© {new Date().getFullYear()} Dairy Cool Farm. All rights reserved.</p>
          <p>Made with ❤️ in India.</p>
        </div>
      </div>
    </footer>
  );
}
