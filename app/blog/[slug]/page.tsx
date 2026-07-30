"use client";

import React, { useState, use } from "react";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import Link from "next/link";
import Image from "next/image";
import { getPostBySlug, blogPosts } from "@/lib/blog-data";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  ShoppingCart, 
  ChevronRight,
  BookOpen,
  Share2,
  Check,
  Star,
  Flame
} from "lucide-react";
import { WhatsAppIcon } from "@/components/icons";

interface BlogDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function BlogDetailsPage({ params }: BlogDetailsPageProps) {
  const resolvedParams = use(params);
  const post = getPostBySlug(resolvedParams.slug);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAF6F0] flex flex-col justify-between">
        <Header isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
        <div className="py-24 text-center px-4 max-w-lg mx-auto">
          <h1 className="text-3xl font-bold font-serif text-slate-900 mb-4">Article Not Found</h1>
          <p className="text-slate-600 mb-8">The requested article could not be located in the Dairy Cool Journal.</p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 bg-[#0078BE] text-white px-6 py-3 rounded-full font-bold text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Journal</span>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const otherPosts = blogPosts.filter((p) => p.slug !== post.slug);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleWhatsApp = () => {
    if (typeof window !== "undefined") {
      const text = encodeURIComponent(`Check out this article on Dairy Cool: ${post.title}\n${window.location.href}`);
      window.open(`https://wa.me/?text=${text}`, "_blank");
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-slate-800 antialiased font-sans">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="pt-20">
        {/* ── HERO BANNER ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-[#18130F] via-[#241C16] to-[#18130F] text-white pt-12 pb-16 sm:pt-16 sm:pb-24 px-4 sm:px-6 lg:px-8 border-b border-amber-900/30">
          {/* Ambient Glows */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-4xl mx-auto relative z-10 space-y-6">
            {/* Breadcrumb & Navigation */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <nav className="flex items-center gap-2 text-xs font-semibold text-stone-400">
                <Link href="/" className="hover:text-amber-400 transition">Home</Link>
                <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                <Link href="/blog" className="hover:text-amber-400 transition">Journal</Link>
                <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
                <span className="text-stone-200 truncate max-w-[150px] sm:max-w-xs">{post.title}</span>
              </nav>

              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-300 hover:text-white bg-white/10 hover:bg-white/20 border border-white/15 px-4 py-2 rounded-full backdrop-blur-sm transition shadow-sm"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>All Articles</span>
              </Link>
            </div>

            {/* Tag & Reading Time */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="bg-[#2B92E4] text-white font-extrabold text-xs px-4 py-1.5 rounded-full uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                {post.tag}
              </span>
              <span className="text-xs font-semibold text-stone-300 flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {post.readTime}
              </span>
            </div>

            {/* Article Title */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black text-white leading-tight drop-shadow-md">
              {post.title}
            </h1>

            {/* Author & Date Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/15 text-stone-300 text-xs sm:text-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 text-slate-900 flex items-center justify-center font-bold shadow-md">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{post.author}</p>
                  <p className="text-xs text-amber-400/90">{post.authorRole}</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-stone-300">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>{post.date}</span>
                </div>
                
                {/* Share Actions */}
                <div className="flex items-center gap-2 pl-4 border-l border-white/20">
                  <button
                    onClick={handleShare}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
                    title="Copy Link"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={handleWhatsApp}
                    className="p-2 rounded-full bg-emerald-600/80 hover:bg-emerald-600 text-white transition cursor-pointer"
                    title="Share on WhatsApp"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── ARTICLE BODY CONTAINER ── */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main Hero Image */}
          {post.heroImage && (
            <div className="relative w-full h-72 sm:h-[450px] rounded-3xl overflow-hidden mb-12 shadow-2xl border-4 border-white bg-slate-900">
              <Image
                src={post.heroImage}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-6 right-6 text-white text-xs font-medium text-stone-200">
                Dairy Cool Authentic Handcrafted Bilona Ghee Process
              </div>
            </div>
          )}

          {/* Executive Overview Quote Box */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-sm border border-amber-200/80 mb-10 relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-amber-100/40 rounded-full blur-2xl pointer-events-none" />
            <span className="font-cursive text-3xl text-amber-600 font-bold block mb-2">Executive Summary</span>
            <p className="text-lg sm:text-xl font-serif italic text-slate-800 leading-relaxed">
              &ldquo;{post.summary}&rdquo;
            </p>
          </div>

          {/* Key Insights Box */}
          {post.keyTakeaways && post.keyTakeaways.length > 0 && (
            <div className="bg-gradient-to-br from-amber-500/10 via-amber-100/30 to-sky-500/10 rounded-3xl p-6 sm:p-8 border border-amber-300/70 shadow-sm mb-12">
              <h3 className="font-serif font-black text-slate-900 text-xl mb-4 flex items-center gap-2.5">
                <CheckCircle2 className="w-6 h-6 text-[#0078BE]" />
                <span>Key Insights & Scientific Highlights</span>
              </h3>
              <ul className="space-y-3.5">
                {post.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0078BE] mt-2 flex-shrink-0 shadow-xs" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Detailed Paragraph Content */}
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200/80 mb-14 space-y-8">
            {post.content.map((section, idx) => (
              <div key={idx} className="space-y-3">
                {section.heading && (
                  <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 leading-tight pt-2 border-b border-amber-100 pb-2">
                    {section.heading}
                  </h2>
                )}
                <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                  {section.text}
                </p>
              </div>
            ))}
          </div>

          {/* ── SHOP PRODUCT SHOWCASE CTA ── */}
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-2xl relative overflow-hidden border border-amber-900/40 mb-16">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#0078BE]/20 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
              <div className="relative h-56 md:h-64 w-full flex items-center justify-center">
                <Image
                  src="/images/buffalo_ghee_single.png"
                  alt="Dairy Cool Buffalo Bilona Ghee"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </div>

              <div className="md:col-span-2 space-y-5 text-center md:text-left">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">5.0 Rated by 10,000+ Families</span>
                </div>

                <h3 className="text-2xl sm:text-4xl font-serif font-black text-white leading-tight">
                  Experience Shuddh A2 Buffalo Bilona Ghee
                </h3>

                <p className="text-stone-300 text-sm leading-relaxed">
                  Handcrafted by Kamlesh Devi (Dadi) using traditional 2-way wooden churner and slow boiled on clay chulhas. 100% natural, rich aroma, and pure Danedar texture.
                </p>

                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2">
                  <Link
                    href="/#shop"
                    className="inline-flex items-center gap-2 bg-[#2B92E4] hover:bg-[#207fcc] text-white font-extrabold px-8 py-4 rounded-full text-xs uppercase tracking-wider shadow-lg shadow-sky-500/25 transition active:scale-95"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    <span>Shop Dadi&apos;s Ghee</span>
                  </Link>

                  <button
                    onClick={handleWhatsApp}
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-6 py-4 rounded-full text-xs uppercase tracking-wider shadow-lg transition active:scale-95 cursor-pointer"
                  >
                    <WhatsAppIcon className="w-4 h-4" />
                    <span>WhatsApp Order</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── RELATED ARTICLES ── */}
          {otherPosts.length > 0 && (
            <div className="pt-8 border-t border-amber-200/60">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-serif font-black text-2xl sm:text-3xl text-slate-900 flex items-center gap-2.5">
                  <BookOpen className="w-7 h-7 text-[#0078BE]" />
                  <span>More Journal Readings</span>
                </h3>
                <Link
                  href="/blog"
                  className="text-xs font-extrabold text-[#0078BE] hover:underline flex items-center gap-1"
                >
                  <span>View all</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherPosts.map((other) => (
                  <Link
                    key={other.slug}
                    href={`/blog/${other.slug}`}
                    className="bg-white rounded-3xl overflow-hidden border border-amber-200/60 shadow-xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                        <Image
                          src={other.heroImage}
                          alt={other.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 z-10">
                          <span className="bg-white/90 text-[#0078BE] font-extrabold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider border border-white">
                            {other.tag}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6 space-y-2">
                        <h4 className="font-serif font-black text-slate-900 text-lg group-hover:text-[#0078BE] transition-colors leading-snug">
                          {other.title}
                        </h4>
                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {other.summary}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs text-[#0078BE] font-bold border-t border-slate-100">
                      <span className="text-slate-400 text-[11px]">{other.readTime}</span>
                      <span className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Read article</span>
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
