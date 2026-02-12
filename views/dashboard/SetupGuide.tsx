
import React, { useState } from 'react';
import { 
  Building2, 
  BookOpen, 
  Mic2, 
  Zap, 
  Rocket, 
  CheckCircle2, 
  ChevronRight,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { BRAND_ACCENT } from '../../constants';

const STEPS = [
  { 
    id: 'profile', 
    label: 'Profile Setup', 
    icon: <Building2 size={20} />, 
    status: 'complete',
    description: 'Basic building information and unit inventory.'
  },
  { 
    id: 'knowledge', 
    label: 'Knowledge Base', 
    icon: <BookOpen size={20} />, 
    status: 'complete',
    description: 'Upload bylaws and custom property rules.'
  },
  { 
    id: 'persona', 
    label: 'AI Persona', 
    icon: <Mic2 size={20} />, 
    status: 'current',
    description: 'Configure voice, tone, and escalation logic.'
  },
  { 
    id: 'integrations', 
    label: 'Integrations', 
    icon: <Zap size={20} />, 
    status: 'pending',
    description: 'Connect your calendar and PMS systems.'
  },
  { 
    id: 'launch', 
    label: 'Go Live', 
    icon: <Rocket size={20} />, 
    status: 'pending',
    description: 'Test your setup and activate the phone line.'
  }
];

const SetupGuide: React.FC = () => {
  const [activeStep, setActiveStep] = useState('persona');

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Platform Setup</h1>
        <p className="text-slate-500 font-medium">Follow the roadmap below to get your AI Receptionist fully operational.</p>
      </div>

      {/* Horizontal Roadmap */}
      <div className="relative pt-12 pb-8">
        {/* Progress Line Background */}
        <div className="absolute top-[76px] left-[10%] right-[10%] h-0.5 bg-slate-100 -z-10"></div>
        {/* Animated Progress Line Foreground */}
        <div 
          className="absolute top-[76px] left-[10%] h-0.5 bg-slate-900 -z-10 transition-all duration-1000 ease-in-out" 
          style={{ width: '40%' }}
        ></div>

        <div className="flex justify-between px-4">
          {STEPS.map((step, index) => (
            <div 
              key={step.id} 
              className="flex flex-col items-center gap-4 group cursor-pointer w-32"
              onClick={() => setActiveStep(step.id)}
            >
              <div className={`
                w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ring-8 ring-white
                ${step.status === 'complete' ? 'bg-slate-900 text-white shadow-lg' : 
                  step.status === 'current' ? `bg-white border-2 border-slate-900 text-slate-900 shadow-xl scale-110` : 
                  'bg-white border border-slate-200 text-slate-300 hover:border-slate-400 hover:text-slate-500'}
              `}>
                {step.status === 'complete' ? <CheckCircle2 size={22} /> : step.icon}
              </div>
              <div className="text-center">
                <div className={`text-[10px] font-black uppercase tracking-widest mb-1 ${step.status === 'pending' ? 'text-slate-300' : 'text-slate-900'}`}>
                  Step 0{index + 1}
                </div>
                <div className={`text-xs font-bold whitespace-nowrap ${step.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>
                  {step.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Step Content Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl p-10 shadow-sm relative overflow-hidden">
          <div className="relative z-10 space-y-8">
            <div className="flex items-center gap-3 text-[#7a9dfc]">
              <div className="p-2 bg-[#abc2fe]/10 rounded-lg">
                {STEPS.find(s => s.id === activeStep)?.icon}
              </div>
              <span className="text-xs font-black uppercase tracking-widest">Configuration Phase</span>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
                {STEPS.find(s => s.id === activeStep)?.label}
              </h2>
              <p className="text-lg text-slate-500 leading-relaxed max-w-xl font-medium">
                {STEPS.find(s => s.id === activeStep)?.description}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 flex gap-4">
              <button className={`px-8 py-3 bg-slate-900 text-white font-bold rounded-xl shadow-xl hover:brightness-110 transition-all flex items-center gap-2 group`}>
                Configure Now <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-3 bg-white border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all">
                Learn More
              </button>
            </div>
          </div>
          
          <div className="absolute top-0 right-0 w-80 h-80 bg-slate-50 opacity-40 blur-[100px] -mr-40 -mt-40"></div>
          <div className="absolute bottom-0 right-0 p-10 text-slate-50 opacity-10 group-hover:opacity-20 transition-opacity">
            {STEPS.find(s => s.id === activeStep)?.icon}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-[#abc2fe] mb-4">
                <Sparkles size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Setup Insight</span>
              </div>
              <h4 className="text-lg font-bold mb-4">Why AI Persona matters?</h4>
              <p className="text-sm text-slate-400 leading-relaxed font-medium">
                Properties with "Friendly" personas see a 14% higher conversion rate from general inquiries to qualified leads.
              </p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Setup Checklist</h4>
            <div className="space-y-4">
              {[
                { label: 'Building Profile', done: true },
                { label: 'Knowledge Documents', done: true },
                { label: 'Voice Selection', done: false },
                { label: 'Calendar Sync', done: false }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded flex items-center justify-center transition-colors ${item.done ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-300 group-hover:text-slate-400'}`}>
                      {item.done ? <CheckCircle2 size={14} /> : <div className="w-2 h-2 rounded-full border border-current"></div>}
                    </div>
                    <span className={`text-sm font-bold ${item.done ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{item.label}</span>
                  </div>
                  {!item.done && <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-900 transition-colors" />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetupGuide;
