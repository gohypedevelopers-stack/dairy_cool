"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Plus, Minus, ShoppingCart, Zap } from "lucide-react";
import { getProductStockInfo } from "@/lib/inventory";

interface Product {
  id: string;
  name: string;
  sizeDesc: string;
  desc: string;
  image: string;
  price: number;
  mrp: number;
  discount: string;
  badge: string;
  rating: string;
  usp: string;
}

interface ProductGridProps {
  onAddToCart: (productId: string, name: string, image: string, size: string, price: number, quantity: number) => void;
  onBuyNow: (productId: string, name: string, image: string, size: string, price: number, quantity: number) => void;
  wpProducts?: any[];
}

const products: Product[] = [
  {
    id: "ghee_500ml",
    name: "Pure Buffalo Bilona Ghee",
    sizeDesc: "200g / 500ml / 1kg",
    desc: "Handcrafted using traditional wooden churning on fresh curd. Hand-poured under Dadi's guidance.",
    image: "/images/buffalo_ghee_single.png",
    price: 749,
    mrp: 949,
    discount: "21% OFF",
    badge: "Bestseller",
    rating: "4.9",
    usp: "Wooden Churned • Zero Preservatives"
  },
  {
    id: "ghee_1l",
    name: "Premium Bilona Ghee",
    sizeDesc: "200g / 500ml / 1kg",
    desc: "Experience the authentic golden granular texture that only traditional bilona can achieve.",
    image: "/images/buffalo_ghee_single.png",
    price: 1399,
    mrp: 1799,
    discount: "22% OFF",
    badge: "Family Pick",
    rating: "4.9",
    usp: "Cultured Curd • Glass Packaging"
  },
  {
    id: "ghee_twin_500ml",
    name: "Bilona Ghee Twin-Pack",
    sizeDesc: "2 x 500ml Jars",
    desc: "A convenient twin-pack of our signature golden ghee. Perfect for regular use and gifting.",
    image: "/images/buffalo_ghee_combo.png",
    price: 1449,
    mrp: 1898,
    discount: "23% OFF",
    badge: "Combo Deal",
    rating: "4.8",
    usp: "Great Value • Free Delivery"
  },
  {
    id: "ghee_twin_1l",
    name: "Bilona Ghee Family Pack",
    sizeDesc: "2 x 1 Litre Jars",
    desc: "The ultimate family bundle. Enjoy our pure bilona ghee uninterrupted with this heavy-value pack.",
    image: "/images/buffalo_ghee_combo.png",
    price: 2699,
    mrp: 3598,
    discount: "25% OFF",
    badge: "Best Value",
    rating: "4.9",
    usp: "Stock Up • Save Big"
  }
];

function decodeHTMLEntities(str: string): string {
  if (!str) return "";
  return str
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/<[^>]*>?/gm, "");
}

function parseWpProduct(wp: any): { sizeDesc: string; desc: string } {
  let cleanShort = decodeHTMLEntities(wp.shortDescription || "");
  let cleanFull = decodeHTMLEntities(wp.description || "");

  const sizeMatch = wp.name.match(/\b(\d+\s*(?:kg|g|ml|l|litre|liter|pack|jars?))\b/i) 
    || cleanShort.match(/\b(\d+\s*(?:kg|g|ml|l|litre|liter|pack|jars?))\b/i);

  let sizeDesc = sizeMatch ? `${sizeMatch[1]} Jar` : "1 Litre Jar";

  if (cleanShort && cleanShort.length <= 35) {
    sizeDesc = cleanShort;
  }

  let desc = cleanFull;
  if (!desc || desc === cleanShort) {
    desc = "Handcrafted using traditional wooden churning on fresh curd. Hand-poured under Dadi's guidance.";
  }
  desc = desc.replace(/^\s*\d+\s*(?:kg|g|ml|l|litre|liter|pack|jars?)\s*/i, "");

  return { sizeDesc, desc };
}

