"use client";

import React, { useState } from "react";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import RealVideos from "@/components/home/real-videos";
import VideoModal from "@/components/video-modal";

export default function GalleryPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string; url: string }>({
    isOpen: false,
    title: "",
    url: "",
  });

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <div className="pt-16">
        <div className="max-w-4xl mx-auto px-4 text-center mb-4">
          <h1 className="text-4xl md:text-6xl font-serif font-black text-[#0078BE] mb-4">Gallery</h1>
          <p className="text-slate-600 text-lg">Take a visual tour of our farms and the traditional ghee-making process.</p>
        </div>
        <RealVideos onPlayVideo={(title, url) => setVideoModal({ isOpen: true, title, url })} />
      </div>
      <Footer />
      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ ...videoModal, isOpen: false })}
        videoTitle={videoModal.title}
        videoUrl={videoModal.url}
      />
    </div>
  );
}

