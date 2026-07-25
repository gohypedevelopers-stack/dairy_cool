"use client";

import React, { useState } from "react";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import HealthBenefits from "@/components/home/health-benefits";
import WhyChooseUs from "@/components/home/why-choose-us";
import { BookOpen, ArrowRight, X, Calendar, User, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const featuredPosts = [
  {
    title: "The Science of A2 vs A1 Milk: Why Indian Buffalo Ghee Reigns Supreme",
    date: "July 20, 2026",
    author: "Dr. Rajesh Sharma, Ayurvedic Nutritionist",
    summary: "Discover the genetic differences between A1 and A2 beta-casein proteins and why our Murrah buffalo milk produces ghee that is far easier to digest.",
    content: "For decades, mainstream nutrition grouped all dairy products together. However, recent biochemical studies confirm what Ayurvedic sages knew thousands of years ago: the source of the milk matters immensely. A2 milk from indigenous Indian buffalo breeds contains proline at position 67 of the beta-casein protein chain, preventing the release of BCM-7 (a peptide linked to digestive discomfort and inflammation). By fermenting this A2 milk into curd and churning it via the two-way Bilona method, we eliminate lactose and casein entirely, leaving behind pure, golden therapeutic fat.",
    readTime: "5 min read",
    tag: "Ayurvedic Science"
  },
  {
    title: "Why Clay Chulhas & Cow Dung Cakes Transform Ghee Aroma",
    date: "July 14, 2026",
    author: "Kamlesh Devi (Dadi)",
    summary: "Slow boiling over organic wood and cow dung fire imparts a distinct smoky, caramelized fragrance that stainless steel boilers can never replicate.",
    content: "Modern commercial ghee is manufactured in massive industrial steel vats boiled rapidly using electric or steam heat. At Dairy Cool, our village artisans boil fresh milk in traditional earthen pots (Khadhais) over slow-burning mud chulhas fueled by sun-dried cow dung cakes and mango wood. This slow, steady thermal transfer allows milk sugars to caramelize gently over 4 to 6 hours without scorching the delicate nutrients. The result is our signature grainy texture (Danedar) and an intoxicating, nutty aroma that instantly awakens your appetite.",
    readTime: "4 min read",
    tag: "Traditional Craft"
  },
  {
    title: "The Ultimate Morning Ritual: 1 Spoon of Ghee in Warm Water",
    date: "July 02, 2026",
    author: "Wellness Editorial Team",
    summary: "Learn how starting your morning with melted Bilona ghee lubricates your joints, clears brain fog, and ignites your metabolic digestive fire (Agni).",
    content: "Before reaching for caffeine, try this ancient yogic practice: stir one teaspoon of warm Dairy Cool Bilona Ghee into a glass of lukewarm water and consume it on an empty stomach. Why? In Ayurveda, this practice is known as 'Snehana' (internal oleation). It gently coats the digestive tract, binds to fat-soluble toxins (Ama), and carries them out of the body. Furthermore, it stimulates bile flow from the gallbladder, setting up a strong digestive fire (Agni) that keeps your energy stable and prevents afternoon sugar crashes.",
    readTime: "3 min read",
    tag: "Daily Wellness"
  }
];

export default function BlogPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<typeof featuredPosts[0] | null>(null);

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      <div className="pt-16 pb-12">
        <div className="max-w-4xl mx-auto px-4 text-center mb-16">
          <span className="font-cursive text-2xl text-[#0078BE] font-bold block mb-2">Ancestral Wisdom & Research</span>
          <h1 className="text-4xl md:text-6xl font-serif font-black text-slate-900 mb-4">Dairy Cool Journal</h1>
          <p className="text-slate-600 text-lg">Explore the science, tradition, and incredible health benefits of authentic Vedic Bilona Ghee.</p>
        </div>

        {/* Featured Blog Posts Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
            <h2 className="text-2xl font-serif font-black text-slate-900 flex items-center gap-2.5">
              <BookOpen className="w-6 h-6 text-[#0078BE]" />
              <span>Featured Articles</span>
            </h2>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Updated Weekly</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredPosts.map((post, idx) => (
              <div 
                key={idx}
                onClick={() => setSelectedPost(post)}
                className="bg-[#FAF6F0]/80 border border-amber-100 rounded-3xl p-8 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group cursor-pointer"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="bg-white text-[#0078BE] font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider border border-amber-100 shadow-2xs">
                      {post.tag}
                    </span>
                    <span className="text-xs font-medium text-slate-400">{post.readTime}</span>
                  </div>

                  <h3 className="font-serif font-black text-xl text-slate-900 group-hover:text-[#0078BE] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-amber-200/50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>{post.date}</span>
                  </div>
                  <button 
                    type="button"
                    className="inline-flex items-center gap-1 text-xs font-extrabold text-[#0078BE] group-hover:translate-x-1 transition-transform"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <HealthBenefits />
        <WhyChooseUs />
      </div>
      <Footer />

      {/* Featured Post Reading Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-2xl sm:rounded-3xl max-w-2xl w-full p-5 sm:p-8 md:p-10 shadow-2xl border border-amber-100 relative max-h-[90vh] overflow-y-auto animate-scaleUp">
            
            <button 
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition cursor-pointer z-20 shadow-sm"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6 relative z-10">
              <div className="flex items-center gap-3">
                <span className="bg-amber-100 text-amber-900 font-extrabold text-xs px-3.5 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  {selectedPost.tag}
                </span>
                <span className="text-xs font-bold text-slate-400">{selectedPost.readTime}</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-serif font-black text-slate-900 leading-tight">
                {selectedPost.title}
              </h2>

              <div className="flex items-center gap-4 text-xs text-slate-500 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#0078BE]" />
                  <span className="font-bold text-slate-700">{selectedPost.author}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-amber-600" />
                  <span>{selectedPost.date}</span>
                </div>
              </div>

              <div className="bg-[#FAF6F0] border border-amber-100 rounded-2xl p-5 text-sm font-medium text-slate-700 leading-relaxed italic">
                &ldquo;{selectedPost.summary}&rdquo;
              </div>

              <div className="space-y-4 text-slate-600 text-sm md:text-base leading-relaxed">
                <p>{selectedPost.content}</p>
              </div>

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="w-full sm:w-auto px-6 py-3 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs uppercase tracking-wider transition cursor-pointer"
                >
                  Close Article
                </button>
                <Link
                  href="/#shop"
                  onClick={() => setSelectedPost(null)}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#0078BE] hover:bg-[#0066a1] text-white font-extrabold text-xs uppercase tracking-wider shadow-lg transition flex items-center justify-center gap-2"
                >
                  <span>Experience Shuddh Bilona Ghee</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
