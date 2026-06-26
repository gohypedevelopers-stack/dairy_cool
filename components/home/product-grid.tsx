import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Plus, Minus } from "lucide-react";

interface ProductOption {
  size: string;
  price: number;
}

interface Product {
  id: string;
  name: string;
  desc: string;
  image: string;
  options: ProductOption[];
  defaultOptionIndex: number;
}

interface ProductGridProps {
  onAddToCart: (productId: string, name: string, image: string, size: string, price: number, quantity: number) => void;
  onBuyNow: (productId: string, name: string, image: string, size: string, price: number, quantity: number) => void;
}

const products: Product[] = [
  {
    id: "bilona_ghee",
    name: "Pure Buffalo Bilona Ghee",
    desc: "Handcrafted using traditional wooden churning on fresh curd. High granular quality. Hand-poured under Dadi's guidance.",
    image: "/images/buffalo_ghee_single.png",
    options: [
      { size: "500ml", price: 749 },
      { size: "1L", price: 1399 }
    ],
    defaultOptionIndex: 0
  },
  {
    id: "combo_packs",
    name: "Dadi Healthy Combo Packs",
    desc: "Best family value bundle. Promotes cognitive immunity and gut health.",
    image: "/images/buffalo_ghee_combo.png",
    options: [
      { size: "Combo Packs", price: 2699 }
    ],
    defaultOptionIndex: 0
  }
];

