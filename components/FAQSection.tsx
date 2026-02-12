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
      question: 'How does Voiceptionist handle calls?',
      answer: 'Voiceptionist uses advanced AI to answer inbound calls 24/7. It greets callers naturally, answers questions about your property using your uploaded knowledge base, qualifies leads, schedules tours, and handles maintenance requests — all without human intervention.'
    },
    {
      question: 'How quickly can I get set up?',
      answer: 'You can be live in under 5 minutes. Just enter your property details, upload your property info (floor plans, pricing, policies), and we provision a dedicated phone number with a fully trained AI agent automatically.'
    },
    {
      question: 'Can I use Voiceptionist across multiple properties?',
      answer: 'Yes. Each property gets its own AI agent with a dedicated phone number, custom knowledge base, and tailored responses. You can manage all properties from a single dashboard.'
    },
    {
      question: 'What happens if a caller needs to reach a real person?',
      answer: 'Voiceptionist can be configured to escalate calls to your team for emergencies, complex situations, or when a caller specifically requests a human. You control the escalation rules.'
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
