"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, Plus, Minus, ChevronDown, ShoppingBag, CheckCircle2, 
  ShieldCheck, Truck, Sparkles, Award, Heart, Clock,
  RefreshCw, Check, HelpCircle,
  Package, ThumbsUp
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import { useCart } from "@/components/cart-provider";

interface ProductOption {
  size: string;
  price: number;
  originalPrice: number;
  badge?: string;
  perUnitText?: string;
}

interface ProductDetails {
  id: string;
  name: string;
  title: string;
  desc: string;
  image: string;
  thumbnails: string[];
  options: ProductOption[];
  ordersDelivered: string;
  rating: string;
  reviews: string;
  stockLeft: number;
}

const productsData: Record<string, ProductDetails> = {
  bilona_ghee: {
    id: "bilona_ghee",
    name: "Pure Buffalo Bilona Ghee",
    title: "A2 Buffalo Ghee – Vedic Bilona Method | Traditional Handcrafted | 30 Litres of Milk, 1 Litre of Ghee",
    desc: "Handcrafted using traditional wooden churning on fresh curd. High granular quality (Danedar) with an authentic aroma that brings back childhood memories. Hand-poured in transit-safe glass jars under Dadi's strict supervision.",
    image: "/images/buffalo_ghee_single.png",
    thumbnails: [
      "/images/buffalo_ghee_single.png",
      "/images/ghee_jar.png",
      "/images/ingredients_bilona.png",
      "/images/ingredients_slow_cooked.png"
    ],
    options: [
      { size: "500ml", price: 749, originalPrice: 1500, badge: "Popular", perUnitText: "₹1,498 / Litre" },
      { size: "1L", price: 1399, originalPrice: 2800, badge: "Best Value", perUnitText: "Save 10% Extra on 1L" }
    ],
    ordersDelivered: "5,00,000+ Orders delivered",
    rating: "4.9",
    reviews: "422",
    stockLeft: 14
  },
  ghee_500ml: {
    id: "bilona_ghee",
    name: "Pure Buffalo Bilona Ghee (500ml Pack)",
    title: "A2 Buffalo Ghee (500ml Pack) – Vedic Bilona Method | Handcrafted & Granular",
    desc: "Our signature 500ml glass jar of traditional A2 Buffalo Bilona Ghee. Churned from curd using wooden bilona in small batches to preserve medicinal properties and rich aroma.",
    image: "/images/buffalo_ghee_single.png",
    thumbnails: [
      "/images/buffalo_ghee_single.png",
      "/images/ghee_jar.png",
      "/images/ingredients_bilona.png",
      "/images/ingredients_slow_cooked.png"
    ],
    options: [
      { size: "500ml", price: 749, originalPrice: 1500, badge: "Popular", perUnitText: "₹1,498 / Litre" },
      { size: "1L", price: 1399, originalPrice: 2800, badge: "Best Value", perUnitText: "Save 10% Extra on 1L" }
    ],
    ordersDelivered: "5,00,000+ Orders delivered",
    rating: "4.9",
    reviews: "422",
    stockLeft: 14
  },
  ghee_1l: {
    id: "bilona_ghee",
    name: "Pure Buffalo Bilona Ghee (1 Litre Pack)",
    title: "A2 Buffalo Ghee (1 Litre Family Pack) – Vedic Bilona Method | Maximum Savings",
    desc: "Our value-packed 1 Litre glass bottle of authentic Bilona Ghee. Ideal for daily cooking, dal tadka, rotis, and Ayurvedic wellness for the whole family.",
    image: "/images/buffalo_ghee_single.png",
    thumbnails: [
      "/images/buffalo_ghee_single.png",
      "/images/ghee_jar.png",
      "/images/ingredients_bilona.png",
      "/images/ingredients_slow_cooked.png"
    ],
    options: [
      { size: "1L", price: 1399, originalPrice: 2800, badge: "Best Value", perUnitText: "Save 10% Extra on 1L" },
      { size: "500ml", price: 749, originalPrice: 1500, badge: "Popular", perUnitText: "₹1,498 / Litre" }
    ],
    ordersDelivered: "5,00,000+ Orders delivered",
    rating: "4.9",
    reviews: "422",
    stockLeft: 9
  },
  combo_packs: {
    id: "combo_packs",
    name: "Dadi Healthy Family Combo Pack",
    title: "Dadi Healthy Combo Packs – Traditional Bilona Ghee & Raw Honey | Complete Family Wellness Bundle",
    desc: "The ultimate family immunity bundle combining our signature A2 Buffalo Bilona Ghee with 100% raw forest honey. Promotes cognitive strength, digestion, and natural vitality.",
    image: "/images/buffalo_ghee_combo.png",
    thumbnails: [
      "/images/buffalo_ghee_combo.png",
      "/images/buffalo_ghee_single.png",
      "/images/ghee_jar.png",
      "/images/ingredients_bilona.png"
    ],
    options: [
      { size: "Combo Packs", price: 2699, originalPrice: 5000, badge: "Limited Bundle", perUnitText: "Ghee + Raw Forest Honey" }
    ],
    ordersDelivered: "1,50,000+ Orders delivered",
    rating: "4.9",
    reviews: "189",
    stockLeft: 6
  }
};

