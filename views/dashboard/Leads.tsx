import React, { useMemo } from 'react';
import { LeadScore, LeasingLead } from '../../types';
import { useLeads } from '../../hooks/useLeads';
import { User, Mail, Phone, Calendar, ArrowUpRight, CheckCircle2, XCircle, MoreVertical } from 'lucide-react';
import { BRAND_ACCENT } from '../../constants';


const Leads: React.FC = () => {
  const { leads, loading, error } = useLeads();

  const scoreCounts = useMemo(() => ({
    hot: leads.filter(l => l.score === LeadScore.HOT).length,
    medium: leads.filter(l => l.score === LeadScore.MEDIUM).length,
    low: leads.filter(l => l.score === LeadScore.LOW).length,
    notAFit: leads.filter(l => l.score === LeadScore.NOT_A_FIT).length,
  }), [leads]);

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
          <p className="text-sm font-bold text-red-600 mb-2">Failed to load leads</p>
          <p className="text-xs text-slate-500">{error}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="space-y-4 animate-in zoom-in-95 duration-500 pb-20">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <div className="text-[11px] font-medium text-slate-500 mb-1">Leads</div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Prospects</h1>
        </div>
        <div className="flex gap-2">
          <button className={`flex items-center gap-2 px-6 py-2.5 ${BRAND_ACCENT} rounded-md text-sm font-bold text-slate-900 shadow-sm hover:brightness-95 transition-all`}>
            Schedule Showing
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 max-w-[80%] pt-0">
        {[
          { label: 'Hot Leads', value: scoreCounts.hot.toString(), color: 'bg-red-50 text-red-700 border-red-100' },
          { label: 'Medium', value: scoreCounts.medium.toString(), color: 'bg-orange-50 text-orange-700 border-orange-100' },
          { label: 'Low', value: scoreCounts.low.toString(), color: 'bg-slate-50 text-slate-700 border-slate-100' },
          { label: 'Not a Fit', value: scoreCounts.notAFit.toString(), color: 'bg-slate-50 text-slate-400 border-slate-100' },
        ].map((stat) => (
          <div key={stat.label} className={`p-4 rounded-lg border ${stat.color} flex flex-col`}>
            <span className="text-[9px] font-bold uppercase tracking-[0.075em] opacity-80 mb-1">{stat.label}</span>
            <span className="text-2xl font-bold">{stat.value}</span>
          </div>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm mt-4">
        <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-sm font-bold text-slate-900">Recent Prospects</h3>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search leads..."
              className="text-xs border border-slate-200 rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Prospect</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Details</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Score</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Last Interaction</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-slate-100 rounded-full flex items-center justify-center font-bold text-slate-500">
                        {lead.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                          {lead.name}
                          {lead.score === LeadScore.HOT && <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>}
                        </div>
                        <div className="text-xs text-slate-500">{lead.phone}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs space-y-0.5">
                      <div className="text-slate-900 font-medium">{lead.unitType} • {lead.budget}</div>
                      <div className="text-slate-500 italic">Move-in: {lead.moveInDate}</div>
                      <div className="text-[10px] flex items-center gap-1">
                        {lead.pets ? <CheckCircle2 size={10} className="text-green-500" /> : <XCircle size={10} className="text-slate-300" />}
                        <span className="text-slate-400 uppercase tracking-tighter">Pets: {lead.pets ? 'Yes' : 'No'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-[10px] font-bold rounded-full uppercase tracking-wider ${lead.score === LeadScore.HOT ? 'bg-red-100 text-red-700' :
                        lead.score === LeadScore.MEDIUM ? 'bg-orange-100 text-orange-700' :
                          lead.score === LeadScore.LOW ? 'bg-slate-100 text-slate-500' :
                            'bg-slate-900 text-white'
                      }`}>
                      {lead.score}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-xs font-medium text-slate-900">{lead.lastContacted}</div>
                    <div className="text-[10px] text-slate-400">Via AI Voice</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-all">
                      <ArrowUpRight size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leads;