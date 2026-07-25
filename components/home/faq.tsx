import React, { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Sparkles } from "lucide-react";

const faqData = [
  {
    question: "Bilona Ghee kya hota hai aur yeh normal ghee se alag kaise hai?",
    answer:
      "Bilona Ghee is prepared using the ancient Vedic process described in Ayurvedic Shastras. Instead of spinning raw cream at high speeds in machines, we first boil fresh Murrah buffalo milk, inoculate it with natural curd culture (Dahi), and let it ferment overnight. Early in the morning, this curd is bi-directionally churned using a wooden mathani (Bilona) to extract pure Makhan (butter). Finally, Dadi Kamlesh slow-cooks this Makhan in clay pots over cow-dung cake fire. This lengthy process retains vital enzymes and fat-soluble vitamins.",
    category: "Vedic Process",
  },
  {
    question: "Why is Dairy Cool Ghee called 'Danedar' (Grainy texture)?",
    answer:
      "The signature grainy texture (Danedar granular crystallization) is the ultimate hallmark of pure, unadulterated Bilona ghee. It occurs naturally during our slow wood-fire heating and natural cooling process at room temperature. Different fatty acids solidify at different temperatures, creating those delightful golden granules that melt instantly on warm rotis.",
    category: "Purity & Quality",
  },
  {
    question: "How does the wood fire and mud chulha affect the taste?",
    answer:
      "Slow boiling over organic mango wood and sun-dried cow dung cakes in earthen khadhais imparts a subtle, caramelized smokiness (Bhuna Swad) and an unforgettable aroma that stainless steel boilers can never replicate. Furthermore, clay vessels maintain an even, gentle thermal transfer without burning the delicate nutrients.",
    category: "Vedic Process",
  },
  {
    question: "Can people with lactose intolerance consume Dairy Cool Ghee?",
    answer:
      "Yes! During our overnight curd fermentation and traditional bi-directional churning, all milk solids, lactose, and casein proteins are separated and removed in the buttermilk (Chaas). When the extracted makhan is boiled into ghee, only the pure, easily digestible golden fat remains, making it 100% safe for lactose-sensitive individuals.",
    category: "Health & Nutrition",
  },
  {
    question: "What is the storage life and how should I store it?",
    answer:
      "Our pure Bilona Ghee has a natural shelf life of up to 12 months without any preservatives. Store it in a cool, dry place away from direct sunlight. Always use a clean, dry spoon to scoop the ghee. NEVER refrigerate bilona ghee, as room temperature storage preserves its authentic granular structure and aromatic properties.",
    category: "Storage & Care",
  },
  {
    question: "Can I use this ghee for deep frying and daily Indian cooking?",
    answer:
      "Absolutely! Bilona ghee has an exceptionally high smoke point of 250°C (482°F), which is much higher than refined vegetable oils or butter. This means it does not break down into toxic free radicals when heated, making it the healthiest choice for tadkas, parathas, halwas, and deep frying.",
    category: "Cooking & Uses",
  },
  {
    question: "Is Dairy Cool Ghee tested in certified laboratories?",
    answer:
      "Yes! Every batch produced at our Jansiwana village farm undergoes rigorous 5-step quality testing, including NABL lab certification for zero adulteration, zero palm oil, zero animal fat, and exact RM (Reichert-Meissl) value verification to ensure 100% purity before it is sealed in glass jars.",
    category: "Purity & Quality",
  },
  {
    question: "How fast is the delivery and how can I track my order?",
    answer:
      "We dispatch all orders within 24 hours in tamper-proof glass packaging with multi-layer bubble wrap. Delivery to Delhi-NCR takes 24 to 48 hours, while rest of India takes 3 to 5 business days. You can track your parcel anytime on our dedicated 'Track Order' page using your order ID.",
    category: "Shipping & Delivery",
  },
  {
    question: "What is your Return & Replacement Policy?",
    answer:
      "We take immense pride in our farm purity. If you ever receive a damaged jar due to courier mishandling, or if you are not 100% delighted with the aroma and taste, simply reach out on WhatsApp at +91 9716003060 within 7 days. We will instantly dispatch a free replacement or provide a full refund with no questions asked.",
    category: "Policy & Support",
  },
  {
    question: "Can I visit your ancestral farm in village Jansiwana?",
    answer:
      "We love hosting our customers! You are welcome to visit our organic farm in Village Jansiwana (Greater Noida West) to witness Dadi Kamlesh and our team performing the traditional morning Bilona churning. Please message us on WhatsApp at least 24 hours in advance to schedule a guided farm visit.",
    category: "Farm Visit",
  },
];

export default function FAQ() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <section id="faqs" className="py-24 bg-[#FAF6F0] border-t border-amber-100/60 relative overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-sky-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-16">
          <span className="font-cursive text-2xl text-[#0078BE] font-bold block flex items-center justify-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
            <span>Clear Answers & Farm Transparency</span>
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-black text-slate-900 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
            Everything you need to know about our ancestral Bilona process, farm purity standards, storage, and nationwide delivery.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqData.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div 
                key={index} 
                className={`bg-white rounded-2xl overflow-hidden border transition-all duration-300 ${
                  isOpen 
                    ? "border-[#0078BE] shadow-xl ring-2 ring-[#0078BE]/10 -translate-y-0.5" 
                    : "border-amber-100/80 shadow-sm hover:shadow-md hover:border-amber-300/80 hover:-translate-y-0.5"
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-6 text-left transition cursor-pointer group"
                >
                  <div className="flex items-start gap-4 pr-4">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      isOpen ? "bg-[#0078BE] text-white" : "bg-sky-50 text-[#0078BE] group-hover:bg-[#0078BE]/10"
                    }`}>
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold text-amber-700/80 uppercase tracking-widest block mb-1">
                        {faq.category}
                      </span>
                      <h3 className={`font-serif font-bold text-base sm:text-lg transition-colors ${
                        isOpen ? "text-[#0078BE]" : "text-slate-900 group-hover:text-[#0078BE]"
                      }`}>
                        {faq.question}
                      </h3>
                    </div>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? "bg-[#0078BE]/10 text-[#0078BE] rotate-180" : "bg-slate-100 text-slate-400 group-hover:text-slate-600"
                  }`}>
                    <ChevronDown className="w-5 h-5" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-100/80 text-sm sm:text-base text-slate-600 leading-relaxed animate-fadeIn">
                    <div className="pl-13 border-l-2 border-amber-300/60 py-1">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Help Card */}
        <div className="mt-16 bg-gradient-to-r from-[#0078BE] to-[#005a8d] rounded-3xl p-8 sm:p-10 text-white text-center shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-left">
            <h3 className="font-serif font-black text-2xl">Still have questions about our Ghee?</h3>
            <p className="text-sky-100 text-sm">Chat directly with Dadi Kamlesh&apos;s farm support team on WhatsApp.</p>
          </div>
          <a
            href="https://wa.me/9716003060?text=Hello%20Dairy%20Cool!%20I%20have%20a%20question%20regarding%20Bilona%20Ghee."
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 bg-[#25D366] hover:bg-[#20bd5a] text-white font-extrabold px-8 py-4 rounded-full text-xs uppercase tracking-widest shadow-lg hover:shadow-2xl hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
}
