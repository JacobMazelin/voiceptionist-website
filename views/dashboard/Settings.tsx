
import React, { useState } from 'react';
import { 
  User, 
  Shield, 
  Bell, 
  Globe, 
  Key, 
  Database, 
  Zap, 
  Smartphone,
  Check,
  Mail,
  Calendar,
  Apple,
  MessageSquare,
  ReceiptText,
  CreditCard,
  ArrowUpRight,
  LifeBuoy,
  Search,
  Headset,
  FileQuestion,
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { BRAND_ACCENT } from '../../constants';

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('integrations');

  const SECTIONS = [
    { id: 'profile', label: 'Property Profile', icon: <User size={18} /> },
    { id: 'integrations', label: 'Connection Hub', icon: <Zap size={18} /> },
    { id: 'billing', label: 'Plan & Billing', icon: <ReceiptText size={18} /> },
    { id: 'ai-receptionist', label: 'AI Behavior', icon: <MessageSquare size={18} /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell size={18} /> },
    { id: 'security', label: 'Security', icon: <Shield size={18} /> },
    { id: 'support', label: 'Support', icon: <LifeBuoy size={18} /> },
  ];

  const renderSupport = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className="text-slate-400 group-focus-within:text-slate-900 transition-colors" size={18} />
        </div>
        <input
          type="text"
          placeholder="Search help articles, guides, and tutorials..."
          className="w-full bg-white border border-slate-200 rounded-xl py-4 pl-12 pr-4 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-slate-900 focus:ring-0 transition-all shadow-sm group-hover:border-slate-300"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: 'AI Training', icon: <Zap size={18} />, desc: 'Improve voice accuracy' },
          { title: 'Billing Help', icon: <ReceiptText size={18} />, desc: 'Invoices & subscriptions' },
          { title: 'API Access', icon: <Key size={18} />, desc: 'Technical documentation' },
        ].map((item) => (
          <button key={item.title} className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm hover:border-slate-400 transition-all text-left group">
            <div className="w-10 h-10 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all mb-4">
              {item.icon}
            </div>
            <div className="text-sm font-bold text-slate-900">{item.title}</div>
            <div className="text-[10px] text-slate-400 font-bold uppercase mt-1 tracking-tight">{item.desc}</div>
          </button>
        ))}
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/30">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-widest">Contact Support</h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">Reach out to our specialist team for personalized assistance.</p>
        </div>
        <div className="divide-y divide-slate-100">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <MessageCircle size={24} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Live Chat</div>
                <div className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500"></div>
                  Agents online • 2m wait time
                </div>
              </div>
            </div>
            <button className={`px-5 py-2 ${BRAND_ACCENT} text-slate-900 text-[10px] font-black rounded-lg uppercase tracking-widest hover:brightness-95 transition-all`}>Start Chat</button>
          </div>

          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                <Mail size={24} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Email Support</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Expected response: &lt; 4 hours</div>
              </div>
            </div>
            <button className="px-5 py-2 bg-slate-100 text-slate-900 text-[10px] font-black rounded-lg uppercase tracking-widest hover:bg-slate-200 transition-all">Create Ticket</button>
          </div>

          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                <Headset size={24} />
              </div>
              <div>
                <div className="text-sm font-bold text-slate-900">Priority Phone Line</div>
                <div className="text-xs text-slate-500 font-medium mt-0.5">Available for Pro Enterprise users</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">Pro</span>
              <button className="text-slate-400 hover:text-slate-900 transition-colors">
                <ExternalLink size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 flex items-center justify-between text-white">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]"></div>
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-slate-400">System Status</div>
            <div className="text-sm font-bold">All AI Nodes Operational</div>
          </div>
        </div>
        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest">v2.4.12 — Up to date</div>
      </div>
    </div>
  );

  const renderBilling = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Current Plan</div>
          <div className="text-2xl font-bold text-slate-900">Pro Enterprise</div>
          <p className="text-xs text-slate-500 mt-1">Renews Oct 12, 2024</p>
          <button className="mt-4 text-[10px] font-black text-slate-900 hover:underline uppercase tracking-widest">Change Plan</button>
        </div>
        <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Payment Method</div>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-10 h-7 bg-slate-100 rounded border border-slate-200 flex items-center justify-center">
                <CreditCard size={14} className="text-slate-400" />
              </div>
              <span className="text-sm font-bold text-slate-900">Visa ending in 4242</span>
            </div>
          </div>
          <button className="text-[10px] font-black text-slate-400 uppercase hover:text-slate-900 text-left mt-4 tracking-widest transition-colors">Edit Method</button>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/30">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-widest">Usage Limits</h3>
        </div>
        <div className="p-6">
          <div className="flex justify-between items-end mb-2">
            <div className="text-sm font-bold text-slate-900">Minutes Used</div>
            <div className="text-xs font-bold text-slate-500">12,450 / 20,000</div>
          </div>
          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className="bg-[#abc2fe] h-full w-[62%] transition-all duration-1000"></div>
          </div>
          <p className="text-[10px] text-slate-400 mt-3 font-medium uppercase tracking-tight italic">AI Instance autoscales at 18 simultaneous calls</p>
        </div>
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
          <h3 className="font-bold text-slate-900 text-sm uppercase tracking-widest">Recent Invoices</h3>
          <button className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase">View All</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#fcfdfe] border-b border-slate-100">
              <tr>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Date</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Receipt</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {[
                { date: 'Sep 1, 2024', amount: '$1,250.00', status: 'Paid' },
                { date: 'Aug 1, 2024', amount: '$1,120.00', status: 'Paid' },
              ].map((inv, i) => (
                <tr key={i} className="hover:bg-[#f8fafc] transition-colors">
                  <td className="px-6 py-4 text-xs font-bold text-slate-900">{inv.date}</td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-900">{inv.amount}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-50 text-green-600 text-[10px] font-black px-2 py-0.5 rounded-full border border-green-100 uppercase tracking-widest">Paid</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-slate-400 hover:text-slate-900 transition-colors">
                      <ArrowUpRight size={16} />
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

  const renderContent = () => {
    switch (activeSection) {
      case 'integrations':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/30">
                <h3 className="font-bold text-slate-900">Calendar & Communication</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">Connect accounts for automated scheduling and follow-ups.</p>
              </div>
              
              <div className="divide-y divide-slate-100">
                <div className="p-6 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-blue-50 text-blue-600 rounded-xl">
                      <Mail size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Google Workspace</div>
                      <div className="text-xs text-slate-500 font-medium">Connected to pm@skyline-lofts.com</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 text-green-600 rounded-full border border-green-100">
                      <Check size={10} />
                      <span className="text-[10px] font-black uppercase tracking-widest">Active</span>
                    </div>
                    <button className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase tracking-widest transition-colors">Disconnect</button>
                  </div>
                </div>

                <div className="p-6 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-slate-100 text-slate-600 rounded-xl">
                      <Calendar size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">Outlook 365</div>
                      <div className="text-xs text-slate-500 font-medium">Sync calendar and availability</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-slate-900 text-white text-[10px] font-black rounded-lg uppercase tracking-widest hover:brightness-110 transition-all">Connect Account</button>
                </div>

                <div className="p-6 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-slate-100 text-slate-600 rounded-xl">
                      <Apple size={24} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">iCloud / Apple</div>
                      <div className="text-xs text-slate-500 font-medium">Sync with Apple Business accounts</div>
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-slate-100 text-slate-900 text-[10px] font-black rounded-lg uppercase tracking-widest hover:bg-slate-200 transition-all">Connect Account</button>
                </div>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-6 border-b border-slate-100 bg-slate-50/30">
                <h3 className="font-bold text-slate-900">PMS Integrations</h3>
                <p className="text-xs text-slate-500 mt-1 font-medium">Direct data sync with your Property Management Software.</p>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Yardi Voyager', 'Entrata', 'AppFolio', 'RealPage'].map((pms) => (
                  <div key={pms} className="p-4 border border-slate-200 rounded-xl flex items-center justify-between hover:border-slate-400 transition-all cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-slate-50 rounded flex items-center justify-center text-slate-400">
                        <Database size={16} />
                      </div>
                      <span className="text-sm font-bold text-slate-700">{pms}</span>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Connect</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'billing':
        return renderBilling();
      case 'ai-receptionist':
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-slate-900 mb-6 tracking-tight">AI Persona Configuration</h3>
              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Voice Profile</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {['Samantha', 'Jordan', 'Alex', 'Taylor'].map((voice) => (
                      <button key={voice} className={`p-4 rounded-xl border transition-all text-center group ${voice === 'Jordan' ? 'border-slate-900 bg-slate-900 text-white' : 'border-slate-200 hover:border-slate-400'}`}>
                        <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${voice === 'Jordan' ? 'bg-[#abc2fe] text-slate-900' : 'bg-slate-100 text-slate-400'}`}>
                          <Smartphone size={16} />
                        </div>
                        <div className="text-xs font-bold">{voice}</div>
                        <div className={`text-[9px] mt-1 uppercase font-black ${voice === 'Jordan' ? 'text-slate-400' : 'text-slate-400'}`}>Professional</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Personality & Tone</label>
                  <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
                    {['Friendly', 'Formal', 'Efficient', 'Empathetic'].map((tone) => (
                      <button key={tone} className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${tone === 'Efficient' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400 hover:text-slate-600'}`}>
                        {tone}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed italic px-2">
                    "Hello, thank you for calling Skyline Lofts. I'm Voiceptionist, your digital assistant. How can I help you find your new home today?"
                  </p>
                </div>

                <div className="space-y-4 border-t border-slate-100 pt-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-bold text-slate-900">Lead De-escalation</div>
                      <p className="text-xs text-slate-500">Enable advanced empathy models for handling complaint calls.</p>
                    </div>
                    <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${BRAND_ACCENT}`}>
                      <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 flex justify-end gap-3">
                <button className="px-6 py-2.5 bg-slate-100 text-slate-900 text-sm font-bold rounded-xl hover:bg-slate-200 transition-all">Preview Voice</button>
                <button className={`px-8 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl shadow-lg hover:brightness-110 transition-all`}>Save Configuration</button>
              </div>
            </div>
          </div>
        );
      case 'support':
        return renderSupport();
      default:
        return (
          <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center animate-in fade-in duration-500">
             <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
               {SECTIONS.find(s => s.id === activeSection)?.icon}
             </div>
             <h3 className="text-lg font-bold text-slate-900">Manage your {SECTIONS.find(s => s.id === activeSection)?.label}</h3>
             <p className="text-slate-500 text-sm mt-2">Section configuration and preferences module coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight mb-2">Settings</h1>
        <p className="text-slate-500 font-medium">Manage your portfolio preferences and AI operational logic.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-64 shrink-0 space-y-1">
          {SECTIONS.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all text-left ${
                activeSection === section.id 
                  ? 'bg-slate-900 text-white shadow-lg' 
                  : 'text-slate-500 hover:bg-white hover:text-slate-900'
              }`}
            >
              {section.icon}
              <span className="font-bold">{section.label}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 space-y-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings;
