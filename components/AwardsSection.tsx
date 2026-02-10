
import React from 'react';
import { Star } from 'lucide-react';
import EmailInput from './EmailInput';

const AwardsSection: React.FC = () => {
  const awards = [...Array(8)].map((_, i) => ({
    title: 'Leader 2024',
    badge: 'G'
  }));

  return (
    <section className="py-32 bg-white overflow-hidden">
      {/* Top centered content */}
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex flex-col items-center space-y-4 mb-20">
           <div className="w-12 h-12 bg-[#ef4444] rounded-full flex items-center justify-center text-white mb-2">
              <div className="font-bold text-2xl">G</div>
           </div>
           <p className="font-bold text-lg">5 star rating</p>
           <p className="text-gray-500">2,000+ reviews</p>
           <div className="flex text-ramp-lime">
             <Star size={20} fill="currentColor" />
           </div>
        </div>
      </div>

      {/* Edge-to-edge carousel */}
      <div className="relative overflow-hidden mb-40 w-screen left-1/2 right-1/2 -ml-[50vw] +mr-[50vw]">
         <div className="animate-scroll-fast flex items-center space-x-12 px-4">
            {[...awards, ...awards, ...awards].map((award, i) => (
              <div key={i} className="flex flex-col items-center space-y-3 shrink-0">
                 <div className="w-24 h-32 bg-gray-50 rounded-2xl flex items-center justify-center p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 bg-red-100 rounded text-red-600 flex items-center justify-center font-bold text-xl">
                      {award.badge}
                    </div>
                 </div>
                 <p className="text-[10px] uppercase font-bold tracking-widest text-gray-400">{award.title}</p>
              </div>
            ))}
         </div>
      </div>

      {/* Bottom centered content */}
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="space-y-6">
           <h2 className="text-[18px] md:text-[27px] font-normal tracking-tight">
             Never miss a call again.
           </h2>
           <div className="max-w-xl mx-auto">
                <EmailInput buttonText="Get started for free" placeholder="What's your work email?" />
           </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
