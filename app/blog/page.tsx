"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import HealthBenefits from "@/components/home/health-benefits";
import WhyChooseUs from "@/components/home/why-choose-us";
import { BookOpen, ArrowRight, Calendar, Sparkles, Clock, User, Flame } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { blogPosts } from "@/lib/blog-data";
import { getWPPosts } from "@/lib/woocommerce";

export default function BlogPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [postsList, setPostsList] = useState(blogPosts);

  useEffect(() => {
    getWPPosts().then((wpPosts) => {
      if (wpPosts && wpPosts.length > 0) {
        const mapped = wpPosts.map((wp: any) => ({
          slug: wp.slug,
          title: wp.title,
          summary: wp.excerpt ? wp.excerpt.replace(/<[^>]*>?/gm, "").trim() : "",
          heroImage: wp.featuredImage?.node?.sourceUrl || "/images/buffalo_ghee_single.png",
          date: new Date(wp.date).toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" }),
          readTime: "4 min read",
          tag: wp.categories?.nodes[0]?.name || "Wellness",
          content: wp.excerpt
        }));
        setPostsList(mapped);
      }
    }).catch(console.error);
  }, []);

  const categories = ["All", "Ayurvedic Science", "Traditional Craft", "Daily Wellness"];

  const filteredPosts = selectedCategory === "All"
    ? postsList
    : postsList.filter(p => p.tag === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-slate-800 antialiased font-sans">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <main className="pt-20">
        {/* ── HERO BANNER ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#18130F] via-[#241C16] to-[#18130F] text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-amber-900/30">
          {/* Ambient Glows */}
          <div className="absolute -top-24 right-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 px-4 py-1.5 rounded-full text-xs font-bold text-amber-300 uppercase tracking-widest backdrop-blur-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ancestral Wisdom & Research</span>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black text-white leading-tight drop-shadow-md">
              Dairy Cool <span className="text-[#2B92E4]">Journal</span>
            </h1>

            <p className="text-stone-300 text-base sm:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Explore deep Ayurvedic science, traditional Bilona craftsmanship, and holistic lifestyle guides for vibrant daily living.
            </p>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-4">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all duration-300 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#2B92E4] text-white shadow-lg shadow-sky-500/25 scale-105"
                      : "bg-white/10 text-stone-300 hover:bg-white/20 hover:text-white border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── FEATURED BLOG POSTS GRID ── */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 pb-4 border-b border-amber-200/60">
            <div>
              <span className="font-cursive text-2xl text-amber-600 font-bold block">Curated Readings</span>
              <h2 className="text-3xl font-serif font-black text-slate-900 flex items-center gap-2.5">
                <BookOpen className="w-7 h-7 text-[#0078BE]" />
                <span>Featured Articles</span>
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider bg-white px-4 py-2 rounded-full border border-amber-100 shadow-2xs self-start sm:self-auto">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Updated Weekly</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <Link 
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white border border-amber-200/60 rounded-3xl overflow-hidden flex flex-col justify-between shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group cursor-pointer"
              >
                <div>
                  {/* Card Thumbnail Image */}
                  <div className="relative w-full h-52 overflow-hidden bg-slate-900">
                    <Image
                      src={post.heroImage}
                      alt={post.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-white/90 backdrop-blur-md text-[#0078BE] font-extrabold text-[10px] px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm border border-white">
                        {post.tag}
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 z-10">
                      <span className="bg-black/60 backdrop-blur-md text-white font-medium text-xs px-3 py-1 rounded-full flex items-center gap-1 border border-white/20">
                        <Clock className="w-3 h-3 text-amber-400" />
                        {post.readTime}
                      </span>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-7 space-y-4">
                    <h3 className="font-serif font-black text-xl text-slate-900 group-hover:text-[#0078BE] transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {post.summary}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-7 pb-7 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-amber-600" />
                    <span>{post.date}</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#0078BE] group-hover:text-[#005a90] group-hover:translate-x-1.5 transition-all">
                    <span>Read Article</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── HEALTH BENEFITS ── */}
        <HealthBenefits />

        {/* ── WHY CHOOSE US ── */}
        <WhyChooseUs />
      </main>

      <Footer />
    </div>
  );
}
