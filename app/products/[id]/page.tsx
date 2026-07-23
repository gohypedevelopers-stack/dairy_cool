"use client";

import React, { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Plus, Minus, ChevronDown, ShoppingBag } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import CartDrawer from "@/components/cart-drawer";

interface ProductOption {
  size: string;
  price: number;
  originalPrice: number;
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
}

const productsData: Record<string, ProductDetails> = {
  bilona_ghee: {
    id: "bilona_ghee",
    name: "Pure Buffalo Bilona Ghee",
    title: "A2 Buffalo Ghee – Bilona Method | Traditional Handcrafted | 30 Litres of Milk, 1 Litre of Ghee",
    desc: "Handcrafted using traditional wooden churning on fresh curd. High granular quality. Hand-poured under Dadi's guidance.",
    image: "/images/buffalo_ghee_single.png",
    thumbnails: [
      "/images/buffalo_ghee_single.png",
      "/images/ghee_jar.png",
      "/images/ingredients_bilona.png",
      "/images/ingredients_slow_cooked.png"
    ],
    options: [
      { size: "500ml", price: 749, originalPrice: 1500 },
      { size: "1L", price: 1399, originalPrice: 2800 }
    ],
    ordersDelivered: "5,00,000+ Orders delivered",
    rating: "4.9",
    reviews: "422"
  },
  combo_packs: {
    id: "combo_packs",
    name: "Dadi Healthy Combo Packs",
    title: "Dadi Healthy Combo Packs – Traditional Ghee & Honey | Complete Wellness Bundle",
    desc: "Best family value bundle. Promotes cognitive immunity and gut health.",
    image: "/images/buffalo_ghee_combo.png",
    thumbnails: [
      "/images/buffalo_ghee_combo.png",
      "/images/buffalo_ghee_single.png",
      "/images/ghee_jar.png",
      "/images/ingredients_bilona.png"
    ],
    options: [
      { size: "Combo Packs", price: 2699, originalPrice: 5000 }
    ],
    ordersDelivered: "1,50,000+ Orders delivered",
    rating: "4.9",
    reviews: "189"
  }
};

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const productId = resolvedParams.id;
  const product = productsData[productId] || productsData.bilona_ghee;

  // States
  const [selectedImage, setSelectedImage] = useState(product.thumbnails[0]);
  const [selectedOption, setSelectedOption] = useState(product.options[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>("description");

  // Cart State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cart Handlers
  const handleAddToCart = () => {
    const cartItemId = `${product.id}-${selectedOption.size}`;
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === cartItemId);
      if (existing) {
        return prevItems.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prevItems,
        {
          id: cartItemId,
          name: product.name,
          price: selectedOption.price,
          quantity: quantity,
          size: selectedOption.size,
          image: product.image,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    window.location.href = "/checkout";
  };

  const updateQuantity = (id: string, newQty: number) => {
    if (newQty <= 0) return;
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: newQty } : item))
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleWhatsAppOrder = () => {
    const message = `Hello Dairy Cool! I want to order ${product.name} (${selectedOption.size}) - Qty: ${quantity}. Price: ₹${selectedOption.price * quantity}.`;
    window.open(`https://wa.me/9716003060?text=${encodeURIComponent(message)}`, "_blank");
  };

  const toggleAccordion = (section: string) => {
    setActiveAccordion(activeAccordion === section ? null : section);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-sky-500 selection:text-white">
      {/* Header */}
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        cartItemsCount={totalCartCount}
        setIsCartOpen={setIsCartOpen}
        onWhatsAppOrder={handleWhatsAppOrder}
      />

      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center text-sm font-semibold text-sky-600 hover:text-sky-700 mb-8 transition">
          ← Back to Shop
        </Link>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white rounded-xl border border-slate-100 p-6 md:p-8 shadow-sm items-start">

          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4 lg:sticky lg:top-24">
            <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-slate-50 border border-slate-150 shadow-inner">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                className="object-cover transition-all duration-300"
                priority
              />
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-2.5 overflow-x-auto py-1">
              {product.thumbnails.map((thumb, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(thumb)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${selectedImage === thumb ? "border-sky-500 shadow-md scale-95" : "border-slate-200 hover:border-slate-300"
                    }`}
                >
                  <Image
                    src={thumb}
                    alt={`${product.name} View ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Config & Details */}
          <div className="lg:col-span-6 space-y-6">

            {/* Title & Badges */}
            <div className="space-y-2">
              <span className="inline-block bg-sky-50 text-sky-600 border border-sky-200 font-extrabold text-[9px] px-3 py-1 rounded-full uppercase tracking-wider">
                {product.id === "combo_packs" ? "Wellness Combo" : "Buffalo Bilona Ghee"}
              </span>
              <h1 className="text-xl md:text-2xl lg:text-3xl font-serif font-extrabold text-slate-900 leading-snug">
                {product.title}
              </h1>
              <p className="text-xs font-bold text-green-600 flex items-center gap-1.5 pt-0.5">
                {product.ordersDelivered} | Love of India
              </p>
            </div>

            {/* Ratings & Reviews */}
            <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-extrabold text-slate-900">{product.rating}</span>
              <span className="text-xs font-medium text-slate-400">({product.reviews} reviews)</span>
            </div>

            {/* Price tag */}
            <div className="space-y-1">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-sans font-black text-[#0284c7] tracking-tight">
                  ₹{selectedOption.price * quantity}
                </span>
                <span className="text-lg font-sans font-bold text-slate-400 line-through">
                  ₹{selectedOption.originalPrice * quantity}
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium">MRP (incl. of all taxes)</p>
            </div>

            {/* Size Selectors */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Size</span>
              <div className="flex flex-wrap gap-2.5">
                {product.options.map((opt) => (
                  <button
                    key={opt.size}
                    onClick={() => {
                      setSelectedOption(opt);
                      setQuantity(1); // Reset qty on option switch
                    }}
                    className={`px-6 py-2.5 rounded-lg text-xs font-bold border transition cursor-pointer ${selectedOption.size === opt.size
                      ? "bg-[#f0f9ff] border-[#0284c7] text-[#0284c7] font-extrabold shadow-sm"
                      : "bg-white border-slate-200 text-slate-650 hover:bg-slate-50"
                      }`}
                  >
                    {opt.size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-4 pt-2 border-t border-slate-100">
              <div className="flex flex-wrap items-center gap-4">

                {/* Quantity */}
                <div className="flex items-center border border-slate-200 rounded-lg bg-white overflow-hidden shadow-sm h-[42px]">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 text-slate-650 hover:text-[#0284c7] active:bg-slate-50 transition cursor-pointer"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-3 font-extrabold text-slate-800 text-sm w-8 text-center select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 text-slate-650 hover:text-[#0284c7] active:bg-slate-50 transition cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                {/* Add to Cart (styled in sky blue color) */}
                <button
                  onClick={handleAddToCart}
                  className="flex-grow flex items-center justify-center gap-2 bg-[#0284c7] hover:bg-[#0274b3] text-white font-extrabold px-6 py-3 rounded-lg text-xs uppercase tracking-widest transition shadow-md h-[42px] cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to cart
                </button>
              </div>

              {/* Buy Now Button (styled in sky blue color) */}
              <button
                onClick={handleBuyNow}
                className="w-full flex items-center justify-center gap-2 bg-[#0284c7] hover:bg-[#0274b3] text-white font-extrabold py-3.5 rounded-lg text-xs uppercase tracking-widest transition shadow-lg shadow-sky-500/10 cursor-pointer"
              >
                Buy Now →
              </button>
            </div>


            {/* Accordion Tabs */}
            <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200">
              {/* Tab 1 */}
              <div className="bg-white">
                <button
                  onClick={() => toggleAccordion("description")}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-serif font-bold text-slate-900 text-sm hover:bg-slate-50 transition cursor-pointer"
                >
                  <span>Description</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeAccordion === "description" ? "rotate-180" : ""}`} />
                </button>
                {activeAccordion === "description" && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-500 leading-relaxed space-y-2">
                    <p>{product.desc}</p>
                    <p>It is rich in fat-soluble vitamins, aids digestion, promotes gut health, and keeps you active all day long. Prepared in hygienic micro-batches.</p>
                  </div>
                )}
              </div>

              {/* Tab 2 */}
              <div className="bg-white">
                <button
                  onClick={() => toggleAccordion("process")}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-serif font-bold text-slate-900 text-sm hover:bg-slate-50 transition cursor-pointer"
                >
                  <span>Making Process</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeAccordion === "process" ? "rotate-180" : ""}`} />
                </button>
                {activeAccordion === "process" && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-500 leading-relaxed">
                    Our Dadi supervises the entire process on mud chulhas with dung cakes. Bidirectional churning guarantees graininess and retains medicinal properties of the ghee.
                  </div>
                )}
              </div>

              {/* Tab 3 */}
              <div className="bg-white">
                <button
                  onClick={() => toggleAccordion("benefits")}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-serif font-bold text-slate-900 text-sm hover:bg-slate-50 transition cursor-pointer"
                >
                  <span>Benefits</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeAccordion === "benefits" ? "rotate-180" : ""}`} />
                </button>
                {activeAccordion === "benefits" && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-500 leading-relaxed space-y-1.5">
                    <p>Boosts metabolism and physical strength</p>
                    <p>Excellent source of butyric acid for healthy gut microbes</p>
                    <p>High smoke point makes it perfect for roasting and cooking</p>
                  </div>
                )}
              </div>

              {/* Tab 4 */}
              <div className="bg-white">
                <button
                  onClick={() => toggleAccordion("shipping")}
                  className="w-full flex items-center justify-between px-5 py-4 text-left font-serif font-bold text-slate-900 text-sm hover:bg-slate-50 transition cursor-pointer"
                >
                  <span>Shipping &amp; Delivery</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${activeAccordion === "shipping" ? "rotate-180" : ""}`} />
                </button>
                {activeAccordion === "shipping" && (
                  <div className="px-5 pb-5 pt-1 text-xs text-slate-500 leading-relaxed">
                    Free shipping across India. Orders are processed within 24 hours and delivered in 4-6 business days in transit-safe, premium glass bottles.
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Cart Drawer Component */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </div>
  );
}
