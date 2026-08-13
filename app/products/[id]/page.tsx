"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
  Star, Plus, Minus, ChevronDown, ShoppingBag, CheckCircle2, 
  ShieldCheck, Truck, Sparkles, Award, Heart, Clock,
  RefreshCw, Check, HelpCircle, Package, ThumbsUp
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import { useCart } from "@/components/cart-provider";
import { getSingleProduct } from "@/lib/woocommerce";

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

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const { addToCart, buyNow } = useCart();

  const [wpProduct, setWpProduct] = useState<any>(null);

  useEffect(() => {
    if (productId) {
      getSingleProduct(productId).then((data) => {
        if (data) {
          setWpProduct(data);
        }
      }).catch(console.error);
    }
  }, [productId]);

  const baseProduct = productsData[productId] || productsData.bilona_ghee;

  const product: ProductDetails = wpProduct ? {
    id: wpProduct.slug || String(wpProduct.databaseId || wpProduct.id),
    name: decodeHTMLEntities(wpProduct.name),
    title: decodeHTMLEntities(wpProduct.name) + " – Vedic Bilona Method | Traditional Handcrafted",
    desc: wpProduct.shortDescription 
      ? decodeHTMLEntities(wpProduct.shortDescription)
      : (wpProduct.description ? decodeHTMLEntities(wpProduct.description) : baseProduct.desc),
    image: wpProduct.image?.sourceUrl || baseProduct.image,
    thumbnails: Array.from(new Set([
      wpProduct.image?.sourceUrl || baseProduct.image,
      ...(wpProduct.galleryImages?.nodes?.map((g: any) => g.sourceUrl) || [])
    ])).filter(Boolean) as string[],
    options: [
      {
        size: "1 Pack",
        price: wpProduct.price ? parseFloat(wpProduct.price.replace(/[^0-9.]/g, "")) || 749 : 749,
        originalPrice: (wpProduct.price ? parseFloat(wpProduct.price.replace(/[^0-9.]/g, "")) || 749 : 749) * 2,
        badge: wpProduct.onSale ? "On Sale" : "Popular",
        perUnitText: "Direct from Farm"
      }
    ],
    ordersDelivered: "5,00,000+ Orders delivered",
    rating: "4.9",
    reviews: "422",
    stockLeft: 12
  } : baseProduct;

  // States
  const [selectedImage, setSelectedImage] = useState(product.thumbnails[0]);
  const [selectedOption, setSelectedOption] = useState(product.options[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("description");
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (product.thumbnails && product.thumbnails.length > 0) {
      setSelectedImage(product.thumbnails[0]);
    }
    if (product.options && product.options.length > 0) {
      setSelectedOption(product.options[0]);
    }
  }, [wpProduct]);

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
    <div className="min-h-screen bg-slate-50/50 flex flex-col font-sans text-slate-800 antialiased selection:bg-[#0078BE] selection:text-white relative w-full">
      
      {/* Header */}
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Container */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 relative z-10 pb-24 sm:pb-12">
        
        {/* Breadcrumbs & Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 w-full">
          <nav className="flex items-center space-x-2 text-xs font-medium text-slate-500">
            <Link href="/" className="hover:text-[#0078BE] transition">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[#0078BE] transition">Shop</Link>
            <span>/</span>
            <span className="text-slate-900 font-bold truncate max-w-[180px] sm:max-w-none">{product.name}</span>
          </nav>
          <Link href="/shop" className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#0078BE] bg-white px-4 py-2 rounded-full border border-slate-200 shadow-2xs transition">
            ← Back to All Products
          </Link>
        </div>

        {/* Hero Product Section - Clean Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 lg:p-10 shadow-sm items-start mb-12 w-full">
          
          {/* Left Column: Image Gallery (6 Cols) */}
          <div className="lg:col-span-6 space-y-5 lg:sticky lg:top-24">
            
            {/* Main Stage Image Container */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-slate-50/80 border border-slate-200/80 flex items-center justify-center group shadow-inner">
              
              {/* Discount Tag */}
              <div className="absolute top-4 left-4 z-10 bg-[#0078BE] text-white font-black text-xs px-3 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
                <span>{discountPercent}% OFF</span>
              </div>

              {/* Vedic Tag */}
              <div className="absolute top-4 right-4 z-10 bg-white text-slate-900 border border-slate-200 font-bold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-[#0078BE]" />
                <span>Vedic A2 Bilona</span>
              </div>

              <Image
                src={selectedImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-contain p-6 sm:p-10 transition-all duration-300 group-hover:scale-105"
                priority
              />
            </div>

            {/* Thumbnail Selector Row */}
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-none justify-start">
              {product.thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(thumb)}
                  className={`relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-2xl overflow-hidden border transition cursor-pointer bg-slate-50 ${
                    selectedImage === thumb 
                      ? "border-[#0078BE] ring-2 ring-[#0078BE]/30 scale-95" 
                      : "border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100"
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
                    <div className="absolute top-1 right-1 bg-[#0078BE] text-white rounded-full p-0.5">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Trust Badges Under Gallery */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100 text-center">
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                <ShieldCheck className="w-5 h-5 text-[#0078BE] mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-800 block leading-tight">FSSAI Certified</span>
                <span className="text-[10px] text-slate-500 hidden sm:block">100% Lab Tested</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                <Award className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-800 block leading-tight">Dadi Approved</span>
                <span className="text-[10px] text-slate-500 hidden sm:block">Traditional Recipe</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                <Package className="w-5 h-5 text-indigo-600 mx-auto mb-1" />
                <span className="text-xs font-bold text-slate-800 block leading-tight">Glass Packaging</span>
                <span className="text-[10px] text-slate-500 hidden sm:block">Transit Safe Jar</span>
              </div>
            </div>

          </div>

          {/* Right Column: Product Details & Configuration (6 Cols) */}
          <div className="lg:col-span-6 space-y-5">

            {/* Category Tag & Delivered Count */}
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="bg-sky-50 text-[#0078BE] font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider border border-sky-100">
                {product.id === "combo_packs" ? "Family Wellness Combo" : "Authentic Farm Pure"}
              </span>
              <div className="flex items-center gap-1.5 text-slate-600 text-xs font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{product.ordersDelivered}</span>
              </div>
            </div>

            {/* Product Title */}
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-slate-900 leading-tight">
              {product.title}
            </h1>

            {/* Rating Summary */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <span className="text-xs font-bold text-slate-900">{product.rating}</span>
              </div>
            </div>

            {/* Pricing Box */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-3">
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                  ₹{selectedOption.price * quantity}
                </span>
                <span className="text-lg sm:text-xl font-medium text-slate-400 line-through">
                  ₹{selectedOption.originalPrice * quantity}
                </span>
                <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                  Save ₹{savings} ({discountPercent}% OFF)
                </span>
              </div>

            </div>

            {/* Pack Size Selector Grid */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">Select Pack Size:</span>
                <span className="text-xs text-slate-500 hidden sm:inline font-medium">1L pack recommended for families</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
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
                          ? "bg-white border-[#0078BE] text-slate-900 shadow-sm ring-2 ring-[#0078BE]/30" 
                          : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                      }`}
                    >
                      {opt.badge && (
                        <span className={`absolute -top-2.5 right-3 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                          isSelected ? "bg-[#0078BE] text-white" : "bg-slate-200 text-slate-800"
                        }`}>
                          {opt.badge}
                        </span>
                      )}
                      
                      <span className="text-sm sm:text-base font-extrabold block">{opt.size} Pack</span>

                      <div className="flex items-baseline gap-1.5 mt-1">
                        <span className="text-base sm:text-lg font-black text-slate-900">₹{opt.price}</span>
                        <span className="text-xs text-slate-400 line-through font-medium">₹{opt.originalPrice}</span>
                      </div>
                      
                      {opt.perUnitText && (
                        <span className="text-[11px] text-slate-500 mt-0.5 block font-medium truncate">
                          {opt.perUnitText}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Add to Cart Action */}
            <div className="space-y-3.5 pt-3 border-t border-slate-200">
              
              <div className="flex items-center gap-3">
                {/* Quantity Counter */}
                <div className="flex items-center border border-slate-300 rounded-2xl bg-white overflow-hidden h-[50px] shrink-0">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition cursor-pointer h-full flex items-center"
                    aria-label="Decrease Quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 font-bold text-slate-900 text-sm w-9 text-center select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3.5 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition cursor-pointer h-full flex items-center"
                    aria-label="Increase Quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 bg-[#0078BE] hover:bg-[#00629c] active:scale-98 text-white font-bold px-6 py-3.5 rounded-2xl text-sm uppercase tracking-wider transition shadow-md h-[50px] cursor-pointer"
                >
                  <ShoppingBag className="w-5 h-5 shrink-0" />
                  <span>Add To Cart</span>
                </button>
              </div>

              {/* WhatsApp Quick Order Button */}
              <button
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2 bg-[#22c55e] hover:bg-[#1eb052] active:scale-98 text-white font-bold py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider transition shadow-sm cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span>Order via WhatsApp</span>
              </button>
            </div>

            {/* Delivery Estimator Bar */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-3 text-xs text-slate-700">
              <Clock className="w-4 h-4 text-[#0078BE] shrink-0" />
              <p>
                <strong className="text-slate-900">Dispatch within 24 Hours:</strong> Shipped in secure, non-reactive glass jars across India.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-2xs">
                <span className="text-lg block mb-0.5">🥛</span>
                <span className="text-xs font-bold text-slate-900 block">30L Milk = 1L</span>
                <span className="text-[10px] text-slate-500">Dense Nutrition</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-2xs">
                <span className="text-lg block mb-0.5">🪵</span>
                <span className="text-xs font-bold text-slate-900 block">Wooden Churned</span>
                <span className="text-[10px] text-slate-500">Vedic Method</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-2xs">
                <span className="text-lg block mb-0.5">🌿</span>
                <span className="text-xs font-bold text-slate-900 block">Zero Additives</span>
                <span className="text-[10px] text-slate-500">100% Natural</span>
              </div>
              <div className="bg-white p-3 rounded-2xl border border-slate-200 text-center shadow-2xs">
                <span className="text-lg block mb-0.5">👵</span>
                <span className="text-xs font-bold text-slate-900 block">Dadi&apos;s Recipe</span>
                <span className="text-[10px] text-slate-500">Authentic Taste</span>
              </div>
            </div>

            {/* Accordion Collapsible Sections */}
            <div className="border border-slate-200 rounded-2xl overflow-hidden divide-y divide-slate-200 bg-white shadow-2xs">
              
              <div>
                <button
                  onClick={() => toggleAccordion("description")}
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-serif font-bold text-slate-900 text-sm hover:bg-slate-50 transition cursor-pointer"
                >
                  <span>Description &amp; Purity Profile</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${activeAccordion === "description" ? "rotate-180" : ""}`} />
                </button>
                {activeAccordion === "description" && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 bg-slate-50/50">
                    <p className="font-semibold text-slate-900">{product.desc}</p>
                    <p>Unlike commercial market ghee made by heating residual milk cream, Dairy Cool bilona ghee is crafted by boiling farm-fresh buffalo milk, converting it into curd overnight, and churning it with wooden bilonas in clay pots.</p>
                    <p>It is rich in fat-soluble vitamins (A, D, E, K), aids digestion, promotes gut health, and keeps you energized all day long.</p>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleAccordion("process")}
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-serif font-bold text-slate-900 text-sm hover:bg-slate-50 transition cursor-pointer"
                >
                  <span>Traditional Making Process (Vedic Bilona)</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${activeAccordion === "process" ? "rotate-180" : ""}`} />
                </button>
                {activeAccordion === "process" && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2.5 bg-slate-50/50">
                    <p><strong>Step 1: Fresh Boiling:</strong> Fresh raw milk is slow-boiled over traditional mud chulhas to eliminate bacteria while retaining natural enzymes.</p>
                    <p><strong>Step 2: Curd Setting:</strong> The boiled milk is inoculated with natural culture and allowed to set into thick, probiotic curd overnight.</p>
                    <p><strong>Step 3: Wooden Churning:</strong> Early morning, the curd is churned bi-directionally using wooden bilonas to separate the golden makhan (butter).</p>
                    <p><strong>Step 4: Slow Heating:</strong> The makhan is slow-cooked in brass pots over low flame until moisture evaporates, leaving pure, granular, aromatic ghee.</p>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleAccordion("benefits")}
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-serif font-bold text-slate-900 text-sm hover:bg-slate-50 transition cursor-pointer"
                >
                  <span>Health &amp; Ayurvedic Benefits</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${activeAccordion === "benefits" ? "rotate-180" : ""}`} />
                </button>
                {activeAccordion === "benefits" && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2 bg-slate-50/50">
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Boosts physical strength, immunity, and cellular metabolism</p>
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Excellent source of butyric acid for healthy colon &amp; gut flora</p>
                    <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> High smoke point makes it safe for deep frying and Indian tadkas</p>
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full flex items-center justify-between px-6 py-4 text-left font-serif font-bold text-slate-900 text-sm hover:bg-slate-50 transition cursor-pointer"
                >
                  <span>Shipping &amp; Glass Jar Packaging</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-300 ${activeAccordion === "shipping" ? "rotate-180" : ""}`} />
                </button>
                {activeAccordion === "shipping" && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed space-y-2 bg-slate-50/50">
                    <p>We pack our ghee exclusively in high-grade, non-reactive glass jars to ensure zero chemical leaching and preserve the authentic aroma.</p>
                    <p>Every jar is wrapped in custom drop-resistant eco-friendly packaging. We ship via express couriers with delivery across India within 4-6 business days.</p>
                  </div>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* ── BELOW THE FOLD SECTION 1: THE 5-STEP VEDIC BILONA PROCESS GRID ── */}
        <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm mb-12 w-full">
          <div className="text-center w-full mb-8 space-y-2">
            <span className="text-xs font-bold text-[#0078BE] uppercase tracking-widest block">Ancient Vedic Tradition</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-slate-900">The 5-Step Bilona Process</h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
              It takes 30 Litres of pure fresh buffalo milk to craft just 1 Litre of Dairy Cool Bilona Ghee. Discover our age-old process:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 w-full">
            
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2.5">
              <span className="w-8 h-8 rounded-full bg-[#0078BE] text-white font-black text-xs flex items-center justify-center shadow-xs">01</span>
              <h3 className="font-serif font-bold text-base text-slate-900">Boiling Raw Milk</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fresh buffalo milk is boiled over traditional mud chulhas in earthen pots to purify and preserve natural nutrients.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2.5">
              <span className="w-8 h-8 rounded-full bg-[#0078BE] text-white font-black text-xs flex items-center justify-center shadow-xs">02</span>
              <h3 className="font-serif font-bold text-base text-slate-900">Curd Setting</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The boiled milk is inoculated with natural culture and allowed to ferment overnight into thick, probiotic curd.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2.5">
              <span className="w-8 h-8 rounded-full bg-[#0078BE] text-white font-black text-xs flex items-center justify-center shadow-xs">03</span>
              <h3 className="font-serif font-bold text-base text-slate-900">Wooden Churning</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The curd is churned bi-directionally using traditional wooden bilonas in clay pots during early morning hours.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2.5">
              <span className="w-8 h-8 rounded-full bg-[#0078BE] text-white font-black text-xs flex items-center justify-center shadow-xs">04</span>
              <h3 className="font-serif font-bold text-base text-slate-900">Makhan Extraction</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Fresh golden butter (makhan) is separated from buttermilk, ensuring maximum fat-soluble vitamins remain intact.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2.5">
              <span className="w-8 h-8 rounded-full bg-[#0078BE] text-white font-black text-xs flex items-center justify-center shadow-xs">05</span>
              <h3 className="font-serif font-bold text-base text-slate-900">Slow Heating</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                The butter is slow-cooked over low flame in brass pots until moisture evaporates into rich, granular Bilona Ghee.
              </p>
            </div>

          </div>
        </section>

        {/* ── BELOW THE FOLD SECTION 2: COMPARISON TABLE ── */}
        <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm mb-12 w-full">
          <div className="text-center w-full mb-8 space-y-2">
            <span className="text-xs font-bold text-[#0078BE] uppercase tracking-widest block">The Truth About Purity</span>
            <h2 className="text-2xl sm:text-4xl font-serif font-black text-slate-900">Why Dairy Cool Bilona Ghee is Superior</h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
              Most store-bought ghee is made commercially from leftover dairy cream. Here is how our traditional Vedic method compares:
            </p>
          </div>

          <div className="overflow-x-auto w-full scrollbar-none border border-slate-200 rounded-2xl">
            <table className="w-full text-left border-collapse min-w-[640px]">
              <thead>
                <tr className="border-b-2 border-slate-200 bg-slate-50">
                  <th className="py-4 px-6 font-serif font-bold text-slate-700 text-sm w-1/3">Quality Feature</th>
                  <th className="py-4 px-6 font-serif font-black text-[#0078BE] text-base w-1/3 bg-sky-50/50">
                    Dairy Cool Vedic Bilona Ghee
                  </th>
                  <th className="py-4 px-6 font-serif font-medium text-slate-500 text-sm w-1/3">
                    Commercial Store-Bought Ghee
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                <tr>
                  <td className="py-3.5 px-6 font-bold text-slate-800">Preparation Method</td>
                  <td className="py-3.5 px-6 font-bold text-slate-900 bg-sky-50/30">
                    ✔ Vedic Bilona (Milk → Curd → Churning → Ghee)
                  </td>
                  <td className="py-3.5 px-6 text-slate-500">
                    Direct heating of leftover milk cream / malai
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-slate-800">Grain Texture (Danedar)</td>
                  <td className="py-3.5 px-6 font-bold text-slate-900 bg-sky-50/30">
                    ✔ Naturally Granular &amp; Highly Dense
                  </td>
                  <td className="py-3.5 px-6 text-slate-500">
                    Flat, oily, or chemically emulsified texture
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-slate-800">Aroma &amp; Taste</td>
                  <td className="py-3.5 px-6 font-bold text-slate-900 bg-sky-50/30">
                    ✔ Rich, nutty, authentic village aroma
                  </td>
                  <td className="py-3.5 px-6 text-slate-500">
                    Artificial flavoring or flat grease odor
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-slate-800">Digestibility &amp; Nutrition</td>
                  <td className="py-3.5 px-6 font-bold text-slate-900 bg-sky-50/30">
                    ✔ Rich in A2 proteins, Butyric acid &amp; Vitamins
                  </td>
                  <td className="py-3.5 px-6 text-slate-500">
                    Heavy on digestion, cholesterol risk
                  </td>
                </tr>
                <tr>
                  <td className="py-3.5 px-6 font-bold text-slate-800">Packaging Material</td>
                  <td className="py-3.5 px-6 font-bold text-slate-900 bg-sky-50/30">
                    ✔ Premium Glass Jar (Zero Chemical Leaching)
                  </td>
                  <td className="py-3.5 px-6 text-slate-500">
                    Plastic pouches or cheap tins
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── BELOW THE FOLD SECTION 3: VERIFIED REVIEWS ── */}
        <section id="reviews" className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm mb-12 w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-6 border-b border-slate-100 w-full">
            <div>
              <span className="text-xs font-bold text-[#0078BE] uppercase tracking-widest block">Customer Testimonials</span>
              <h2 className="text-2xl sm:text-4xl font-serif font-black text-slate-900">Verified Buyer Reviews</h2>
            </div>
            
            <div className="flex items-center gap-4 bg-slate-50 px-6 py-4 rounded-2xl border border-slate-200">
              <div className="text-3xl font-black text-slate-900">4.9</div>
              <div>
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-xs font-semibold text-slate-500 mt-0.5">Based on 422+ verified customer reviews</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">2 days ago</span>
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-base">&quot;Exact taste of my grandmother&apos;s ghee!&quot;</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  I was skeptical about buying Bilona ghee online, but Dairy Cool blew my expectations away. The granular texture and nutty aroma took me straight back to my village home.
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Meenakshi Sharma</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified Buyer
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">1 week ago</span>
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-base">&quot;Best Ghee for Dal Tadka &amp; Roti&quot;</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  The packaging was super safe in a heavy glass jar with bubble wrap. Just 1 spoon on hot rotis makes the whole kitchen smell divine. Will definitely subscribe monthly!
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Rajesh Verma</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified Buyer
                </span>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/80 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">2 weeks ago</span>
                </div>
                <h4 className="font-serif font-bold text-slate-900 text-base">&quot;Gentle on stomach &amp; Pure A2 quality&quot;</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  My doctor recommended Bilona A2 ghee for my digestive health. Dairy Cool has been a game-changer. My hyperacidity has reduced significantly. Highly recommended!
                </p>
              </div>
              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800">Ananya Iyer</span>
                <span className="text-emerald-700 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Verified Buyer
                </span>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Sticky Bottom Action Bar for Mobile Devices */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 p-3 flex items-center justify-between shadow-lg">
        <div>
          <span className="text-[10px] text-slate-400 block font-semibold">Total Price</span>
          <div className="flex items-baseline gap-1">
            <span className="text-lg font-black text-slate-900">₹{selectedOption.price * quantity}</span>
            <span className="text-xs text-slate-400 line-through">₹{selectedOption.originalPrice * quantity}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleAddToCart}
            className="bg-[#0078BE] hover:bg-[#00629c] text-white font-bold px-5 py-2.5 rounded-xl text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add To Cart</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
