import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Plus, Minus, ShoppingCart, Zap } from "lucide-react";

interface Product {
  id: string;
  name: string;
  sizeDesc: string;
  desc: string;
  image: string;
  price: number;
  badge: string;
  rating: string;
}

interface ProductGridProps {
  onAddToCart: (productId: string, name: string, image: string, size: string, price: number, quantity: number) => void;
  onBuyNow: (productId: string, name: string, image: string, size: string, price: number, quantity: number) => void;
}

const products: Product[] = [
  {
    id: "ghee_500ml",
    name: "Pure Buffalo Bilona Ghee",
    sizeDesc: "500ml Jar",
    desc: "Handcrafted using traditional wooden churning on fresh curd. Hand-poured under Dadi's guidance.",
    image: "/images/buffalo_ghee_single.png",
    price: 749,
    badge: "Bestseller",
    rating: "4.9"
  },
  {
    id: "ghee_1l",
    name: "Pure Buffalo Bilona Ghee",
    sizeDesc: "1 Litre Jar",
    desc: "Handcrafted using traditional wooden churning on fresh curd. High granular quality for the family.",
    image: "/images/buffalo_ghee_single.png",
    price: 1399,
    badge: "Family Pick",
    rating: "4.9"
  },
  {
    id: "ghee_twin_500ml",
    name: "Bilona Ghee Twin-Pack",
    sizeDesc: "2 x 500ml Jars",
    desc: "A convenient twin-pack of our 500ml signature golden ghee. Perfect for regular use and gifting.",
    image: "/images/buffalo_ghee_combo.png",
    price: 1449,
    badge: "Combo Deal",
    rating: "4.8"
  },
  {
    id: "ghee_twin_1l",
    name: "Bilona Ghee Twin-Pack",
    sizeDesc: "2 x 1 Litre Jars",
    desc: "The ultimate family bundle. Enjoy our pure bilona ghee uninterrupted with this heavy-value pack.",
    image: "/images/buffalo_ghee_combo.png",
    price: 2699,
    badge: "Best Value",
    rating: "4.9"
  }
];

export default function ProductGrid({ onAddToCart, onBuyNow }: ProductGridProps) {
  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({
    ghee_500ml: 1,
    ghee_1l: 1,
    ghee_twin_500ml: 1,
    ghee_twin_1l: 1,
  });

  const handleQuantityChange = (productId: string, delta: number) => {
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta),
    }));
  };

  return (
    <section id="shop" className="relative py-24 bg-slate-50 border-t border-slate-100 overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-[#f0f9f0] to-transparent opacity-60" />
      
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center space-y-4 mb-16 max-w-2xl mx-auto">
          <span className="font-cursive text-2xl text-amber-600 font-bold block">
            Dairy Cool Favorites
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 leading-tight">
            Shop Our <span className="text-[#0284c7]">Bestsellers</span>
          </h2>
          <p className="text-slate-500 text-sm md:text-base leading-relaxed">
            Each jar is slowly processed on mud chulhas to achieve that signature golden aroma and grainy texture.
          </p>
        </div>

        {/* Product Grid (4 columns on lg screens) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => {
            const qty = productQuantities[product.id] || 1;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-slate-100/80 shadow-lg hover:shadow-2xl hover:shadow-[#0284c7]/10 transition-all duration-500 flex flex-col overflow-hidden"
              >
                {/* Image Section */}
                <Link 
                  href={`/products/${product.id}`} 
                  className="relative w-full aspect-[4/3] bg-[#f8f5f0] overflow-hidden block"
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-200/40 mix-blend-multiply z-0" />
                  
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover scale-110 group-hover:scale-125 transition-transform duration-700 ease-out z-10"
                    priority
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className="bg-white/95 backdrop-blur-sm text-slate-800 font-bold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {product.badge}
                    </span>
                  </div>

                  {/* Rating Badge */}
                  <div className="absolute bottom-3 right-3 z-20">
                    <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      <span className="text-[10px] font-bold text-slate-700">{product.rating}</span>
                    </div>
                  </div>
                </Link>

                {/* Content Section */}
                <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between bg-white relative">
                  
                  <div className="space-y-2.5">
                    {/* Title & Desc */}
                    <div>
                      <Link href={`/products/${product.id}`} className="block group-hover:text-[#0284c7] transition-colors">
                        <h3 className="text-lg font-serif font-extrabold text-slate-900 mb-1 leading-tight line-clamp-2 min-h-[44px]">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="text-[#0284c7] font-extrabold text-xs mb-2">
                        {product.sizeDesc}
                      </p>
                      <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2 min-h-[32px]">
                        {product.desc}
                      </p>
                    </div>

                    <div className="w-full h-px bg-slate-100 my-3" />

                    {/* Quantity Row */}
                    <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">Qty</span>
                        <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm">
                          <button
                            onClick={() => handleQuantityChange(product.id, -1)}
                            className="px-2 py-1.5 text-slate-500 hover:text-[#0284c7] hover:bg-slate-50 transition cursor-pointer"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-1 font-bold text-slate-800 text-xs w-6 text-center select-none">
                            {qty}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(product.id, 1)}
                            className="px-2 py-1.5 text-slate-500 hover:text-[#0284c7] hover:bg-slate-50 transition cursor-pointer"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                    </div>
                  </div>

                  {/* Price & Actions Row */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                    
                    <div className="flex items-end justify-between">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Total Price</span>
                      <span className="font-serif font-black text-2xl text-slate-900 leading-none">
                        ₹{product.price * qty}
                      </span>
                    </div>

                    <div className="flex flex-row items-center gap-2">
                      <button
                        onClick={() => onAddToCart(product.id, product.name, product.image, product.sizeDesc, product.price, qty)}
                        className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2.5 rounded-lg border-2 border-slate-200 text-slate-600 hover:border-[#0284c7] hover:text-[#0284c7] hover:bg-[#f0f9ff] font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer"
                      >
                        <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                        <span>Add</span>
                      </button>
                      <button
                        onClick={() => onBuyNow(product.id, product.name, product.image, product.sizeDesc, product.price, qty)}
                        className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2.5 rounded-lg bg-[#0284c7] hover:bg-[#0274b3] text-white font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer shadow-md shadow-[#0284c7]/20 hover:shadow-lg hover:-translate-y-px"
                      >
                        <Zap className="w-3.5 h-3.5 shrink-0" />
                        <span>Buy</span>
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
