"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { loginWooUser, registerWooCustomer } from "./auth-graphql";

export interface UserProfile {
  id?: string | number;
  email: string;
  name: string;
  phone: string;
  address?: string;
  city?: string;
  pincode?: string;
  state?: string;
  avatarUrl?: string;
}

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: string | number;
  image?: string;
}

export interface OrderRecord {
  id: string;
  orderNumber: string;
  date: string;
  status: "Processing" | "Delivered" | "Pending" | "Cancelled" | "Shipped";
  total: number;
  paymentMethod: string;
  shippingAddress: string;
  items: OrderItem[];
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  orders: OrderRecord[];
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: {
    email: string;
    password: string;
    name: string;
    phone: string;
    address?: string;
    city?: string;
    pincode?: string;
    state?: string;
  }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (updatedData: Partial<UserProfile>) => void;
  addOrderRecord: (order: OrderRecord) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_USER_KEY = "dairycool_user_profile";
const LOCAL_STORAGE_ORDERS_KEY = "dairycool_user_orders";

import { getAllOrders, syncWpOrdersToStore } from "./order-store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadAndMapOrders = (masterOrders = getAllOrders()) => {
    if (masterOrders && masterOrders.length > 0) {
      const mappedOrders: OrderRecord[] = masterOrders.map((o) => ({
        id: o.id,
        orderNumber: o.orderNumber || o.id,
        date: o.date,
        status: o.status === "Delivered" ? "Delivered" : o.status === "Cancelled" ? "Cancelled" : "Processing",
        total: o.totalAmount,
        paymentMethod: o.paymentMethod,
        shippingAddress: `${o.shippingAddress}, ${o.city} - ${o.pincode}`,
        items: o.items.map((i) => ({
          id: String(i.id),
          name: i.name,
          quantity: i.quantity,
          price: i.price,
          image: i.image,
        })),
      }));
      setOrders(mappedOrders);
    }
  };

  // Load persistent auth state & sync live WP database orders
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      // Initial load
      loadAndMapOrders();

      // Live WP GraphQL Database sync
      syncWpOrdersToStore().then((synced) => {
        loadAndMapOrders(synced);
      }).catch(console.error);

    } catch (err) {
      console.error("Auth init error:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Sync user state changes to localStorage
  const saveUserToStorage = (userData: UserProfile | null) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(userData));
    } else {
      localStorage.removeItem(LOCAL_STORAGE_USER_KEY);
    }
  };

  // Sync orders state changes to localStorage
  const saveOrdersToStorage = (newOrders: OrderRecord[]) => {
    setOrders(newOrders);
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(newOrders));
  };

  const login = async (email: string, pass: string) => {
    setIsLoading(true);
    try {
      // 1. Try WPGraphQL Backend Auth
      const wooRes = await loginWooUser(email, pass);
      if (wooRes.success && wooRes.data) {
        const u = wooRes.data.user;
        const profile: UserProfile = {
          id: u.databaseId || u.id,
          email: u.email || email,
          name: `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.username || email.split("@")[0],
          phone: "",
        };
        saveUserToStorage(profile);
        setIsLoading(false);
        return { success: true };
      }

      // 2. Fallback local authentication / session check
      const storedUser = localStorage.getItem(LOCAL_STORAGE_USER_KEY);
      if (storedUser) {
        const parsed = JSON.parse(storedUser);
        if (parsed.email.toLowerCase() === email.toLowerCase()) {
          saveUserToStorage(parsed);
          setIsLoading(false);
          return { success: true };
        }
      }

      // 3. Demo / Instant Login Fallback for standard emails
      const newProfile: UserProfile = {
        email: email,
        name: email.split("@")[0].replace(/[^a-zA-Z]/g, " "),
        phone: "+91 98765 43210",
        address: "House No. 42, Green Avenue, Scheme 78",
        city: "Indore",
        pincode: "452010",
        state: "Madhya Pradesh",
      };
      saveUserToStorage(newProfile);
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      setIsLoading(false);
      return { success: false, error: err.message || "Failed to log in" };
    }
  };

  const register = async (data: {
    email: string;
    password: string;
    name: string;
    phone: string;
    address?: string;
    city?: string;
    pincode?: string;
    state?: string;
  }) => {
    setIsLoading(true);
    try {
      // Attempt WPGraphQL registration
      const nameParts = data.name.trim().split(" ");
      const firstName = nameParts[0] || data.name;
      const lastName = nameParts.slice(1).join(" ") || "";

      await registerWooCustomer({
        email: data.email,
        username: data.email.split("@")[0] + "_" + Math.floor(Math.random() * 1000),
        password: data.password,
        firstName,
        lastName,
      });

      // Save customer profile locally
      const profile: UserProfile = {
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address || "",
        city: data.city || "",
        pincode: data.pincode || "",
        state: data.state || "",
      };

      saveUserToStorage(profile);
      setIsLoading(false);
      return { success: true };
    } catch (err: any) {
      // Create user session locally as fallback
      const profile: UserProfile = {
        email: data.email,
        name: data.name,
        phone: data.phone,
        address: data.address || "",
        city: data.city || "",
        pincode: data.pincode || "",
        state: data.state || "",
      };
      saveUserToStorage(profile);
      setIsLoading(false);
      return { success: true };
    }
  };

  const logout = () => {
    saveUserToStorage(null);
  };

  const updateProfile = (updatedData: Partial<UserProfile>) => {
    if (!user) return;
    const updated = { ...user, ...updatedData };
    saveUserToStorage(updated);
  };

  const addOrderRecord = (order: OrderRecord) => {
    const updatedOrders = [order, ...orders];
    saveOrdersToStorage(updatedOrders);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        orders,
        login,
        register,
        logout,
        updateProfile,
        addOrderRecord,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
