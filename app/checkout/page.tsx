"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ShoppingBag,
  CreditCard,
  Truck,
  Shield,
  Lock,
  Minus,
  Plus,
  Trash2,
  CheckCircle2,
  Phone,
  MessageCircle,
  Banknote,
  Loader2,
} from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { useRazorpay } from "@/components/razorpay-loader";
import { WhatsAppIcon } from "@/components/icons";
import { useAuth } from "@/lib/auth-context";
import { saveNewOrder } from "@/lib/order-store";

type PaymentMethod = "online" | "cod" | "whatsapp";

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, updateQuantity, removeItem, clearCart, getCartTotal, totalCartCount } = useCart();
  const { isLoaded: razorpayLoaded, openPayment } = useRazorpay();
  const { user, addOrderRecord } = useAuth();

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

  // Auto-fill customer details from profile if user is logged in
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        address: user.address || prev.address,
        city: user.city || prev.city,
        pincode: user.pincode || prev.pincode,
        state: user.state || prev.state,
      }));
    }
  }, [user]);

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("online");
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = getCartTotal();
  const shipping = 0; // Free shipping
  const grandTotal = subtotal + shipping;

  // Redirect to shop if cart is empty
  useEffect(() => {
    if (totalCartCount === 0 && typeof window !== "undefined") {
      // Small delay to allow cart to load from localStorage
      const timer = setTimeout(() => {
        if (totalCartCount === 0) {
          // Don't redirect — let user see empty state
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [totalCartCount]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^[6-9]\d{9}$/.test(form.phone.trim()))
      newErrors.phone = "Enter a valid 10-digit Indian phone number";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^\d{6}$/.test(form.pincode.trim()))
      newErrors.pincode = "Enter a valid 6-digit pincode";
    if (!form.state.trim()) newErrors.state = "State is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Build WhatsApp message from cart
  const buildWhatsAppMessage = () => {
    let message = "🛒 *New Order from Dairy Cool Website!*\n\n";
    message += `👤 *Name:* ${form.name}\n`;
    message += `📞 *Phone:* ${form.phone}\n`;
    if (form.email) message += `📧 *Email:* ${form.email}\n`;
    message += `📍 *Address:* ${form.address}, ${form.city} - ${form.pincode}, ${form.state}\n`;
    if (form.notes) message += `📝 *Notes:* ${form.notes}\n`;
    message += "\n*Order Items:*\n";
    cartItems.forEach((item) => {
      message += `🥛 ${item.name} (${item.size}) × ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    message += `\n💰 *Total: ₹${grandTotal}*\n`;
    message += "\nPlease confirm my order. Thank you! 🙏";
    return message;
  };

  // Handle Razorpay Online Payment
  const handleOnlinePayment = async () => {
    if (!validateForm()) return;
    if (!razorpayLoaded) {
      alert("Payment system is loading. Please try again in a moment.");
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Create order on server
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: grandTotal,
          currency: "INR",
          receipt: `order_${Date.now()}`,
          notes: {
            customer_name: form.name,
            customer_phone: form.phone,
            customer_email: form.email || "",
            delivery_address: `${form.address}, ${form.city} - ${form.pincode}, ${form.state}`,
          },
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to create order");
      }

      // Step 2: Open Razorpay checkout
      openPayment({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
        amount: data.amount,
        currency: data.currency,
        name: "Dairy Cool Farm",
        description: "Pure Bilona A2 Ghee Order",
        order_id: data.orderId,
        prefill: {
          name: form.name,
          email: form.email || undefined,
          contact: form.phone,
        },
        notes: {
          address: `${form.address}, ${form.city} - ${form.pincode}, ${form.state}`,
        },
        theme: {
          color: "#0078BE",
        },
        handler: async (response) => {
          // Step 3: Verify payment on server
          try {
            const verifyRes = await fetch("/api/razorpay/verify-payment", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (verifyData.verified) {
              // Save order snapshot for confirmation page
              localStorage.setItem(
                "dairy_cool_last_order",
                JSON.stringify({
                  items: cartItems,
                  total: grandTotal,
                  address: form,
                  paymentMethod: "online",
                  orderId: response.razorpay_order_id,
                  paymentId: response.razorpay_payment_id,
                  timestamp: new Date().toISOString(),
                })
              );

              const formattedId = `DC-${response.razorpay_order_id.slice(-6).toUpperCase()}`;

              // Save in Master Order Store for /admin & /track-order
              saveNewOrder({
                id: formattedId,
                orderNumber: formattedId,
                customerName: form.name,
                customerPhone: form.phone,
                customerEmail: form.email || "customer@example.com",
                shippingAddress: form.address,
                city: form.city,
                pincode: form.pincode,
                state: form.state,
                items: cartItems.map((item) => ({
                  id: String(item.id),
                  name: item.name,
                  quantity: item.quantity,
                  price: item.price,
                  image: item.image,
                })),
                totalAmount: grandTotal,
                paymentMethod: "Razorpay Online",
                status: "Order Placed",
                date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
              });

              // Record in User Order History
              addOrderRecord({
                id: formattedId,
                orderNumber: formattedId,
                date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
                status: "Processing",
                total: grandTotal,
                paymentMethod: "Online Payment (Razorpay)",
                shippingAddress: `${form.address}, ${form.city} - ${form.pincode}`,
                items: cartItems.map((item) => ({
                  id: String(item.id),
                  name: item.name,
                  quantity: item.quantity,
                  price: item.price,
                  image: item.image,
                })),
              });

              clearCart();
              router.push(
                `/checkout/confirmation?orderId=${response.razorpay_order_id}&paymentId=${response.razorpay_payment_id}&method=online`
              );
            } else {
              alert("Payment verification failed. Please contact support.");
            }
          } catch {
            alert("Payment verification error. Please contact support.");
          }
          setIsProcessing(false);
        },
        modal: {
          ondismiss: () => {
            setIsProcessing(false);
          },
        },
      });
    } catch (error: any) {
      console.error("Payment error:", error);
      alert(error.message || "Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  // Handle COD
  const handleCOD = () => {
    if (!validateForm()) return;
    setIsProcessing(true);

    const orderId = `COD_${Date.now()}`;
    const formattedId = `DC-${orderId.slice(-6)}`;

    // Save order snapshot
    localStorage.setItem(
      "dairy_cool_last_order",
      JSON.stringify({
        items: cartItems,
        total: grandTotal,
        address: form,
        paymentMethod: "cod",
        orderId: formattedId,
        timestamp: new Date().toISOString(),
      })
    );

    // Save in Master Order Store for /admin & /track-order
    saveNewOrder({
      id: formattedId,
      orderNumber: formattedId,
      customerName: form.name,
      customerPhone: form.phone,
      customerEmail: form.email || "customer@example.com",
      shippingAddress: form.address,
      city: form.city,
      pincode: form.pincode,
      state: form.state,
      items: cartItems.map((item) => ({
        id: String(item.id),
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
      totalAmount: grandTotal,
      paymentMethod: "Cash on Delivery",
      status: "Order Placed",
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    });

    // Record in User Order History
    addOrderRecord({
      id: formattedId,
      orderNumber: formattedId,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      status: "Processing",
      total: grandTotal,
      paymentMethod: "Cash on Delivery",
      shippingAddress: `${form.address}, ${form.city} - ${form.pincode}`,
      items: cartItems.map((item) => ({
        id: String(item.id),
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
    });

    clearCart();
    router.push(`/checkout/confirmation?orderId=${formattedId}&method=cod`);
  };

  // Handle WhatsApp
  const handleWhatsApp = () => {
    if (!validateForm()) return;
    const message = buildWhatsAppMessage();
    const orderId = `WA_${Date.now()}`;
    const formattedId = `DC-${orderId.slice(-6)}`;

    window.open(`https://wa.me/9716003060?text=${encodeURIComponent(message)}`, "_blank");

    // Save order snapshot
    localStorage.setItem(
      "dairy_cool_last_order",
      JSON.stringify({
        items: cartItems,
        total: grandTotal,
        address: form,
        paymentMethod: "whatsapp",
        orderId: formattedId,
        timestamp: new Date().toISOString(),
      })
    );

    // Save in Master Order Store for /admin & /track-order
    saveNewOrder({
      id: formattedId,
      orderNumber: formattedId,
      customerName: form.name,
      customerPhone: form.phone,
      customerEmail: form.email || "customer@example.com",
      shippingAddress: form.address,
      city: form.city,
      pincode: form.pincode,
      state: form.state,
      items: cartItems.map((item) => ({
        id: String(item.id),
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
      totalAmount: grandTotal,
      paymentMethod: "WhatsApp Order",
      status: "Order Placed",
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
    });

    // Record in User Order History
    addOrderRecord({
      id: formattedId,
      orderNumber: formattedId,
      date: new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }),
      status: "Pending",
      total: grandTotal,
      paymentMethod: "WhatsApp Order",
      shippingAddress: `${form.address}, ${form.city} - ${form.pincode}`,
      items: cartItems.map((item) => ({
        id: String(item.id),
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image,
      })),
    });

    clearCart();
    router.push(`/checkout/confirmation?orderId=${formattedId}&method=whatsapp`);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentMethod === "online") handleOnlinePayment();
    else if (paymentMethod === "cod") handleCOD();
    else handleWhatsApp();
  };

  // If cart is empty, show empty state
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-blue-50 flex flex-col">
        {/* Top bar */}
        <div className="bg-gradient-to-r from-[#0078BE] to-[#005f99] text-white py-4 px-6 flex items-center justify-between shadow-lg">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-sm hover:text-white/80 transition">
            <ArrowLeft className="w-4 h-4" /> Back to Store
          </Link>
          <span className="font-extrabold text-sm tracking-widest uppercase flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" /> Checkout
          </span>
          <span className="text-white/60 text-xs flex items-center gap-1">
            <Lock className="w-3 h-3" /> Secure
          </span>
        </div>

        <div className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-md w-full text-center space-y-6 border border-slate-100">
            <div className="w-20 h-20 bg-sky-50 rounded-full flex items-center justify-center mx-auto">
              <ShoppingBag className="w-10 h-10 text-sky-400" />
            </div>
            <h2 className="text-2xl font-serif font-extrabold text-slate-900">Your Cart is Empty</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Add some delicious Bilona Ghee to your cart and come back here!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-[#0078BE] hover:bg-[#005f99] text-white font-bold px-8 py-3 rounded-xl transition shadow-lg shadow-[#0078BE]/20"
            >
              <ShoppingBag className="w-4 h-4" /> Shop Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-[#0078BE] to-[#005f99] text-white py-4 px-6 flex items-center justify-between shadow-lg sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2 text-white font-bold text-sm hover:text-white/80 transition">
          <ArrowLeft className="w-4 h-4" /> Back to Store
        </Link>
        <span className="font-extrabold text-sm tracking-widest uppercase flex items-center gap-2">
          <ShoppingBag className="w-4 h-4" /> Secure Checkout
        </span>
        <span className="text-white/60 text-xs flex items-center gap-1">
          <Lock className="w-3 h-3" /> 256-bit SSL
        </span>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-slate-100 py-4 px-6">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-4 text-xs font-bold">
          <div className="flex items-center gap-2 text-[#0078BE]">
            <div className="w-7 h-7 rounded-full bg-[#0078BE] text-white flex items-center justify-center text-xs font-bold">1</div>
            <span className="hidden sm:inline">Cart</span>
          </div>
          <div className="w-8 sm:w-16 h-px bg-[#0078BE]" />
          <div className="flex items-center gap-2 text-[#0078BE]">
            <div className="w-7 h-7 rounded-full bg-[#0078BE] text-white flex items-center justify-center text-xs font-bold">2</div>
            <span className="hidden sm:inline">Checkout</span>
          </div>
          <div className="w-8 sm:w-16 h-px bg-slate-200" />
          <div className="flex items-center gap-2 text-slate-400">
            <div className="w-7 h-7 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center text-xs font-bold">3</div>
            <span className="hidden sm:inline">Confirmation</span>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* ============ LEFT: ORDER SUMMARY ============ */}
          <div className="lg:col-span-5 lg:order-2">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden sticky top-24">
              {/* Header */}
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5">
                <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-sky-400" />
                  Order Summary
                  <span className="ml-auto bg-sky-500/20 text-sky-300 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {totalCartCount} {totalCartCount === 1 ? "item" : "items"}
                  </span>
                </h2>
              </div>

              {/* Cart Items */}
              <div className="p-6 space-y-4 max-h-[400px] overflow-y-auto">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 pb-4 border-b border-slate-50 last:border-b-0 last:pb-0"
                  >
                    <div className="w-16 h-16 bg-slate-50 rounded-xl flex-shrink-0 relative overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-slate-400 mt-0.5">{item.size}</p>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="px-1.5 py-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 text-xs font-bold text-slate-800">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-1.5 py-1 text-slate-400 hover:text-slate-600"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">₹{item.price * item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-slate-300 hover:text-red-500 transition p-0.5"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="border-t border-slate-100 px-6 py-5 space-y-2.5 bg-slate-50/50">
                <div className="flex justify-between text-sm text-slate-500">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-slate-500">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5" /> Shipping (Pan-India)
                  </span>
                  <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-extrabold text-slate-900 pt-3 border-t border-slate-200">
                  <span>Grand Total</span>
                  <span className="text-[#0078BE]">₹{grandTotal}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="px-6 py-4 border-t border-slate-100 bg-white">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span className="text-[10px] text-slate-500 font-medium leading-tight">100% Secure</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Truck className="w-4 h-4 text-sky-500" />
                    <span className="text-[10px] text-slate-500 font-medium leading-tight">Free Delivery</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                    <span className="text-[10px] text-slate-500 font-medium leading-tight">100% Genuine</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ============ RIGHT: DELIVERY + PAYMENT ============ */}
          <div className="lg:col-span-7 lg:order-1 space-y-6">

            {/* Delivery Details */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-[#0078BE] to-[#0284c7] px-6 py-5">
                <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                  <Truck className="w-5 h-5" /> Delivery Details
                </h2>
                <p className="text-white/60 text-xs mt-1">Fill in your delivery address to proceed</p>
              </div>

              <div className="px-6 py-6 space-y-5">
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Ramesh Kumar"
                      className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078BE]/30 focus:border-[#0078BE] transition ${
                        errors.name ? "border-red-300 bg-red-50/50" : "border-slate-200"
                      }`}
                    />
                    {errors.name && <p className="text-red-500 text-[10px] font-medium">{errors.name}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Phone <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="9876543210"
                        type="tel"
                        className={`w-full border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078BE]/30 focus:border-[#0078BE] transition ${
                          errors.phone ? "border-red-300 bg-red-50/50" : "border-slate-200"
                        }`}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-[10px] font-medium">{errors.phone}</p>}
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Email <span className="text-slate-300">(Optional)</span>
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    type="email"
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078BE]/30 focus:border-[#0078BE] transition"
                  />
                </div>

                {/* Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Full Address <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="House No, Street, Area"
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078BE]/30 focus:border-[#0078BE] transition ${
                      errors.address ? "border-red-300 bg-red-50/50" : "border-slate-200"
                    }`}
                  />
                  {errors.address && <p className="text-red-500 text-[10px] font-medium">{errors.address}</p>}
                </div>

                {/* City, Pincode, State */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      City <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Delhi"
                      className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078BE]/30 focus:border-[#0078BE] transition ${
                        errors.city ? "border-red-300 bg-red-50/50" : "border-slate-200"
                      }`}
                    />
                    {errors.city && <p className="text-red-500 text-[10px] font-medium">{errors.city}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      Pincode <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      placeholder="110001"
                      className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078BE]/30 focus:border-[#0078BE] transition ${
                        errors.pincode ? "border-red-300 bg-red-50/50" : "border-slate-200"
                      }`}
                    />
                    {errors.pincode && <p className="text-red-500 text-[10px] font-medium">{errors.pincode}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                      State <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="state"
                      value={form.state}
                      onChange={handleChange}
                      placeholder="Uttar Pradesh"
                      className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0078BE]/30 focus:border-[#0078BE] transition ${
                        errors.state ? "border-red-300 bg-red-50/50" : "border-slate-200"
                      }`}
                    />
                    {errors.state && <p className="text-red-500 text-[10px] font-medium">{errors.state}</p>}
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                    Special Notes <span className="text-slate-300">(Optional)</span>
                  </label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="Any special instructions for delivery..."
                    rows={2}
                    className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#0078BE]/30 focus:border-[#0078BE] transition"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-5">
                <h2 className="text-lg font-serif font-bold text-white flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-sky-400" /> Payment Method
                </h2>
                <p className="text-white/50 text-xs mt-1">Choose how you&apos;d like to pay</p>
              </div>

              <div className="p-6 space-y-3">
                {/* Pay Online */}
                <label
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "online"
                      ? "border-[#0078BE] bg-sky-50/50 shadow-sm shadow-sky-200/50"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === "online"}
                    onChange={() => setPaymentMethod("online")}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
                      paymentMethod === "online" ? "border-[#0078BE]" : "border-slate-300"
                    }`}
                  >
                    {paymentMethod === "online" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#0078BE]" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-[#0078BE]" />
                      <span className="font-bold text-slate-900 text-sm">Pay Online (Razorpay)</span>
                      <span className="bg-green-100 text-green-700 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase">Recommended</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">UPI, Credit/Debit Card, Net Banking, Wallets</p>
                  </div>
                  <Lock className="w-4 h-4 text-slate-300" />
                </label>

                {/* Cash on Delivery */}
                <label
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-amber-400 bg-amber-50/50 shadow-sm shadow-amber-200/50"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
                      paymentMethod === "cod" ? "border-amber-500" : "border-slate-300"
                    }`}
                  >
                    {paymentMethod === "cod" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-amber-600" />
                      <span className="font-bold text-slate-900 text-sm">Cash on Delivery</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Pay when your order arrives at your doorstep</p>
                  </div>
                </label>

                {/* WhatsApp Order */}
                <label
                  className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "whatsapp"
                      ? "border-green-400 bg-green-50/50 shadow-sm shadow-green-200/50"
                      : "border-slate-100 hover:border-slate-200"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="whatsapp"
                    checked={paymentMethod === "whatsapp"}
                    onChange={() => setPaymentMethod("whatsapp")}
                    className="sr-only"
                  />
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition ${
                      paymentMethod === "whatsapp" ? "border-green-500" : "border-slate-300"
                    }`}
                  >
                    {paymentMethod === "whatsapp" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-4 h-4 text-green-600" />
                      <span className="font-bold text-slate-900 text-sm">Order via WhatsApp</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Send your order directly on WhatsApp for instant confirmation</p>
                  </div>
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl font-extrabold text-sm uppercase tracking-widest transition-all shadow-xl cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                paymentMethod === "online"
                  ? "bg-gradient-to-r from-[#0078BE] to-[#0284c7] hover:from-[#005f99] hover:to-[#0274b3] text-white shadow-[#0078BE]/20"
                  : paymentMethod === "cod"
                  ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-amber-500/20"
                  : "bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-green-500/20"
              }`}
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> Processing...
                </>
              ) : paymentMethod === "online" ? (
                <>
                  <Lock className="w-4 h-4" /> Pay ₹{grandTotal} Securely
                </>
              ) : paymentMethod === "cod" ? (
                <>
                  <Banknote className="w-4 h-4" /> Place COD Order — ₹{grandTotal}
                </>
              ) : (
                <>
                  <WhatsAppIcon className="w-5 h-5" /> Confirm via WhatsApp — ₹{grandTotal}
                </>
              )}
            </button>

            {/* Security note */}
            <div className="flex items-center justify-center gap-3 text-[10px] text-slate-400 pb-6">
              <div className="flex items-center gap-1">
                <Shield className="w-3 h-3" /> 256-bit SSL Encrypted
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Lock className="w-3 h-3" /> RBI Compliant
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> PCI DSS Certified
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