const faqs = [
  {
    q: "How is Dairy Cool Bilona Ghee different from market ghee?",
    a: "Market ghee is mostly made directly by heating raw milk cream (malai) or leftover butter in mass industrial factories. Dairy Cool ghee is crafted using the ancient 5-step Vedic Bilona method: boiled raw milk → curd overnight → wooden bilona churning → makhan extraction → slow cooking in clay/brass vessels. This preserves native A2 enzymes, granular texture, and medicinal aroma."
  },
  {
    q: "Why is Bilona Ghee packaged only in Glass Jars?",
    a: "Ghee is an active natural fat. Plastic containers can leach microplastics and harmful chemicals over time when stored at room temperature. We use heavy, food-grade non-reactive glass jars sealed with safety seals so the ghee maintains its farm-fresh flavor and shelf stability."
  },
  {
    q: "Does Bilona Ghee require refrigeration?",
    a: "No! Pure traditional Bilona Ghee has very low moisture content and naturally stays fresh at room temperature for up to 12 months. Keep it in a dry place away from direct sunlight, and always use a clean, dry spoon."
  },
  {
    q: "Is this Ghee suitable for lactose-intolerant people?",
    a: "Yes. During the traditional curd-churning and slow-clarification process, milk solids (lactose and casein) are completely separated and removed, making Bilona Ghee virtually lactose-free and gentle on digestion."
  },
  {
    q: "How fast is delivery?",
    a: "Orders are dispatched within 24 hours. Delivery takes 2 to 4 business days for major metro cities and 4 to 6 days across rest of India. All orders are packed in custom break-proof eco-bubble packaging."
  }
];

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const product = productsData[productId] || productsData.bilona_ghee;
  const { addToCart, buyNow } = useCart();

  // States
  const [selectedImage, setSelectedImage] = useState(product.thumbnails[0]);
  const [selectedOption, setSelectedOption] = useState(product.options[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("description");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cart Handlers
  const handleAddToCart = () => {
    addToCart(product.id, product.name, product.image, selectedOption.size, selectedOption.price, quantity);
  };

  const handleBuyNow = () => {
    buyNow(product.id, product.name, product.image, selectedOption.size, selectedOption.price, quantity);
  };

  const handleWhatsAppOrder = () => {
    const message = `Hello Dairy Cool! I want to order ${product.name} (${selectedOption.size}) - Qty: ${quantity}. Total: ₹${selectedOption.price * quantity}. Please confirm my order!`;
    window.open(`https://wa.me/919716003060?text=${encodeURIComponent(message)}`, "_blank");
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const savings = (selectedOption.originalPrice - selectedOption.price) * quantity;
  const discountPercent = Math.round(((selectedOption.originalPrice - selectedOption.price) / selectedOption.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-[#FAF6F0] flex flex-col font-sans text-[#2E271E] antialiased selection:bg-[#0078BE] selection:text-white relative w-full">
      
      {/* Header */}
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Container - 100% Full Width */}
      <main className="flex-grow w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-6 md:py-10 relative z-10">
        
        {/* Breadcrumbs & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 md:mb-8 w-full">
          <nav className="flex items-center space-x-2 text-xs font-medium text-stone-500">
            <Link href="/" className="hover:text-[#2E271E] transition">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#2E271E] transition">Shop</Link>
            <span>/</span>
            <span className="text-[#2E271E] font-bold truncate max-w-[220px] sm:max-w-none">{product.name}</span>
          </nav>
          <Link href="/shop" className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-700 hover:text-[#2E271E] bg-white px-4 py-2 rounded-full border border-stone-200 shadow-2xs transition">
            ← Back to All Products
          </Link>
        </div>

        {/* Hero Product Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 bg-white rounded-3xl border border-stone-200 p-6 md:p-12 shadow-xs items-start mb-16 relative w-full">
          
          {/* Left Column: Image Gallery (6 Cols) */}
          <div className="lg:col-span-6 space-y-6 lg:sticky lg:top-24">
            
            {/* Main Stage Image Container */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#FAF6F0]/60 border border-stone-200/80 flex items-center justify-center group">
              
              {/* Clean Discount Tag */}
              <div className="absolute top-4 left-4 z-10 bg-[#2E271E] text-white font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider">
                <span>{discountPercent}% OFF</span>
              </div>

              {/* Clean Vedic Tag */}
              <div className="absolute top-4 right-4 z-10 bg-white text-[#2E271E] border border-stone-200 font-bold text-[11px] px-3.5 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-stone-700" />
                <span>Vedic A2 Bilona</span>
              </div>

              <Image
                src={selectedImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-6 sm:p-10 scale-105 group-hover:scale-108 transition-all duration-300"
                priority
              />
            </div>

            {/* Thumbnail Selector Row */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none justify-start">
              {product.thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(thumb)}
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition cursor-pointer bg-[#FAF6F0]/40 ${
                    selectedImage === thumb 
                      ? "border-[#2E271E] ring-1 ring-stone-400 scale-95" 
                      : "border-stone-200 hover:border-stone-400 opacity-80 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={thumb}
                    alt={`${product.name} View ${idx + 1}`}
                    fill
                    sizes="120px"
                    className="object-contain p-2"
                  />
                  {selectedImage === thumb && (
                    <div className="absolute top-1 right-1 bg-[#2E271E] text-white rounded-full p-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Trust Badges Under Gallery */}
            <div className="grid grid-cols-3 gap-4 pt-2 border-t border-stone-100 text-center">
              <div className="bg-[#FAF6F0]/60 p-3.5 rounded-2xl border border-stone-200/50">
                <ShieldCheck className="w-5 h-5 text-stone-700 mx-auto mb-1" />
                <span className="text-xs font-bold text-[#2E271E] block">FSSAI Certified</span>
                <span className="text-[10px] text-stone-500">100% Lab Tested</span>
              </div>
              <div className="bg-[#FAF6F0]/60 p-3.5 rounded-2xl border border-stone-200/50">
                <Award className="w-5 h-5 text-stone-700 mx-auto mb-1" />
                <span className="text-xs font-bold text-[#2E271E] block">Dadi Approved</span>
                <span className="text-[10px] text-stone-500">Traditional Recipe</span>
              </div>
              <div className="bg-[#FAF6F0]/60 p-3.5 rounded-2xl border border-stone-200/50">
                <Package className="w-5 h-5 text-stone-700 mx-auto mb-1" />
                <span className="text-xs font-bold text-[#2E271E] block">Glass Packaging</span>
                <span className="text-[10px] text-stone-500">Transit Safe Jar</span>
              </div>
            </div>

          </div>

          {/* Right Column: Product Configuration & Details (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">

            {/* Category Tag & Delivered Count */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="bg-stone-100 text-stone-800 font-bold text-[10px] px-3.5 py-1 rounded-full uppercase tracking-wider border border-stone-200">
                {product.id === "combo_packs" ? "Family Wellness Combo" : "Authentic Farm Pure"}
              </span>
              <div className="flex items-center gap-1.5 text-stone-600 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-stone-600" />
                <span>{product.ordersDelivered}</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-serif font-black text-[#2E271E] leading-tight">
              {product.title}
            </h1>

            {/* Rating Summary */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="flex items-center gap-1.5 bg-stone-50 px-3 py-1 rounded-md border border-stone-200">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="text-xs font-bold text-[#2E271E] ml-1">{product.rating}</span>
              </div>
              <Link href="#reviews" className="text-xs font-semibold text-stone-500 hover:text-[#2E271E] underline transition">
                See all {product.reviews} customer reviews
              </Link>
            </div>

            {/* Stock Notice */}
            <div className="bg-[#FAF6F0] border border-stone-200 rounded-xl p-3.5 flex items-center gap-3 text-xs text-stone-700">
              <div className="w-2.5 h-2.5 rounded-full bg-amber-600 shrink-0" />
              <p>
                <span className="font-bold text-[#2E271E]">Fresh Batch Notice:</span> Only <span className="font-bold">{product.stockLeft} jars remaining</span> in today&apos;s wooden bilona churning.
              </p>
            </div>

            {/* Clean Price Display Box */}
            <div className="bg-stone-50/80 rounded-2xl p-6 border border-stone-200 space-y-2">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-sans font-black text-[#2E271E] tracking-tight">
                  ₹{selectedOption.price * quantity}
                </span>
                <span className="text-lg sm:text-xl lg:text-2xl font-sans font-medium text-stone-400 line-through">
                  ₹{selectedOption.originalPrice * quantity}
                </span>
                <span className="bg-stone-200 text-[#2E271E] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  Save ₹{savings} ({discountPercent}% OFF)
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-200 gap-2">
                <span>Inclusive of all taxes &amp; duties.</span>
                <span className="font-semibold text-stone-700">✔ Free Shipping across India</span>
              </div>
            </div>

            {/* Pack Size Selector Grid */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-[#2E271E] uppercase tracking-wider">Select Pack Size:</span>
                <span className="text-[11px] font-medium text-stone-500">1L pack recommended for families</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {product.options.map((opt) => {
                  const isSelected = selectedOption.size === opt.size;
                  return (
                    <button
                      key={opt.size}
                      onClick={() => {
                        setSelectedOption(opt);
                        setQuantity(1);
                      }}
                      className={`relative p-4 rounded-2xl text-left border transition cursor-pointer flex flex-col justify-between ${
                        isSelected 
                          ? "bg-white border-[#2E271E] text-[#2E271E] shadow-xs ring-1 ring-[#2E271E]" 
                          : "bg-white/60 border-stone-200 text-stone-700 hover:border-stone-400"
                      }`}
                    >
                      {opt.badge && (
                        <span className={`absolute -top-2.5 right-3 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          isSelected ? "bg-[#2E271E] text-white" : "bg-stone-200 text-stone-800"
                        }`}>
                          {opt.badge}
                        </span>
                      )}
                      
                      <span className="text-base font-black block">{opt.size} Pack</span>

                      <div className="flex items-baseline gap-2 mt-1">
                        <span className="text-lg font-extrabold text-[#2E271E]">₹{opt.price}</span>
                        <span className="text-xs text-stone-400 line-through font-medium">₹{opt.originalPrice}</span>
                      </div>
                      
                      {opt.perUnitText && (
                        <span className="text-[11px] text-stone-500 mt-1 block font-medium">
                          {opt.perUnitText}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & CTAs */}
            <div className="space-y-4 pt-3 border-t border-stone-200">
              
              {/* Stepper + Add To Cart */}
              <div className="flex flex-row items-center gap-4">
                
                {/* Quantity Counter */}
                <div className="flex items-center border border-stone-300 rounded-xl bg-white overflow-hidden h-[52px] shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-4 text-stone-600 hover:text-[#2E271E] hover:bg-stone-50 transition cursor-pointer h-full flex items-center"
                    aria-label="Decrease Quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 font-bold text-[#2E271E] text-base w-9 text-center select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-4 text-stone-600 hover:text-[#2E271E] hover:bg-stone-50 transition cursor-pointer h-full flex items-center"
                    aria-label="Increase Quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#0078BE] hover:bg-[#0066a1] active:scale-98 text-white font-bold px-6 py-3.5 rounded-xl text-sm sm:text-base uppercase tracking-wider transition shadow-2xs h-[52px] cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5 shrink-0" />
                  <span>Add To Cart</span>
                </button>
              </div>

              {/* Buy Now & WhatsApp Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <button
                  onClick={handleBuyNow}
                  className="w-full flex items-center justify-center gap-2 bg-[#2E271E] hover:bg-[#1a1611] active:scale-98 text-white font-bold py-4 px-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition shadow-2xs cursor-pointer"
                >
                  <span>Instant Buy Now →</span>
                </button>

                <button
                  onClick={handleWhatsAppOrder}
                  className="w-full flex items-center justify-center gap-2 bg-white hover:bg-stone-50 active:scale-98 text-[#2E271E] font-bold py-4 px-4 rounded-xl text-xs sm:text-sm uppercase tracking-wider transition border border-stone-300 shadow-2xs cursor-pointer"
                >
                  <WhatsAppIcon className="w-4.5 h-4.5 shrink-0" />
                  <span>WhatsApp Order</span>
                </button>
              </div>
            </div>

            {/* Delivery Estimator Bar */}
            <div className="bg-stone-100/70 border border-stone-200 rounded-xl p-3.5 flex items-center gap-2.5 text-xs sm:text-sm text-stone-700">
              <Clock className="w-4 h-4 text-stone-500 shrink-0" />
              <p>
                <strong className="text-[#2E271E]">Dispatch within 24 Hours:</strong> Shipped in secure, non-reactive glass jars across India.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-white p-3 rounded-xl border border-stone-200 text-center">
                <span className="text-lg block mb-0.5">🥛</span>
                <span className="text-xs font-bold text-[#2E271E] block">30L Milk = 1L</span>
                <span className="text-[10px] text-stone-500">Dense Nutrition</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200 text-center">
                <span className="text-lg block mb-0.5">🪵</span>
                <span className="text-xs font-bold text-[#2E271E] block">Wooden Churned</span>
                <span className="text-[10px] text-stone-500">Vedic Method</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200 text-center">
                <span className="text-lg block mb-0.5">🌿</span>
                <span className="text-xs font-bold text-[#2E271E] block">Zero Additives</span>
                <span className="text-[10px] text-stone-500">100% Natural</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-stone-200 text-center">
                <span className="text-lg block mb-0.5">👵</span>
                <span className="text-xs font-bold text-[#2E271E] block">Dadi&apos;s Recipe</span>
                <span className="text-[10px] text-stone-500">Authentic Taste</span>
              </div>
            </div>

            {/* Accordion Tabs */}
            <div className="border border-stone-200 rounded-2xl overflow-hidden divide-y divide-stone-200 bg-white">
              
              {/* Tab 1 */}
              <div>
                <button
                  onClick={() => toggleAccordion("description")}
                  className="w-full flex items-center justify-between px-6 py-4.5 text-left font-serif font-bold text-[#2E271E] text-sm sm:text-base hover:bg-stone-50 transition cursor-pointer"
                >
                  <span>Description &amp; Purity Profile</span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-300 ${activeAccordion === "description" ? "rotate-180" : ""}`} />
                </button>
                {activeAccordion === "description" && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed space-y-3 bg-stone-50/50">
                    <p className="font-semibold text-[#2E271E]">{product.desc}</p>
                    <p>Unlike commercial market ghee made by heating residual milk cream, Dairy Cool bilona ghee is crafted by boiling farm-fresh buffalo milk, converting it into curd overnight, and churning it with wooden bilonas in clay pots.</p>
                    <p>It is rich in fat-soluble vitamins (A, D, E, K), aids digestion, promotes gut health, and keeps you energized all day long.</p>
                  </div>
                )}
              </div>

              {/* Tab 2 */}
              <div>
                <button
                  onClick={() => toggleAccordion("process")}
                  className="w-full flex items-center justify-between px-6 py-4.5 text-left font-serif font-bold text-[#2E271E] text-sm sm:text-base hover:bg-stone-50 transition cursor-pointer"
                >
                  <span>Traditional Making Process (Vedic Bilona)</span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-300 ${activeAccordion === "process" ? "rotate-180" : ""}`} />
                </button>
                {activeAccordion === "process" && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed space-y-2.5 bg-stone-50/50">
                    <p><strong>Step 1: Fresh Boiling:</strong> Fresh raw milk is slow-boiled over traditional mud chulhas to eliminate bacteria while retaining natural enzymes.</p>
                    <p><strong>Step 2: Curd Setting:</strong> The cooled milk is inoculated with natural culture and allowed to set into thick, probiotic curd overnight.</p>
                    <p><strong>Step 3: Wooden Churning:</strong> Early morning, the curd is churned bi-directionally using wooden bilonas to separate the golden makhan (butter).</p>
                    <p><strong>Step 4: Slow Heating:</strong> The makhan is slow-cooked in brass pots over low flame until moisture evaporates, leaving pure, granular, aromatic ghee.</p>
                  </div>
                )}
              </div>

              {/* Tab 3 */}
              <div>
                <button
                  onClick={() => toggleAccordion("benefits")}
                  className="w-full flex items-center justify-between px-6 py-4.5 text-left font-serif font-bold text-[#2E271E] text-sm sm:text-base hover:bg-stone-50 transition cursor-pointer"
                >
                  <span>Health &amp; Ayurvedic Benefits</span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-300 ${activeAccordion === "benefits" ? "rotate-180" : ""}`} />
                </button>
                {activeAccordion === "benefits" && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed space-y-2 bg-stone-50/50">
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-stone-600 shrink-0" /> Boosts physical strength, immunity, and cellular metabolism</p>
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-stone-600 shrink-0" /> Excellent source of butyric acid for healthy colon &amp; gut flora</p>
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-stone-600 shrink-0" /> High smoke point makes it safe for deep frying and Indian tadkas</p>
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-stone-600 shrink-0" /> Lubricates joints and nourishes skin &amp; hair naturally</p>
                  </div>
                )}
              </div>

              {/* Tab 4 */}
              <div>
                <button
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full flex items-center justify-between px-6 py-4.5 text-left font-serif font-bold text-[#2E271E] text-sm sm:text-base hover:bg-stone-50 transition cursor-pointer"
                >
                  <span>Shipping &amp; Glass Jar Packaging</span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-300 ${activeAccordion === "shipping" ? "rotate-180" : ""}`} />
                </button>
                {activeAccordion === "shipping" && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed space-y-2 bg-stone-50/50">
                    <p>We pack our ghee exclusively in high-grade, non-reactive glass jars to ensure zero chemical leaching and preserve the authentic aroma.</p>
                    <p>Every jar is wrapped in custom drop-resistant eco-friendly packaging. We ship via express couriers with delivery across India within 4-6 business days.</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* ── BELOW THE FOLD SECTION 1: THE 5-STEP VEDIC BILONA PROCESS GRID ── */}
        <section className="bg-white rounded-3xl border border-stone-200 p-8 md:p-12 shadow-xs mb-16 w-full">
          <div className="text-center w-full mb-10 space-y-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block">Ancient Vedic Tradition</span>
            <h2 className="text-2xl md:text-4xl font-serif font-black text-[#2E271E]">The 5-Step Bilona Process</h2>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              It takes 30 Litres of pure fresh buffalo milk to craft just 1 Litre of Dairy Cool Bilona Ghee. Discover our age-old process:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 w-full">
            
            {/* Step 1 */}
            <div className="bg-[#FAF6F0]/60 p-6 rounded-2xl border border-stone-200/70 space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#2E271E] text-white font-bold text-xs flex items-center justify-center">01</span>
              <h3 className="font-serif font-bold text-base text-[#2E271E]">Boiling Raw Milk</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Fresh buffalo milk is boiled over traditional mud chulhas in earthen pots to purify and preserve natural nutrients.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FAF6F0]/60 p-6 rounded-2xl border border-stone-200/70 space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#2E271E] text-white font-bold text-xs flex items-center justify-center">02</span>
              <h3 className="font-serif font-bold text-base text-[#2E271E]">Curd Setting</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                The boiled milk is inoculated with natural culture and allowed to ferment overnight into thick, probiotic curd.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FAF6F0]/60 p-6 rounded-2xl border border-stone-200/70 space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#2E271E] text-white font-bold text-xs flex items-center justify-center">03</span>
              <h3 className="font-serif font-bold text-base text-[#2E271E]">Wooden Churning</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                The curd is churned bi-directionally using traditional wooden bilonas in clay pots during early morning hours.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-[#FAF6F0]/60 p-6 rounded-2xl border border-stone-200/70 space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#2E271E] text-white font-bold text-xs flex items-center justify-center">04</span>
              <h3 className="font-serif font-bold text-base text-[#2E271E]">Makhan Extraction</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Fresh golden butter (makhan) is separated from buttermilk, ensuring maximum fat-soluble vitamins remain intact.
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-[#FAF6F0]/60 p-6 rounded-2xl border border-stone-200/70 space-y-3">
              <span className="w-8 h-8 rounded-full bg-[#2E271E] text-white font-bold text-xs flex items-center justify-center">05</span>
              <h3 className="font-serif font-bold text-base text-[#2E271E]">Slow Heating</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                The butter is slow-cooked over low flame in brass pots until moisture evaporates into rich, granular Bilona Ghee.
              </p>
            </div>

          </div>
        </section>

        {/* ── BELOW THE FOLD SECTION 2: COMPARISON TABLE ── */}
        <section className="bg-white rounded-3xl border border-stone-200 p-8 md:p-12 shadow-xs mb-16 w-full">
          <div className="text-center w-full mb-10 space-y-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block">The Truth About Purity</span>
            <h2 className="text-2xl md:text-4xl font-serif font-black text-[#2E271E]">Why Dairy Cool Bilona Ghee is Superior</h2>
            <p className="text-xs sm:text-sm text-stone-500 leading-relaxed">
              Most store-bought ghee is made commercially from leftover dairy cream at high temperatures. Here is how our traditional Vedic method compares:
            </p>
          </div>

          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b-2 border-stone-200 bg-stone-50">
                  <th className="py-4 px-6 font-serif font-bold text-stone-700 text-sm w-1/3">Quality Feature</th>
                  <th className="py-4 px-6 font-serif font-black text-[#2E271E] text-base w-1/3 bg-[#FAF6F0] rounded-t-2xl border-x border-t border-stone-200">
                    Dairy Cool Vedic Bilona Ghee
                  </th>
                  <th className="py-4 px-6 font-serif font-medium text-stone-500 text-sm w-1/3">
                    Commercial Store-Bought Ghee
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 text-xs sm:text-sm">
                <tr>
                  <td className="py-4 px-6 font-bold text-stone-800">Preparation Method</td>
                  <td className="py-4 px-6 font-bold text-[#2E271E] bg-[#FAF6F0] border-x border-stone-200">
                    ✔ Vedic Bilona (Milk → Curd → Churning → Ghee)
                  </td>
                  <td className="py-4 px-6 text-stone-500">
                    Direct heating of leftover milk cream / malai
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-stone-800">Grain Texture (Danedar)</td>
                  <td className="py-4 px-6 font-bold text-[#2E271E] bg-[#FAF6F0] border-x border-stone-200">
                    ✔ Naturally Granular &amp; Highly Dense
                  </td>
                  <td className="py-4 px-6 text-stone-500">
                    Flat, oily, or chemically emulsified texture
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-stone-800">Aroma &amp; Taste</td>
                  <td className="py-4 px-6 font-bold text-[#2E271E] bg-[#FAF6F0] border-x border-stone-200">
                    ✔ Rich, nutty, authentic village aroma
                  </td>
                  <td className="py-4 px-6 text-stone-500">
                    Artificial flavoring or flat grease odor
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-stone-800">Digestibility &amp; Nutrition</td>
                  <td className="py-4 px-6 font-bold text-[#2E271E] bg-[#FAF6F0] border-x border-stone-200">
                    ✔ Rich in A2 proteins, Butyric acid &amp; Vitamins
                  </td>
                  <td className="py-4 px-6 text-stone-500">
                    Heavy on digestion, cholesterol risk
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-bold text-stone-800">Packaging Material</td>
                  <td className="py-4 px-6 font-bold text-[#2E271E] bg-[#FAF6F0] rounded-b-2xl border-x border-b border-stone-200">
                    ✔ Premium Glass Jar (Zero Chemical Leaching)
                  </td>
                  <td className="py-4 px-6 text-stone-500">
                    Plastic pouches or cheap tins
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── BELOW THE FOLD SECTION 3: VERIFIED REVIEWS ── */}
        <section id="reviews" className="bg-white rounded-3xl border border-stone-200 p-8 md:p-12 shadow-xs mb-16 w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-stone-100 w-full">
            <div>
              <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block">Customer Testimonials</span>
              <h2 className="text-2xl md:text-4xl font-serif font-black text-[#2E271E]">Verified Buyer Reviews</h2>
            </div>
            
            <div className="flex items-center gap-4 bg-stone-50 px-6 py-4 rounded-2xl border border-stone-200">
              <div className="text-3xl font-black text-[#2E271E]">4.9</div>
              <div>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-[11px] font-semibold text-stone-500 mt-0.5">Based on 422+ verified customer reviews</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            
            {/* Review 1 */}
            <div className="bg-[#FAF6F0]/60 p-6 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400 font-medium">2 days ago</span>
                </div>
                <h4 className="font-serif font-bold text-[#2E271E] text-base">&quot;Exact taste of my grandmother&apos;s ghee!&quot;</h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  I have tried dozens of organic brands online, but Dairy Cool is the only one that has that genuine danedar texture and golden aroma. The moment you put one spoon in hot dal, the entire kitchen smells divine!
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-stone-200">
                <div className="w-9 h-9 rounded-full bg-stone-200 text-stone-700 font-serif font-bold flex items-center justify-center text-xs">
                  R
                </div>
                <div>
                  <h5 className="font-bold text-xs text-[#2E271E]">Rajeshwar Verma</h5>
                  <span className="text-[10px] text-stone-500 font-medium block">
                    Verified Buyer • Delhi
                  </span>
                </div>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-[#FAF6F0]/60 p-6 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400 font-medium">1 week ago</span>
                </div>
                <h4 className="font-serif font-bold text-[#2E271E] text-base">&quot;Best quality packaging &amp; purity!&quot;</h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  I ordered the 1L family bottle. It came super securely packed in a heavy glass jar without any leakage. My kids love it on their morning parathas. Truly Dadi ke haathon ka swaad!
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-stone-200">
                <div className="w-9 h-9 rounded-full bg-stone-200 text-stone-700 font-serif font-bold flex items-center justify-center text-xs">
                  S
                </div>
                <div>
                  <h5 className="font-bold text-xs text-[#2E271E]">Sunita Sharma</h5>
                  <span className="text-[10px] text-stone-500 font-medium block">
                    Verified Buyer • Mumbai
                  </span>
                </div>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-[#FAF6F0]/60 p-6 rounded-2xl border border-stone-200 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-[10px] text-stone-400 font-medium">2 weeks ago</span>
                </div>
                <h4 className="font-serif font-bold text-[#2E271E] text-base">&quot;No heavy aftertaste, pure A2 milk&quot;</h4>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  You can immediately tell this is made from curd bilona and not malai cream. It feels extremely light on the stomach and promotes great digestion. Will definitely subscribe every month!
                </p>
              </div>
              <div className="flex items-center gap-3 pt-3 border-t border-stone-200">
                <div className="w-9 h-9 rounded-full bg-stone-200 text-stone-700 font-serif font-bold flex items-center justify-center text-xs">
                  A
                </div>
                <div>
                  <h5 className="font-bold text-xs text-[#2E271E]">Anat Kumar</h5>
                  <span className="text-[10px] text-stone-500 font-medium block">
                    Verified Buyer • Bangalore
                  </span>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── BELOW THE FOLD SECTION 4: FREQUENTLY ASKED QUESTIONS ── */}
        <section className="bg-white rounded-3xl border border-stone-200 p-8 md:p-12 shadow-xs mb-16 w-full">
          <div className="text-center w-full mb-8 space-y-2">
            <span className="text-xs font-bold text-stone-400 uppercase tracking-widest block">Got Questions?</span>
            <h2 className="text-2xl md:text-4xl font-serif font-black text-[#2E271E]">Frequently Asked Questions</h2>
          </div>

          <div className="w-full divide-y divide-stone-200 border border-stone-200 rounded-2xl overflow-hidden bg-[#FAF6F0]/40">
            {faqs.map((faq, index) => (
              <div key={index} className="transition">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-serif font-bold text-[#2E271E] text-sm sm:text-base hover:bg-white transition cursor-pointer"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-stone-500 shrink-0" />
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-4 h-4 text-stone-400 transition-transform duration-300 shrink-0 ${activeFaq === index ? "rotate-180 text-[#2E271E]" : ""}`} />
                </button>
                {activeFaq === index && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-stone-600 leading-relaxed bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── BELOW THE FOLD SECTION 5: PURITY ASSURANCE BANNER ── */}
        <section className="bg-white border-2 border-stone-300 rounded-3xl p-8 md:p-14 shadow-xs text-center relative w-full">
          <div className="relative z-10 max-w-4xl mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center mx-auto text-stone-700">
              <Heart className="w-7 h-7 text-[#2E271E]" />
            </div>
            <h2 className="text-2xl md:text-4xl font-serif font-black text-[#2E271E] leading-tight">
              Dadi&apos;s 100% Purity Promise
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm md:text-base leading-relaxed">
              We stand by the quality of every single drop. If you do not fall in love with the authentic aroma, granular texture, and traditional taste of our Bilona Ghee, simply reach out to us within 7 days for a full replacement or refund.
            </p>
            <div className="pt-3 flex flex-wrap justify-center gap-4">
              <button
                onClick={handleAddToCart}
                className="bg-[#2E271E] hover:bg-[#1a1611] text-white font-bold px-9 py-4 rounded-full text-xs uppercase tracking-widest transition shadow-2xs cursor-pointer"
              >
                Order Pure Ghee Now
              </button>
              <button
                onClick={handleWhatsAppOrder}
                className="bg-white hover:bg-stone-50 text-[#2E271E] border border-stone-300 font-bold px-9 py-4 rounded-full text-xs uppercase tracking-widest transition shadow-2xs cursor-pointer inline-flex items-center gap-2"
              >
                <WhatsAppIcon className="w-4.5 h-4.5" />
                <span>Order on WhatsApp</span>
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
