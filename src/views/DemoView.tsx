import React from 'react';
import { ArrowLeft, Play } from 'lucide-react';
import EmailInput from '../components/EmailInput';

interface DemoViewProps {
  onBack: () => void;
}

const DemoView: React.FC<DemoViewProps> = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-[#f9fafb] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-500 hover:text-black mb-8 transition-colors group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Voiceptionist</span>
        </button>

        <h1 className="text-6xl font-bold tracking-tight mb-20 text-gray-900">See how Voiceptionist works</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-[40px] overflow-hidden shadow-xl border border-gray-100 flex flex-col h-[700px]">
            <div className="p-12 space-y-6 flex-1">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900">Experience Voiceptionist with a live demo</h2>
              <p className="text-gray-500 text-lg">Schedule an expert-run, 30 minute tour of the platform.</p>
              <EmailInput buttonText="Schedule a demo" placeholder="What's your work email?" className="max-w-md pt-4" />
            </div>
            <div className="bg-[#dbeafe] p-12 relative h-1/2 flex items-end">
               <div className="absolute inset-0 m-12 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border-b pb-4">
                      <h3 className="font-bold text-xl text-gray-900">Reporting</h3>
                      <div className="w-8 h-8 rounded-full bg-gray-100"></div>
                    </div>
                    <div className="h-32 bg-gray-50 rounded-xl flex items-end p-4 space-x-2">
                       <div className="flex-1 bg-emerald-100 h-1/2 rounded-sm"></div>
                       <div className="flex-1 bg-emerald-200 h-3/4 rounded-sm"></div>
                       <div className="flex-1 bg-emerald-300 h-1/2 rounded-sm"></div>
                       <div className="flex-1 bg-emerald-400 h-full rounded-sm"></div>
                    </div>
                  </div>
               </div>
               <div className="absolute top-20 right-20 w-32 h-40 bg-black rounded-xl border-4 border-gray-200 z-10 p-2 overflow-hidden shadow-2xl">
                  <img src="https://picsum.photos/seed/face1/200/300" className="w-full h-full object-cover" />
               </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-[#f5f5f5] rounded-[40px] p-12 flex flex-col lg:flex-row items-center gap-12 group cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="flex-1 space-y-4">
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Takes 2 minutes</p>
                 <h2 className="text-3xl font-bold tracking-tight text-gray-900">Interactive product tour</h2>
                 <p className="text-gray-500">Click around our platform to see Voiceptionist in action.</p>
              </div>
              <div className="flex-1 w-full bg-white rounded-3xl p-6 shadow-xl border border-gray-200 aspect-[4/3] relative overflow-hidden">
                  <div className="bg-gray-50 h-full w-full rounded-xl p-4 border border-gray-100">
                    <div className="flex items-center space-x-2 mb-6">
                      <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                      <div className="w-20 h-2 bg-gray-200 rounded"></div>
                    </div>
                    <div className="space-y-3">
                      <div className="h-10 bg-white rounded-lg"></div>
                      <div className="h-10 bg-white rounded-lg"></div>
                    </div>
                  </div>
              </div>
            </div>

            <div className="bg-[#f5f5f5] rounded-[40px] p-12 flex flex-col lg:flex-row items-center gap-12 group cursor-pointer hover:bg-gray-100 transition-colors">
              <div className="flex-1 space-y-4">
                 <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Five product walkthroughs</p>
                 <h2 className="text-3xl font-bold tracking-tight text-gray-900">Watch product videos</h2>
                 <p className="text-gray-500">Get a high level overview of Voiceptionist's suite of products.</p>
              </div>
              <div className="flex-1 w-full relative aspect-[4/3]">
                 <img src="https://picsum.photos/seed/video1/400/300" className="w-full h-full object-cover rounded-3xl shadow-xl" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
                       <Play fill="black" size={24} />
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-40 pt-20 border-t border-gray-100 opacity-30 grayscale flex justify-between items-center flex-wrap gap-12">
           {['Discord', 'GoodRx', "BARRY'S", 'eventbrite', 'VALCOURT', 'ANDURIL', 'shopify', 'Opendoor', 'ZOLA', 'KUMON'].map(l => <span key={l} className="text-xl font-bold tracking-tighter text-gray-900">{l}</span>)}
        </div>
      </div>
    </div>
  );
};

export default DemoView;