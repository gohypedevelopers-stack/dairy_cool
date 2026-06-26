"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // WhatsApp order message
    const msg = `🛒 New Order from Dairy Cool Website!

👤 Name: ${form.name}
📞 Phone: ${form.phone}
📧 Email: ${form.email}
📍 Address: ${form.address}, ${form.city} - ${form.pincode}, ${form.state}
📝 Notes: ${form.notes || "None"}

Please confirm my order. Thank you!`;
    window.open(`https://wa.me/9716003060?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex flex-col">

      {/* Top bar */}
      <div className="bg-[#0078BE] text-white py-4 px-6 flex items-center justify-between shadow-md">
        <Link href="/" className="flex items-center gap-2 text-white font-extrabold text-lg tracking-wide">
          ← Back to Store
        </Link>
        <span className="font-extrabold text-base tracking-widest uppercase">Checkout</span>
        <span className="text-white/60 text-sm">🔒 Secure Order</span>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-12">
        {submitted ? (
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center space-y-6">
            <div className="text-7xl">🎉</div>
            <h2 className="text-3xl font-serif font-extrabold text-slate-900">Order Placed!</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Your order has been sent via WhatsApp. Our team will confirm it shortly.
            </p>
            <Link
              href="/"
              className="inline-block mt-4 bg-[#0078BE] hover:bg-[#005f99] text-white font-bold px-8 py-3 rounded-xl transition"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden">

            {/* Header */}
            <div className="bg-[#0078BE] px-8 py-6">
              <h1 className="text-2xl font-serif font-extrabold text-white">Delivery Details</h1>
              <p className="text-white/70 text-sm mt-1">Fill in your details to complete the order</p>
            </div>

            <form onSubmit={handleSubmit} className="px-8 py-8 space-y-5">

              {/* Name & Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name *</label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    placeholder="Ramesh Kumar"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078BE]/40 focus:border-[#0078BE] transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone *</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    placeholder="9876543210"
                    type="tel"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078BE]/40 focus:border-[#0078BE] transition"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  type="email"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078BE]/40 focus:border-[#0078BE] transition"
                />
              </div>

              {/* Address */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Address *</label>
                <input
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  placeholder="House No, Street, Area"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078BE]/40 focus:border-[#0078BE] transition"
                />
              </div>

              {/* City, Pincode, State */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">City *</label>
                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    required
                    placeholder="Delhi"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078BE]/40 focus:border-[#0078BE] transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Pincode *</label>
                  <input
                    name="pincode"
                    value={form.pincode}
                    onChange={handleChange}
                    required
                    placeholder="110001"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078BE]/40 focus:border-[#0078BE] transition"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">State *</label>
                  <input
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    required
                    placeholder="UP"
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078BE]/40 focus:border-[#0078BE] transition"
                  />
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Special Notes</label>
                <textarea
                  name="notes"
                  value={form.notes}
                  onChange={handleChange}
                  placeholder="Any special instructions..."
                  rows={2}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0078BE]/40 focus:border-[#0078BE] transition"
                />
              </div>

              {/* Payment note */}
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800 font-medium flex items-start gap-2">
                <span className="text-base">💳</span>
                <span>Payment is collected on delivery (COD). Our team will confirm your order via WhatsApp call.</span>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-[#0078BE] hover:bg-[#005f99] active:scale-95 text-white font-extrabold py-3.5 rounded-xl transition-all shadow-lg text-sm uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <span>📦</span> Confirm Order via WhatsApp
              </button>

              <p className="text-center text-xs text-slate-400">
                You will be redirected to WhatsApp to confirm your order.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
