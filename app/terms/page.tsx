"use client";

import React, { useState } from "react";
import Header from "@/components/home/header";
import Footer from "@/components/home/footer";
import { FileText, Scale, Award, CheckCircle2 } from "lucide-react";

export default function TermsPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-slate-800 flex flex-col antialiased">
      <Header
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <main className="flex-1 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          
          <div className="text-center space-y-3">
            <span className="text-[#0078BE] font-extrabold text-xs uppercase tracking-widest bg-sky-100 px-3.5 py-1.5 rounded-full inline-block">
              Transparent &amp; Fair
            </span>
            <h1 className="text-4xl md:text-5xl font-serif font-black text-slate-900">Terms of Service</h1>
            <p className="text-slate-600 max-w-xl mx-auto text-base">
              By accessing our website or placing an order with Dairy Cool, you agree to the following transparent terms and artisanal standards.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-8 md:p-10 border border-amber-100 shadow-sm space-y-8 text-slate-600 text-sm md:text-base leading-relaxed">
            
            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-black text-slate-900 flex items-center gap-2.5 border-b border-slate-100 pb-4">
                <FileText className="w-6 h-6 text-[#0078BE]" />
                <span>1. Artisanal Nature of Products</span>
              </h2>
              <p>
                Dairy Cool Bilona Ghee is handcrafted in small batches at our ancestral farm in Village Jansiwana using traditional clay pots and wooden churners (Bilona). Due to natural variations in cattle diet across seasons (green monsoon fodder versus dry winter grass) and natural temperature shifts, slight variations in color (golden yellow hues), aroma intensity, and granular texture (Danedar crystals) are completely normal and represent authentic, non-standardized farm purity.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-black text-slate-900 flex items-center gap-2.5 border-b border-slate-100 pb-4">
                <Award className="w-6 h-6 text-amber-600" />
                <span>2. Pricing &amp; Order Acceptance</span>
              </h2>
              <p>
                All prices listed on our website are inclusive of applicable Goods and Services Tax (GST). We reserve the right to adjust product pricing or promotional offers based on seasonal milk yield and farm availability. An order is deemed confirmed once you receive an order confirmation message or WhatsApp invoice from our farm team.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-black text-slate-900 flex items-center gap-2.5 border-b border-slate-100 pb-4">
                <Scale className="w-6 h-6 text-[#0078BE]" />
                <span>3. Intellectual Property Rights</span>
              </h2>
              <p>
                All content on this website—including brand logos, product photographs, videos of Dadi Kamlesh, textual descriptions of the Bilona process, and graphics—are the exclusive intellectual property of Dairy Cool Farms. Any unauthorized copying, commercial reproduction, or misrepresentation of our farm content is strictly prohibited under Indian copyright laws.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-black text-slate-900 border-b border-slate-100 pb-4">
                4. Limitation of Liability
              </h2>
              <p>
                While our ghee is an authentic Ayurvedic superfood prepared according to Vedic traditions, textual references to health benefits (such as digestion, energy, and joint lubrication) are for general nutritional guidance and wellness education. They are not intended as a substitute for professional medical advice or prescription treatment for clinical illnesses.
              </p>
            </div>

            <div className="space-y-4">
              <h2 className="text-2xl font-serif font-black text-slate-900 border-b border-slate-100 pb-4">
                5. Governing Law &amp; Jurisdiction
              </h2>
              <p>
                These Terms of Service and any purchase transactions with Dairy Cool shall be governed by and construed in accordance with the laws of India. Any disputes arising out of website usage or product purchases shall be subject to the exclusive jurisdiction of the competent courts in Gautam Buddha Nagar (Greater Noida), Uttar Pradesh.
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Last Updated: July 2026</span>
              <span>Dairy Cool Ancestral Farms, Village Jansiwana, UP</span>
            </div>

          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
