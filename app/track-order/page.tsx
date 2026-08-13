"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import { 
  Truck, 
  CheckCircle2, 
  Clock, 
  Package, 
  MapPin, 
  ArrowLeft, 
  Search, 
  Sparkles, 
  ShoppingBag,
  AlertCircle,
  Phone,
  RefreshCw,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { getOrderByIdAsync, getAllOrders, StoredOrder } from "@/lib/order-store";
import { useAuth } from "@/lib/auth-context";

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const initialOrderId = searchParams.get("orderId") || "";
  const { user, isAuthenticated } = useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState(initialOrderId);
  const [activeOrder, setActiveOrder] = useState<StoredOrder | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleTrack = async (queryToTrack: string) => {
    if (!queryToTrack.trim()) return;
    setIsLoading(true);
    setSearched(true);
    try {
      const found = await getOrderByIdAsync(queryToTrack.trim());
      setActiveOrder(found);
    } catch {
      setActiveOrder(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Track automatically if URL query param exists
  useEffect(() => {
    if (initialOrderId) {
      handleTrack(initialOrderId);
    }
  }, [initialOrderId]);

  // Listen for live status changes from Admin Dashboard
  useEffect(() => {
    const handleStorageChange = () => {
      if (inputQuery) {
        handleTrack(inputQuery);
      }
    };

    window.addEventListener("dairycool_orders_updated", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("dairycool_orders_updated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [inputQuery]);

  // Strictly filter recent orders ONLY for the logged-in user (never for guests or other users)
  const userRecentOrders = (isAuthenticated && user)
    ? getAllOrders().filter(
        (o) =>
          (user.email && o.customerEmail.toLowerCase() === user.email.toLowerCase()) ||
          (user.phone && o.customerPhone && o.customerPhone === user.phone)
      )
    : [];

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col font-sans text-slate-800 antialiased selection:bg-[#0078BE] selection:text-white">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between gap-3 mb-6">
          <Link href="/shop" className="inline-flex items-center gap-2 text-xs font-semibold text-[#0078BE] hover:underline">
            <ArrowLeft className="w-4 h-4" /> Return to Shop
          </Link>
        </div>

        {/* Page Title Header */}
        <div className="text-center space-y-2 mb-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-black text-[#0078BE]">
            Track Your Order
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Enter your Order ID (e.g. <strong className="text-slate-800">DC-10492</strong>) or mobile number to view real-time shipment status
          </p>
        </div>

        {/* Search Bar Container */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-sm border border-slate-200 mb-8 max-w-2xl mx-auto space-y-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleTrack(inputQuery);
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <Search className="w-4 h-4" />
              </div>
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Enter your Order ID (e.g. DC-10492)"
                className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0078BE]"
              />
            </div>
            <button
              type="submit"
              className="bg-[#0078BE] hover:bg-[#00629c] text-white font-bold px-6 py-3 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer shadow-sm shrink-0"
            >
              Track Now
            </button>
          </form>

          {/* Show recent order pills ONLY if user is logged in and has their own orders */}
          {isAuthenticated && userRecentOrders.length > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs text-slate-500">
              <span className="font-semibold text-slate-700">Your Recent Orders:</span>
              {userRecentOrders.slice(0, 3).map((o) => (
                <button
                  key={o.id}
                  onClick={() => {
                    setInputQuery(o.id);
                    handleTrack(o.id);
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition border cursor-pointer ${
                    inputQuery.toUpperCase() === o.id.toUpperCase()
                      ? "bg-[#0078BE] text-white border-[#0078BE]"
                      : "bg-slate-50 hover:bg-sky-50 text-slate-700 border-slate-200 hover:border-sky-300"
                  }`}
                >
                  {o.id}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ORDER TRACKING RESULT PANEL */}
        {searched && (
          <>
            {!activeOrder ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm space-y-3 max-w-2xl mx-auto">
                <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">Order Not Found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  No order record matched &quot;<strong className="text-slate-800">{inputQuery}</strong>&quot;. Please verify your Order ID or check your confirmation SMS/Email.
                </p>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-6">
                
                {/* Header Summary */}
                <div className="bg-gradient-to-r from-sky-50 via-slate-50 to-sky-50 px-6 sm:px-8 py-5 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">Tracking Order</span>
                    <h2 className="text-2xl font-black text-slate-900">{activeOrder.orderNumber}</h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Placed on {activeOrder.date} &bull; Payment via {activeOrder.paymentMethod}
                    </p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider ${
                        activeOrder.status === "Delivered"
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                          : activeOrder.status === "Out for Delivery"
                          ? "bg-sky-100 text-[#0078BE] border border-sky-300"
                          : "bg-amber-100 text-amber-800 border border-amber-300"
                      }`}
                    >
                      <Clock className="w-4 h-4" />
                      {activeOrder.status}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 block mt-1">
                      Estimated Arrival: <strong className="text-slate-800">{activeOrder.expectedDate}</strong>
                    </span>
                  </div>
                </div>

                <div className="p-6 sm:p-8 space-y-8">
                  
                  {/* Step Progress Bar */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                      <Truck className="w-4 h-4 text-[#0078BE]" /> Live Shipment Progress
                    </h3>

                    <div className="relative pt-2">
                      <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#0078BE] to-emerald-500 h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${
                              activeOrder.step === 4
                                ? "100%"
                                : activeOrder.step === 3
                                ? "75%"
                                : activeOrder.step === 2
                                ? "45%"
                                : "20%"
                            }`,
                          }}
                        />
                      </div>

                      {/* Step Labels */}
                      <div className="grid grid-cols-4 text-center mt-3 text-xs">
                        <div className={`space-y-1 ${activeOrder.step >= 1 ? "text-[#0078BE] font-extrabold" : "text-slate-400"}`}>
                          <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center text-[10px] font-bold ${activeOrder.step >= 1 ? "bg-[#0078BE] text-white" : "bg-slate-200 text-slate-500"}`}>
                            1
                          </div>
                          <span>Order Placed</span>
                        </div>

                        <div className={`space-y-1 ${activeOrder.step >= 2 ? "text-[#0078BE] font-extrabold" : "text-slate-400"}`}>
                          <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center text-[10px] font-bold ${activeOrder.step >= 2 ? "bg-[#0078BE] text-white" : "bg-slate-200 text-slate-500"}`}>
                            2
                          </div>
                          <span>Packed</span>
                        </div>

                        <div className={`space-y-1 ${activeOrder.step >= 3 ? "text-[#0078BE] font-extrabold" : "text-slate-400"}`}>
                          <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center text-[10px] font-bold ${activeOrder.step >= 3 ? "bg-[#0078BE] text-white" : "bg-slate-200 text-slate-500"}`}>
                            3
                          </div>
                          <span>Out for Delivery</span>
                        </div>

                        <div className={`space-y-1 ${activeOrder.step >= 4 ? "text-emerald-600 font-extrabold" : "text-slate-400"}`}>
                          <div className={`w-6 h-6 rounded-full mx-auto flex items-center justify-center text-[10px] font-bold ${activeOrder.step >= 4 ? "bg-emerald-600 text-white" : "bg-slate-200 text-slate-500"}`}>
                            4
                          </div>
                          <span>Delivered</span>
                        </div>
                      </div>
                    </div>

                    {/* Location Status Note */}
                    <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-100 text-xs font-semibold text-slate-700 flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-[#0078BE] shrink-0" />
                      <div>
                        <span className="text-slate-500 text-[10px] uppercase font-bold block">Current Hub Note</span>
                        <span className="text-slate-900 font-bold">{activeOrder.locationNote}</span>
                      </div>
                    </div>
                  </div>

                  {/* Customer & Shipping Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Customer Details</span>
                      <p className="text-sm font-extrabold text-slate-900">{activeOrder.customerName}</p>
                      <p className="text-xs text-slate-600 font-medium">{activeOrder.customerEmail}</p>
                      <p className="text-xs text-slate-600 font-medium">Phone: {activeOrder.customerPhone}</p>
                    </div>

                    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80 space-y-2">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Shipping Address</span>
                      <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                        {activeOrder.shippingAddress}<br />
                        {activeOrder.city}, {activeOrder.state} - {activeOrder.pincode}
                      </p>
                      <p className="text-[11px] text-[#0078BE] font-bold pt-1">
                        Carrier: {activeOrder.carrier} ({activeOrder.awbNumber})
                      </p>
                    </div>
                  </div>

                  {/* Order Items List */}
                  <div className="space-y-3 pt-4 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Ordered Products</h4>
                    <div className="divide-y divide-slate-100 bg-slate-50 rounded-2xl border border-slate-200/80 px-5">
                      {activeOrder.items.map((item, idx) => (
                        <div key={idx} className="py-3.5 flex items-center justify-between gap-4 text-xs">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white rounded-xl overflow-hidden relative shrink-0 border border-slate-200">
                              <img
                                src={item.image || "/images/buffalo_ghee_single.png"}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h5 className="font-bold text-slate-900">{item.name}</h5>
                              <p className="text-[11px] text-slate-500">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-extrabold text-slate-900">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom Assistance Bar */}
                  <div className="bg-gradient-to-r from-emerald-50 to-sky-50 p-4 rounded-2xl border border-emerald-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <span className="text-slate-700 font-medium">
                      Have questions about your delivery? Contact our farm team:
                    </span>
                    <a
                      href={`https://wa.me/919716003060?text=Hi%20DairyCool%2C%20I%20am%20tracking%20order%20${activeOrder.orderNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#22c55e] hover:bg-[#1eb052] text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 transition"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>WhatsApp Support</span>
                    </a>
                  </div>

                </div>
              </div>
            )}
          </>
        )}

      </main>

      <Footer />
    </div>
  );
}

export default function TrackOrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0078BE]"></div>
      </div>
    }>
      <TrackOrderContent />
    </Suspense>
  );
}
