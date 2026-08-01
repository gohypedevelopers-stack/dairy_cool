"use client";

import React, { useState } from "react";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import BilonaProcessSteps from "@/components/home/bilona-process-steps";
import QualityChecks from "@/components/home/quality-checks";
import RealVideos from "@/components/home/real-videos";
import VideoModal from "@/components/video-modal";

export default function BilonaProcessPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [videoModal, setVideoModal] = useState<{ isOpen: boolean; title: string; url: string }>({
    isOpen: false,
    title: "",
    url: "",
  });

  const playVideo = (title: string, url: string) => {
    setVideoModal({ isOpen: true, title, url });
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2E271E] font-sans antialiased selection:bg-[#0078BE] selection:text-white">
      {/* Header */}
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="pt-8 pb-16">
        {/* Page Hero Header */}
        <div className="max-w-4xl mx-auto px-4 text-center mb-8 sm:mb-14 space-y-3">
          <span className="bg-white text-amber-800 font-bold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider border border-amber-200 shadow-2xs inline-block">
            Vedic Tradition Unveiled
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-serif font-black text-[#2E271E] leading-tight">
            The Authentic Bilona Method
          </h1>
          <p className="text-stone-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Discover the ancient 5-step Vedic way of making pure, granular Ghee — churned bi-directionally using wooden bilonas in earthen clay pots.
          </p>
        </div>

        {/* 1. Real Process 5-Step Video Showcase */}
        <QualityChecks onPlayVideo={playVideo} />

        {/* 2. Step-by-Step Interactive Process Cards */}
        <BilonaProcessSteps />

        {/* 3. Real Farm & Process Videos Grid */}
        <RealVideos onPlayVideo={playVideo} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Video Modal Player */}
      <VideoModal
        isOpen={videoModal.isOpen}
        onClose={() => setVideoModal({ ...videoModal, isOpen: false })}
        videoTitle={videoModal.title}
        videoUrl={videoModal.url}
      />
    </div>
  );
}
