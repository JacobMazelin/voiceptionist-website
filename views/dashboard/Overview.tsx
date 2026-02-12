import React, { useState, useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import StatCard from '../../components/dashboard/StatCard';
import { CallCategory, CallRecord } from '../../types';
import { useOverview } from '../../hooks/useOverview';
import {
  MessageSquare,
  Search,
  ChevronDown,
  Calendar as CalendarIcon,
  Globe,
  Download,
  ChevronRight,
  MoreVertical
} from 'lucide-react';

interface OverviewProps {
  setActiveTab: (tab: string) => void;
}

const TABLE_TABS = [
  { id: 'recent', label: 'Recent Activity' },
  { id: 'calls', label: 'Calls & Messages' },
  { id: 'transactions', label: 'Transactions' },
  { id: 'leads', label: 'Leads' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'scheduling', label: 'Scheduling' },
  { id: 'other', label: 'Other' },
];

// Data is now fetched from Supabase via useOverview hook

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white text-slate-900 px-4 py-3 rounded-xl shadow-2xl border border-slate-200 text-[13px] font-bold min-w-[160px] animate-in fade-in zoom-in-95 duration-200 ring-1 ring-slate-900/5">
        <p className="mb-2.5 text-slate-400 font-bold text-[10px] tracking-widest uppercase">{label}</p>
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-900 font-bold">Calls</span>
            <span className="text-slate-900 text-[15px] font-black">{payload[0].value}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[#7a9dfc] font-bold">Leads</span>
            <span className="text-[#7a9dfc] text-[15px] font-black">{payload[1].value}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const Overview: React.FC<OverviewProps> = ({ setActiveTab }) => {
  const { stats, chartData, recentActivity, loading, error } = useOverview();
  const [activeTableTab, setActiveTableTab] = useState('recent');
  const [visibleLogs, setVisibleLogs] = useState(10);

  const filteredActivity = useMemo(() => {
    switch (activeTableTab) {
      case 'calls':
        return recentActivity;
      case 'transactions':
        return recentActivity.filter(item => item.category === CallCategory.VENDOR);
      case 'leads':
        return recentActivity.filter(item => item.category === CallCategory.LEASING);
      case 'maintenance':
        return recentActivity.filter(item => item.category === CallCategory.RESIDENT || item.category === CallCategory.EMERGENCY);
      case 'scheduling':
        return recentActivity.filter(item => item.summary.toLowerCase().includes('schedule') || item.summary.toLowerCase().includes('tour'));
      case 'other':
        return recentActivity.filter(item => item.category === CallCategory.HOA || item.category === CallCategory.GENERAL);
      case 'recent':
      default:
        return recentActivity;
    }
  }, [activeTableTab, recentActivity]);

  const handleShowMore = () => {
    setVisibleLogs((prev) => prev + 10);
  };

  const getBadgeLabel = (category: CallCategory) => {
    if (category === CallCategory.RESIDENT) return 'EXISTING';
    if (category === CallCategory.HOA) return 'HOA/BYLAWS';
    return category.split(' ')[0].toUpperCase();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-sm font-bold text-red-600 mb-2">Failed to load overview data</p>
          <p className="text-xs text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-in fade-in duration-500 pb-24">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <div className="text-[11px] font-medium text-slate-500 mb-1">Insights</div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Reporting</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Filter Toolbar - Exact Ramp Style */}
      <div className="flex items-center bg-transparent border-b border-slate-100 py-4 w-full overflow-x-auto no-scrollbar">
        {/* Search Section */}
        <div className="flex items-center gap-3 pr-10 min-w-[200px]">
          <Search size={18} className="text-slate-400" />
          <input
            type="text"
            placeholder="Filter by..."
            className="bg-transparent border-none text-[15px] font-medium text-slate-500 focus:outline-none focus:ring-0 placeholder:text-slate-400 w-full"
          />
        </div>

        {/* Divider */}
        <div className="h-10 w-[1px] bg-slate-200"></div>

        {/* Slice Section */}
        <div className="flex flex-col px-10 min-w-[160px] cursor-pointer group">
          <span className="text-[10px] font-black text-[#94a3b8] uppercase tracking-wider mb-0.5">Slice</span>
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-bold text-[#0f172a]">Payment type</span>
            <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-900" />
          </div>
        </div>

        {/* Divider */}
        <div className="h-10 w-[1px] bg-slate-200"></div>

        {/* Date Range Section */}
        <div className="flex flex-col px-10 min-w-[180px] cursor-pointer group">
          <span className="text-[10px] font-black text-[#94a3b8] uppercase tracking-wider mb-0.5">Date range</span>
          <div className="flex items-center gap-2 justify-between">
            <span className="text-[15px] font-bold text-[#0f172a]">This month</span>
            <CalendarIcon size={16} className="text-slate-400 group-hover:text-slate-900" />
          </div>
        </div>

        {/* Divider */}
        <div className="h-10 w-[1px] bg-slate-200"></div>

        {/* Interval Section */}
        <div className="flex flex-col px-10 min-w-[140px] cursor-pointer group">
          <span className="text-[10px] font-black text-[#94a3b8] uppercase tracking-wider mb-0.5">Interval</span>
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-bold text-[#0f172a]">Daily</span>
            <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-900" />
          </div>
        </div>

        {/* Actions - Far Right */}
        <div className="flex items-center gap-6 ml-auto pl-10">
          <button className="text-slate-400 hover:text-slate-900 transition-colors">
            <Globe size={18} />
          </button>
          <button className="text-slate-400 hover:text-slate-900 transition-colors">
            <Download size={18} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 pt-0 max-w-[80%]">
        <StatCard
          label="Total Calls Handled"
          value={stats.totalCalls.toLocaleString()}
          change={stats.totalCallsChange}
          onClick={() => setActiveTab('calls')}
        />
        <StatCard
          label="Leads Captured"
          value={stats.leadsCaptured.toLocaleString()}
          change={stats.leadsChange}
          onClick={() => setActiveTab('leads')}
        />
        <StatCard
          label="Maintenance Calls"
          value={stats.maintenanceCalls.toLocaleString()}
          change={stats.maintenanceChange}
          isPositive={false}
          onClick={() => setActiveTab('maintenance')}
        />
        <StatCard
          label="Shows Booked"
          value={stats.showsBooked.toLocaleString()}
          change={stats.showsChange}
          onClick={() => setActiveTab('scheduling')}
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm overflow-hidden mt-4">
        <div className="h-[450px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0f172a" stopOpacity={0.08} />
                  <stop offset="95%" stopColor="#0f172a" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#abc2fe" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#abc2fe" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="0" vertical={true} horizontal={true} stroke="#f1f5f9" strokeOpacity={0.8} />
              <XAxis dataKey="display" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8', fontWeight: 500 }} dy={15} interval={0} padding={{ left: 10, right: 10 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8', fontWeight: 500 }} dx={-10} domain={[0, 'auto']} />
              <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#0f172a', strokeWidth: 1, strokeDasharray: '4 4' }} />
              <ReferenceLine y={400} stroke="#94a3b8" strokeDasharray="5 5" strokeOpacity={0.3} />
              <ReferenceLine y={800} stroke="#94a3b8" strokeDasharray="5 5" strokeOpacity={0.3} />
              <Area type="monotone" dataKey="calls" stroke="#0f172a" strokeWidth={2.5} fillOpacity={1} fill="url(#colorCalls)" activeDot={{ r: 4, fill: '#0f172a', stroke: '#fff', strokeWidth: 2 }} />
              <Area type="monotone" dataKey="leads" stroke="#abc2fe" strokeWidth={2.5} fillOpacity={1} fill="url(#colorLeads)" activeDot={{ r: 4, fill: '#abc2fe', stroke: '#fff', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden mb-12">
        <div className="px-6 border-b border-slate-100 flex items-center gap-8 bg-white overflow-x-auto no-scrollbar">
          {TABLE_TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTableTab(tab.id)}
              className={`py-4 text-xs font-bold transition-all relative whitespace-nowrap ${activeTableTab === tab.id ? 'text-slate-900' : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              {tab.label}
              {activeTableTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-slate-900 rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <tbody className="divide-y divide-slate-100">
              {filteredActivity.slice(0, visibleLogs).map((call) => (
                <tr key={call.id} className="hover:bg-[#f8fafc] transition-colors group">
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#f0f2f5] flex items-center justify-center text-xs font-bold text-[#64748b]">
                        {call.callerName.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">{call.callerName}</div>
                        <div className="text-[11px] text-slate-400 font-bold uppercase tracking-tight">{call.phoneNumber} • {call.timestamp}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center">
                    <span className={`px-4 py-1.5 text-[10px] font-black rounded-full uppercase tracking-widest border inline-block min-w-[100px] text-center ${call.category === CallCategory.LEASING ? 'bg-[#ebf5ff] text-[#3b82f6] border-[#3b82f6]/10' :
                      call.category === CallCategory.EMERGENCY ? 'bg-[#fef2f2] text-[#ef4444] border-[#ef4444]/10' :
                        call.category === CallCategory.RESIDENT ? 'bg-[#f0fdf4] text-[#16a34a] border-[#16a34a]/10' :
                          call.category === CallCategory.VENDOR ? 'bg-[#f8fafc] text-[#64748b] border-slate-200' :
                            'bg-[#f1f5f9] text-[#64748b] border-slate-200'
                      }`}>
                      {getBadgeLabel(call.category)}
                    </span>
                  </td>
                  <td className="px-6 py-6">
                    <p className="text-sm text-slate-600 font-bold leading-relaxed">{call.summary}</p>
                  </td>
                  <td className="px-6 py-6 text-right">
                    <button className="text-slate-300 hover:text-slate-600 p-2 transition-colors">
                      <MessageSquare size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredActivity.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-16 text-center text-slate-400 font-bold uppercase tracking-widest text-[11px]">
                    No matching activity
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {visibleLogs < filteredActivity.length && (
          <button
            onClick={handleShowMore}
            className="w-full py-5 text-[10px] font-black text-slate-400 hover:text-slate-900 bg-slate-50/50 hover:bg-slate-50 border-t border-slate-100 transition-colors uppercase tracking-[0.2em] flex items-center justify-center gap-2"
          >
            Show more <ChevronRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Overview;