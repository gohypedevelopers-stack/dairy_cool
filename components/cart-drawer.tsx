"use client";

import React from "react";
import Image from "next/image";
import { X, ShoppingBag, Plus, Minus, Trash2 } from "lucide-react";
import { WhatsAppIcon } from "./icons";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: string;
  image: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, newQty: number) => void;
  onRemoveItem: (id: string) => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: CartDrawerProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;
    
    let message = "Hello Dairy Cool! I want to order:\n\n";
    items.forEach((item) => {
      message += `🥛 *${item.name}* (${item.size}) - Qty: ${item.quantity} - Price: ₹${item.price * item.quantity}\n`;
    });
    message += `\n*Total Amount:* ₹${subtotal}\n`;
    message += "Please confirm my order.";

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/9716003060?text=${encodedMessage}`, "_blank");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
        <div className="pointer-events-auto w-screen max-w-md transform bg-white dark:bg-zinc-900 shadow-2xl transition-all duration-300 ease-in-out border-l border-zinc-200/50 dark:border-zinc-800/50 flex flex-col h-full">
          {/* Header */}
          <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-sky-500" />
              <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Your Shopping Cart</h2>
              {items.length > 0 && (
                <span className="bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400 text-xs font-bold px-2 py-0.5 rounded-full">
                  {items.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-zinc-400 hover:text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                <div className="w-16 h-16 bg-sky-50 dark:bg-sky-950/30 rounded-full flex items-center justify-center text-sky-500">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-medium text-zinc-900 dark:text-white">Cart is empty</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                    Add our pure Bilona Ghee to experience dadi ke haathon ka pyaar.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-sky-500 hover:bg-sky-600 text-white rounded-full font-medium text-sm transition shadow-sm shadow-sky-500/10"
                >
                  Shop Ghee Now
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800 last:border-b-0 last:pb-0"
                >
                  <div className="w-20 h-20 bg-zinc-50 dark:bg-zinc-800 rounded-lg flex-shrink-0 relative overflow-hidden flex items-center justify-center">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-zinc-900 dark:text-white text-sm line-clamp-1">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-zinc-400 hover:text-red-500 transition p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">Size: {item.size}</p>
                    </div>
                    
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center border border-zinc-200 dark:border-zinc-700 rounded-lg bg-zinc-50 dark:bg-zinc-800">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="px-2 py-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 disabled:opacity-30 transition"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-sm font-semibold text-zinc-850 dark:text-zinc-100">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-1 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200 transition"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="font-bold text-zinc-900 dark:text-white">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="border-t border-zinc-100 dark:border-zinc-800 px-6 py-6 bg-zinc-50/50 dark:bg-zinc-900/50 space-y-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-zinc-500 dark:text-zinc-400">
                  <span>Pan-India Delivery</span>
                  <span className="text-green-600 font-medium">FREE</span>
                </div>
                <div className="flex justify-between text-base font-bold text-zinc-900 dark:text-white pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60">
                  <span>Grand Total</span>
                  <span>₹{subtotal}</span>
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 active:scale-[0.98] transition-all text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-green-500/10 text-sm"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Order via WhatsApp (Instant)
                </button>
                <button
                  onClick={() => alert("Checkout flow is simulated! You can checkout using the green WhatsApp button above to contact the store directly.")}
                  className="w-full bg-sky-500 hover:bg-sky-600 active:scale-[0.98] transition-all text-white font-semibold py-3 px-4 rounded-xl text-sm shadow-lg shadow-sky-500/10"
                >
                  Pay Online (Official Store)
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
