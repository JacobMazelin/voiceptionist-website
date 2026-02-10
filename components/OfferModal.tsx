import React from 'react';
import { X } from 'lucide-react';
import EmailInput from './EmailInput';

interface OfferModalProps {
  onClose: () => void;
}

const OfferModal: React.FC<OfferModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 modal-overlay animate-in fade-in duration-300">
      <div className="relative bg-white max-w-4xl w-full rounded-[32px] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[500px] animate-in zoom-in-95 duration-300">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-10 bg-white/10 hover:bg-white/20 p-2 rounded-full text-gray-500 md:text-white transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex-1 p-12 flex flex-col justify-center space-y-8">
           <h2 className="text-5xl font-medium tracking-tight text-gray-900 leading-[1.1]">Limited time: Get $150 when you take a Voiceptionist demo.</h2>
           <p className="text-gray-500 text-lg leading-relaxed">
             See how Voiceptionist helps you save time, reduce waste, and close more leads—then walk away with $150 for your time.
           </p>
           
           <div className="space-y-4">
             <EmailInput buttonText="Claim limited offer" placeholder="What's your work email?" />
             <p className="text-xs text-gray-400">Terms and Conditions apply.</p>
           </div>
        </div>

        <div className="flex-1 bg-ramp-lime relative flex items-center justify-center overflow-hidden">
           <div className="absolute inset-0 opacity-20">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="absolute border-2 border-black/20 w-16 h-16 rounded-full" style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}></div>
              ))}
           </div>
           <div className="relative z-10 text-center">
              <span className="text-[144px] font-bold text-white tracking-tighter leading-none">$150</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;