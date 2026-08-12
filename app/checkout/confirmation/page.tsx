"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  Calendar,
  ArrowRight,
  ShoppingBag,
  Phone,
  CreditCard,
  Banknote,
  MessageCircle,
  Clock,
  Copy,
  CheckCheck,
} from "lucide-react";

interface OrderData {
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    size: string;
    image: string;
  }>;
  total: number;
  address: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    pincode: string;
    state: string;
    notes: string;
  };
  paymentMethod: string;
  orderId: string;
  paymentId?: string;
  timestamp: string;
}

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "";
  const paymentId = searchParams.get("paymentId") || "";
  const method = searchParams.get("method") || "online";

  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("dairy_cool_last_order");
      if (saved) {
        setOrderData(JSON.parse(saved));
      }
    } catch {
      console.error("Failed to load order data");
    }

    // Hide confetti after animation
    const timer = setTimeout(() => setShowConfetti(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const estimatedDelivery = () => {
    const now = new Date();
    const delivery = new Date(now);
    delivery.setDate(delivery.getDate() + 7);
    return delivery.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const paymentMethodLabel = () => {
    switch (method) {
      case "online":
        return { label: "Paid Online (Razorpay)", icon: CreditCard, color: "text-[#0078BE]", bg: "bg-sky-50" };
      case "cod":
        return { label: "Cash on Delivery", icon: Banknote, color: "text-amber-600", bg: "bg-amber-50" };
      case "whatsapp":
        return { label: "Ordered via WhatsApp", icon: MessageCircle, color: "text-green-600", bg: "bg-green-50" };
      default:
        return { label: "Payment Received", icon: CheckCircle2, color: "text-green-600", bg: "bg-green-50" };
    }
  };

  const pm = paymentMethodLabel();
  const PaymentIcon = pm.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 via-white to-sky-50/30">

      {/* Confetti Overlay */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 20}%`,
                animationDuration: `${1 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 1}s`,
                width: `${6 + Math.random() * 10}px`,
                height: `${6 + Math.random() * 10}px`,
                borderRadius: Math.random() > 0.5 ? "50%" : "2px",
                backgroundColor: ["#0078BE", "#22c55e", "#f59e0b", "#ec4899", "#8b5cf6", "#06b6d4"][Math.floor(Math.random() * 6)],
                opacity: 0.7,
                transform: `rotate(${Math.random() * 360}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Top bar */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 flex items-center justify-center shadow-lg">
        <span className="font-extrabold text-sm tracking-widest uppercase flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> Order Confirmed!
        </span>
      </div>

      {/* Progress Steps - All Complete */}
      <div className="bg-white border-b border-slate-100 py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-2 text-green-600">
            <div className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center">
              <CheckCheck className="w-3.5 h-3.5" />
            </div>
            <span className="hidden sm:inline">Cart</span>
          </div>
          <div className="w-8 sm:w-16 h-px bg-green-500" />
          <div className="flex items-center gap-2 text-green-600">
            <div className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center">
              <CheckCheck className="w-3.5 h-3.5" />
            </div>
            <span className="hidden sm:inline">Checkout</span>
          </div>
          <div className="w-8 sm:w-16 h-px bg-green-500" />
          <div className="flex items-center gap-2 text-green-600">
            <div className="w-7 h-7 rounded-full bg-green-500 text-white flex items-center justify-center">
              <CheckCheck className="w-3.5 h-3.5" />
            </div>
            <span className="hidden sm:inline">Confirmed</span>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-8">

        {/* ======= SUCCESS HERO ======= */}
        <div className="text-center space-y-6">
          {/* Animated Checkmark */}
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 w-28 h-28 bg-green-100 rounded-full animate-ping opacity-20" />
            <div className="absolute inset-0 w-28 h-28 bg-green-50 rounded-full" />
            <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-2xl shadow-green-500/30">
              <CheckCircle2 className="w-14 h-14 text-white" strokeWidth={2.5} />
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-3xl sm:text-4xl font-serif font-black text-slate-900">
              {method === "cod" ? "Order Placed Successfully!" : method === "whatsapp" ? "Order Sent to WhatsApp!" : "Payment Successful!"}
            </h1>
            <p className="text-slate-500 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
              {method === "online"
                ? "Your payment has been received and your order is being prepared. You'll receive a confirmation on WhatsApp soon."
                : method === "cod"
                ? "Your order has been placed. Pay ₹" + (orderData?.total || 0) + " when it arrives at your doorstep."
                : "Your order has been shared on WhatsApp. Our team will confirm it shortly."}
            </p>
          </div>

          {/* Order ID */}
          <div className="inline-flex items-center gap-3 bg-white border border-slate-200 rounded-2xl px-5 py-3 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Order ID:</span>
            <code className="text-sm font-mono font-bold text-slate-900">{orderId.slice(0, 24)}{orderId.length > 24 ? "..." : ""}</code>
            <button onClick={copyOrderId} className="text-slate-400 hover:text-[#0078BE] transition p-1">
              {copied ? <CheckCheck className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* ======= ORDER DETAILS CARD ======= */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          {/* Payment method badge */}
          <div className={`${pm.bg} px-6 py-4 flex items-center justify-between border-b border-slate-100`}>
            <div className="flex items-center gap-3">
              <PaymentIcon className={`w-5 h-5 ${pm.color}`} />
              <span className={`font-bold text-sm ${pm.color}`}>{pm.label}</span>
            </div>
            {paymentId && (
              <span className="text-xs text-slate-500">
                Payment ID: <code className="font-mono">{paymentId.slice(0, 18)}...</code>
              </span>
            )}
          </div>

          {/* Order Items */}
          {orderData?.items && orderData.items.length > 0 && (
            <div className="px-6 py-5 space-y-4 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Package className="w-4 h-4" /> Items Ordered
              </h3>
              {orderData.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-slate-50 rounded-xl relative overflow-hidden flex-shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-slate-400">{item.size} × {item.quantity}</p>
                  </div>
                  <span className="font-bold text-slate-900 text-sm">₹{item.price * item.quantity}</span>
                </div>
              ))}

              {/* Total */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <span className="font-bold text-slate-600 text-sm">Grand Total</span>
                <span className="text-xl font-black text-[#0078BE]">₹{orderData.total}</span>
              </div>
            </div>
          )}

          {/* Delivery Address */}
          {orderData?.address && (
            <div className="px-6 py-5 space-y-3 border-b border-slate-100">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Delivery Address
              </h3>
              <div className="bg-slate-50 rounded-xl px-4 py-3">
                <p className="font-bold text-slate-900 text-sm">{orderData.address.name}</p>
                <p className="text-slate-600 text-sm mt-1">
                  {orderData.address.address}, {orderData.address.city} - {orderData.address.pincode}, {orderData.address.state}
                </p>
                <p className="text-slate-500 text-xs mt-1 flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {orderData.address.phone}
                </p>
              </div>
            </div>
          )}

          {/* Estimated Delivery */}
          <div className="px-6 py-5 space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <Truck className="w-4 h-4" /> Estimated Delivery
            </h3>
            <div className="flex items-center gap-4 bg-sky-50 rounded-xl px-4 py-3">
              <Calendar className="w-8 h-8 text-[#0078BE]" />
              <div>
                <p className="font-bold text-slate-900 text-sm">{estimatedDelivery()}</p>
                <p className="text-xs text-slate-500">5-7 business days • Free Pan-India Delivery</p>
              </div>
            </div>
          </div>
        </div>

        {/* ======= WHAT'S NEXT ======= */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
          <div className="px-6 py-5">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4" /> What Happens Next?
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-[#0078BE]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-[#0078BE]">1</span>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Order Confirmation</p>
                  <p className="text-xs text-slate-500">You&apos;ll receive a WhatsApp message confirming your order within 1 hour.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-amber-600">2</span>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Freshly Prepared</p>
                  <p className="text-xs text-slate-500">Your ghee will be freshly prepared using traditional bilona process by Dadi herself.</p>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-bold text-green-600">3</span>
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">Shipped & Delivered</p>
                  <p className="text-xs text-slate-500">Carefully packed and shipped. Track your order via WhatsApp updates.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======= ACTION BUTTONS ======= */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4 pb-12">
          <Link
            href="/"
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[#0078BE] to-[#0284c7] hover:from-[#005f99] hover:to-[#0274b3] text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-xl shadow-[#0078BE]/20 text-sm"
          >
            <ShoppingBag className="w-4 h-4" /> Continue Shopping
          </Link>
          <Link
            href="/track-order"
            className="flex-1 flex items-center justify-center gap-2 bg-white border-2 border-slate-200 hover:border-[#0078BE] text-slate-700 hover:text-[#0078BE] font-bold py-4 px-6 rounded-2xl transition-all text-sm"
          >
            Track Order <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-white">
          <div className="text-center space-y-4">
            <div className="w-12 h-12 border-4 border-[#0078BE] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-slate-500 text-sm">Loading order details...</p>
          </div>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
