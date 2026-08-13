"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  User,
  Package,
  MapPin,
  LogOut,
  ShoppingBag,
  Clock,
  CheckCircle2,
  Truck,
  ArrowRight,
  Edit2,
  Save,
  Phone,
  Mail,
  Shield,
  PlusCircle,
  Copy,
  Check,
} from "lucide-react";
import { useAuth, OrderRecord } from "@/lib/auth-context";
import { useCart } from "@/components/cart-provider";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";

type ProfileTab = "orders" | "address" | "account" | "subscriptions";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading, orders, logout, updateProfile, addOrderRecord } = useAuth();
  const { addToCart, setIsCartOpen } = useCart();

  const [activeTab, setActiveTab] = useState<ProfileTab>("orders");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [notification, setNotification] = useState("");
  const [copied, setCopied] = useState(false);

  const [addressForm, setAddressForm] = useState({
    address: user?.address || "",
    city: user?.city || "",
    pincode: user?.pincode || "",
    state: user?.state || "",
  });

  const [accountForm, setAccountForm] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  useEffect(() => {
    if (user) {
      setAddressForm({
        address: user.address || "",
        city: user.city || "",
        pincode: user.pincode || "",
        state: user.state || "",
      });
      setAccountForm({
        name: user.name || "",
        phone: user.phone || "",
        email: user.email || "",
      });
    }
  }, [user]);

  // Protect route
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-slate-800">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0078BE]"></div>
          <span className="text-xs font-semibold text-slate-500">Loading your profile...</span>
        </div>
      </div>
    );
  }

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(addressForm);
    setIsEditingAddress(false);
    showNotification("Address saved successfully");
  };

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(accountForm);
    setIsEditingAccount(false);
    showNotification("Profile details updated");
  };

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const handleReorder = (order: OrderRecord) => {
    order.items.forEach((item) => {
      const priceNum = typeof item.price === "number" ? item.price : parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0;
      addToCart(
        item.id,
        item.name,
        item.image || "/images/bilona-ghee.jpeg",
        "Standard",
        priceNum,
        item.quantity || 1
      );
    });
    setIsCartOpen(true);
  };

  const copyAddress = () => {
    const full = `${user.address || ""}, ${user.city || ""} - ${user.pincode || ""}, ${user.state || ""}`;
    navigator.clipboard.writeText(full);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50 text-slate-800 font-sans">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Page Header */}
      <section className="bg-white border-b border-slate-200/80 py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl font-serif font-black text-[#0078BE]">My Account</h1>
            <p className="text-sm text-slate-600">
              Welcome back, <strong className="text-slate-800 font-semibold">{user.name}</strong>!
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
              <span className="flex items-center gap-1"><Mail className="w-3.5 h-3.5 text-[#0078BE]" /> {user.email}</span>
              {user.phone && <span className="flex items-center gap-1"><Phone className="w-3.5 h-3.5 text-slate-400" /> {user.phone}</span>}
            </div>
          </div>

          <button
            onClick={() => {
              logout();
              router.push("/");
            }}
            className="inline-flex items-center gap-2 border border-slate-200 hover:border-red-200 hover:bg-red-50 text-slate-600 hover:text-red-600 text-xs font-semibold px-4 py-2 rounded-xl transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8">
        
        {notification && (
          <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{notification}</span>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-slate-200 overflow-x-auto no-scrollbar gap-2 sm:gap-6 mb-8">
          <button
            onClick={() => setActiveTab("orders")}
            className={`pb-3 text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer border-b-2 ${
              activeTab === "orders"
                ? "border-[#0078BE] text-[#0078BE]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            My Orders ({orders.length})
          </button>

          <button
            onClick={() => setActiveTab("address")}
            className={`pb-3 text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer border-b-2 ${
              activeTab === "address"
                ? "border-[#0078BE] text-[#0078BE]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Saved Address
          </button>

          <button
            onClick={() => setActiveTab("account")}
            className={`pb-3 text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer border-b-2 ${
              activeTab === "account"
                ? "border-[#0078BE] text-[#0078BE]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Account Details
          </button>

          <button
            onClick={() => setActiveTab("subscriptions")}
            className={`pb-3 text-xs sm:text-sm font-bold whitespace-nowrap transition cursor-pointer border-b-2 ${
              activeTab === "subscriptions"
                ? "border-[#0078BE] text-[#0078BE]"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            Milk Subscriptions
          </button>
        </div>

        {/* Tab 1: Orders */}
        {activeTab === "orders" && (
          <div className="space-y-6">
            {orders.length === 0 ? (
              <div className="bg-white rounded-2xl p-10 text-center border border-slate-200 shadow-sm space-y-4">
                <div className="w-14 h-14 bg-sky-50 text-[#0078BE] rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-slate-800">No Orders Placed Yet</h3>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    When you order fresh A2 Bilona Ghee or Desi Cow products, your order details will appear here.
                  </p>
                </div>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 bg-[#0078BE] hover:bg-[#00629c] text-white font-semibold px-6 py-2.5 rounded-xl text-xs transition"
                >
                  <span>Explore Shop</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
                  >
                    {/* Header */}
                    <div className="bg-slate-50 px-6 py-4 border-b border-slate-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-6">
                        <div>
                          <span className="text-slate-400 text-[11px] block font-medium">ORDER NO.</span>
                          <span className="font-bold text-slate-800">{order.orderNumber}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[11px] block font-medium">DATE</span>
                          <span className="font-medium text-slate-700">{order.date}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 text-[11px] block font-medium">TOTAL</span>
                          <span className="font-bold text-[#0078BE]">₹{order.total}</span>
                        </div>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-[11px] font-bold ${
                          order.status === "Delivered"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : order.status === "Processing"
                            ? "bg-sky-50 text-[#0078BE] border border-sky-200"
                            : "bg-amber-50 text-amber-700 border border-amber-200"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

                    {/* Items */}
                    <div className="p-6 space-y-4">
                      <div className="divide-y divide-slate-100">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="py-3 flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden relative shrink-0 border border-slate-200">
                                <img
                                  src={item.image || "/images/bilona-ghee.jpeg"}
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-semibold text-xs text-slate-800">{item.name}</h4>
                                <p className="text-[11px] text-slate-500">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <span className="font-bold text-xs text-slate-700">₹{item.price}</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <span className="text-slate-500">
                          Payment Method: <strong className="text-slate-700 font-semibold">{order.paymentMethod}</strong>
                        </span>

                        <div className="flex items-center gap-3">
                          <Link
                            href={`/track-order?orderId=${encodeURIComponent(order.orderNumber || order.id)}`}
                            className="inline-flex items-center gap-1.5 text-[#0078BE] hover:text-[#00629c] bg-sky-50 hover:bg-sky-100 px-4 py-2 rounded-xl text-xs font-bold transition border border-sky-200"
                          >
                            <Truck className="w-3.5 h-3.5" /> Track Package
                          </Link>

                          <button
                            onClick={() => handleReorder(order)}
                            className="inline-flex items-center gap-1.5 bg-[#0078BE] hover:bg-[#00629c] text-white px-4 py-2 rounded-xl text-xs font-semibold transition cursor-pointer"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" /> Reorder
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Saved Address */}
        {activeTab === "address" && (
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Saved Shipping Address</h2>
                <p className="text-xs text-slate-500">Auto-filled automatically during checkout</p>
              </div>
              {!isEditingAddress && (
                <button
                  onClick={() => setIsEditingAddress(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#0078BE] hover:bg-sky-50 px-3.5 py-1.5 rounded-lg border border-sky-200 transition"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit Address
                </button>
              )}
            </div>

            {isEditingAddress ? (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <form onSubmit={handleSaveAddress} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Street Address / House No.
                    </label>
                    <input
                      type="text"
                      required
                      value={addressForm.address}
                      onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                      placeholder="House No, Street, Landmark"
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0078BE]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0078BE]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Pincode</label>
                      <input
                        type="text"
                        required
                        value={addressForm.pincode}
                        onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0078BE]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">State</label>
                      <input
                        type="text"
                        required
                        value={addressForm.state}
                        onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0078BE]"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="bg-[#0078BE] hover:bg-[#00629c] text-white px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition shadow-sm"
                    >
                      <Save className="w-4 h-4" /> Save Address
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingAddress(false)}
                      className="bg-slate-100 text-slate-700 px-5 py-2 rounded-xl text-xs font-semibold hover:bg-slate-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-slate-100">
                  <span className="font-bold text-[#0078BE] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" /> Primary Delivery Address
                  </span>
                  {user.address && (
                    <button
                      onClick={copyAddress}
                      className="text-xs font-semibold text-slate-500 hover:text-[#0078BE] flex items-center gap-1"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied to Clipboard" : "Copy Address"}</span>
                    </button>
                  )}
                </div>

                {user.address ? (
                  <div className="space-y-1">
                    <p className="text-base font-bold text-slate-800">
                      {user.name}
                    </p>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {user.address}<br />
                      {user.city && `${user.city}, `}{user.state} - {user.pincode}
                    </p>
                    {user.phone && (
                      <p className="text-xs text-slate-500 pt-1 font-medium">
                        Phone: {user.phone}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-slate-500 italic py-2">
                    No address saved yet. Click "Edit Address" above to enter your primary delivery address.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Account Details */}
        {activeTab === "account" && (
          <div className="space-y-4 max-w-3xl">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Account Details</h2>
                <p className="text-xs text-slate-500">Your personal profile and contact information</p>
              </div>
              {!isEditingAccount && (
                <button
                  onClick={() => setIsEditingAccount(true)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#0078BE] hover:bg-sky-50 px-3.5 py-1.5 rounded-lg border border-sky-200 transition"
                >
                  <Edit2 className="w-3.5 h-3.5" /> Edit Profile
                </button>
              )}
            </div>

            {isEditingAccount ? (
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                <form onSubmit={handleSaveAccount} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      required
                      value={accountForm.name}
                      onChange={(e) => setAccountForm({ ...accountForm, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0078BE]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Mobile Phone</label>
                    <input
                      type="tel"
                      value={accountForm.phone}
                      onChange={(e) => setAccountForm({ ...accountForm, phone: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0078BE]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={accountForm.email}
                      onChange={(e) => setAccountForm({ ...accountForm, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-normal text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0078BE]"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="submit"
                      className="bg-[#0078BE] hover:bg-[#00629c] text-white px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer transition shadow-sm"
                    >
                      <Save className="w-4 h-4" /> Save Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditingAccount(false)}
                      className="bg-slate-100 text-slate-700 px-5 py-2 rounded-xl text-xs font-semibold hover:bg-slate-200 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Full Name</span>
                  <p className="text-base font-bold text-slate-800">{user.name}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Email Address</span>
                  <p className="text-base font-bold text-slate-800">{user.email}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Mobile Phone</span>
                  <p className="text-base font-bold text-slate-800">{user.phone || "Not set"}</p>
                </div>
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Account Status</span>
                  <p className="text-sm font-semibold text-emerald-700 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Active Customer
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Milk Subscriptions */}
        {activeTab === "subscriptions" && (
          <div className="space-y-4 max-w-3xl">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Fresh Milk Subscriptions</h2>
              <p className="text-xs text-slate-500">Daily morning A2 Desi Cow Milk delivery schedule</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
                <div>
                  <h4 className="font-bold text-base text-slate-800">A2 Desi Cow Milk (1 Litre / Day)</h4>
                  <p className="text-xs text-slate-500">Doorstep Delivery Time: 6:00 AM - 7:30 AM</p>
                </div>
                <span className="bg-emerald-50 text-emerald-700 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
                  Active Delivery
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs pt-1">
                <span className="text-slate-600">Monthly Plan Cost: <strong className="text-slate-800 font-bold">₹2,400 / month</strong></span>
                <a
                  href="https://wa.me/9716003060?text=Hello%20DairyCool%2C%20I%20want%20to%20manage%20my%20milk%20subscription"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0078BE] font-semibold hover:underline"
                >
                  Pause or Change Schedule via WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
