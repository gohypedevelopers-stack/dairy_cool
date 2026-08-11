"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Play, Image as ImageIcon, Film, X, ChevronLeft, ChevronRight, Maximize2, RotateCw } from "lucide-react";

// Image list from public/gallery/Images
const imageFiles = [
  "DSC_5107.JPG", "DSC_5108.JPG", "DSC_5109.JPG", "DSC_5119.JPG", "DSC_5120.JPG",
  "DSC_5139.JPG", "DSC_5168.JPG", "DSC_5208.JPG", "DSC_5231.JPG", "DSC_5270.JPG",
  "DSC_5272.JPG", "DSC_5274.JPG", "DSC_5283.JPG", "DSC_5287.JPG", "DSC_5289.JPG",
  "DSC_5378.JPG", "DSC_5380.JPG", "DSC_5381.JPG", "DSC_5403.JPG", "DSC_5404.JPG",
  "DSC_5405.JPG", "DSC_5447.JPG", "DSC_5448.JPG", "DSC_5458.JPG", "DSC_5459.JPG",
  "DSC_5460.JPG", "DSC_5469.JPG", "DSC_5491.JPG", "DSC_5499.JPG", "DSC_5500.JPG",
];

// Video list from public/gallery/Video
const videoFiles = [
  "DSC_5135.MOV", "DSC_5184.MOV", "DSC_5185.MOV", "DSC_5196.MOV", "DSC_5203.MOV",
  "DSC_5205.MOV", "DSC_5206.MOV", "DSC_5252.MOV", "DSC_5255.MOV", "DSC_5263.MOV",
  "DSC_5312.MOV", "DSC_5449.MOV", "DSC_5488.MOV",
];

type MediaItem = {
  id: string;
  type: "image" | "video";
  src: string;
  title: string;
};

