import React from 'react';
import { Star } from 'lucide-react';
import EmailInput from '../components/EmailInput';

const ExploreView: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#2d2e30] flex items-center justify-center px-4 pt-20">
      <div className="max-w-xl w-full bg-[#242426] rounded-3xl p-12 border border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col items-center text-center space-y-8">
           <div className="flex items-center space-x-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full">
              <div className="flex items-center text-red-500 space-x-0.5">
                 <Star size={14} fill="currentColor" />
                 <span className="text-white font-bold text-xs ml-1">4.8 stars</span>
              </div>
              <span className="text-white/40 text-xs">2,000+ reviews</span>
           </div>

           <h1 className="text-5xl font-bold text-white tracking-tight">Welcome to Voiceptionist</h1>
           <p className="text-white/60 text-lg">Explore our product to see how Voiceptionist helps you streamline your financial processes in a single platform.</p>

           <div className="w-full space-y-4">
              <EmailInput 
                dark 
                buttonText="Explore product" 
                placeholder="Work email address*" 
                className="w-full"
              />
           </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreView;