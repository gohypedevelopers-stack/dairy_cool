"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const items = [
  "🧈 Factory Ka Nahi, Dadi Ke Haathon Ka Asli Bilona Ghee",
  "🐄 100% Pure Bilona Ghee - Made from Farm Fresh Milk",
  "✨ No Preservatives, No Additives - Just Pure Goodness",
  "🌾 Farm Fresh Daily - From Our Farm to Your Kitchen",
  "🔬 FSSAI Certified & Lab Tested for Purity",
  "🏺 Small Batch Churning for Authentic Taste & Aroma"
];

export default function TopBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-sky-100 text-sky-900 text-[10px] sm:text-xs md:text-sm font-extrabold tracking-wider md:tracking-widest uppercase border-y border-sky-200/40 py-2 overflow-hidden flex justify-center items-center relative min-h-[48px] md:min-h-[42px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="absolute w-full px-3 sm:px-6 flex items-center justify-center text-center leading-snug"
        >
          <span>{items[currentIndex]}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
