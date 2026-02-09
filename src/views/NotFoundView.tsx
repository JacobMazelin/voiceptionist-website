
import React from 'react';
import { ArrowRight, Play } from 'lucide-react';

interface NotFoundViewProps {
  onNavigate: (view: 'home' | 'demo' | 'explore') => void;
}

const NotFoundView: React.FC<NotFoundViewProps> = ({ onNavigate }) => {
  const growthTools = [
    'VC & Angel Investor Database',
    'Mission Statement Generator',
    'Card Comparison Tool',
    'Invoice Generator',
    'Business Expense Classifier',
  ];

  const getStarted = [
    'Corporate Cards',
    'Expense Management',
    'Accounts Payable',
    'Seamless Accounting',
    'Voiceptionist Intelligence',
  ];

  // Fix: Explicitly type LinkItem as a React.FC to ensure standard React props like 'key' are correctly handled by TypeScript.
  const LinkItem: React.FC<{ text: string }> = ({ text }) => (
    <div className="group flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer hover:text-black transition-colors">
      <span className="text-[15px] font-medium text-gray-600 group-hover:text-black transition-colors">{text}</span>
      <ArrowRight size={16} className="text-gray-400 group-hover:text-black group-hover:translate-x-1 transition-all" />
    </div>
  );

  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      {/* 404 Header Section */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-20">
        <h1 className="text-[52px] font-medium tracking-tight text-black mb-8 leading-tight">Something doesn't feel right.</h1>
        <div className="relative w-64 h-64 mx-auto mb-8 rounded-2xl overflow-hidden grayscale border border-gray-100 shadow-sm">
          <img 
            src="https://images.fineartamerica.com/images/artworkimages/mediumlarge/3/grumpy-cat-real-grumpy-cat-transparent.png" 
            alt="Not found" 
            className="w-full h-full object-cover opacity-90"
          />
        </div>
        <p className="text-gray-500 text-lg font-medium">We can't find the page you are looking for.</p>
      </div>

      {/* Navigation Cards */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Card 1: Try Demo */}
        <div className="bg-[#f6f6f3] rounded-[32px] p-12 flex flex-col items-center text-center">
          <h2 className="text-[32px] font-medium tracking-tight text-black mb-4">Looking to try Voiceptionist?</h2>
          <p className="text-gray-500 mb-12">Check out the demo below.</p>
          
          <div className="relative w-full aspect-[16/10] bg-white rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-200 cursor-pointer group" onClick={() => onNavigate('demo')}>
            <img 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200" 
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500" 
              alt="Demo Preview"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/5 group-hover:bg-black/0 transition-colors">
              <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-full flex items-center space-x-3 shadow-xl transform group-hover:scale-105 transition-transform">
                <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white">
                  <Play size={14} fill="white" className="ml-0.5" />
                </div>
                <span className="font-bold text-sm text-black uppercase tracking-wider">View interactive demo</span>
              </div>
            </div>
            {/* Minimal UI elements to simulate the dashboard */}
            <div className="absolute top-4 left-4 right-4 flex justify-between pointer-events-none">
              <div className="h-4 w-24 bg-gray-100 rounded"></div>
              <div className="h-4 w-4 bg-gray-100 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Card 2: Site Directory */}
        <div className="bg-[#f6f6f3] rounded-[32px] p-12">
          <div className="text-center mb-12">
            <h2 className="text-[32px] font-medium tracking-tight text-black mb-4">Looking for something else?</h2>
            <p className="text-gray-500 max-w-sm mx-auto">Try one of our free growth tools built by the Voiceptionist team or connect with us to get started.</p>
          </div>

          <div className="grid grid-cols-2 gap-x-12">
            <div>
              <h3 className="text-xl font-bold text-black mb-6">Free Growth Tools</h3>
              <div className="flex flex-col">
                {growthTools.map((tool) => (
                  <LinkItem key={tool} text={tool} />
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-black mb-6">Get Started</h3>
              <div className="flex flex-col">
                {getStarted.map((item) => (
                  <LinkItem key={item} text={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundView;
