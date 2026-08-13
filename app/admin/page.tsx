"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Lock,
  Search,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  Shield,
  LogOut,
  ExternalLink,
  RefreshCw,
  User,
  Phone,
  MapPin,
  Filter,
} from "lucide-react";
import { getAllOrders, updateOrderStatus, StoredOrder, OrderStatus } from "@/lib/order-store";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";

const DEFAULT_ADMIN_PIN = "789456123";

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [notification, setNotification] = useState("");

  // Load orders on mount
  useEffect(() => {
    const savedAuth = localStorage.getItem("dairy_cool_admin_auth");
    if (savedAuth === "true") {
      setIsAuthenticated(true);
    }
    refreshOrders();
  }, []);

  const refreshOrders = () => {
    setOrders(getAllOrders());
  };

  // Sync state when orders update
  useEffect(() => {
    const handleStorageChange = () => {
      refreshOrders();
    };
    window.addEventListener("dairycool_orders_updated", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("dairycool_orders_updated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setPinError("");

    if (pinInput.trim() === DEFAULT_ADMIN_PIN) {
      setIsAuthenticated(true);
      localStorage.setItem("dairy_cool_admin_auth", "true");
    } else {
      setPinError("Incorrect Admin Passcode. Please try again.");
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("dairy_cool_admin_auth");
  };

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    const updated = updateOrderStatus(orderId, newStatus);
    if (updated) {
      refreshOrders();
      showNotification(`Order ${orderId} status changed to "${newStatus}"!`);
    }
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3500);
  };

  // Filter orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery);

    const matchesStatus =
      statusFilter === "All" || o.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Render Admin PIN Login if unauthenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900 text-slate-800 selection:bg-[#0078BE] selection:text-white">
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <main className="flex-1 flex items-center justify-center py-16 px-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-white/20 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-sky-50 text-[#0078BE] rounded-2xl flex items-center justify-center mx-auto border border-sky-100">
                <Shield className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-black text-slate-900">Admin Control Panel</h1>
              <p className="text-xs text-slate-500">
                Enter Admin Passcode to manage live customer orders & delivery status
              </p>
            </div>

            {pinError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl text-center">
                {pinError}
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Admin Passcode
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    required
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Enter Passcode (789456123)"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0078BE]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#0078BE] hover:bg-[#00629c] text-white font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-md transition cursor-pointer"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800 font-sans">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Admin Header Banner */}
      <section className="bg-slate-900 text-white py-8 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-emerald-400" />
              <h1 className="text-2xl font-black tracking-tight text-white">Order Management Dashboard</h1>
            </div>
            <p className="text-xs text-slate-400">
              Manage live customer orders, update delivery status, & track shipments
            </p>
          </div>

          <button
            onClick={handleAdminLogout}
            className="flex items-center gap-2 bg-white/10 hover:bg-red-500/20 text-white text-xs font-bold px-4 py-2 rounded-xl transition cursor-pointer border border-white/10"
          >
            <LogOut className="w-4 h-4" /> Sign Out Admin
          </button>
        </div>
      </section>

      {/* Main Admin Dashboard */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {notification && (
          <div className="p-4 bg-emerald-500 text-white font-bold text-xs rounded-2xl shadow-lg flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{notification}</span>
            </div>
          </div>
        )}

        {/* Quick Metrics Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Orders</span>
            <span className="text-2xl font-black text-slate-900">{orders.length}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider block">Out For Delivery</span>
            <span className="text-2xl font-black text-[#0078BE]">
              {orders.filter((o) => o.status === "Out for Delivery").length}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">Processing / Packed</span>
            <span className="text-2xl font-black text-amber-600">
              {orders.filter((o) => o.status === "Order Placed" || o.status === "Packed & Churned").length}
            </span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">Delivered</span>
            <span className="text-2xl font-black text-emerald-600">
              {orders.filter((o) => o.status === "Delivered").length}
            </span>
          </div>
        </div>

        {/* Filter & Search Control Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by Order ID, Name, Phone..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0078BE]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>

            {["All", "Order Placed", "Packed & Churned", "Out for Delivery", "Delivered"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer border ${
                  statusFilter === st
                    ? "bg-[#0078BE] text-white border-[#0078BE]"
                    : "bg-slate-50 text-slate-600 hover:bg-slate-100 border-slate-200"
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Orders List Table */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden space-y-4 p-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h2 className="text-lg font-black text-slate-900">Live Customer Orders</h2>
            <button
              onClick={refreshOrders}
              className="text-xs font-bold text-[#0078BE] hover:underline flex items-center gap-1"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh List
            </button>
          </div>

          {filteredOrders.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500">
              No orders matched your search/filter criteria.
            </div>
          ) : (
            <div className="space-y-4">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-slate-50/60 rounded-2xl border border-slate-200/90 p-5 space-y-4 transition hover:border-sky-300"
                >
                  {/* Order Card Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/60 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-black text-sm text-[#0078BE]">{order.orderNumber}</span>
                      <span className="text-xs text-slate-500 font-medium">Date: {order.date}</span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
                        ₹{order.totalAmount} ({order.paymentMethod})
                      </span>
                    </div>

                    {/* Status Changer Dropdown */}
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-slate-500">Update Status:</span>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value as OrderStatus)
                        }
                        className={`text-xs font-black py-1.5 px-3 rounded-xl border cursor-pointer focus:outline-none transition ${
                          order.status === "Delivered"
                            ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                            : order.status === "Out for Delivery"
                            ? "bg-sky-100 text-[#0078BE] border-sky-300"
                            : "bg-amber-100 text-amber-800 border-amber-300"
                        }`}
                      >
                        <option value="Order Placed">Order Placed</option>
                        <option value="Packed & Churned">Packed & Churned</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Customer & Items Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Customer Details</span>
                      <p className="font-extrabold text-slate-900">{order.customerName}</p>
                      <p className="text-slate-600 font-medium">{order.customerEmail} | Phone: {order.customerPhone}</p>
                      <p className="text-slate-600 font-medium leading-relaxed pt-0.5">
                        Address: {order.shippingAddress}, {order.city} - {order.pincode}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Items Purchased</span>
                      <div className="space-y-1">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-slate-800 font-semibold">
                            <span>{item.name} (x{item.quantity})</span>
                            <span>₹{item.price * item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Footer Tracking Link */}
                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium text-[11px]">
                      Hub Note: <strong className="text-slate-800">{order.locationNote}</strong>
                    </span>

                    <Link
                      href={`/track-order?orderId=${order.id}`}
                      target="_blank"
                      className="text-[#0078BE] font-bold hover:underline flex items-center gap-1 text-[11px]"
                    >
                      View Live Customer Tracking Page <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>

      </main>

      <Footer />
    </div>
  );
}
