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
  const [expanded, setExpanded] = useState<string[]>(['Corporate Card', 'Travel', 'Expense Management']);

  const toggleCategory = (title: string) => {
    setExpanded(prev => prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]);
  };

  const categories: Category[] = [
    {
      title: 'Corporate Card',
      rows: [
        { label: 'Corporate liability charge card', free: <Check className="text-[#34d399] mx-auto" size={18} />, plus: <Check className="text-[#34d399] mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
        { label: '20x higher credit limits', free: <Check className="text-[#34d399] mx-auto" size={18} />, plus: <Check className="text-[#34d399] mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
        { label: 'Unlimited physical and virtual cards', free: <Check className="text-[#34d399] mx-auto" size={18} />, plus: <Check className="text-[#34d399] mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
        { label: 'Card issuing controls', free: <Check className="text-[#34d399] mx-auto" size={18} />, plus: <Check className="text-[#34d399] mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
        { label: 'Category and vendor controls', free: <Check className="text-[#34d399] mx-auto" size={18} />, plus: <Check className="text-[#34d399] mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
        { label: 'Proactive policy controls and follow up', free: <Check className="text-[#34d399] mx-auto" size={18} />, plus: <span className="text-[11px] text-gray-500">+ Automatically lock cards when required receipts or items aren't submitted on time</span>, enterprise: <span className="text-[11px] text-gray-500">+ Automatically lock cards when required receipts or items aren't submitted on time</span> },
      ]
    },
    {
      title: 'Travel',
      rows: [
        { label: 'Travel bookings', free: <Check className="text-[#34d399] mx-auto" size={18} />, plus: <Check className="text-[#34d399] mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
        { label: 'Travel policies', free: 'Create company-wide policies', plus: '+ Create custom travel policies based on role, department, location, and more', enterprise: '+ Create custom travel policies based on role, department, location, and more' },
        { label: 'Guest bookings', free: <Check className="text-[#34d399] mx-auto" size={18} />, plus: '+ Invite external guests to book travel in Voiceptionist with set budgets and policy controls', enterprise: '+ Invite external guests to book travel in Voiceptionist with set budgets and policy controls' },
        { label: 'Support', free: '24/7 chat support', plus: '24/7 phone support', enterprise: '24/7 phone support' },
      ]
    },
    {
      title: 'Expense Management',
      rows: [
        { label: 'Spend limits with preset accounting codes', free: <Check className="text-[#34d399] mx-auto" size={18} />, plus: <Check className="text-[#34d399] mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
        { label: 'Automatic receipt collection and matching', free: <Check className="text-[#34d399] mx-auto" size={18} />, plus: <Check className="text-[#34d399] mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
        { label: 'Employee repayments', free: <Check className="text-[#34d399] mx-auto" size={18} />, plus: <Check className="text-[#34d399] mx-auto" size={18} />, enterprise: <Check className="text-[#34d399] mx-auto" size={18} /> },
        { label: 'Reimbursements', free: <Check className="text-[#34d399] mx-auto" size={18} />, plus: <span className="text-[11px] text-gray-500">+ Limit reimbursement spending<br/>+ Submit and review reimbursements in bulk<br/>+ Send weekly batched reimbursements</span>, enterprise: <span className="text-[11px] text-gray-500">+ Limit reimbursement spending<br/>+ Submit and review reimbursements in bulk<br/>+ Send weekly batched reimbursements</span> },
      ]
    }
  ];

  return (
    <section className="max-w-[1400px] mx-auto px-6 pt-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <h2 className="text-[48px] font-medium text-black">Compare <br /> Features</h2>
        <div className="grid grid-cols-3 gap-4 flex-1 max-w-[900px]">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Free</h3>
            <button className="w-full py-3 bg-[#f5f5f4] text-black font-bold rounded-xl text-xs hover:bg-gray-200 transition-colors">Get started for free</button>
          </div>
          <div className="text-center">
            <h3 className="text-xl font-bold mb-4">Plus</h3>
            <button className="w-full py-3 bg-[#abc2fe] text-black font-bold rounded-xl text-xs hover:brightness-95 transition-all">Get started for free</button>
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