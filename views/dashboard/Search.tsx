
import React, { useState } from 'react';
import { Search as SearchIcon, Command, Clock, ArrowRight, User, Building2, Phone, Wrench } from 'lucide-react';

const RECENT_SEARCHES = [
  { query: 'Unit 402 water leak', category: 'Maintenance' },
  { query: 'Sarah Jenkins move-in', category: 'Leads' },
  { query: 'Skyline Lofts occupancy', category: 'Properties' },
];

const SUGGESTED_FILTERS = [
  { label: 'Residents', icon: <User size={14} /> },
  { label: 'Units', icon: <Building2 size={14} /> },
  { label: 'Calls', icon: <Phone size={14} /> },
  { label: 'Tickets', icon: <Wrench size={14} /> },
];

const Search: React.FC = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="max-w-3xl mx-auto space-y-12 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight">Search Dashboard</h1>
        <p className="text-slate-500 font-medium">Find anything across calls, leads, and properties instantly.</p>
      </div>

      <div className="relative group">
        <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
          <SearchIcon className="text-slate-400 group-focus-within:text-slate-900 transition-colors" size={24} />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for names, units, tickets or documents..."
          className="w-full bg-white border-2 border-slate-100 rounded-2xl py-6 pl-16 pr-6 text-xl font-medium text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-slate-900 focus:ring-0 transition-all shadow-sm group-hover:border-slate-200"
          autoFocus
        />
        <div className="absolute inset-y-0 right-6 flex items-center">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-400 text-xs font-bold uppercase tracking-widest">
            <Command size={12} /> K
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Searches</h3>
            <button className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest">Clear All</button>
          </div>
          <div className="space-y-1">
            {RECENT_SEARCHES.map((search, i) => (
              <button 
                key={i}
                className="w-full flex items-center justify-between p-4 bg-white border border-slate-100 rounded-xl hover:border-slate-300 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-4">
                  <Clock size={16} className="text-slate-300 group-hover:text-slate-600 transition-colors" />
                  <div className="text-left">
                    <div className="text-sm font-bold text-slate-900">{search.query}</div>
                    <div className="text-[10px] text-slate-400 font-black uppercase tracking-tight">{search.category}</div>
                  </div>
                </div>
                <ArrowRight size={16} className="text-slate-200 group-hover:text-slate-900 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Quick Filters</h3>
          <div className="grid grid-cols-2 gap-3">
            {SUGGESTED_FILTERS.map((filter, i) => (
              <button 
                key={i}
                className="flex items-center gap-3 p-4 bg-white border border-slate-100 rounded-xl hover:border-slate-900 transition-all group"
              >
                <div className="w-8 h-8 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all">
                  {filter.icon}
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-slate-900">{filter.label}</span>
              </button>
            ))}
          </div>

          <div className="mt-8 p-6 bg-slate-50 rounded-2xl border border-slate-100">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-2">Power Search Tip</h4>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Use <span className="text-slate-900 font-bold">unit:402</span> to jump directly to a specific unit view, or <span className="text-slate-900 font-bold">status:hot</span> to filter lead results.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
