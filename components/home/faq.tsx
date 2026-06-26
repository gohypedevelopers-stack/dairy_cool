import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqData = [
  {
    question: "Bilona Ghee kya hota hai?",
    answer:
      "Bilona Ghee is prepared using the ancient Vedic process. Raw milk is converted into curd (Dahi) first. We then churn this curd bi-directionally with a wooden churner (Bilona) to separate butter (Makhan). Finally, this Makhan is slow-heated on low flames using traditional mud chulhas until golden ghee is obtained. This is far healthier than commercial ghee made by spinning raw cream at high speeds.",
  },
  {
    question: "Delivery kitne din me hoti hai?",
    answer:
      "We ship all orders via premium express couriers. Delivery to Delhi-NCR (Noida, Delhi, Gurgaon, Ghaziabad) usually takes 24 to 48 hours. For the rest of India, it takes between 3 to 5 business days. Once shipped, you will receive a tracking link via SMS.",
  },
  {
    question: "COD available hai?",
    answer:
      "Yes, Cash on Delivery (COD) is 100% available across all major pincodes in India. There are no additional charges for selecting COD. You can pay the courier rider in cash or via UPI when the parcel is delivered.",
  },
  {
    question: "Storage kaise kare?",
    answer:
      "Our Bilona Ghee has a long natural shelf life of up to 12 months. Store it in a cool, dry place away from direct sunlight. Always use a clean, dry spoon to scoop the ghee. Do not refrigerate it, as keeping it at room temperature preserves its granular structure, golden texture, and rich aroma.",
  },
  {
    question: "Return Policy kya hai?",
    answer:
      "We strive for absolute purity. In case you receive a damaged jar (glass breakage during transit), or if you are unsatisfied with the quality of the ghee, simply contact us on +91 9716003060 within 7 days of delivery. We will issue a free replacement jar or refund the complete amount immediately.",
  },
];

export default function FAQ() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <section id="faqs" className="py-20 bg-white border-t border-sky-100/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-3 mb-12">
          <span className="text-primary font-extrabold text-[11px] uppercase tracking-widest block">Clear Answers</span>
          <h2 className="text-3xl sm:text-4xl font-serif font-extrabold text-slate-900 leading-tight">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white border border-sky-100 rounded-xl overflow-hidden shadow-sm">
              <button
                onClick={() => toggleFaq(index)}
                className="w-full flex items-center justify-between p-5 text-left hover:text-primary transition cursor-pointer"
              >
                <h3 className="font-serif font-bold text-slate-900 text-base md:text-lg">{faq.question}</h3>
                {activeFaq === index ? (
                  <ChevronUp className="w-5 h-5 text-primary" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-450" />
                )}
              </button>
              {activeFaq === index && (
                <div className="p-5 pt-0 border-t border-sky-50/50 text-xs md:text-sm text-slate-650 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