export default function ProductGrid({ onAddToCart, onBuyNow }: ProductGridProps) {
  // Product Selection States
  const [selectedProductSizes, setSelectedProductSizes] = useState<Record<string, ProductOption>>({
    bilona_ghee: { size: "500ml", price: 749 },
    combo_packs: { size: "Combo Packs", price: 2699 },
  });

  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({
    bilona_ghee: 1,
    combo_packs: 1,
  });

  const handleSizeSelect = (productId: string, size: string, price: number) => {
    setSelectedProductSizes((prev) => ({
      ...prev,
      [productId]: { size, price },
    }));
  };

  const handleQuantityChange = (productId: string, delta: number) => {
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta),
    }));
  };

  return (
    <section id="shop" className="relative py-20 bg-[#f0f9f0] border-b border-sky-100/50 overflow-hidden">

      {/* Nature SVG Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1440 600" preserveAspectRatio="xMidYMax slice" fill="none" xmlns="http://www.w3.org/2000/svg">

          {/* Sky gradient */}
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e8f4fd" />
              <stop offset="100%" stopColor="#f0f9f0" />
            </linearGradient>
          </defs>
          <rect width="1440" height="600" fill="url(#skyGrad)" />

          {/* Sun */}
          <circle cx="1340" cy="70" r="40" fill="#fff8e1" opacity="0.8" />
          <circle cx="1340" cy="70" r="30" fill="#fef3c7" opacity="0.9" />

          {/* Clouds */}
          <ellipse cx="200" cy="80" rx="70" ry="28" fill="white" opacity="0.7" />
          <ellipse cx="250" cy="68" rx="50" ry="22" fill="white" opacity="0.7" />
          <ellipse cx="160" cy="72" rx="40" ry="18" fill="white" opacity="0.6" />

          <ellipse cx="700" cy="55" rx="80" ry="28" fill="white" opacity="0.6" />
          <ellipse cx="755" cy="43" rx="55" ry="22" fill="white" opacity="0.6" />
          <ellipse cx="650" cy="50" rx="45" ry="18" fill="white" opacity="0.5" />

          <ellipse cx="1100" cy="90" rx="65" ry="24" fill="white" opacity="0.6" />
          <ellipse cx="1150" cy="78" rx="45" ry="20" fill="white" opacity="0.6" />

          {/* Flying Birds - left sky */}
          <path d="M120 130 Q125 125 130 130" stroke="#6b8fa3" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M133 126 Q138 121 143 126" stroke="#6b8fa3" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M108 145 Q114 139 120 145" stroke="#6b8fa3" strokeWidth="1.6" fill="none" strokeLinecap="round" />

          {/* Flying Birds - center sky */}
          <path d="M580 100 Q586 94 592 100" stroke="#6b8fa3" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M596 95 Q602 89 608 95" stroke="#6b8fa3" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M566 112 Q573 106 580 112" stroke="#6b8fa3" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M612 108 Q618 102 624 108" stroke="#6b8fa3" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Flying Birds - right sky */}
          <path d="M1050 75 Q1056 69 1062 75" stroke="#6b8fa3" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M1066 70 Q1072 64 1078 70" stroke="#6b8fa3" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M1038 88 Q1045 82 1052 88" stroke="#6b8fa3" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Ground */}
          <path d="M0 480 Q180 460 360 475 Q540 490 720 470 Q900 455 1080 472 Q1260 488 1440 468 L1440 600 L0 600 Z" fill="#c8e6c9" opacity="0.5" />
          <path d="M0 500 Q180 485 360 498 Q540 510 720 492 Q900 478 1080 495 Q1260 510 1440 490 L1440 600 L0 600 Z" fill="#a5d6a7" opacity="0.4" />

          {/* Large Tree - far left */}
          <rect x="30" y="350" width="10" height="140" rx="4" fill="#795548" opacity="0.6" />
          <circle cx="35" cy="300" r="60" fill="#66bb6a" opacity="0.35" />
          <circle cx="10" cy="330" r="42" fill="#66bb6a" opacity="0.3" />
          <circle cx="65" cy="325" r="46" fill="#66bb6a" opacity="0.3" />
          <circle cx="35" cy="275" r="38" fill="#81c784" opacity="0.3" />

          {/* Medium Tree - left */}
          <rect x="180" y="390" width="8" height="100" rx="3" fill="#795548" opacity="0.6" />
          <circle cx="184" cy="350" r="46" fill="#4caf50" opacity="0.3" />
          <circle cx="162" cy="370" r="32" fill="#4caf50" opacity="0.25" />
          <circle cx="208" cy="365" r="35" fill="#4caf50" opacity="0.25" />

          {/* Cow - left field */}
          {/* Body */}
          <ellipse cx="310" cy="490" rx="42" ry="22" fill="#f5f5f5" opacity="0.85" />
          {/* Head */}
          <ellipse cx="348" cy="478" rx="18" ry="14" fill="#f5f5f5" opacity="0.85" />
          {/* Ear */}
          <ellipse cx="342" cy="467" rx="5" ry="7" fill="#f5f5f5" opacity="0.8" />
          <ellipse cx="356" cy="466" rx="5" ry="7" fill="#f5f5f5" opacity="0.8" />
          {/* Eye */}
          <circle cx="354" cy="475" r="2.5" fill="#4a3728" opacity="0.8" />
          {/* Nose */}
          <ellipse cx="363" cy="480" rx="5" ry="3" fill="#ffccbc" opacity="0.8" />
          {/* Spots */}
          <ellipse cx="298" cy="484" rx="12" ry="8" fill="#8d6e63" opacity="0.25" />
          <ellipse cx="320" cy="496" rx="8" ry="5" fill="#8d6e63" opacity="0.2" />
          {/* Legs */}
          <rect x="278" y="508" width="7" height="22" rx="3" fill="#e0e0e0" opacity="0.7" />
          <rect x="295" y="510" width="7" height="20" rx="3" fill="#e0e0e0" opacity="0.7" />
          <rect x="316" y="508" width="7" height="22" rx="3" fill="#e0e0e0" opacity="0.7" />
          <rect x="333" y="510" width="7" height="20" rx="3" fill="#e0e0e0" opacity="0.7" />
          {/* Tail */}
          <path d="M268 485 Q258 495 262 510" stroke="#bdbdbd" strokeWidth="2" fill="none" opacity="0.7" />
          {/* Udder */}
          <ellipse cx="302" cy="508" rx="12" ry="6" fill="#ffccbc" opacity="0.6" />
          {/* Horns */}
          <path d="M345 467 Q340 458 344 452" stroke="#bcaaa4" strokeWidth="2" fill="none" opacity="0.7" />
          <path d="M358 466 Q362 457 358 451" stroke="#bcaaa4" strokeWidth="2" fill="none" opacity="0.7" />

          {/* Grass tufts around cow */}
          <path d="M260 498 Q263 488 266 498" stroke="#66bb6a" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M370 495 Q373 485 376 495" stroke="#66bb6a" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M380 500 Q384 490 388 500" stroke="#66bb6a" strokeWidth="1.5" fill="none" opacity="0.6" />

          {/* Flowers */}
          <circle cx="420" cy="492" r="4" fill="#fff59d" opacity="0.7" />
          <circle cx="418" cy="492" r="3" fill="#f06292" opacity="0.5" />
          <circle cx="440" cy="496" r="3.5" fill="#fff59d" opacity="0.7" />
          <circle cx="438" cy="496" r="2.5" fill="#f48fb1" opacity="0.5" />

          {/* Tree - center left */}
          <rect x="490" y="380" width="9" height="110" rx="4" fill="#795548" opacity="0.55" />
          <circle cx="494" cy="335" r="52" fill="#43a047" opacity="0.28" />
          <circle cx="468" cy="358" r="38" fill="#43a047" opacity="0.24" />
          <circle cx="522" cy="352" r="40" fill="#43a047" opacity="0.24" />
          <circle cx="494" cy="310" r="32" fill="#66bb6a" opacity="0.22" />

          {/* Small bushes center */}
          <ellipse cx="620" cy="498" rx="30" ry="14" fill="#81c784" opacity="0.4" />
          <ellipse cx="608" cy="493" rx="18" ry="10" fill="#a5d6a7" opacity="0.4" />

          {/* Butterfly */}
          <path d="M680 380 Q685 370 690 380 Q685 388 680 380Z" fill="#ce93d8" opacity="0.5" />
          <path d="M690 380 Q695 370 700 380 Q695 388 690 380Z" fill="#f48fb1" opacity="0.5" />
          <line x1="690" y1="375" x2="690" y2="385" stroke="#7b1fa2" strokeWidth="0.8" opacity="0.4" />

          {/* Tree - center right */}
          <rect x="780" y="370" width="9" height="120" rx="4" fill="#795548" opacity="0.55" />
          <circle cx="784" cy="322" r="56" fill="#388e3c" opacity="0.27" />
          <circle cx="756" cy="348" r="40" fill="#388e3c" opacity="0.23" />
          <circle cx="814" cy="342" r="42" fill="#388e3c" opacity="0.23" />
          <circle cx="784" cy="298" r="35" fill="#4caf50" opacity="0.2" />

          {/* Second Cow - right side grazing */}
          <ellipse cx="1050" cy="488" rx="38" ry="20" fill="#f5e6d3" opacity="0.8" />
          <ellipse cx="1084" cy="477" rx="16" ry="13" fill="#f5e6d3" opacity="0.8" />
          <circle cx="1093" cy="474" r="2" fill="#4a3728" opacity="0.8" />
          <ellipse cx="1098" cy="479" rx="4" ry="2.5" fill="#ffccbc" opacity="0.8" />
          <ellipse cx="1042" cy="483" rx="10" ry="7" fill="#c8956c" opacity="0.25" />
          <rect x="1020" y="504" width="6" height="20" rx="3" fill="#e0d0c0" opacity="0.7" />
          <rect x="1035" y="506" width="6" height="18" rx="3" fill="#e0d0c0" opacity="0.7" />
          <rect x="1053" y="504" width="6" height="20" rx="3" fill="#e0d0c0" opacity="0.7" />
          <rect x="1068" y="505" width="6" height="18" rx="3" fill="#e0d0c0" opacity="0.7" />
          <path d="M1036 467 Q1030 458 1034 452" stroke="#bcaaa4" strokeWidth="1.8" fill="none" opacity="0.6" />

          {/* Grass tufts right */}
          <path d="M1100 495 Q1103 485 1106 495" stroke="#66bb6a" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M1112 498 Q1116 488 1120 498" stroke="#66bb6a" strokeWidth="1.5" fill="none" opacity="0.6" />

          {/* Large Tree - far right */}
          <rect x="1260" y="355" width="10" height="135" rx="4" fill="#795548" opacity="0.55" />
          <circle cx="1265" cy="305" r="58" fill="#2e7d32" opacity="0.27" />
          <circle cx="1238" cy="332" r="42" fill="#2e7d32" opacity="0.23" />
          <circle cx="1294" cy="326" r="44" fill="#2e7d32" opacity="0.23" />
          <circle cx="1265" cy="280" r="36" fill="#43a047" opacity="0.2" />

          {/* Medium Tree - right */}
          <rect x="1380" y="385" width="8" height="105" rx="3" fill="#795548" opacity="0.55" />
          <circle cx="1384" cy="344" r="46" fill="#388e3c" opacity="0.27" />
          <circle cx="1362" cy="364" r="32" fill="#388e3c" opacity="0.23" />

          {/* More flowers & grass */}
          <path d="M900 495 Q903 484 906 495" stroke="#81c784" strokeWidth="1.5" fill="none" opacity="0.6" />
          <circle cx="920" cy="490" r="3.5" fill="#fff176" opacity="0.7" />
          <circle cx="918" cy="490" r="2.5" fill="#ff8a65" opacity="0.5" />
          <path d="M940 498 Q944 487 948 498" stroke="#66bb6a" strokeWidth="1.5" fill="none" opacity="0.6" />

          {/* Bird near tree */}
          <path d="M490 250 Q496 244 502 250" stroke="#5d7a8a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M505 245 Q511 239 517 245" stroke="#5d7a8a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M478 262 Q485 256 492 262" stroke="#5d7a8a" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-3 mb-16">
          <span className="text-primary font-extrabold text-[11px] uppercase tracking-widest block">Shop Our Bestsellers</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 leading-tight">
            Pure Bilona A2 Ghee &amp; Combos
          </h2>
          <p className="text-slate-550 text-sm max-w-lg mx-auto">
            Each jar is slowly processed on mud chulhas to achieve that signature golden aroma and grainy texture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {products.map((product) => {
            const currentSel = selectedProductSizes[product.id] || product.options[0];
            const qty = productQuantities[product.id] || 1;

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col p-5"
              >
                {/* Top Part: Product Image in aspect-[16/10] with rounded corners */}
                <Link href={`/products/${product.id}`} className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-slate-50 border border-slate-100/50 mb-4 cursor-pointer block">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: "cover" }}
                    className="object-cover"
                    priority
                  />
                  
                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 bg-[#0284c7] text-white font-extrabold text-[9px] px-3 py-1 rounded-full uppercase tracking-wider">
                    {product.id === "combo_packs" ? "Wellness Combo" : "Buffalo Bilona Ghee"}
                  </span>
                </Link>

                {/* Rating Stars */}
                <div className="flex items-center gap-1.5 my-2">
                  <div className="flex text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="text-[10px] font-bold text-slate-500">(4.9/5 stars)</span>
                </div>

                {/* Product Details */}
                <div className="flex-1 flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Name & Description */}
                    <div className="space-y-1.5">
                      <Link href={`/products/${product.id}`} className="hover:text-primary transition duration-200 block">
                        <h3 className="text-base md:text-lg font-serif font-extrabold text-slate-900 leading-tight">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-slate-500 text-xs md:text-sm leading-relaxed min-h-[40px]">
                        {product.desc}
                      </p>
                    </div>

                    {/* Pack Options */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider block">Pack Option</span>
                      <div className="grid grid-cols-2 gap-2">
                        {product.options.map((opt) => (
                          <button
                            key={opt.size}
                            onClick={() => handleSizeSelect(product.id, opt.size, opt.price)}
                            className={`px-3 py-2 rounded-lg text-xs font-bold border text-center transition cursor-pointer ${
                              product.options.length === 1 ? "col-span-2" : ""
                            } ${
                              currentSel.size === opt.size
                                ? "bg-[#f0f9ff] border-[#0284c7] text-[#0284c7] font-extrabold"
                                : "bg-white border-slate-200 text-slate-650 hover:bg-slate-50"
                            }`}
                          >
                            {opt.size}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Select Quantity */}
                    <div className="flex items-center justify-between gap-4 py-1">
                      <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">Select Quantity</span>
                      <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
                        <button
                          onClick={() => handleQuantityChange(product.id, -1)}
                          className="px-2 py-1 text-slate-650 hover:text-[#0284c7] active:bg-slate-50 transition cursor-pointer"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 font-bold text-slate-800 text-xs w-6 text-center">
                          {qty}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(product.id, 1)}
                          className="px-2 py-1 text-slate-650 hover:text-[#0284c7] active:bg-slate-50 transition cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Net Total & Buttons (ADD, BUY NOW) */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 mt-5">
                    <div className="flex justify-between sm:flex-col items-center sm:items-start w-full sm:w-auto">
                      <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest leading-none">Net Total</span>
                      <span className="font-sans font-black text-2xl text-[#0284c7] mt-1 sm:mt-1.5 leading-none tracking-tight">
                        ₹{currentSel.price * qty}
                      </span>
                    </div>

                    <div className="flex gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => onAddToCart(product.id, product.name, product.image, currentSel.size, currentSel.price, qty)}
                        className="flex-1 sm:flex-initial px-3.5 py-2 rounded-lg border border-slate-200 text-[#0284c7] hover:bg-[#f0f9ff] font-bold text-xs transition uppercase tracking-wider text-center cursor-pointer"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => onBuyNow(product.id, product.name, product.image, currentSel.size, currentSel.price, qty)}
                        className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-[#0284c7] hover:bg-[#0274b3] text-white font-bold text-xs transition uppercase tracking-wider text-center cursor-pointer shadow-md"
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
