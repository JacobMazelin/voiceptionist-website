
import React from 'react';
// Fixed: Removed non-existent Microphone import and other unused imports to resolve compilation errors
import { 
  Phone, 
  MessageSquare, 
  Activity, 
  ShieldCheck, 
  ArrowRight, 
  Zap, 
  Clock,
  Users
} from 'lucide-react';
import { BRAND_ACCENT } from '../../constants';

const ACTIVE_SESSIONS = [
  { 
    id: 'RS-1', 
    type: 'call', 
    contact: 'Unknown (New York)', 
    property: 'Skyline Lofts', 
    duration: '0:42', 
    status: 'Qualifying', 
    aiAction: 'Collecting move-in date',
    sentiment: 'Positive' 
  },
  { 
    id: 'RS-2', 
    type: 'sms', 
    contact: 'Marcus Thorne', 
    property: 'The Heights', 
    duration: '2:15', 
    status: 'Transcribing', 
    aiAction: 'Answering package room inquiry',
    sentiment: 'Neutral' 
  },
  { 
    id: 'RS-3', 
    type: 'call', 
    contact: 'Sarah Jenkins', 
    property: 'Urban Oasis', 
    duration: '1:10', 
    status: 'Routing', 
    aiAction: 'Confirming tour availability',
    sentiment: 'Positive' 
  },
  { 
    id: 'RS-4', 
    type: 'call', 
    contact: 'David Lee', 
    property: 'Skyline Lofts', 
    duration: '0:12', 
    status: 'Triage', 
    aiAction: 'Identifying leak severity',
    sentiment: 'Urgent' 
  }
];

const RealTimeFeed: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Live AI Operations</h1>
          <p className="text-slate-500 font-medium">Real-time monitoring of all active voice and SMS interactions.</p>
        </div>
        <div className="flex gap-4 items-center">
           <div className="flex items-center gap-2 px-3 py-1 bg-green-50 text-green-600 rounded-full border border-green-100 text-[10px] font-black uppercase tracking-widest">
             <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
             System Nominal
           </div>
           <button className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:brightness-110 transition-all text-sm">
             Instance Settings
           </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-2">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Active Sessions ({ACTIVE_SESSIONS.length})</h3>
            <button className="text-[10px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase">Sort by Priority</button>
          </div>
          
          {ACTIVE_SESSIONS.map((session) => (
            <div key={session.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:border-slate-400 transition-all group relative overflow-hidden">
              <div className="flex items-start justify-between relative z-10">
                <div className="flex gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                    session.type === 'call' ? 'bg-slate-900 text-[#abc2fe]' : 'bg-blue-50 text-blue-600'
                  }`}>
                    {session.type === 'call' ? <Phone size={20} fill="currentColor" /> : <MessageSquare size={20} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900">{session.contact}</span>
                      <span className={`px-1.5 py-0.5 text-[8px] font-black uppercase rounded border ${
                        session.sentiment === 'Urgent' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-50 text-slate-400 border-slate-100'
                      }`}>
                        {session.sentiment}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium mt-1">
                      {session.property} • {session.duration}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{session.status}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium italic">"{session.aiAction}..."</p>
                </div>
              </div>

              {/* Live Waveform Visualization for Calls */}
              {session.type === 'call' && (
                <div className="mt-6 h-6 flex items-end gap-[2px]">
                   {[...Array(40)].map((_, i) => (
                     <div 
                       key={i} 
                       className="flex-1 bg-slate-900 rounded-full animate-wave" 
                       style={{ 
                         height: `${Math.random() * 100}%`,
                         animationDelay: `${i * 0.05}s`,
                         animationDuration: `${0.5 + Math.random()}s`
                       }}
                     ></div>
                   ))}
                </div>
              )}

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <div className="flex gap-2">
                    <button className="px-3 py-1.5 bg-slate-50 text-slate-900 text-[10px] font-black rounded-lg uppercase tracking-widest border border-slate-100 hover:bg-slate-100">Listen</button>
                    <button className="px-3 py-1.5 bg-slate-50 text-slate-900 text-[10px] font-black rounded-lg uppercase tracking-widest border border-slate-100 hover:bg-slate-100">Whisper</button>
                 </div>
                 <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
                   <ArrowRight size={18} />
                 </button>
              </div>
            </div>
          ))}

          <div className="p-12 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto mb-4 text-slate-300">
              <Activity size={24} />
            </div>
            <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest">End of Stream</h4>
            <p className="text-xs text-slate-400 mt-2">No other active sessions detected.</p>
          </div>
        </div>

        {/* Operational Sidebar */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
              <div className="flex items-center gap-2 text-[#abc2fe] mb-8">
                <Zap size={20} />
                <h3 className="text-[10px] font-black uppercase tracking-widest">Instance Metrics</h3>
              </div>
              
              <div className="space-y-8">
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-[10px] font-black text-slate-500 uppercase">Server Load</span>
                    <span className="text-sm font-bold">42%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                    <div className="bg-[#abc2fe] h-full w-[42%]"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Simultaneous</div>
                    <div className="text-2xl font-bold">18/40</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest mb-1">Avg Latency</div>
                    <div className="text-2xl font-bold">420ms</div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">AI Core Health</span>
                    <span className="text-[10px] font-black text-green-500 uppercase tracking-widest">Stable</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#abc2fe] opacity-5 blur-[100px] -mr-40 -mt-40"></div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-6">Real-time Summary</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center">
                    <Clock size={16} />
                  </div>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">Active Time</span>
                </div>
                <span className="text-xs font-black text-slate-900">14h 22m</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center">
                    <Users size={16} />
                  </div>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">Total Today</span>
                </div>
                <span className="text-xs font-black text-slate-900">482 Sessions</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center">
                    <ShieldCheck size={16} />
                  </div>
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-tight">Success Rate</span>
                </div>
                <span className="text-xs font-black text-green-600">98.4%</span>
              </div>
            </div>
            <button className="w-full mt-10 py-3.5 bg-slate-50 text-slate-900 text-[10px] font-black rounded-2xl hover:bg-slate-100 transition-all border border-slate-100 uppercase tracking-widest">
              Operational Logs
            </button>
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes wave {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        .animate-wave {
          transform-origin: bottom;
          animation: wave infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default RealTimeFeed;
