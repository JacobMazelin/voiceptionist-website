import React from 'react';
import { Check, ArrowRight } from 'lucide-react';

const ImplementationTimeline: React.FC = () => {
  const steps = [
    {
      label: 'Today',
      title: 'Get started.',
      items: [
        'Connect your ERP in five minutes',
        'Upload your policy in two minutes',
        'Issue yourself a card in one minute'
      ],
      active: false
    },
    {
      label: 'Day 5',
      title: 'Get comfortable.',
      items: [
        'Connect to HRIS, email, and 200+ apps',
        'Set up approvals and controls',
        'Issue cards to employees'
      ],
      active: false
    },
    {
      label: 'Day 30',
      title: "Ask why you didn't switch years ago.",
      items: [
        '100% of business spend moved to Voiceptionist',
        'Intake-to-pay 8.5x more efficient',
        'Books close 75% faster'
      ],
      active: true
    }
  ];

  return (
    <section className="pt-20 pb-32 bg-white">
      {/* Increased container width to 1400px to allow cards to be wider */}
      <div className="max-w-[1400px] mx-auto px-6 text-center">
        <p className="text-gray-500 font-medium mb-6 text-sm">New software shouldn't take a year to implement.</p>
        <h2 className="text-[45px] font-medium tracking-tight mb-8 text-gray-900 leading-[1.1]">Here's what you can get done with <br /> Voiceptionist in just 30 days.</h2>
        
        <button className="flex items-center space-x-2 mx-auto font-medium mb-12 group text-sm hover:text-gray-600 transition-colors cursor-default text-gray-900">
          <span>Switch to Voiceptionist</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Timeline Header Section - The line spans from center of col 1 to center of col 3 */}
        <div className="relative mb-14 mx-auto">
          {/* Connecting line: spans exactly between the centers of the outer cards */}
          <div className="absolute bottom-[5.5px] left-[16.66%] right-[16.66%] h-[1px] bg-gray-200 pointer-events-none hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className={`mb-6 px-7 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                  step.active 
                    ? 'bg-[#f5f5f4] border-gray-200 text-black' 
                    : 'bg-white border-gray-200 text-black'
                }`}>
                  {step.label}
                </div>
                {/* Dot markers: Day 30 is filled, others are outlined circles */}
                <div className={`w-3 h-3 rounded-full relative z-20 border-2 transition-colors ${
                  step.active 
                    ? 'bg-black border-black' 
                    : 'bg-white border-gray-300'
                }`}></div>
              </div>
            ))}
          </div>
        </div>

        {/* Cards Section - Now has more width to accommodate text without shrinking */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {steps.map((step, idx) => (
             <div 
               key={idx} 
               className={`pt-10 px-10 pb-10 rounded-3xl text-left border border-[#d2cecc] bg-white transition-all duration-500 flex flex-col ${
                 idx === 2 
                   ? 'shadow-[0_48px_80px_-15px_rgba(0,0,0,0.12)]' 
                   : 'shadow-sm hover:shadow-md'
               }`}
             >
               <h3 className="text-[15px] font-semibold mb-4 text-gray-900 tracking-tight">{step.title}</h3>
               <ul className="space-y-5">
                 {step.items.map((item, i) => (
                   <li key={i} className="flex items-center space-x-4">
                     <Check size={18} className="text-gray-400 flex-shrink-0" strokeWidth={2} />
                     <span className="text-gray-600 font-normal text-[15px] leading-none whitespace-nowrap">{item}</span>
                   </li>
                 ))}
               </ul>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

export default ImplementationTimeline;