export default function GalleryGrid() {
  const [activeTab, setActiveTab] = useState<"all" | "images" | "videos">("all");
  const [selectedItemIndex, setSelectedItemIndex] = useState<number | null>(null);
  const [rotationDegree, setRotationDegree] = useState<number>(90); // 90 deg clockwise

  // Combine into single items list
  const allItems: MediaItem[] = [
    ...imageFiles.map((file, idx) => ({
      id: `img-${idx}`,
      type: "image" as const,
      src: `/Gallery/Images/${file}`,
      title: `Dairy Cool Photo ${idx + 1}`,
    })),
    ...videoFiles.map((file, idx) => ({
      id: `vid-${idx}`,
      type: "video" as const,
      src: `/Gallery/Video/${file}`,
      title: `Dairy Cool Video Clip ${idx + 1}`,
    })),
  ];

  const filteredItems = allItems.filter((item) => {
    if (activeTab === "images") return item.type === "image";
    if (activeTab === "videos") return item.type === "video";
    return true;
  });

  const selectedItem = selectedItemIndex !== null ? filteredItems[selectedItemIndex] : null;

  const handlePrev = () => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = () => {
    if (selectedItemIndex !== null) {
      setSelectedItemIndex((selectedItemIndex + 1) % filteredItems.length);
    }
  };

  const handleRotate = () => {
    setRotationDegree((prev) => (prev + 90) % 360);
  };

  return (
    <div className="space-y-8">
      {/* Category Tabs */}
      <div className="flex justify-center items-center gap-2 sm:gap-4 border-b border-amber-900/10 pb-4">
        <button
          onClick={() => { setActiveTab("all"); setSelectedItemIndex(null); }}
          className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
            activeTab === "all"
              ? "bg-[#0078BE] text-white shadow-md shadow-sky-900/20"
              : "bg-white text-stone-600 hover:bg-amber-50/80 border border-stone-200"
          }`}
        >
          <span>All Media</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === "all" ? "bg-white/20 text-white" : "bg-stone-100 text-stone-600"}`}>
            {allItems.length}
          </span>
        </button>

        <button
          onClick={() => { setActiveTab("images"); setSelectedItemIndex(null); }}
          className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
            activeTab === "images"
              ? "bg-[#0078BE] text-white shadow-md shadow-sky-900/20"
              : "bg-white text-stone-600 hover:bg-amber-50/80 border border-stone-200"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Photos</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === "images" ? "bg-white/20 text-white" : "bg-stone-100 text-stone-600"}`}>
            {imageFiles.length}
          </span>
        </button>

        <button
          onClick={() => { setActiveTab("videos"); setSelectedItemIndex(null); }}
          className={`px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
            activeTab === "videos"
              ? "bg-[#0078BE] text-white shadow-md shadow-sky-900/20"
              : "bg-white text-stone-600 hover:bg-amber-50/80 border border-stone-200"
          }`}
        >
          <Film className="w-4 h-4" />
          <span>Videos</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${activeTab === "videos" ? "bg-white/20 text-white" : "bg-stone-100 text-stone-600"}`}>
            {videoFiles.length}
          </span>
        </button>
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredItems.map((item, index) => (
          <div
            key={item.id}
            onClick={() => setSelectedItemIndex(index)}
            className="group relative bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-xl border border-stone-200/80 transition-all duration-300 cursor-pointer flex flex-col aspect-[4/3]"
          >
            {item.type === "image" ? (
              <img
                src={item.src}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            ) : (
              <div className="relative w-full h-full bg-stone-900 flex items-center justify-center overflow-hidden">
                <div className="w-full h-full flex items-center justify-center overflow-hidden">
                  <video
                    src={item.src}
                    muted
                    playsInline
                    preload="metadata"
                    style={{ transform: `rotate(${rotationDegree}deg) scale(1.4)` }}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500"
                  />
                </div>
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/30 backdrop-blur-md border border-white/60 flex items-center justify-center group-hover:bg-[#0078BE] group-hover:border-[#0078BE] group-hover:scale-110 transition-all shadow-lg">
                    <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                  </div>
                </div>
                <div className="absolute top-2.5 right-2.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Film className="w-3 h-3 text-amber-400" />
                  Video
                </div>
              </div>
            )}

            {/* Hover overlay badge */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between">
              <span className="text-xs font-medium truncate pr-2">{item.title}</span>
              <Maximize2 className="w-3.5 h-3.5 text-white/80 shrink-0" />
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Video Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md">
          {/* Top Controls */}
          <div className="absolute top-4 right-4 z-50 flex items-center gap-3">
            {selectedItem.type === "video" && (
              <button
                onClick={handleRotate}
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all flex items-center gap-1.5 px-3 text-xs font-medium"
                title="Rotate video 90 degrees"
              >
                <RotateCw className="w-4 h-4" />
                <span>Rotate ({rotationDegree}°)</span>
              </button>
            )}
            <button
              onClick={() => setSelectedItemIndex(null)}
              className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Navigation Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            className="absolute left-4 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
            aria-label="Previous item"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Navigation Next */}
          <button
            onClick={(e) => { e.stopPropagation(); handleNext(); }}
            className="absolute right-4 z-50 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
            aria-label="Next item"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div className="relative max-w-5xl max-h-[85vh] w-full flex flex-col items-center justify-center">
            {selectedItem.type === "image" ? (
              <img
                src={selectedItem.src}
                alt={selectedItem.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
            ) : (
              <div className="relative w-full max-w-4xl h-[75vh] bg-black rounded-lg overflow-hidden flex items-center justify-center p-2">
                <div
                  className="w-full h-full flex items-center justify-center transition-transform duration-300"
                  style={{ transform: `rotate(${rotationDegree}deg)` }}
                >
                  <video
                    key={selectedItem.src}
                    src={selectedItem.src}
                    controls
                    autoPlay
                    playsInline
                    className="max-w-full max-h-[70vh] object-contain rounded-lg"
                  />
                </div>
              </div>
            )}

            <div className="mt-4 text-center text-white">
              <h3 className="text-base font-semibold">{selectedItem.title}</h3>
              <p className="text-xs text-stone-400 mt-1">
                {selectedItemIndex! + 1} of {filteredItems.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
