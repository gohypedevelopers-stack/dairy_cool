"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  ShoppingBag
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";

const DEMO_ORDERS = [
  { id: "DC-89420", label: "DC-89420 (Out for Delivery)" },
  { id: "DC-90145", label: "DC-90145 (Fresh Churning)" },
  { id: "DC-77312", label: "DC-77312 (Delivered)" },
];

export default function TrackOrderPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "result">("idle");
  
  const [trackingResult, setTrackingResult] = useState<{
    id: string;
    status: string;
    expectedDate: string;
    location: string;
    step: number;
    carrier: string;
    awbNumber: string;
    itemTitle: string;
    itemSize: string;
    itemQty: number;
    totalAmount: number;
    paymentMode: string;
    customerAddress: string;
  } | null>(null);

  const performTracking = (idToTrack: string) => {
    if (!idToTrack.trim()) return;
    const cleanId = idToTrack.trim().toUpperCase();
    setOrderId(cleanId);
    setStatus("loading");

    setTimeout(() => {
      setStatus("result");
      
      if (cleanId === "DC-77312") {
        setTrackingResult({
          id: cleanId,
          status: "Delivered",
          expectedDate: "Delivered Yesterday at 2:15 PM",
          location: "Delivered to Residence",
          step: 4,
          carrier: "Delhivery Express",
          awbNumber: "DEL-984210452",
          itemTitle: "A2 Buffalo Ghee (1L Family Pack)",
          itemSize: "1L Glass Jar",
          itemQty: 1,
          totalAmount: 1399,
          paymentMode: "Prepaid (UPI)",
          customerAddress: "Sector 62, Noida, Uttar Pradesh 201301",
        });
      } else if (cleanId === "DC-90145") {
        setTrackingResult({
          id: cleanId,
          status: "Fresh Churning in Progress",
          expectedDate: "Expected Dispatch Tomorrow",
          location: "Dairy Cool Vedic Farm Hub, Jaanchh",
          step: 1,
          carrier: "Express BlueDart",
          awbNumber: "BD-330194821",
          itemTitle: "A2 Buffalo Ghee (500ml Pack)",
          itemSize: "500ml Glass Jar",
          itemQty: 2,
          totalAmount: 1498,
          paymentMode: "Cash on Delivery (COD)",
          customerAddress: "Vasant Kunj, New Delhi 110070",
        });
      } else {
        setTrackingResult({
          id: cleanId,
          status: "In Transit - Out for Delivery",
          expectedDate: "Today by 6:00 PM",
          location: "Greater Noida Distribution Hub",
          step: 3,
          carrier: "Express Courier Logistics",
          awbNumber: "ECL-77820194",
          itemTitle: "A2 Buffalo Ghee (500ml Pack) - Vedic Bilona",
          itemSize: "500ml Glass Jar",
          itemQty: 1,
          totalAmount: 749,
          paymentMode: "Prepaid (Online UPI)",
          customerAddress: "Golf Course Road, Gurugram, Haryana 122002",
        });
      }
    }, 700);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performTracking(orderId);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2E271E] flex flex-col font-sans antialiased selection:bg-[#0078BE] selection:text-white">
      {/* Header */}
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      {/* Main Container */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 relative z-10">
        
        {/* Top Header Badge */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-white px-3.5 py-1.5 rounded-full border border-stone-200 shadow-2xs text-xs font-bold text-stone-700 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Real-Time Shipment Tracker</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-[#2E271E] leading-tight">
            Track Your Fresh Ghee Order
          </h1>

          <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-lg mx-auto">
            Enter your Order ID (e.g., <strong className="text-[#2E271E]">DC-89420</strong>) to follow your handcrafted Vedic Bilona Ghee from our farm churning pot directly to your doorstep.
          </p>
        </div>

        {/* Tracking Card */}
        <div className="bg-white border border-stone-200 rounded-3xl p-5 sm:p-8 md:p-10 shadow-xs transition-all duration-500 w-full mb-10">
          
          {/* IDLE FORM STATE */}
          {status === "idle" && (
            <div className="max-w-xl mx-auto space-y-6 text-center">
              
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#FAF6F0] border border-stone-200 rounded-2xl flex items-center justify-center mx-auto text-[#0078BE] shadow-2xs">
                <Truck className="w-8 h-8 sm:w-10 sm:h-10 animate-bounce" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input 
                    type="text" 
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    placeholder="Enter Order ID (e.g., DC-89420)" 
                    required
                    className="w-full px-5 py-4 rounded-2xl border border-stone-300 bg-white focus:outline-none focus:ring-2 focus:ring-[#0078BE] focus:border-[#0078BE] transition text-center font-bold text-base sm:text-lg tracking-wider text-[#2E271E] placeholder:text-stone-400 placeholder:font-normal placeholder:tracking-normal shadow-2xs"
                  />
                  <Search className="w-5 h-5 text-stone-400 absolute left-4 top-1/2 -translate-y-1/2 hidden sm:block" />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-[#0078BE] hover:bg-[#0066a1] active:scale-98 text-white font-bold py-4 rounded-2xl uppercase tracking-wider text-xs sm:text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                >
                  <Package className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>Track Package Status</span>
                </button>
              </form>

              {/* Sample Order Chips for Easy Testing */}
              <div className="pt-4 border-t border-stone-100">
                <span className="text-[11px] font-bold text-stone-400 uppercase tracking-widest block mb-2.5">
                  Try Sample Order IDs:
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {DEMO_ORDERS.map((demo) => (
                    <button
                      key={demo.id}
                      type="button"
                      onClick={() => performTracking(demo.id)}
                      className="bg-stone-100 hover:bg-stone-200 active:scale-95 text-[#2E271E] font-bold text-xs px-3.5 py-1.5 rounded-full transition border border-stone-200 cursor-pointer"
                    >
                      {demo.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* LOADING STATE */}
          {status === "loading" && (
            <div className="py-14 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="w-12 h-12 border-4 border-[#0078BE] border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-bold text-[#2E271E] animate-pulse">
                Fetching live shipment status from Dairy Cool Farm Hub...
              </p>
              <span className="text-xs text-stone-500">Verifying batch churn logs & courier manifest</span>
            </div>
          )}

          {/* RESULTS STATE */}
          {status === "result" && trackingResult && (
            <div className="space-y-8 animate-fadeIn">
              
              {/* Header Details Strip */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-stone-200 pb-5 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-widest">Order ID</span>
                    <span className="bg-stone-100 text-stone-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Verified</span>
                  </div>
                  <span className="text-2xl font-serif font-black text-[#2E271E] font-mono tracking-tight block">
                    {trackingResult.id}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className={`font-extrabold text-xs px-3.5 py-1.5 rounded-full flex items-center gap-1.5 ${
                    trackingResult.step === 4 
                      ? "bg-emerald-100 text-emerald-800" 
                      : trackingResult.step === 1
                      ? "bg-amber-100 text-amber-800"
                      : "bg-sky-100 text-sky-800"
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      trackingResult.step === 4 ? "bg-emerald-600" : "bg-sky-600 animate-ping"
                    }`} />
                    {trackingResult.status}
                  </span>
                </div>
              </div>

              {/* Status Meta Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-[#FAF6F0]/80 p-3.5 rounded-2xl border border-stone-200/70 flex items-center gap-3">
                  <Clock className="w-5 h-5 text-amber-600 shrink-0" />
                  <div>
                    <p className="text-stone-400 font-bold uppercase text-[9px]">Expected Delivery</p>
                    <p className="font-extrabold text-[#2E271E] text-xs sm:text-sm">{trackingResult.expectedDate}</p>
                  </div>
                </div>

                <div className="bg-[#FAF6F0]/80 p-3.5 rounded-2xl border border-stone-200/70 flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-[#0078BE] shrink-0" />
                  <div>
                    <p className="text-stone-400 font-bold uppercase text-[9px]">Current Location</p>
                    <p className="font-extrabold text-[#2E271E] text-xs sm:text-sm">{trackingResult.location}</p>
                  </div>
                </div>

                <div className="bg-[#FAF6F0]/80 p-3.5 rounded-2xl border border-stone-200/70 flex items-center gap-3">
                  <Truck className="w-5 h-5 text-stone-700 shrink-0" />
                  <div>
                    <p className="text-stone-400 font-bold uppercase text-[9px]">Courier Partner</p>
                    <p className="font-extrabold text-[#2E271E] text-xs sm:text-sm">{trackingResult.carrier}</p>
                  </div>
                </div>
              </div>

              {/* Multi-Step Timeline */}
              <div className="bg-stone-50/70 border border-stone-200/80 rounded-2xl p-5 sm:p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-bold text-[#2E271E] uppercase tracking-wider">Live Journey Timeline</p>
                  <span className="text-[11px] text-stone-500 font-mono">AWB: {trackingResult.awbNumber}</span>
                </div>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2.5 before:bottom-2.5 before:w-0.5 before:bg-stone-200">
                  
                  {/* Step 1 */}
                  <div className="relative flex items-start gap-3.5">
                    <span className={`absolute -left-6 w-4 h-4 rounded-full flex items-center justify-center ${
                      trackingResult.step >= 1 ? "bg-emerald-600 text-white" : "bg-stone-300"
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-[#2E271E]">Order Confirmed & Farm Churning Started</p>
                      <p className="text-[11px] text-stone-500">Fresh raw buffalo milk boiled & slow-churned via wooden bilona in clay pots</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex items-start gap-3.5">
                    <span className={`absolute -left-6 w-4 h-4 rounded-full flex items-center justify-center ${
                      trackingResult.step >= 2 ? "bg-emerald-600 text-white" : "bg-stone-300"
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-[#2E271E]">Dadi's Lab Quality Check & Glass Packaging</p>
                      <p className="text-[11px] text-stone-500">Purity inspected by Kamlesh Khari ji & packed in transit-safe eco glass jars</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex items-start gap-3.5">
                    <span className={`absolute -left-6 w-4 h-4 rounded-full flex items-center justify-center ${
                      trackingResult.step === 3 
                        ? "bg-[#0078BE] ring-4 ring-sky-100 text-white" 
                        : trackingResult.step > 3 
                        ? "bg-emerald-600 text-white" 
                        : "bg-stone-300"
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <p className={`text-xs sm:text-sm font-bold ${trackingResult.step === 3 ? "text-[#0078BE]" : "text-[#2E271E]"}`}>
                        Handed to Express Courier (In Transit)
                      </p>
                      <p className="text-[11px] text-stone-500">Dispatched via express logistics with live GPS tracking</p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="relative flex items-start gap-3.5">
                    <span className={`absolute -left-6 w-4 h-4 rounded-full flex items-center justify-center ${
                      trackingResult.step === 4 ? "bg-emerald-600 text-white" : "bg-stone-300"
                    }`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                    <div>
                      <p className={`text-xs sm:text-sm font-bold ${trackingResult.step === 4 ? "text-emerald-700" : "text-stone-400"}`}>
                        Safe Doorstep Delivery
                      </p>
                      <p className="text-[11px] text-stone-500">
                        {trackingResult.step === 4 ? "Delivered to recipient with zero damage" : "Pending final delivery scan"}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Order Items Preview Card */}
              <div className="border border-stone-200 rounded-2xl p-4 sm:p-5 bg-white space-y-3">
                <p className="text-xs font-bold text-[#2E271E] uppercase tracking-wider">Package Contents Summary</p>
                
                <div className="flex items-center justify-between gap-3 bg-[#FAF6F0]/60 p-3 rounded-xl border border-stone-200/60">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 relative rounded-lg bg-white border border-stone-200 overflow-hidden shrink-0">
                      <Image
                        src="/images/buffalo_ghee_single.png"
                        alt={trackingResult.itemTitle}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs sm:text-sm font-bold text-[#2E271E]">{trackingResult.itemTitle}</h4>
                      <p className="text-[11px] text-stone-500">{trackingResult.itemSize} • Qty: {trackingResult.itemQty}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs sm:text-sm font-black text-[#2E271E]">₹{trackingResult.totalAmount}</span>
                    <span className="text-[10px] text-emerald-700 font-bold block">{trackingResult.paymentMode}</span>
                  </div>
                </div>

                <div className="text-[11px] text-stone-600 flex items-start gap-1.5 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-stone-500 shrink-0 mt-0.5" />
                  <p><strong className="text-[#2E271E]">Delivery Address:</strong> {trackingResult.customerAddress}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button 
                  onClick={() => {
                    setStatus("idle");
                    setOrderId("");
                  }}
                  className="flex-1 bg-stone-100 hover:bg-stone-200 active:scale-98 text-stone-800 font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition border border-stone-300 cursor-pointer flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Track Another Order</span>
                </button>
                
                <Link
                  href="/products/ghee_500ml"
                  className="flex-1 bg-[#2E271E] hover:bg-[#1a1611] active:scale-98 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Order More Ghee</span>
                </Link>
              </div>

            </div>
          )}

        </div>

        {/* WhatsApp Help Banner */}
        <div className="bg-white border border-stone-200 rounded-2xl p-4 sm:p-6 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
              <WhatsAppIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#2E271E]">Need Help With Your Shipment?</h3>
              <p className="text-xs text-stone-500">Our customer support team is available on WhatsApp 9 AM - 8 PM daily.</p>
            </div>
          </div>

          <a 
            href="https://wa.me/9716003060?text=Hello%20Dairy%20Cool!%20I%20need%20help%20tracking%20my%20order." 
            target="_blank" 
            rel="noopener noreferrer" 
            className="w-full sm:w-auto bg-[#22c55e] hover:bg-[#1eb052] active:scale-95 text-white font-bold px-5 py-3 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 shadow-2xs cursor-pointer whitespace-nowrap"
          >
            <WhatsAppIcon className="w-4 h-4" />
            <span>Chat On WhatsApp</span>
          </a>
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
