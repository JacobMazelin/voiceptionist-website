import React from 'react';
import { 
  X, 
  Download, 
  Trash2, 
  Search, 
  Plus, 
  Minus, 
  Maximize2, 
  ExternalLink, 
  Bell, 
  Info, 
  ChevronRight,
  Edit3
} from 'lucide-react';

interface VendorContractDetailProps {
  renewalId: string;
  onClose: () => void;
}

const VendorContractDetail: React.FC<VendorContractDetailProps> = ({ renewalId, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white animate-in fade-in zoom-in-95 duration-300">
      {/* Top Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2 py-1 bg-slate-100 rounded text-slate-400">
             <Download size={16} />
          </div>
          <div className="flex items-center gap-2 px-2 py-1 bg-slate-100 rounded text-slate-400">
             <Trash2 size={16} />
          </div>
        </div>
        <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Document Viewer */}
        <div className="w-1/2 bg-slate-50 border-r border-slate-200 flex flex-col items-center justify-center p-8 overflow-y-auto">
          <div className="w-full max-w-[700px] bg-white shadow-[0_4px_24px_rgba(0,0,0,0.08)] rounded-sm p-12 space-y-8 min-h-[1000px]">
            {/* Mock Order Form Content */}
            <div className="flex justify-between items-start">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="text-blue-500 font-bold text-2xl flex items-center gap-1">
                    <span className="text-3xl">☁️</span> salesforce
                  </div>
                </div>
                <div className="text-[14px] font-bold uppercase tracking-tight text-slate-900 mt-8">Order Form</div>
                <div className="text-[12px] font-bold text-slate-900">Address Information</div>
              </div>
              <div className="text-right text-[10px] text-slate-500 leading-tight">
                Salesforce, Inc.<br />
                Salesforce Tower<br />
                415 Mission Street, 3rd Floor<br />
                San Francisco, CA 94105<br />
                United States
              </div>
            </div>

            <div className="space-y-6 pt-12">
              <div className="text-[12px] font-bold text-slate-900 border-b border-slate-900 pb-1">Terms and Conditions</div>
              <div className="grid grid-cols-2 gap-x-12 gap-y-4 text-[10px] text-slate-600">
                <div className="flex justify-between">
                  <span>Contract Start Date*:</span>
                  <span className="text-slate-900 font-medium">1/11/2024</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Method:</span>
                  <span className="text-slate-900 font-medium">Wire Transfer</span>
                </div>
                <div className="flex justify-between">
                  <span>Contract End Date*:</span>
                  <span className="text-slate-900 font-medium">1/10/2025</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment Terms:</span>
                  <span className="text-slate-900 font-medium">Net 30</span>
                </div>
                <div className="flex justify-between">
                  <span>Billing Frequency:</span>
                  <span className="text-slate-900 font-medium">Annual</span>
                </div>
                <div className="flex justify-between">
                  <span>Billing Method:</span>
                  <span className="text-slate-900 font-medium">Email</span>
                </div>
              </div>
            </div>

            <div className="space-y-4 pt-8">
              <div className="text-[12px] font-bold text-slate-900 border-b border-slate-900 pb-1">Services</div>
              <table className="w-full text-[9px] text-left border-collapse">
                <thead className="border-b border-slate-200">
                  <tr>
                    <th className="py-2 font-medium">Services</th>
                    <th className="py-2 font-medium">Order Start Date</th>
                    <th className="py-2 font-medium">Order End Date</th>
                    <th className="py-2 font-medium">Term (months)</th>
                    <th className="py-2 font-medium">Monthly Unit Price</th>
                    <th className="py-2 font-medium">Qty</th>
                    <th className="py-2 font-medium text-right">Total Price</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { name: 'Data Storage (10GB)', start: '1/11/2024', end: '1/10/2025', term: 12, price: 'USD 840.00', qty: 3, total: 'USD 30,240.00' },
                    { name: 'Event Monitoring', start: '1/11/2024', end: '1/10/2025', term: 12, price: 'USD 1,313.33', qty: 1, total: 'USD 15,759.96' },
                    { name: 'Sales Cloud - Enterprise Edition', start: '1/11/2024', end: '1/10/2025', term: 12, price: 'USD 75.60', qty: 1, total: 'USD 907.20' },
                    { name: 'Sales Cloud - Enterprise Edition', start: '1/11/2024', end: '1/10/2025', term: 12, price: 'USD 55.83', qty: 265, total: 'USD 177,558.40' },
                    { name: 'Lightning Platform Starter', start: '1/11/2024', end: '1/10/2025', term: 12, price: 'USD 25.00', qty: 1, total: 'USD 300.00' },
                  ].map((service, i) => (
                    <tr key={i}>
                      <td className="py-2 text-slate-900 font-medium">{service.name}</td>
                      <td className="py-2">{service.start}</td>
                      <td className="py-2">{service.end}</td>
                      <td className="py-2">{service.term}</td>
                      <td className="py-2">{service.price}</td>
                      <td className="py-2">{service.qty}</td>
                      <td className="py-2 text-right font-medium text-slate-900">{service.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Viewer Controls */}
          <div className="sticky bottom-8 mt-auto flex items-center gap-2 bg-[#1e1e1e] rounded-full px-4 py-2 shadow-2xl">
            <button className="p-1.5 text-white/50 hover:text-white transition-colors"><Search size={16} /></button>
            <div className="h-4 w-[1px] bg-white/10 mx-1"></div>
            <button className="p-1.5 text-white/50 hover:text-white transition-colors"><Minus size={16} /></button>
            <div className="h-4 w-[1px] bg-white/10 mx-1"></div>
            <button className="p-1.5 text-white/50 hover:text-white transition-colors"><Plus size={16} /></button>
            <div className="h-4 w-[1px] bg-white/10 mx-1"></div>
            <button className="p-1.5 text-white/50 hover:text-white transition-colors"><Maximize2 size={16} /></button>
            <div className="h-4 w-[1px] bg-white/10 mx-1"></div>
            <button className="p-1.5 text-white/50 hover:text-white transition-colors rotate-180"><Download size={16} /></button>
          </div>
        </div>

        {/* Right: Details Panel */}
        <div className="w-1/2 bg-white overflow-y-auto p-12">
          <div className="space-y-12 max-w-[600px]">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center text-2xl shadow-sm">☁️</div>
                <h1 className="text-4xl font-bold text-slate-900">Salesforce</h1>
              </div>
              <button className="text-[13px] font-medium text-slate-500 hover:text-slate-900 underline underline-offset-4 decoration-slate-300">
                View vendor profile
              </button>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-10">
              <div className="space-y-1">
                <div className="text-[11px] font-medium text-slate-400">Total contract amount</div>
                <div className="text-[20px] font-bold text-slate-900">$423,192.99</div>
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-medium text-slate-400">Payment frequency</div>
                <div className="text-[20px] font-bold text-slate-900">Annual</div>
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-medium text-slate-400">Auto-renewal</div>
                <div className="text-[20px] font-bold text-slate-900">Yes</div>
              </div>
              <div className="space-y-1">
                <div className="text-[11px] font-medium text-slate-400">Planning to renew at contract end?</div>
                <div className="text-[20px] font-bold text-slate-900">Yes</div>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative pt-12 pb-8">
              <div className="absolute top-[52px] left-0 right-0 h-[1px] bg-slate-200"></div>
              <div className="flex justify-between relative">
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 ring-4 ring-white relative z-10 mb-3"></div>
                  <div className="text-[11px] font-bold text-slate-900">Contract start date</div>
                  <div className="text-[11px] text-slate-400">Jan 11, 2024</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-2 h-2 rounded-full bg-slate-300 ring-4 ring-white relative z-10 mb-4"></div>
                  <div className="absolute top-[-10px]"><Bell size={12} className="text-slate-300" /></div>
                  <div className="text-[11px] font-bold text-slate-400 absolute top-[70px] whitespace-nowrap">Last date to terminate</div>
                  <div className="text-[11px] text-slate-400 absolute top-[85px] whitespace-nowrap font-bold">Dec 11, 2024</div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full bg-slate-300 ring-4 ring-white relative z-10 mb-3"></div>
                  <div className="text-[11px] font-bold text-slate-400">Contract end date</div>
                  <div className="text-[11px] text-slate-400">Jan 10, 2025</div>
                </div>
              </div>
            </div>

            {/* Reminders Section */}
            <div className="space-y-10 pt-16">
              <h2 className="text-[28px] font-bold text-slate-900 tracking-tight">Contract reminders</h2>
              
              <div className="space-y-4">
                <div className="border border-slate-100 rounded-xl p-8 space-y-4">
                  <h3 className="text-[18px] font-bold text-slate-900">Global reminder settings</h3>
                  <div className="space-y-4">
                    <p className="text-[14px] text-slate-500 font-medium">The vendor owner will receive notifications:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3 text-[14px] text-slate-700 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                        30, 60, and 90 days before the contract end date
                      </li>
                      <li className="flex items-center gap-3 text-[14px] text-slate-700 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                        30 and 60 days before the last date to terminate
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="border border-slate-100 rounded-xl p-8 space-y-4">
                  <h3 className="text-[18px] font-bold text-slate-900">Contract-level reminder settings</h3>
                  <div className="space-y-4">
                    <p className="text-[14px] text-slate-500 font-medium">The vendor owner and the vendor owner's manager will receive notifications:</p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-3 text-[14px] text-slate-700 font-medium">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
                        90 days before the contract end date
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6 pt-6">
              <h2 className="text-[28px] font-bold text-slate-900 tracking-tight">Line items</h2>
              <div className="h-20 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-xl text-slate-300">
                <Plus size={24} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="px-6 py-4 border-t border-slate-100 flex justify-between bg-white z-20">
        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-md text-[13px] font-bold text-slate-900 hover:bg-slate-50 transition-all">
          <Edit3 size={16} /> Edit contract details
        </button>
        <button onClick={onClose} className="px-6 py-2 border border-slate-200 rounded-md text-[13px] font-bold text-slate-900 hover:bg-slate-50 transition-all">
          Close
        </button>
      </div>
    </div>
  );
};

export default VendorContractDetail;