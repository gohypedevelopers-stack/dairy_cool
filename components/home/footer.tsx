import React from "react";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden">

      {/* Main Footer Content */}
      <div className="bg-[#0078BE] text-white pt-10 pb-6 border-t border-white/20 relative overflow-hidden">

        {/* ── Full-footer SVG village background ── */}
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="xMidYMax slice"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full pointer-events-none select-none"
          aria-hidden="true"
        >
          {/* Rolling hills */}
          <ellipse cx="200"  cy="380" rx="340" ry="130" fill="rgba(255,255,255,0.03)" />
          <ellipse cx="900"  cy="390" rx="440" ry="140" fill="rgba(255,255,255,0.02)" />
          <ellipse cx="1350" cy="370" rx="280" ry="120" fill="rgba(255,255,255,0.03)" />

          {/* Ground strip */}
          <rect x="0" y="270" width="1440" height="50" fill="rgba(255,255,255,0.04)" />

          {/* ── Left Trees ── */}
          <rect x="30"  y="220" width="8" height="55" fill="rgba(255,255,255,0.09)" rx="2" />
          <ellipse cx="34" cy="198" rx="22" ry="28" fill="rgba(255,255,255,0.07)" />
          <ellipse cx="34" cy="180" rx="16" ry="20" fill="rgba(255,255,255,0.05)" />
          <ellipse cx="34" cy="165" rx="10" ry="14" fill="rgba(255,255,255,0.04)" />

          <rect x="78"  y="232" width="7" height="42" fill="rgba(255,255,255,0.09)" rx="2" />
          <ellipse cx="81" cy="212" rx="18" ry="22" fill="rgba(255,255,255,0.06)" />
          <ellipse cx="81" cy="196" rx="13" ry="17" fill="rgba(255,255,255,0.04)" />
          <ellipse cx="81" cy="183" rx="8"  ry="12" fill="rgba(255,255,255,0.03)" />

          <rect x="128" y="210" width="9" height="64" fill="rgba(255,255,255,0.09)" rx="2" />
          <ellipse cx="132" cy="186" rx="26" ry="30" fill="rgba(255,255,255,0.07)" />
          <ellipse cx="132" cy="164" rx="19" ry="23" fill="rgba(255,255,255,0.05)" />
          <ellipse cx="132" cy="147" rx="13" ry="17" fill="rgba(255,255,255,0.03)" />

          {/* ── Left Hut ── */}
          <rect    x="220" y="230" width="80" height="50" fill="rgba(255,255,255,0.05)" rx="2" />
          <polygon points="210,230 260,188 310,230"      fill="rgba(255,255,255,0.08)" />
          <rect    x="248" y="252" width="24" height="28" fill="rgba(255,255,255,0.04)" rx="2" />
          <rect    x="225" y="240" width="16" height="14" fill="rgba(255,255,255,0.04)" rx="1" />
          <rect    x="278" y="240" width="16" height="14" fill="rgba(255,255,255,0.04)" rx="1" />
          <rect    x="280" y="196" width="11" height="26" fill="rgba(255,255,255,0.07)" rx="1" />
          <circle cx="285" cy="190" r="6"  fill="rgba(255,255,255,0.03)" />
          <circle cx="290" cy="183" r="5"  fill="rgba(255,255,255,0.02)" />
          <circle cx="283" cy="176" r="4"  fill="rgba(255,255,255,0.02)" />

          {/* ── Cow ── */}
          <ellipse cx="390" cy="258" rx="34" ry="18" fill="rgba(255,255,255,0.06)" />
          <ellipse cx="424" cy="250" rx="15" ry="12" fill="rgba(255,255,255,0.06)" />
          <ellipse cx="433" cy="243" rx="5"  ry="3"  fill="rgba(255,255,255,0.05)" />
          <line x1="430" y1="241" x2="436" y2="232" stroke="rgba(255,255,255,0.09)" strokeWidth="2" />
          <rect x="364" y="272" width="7" height="20" fill="rgba(255,255,255,0.06)" rx="2" />
          <rect x="376" y="272" width="7" height="20" fill="rgba(255,255,255,0.06)" rx="2" />
          <rect x="396" y="272" width="7" height="20" fill="rgba(255,255,255,0.06)" rx="2" />
          <rect x="408" y="272" width="7" height="20" fill="rgba(255,255,255,0.06)" rx="2" />
          <path d="M356,254 Q342,263 346,277" stroke="rgba(255,255,255,0.08)" strokeWidth="2" fill="none" />
          <ellipse cx="378" cy="275" rx="9" ry="5" fill="rgba(255,255,255,0.04)" />

          {/* ── Well ── */}
          <ellipse cx="510" cy="276" rx="17" ry="7"  fill="rgba(255,255,255,0.05)" />
          <rect    x="492" y="252" width="36" height="24" fill="rgba(255,255,255,0.04)" rx="1" />
          <rect    x="496" y="238" width="3"  height="18" fill="rgba(255,255,255,0.07)" rx="1" />
          <rect    x="520" y="238" width="3"  height="18" fill="rgba(255,255,255,0.07)" rx="1" />
          <rect    x="492" y="236" width="36" height="6"  fill="rgba(255,255,255,0.07)" rx="1" />
          <line x1="510" y1="242" x2="510" y2="260" stroke="rgba(255,255,255,0.07)" strokeWidth="1.5" />
          <rect    x="504" y="260" width="12" height="10" fill="rgba(255,255,255,0.05)" rx="1" />

          {/* ── Centre Trees ── */}
          <rect x="610" y="215" width="9" height="60" fill="rgba(255,255,255,0.09)" rx="2" />
          <ellipse cx="614" cy="190" rx="28" ry="32" fill="rgba(255,255,255,0.07)" />
          <ellipse cx="614" cy="170" rx="21" ry="24" fill="rgba(255,255,255,0.05)" />
          <ellipse cx="614" cy="152" rx="14" ry="18" fill="rgba(255,255,255,0.03)" />

          <rect x="666" y="228" width="7" height="46" fill="rgba(255,255,255,0.09)" rx="2" />
          <ellipse cx="669" cy="208" rx="20" ry="24" fill="rgba(255,255,255,0.06)" />
          <ellipse cx="669" cy="190" rx="14" ry="18" fill="rgba(255,255,255,0.04)" />

          {/* ── Farmer ── */}
          <rect    x="730" y="245" width="13" height="26" fill="rgba(255,255,255,0.06)" rx="3" />
          <circle  cx="736" cy="238" r="9"               fill="rgba(255,255,255,0.06)" />
          <ellipse cx="736" cy="230" rx="13" ry="4"      fill="rgba(255,255,255,0.07)" />
          <rect    x="731" y="222" width="10" height="10" fill="rgba(255,255,255,0.06)" rx="1" />
          <rect    x="731" y="269" width="6"  height="18" fill="rgba(255,255,255,0.06)" rx="2" />
          <rect    x="738" y="269" width="6"  height="18" fill="rgba(255,255,255,0.06)" rx="2" />
          <line x1="730" y1="252" x2="714" y2="263" stroke="rgba(255,255,255,0.07)" strokeWidth="2" />
          <line x1="714" y1="263" x2="709" y2="283" stroke="rgba(255,255,255,0.09)" strokeWidth="2" />

          {/* ── Matka ── */}
          <ellipse cx="798" cy="272" rx="15" ry="9"  fill="rgba(255,255,255,0.05)" />
          <ellipse cx="798" cy="260" rx="13" ry="14" fill="rgba(255,255,255,0.05)" />
          <ellipse cx="798" cy="251" rx="8"  ry="5"  fill="rgba(255,255,255,0.04)" />

          {/* ── Right Hut ── */}
          <rect    x="890" y="236" width="68" height="44" fill="rgba(255,255,255,0.04)" rx="2" />
          <polygon points="878,236 924,198 970,236"       fill="rgba(255,255,255,0.07)" />
          <rect    x="912" y="256" width="20" height="24" fill="rgba(255,255,255,0.04)" rx="2" />
          <rect    x="894" y="244" width="14" height="12" fill="rgba(255,255,255,0.03)" rx="1" />
          <rect    x="940" y="244" width="14" height="12" fill="rgba(255,255,255,0.03)" rx="1" />

          {/* ── Right Trees ── */}
          <rect x="1020" y="218" width="9" height="58" fill="rgba(255,255,255,0.09)" rx="2" />
          <ellipse cx="1024" cy="193" rx="26" ry="30" fill="rgba(255,255,255,0.07)" />
          <ellipse cx="1024" cy="172" rx="19" ry="22" fill="rgba(255,255,255,0.05)" />
          <ellipse cx="1024" cy="155" rx="13" ry="16" fill="rgba(255,255,255,0.03)" />

          <rect x="1080" y="230" width="7" height="44" fill="rgba(255,255,255,0.09)" rx="2" />
          <ellipse cx="1083" cy="210" rx="19" ry="22" fill="rgba(255,255,255,0.06)" />
          <ellipse cx="1083" cy="194" rx="14" ry="17" fill="rgba(255,255,255,0.04)" />

          <rect x="1138" y="222" width="8" height="52" fill="rgba(255,255,255,0.09)" rx="2" />
          <ellipse cx="1142" cy="196" rx="24" ry="28" fill="rgba(255,255,255,0.06)" />
          <ellipse cx="1142" cy="176" rx="17" ry="21" fill="rgba(255,255,255,0.04)" />
          <ellipse cx="1142" cy="160" rx="11" ry="15" fill="rgba(255,255,255,0.03)" />

          <rect x="1208" y="228" width="8" height="46" fill="rgba(255,255,255,0.09)" rx="2" />
          <ellipse cx="1212" cy="204" rx="22" ry="26" fill="rgba(255,255,255,0.06)" />
          <ellipse cx="1212" cy="184" rx="16" ry="20" fill="rgba(255,255,255,0.04)" />

          <rect x="1270" y="224" width="9" height="50" fill="rgba(255,255,255,0.09)" rx="2" />
          <ellipse cx="1274" cy="198" rx="25" ry="28" fill="rgba(255,255,255,0.06)" />
          <ellipse cx="1274" cy="178" rx="18" ry="22" fill="rgba(255,255,255,0.04)" />

          <rect x="1348" y="232" width="7" height="42" fill="rgba(255,255,255,0.09)" rx="2" />
          <ellipse cx="1351" cy="212" rx="19" ry="22" fill="rgba(255,255,255,0.06)" />
          <ellipse cx="1351" cy="196" rx="13" ry="16" fill="rgba(255,255,255,0.04)" />

          <rect x="1408" y="238" width="7" height="36" fill="rgba(255,255,255,0.09)" rx="2" />
          <ellipse cx="1411" cy="220" rx="17" ry="20" fill="rgba(255,255,255,0.06)" />
          <ellipse cx="1411" cy="206" rx="11" ry="14" fill="rgba(255,255,255,0.03)" />

          {/* ── Grass tufts ── */}
          {[20,80,190,340,460,580,700,820,950,1070,1190,1310,1420].map((x, i) => (
            <g key={i}>
              <path d={`M${x},272 Q${x-6},260 ${x-3},251`} stroke="rgba(255,255,255,0.14)" strokeWidth="1.5" fill="none" />
              <path d={`M${x},272 Q${x+6},258 ${x+4},249`} stroke="rgba(255,255,255,0.12)" strokeWidth="1.5" fill="none" />
              <path d={`M${x},272 Q${x},256 ${x+1},247`}   stroke="rgba(255,255,255,0.11)" strokeWidth="1.5" fill="none" />
            </g>
          ))}

          {/* ── Birds ── */}
          <path d="M180,60  Q187,52  194,60"  stroke="rgba(255,255,255,0.22)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M200,52  Q208,43  216,52"  stroke="rgba(255,255,255,0.19)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M560,45  Q568,36  576,45"  stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M582,54  Q588,46  594,54"  stroke="rgba(255,255,255,0.16)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M1060,38 Q1068,29 1076,38" stroke="rgba(255,255,255,0.20)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M1082,48 Q1088,40 1094,48" stroke="rgba(255,255,255,0.17)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M1230,30 Q1238,21 1246,30" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* ── Sun ── */}
          <circle cx="1390" cy="50" r="24" fill="rgba(255,255,255,0.04)" />
          <circle cx="1390" cy="50" r="16" fill="rgba(255,255,255,0.05)" />
          <circle cx="1390" cy="50" r="9"  fill="rgba(255,255,255,0.07)" />
        </svg>

        {/* ── Footer content (above SVG) ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 pb-8 border-b border-white/20">

          {/* Logo Column */}
          <div className="col-span-2 md:col-span-1 space-y-3">
            <div className="relative h-10 w-36">
              <Image
                src="https://dairycoolfarm.com/wp-content/uploads/2026/01/PicsArt_08-17-04.14.09-Edited-1-1.png"
                alt="Dairy Cool Farm Logo"
                fill
                style={{ objectFit: "contain" }}
                className="object-contain object-left brightness-0 invert"
                priority
              />
            </div>
            <p className="text-xs text-white leading-relaxed">
              We preserve traditional Indian dairy recipes and heritage, overseen by grandmother Kamlesh Gurjari at Greater Noida.
            </p>
            <div className="flex gap-2.5 pt-1">
              <a href="#" aria-label="Facebook" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-white transition">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                </svg>
              </a>
              <a href="#" aria-label="Instagram" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-white transition">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="#" aria-label="YouTube" className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 text-white transition">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.108C19.512 3.5 12 3.5 12 3.5s-7.512 0-9.388.555A3.002 3.002 0 0 0 .5 6.163C0 8.07 0 12 0 12s0 3.93.5 5.837a3.003 3.003 0 0 0 2.11 2.108C4.488 20.5 12 20.5 12 20.5s7.512 0 9.388-.555a3.002 3.002 0 0 0 2.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs tracking-wider uppercase text-white">Explore</h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="/"               className="hover:text-white transition">Home</a></li>
              <li><a href="/about-dadi"     className="hover:text-white transition">About Dadi</a></li>
              <li><a href="/bilona-process" className="hover:text-white transition">Bilona Process</a></li>
              <li><a href="/shop"           className="hover:text-white transition">Buy Direct Ghee</a></li>
              <li><a href="/location"       className="hover:text-white transition">Our Store Location</a></li>
            </ul>
          </div>

          {/* Policies */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs tracking-wider uppercase text-white">Policies</h4>
            <ul className="space-y-1.5 text-xs">
              <li><a href="/shipping-policy" className="hover:text-white transition">Shipping Policy</a></li>
              <li><a href="/return-policy" className="hover:text-white transition">Return Policy</a></li>
              <li><a href="/privacy-policy"  className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="/terms"           className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="/#faqs"           className="hover:text-white transition">FAQs</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs tracking-wider uppercase text-white">Contact Us</h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-white shrink-0" />
                <span>+91 9716003060</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-white shrink-0" />
                <span>hello@dairycool.farm</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-white mt-0.5 shrink-0" />
                <span>Village Jansiwana, Greater Noida West, UP - 203207</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/80">
          <p>© {new Date().getFullYear()} Dairy Cool Farm. All rights reserved.</p>
          <p>Made with ❤️ in India.</p>
        </div>

      </div>
    </footer>
  );
}
