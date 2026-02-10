import React from 'react';
import { ArrowRight } from 'lucide-react';

const TransactionFeed: React.FC = () => (
  <div className="bg-[#fcfaf7] w-full h-full flex items-center justify-center p-8">
    <div className="bg-white rounded-[12px] shadow-[0_20px_40px_rgba(0,0,0,0.04)] border border-gray-100 w-full max-w-sm overflow-hidden">
      <div className="p-6 border-b border-gray-50 flex justify-between items-center">
        <h4 className="text-2xl font-bold text-gray-900">Today</h4>
        <span className="text-[10px] font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded uppercase tracking-wider">May 17</span>
      </div>
      <div className="p-2">
        <div className="flex items-center justify-between p-4 bg-blue-50/50 rounded-[8px] mb-1">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white rounded-[8px] shadow-sm flex items-center justify-center">
              <div className="w-2 h-4 bg-sky-400 rounded-full"></div>
            </div>
            <span className="font-bold text-gray-800">Blue Bottle</span>
          </div>
          <span className="font-bold text-gray-900">$11.83</span>
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-[8px] transition-colors cursor-default mb-1">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white rounded-[8px] shadow-sm flex items-center justify-center font-bold text-xs">Uber</div>
            <span className="font-bold text-gray-800">Uber</span>
          </div>
          <span className="font-bold text-gray-900">$31.19</span>
        </div>
        <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-[8px] transition-colors cursor-default">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-white rounded-[8px] shadow-sm flex items-center justify-center font-bold text-xs text-emerald-600">sg</div>
            <span className="font-bold text-gray-800">Sweetgreen</span>
          </div>
          <span className="font-bold text-gray-900">$27.50</span>
        </div>
      </div>
    </div>
  </div>
);

const DarkFeatures: React.FC = () => {
  const items = [
    {
      title: 'Set workflows that run themselves.',
      desc: <>Train Voiceptionist on your leasing rules, FAQs,<br /> emergency protocols, and routing logic.</>,
      link: 'Expense management',
      img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200'
    },
    {
      title: 'Triple-checks are done for you.',
      desc: <>Voiceptionist keeps an eye out 24/7 to catch<br />any out-of-policy transactions</>,
      link: 'Intelligence',
      img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
      reversed: true
    },
    {
      title: 'Leave the busywork to us.',
      desc: <>Keep everyone focused on the big picture<br />and let Voiceptionist automate the rest</>,
      link: 'Accounting automation',
      customVisual: <TransactionFeed />
    }
  ];

  return (
    <div className="bg-ramp-navy text-white">
      <div className="max-w-[960px] mx-auto px-4 py-20 space-y-24">
        <div className="text-center space-y-3 mx-auto">
           <h2 className="text-[clamp(1.8rem,4.5vw,3.75rem)] font-medium tracking-tight leading-[1.1] max-w-5xl mx-auto">
             Three<span className="text-[0.25em] align-top relative top-[1.2em]">*</span> ways we save your <br className="hidden md:block" /> company both time and money.
           </h2>
           <p className="text-white/40 text-sm">*there are many more, but we thought we'd ease you into it.</p>
           <button className="flex items-center space-x-2 mx-auto font-medium group hover:text-white/80 transition-colors pt-3">
              <span>Learn more</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
           </button>
        </div>

        {items.map((item, i) => (
          <div key={i} className={`flex flex-col lg:flex-row items-center gap-40 ${item.reversed ? 'lg:flex-row-reverse' : ''}`}>
            <div className="flex-[0.5] space-y-4">
               <h3 className="text-xl md:text-2xl font-medium leading-[1.1] tracking-tight">{item.title}</h3>
               <div className="text-sm text-white/60 leading-relaxed">{item.desc}</div>
               <button className="flex items-center space-x-2 text-xs font-medium group transition-colors text-[#7a7b7c] hover:text-white">
                  <span>{item.link}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
               </button>
            </div>
            <div className="flex-[0.975] w-full relative">
               <div className="rounded-[12px] overflow-hidden border border-white/10 shadow-3xl aspect-[16/10] bg-[#111111]">
                  {item.customVisual ? (
                    item.customVisual
                  ) : (
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                  )}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DarkFeatures;