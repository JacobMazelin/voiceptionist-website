import React, { useState } from 'react';
import { Check, Minus, ChevronDown, ChevronUp } from 'lucide-react';

interface ComparisonRow {
  label: string;
  free: React.ReactNode;
  plus: React.ReactNode;
  enterprise: React.ReactNode;
}

interface Category {
  title: string;
  rows: ComparisonRow[];
}

const PricingTable: React.FC = () => {
  const [expanded, setExpanded] = useState<string[]>(['AI Call Handling', 'Lead Management', 'Property Operations']);

  const toggleCategory = (title: string) => {
    setExpanded(prev => prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]);
  };

  const categories: Category[] = [
    {
      title: 'AI Call Handling',
      rows: [
        { label: '24/7 AI-powered call answering', free: <Check className="text-[#34d399] mx-auto" size={18} />, plus: <Check className="text-[#34d399] mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
        { label: 'Custom voice and personality', free: <Check className="text-[#34d399] mx-auto" size={18} />, plus: <Check className="text-[#34d399] mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
        { label: 'Knowledge base integration', free: <Check className="text-[#34d399] mx-auto" size={18} />, plus: <Check className="text-[#34d399] mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
        { label: 'SMS follow-up messages', free: <Check className="text-[#34d399] mx-auto" size={18} />, plus: <Check className="text-[#34d399] mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
        { label: 'Call routing and escalation', free: <Minus className="text-gray-300 mx-auto" size={18} />, plus: <Check className="text-[#34d399] mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
        { label: 'Multi-language support', free: <Minus className="text-gray-300 mx-auto" size={18} />, plus: <Minus className="text-gray-300 mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
      ]
    },
    {
      title: 'Lead Management',
      rows: [
        { label: 'Automatic lead capture from calls', free: <Check className="text-[#34d399] mx-auto" size={18} />, plus: <Check className="text-[#34d399] mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
        { label: 'Lead qualification and scoring', free: <Minus className="text-gray-300 mx-auto" size={18} />, plus: <Check className="text-[#34d399] mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
        { label: 'Tour scheduling automation', free: <Check className="text-[#34d399] mx-auto" size={18} />, plus: <Check className="text-[#34d399] mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
        { label: 'CRM integrations', free: <Minus className="text-gray-300 mx-auto" size={18} />, plus: <Check className="text-[#34d399] mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
      ]
    },
    {
      title: 'Property Operations',
      rows: [
        { label: 'Maintenance request intake', free: <Check className="text-[#34d399] mx-auto" size={18} />, plus: <Check className="text-[#34d399] mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
        { label: 'Emergency triage and routing', free: <Check className="text-[#34d399] mx-auto" size={18} />, plus: <Check className="text-[#34d399] mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
        { label: 'Multi-property support', free: 'Up to 1 property', plus: 'Up to 10 properties', enterprise: 'Unlimited' },
        { label: 'Dedicated account manager', free: <Minus className="text-gray-300 mx-auto" size={18} />, plus: <Minus className="text-gray-300 mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
        { label: 'Analytics and reporting dashboard', free: 'Basic', plus: 'Advanced', enterprise: 'Custom' },
        { label: 'Priority support', free: 'Email', plus: '24/7 chat', enterprise: '24/7 phone + dedicated' },
      ]
    }
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-6 pt-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <h2 className="text-[48px] font-medium text-black">Compare <br /> Features</h2>
        <div className="grid grid-cols-3 gap-4 flex-1 max-w-[900px]">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Starter</h3>
            <button className="w-full py-3 bg-[#f5f5f4] text-black font-bold rounded-xl text-xs hover:bg-gray-200 transition-colors">Get started for free</button>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Professional</h3>
            <button className="w-full py-3 bg-[#abc2fe] text-black font-bold rounded-xl text-xs hover:brightness-95 transition-all">Get started</button>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Enterprise</h3>
            <button className="w-full py-3 bg-[#171717] text-white font-bold rounded-xl text-xs hover:brightness-125 transition-all">Contact sales</button>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div key={cat.title} className="border-t-2 border-black pt-2">
            <button
              onClick={() => toggleCategory(cat.title)}
              className="w-full flex items-center justify-between py-6 text-xl font-bold text-black"
            >
              <span>{cat.title}</span>
              {expanded.includes(cat.title) ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {expanded.includes(cat.title) && (
              <div className="divide-y divide-gray-100">
                {cat.rows.map((row, i) => (
                  <div key={i} className="grid grid-cols-12 gap-4 py-6">
                    <div className="col-span-5 text-sm font-medium text-gray-600 underline decoration-dotted underline-offset-4 cursor-help">{row.label}</div>
                    <div className="col-span-7 grid grid-cols-3 gap-4 items-center">
                      <div className="text-center text-[12px] text-gray-500 px-4">{row.free}</div>
                      <div className="text-center text-[12px] text-gray-500 px-4">{row.plus}</div>
                      <div className="text-center text-[12px] text-gray-500 px-4">{row.enterprise}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default PricingTable;
