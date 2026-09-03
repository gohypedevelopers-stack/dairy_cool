import React from "react";
import { Star, Quote } from "lucide-react";

const reviewsRow1 = [
  {
    initials: "RS",
    name: "Rajesh Sharma",
    role: "Local Guide",
    rating: 5,
    text: "Ordered their bilona ghee recently. The granular texture and natural aroma are just like what we used to get in our village. Packaging was safe in a glass jar. Happy to support a real farm!"
  },
  {
    initials: "PP",
    name: "Pooja Patel",
    role: "Verified Google Review",
    rating: 5,
    text: "It's hard to find genuine ghee these days. I have been buying from Dairy Cool for 3 months now. My kids love the taste in dal and parathas. Very pure and highly recommended."
  },
  {
    initials: "AK",
    name: "Amit Kumar",
    role: "Verified Google Review",
    rating: 5,
    text: "Visited their farm in Noida once. Very clean setup. The bilona ghee is genuinely made using the traditional method, no machines used for churning. The quality reflects in the taste."
  },
  {
    initials: "SD",
    name: "Sneha Desai",
    role: "Verified Google Review",
    rating: 5,
    text: "Excellent product. The color is slightly golden and has a rich, nutty flavor. It's exactly how bilona ghee should be. The delivery was prompt too."
  },
];

const reviewsRow2 = [
  {
    initials: "VN",
    name: "Vikram Negi",
    role: "Local Guide",
    rating: 5,
    text: "I was skeptical about ordering ghee online, but Dairy Cool proved me wrong. It smells like pure homemade ghee. Even my mother approved of it, which says a lot!"
  },
  {
    initials: "MN",
    name: "Meera Nair",
    role: "Verified Google Review",
    rating: 5,
    text: "Been a regular customer. The quality has remained consistent over the past year. Perfect for everyday cooking, sweets, and even putting over rotis."
  },
  {
    initials: "SJ",
    name: "Suresh Jain",
    role: "Verified Google Review",
    rating: 5,
    text: "Very authentic and traditional flavor. The aroma fills the kitchen when you heat it. Glass jar packaging ensures no plastic smell. Good job, Dairy Cool team."
  },
  {
    initials: "AP",
    name: "Anjali Pandey",
    role: "Verified Google Review",
    rating: 5,
    text: "Truly traditional bilona ghee. You can literally feel the difference in taste compared to store-bought commercial brands. A bit premium, but absolutely worth it."
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-[#FAF6F0] overflow-hidden relative border-t border-amber-50">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-50/50 via-transparent to-transparent pointer-events-none" />

      <div className="w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 mb-16">
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="font-cursive text-2xl text-amber-600 font-bold block">
            Customer Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-serif font-black text-[#2E271E] leading-tight">
            What Our <span className="text-[#0284c7]">Community Says</span>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 bg-white border border-slate-100 shadow-sm px-6 py-2.5 rounded-full w-fit mx-auto mt-6">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 text-sm">
              <span className="text-amber-500 text-lg">★</span>
              <span>4.9 Google Rating</span>
            </div>
            <span className="hidden md:block w-px h-4 bg-slate-300" />
            <div className="font-bold text-[#0284c7] text-sm">
              320+ Verified Buyers
            </div>
          </div>
        </div>
      </div>

      {/* Inline Styles for infinite marquee */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 12px)); } /* -50% width minus half the gap */
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
          width: max-content;
        }
        .animate-marquee-reverse {
          animation: marquee 30s linear infinite reverse;
          width: max-content;
        }
        .pause-on-hover:hover {
          animation-play-state: paused;
        }
      `}} />

      <div className="relative w-full overflow-hidden space-y-6 lg:space-y-8 pb-10">
        
        {/* Left and Right fade gradients for smooth scrolling edges */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#FAF6F0] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#FAF6F0] to-transparent z-10 pointer-events-none" />

        {/* Row 1 */}
        <div className="flex gap-6 animate-marquee pause-on-hover pl-6">
          {/* Render array twice to create seamless loop */}
          {[...reviewsRow1, ...reviewsRow1].map((review, idx) => (
            <TestimonialCard key={`row1-${idx}`} review={review} />
          ))}
        </div>

        {/* Row 2 */}
        <div className="flex gap-6 animate-marquee-reverse pause-on-hover pl-6">
          {[...reviewsRow2, ...reviewsRow2].map((review, idx) => (
            <TestimonialCard key={`row2-${idx}`} review={review} />
          ))}
        </div>

      </div>

    </section>
  );
}

// Individual Card Component
function TestimonialCard({ review }: { review: any }) {
  return (
    <div className="w-[320px] md:w-[380px] shrink-0 bg-white/80 backdrop-blur-sm rounded-[2rem] p-6 md:p-8 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-white hover:shadow-[0_8px_30px_rgba(2,132,199,0.08)] hover:-translate-y-1 transition-all duration-300">
      
      <div className="space-y-4 relative z-10">
        {/* Quote Icon Background */}
        <Quote className="absolute -top-2 -left-2 w-12 h-12 text-slate-100 -z-10 rotate-180" />
        
        {/* Stars */}
        <div className="flex items-center gap-1 text-amber-400">
          {[...Array(review.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-current drop-shadow-sm" />
          ))}
        </div>
        
        {/* Review Text */}
        <p className="text-sm md:text-[15px] text-slate-600 leading-relaxed font-serif italic line-clamp-4">
          "{review.text}"
        </p>
      </div>

      {/* User Info */}
      <div className="mt-8 flex items-center gap-4">
        {/* Avatar */}
        <div className="w-11 h-11 rounded-full bg-gradient-to-br from-sky-50 to-sky-100 border border-sky-200 flex items-center justify-center font-black text-[#0284c7] text-sm shadow-inner shrink-0">
          {review.initials}
        </div>
        <div>
          <h4 className="text-sm font-black text-slate-900">{review.name}</h4>
          <p className="text-xs font-bold text-slate-400 mt-0.5">{review.role}</p>
        </div>
      </div>

    </div>
  );
}