export default function ProductGrid({ onAddToCart, onBuyNow, wpProducts }: ProductGridProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const wpMapped: Product[] = (wpProducts || []).map((wp: any) => {
    const rawPrice = wp.price ? parseFloat(wp.price.replace(/[^0-9.]/g, "")) : 0;
    const rawRegularPrice = wp.regularPrice ? parseFloat(wp.regularPrice.replace(/[^0-9.]/g, "")) : rawPrice;
    const { sizeDesc, desc } = parseWpProduct(wp);

    let discountStr = "";
    if (rawRegularPrice > rawPrice) {
       discountStr = `${Math.round(((rawRegularPrice - rawPrice) / rawRegularPrice) * 100)}% OFF`;
    } else {
       discountStr = rawPrice ? Math.round((200 / (rawPrice+200))*100) + "% OFF" : "21% OFF";
    }
    
    const finalMrp = rawRegularPrice > rawPrice ? rawRegularPrice : (rawPrice ? rawPrice + 200 : 949);

    return {
      id: wp.slug || String(wp.databaseId || wp.id),
      name: wp.name,
      sizeDesc: "200g / 500ml / 1kg",
      desc: desc.slice(0, 100).trim() + "...",
      image: wp.image?.sourceUrl || "/images/buffalo_ghee_single.png",
      price: rawPrice || 749,
      mrp: finalMrp,
      discount: discountStr,
      badge: wp.onSale ? "On Sale" : "Bestseller",
      rating: "4.9",
      usp: "Traditional Vedic Process"
    };
  });

  const displayProducts: Product[] = [...wpMapped];
  if (displayProducts.length < 4) {
    const remainingNeeded = 4 - displayProducts.length;
    const extraDefaults = products.filter(p => !displayProducts.some(m => m.id === p.id)).slice(0, remainingNeeded);
    displayProducts.push(...extraDefaults);
  }

  const [productQuantities, setProductQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (productId: string, delta: number) => {
    setProductQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + delta),
    }));
  };

  return (
    <section id="shop" className="relative py-24 bg-[#FAF6F0] border-t border-sky-100 overflow-hidden">
      {/* Decorative background gradients */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-sky-100/40 to-transparent opacity-60" />
      
      <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        
        {/* Header Section */}
        <div className="text-center space-y-4 mb-16 max-w-2xl mx-auto">
          <span className="font-cursive text-2xl text-[#0078BE] font-bold block">
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
          {displayProducts.map((product) => {
            const qty = productQuantities[product.id] || 1;
            const stockInfo = isMounted
              ? getProductStockInfo(product.id, 15)
              : { stock: 15, isOutOfStock: false, statusLabel: "In Stock" as const };
            const isOutOfStock = stockInfo.isOutOfStock;

            return (
              <div
                key={product.id}
                className="group bg-white rounded-2xl border border-slate-100/80 shadow-lg hover:shadow-2xl hover:shadow-[#0284c7]/10 transition-all duration-500 flex flex-col overflow-hidden relative"
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
                    className={`object-cover scale-110 group-hover:scale-125 transition-transform duration-700 ease-out z-10 ${
                      isOutOfStock ? "grayscale opacity-60" : ""
                    }`}
                    priority
                  />
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3 z-20">
                    {isOutOfStock ? (
                      <span className="bg-red-600 text-white font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md">
                        OUT OF STOCK
                      </span>
                    ) : (
                      <span className="bg-white/95 backdrop-blur-sm text-slate-800 font-bold text-[9px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Rating Badge */}
                  {!isOutOfStock && (
                    <div className="absolute bottom-3 right-3 z-20">
                      <div className="bg-white/95 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-[10px] font-bold text-slate-700">{product.rating}</span>
                      </div>
                    </div>
                  )}
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
                      
                      {/* Short USP */}
                      <p className="text-amber-700 font-bold text-[10px] uppercase tracking-wider mb-2">
                        {product.usp}
                      </p>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-sky-50 text-[#0284c7] border border-sky-100 px-2 py-0.5 rounded font-bold text-[10px]">
                          {product.sizeDesc}
                        </span>
                      </div>
                      
                      <p className="text-slate-500 text-[11px] leading-relaxed line-clamp-2 min-h-[32px]">
                        {product.desc}
                      </p>
                    </div>

                    <div className="w-full h-px bg-slate-100 my-3" />

                    {/* Quantity Row */}
                    {!isOutOfStock && (
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
                    )}
                  </div>

                  {/* Price & Actions Row */}
                  <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                    
                    <div className="flex items-end justify-between">
                      <div className="flex flex-col">
                        <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Total Price</span>
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-black text-2xl text-slate-900 leading-none">
                            ₹{product.price * qty}
                          </span>
                          <span className="text-xs text-slate-400 line-through font-semibold">
                            ₹{product.mrp * qty}
                          </span>
                        </div>
                      </div>
                      <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                        {product.discount}
                      </span>
                    </div>

                    {isOutOfStock ? (
                      <button
                        disabled
                        className="w-full flex items-center justify-center py-2.5 rounded-lg bg-slate-200 text-slate-500 font-bold text-[10px] uppercase tracking-widest cursor-not-allowed border border-slate-300"
                      >
                        Out of Stock
                      </button>
                    ) : (
                      <div className="flex flex-row items-center gap-2">
                        <button
                          onClick={() => onAddToCart(product.id, product.name, product.image, product.sizeDesc, product.price, qty)}
                          className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2.5 rounded-lg border-2 border-slate-200 text-slate-600 hover:border-[#0284c7] hover:text-[#0284c7] hover:bg-[#f0f9ff] font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                          <span>Add to Cart</span>
                        </button>
                        <button
                          onClick={() => onBuyNow(product.id, product.name, product.image, product.sizeDesc, product.price, qty)}
                          className="flex-1 flex items-center justify-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-2.5 rounded-lg bg-[#0284c7] hover:bg-[#0274b3] text-white font-bold text-[10px] uppercase tracking-widest transition-all cursor-pointer shadow-md shadow-[#0284c7]/20 hover:shadow-lg hover:-translate-y-px"
                        >
                          <Zap className="w-3.5 h-3.5 shrink-0" />
                          <span>Buy Now</span>
                        </button>
                      </div>
                    )}

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
