import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'Is there a free version of Voiceptionist?',
      answer: 'Yes, Voiceptionist offers a robust Free plan that includes corporate cards, travel bookings, and basic expense management features for $0 per month per user.'
    },
    {
      question: 'Are there any limits on how many cards I can issue?',
      answer: 'No, all plans include unlimited physical and virtual corporate cards so you can scale spending controls across your entire organization.'
    },
    {
      question: 'Can I pay for Voiceptionist Plus with a Voiceptionist card?',
      answer: 'Absolutely. Many of our customers use their Voiceptionist corporate cards to pay for their subscription fees, keeping all their business spend in one unified platform.'
    },
    {
      question: 'How can we manage our Voiceptionist plan?',
      answer: 'Voiceptionist provides a centralized dashboard for administrators to upgrade plans, manage users, and configure permissions at any time as your business needs evolve.'
    }
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-6 pt-40">
      <h2 className="text-[52px] font-medium text-black mb-16">FAQ</h2>
      <div className="border-t border-gray-200">
        {faqs.map((faq, i) => (
          <div key={i} className="border-b border-gray-200">
            <button 
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between py-8 text-left group"
            >
              <span className="text-lg font-medium text-black group-hover:text-gray-600 transition-colors">{faq.question}</span>
              <div className="p-2 border border-gray-100 rounded-lg group-hover:bg-gray-50">
                {openIndex === i ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </button>
            {openIndex === i && (
              <div className="pb-8 animate-in slide-in-from-top-2">
                <p className="text-gray-500 leading-relaxed max-w-3xl">{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;