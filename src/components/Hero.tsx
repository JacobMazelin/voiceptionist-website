import React from 'react';
import { ArrowRight, Star } from 'lucide-react';
import EmailInput from './EmailInput';

interface HeroProps {
  onExplore?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <section className="hero-gradient pt-20 pb-4 md:pb-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 grid lg:grid-cols-2 items-center gap-12">
        <div className="z-10 text-white space-y-4 max-w-xl">
          <div className="flex items-center space-x-3 bg-white/10 w-fit px-4 py-1.5 rounded-full backdrop-blur-md">
            <div className="flex items-center text-ramp-lime">
              <Star size={14} fill="currentColor" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-white/80">2,000+ 5 star reviews</span>
          </div>

          <h1 className="text-[44px] md:text-[72px] font-medium leading-[1.05] tracking-tighter">
            Time is money.<br />Save both.
          </h1>
          
          <p className="text-xl text-white/70 leading-relaxed">
            Easy-to-use corporate cards, bill payments, accounting, and a whole lot more. All in one place.
          </p>

          <div className="py-2">
            <EmailInput dark buttonText="Get started for free" className="max-w-md" />
          </div>

          <button 
            onClick={onExplore}
            className="flex items-center space-x-2 text-white/80 hover:text-white font-medium transition-colors group"
          >
            <span>Explore product</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="relative h-[540px] hidden lg:block">
           <div className="absolute top-0 right-0 w-[120%] h-full pointer-events-none">
              <div className="absolute top-0 right-0 w-full max-w-lg aspect-video bg-[#f8fafc] rounded-2xl shadow-2xl border-[12px] border-[#2d2e30] transform perspective-1000 rotate-y-[-10deg] overflow-hidden">
                <div className="p-6 bg-white h-full">
                   <div className="flex items-center justify-between mb-8">
                     <h3 className="text-2xl font-bold text-gray-900">Reporting</h3>
                     <div className="bg-ramp-lime px-3 py-1 text-xs font-bold rounded text-black">+ Create report</div>
                   </div>
                   <div className="h-48 w-full bg-gray-100 rounded-xl relative overflow-hidden">
                      <div className="absolute bottom-0 w-full h-2/3 bg-gradient-to-t from-emerald-50 to-transparent"></div>
                      <svg className="absolute bottom-0 w-full" viewBox="0 0 100 20" preserveAspectRatio="none">
                         <path d="M0 20 L20 15 L40 18 L60 12 L80 16 L100 10 L100 20 Z" fill="rgba(16, 185, 129, 0.2)" />
                         <path d="M0 20 L20 10 L40 14 L60 5 L80 12 L100 8 L100 20 Z" fill="rgba(16, 185, 129, 0.4)" />
                      </svg>
                   </div>
                </div>
              </div>

              <div className="absolute bottom-10 right-4 w-48 aspect-[1/2] bg-black rounded-[40px] shadow-2xl border-8 border-[#2d2e30] z-20 transform translate-x-4">
                 <div className="bg-white m-2 rounded-[30px] h-full overflow-hidden p-4">
                    <div className="flex items-center space-x-2 mb-6">
                       <div className="w-8 h-8 bg-black rounded-full"></div>
                       <div className="w-16 h-2 bg-gray-100 rounded"></div>
                    </div>
                    <div className="space-y-3">
                       <div className="h-12 bg-gray-50 rounded-xl border border-gray-100"></div>
                       <div className="h-12 bg-gray-50 rounded-xl border border-gray-100"></div>
                       <div className="h-12 bg-gray-50 rounded-xl border border-gray-100"></div>
                    </div>
                 </div>
              </div>

              <div className="absolute bottom-28 right-48 w-64 h-40 bg-[#121212] rounded-xl shadow-2xl z-30 transform -rotate-12 border border-white/10 p-6 flex flex-col justify-between overflow-hidden">
                 <div className="absolute top-0 right-0 w-full h-full opacity-20 pointer-events-none">
                    <div className="w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent"></div>
                 </div>
                 <div className="flex justify-between items-start z-10">
                    <div className="w-8 h-8 rounded bg-gray-800"></div>
                    <div className="text-white text-[10px] font-bold tracking-widest uppercase">voiceptionist</div>
                 </div>
                 <div className="z-10">
                    <div className="w-12 h-8 bg-amber-400/20 rounded-md border border-amber-400/30"></div>
                    <div className="text-white/40 text-[10px] mt-4 tracking-[0.2em]">•••• 1234</div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;