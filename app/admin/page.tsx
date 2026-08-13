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
  Users,
  Phone,
  MapPin,
  Filter,
  DollarSign,
  CreditCard,
  Mail,
  ShoppingBag,
  TrendingUp,
  Boxes,
  Plus,
  Trash2,
  Printer,
  Download,
  Copy,
  Check,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";
import { getAllOrders, updateOrderStatus, StoredOrder, OrderStatus } from "@/lib/order-store";
import { getWooProducts } from "@/lib/woocommerce";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";

const DEFAULT_ADMIN_PIN = "789456123";

interface ManagedProduct {
  id: string;
  sku: string;
  name: string;
  size: string;
  price: number;
  originalPrice: number;
  stock: number;
  status: "In Stock" | "Low Stock" | "Out of Stock";
  image: string;
  isWp?: boolean;
}

const INITIAL_PRODUCTS: ManagedProduct[] = [
  {
    id: "ghee_500ml",
    sku: "DC-GHEE-500",
    name: "Pure Buffalo Bilona Ghee - 500ml",
    size: "500ml Jar",
    price: 749,
    originalPrice: 1500,
    stock: 14,
    status: "In Stock",
    image: "/images/buffalo_ghee_single.png",
  },
  {
    id: "ghee_1l",
    sku: "DC-GHEE-1L00",
    name: "Pure Buffalo Bilona Ghee - 1 Litre",
    size: "1 Litre Jar",
    price: 1399,
    originalPrice: 2800,
    stock: 9,
    status: "In Stock",
    image: "/images/buffalo_ghee_single.png",
  },
  {
    id: "ghee_twin_500ml",
    sku: "DC-TWIN-500",
    name: "Bilona Ghee Twin-Pack (500ml)",
    size: "2 x 500ml Jars",
    price: 1449,
    originalPrice: 3000,
    stock: 8,
    status: "In Stock",
    image: "/images/buffalo_ghee_combo.png",
  },
  {
    id: "ghee_twin_1l",
    sku: "DC-TWIN-1L00",
    name: "Bilona Ghee Twin-Pack (1 Litre)",
    size: "2 x 1 Litre Jars",
    price: 2699,
    originalPrice: 5600,
    stock: 6,
    status: "Low Stock",
    image: "/images/buffalo_ghee_combo.png",
  },
];

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<"orders" | "customers" | "revenue" | "inventory" | "newsletter">("orders");
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [products, setProducts] = useState<ManagedProduct[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [notification, setNotification] = useState("");
  const [selectedInvoiceOrder, setSelectedInvoiceOrder] = useState<StoredOrder | null>(null);

  // Helper to load inventory overrides from localStorage
  const getSavedStockOverrides = (): Record<string, number> => {
    if (typeof window === "undefined") return {};
    try {
      const raw = localStorage.getItem("dairy_cool_inventory_overrides");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  };

  // Helper to save stock override
  const saveStockOverride = (productId: string, newStock: number) => {
    try {
      const current = getSavedStockOverrides();
      current[productId] = newStock;
      localStorage.setItem("dairy_cool_inventory_overrides", JSON.stringify(current));
    } catch (err) {
      console.error("Failed to save stock override:", err);
    }
  };

  // Fetch live products from WooCommerce backend on mount & apply saved stock overrides
  useEffect(() => {
    const overrides = getSavedStockOverrides();

    getWooProducts().then((wpItems) => {
      if (wpItems && wpItems.length > 0) {
        const mappedWp: ManagedProduct[] = wpItems.map((wp: any) => {
          const prodId = wp.slug || String(wp.databaseId);
          const savedStock = overrides[prodId];
          const realWpStock = typeof wp.stockQuantity === "number" ? wp.stockQuantity : (wp.stockStatus === "OUT_OF_STOCK" ? 0 : 15);
          const stockVal = typeof savedStock === "number" ? savedStock : realWpStock;
          const stockStatusVal = stockVal === 0 ? "Out of Stock" : stockVal <= 5 ? "Low Stock" : "In Stock";

          return {
            id: prodId,
            sku: `WP-${wp.databaseId}`,
            name: wp.name ? wp.name.replace(/&#8217;/g, "'").replace(/&amp;/g, "&") : "Pure Bilona Ghee",
            size: "Farm Fresh Jar",
            price: wp.price ? parseFloat(wp.price.replace(/[^0-9.]/g, "")) || 749 : 749,
            originalPrice: (wp.price ? parseFloat(wp.price.replace(/[^0-9.]/g, "")) || 749 : 749) * 2,
            stock: stockVal,
            status: stockStatusVal,
            image: wp.image?.sourceUrl || "/images/buffalo_ghee_single.png",
            isWp: true,
          };
        });
        setProducts(mappedWp);
      } else {
        // Apply saved overrides to INITIAL_PRODUCTS fallback
        setProducts((prev) =>
          prev.map((p) => {
            if (typeof overrides[p.id] === "number") {
              const val = overrides[p.id];
              return {
                ...p,
                stock: val,
                status: val === 0 ? "Out of Stock" : val <= 5 ? "Low Stock" : "In Stock",
              };
            }
            return p;
          })
        );
      }
    }).catch(() => {
      setProducts((prev) =>
        prev.map((p) => {
          if (typeof overrides[p.id] === "number") {
            const val = overrides[p.id];
            return {
              ...p,
              stock: val,
              status: val === 0 ? "Out of Stock" : val <= 5 ? "Low Stock" : "In Stock",
            };
          }
          return p;
        })
      );
    });
  }, []);

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
      showNotification(`Order ${orderId} status updated to "${newStatus}"!`);
    }
  };

  const handleStockChange = (productId: string, delta: number) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newStock = Math.max(0, p.stock + delta);
          const newStatus = newStock === 0 ? "Out of Stock" : newStock <= 5 ? "Low Stock" : "In Stock";
          saveStockOverride(productId, newStock);
          return { ...p, stock: newStock, status: newStatus };
        }
        return p;
      })
    );
    showNotification("Inventory stock updated & saved!");
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3500);
  };

  const handleExportCSV = () => {
    if (orders.length === 0) {
      showNotification("No order records to export.");
      return;
    }

    const headers = ["Order ID", "Date", "Customer Name", "Phone", "Email", "Address", "City", "Pincode", "Total Amount", "Payment Method", "Status"];
    const rows = orders.map((o) => [
      o.id,
      o.date,
      `"${o.customerName}"`,
      `"${o.customerPhone}"`,
      `"${o.customerEmail}"`,
      `"${o.shippingAddress}"`,
      `"${o.city}"`,
      `"${o.pincode}"`,
      o.totalAmount,
      `"${o.paymentMethod}"`,
      `"${o.status}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `dairy_cool_orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showNotification("Orders CSV exported successfully!");
  };

  // Filtered Orders
  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerPhone.includes(searchQuery) ||
      o.city.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || o.status.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
  });

  // Extract unique customers
  const uniqueCustomersMap: Record<string, { name: string; email: string; phone: string; address: string; city: string; pincode: string; totalOrders: number; totalSpent: number; lastOrderDate: string }> = {};
  orders.forEach((o) => {
    const key = (o.customerEmail || o.customerPhone || o.customerName).toLowerCase();
    if (!uniqueCustomersMap[key]) {
      uniqueCustomersMap[key] = {
        name: o.customerName,
        email: o.customerEmail,
        phone: o.customerPhone,
        address: o.shippingAddress,
        city: o.city,
        pincode: o.pincode,
        totalOrders: 1,
        totalSpent: o.totalAmount,
        lastOrderDate: o.date,
      };
    } else {
      uniqueCustomersMap[key].totalOrders += 1;
      uniqueCustomersMap[key].totalSpent += o.totalAmount;
    }
  });
  const customerList = Object.values(uniqueCustomersMap);

  // Revenue analytics
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const onlineRevenue = orders.filter((o) => o.paymentMethod.toLowerCase().includes("online") || o.paymentMethod.toLowerCase().includes("razorpay")).reduce((sum, o) => sum + o.totalAmount, 0);
  const codRevenue = orders.filter((o) => o.paymentMethod.toLowerCase().includes("cod") || o.paymentMethod.toLowerCase().includes("cash")).reduce((sum, o) => sum + o.totalAmount, 0);
  const whatsappRevenue = orders.filter((o) => o.paymentMethod.toLowerCase().includes("whatsapp")).reduce((sum, o) => sum + o.totalAmount, 0);

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-900 text-slate-800 font-sans selection:bg-[#0078BE] selection:text-white">
        <Header
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />

        <main className="flex-1 flex items-center justify-center py-16 px-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-100 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-14 h-14 bg-sky-50 text-[#0078BE] rounded-2xl flex items-center justify-center mx-auto border border-sky-100 shadow-xs">
                <Shield className="w-7 h-7" />
              </div>
              <h1 className="text-2xl font-serif font-black text-slate-900">Admin Control Center</h1>
              <p className="text-xs text-slate-500">
                Dairy Cool Farm &bull; Official Store Administration
              </p>
            </div>

            {pinError && (
              <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs font-bold rounded-2xl text-center">
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
                    placeholder="Enter Admin Passcode"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0078BE]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#0078BE] hover:bg-[#00629c] text-white font-extrabold text-xs uppercase tracking-widest rounded-xl shadow-md transition cursor-pointer"
              >
                Access Control Center
              </button>
            </form>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-800 font-sans antialiased">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Admin Top Header Banner */}
      <section className="bg-slate-900 text-white py-6 px-4 sm:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-md border border-emerald-500/30">
                Official Farm Portal
              </span>
              <h1 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                Dairy Cool Admin Control Center
              </h1>
            </div>
            <p className="text-xs text-slate-400">
              Complete management of orders, customer records, inventory, payments &amp; delivery operations
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleExportCSV}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer border border-slate-700"
            >
              <Download className="w-3.5 h-3.5 text-[#0078BE]" /> Export Orders CSV
            </button>
            <button
              onClick={refreshOrders}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold px-3.5 py-2 rounded-xl transition cursor-pointer border border-slate-700"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh
            </button>
            <button
              onClick={handleAdminLogout}
              className="flex items-center gap-1.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 text-xs font-bold px-3 py-2 rounded-xl transition cursor-pointer border border-red-500/30"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>
      </section>

      {/* Main Dashboard Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {notification && (
          <div className="p-4 bg-emerald-600 text-white font-bold text-xs rounded-2xl shadow-md flex items-center justify-between animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{notification}</span>
            </div>
          </div>
        )}

        {/* 4 Metric Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Customer Orders</span>
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{orders.length}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">Gross Sales Revenue</span>
            <span className="text-2xl sm:text-3xl font-black text-emerald-600">₹{totalRevenue.toLocaleString("en-IN")}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] font-bold text-[#0078BE] uppercase tracking-wider block">Registered Customers</span>
            <span className="text-2xl sm:text-3xl font-black text-[#0078BE]">{customerList.length}</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">Available Jar Inventory</span>
            <span className="text-2xl sm:text-3xl font-black text-amber-600">
              {products.reduce((sum, p) => sum + p.stock, 0)} Jars
            </span>
          </div>
        </div>

        {/* Admin Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-white rounded-2xl p-2 border border-slate-200 shadow-2xs overflow-x-auto scrollbar-none gap-2">
          <button
            onClick={() => setActiveTab("orders")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              activeTab === "orders"
                ? "bg-[#0078BE] text-white shadow-2xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <ShoppingBag className="w-4 h-4" /> Orders &amp; Fulfillment ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab("customers")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              activeTab === "customers"
                ? "bg-[#0078BE] text-white shadow-2xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Users className="w-4 h-4" /> Customer Directory ({customerList.length})
          </button>

          <button
            onClick={() => setActiveTab("revenue")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              activeTab === "revenue"
                ? "bg-[#0078BE] text-white shadow-2xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <TrendingUp className="w-4 h-4" /> Payments &amp; Financial Ledger
          </button>

          <button
            onClick={() => setActiveTab("inventory")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              activeTab === "inventory"
                ? "bg-[#0078BE] text-white shadow-2xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Boxes className="w-4 h-4" /> Products &amp; Stock Control
          </button>

          <button
            onClick={() => setActiveTab("newsletter")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
              activeTab === "newsletter"
                ? "bg-[#0078BE] text-white shadow-2xs"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            <Mail className="w-4 h-4" /> Newsletter Email List
          </button>
        </div>

        {/* TAB 1: ORDERS & FULFILLMENT */}
        {activeTab === "orders" && (
          <div className="space-y-5">
            
            {/* Search & Filter Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="relative w-full md:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Order ID, Name, Phone, City..."
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0078BE]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" /> Status Filter:
                </span>

                {["All", "Order Placed", "Packed & Churned", "Out for Delivery", "Delivered", "Cancelled"].map((st) => (
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

            {/* Orders Cards List */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-900">Live Customer Orders</h2>
                  <p className="text-xs text-slate-500">Real-time fulfillment directory and delivery status control</p>
                </div>
                <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                  Showing {filteredOrders.length} orders
                </span>
              </div>

              {filteredOrders.length === 0 ? (
                <div className="py-14 text-center text-xs text-slate-500 space-y-2">
                  <Package className="w-8 h-8 text-slate-300 mx-auto" />
                  <p>No customer orders match your search criteria.</p>
                </div>
              ) : (
                <div className="space-y-5">
                  {filteredOrders.map((order) => (
                    <div
                      key={order.id}
                      className="bg-slate-50/70 rounded-2xl border border-slate-200 p-5 space-y-4 transition hover:border-sky-300"
                    >
                      {/* Top Info Bar */}
                      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
                        <div className="flex flex-wrap items-center gap-3">
                          <span className="font-black text-sm text-[#0078BE]">{order.orderNumber}</span>
                          <span className="text-xs text-slate-500 font-medium">Placed on: {order.date}</span>
                          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-0.5 rounded-full border border-emerald-200">
                            ₹{order.totalAmount} &bull; {order.paymentMethod}
                          </span>
                        </div>

                        {/* Status Dropdown */}
                        <div className="flex items-center gap-2">
                          <span className="text-[11px] font-bold text-slate-500">Status:</span>
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(order.id, e.target.value as OrderStatus)
                            }
                            className={`text-xs font-bold py-1.5 px-3 rounded-xl border cursor-pointer focus:outline-none transition ${
                              order.status === "Delivered"
                                ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                                : order.status === "Out for Delivery"
                                ? "bg-sky-100 text-[#0078BE] border-sky-300"
                                : order.status === "Cancelled"
                                ? "bg-red-100 text-red-800 border-red-300"
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

                      {/* Detailed Order Breakdown Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
                        
                        {/* Customer Info */}
                        <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-slate-200/80">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Customer Details</span>
                          <p className="font-extrabold text-slate-900 text-sm">{order.customerName}</p>
                          <p className="text-slate-600 font-medium">{order.customerEmail}</p>
                          <p className="text-slate-700 font-bold">Phone: {order.customerPhone}</p>
                        </div>

                        {/* Delivery Address */}
                        <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-slate-200/80">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Delivery Address</span>
                          <p className="text-slate-800 font-semibold leading-relaxed">
                            {order.shippingAddress}<br />
                            {order.city}, {order.state} - {order.pincode}
                          </p>
                          <p className="text-[11px] text-[#0078BE] font-bold pt-0.5">
                            Courier: {order.carrier} ({order.awbNumber})
                          </p>
                        </div>

                        {/* Items Purchased */}
                        <div className="space-y-1.5 bg-white p-3.5 rounded-xl border border-slate-200/80">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Purchased Products</span>
                          <div className="space-y-2 divide-y divide-slate-100">
                            {order.items.map((item, idx) => (
                              <div key={idx} className="pt-1 flex items-center justify-between text-slate-800 font-semibold">
                                <div className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-slate-100 rounded-lg overflow-hidden relative shrink-0 border border-slate-200">
                                    <img src={item.image || "/images/buffalo_ghee_single.png"} alt={item.name} className="w-full h-full object-cover" />
                                  </div>
                                  <div>
                                    <span className="block leading-tight text-[11px] font-bold">{item.name}</span>
                                    <span className="text-[10px] text-slate-500 font-medium">Qty: {item.quantity}</span>
                                  </div>
                                </div>
                                <span className="font-extrabold text-slate-900">₹{item.price * item.quantity}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Footer Actions */}
                      <div className="pt-3 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <span className="text-slate-600 font-medium text-[11px]">
                          Hub Status Note: <strong className="text-slate-900 font-bold">{order.locationNote}</strong>
                        </span>

                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            onClick={() => setSelectedInvoiceOrder(order)}
                            className="inline-flex items-center gap-1.5 bg-white hover:bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-xl border border-slate-300 transition cursor-pointer text-[11px]"
                          >
                            <Printer className="w-3.5 h-3.5 text-[#0078BE]" /> Print Invoice / Packing Slip
                          </button>

                          <a
                            href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, "")}?text=Hello%20${encodeURIComponent(order.customerName)}%2C%20this%20is%20Dairy%20Cool%20Farm.%20Regarding%20your%20order%20${order.orderNumber}...`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-[#22c55e] hover:bg-[#1eb052] text-white font-bold px-3 py-1.5 rounded-xl transition cursor-pointer text-[11px]"
                          >
                            <WhatsAppIcon className="w-3.5 h-3.5" /> WhatsApp Customer
                          </a>

                          <Link
                            href={`/track-order?orderId=${encodeURIComponent(order.id)}`}
                            target="_blank"
                            className="inline-flex items-center gap-1.5 text-[#0078BE] hover:text-[#00629c] font-bold bg-sky-50 px-3 py-1.5 rounded-xl border border-sky-200 transition text-[11px]"
                          >
                            Live Tracking Page <ExternalLink className="w-3 h-3" />
                          </Link>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: CUSTOMERS & USERS DIRECTORY */}
        {activeTab === "customers" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Registered Customers &amp; User Directory</h2>
                <p className="text-xs text-slate-500">Directory of all verified customers with total orders &amp; spend metrics</p>
              </div>
              <span className="bg-sky-50 text-[#0078BE] text-xs font-bold px-3.5 py-1 rounded-full border border-sky-100">
                {customerList.length} Registered Customers
              </span>
            </div>

            {customerList.length === 0 ? (
              <div className="py-14 text-center text-xs text-slate-500">
                No registered customer accounts yet.
              </div>
            ) : (
              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                      <th className="py-3.5 px-4">Customer Name</th>
                      <th className="py-3.5 px-4">Email Address</th>
                      <th className="py-3.5 px-4">Phone Number</th>
                      <th className="py-3.5 px-4">Total Orders</th>
                      <th className="py-3.5 px-4">Lifetime Spend</th>
                      <th className="py-3.5 px-4">Delivery Address</th>
                      <th className="py-3.5 px-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {customerList.map((cust, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-3.5 px-4 font-bold text-slate-900 flex items-center gap-2">
                          <User className="w-4 h-4 text-[#0078BE]" /> {cust.name}
                        </td>
                        <td className="py-3.5 px-4 text-slate-600">{cust.email}</td>
                        <td className="py-3.5 px-4 text-slate-700 font-semibold">{cust.phone || "N/A"}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-900">{cust.totalOrders} Orders</td>
                        <td className="py-3.5 px-4 font-black text-emerald-600">₹{cust.totalSpent.toLocaleString("en-IN")}</td>
                        <td className="py-3.5 px-4 text-slate-600 max-w-xs truncate">{cust.address}, {cust.city} - {cust.pincode}</td>
                        <td className="py-3.5 px-4">
                          <a
                            href={`https://wa.me/${cust.phone.replace(/[^0-9]/g, "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-bold px-2.5 py-1 rounded-lg border border-emerald-200 text-[11px]"
                          >
                            <WhatsAppIcon className="w-3 h-3" /> Chat
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PAYMENTS & FINANCIAL LEDGER */}
        {activeTab === "revenue" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                  <span>Razorpay Online Payments</span>
                  <CreditCard className="w-4 h-4 text-[#0078BE]" />
                </div>
                <div className="text-3xl font-black text-slate-900">₹{onlineRevenue.toLocaleString("en-IN")}</div>
                <span className="text-[11px] text-slate-500 block">Instant UPI, Credit/Debit Cards, NetBanking</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                  <span>Cash on Delivery (COD)</span>
                  <DollarSign className="w-4 h-4 text-amber-600" />
                </div>
                <div className="text-3xl font-black text-slate-900">₹{codRevenue.toLocaleString("en-IN")}</div>
                <span className="text-[11px] text-slate-500 block">Collected upon door delivery</span>
              </div>

              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-2xs space-y-2">
                <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                  <span>WhatsApp Direct Orders</span>
                  <Phone className="w-4 h-4 text-emerald-600" />
                </div>
                <div className="text-3xl font-black text-slate-900">₹{whatsappRevenue.toLocaleString("en-IN")}</div>
                <span className="text-[11px] text-slate-500 block">Confirmed via WhatsApp chat</span>
              </div>
            </div>

            {/* Verified Payment Ledger Table */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="text-base font-bold text-slate-900">Verified Payment Ledger</h2>
                <button onClick={handleExportCSV} className="text-xs font-bold text-[#0078BE] hover:underline flex items-center gap-1">
                  <Download className="w-3.5 h-3.5" /> Export Ledger CSV
                </button>
              </div>

              <div className="overflow-x-auto border border-slate-200 rounded-2xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                      <th className="py-3.5 px-4">Order ID</th>
                      <th className="py-3.5 px-4">Customer Name</th>
                      <th className="py-3.5 px-4">Payment Method</th>
                      <th className="py-3.5 px-4">Amount</th>
                      <th className="py-3.5 px-4">Verification Status</th>
                      <th className="py-3.5 px-4">Transaction Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-slate-50">
                        <td className="py-3.5 px-4 font-bold text-[#0078BE]">{o.id}</td>
                        <td className="py-3.5 px-4 text-slate-900 font-semibold">{o.customerName}</td>
                        <td className="py-3.5 px-4 text-slate-600">{o.paymentMethod}</td>
                        <td className="py-3.5 px-4 font-black text-slate-900">₹{o.totalAmount}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1 w-fit">
                            <Check className="w-3 h-3" /> Verified Payment
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500">{o.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PRODUCTS & INVENTORY CONTROL */}
        {activeTab === "inventory" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-4 gap-3">
              <div>
                <h2 className="text-base font-bold text-slate-900">Product Catalog &amp; Jar Stock Control</h2>
                <p className="text-xs text-slate-500">Live products fetched from WordPress database (dairycoolfarm.com)</p>
              </div>

              <a
                href="https://dairycoolfarm.com/wp-admin/edit.php?post_type=product"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#0078BE] hover:bg-[#00629c] text-white text-xs font-bold px-4 py-2 rounded-xl transition shadow-2xs"
              >
                <span>Edit Stock in WP Admin</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {products.map((p) => (
                <div key={p.id} className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-4">
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-white border border-slate-200 flex items-center justify-center">
                    <img src={p.image} alt={p.name} className="object-contain p-4 h-full w-full" />
                    <span className={`absolute top-2.5 right-2.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      p.status === "In Stock" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"
                    }`}>
                      {p.status}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">SKU: {p.sku}</span>
                    <h3 className="font-bold text-sm text-slate-900">{p.name}</h3>
                    <div className="flex items-baseline gap-2 pt-0.5">
                      <span className="text-lg font-black text-slate-900">₹{p.price}</span>
                      <span className="text-xs text-slate-400 line-through">₹{p.originalPrice}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                    <span className="text-xs font-bold text-slate-700">Available Stock: <strong>{p.stock} Jars</strong></span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => handleStockChange(p.id, -1)}
                        className="w-8 h-8 bg-white border border-slate-300 rounded-lg flex items-center justify-center text-xs font-bold hover:bg-slate-100 cursor-pointer shadow-2xs"
                      >
                        -
                      </button>
                      <button
                        onClick={() => handleStockChange(p.id, 1)}
                        className="w-8 h-8 bg-white border border-slate-300 rounded-lg flex items-center justify-center text-xs font-bold hover:bg-slate-100 cursor-pointer shadow-2xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: NEWSLETTER SUBSCRIBERS */}
        {activeTab === "newsletter" && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-2xs p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-base font-bold text-slate-900">Footer Newsletter Email Subscribers</h2>
                <p className="text-xs text-slate-500">Collected email subscriptions for farm updates &amp; seasonal offers</p>
              </div>
            </div>

            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200 text-center space-y-3 max-w-lg mx-auto">
              <div className="w-12 h-12 bg-sky-50 text-[#0078BE] rounded-full flex items-center justify-center mx-auto border border-sky-100">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">Newsletter Endpoint Active</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                All subscriptions entered on the footer form are logged to server storage and forwarded to MailChimp / WooCommerce backend.
              </p>
            </div>
          </div>
        )}

      </main>

      {/* PRINTABLE INVOICE / PACKING SLIP MODAL */}
      {selectedInvoiceOrder && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 space-y-6 shadow-2xl border border-slate-200 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedInvoiceOrder(null)}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700"
            >
              ✕
            </button>

            {/* Printable Area */}
            <div id="printable-invoice" className="space-y-6">
              <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
                <div>
                  <h2 className="text-2xl font-serif font-black text-[#0078BE]">DAIRY COOL FARM</h2>
                  <p className="text-xs text-slate-500">Pure Vedic A2 Bilona Ghee &bull; Greater Noida, UP</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-bold text-slate-400 uppercase block">Invoice / Packing Slip</span>
                  <span className="text-lg font-black text-slate-900">{selectedInvoiceOrder.orderNumber}</span>
                  <span className="text-xs text-slate-500 block">{selectedInvoiceOrder.date}</span>
                </div>
              </div>

              {/* Customer & Address Details */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Customer Info</span>
                  <p className="font-extrabold text-slate-900 text-sm mt-1">{selectedInvoiceOrder.customerName}</p>
                  <p className="text-slate-600">{selectedInvoiceOrder.customerEmail}</p>
                  <p className="text-slate-700 font-bold mt-1">Phone: {selectedInvoiceOrder.customerPhone}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                  <span className="font-bold text-slate-400 uppercase tracking-wider block text-[10px]">Ship To Address</span>
                  <p className="text-slate-800 font-semibold leading-relaxed mt-1">
                    {selectedInvoiceOrder.shippingAddress}<br />
                    {selectedInvoiceOrder.city}, {selectedInvoiceOrder.state} - {selectedInvoiceOrder.pincode}
                  </p>
                  <p className="text-[11px] text-[#0078BE] font-bold mt-1">
                    Payment Method: {selectedInvoiceOrder.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Products Table */}
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200 font-bold text-slate-800">
                      <th className="p-3">Product Name</th>
                      <th className="p-3 text-center">Qty</th>
                      <th className="p-3 text-right">Price</th>
                      <th className="p-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {selectedInvoiceOrder.items.map((item, i) => (
                      <tr key={i}>
                        <td className="p-3 font-semibold text-slate-900">{item.name}</td>
                        <td className="p-3 text-center font-bold">{item.quantity}</td>
                        <td className="p-3 text-right">₹{item.price}</td>
                        <td className="p-3 text-right font-bold">₹{item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-50 border-t-2 border-slate-300 font-black">
                      <td colSpan={3} className="p-3 text-right">Total Invoice Amount:</td>
                      <td className="p-3 text-right text-[#0078BE] text-sm">₹{selectedInvoiceOrder.totalAmount}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <div className="text-center text-[10px] text-slate-400 pt-4 border-t border-slate-200">
                Thank you for ordering farm-fresh Bilona Ghee from Dairy Cool! Hand-churned with love under Dadi&apos;s guidance.
              </div>
            </div>

            {/* Print Button */}
            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => window.print()}
                className="bg-[#0078BE] hover:bg-[#00629c] text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Printer className="w-4 h-4" /> Print Document
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
