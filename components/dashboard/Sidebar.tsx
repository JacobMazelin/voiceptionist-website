
import React from 'react';
import { NAV_ITEMS, SETTINGS_ITEMS, BRAND_ACCENT } from '../../constants';
import { ClipboardCheck, LogOut } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (id: string) => void;
  onSignOut?: () => void;
  userEmail?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onSignOut, userEmail }) => {
  return (
    <aside className="w-64 border-r border-slate-200 h-screen flex flex-col bg-white">
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-slate-900 rounded flex items-center justify-center text-white">
          <span className="font-bold text-lg italic">V</span>
        </div>
        <span className="font-bold text-xl tracking-tight text-slate-900">Voiceptionist</span>
      </div>

      <div className="flex-1 px-3 space-y-1 overflow-y-auto pt-2">
        {/* Compact Setup Guide Section */}
        <div 
          onClick={() => setActiveTab('setup-guide')}
          className={`px-3 py-3 mb-4 group cursor-pointer rounded-xl transition-all ${activeTab === 'setup-guide' ? 'bg-slate-50 ring-1 ring-slate-200' : 'hover:bg-slate-50/50'}`}
        >
          <div className="flex items-center gap-2 mb-1">
            <div className={`${activeTab === 'setup-guide' ? 'text-slate-900' : 'text-slate-400'} group-hover:text-slate-900 transition-colors`}>
              <ClipboardCheck size={14} />
            </div>
            <span className={`text-xs font-bold ${activeTab === 'setup-guide' ? 'text-slate-900' : 'text-slate-500'} group-hover:text-slate-900 transition-colors`}>Setup guide</span>
          </div>
          <div className="text-[11px] text-slate-400 font-medium mb-2 group-hover:text-slate-600 transition-colors">
            Next: Get a quick tour
          </div>
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div className="bg-green-600 h-full w-[65%] transition-all duration-1000"></div>
          </div>
        </div>

        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
              activeTab === item.id 
                ? 'bg-slate-100 text-slate-900 font-bold' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span className={activeTab === item.id ? 'text-slate-900' : 'text-slate-400'}>
              {item.icon}
            </span>
            <span>{item.label}</span>
            {item.badge && (
              /* Fix: Use String() conversion to allow comparison between inferred number type and 'LIVE' string status */
              <span className={`ml-auto ${String(item.badge) === 'LIVE' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-100 text-slate-600 border-slate-200'} text-[10px] font-bold px-2 py-0.5 rounded-full border`}>
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="p-3 border-t border-slate-100 space-y-1">
        {SETTINGS_ITEMS.map((item: any) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm transition-colors rounded-md ${
              activeTab === item.id 
                ? 'bg-slate-100 text-slate-900 font-bold' 
                : item.id === 'upgrade'
                  ? 'text-blue-600 hover:bg-blue-50/50'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <span className={`${activeTab === item.id ? 'text-slate-900' : item.id === 'upgrade' ? 'text-blue-500' : 'text-slate-400'}`}>
              {item.icon}
            </span>
            <span className={item.id === 'upgrade' ? 'font-semibold' : ''}>{item.label}</span>
            {item.shortcut && !item.isPremium && (
              <span className="ml-auto text-[10px] font-medium text-slate-400">{item.shortcut}</span>
            )}
            {item.isPremium && (
              <span className="ml-auto bg-blue-100 text-blue-700 text-[9px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">Pro</span>
            )}
          </button>
        ))}
        
        <div className="mt-4 p-4 bg-slate-50 rounded-lg border border-slate-100">
          <div className="text-xs font-bold text-slate-900 mb-1 flex items-center justify-between">
            Live AI Instance
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          </div>
          <div className="text-[10px] text-slate-500 mb-3">Monitor live AI activity</div>
          <button
            onClick={() => setActiveTab('realtime-feed')}
            className={`w-full py-2 ${BRAND_ACCENT} text-slate-900 text-xs font-bold rounded shadow-sm hover:brightness-95 transition-all`}
          >
            Real-time Feed
          </button>
        </div>

        {userEmail && (
          <div className="mt-3 px-3 py-3 flex items-center justify-between">
            <div className="truncate mr-2">
              <p className="text-[11px] font-medium text-slate-500 truncate">{userEmail}</p>
            </div>
            {onSignOut && (
              <button
                onClick={onSignOut}
                className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors shrink-0"
                title="Sign out"
              >
                <LogOut size={14} />
              </button>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
