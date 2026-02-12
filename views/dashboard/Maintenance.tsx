import React, { useMemo } from 'react';
import { EmergencyLevel, MaintenanceTicket } from '../../types';
import { useMaintenance } from '../../hooks/useMaintenance';
import { Wrench, AlertTriangle, CheckCircle2, Clock, Truck, MoreHorizontal, MessageSquare, ShieldCheck, Sparkles, DollarSign, Users, AlertCircle, Search as SearchIcon } from 'lucide-react';
import { BRAND_ACCENT } from '../../constants';


const Maintenance: React.FC = () => {
  const { tickets, loading, error } = useMaintenance();

  const triageCounts = useMemo(() => ({
    emergencies: tickets.filter(t => t.severity === EmergencyLevel.EMERGENCY).length,
    urgent: tickets.filter(t => t.severity === EmergencyLevel.URGENT).length,
  }), [tickets]);

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
          <p className="text-sm font-bold text-red-600 mb-2">Failed to load maintenance tickets</p>
          <p className="text-xs text-slate-500">{error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-4 animate-in slide-in-from-right-4 duration-500 pb-6">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <div className="text-[11px] font-medium text-slate-500 mb-1">Maintenance</div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Issues</h1>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 bg-white rounded-lg text-xs font-bold text-slate-900 hover:bg-slate-50 transition-colors">
            Manage Vendors
          </button>
          <button className={`flex items-center gap-2 px-4 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold shadow-sm hover:brightness-110 transition-all`}>
            <Wrench size={12} /> New Work Order
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Main Ticket Table (Left 3/4) */}
        <div className="lg:col-span-3 bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden flex flex-col">
          <div className="px-5 py-3 border-b border-slate-100 flex items-center justify-between bg-white">
            <h3 className="font-bold text-slate-900 text-[9px] uppercase tracking-widest">Active Maintenance Stream</h3>
            <div className="relative group">
              <div className="absolute inset-y-0 left-2.5 flex items-center pointer-events-none text-slate-400">
                <SearchIcon size={10} />
              </div>
              <input
                type="text"
                placeholder="Filter issues..."
                className="text-[10px] border border-slate-200 rounded-lg pl-7 pr-3 py-1 focus:outline-none focus:ring-1 focus:ring-slate-900 w-40 bg-white hover:border-slate-300 transition-all"
              />
            </div>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left table-fixed border-collapse">
              <thead>
                <tr className="bg-[#fcfdfe]">
                  <th className="px-5 py-2 text-[9px] font-black text-slate-400 uppercase tracking-widest w-[12%]">ID</th>
                  <th className="px-5 py-2 text-[9px] font-black text-slate-400 uppercase tracking-widest w-[20%]">Resident / Unit</th>
                  <th className="px-5 py-2 text-[9px] font-black text-slate-400 uppercase tracking-widest w-[38%]">Issue Context</th>
                  <th className="px-5 py-2 text-[9px] font-black text-slate-400 uppercase tracking-widest w-[15%]">Severity</th>
                  <th className="px-5 py-2 text-[9px] font-black text-slate-400 uppercase tracking-widest w-[15%]">Status</th>
                  <th className="px-5 py-2 text-[9px] font-black text-slate-400 uppercase tracking-widest w-[5%] text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tickets.map((ticket) => (
                  <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors group cursor-pointer">
                    <td className="px-5 py-2.5 align-top">
                      <span className="text-[11px] font-bold text-slate-900 block tracking-tight">#{ticket.id}</span>
                      <div className="text-[8px] text-slate-400 font-bold uppercase mt-0.5 tracking-wide">{ticket.timestamp}</div>
                    </td>
                    <td className="px-5 py-2.5 align-top">
                      <div className="text-[12px] font-bold text-slate-900 leading-tight">{ticket.tenantName}</div>
                      <div className="text-[10px] text-slate-500 font-medium mt-0.5">Unit {ticket.unit}</div>
                    </td>
                    <td className="px-5 py-2.5 align-top">
                      <p className="text-[12px] text-slate-700 font-medium leading-tight italic truncate" title={ticket.issue}>"{ticket.issue}"</p>
                    </td>
                    <td className="px-5 py-2.5 align-top">
                      <span className={`px-1.5 py-0.5 text-[8px] font-black rounded uppercase tracking-widest border inline-block ${ticket.severity === EmergencyLevel.EMERGENCY ? 'bg-red-50 text-red-600 border-red-100' :
                          ticket.severity === EmergencyLevel.URGENT ? 'bg-orange-50 text-orange-600 border-orange-100' :
                            'bg-slate-50 text-slate-500 border-slate-100'
                        }`}>
                        {ticket.severity}
                      </span>
                    </td>
                    <td className="px-5 py-2.5 align-top">
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${ticket.status === 'Open' ? 'bg-slate-300' :
                            ticket.status === 'Dispatched' ? 'bg-[#3b82f6]' :
                              'bg-[#22c55e]'
                          }`}></div>
                        <span className="text-[11px] font-bold text-slate-900">{ticket.status}</span>
                      </div>
                    </td>
                    <td className="px-5 py-2.5 text-right align-top">
                      <button className="text-slate-300 hover:text-slate-900 p-0.5 transition-colors">
                        <MoreHorizontal size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Sidebar Statistics (Right 1/4) */}
        <div className="space-y-3">
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Vendor Cost</h3>
              <div className="p-1 bg-slate-50 rounded text-slate-400">
                <DollarSign size={10} />
              </div>
            </div>
            <div className="text-xl font-bold text-slate-900">$12,450</div>
            <div className="text-[8px] font-bold text-green-600 mt-0.5 uppercase tracking-tight flex items-center gap-1">
              <Sparkles size={8} /> 12% under
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
            <h3 className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-2">Triage Summary</h3>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between p-1.5 bg-red-50/50 rounded-lg border border-red-50">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle size={10} className="text-red-500" />
                  <span className="text-[10px] font-bold text-slate-900">Emergencies</span>
                </div>
                <span className="text-[10px] font-black text-red-600">{triageCounts.emergencies.toString().padStart(2, '0')}</span>
              </div>
              <div className="flex items-center justify-between p-1.5 bg-orange-50/50 rounded-lg border border-orange-50">
                <div className="flex items-center gap-1.5">
                  <AlertCircle size={10} className="text-orange-500" />
                  <span className="text-[10px] font-bold text-slate-900">Urgent</span>
                </div>
                <span className="text-[10px] font-black text-orange-600">{triageCounts.urgent.toString().padStart(2, '0')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maintenance;