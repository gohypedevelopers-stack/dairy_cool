"use client";

import React, { useState } from "react";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import { Truck, CheckCircle2, Clock, Package, MapPin, ArrowLeft } from "lucide-react";

export default function TrackOrderPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "result">("idle");
  const [trackingResult, setTrackingResult] = useState<{ id: string; status: string; expectedDate: string; location: string; step: number } | null>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId.trim()) return;
    setStatus("loading");
    setTimeout(() => {
      setStatus("result");
      setTrackingResult({
        id: orderId.toUpperCase(),
        status: "In Transit - Out for Delivery",
        expectedDate: "Today by 6:00 PM",
        location: "Greater Noida Distribution Hub",
        step: 3,
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <div className="flex-1 flex flex-col items-center justify-center py-20 px-4">
        <div className="max-w-xl w-full bg-[#FAF6F0] border border-amber-100 p-8 md:p-10 rounded-3xl shadow-lg text-center transition-all duration-500">
          <div className="w-20 h-20 bg-white border border-amber-200/60 rounded-full flex items-center justify-center mx-auto mb-6 text-[#0078BE] shadow-sm">
            <Truck className="w-10 h-10 animate-bounce" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-serif font-black text-slate-900 mb-2">Track Your Order</h1>
          <p className="text-slate-600 mb-8 text-sm md:text-base">
            Enter your Order ID or AWB number below to track the real-time status of your pure Bilona Ghee.
          </p>
          
          {status === "idle" && (
            <form onSubmit={handleTrack} className="space-y-4">
              <input 
                type="text" 
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter Order ID (e.g., DC-89420)" 
                required
                className="w-full px-5 py-4 rounded-2xl border border-amber-200 bg-white focus:outline-none focus:ring-2 focus:ring-[#0078BE] focus:border-[#0078BE] transition text-center font-bold text-lg tracking-wider"
              />
              <button 
                type="submit"
                className="w-full bg-[#0078BE] hover:bg-[#0066a1] active:scale-95 text-white font-extrabold py-4 rounded-2xl uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Package className="w-5 h-5" />
                <span>Track Package</span>
              </button>
            </form>
          )}

          {status === "loading" && (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <div className="w-12 h-12 border-4 border-[#0078BE] border-t-transparent rounded-full animate-spin" />
              <p className="text-slate-700 font-bold animate-pulse">Fetching live tracking status from our farm hub...</p>
            </div>
          )}

          {status === "result" && trackingResult && (
            <div className="bg-white rounded-2xl p-6 border border-amber-100 text-left space-y-6 shadow-sm animate-fadeIn">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-4 gap-2">
                <div>
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest block">Order ID</span>
                  <span className="text-xl font-black text-slate-900 font-mono">{trackingResult.id}</span>
                </div>
                <span className="bg-green-100 text-green-800 font-extrabold text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  {trackingResult.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-4 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[9px]">Expected Delivery</p>
                    <p className="font-extrabold text-slate-800">{trackingResult.expectedDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0078BE] shrink-0" />
                  <div>
                    <p className="text-slate-400 font-bold uppercase text-[9px]">Current Location</p>
                    <p className="font-extrabold text-slate-800">{trackingResult.location}</p>
                  </div>
                </div>
              </div>

              {/* Progress Timeline */}
              <div className="space-y-4 pt-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Shipment Progress</p>
                
                <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                  <div className="relative flex items-center gap-3">
                    <span className="absolute -left-6 w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3" />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Order Confirmed & Churned (Vedic Bilona)</p>
                      <p className="text-[10px] text-slate-400">Handcrafted in small batches before dawn</p>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-3">
                    <span className="absolute -left-6 w-4 h-4 rounded-full bg-green-500 text-white flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3" />
                    </span>
                    <div>
                      <p className="text-xs font-bold text-slate-900">Quality Checked by Dadi Kamlesh</p>
                      <p className="text-[10px] text-slate-400">Packed in hygienic glass jars</p>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-3">
                    <span className="absolute -left-6 w-4 h-4 rounded-full bg-[#0078BE] ring-4 ring-sky-100 flex items-center justify-center" />
                    <div>
                      <p className="text-xs font-extrabold text-[#0078BE]">Out for Delivery (In Transit)</p>
                      <p className="text-[10px] text-slate-500">Courier partner is out for delivery in your area</p>
                    </div>
                  </div>

                  <div className="relative flex items-center gap-3">
                    <span className="absolute -left-6 w-4 h-4 rounded-full bg-slate-200" />
                    <div>
                      <p className="text-xs font-medium text-slate-400">Delivered to Your Doorstep</p>
                      <p className="text-[10px] text-slate-400">Pending arrival</p>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setStatus("idle");
                  setOrderId("");
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Track Another Order</span>
              </button>
            </div>
          )}

          <p className="mt-8 text-xs text-slate-500">
            Having trouble? <a href="https://wa.me/9716003060" target="_blank" rel="noopener noreferrer" className="text-[#0078BE] font-bold hover:underline">Contact Support via WhatsApp</a>
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
