import React, { useState } from 'react';
import { useVendors } from '../../hooks/useVendors';
import {
  Search,
  Trash2,
  Download,
  MoreVertical,
  Upload,
  Edit3,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  FileText,
  Calendar as CalendarIcon
} from 'lucide-react';

// Vendor and Renewal types now come from useVendors hook

interface VendorsProps {
  onRenewalSelect?: (id: string) => void;
}

const Vendors: React.FC<VendorsProps> = ({ onRenewalSelect }) => {
  const { vendors, renewals, loading, error } = useVendors();
  const [activeTab, setActiveTab] = useState('All vendors');

  const isRenewals = activeTab === 'Upcoming renewals';

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
          <p className="text-sm font-bold text-red-600 mb-2">Failed to load vendors</p>
          <p className="text-xs text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 pb-10">
      {/* Breadcrumb & Title */}
      <div className="mb-6 flex justify-between items-start">
        <div>
          <div className="text-[11px] font-medium text-slate-500 mb-1">Vendors</div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
            <MoreVertical size={20} />
          </button>
          <button className="bg-[#abc2fe] hover:bg-[#99b1ef] text-black text-[13px] font-bold px-4 py-2 rounded-md transition-colors shadow-sm">
            New vendor
          </button>
        </div>
      </div>

      {/* Primary Tabs */}
      <div className="flex items-center gap-8 border-b border-slate-200 mb-6">
        {['All vendors', 'Upcoming renewals', 'Migrate payments'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 text-[13px] font-bold transition-all relative ${activeTab === tab ? 'text-slate-900 border-b-2 border-slate-900' : 'text-slate-400 hover:text-slate-600'
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Filter & Action Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Filter by..."
              className="bg-white border border-slate-200 rounded-md pl-9 pr-4 py-1.5 text-[13px] font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 transition-all w-64"
            />
          </div>

          {!isRenewals && (
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-full px-3 py-1 text-[11px] font-bold text-slate-700">
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400 mr-1 opacity-20"></div>
              Vendor status
              <span className="bg-slate-100 px-1.5 py-0.5 rounded text-slate-900">Active</span>
            </div>
          )}

          {isRenewals && (
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-lg text-[13px] font-medium text-slate-700 hover:bg-slate-200 transition-all">
              <CalendarIcon size={14} className="text-slate-500" />
              Next 12 months
            </button>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
            <Trash2 size={16} />
          </button>
          {!isRenewals && (
            <button className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
              <Download size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Main Table Wrapper */}
      <div className="bg-white border border-slate-200 rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-[#fcfdfe] border-b border-slate-100">
              {isRenewals ? (
                <tr>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-tight">Vendor</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-tight">Total contract value</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-tight">Contracts</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-tight">Vendor owner</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-tight">Contract start</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1">
                    Contract end <ChevronRight size={10} className="rotate-90" />
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-tight">Last date to terminate</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-tight">Auto-renewal</th>
                </tr>
              ) : (
                <tr>
                  <th className="px-4 py-3 w-10">
                    <input type="checkbox" className="rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                  </th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-tight">Vendor</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-tight">Vendor owner</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-tight">Year-to-date spend</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-tight">30-day spend</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-tight">Vendor status</th>
                  <th className="px-4 py-3 text-[11px] font-bold text-slate-400 uppercase tracking-tight">Vendor owner location</th>
                </tr>
              )}
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isRenewals ? (
                renewals.map((renewal) => (
                  <tr
                    key={renewal.id}
                    onClick={() => onRenewalSelect?.(renewal.id)}
                    className="hover:bg-slate-50 transition-colors group cursor-pointer"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-slate-50 border border-slate-100 flex items-center justify-center text-sm shadow-sm">{renewal.vendor.charAt(0)}</div>
                        <span className="text-[13px] font-bold text-slate-900">{renewal.vendor}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[13px] font-medium text-slate-900">{renewal.total}</td>
                    <td className="px-4 py-4">
                      <FileText size={16} className="text-slate-400" />
                    </td>
                    <td className="px-4 py-4 text-[13px] font-medium text-slate-900">{renewal.contact}</td>
                    <td className="px-4 py-4 text-[13px] font-medium text-slate-600">—</td>
                    <td className="px-4 py-4 text-[13px] font-medium text-slate-600">{renewal.termDate}</td>
                    <td className="px-4 py-4 text-[13px] font-medium text-slate-600">{renewal.termDate}</td>
                    <td className="px-4 py-4 text-[13px] font-medium text-slate-600">{renewal.autoRenew ? 'Yes' : 'No'}</td>
                  </tr>
                ))
              ) : (
                vendors.map((vendor) => (
                  <tr key={vendor.id} className="hover:bg-slate-50 transition-colors group cursor-pointer">
                    <td className="px-4 py-4">
                      <input type="checkbox" className="rounded border-slate-300 text-slate-900 focus:ring-slate-900" />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-between group/cell">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 flex items-center justify-center text-sm bg-slate-50 rounded">{vendor.name.charAt(0)}</div>
                          <span className="text-[13px] font-bold text-slate-900">{vendor.name}</span>
                        </div>
                        <Upload className="text-slate-300 opacity-0 group-hover/cell:opacity-100 transition-opacity" size={14} />
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-between group/cell">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white bg-slate-400">
                            {vendor.owner.split(' ').map(n => n[0]).join('')}
                          </div>
                          <span className="text-[13px] font-medium text-slate-700">{vendor.owner}</span>
                        </div>
                        <Edit3 className="text-slate-300 opacity-0 group-hover/cell:opacity-100 transition-opacity" size={14} />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[13px] font-medium text-slate-900">{vendor.ytdSpend}</td>
                    <td className="px-4 py-4 text-[13px] font-medium text-slate-900">{vendor.thirtyDaySpend}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-between group/cell">
                        <div className="flex items-center gap-1.5">
                          <CheckCircle2 size={14} className="text-slate-300" />
                          <span className="text-[13px] font-medium text-slate-900">{vendor.status}</span>
                        </div>
                        <Edit3 className="text-slate-300 opacity-0 group-hover/cell:opacity-100 transition-opacity" size={14} />
                      </div>
                    </td>
                    <td className="px-4 py-4 text-[13px] font-medium text-slate-600">{vendor.location}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-4 border-t border-slate-100 flex items-center justify-between bg-[#fcfdfe]">
          <div className="flex items-center gap-1 text-[11px] font-bold text-slate-400 uppercase tracking-widest cursor-pointer hover:text-slate-600">
            Select <ChevronRight size={14} className="rotate-90" />
          </div>
          <div className="flex items-center gap-4 text-[11px] font-bold text-slate-400">
            <span>1–{isRenewals ? renewals.length : vendors.length} of {isRenewals ? renewals.length : vendors.length} vendors</span>
            <div className="flex items-center gap-1">
              <button className="p-1 hover:bg-slate-200 rounded transition-colors"><ChevronLeft size={14} /></button>
              <button className="p-1 hover:bg-slate-200 rounded transition-colors"><ChevronRight size={14} /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Vendors;