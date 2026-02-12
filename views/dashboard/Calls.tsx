import React, { useState } from 'react';
import { useCalls } from '../../hooks/useCalls';
import {
  ChevronDown,
  MoreHorizontal,
  MoreVertical,
  Filter,
  Sparkles,
  Heart,
  Smile,
  Mic,
  Image as ImageIcon,
  Sticker,
  Send,
  Users,
  PawPrint,
  Car,
  Home,
  Briefcase,
  DollarSign,
  CreditCard,
  Building2,
  Calendar,
  Check,
  CheckCheck,
  Phone,
  Bot,
  ArrowRight,
  FileText
} from 'lucide-react';

// Contact and Message types now come from useCalls hook
// Mock data replaced with Supabase data

// Messages now come from useCalls hook — no more mock data

interface CallsProps {
  onCallSelect: (id: string) => void;
}

const Calls: React.FC<CallsProps> = ({ onCallSelect }) => {
  const { contacts, messages, selectedContactId, selectContact, loading, messagesLoading, error } = useCalls();
  const [activeFilter, setActiveFilter] = useState('Open');
  const [messageInput, setMessageInput] = useState('');
  const [showCallLog, setShowCallLog] = useState<string | null>(null);

  const selectedContact = contacts.find(c => c.id === selectedContactId) || contacts[0];

  const filteredContacts = contacts.filter(c => {
    if (activeFilter === 'Open') return c.status === 'open';
    if (activeFilter === 'Closed') return c.status === 'closed';
    return true;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-sm font-bold text-red-600 mb-2">Failed to load conversations</p>
          <p className="text-xs text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full bg-white overflow-hidden border-t border-slate-100">
      {/* 1. Left Sidebar: Conversation List */}
      <div className="w-80 border-r border-slate-100 flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-1 cursor-pointer hover:bg-slate-50 px-2 py-1 rounded transition-colors">
              <span className="text-xs font-bold text-slate-800">All channels</span>
              <ChevronDown size={14} className="text-slate-400" />
            </div>
            <div className="flex items-center gap-3 text-slate-400">
              <Filter size={16} className="cursor-pointer hover:text-slate-600" />
              <MoreHorizontal size={16} className="cursor-pointer hover:text-slate-600" />
            </div>
          </div>
          <div className="flex p-1 bg-slate-100 rounded-lg">
            {['Open', 'Closed', 'All'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`flex-1 py-1.5 text-[11px] font-bold rounded-md transition-all ${activeFilter === tab ? 'bg-white shadow-sm text-slate-900' : 'text-slate-500 hover:text-slate-700'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => selectContact(contact.id)}
              className={`px-4 py-3 flex gap-3 cursor-pointer border-b border-slate-50/50 transition-all ${selectedContactId === contact.id ? 'bg-slate-50 border-r-2 border-r-blue-500' : 'hover:bg-slate-50/30'
                }`}
            >
              <div className="relative shrink-0">
                <div className="w-10 h-10 bg-slate-200 rounded-full overflow-hidden shadow-sm">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${contact.name}`} alt={contact.name} />
                </div>
                {contact.active && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-white rounded-full flex items-center justify-center shadow-sm"><div className="w-2 h-2 bg-green-500 rounded-full"></div></div>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h4 className="text-[13px] font-bold text-slate-900 truncate">{contact.name}</h4>
                  <span className="text-[10px] text-blue-500 font-bold shrink-0">• {contact.time}</span>
                </div>
                <p className="text-[11px] text-slate-500 truncate leading-tight font-medium">
                  {contact.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Middle Pane: Chat Thread (Mobile Style) */}
      <div className="flex-1 flex flex-col bg-white">
        <div className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col custom-scrollbar bg-slate-50/20">
          {messages.map((msg, idx) => {
            const nextMsg = messages[idx + 1];
            const prevMsg = messages[idx - 1];

            const isFirstInBlock = !prevMsg || prevMsg.sender !== msg.sender || prevMsg.date !== msg.date;
            const isLastInBlock = !nextMsg || nextMsg.sender !== msg.sender || nextMsg.date !== msg.date;
            const showDate = isFirstInBlock && msg.sender !== 'system';

            if (msg.sender === 'system' && msg.metadata?.isAssignment) {
              return (
                <div key={msg.id} className="max-w-2xl mx-auto w-full">
                  <div className="bg-[#FEF9C3]/40 border border-[#FEF9C3] rounded-2xl p-4 flex gap-4 items-start shadow-sm">
                    <div className="w-10 h-10 bg-[#EAB308]/10 rounded-full flex items-center justify-center text-[#A16207]">
                      <Phone size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[14px] font-bold text-slate-900">{msg.text}</h4>
                      <p className="text-[13px] text-slate-600 mt-1">{msg.metadata.callCategory}</p>
                      <button className="mt-3 px-4 py-1.5 bg-[#A16207] text-white text-[12px] font-bold rounded-lg hover:brightness-110 transition-all shadow-sm">
                        Answer
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            if (msg.sender === 'system' && msg.metadata?.callDuration) {
              return (
                <div key={msg.id} className="max-w-md mx-auto w-full">
                  <div
                    onClick={() => setShowCallLog(msg.id)}
                    className="bg-white border border-slate-200 rounded-2xl p-4 cursor-pointer hover:border-slate-400 transition-all group shadow-sm flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                        <FileText size={16} />
                      </div>
                      <div>
                        <div className="text-[13px] font-bold text-slate-900">{msg.text}</div>
                        <div className="text-[11px] text-slate-500 font-medium">Duration: {msg.metadata.callDuration} • {msg.metadata.callCategory}</div>
                      </div>
                    </div>
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-slate-900 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            }

            return (
              <React.Fragment key={msg.id}>
                {showDate && (
                  <div className="flex items-center justify-center my-4 relative">
                    <div className="absolute inset-0 flex items-center px-12">
                      <div className="w-full border-t border-slate-100"></div>
                    </div>
                    <span className="relative z-10 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white px-4">
                      {msg.date} {msg.time}
                    </span>
                  </div>
                )}

                <div className={`flex items-end gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} ${isLastInBlock ? 'mb-2' : 'mb-0.5'}`}>
                  {/* Sender Avatar/Icon */}
                  {(msg.sender === 'contact' || msg.sender === 'ai') && isLastInBlock ? (
                    <div className={`w-8 h-8 rounded-full shrink-0 overflow-hidden shadow-sm flex items-center justify-center ${msg.sender === 'ai' ? 'bg-[#abc2fe] text-white' : 'bg-slate-100'}`}>
                      {msg.sender === 'ai' ? (
                        <Bot size={18} />
                      ) : (
                        <img
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedContact.name}`}
                          alt="Avatar"
                          className="w-full h-full object-cover"
                        />
                      )}
                    </div>
                  ) : (msg.sender === 'contact' || msg.sender === 'ai') ? (
                    <div className="w-8 shrink-0"></div>
                  ) : null}

                  <div className="relative group max-w-[70%]">
                    {/* Display Sender Name & Time for AI/Contact if it's the first in block */}
                    {isFirstInBlock && msg.sender !== 'user' && (
                      <div className="flex items-center gap-2 mb-1 px-1">
                        <span className="text-[11px] font-bold text-slate-900">
                          {msg.sender === 'ai' ? 'AI Assistant' : selectedContact.name}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">{msg.time}</span>
                        {msg.isAI && (
                          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-blue-500 rounded-md border border-blue-100">
                            <Sparkles size={10} />
                            <span className="text-[9px] font-black uppercase tracking-tight">AI Draft</span>
                          </div>
                        )}
                      </div>
                    )}

                    <div className={`px-4 py-2.5 text-[14px] font-medium leading-normal shadow-sm transition-all ${msg.sender === 'user'
                        ? `bg-white text-slate-900 border border-slate-100 ${isFirstInBlock ? 'rounded-t-2xl' : 'rounded-t-lg'} ${isLastInBlock ? 'rounded-bl-2xl rounded-br-sm' : 'rounded-b-lg'}`
                        : msg.sender === 'ai'
                          ? `bg-[#F5F3FF] text-[#5B21B6] border border-[#DDD6FE] ${isFirstInBlock ? 'rounded-t-2xl' : 'rounded-t-lg'} ${isLastInBlock ? 'rounded-br-2xl rounded-bl-sm' : 'rounded-b-lg'}`
                          : `bg-[#F2F2F7] text-slate-900 border border-transparent ${isFirstInBlock ? 'rounded-t-2xl' : 'rounded-t-lg'} ${isLastInBlock ? 'rounded-br-2xl rounded-bl-sm' : 'rounded-b-lg'}`
                      }`}>
                      {msg.text}
                    </div>

                    {/* Status icons for User messages */}
                    {msg.sender === 'user' && isLastInBlock && (
                      <div className="flex items-center justify-end gap-1.5 mt-1 mr-1">
                        <span className="text-[11px] font-bold text-slate-900">Alex Morgan</span>
                        <span className="text-[10px] text-slate-400 font-medium">{msg.time}</span>
                        {msg.status === 'read' ? (
                          <CheckCheck size={12} className="text-blue-500" />
                        ) : (
                          <Check size={12} className="text-slate-300" />
                        )}
                      </div>
                    )}
                  </div>

                  {msg.sender === 'user' && isLastInBlock && (
                    <div className="w-8 h-8 rounded-full bg-slate-100 shrink-0 overflow-hidden shadow-sm">
                      <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="User" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Chat Input Area */}
        <div className="p-6 border-t border-slate-100 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900 text-white rounded-full text-[11px] font-bold hover:brightness-110 transition-all whitespace-nowrap shadow-sm">
                <Sparkles size={12} className="text-[#abc2fe]" /> AI Draft
              </button>
              <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-500 rounded-full text-[11px] font-bold hover:border-slate-900 hover:text-slate-900 transition-all whitespace-nowrap shadow-sm">
                Confirm production URL
              </button>
              <button className="px-3 py-1.5 bg-white border border-slate-200 text-slate-500 rounded-full text-[11px] font-bold hover:border-slate-900 hover:text-slate-900 transition-all whitespace-nowrap shadow-sm">
                Send API Auth Guide
              </button>
            </div>

            <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-full px-5 py-3 shadow-sm focus-within:border-slate-400 focus-within:ring-2 focus-within:ring-slate-100 transition-all group">
              <button className="text-slate-400 hover:text-slate-900 transition-colors">
                <Smile size={24} strokeWidth={1.5} />
              </button>

              <input
                type="text"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                placeholder={`Message ${selectedContact.name}...`}
                className="flex-1 bg-transparent border-none text-[15px] font-medium text-slate-900 placeholder:text-slate-400 focus:ring-0 outline-none"
              />

              <div className="flex items-center gap-4 text-slate-400 shrink-0">
                <button className="hover:text-slate-900 transition-colors">
                  <Mic size={24} strokeWidth={1.5} />
                </button>
                <button className="hover:text-slate-900 transition-colors">
                  <ImageIcon size={24} strokeWidth={1.5} />
                </button>
                <button className="hover:text-slate-900 transition-colors">
                  <Sticker size={24} strokeWidth={1.5} />
                </button>

                {messageInput.trim() && (
                  <button className="ml-2 w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center hover:scale-105 transition-all shadow-md">
                    <Send size={14} className="ml-0.5 text-white" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Right Pane: About Customer Detail Sidebar */}
      <div className="w-[340px] border-l border-slate-100 flex flex-col bg-white shrink-0 overflow-y-auto custom-scrollbar">
        <div className="bg-[#f8f9fa] px-4 py-2 border-b border-slate-100 flex items-center justify-between">
          <span className="text-[13px] font-medium text-slate-600">About Customer</span>
          <MoreVertical size={14} className="text-slate-400 cursor-pointer" />
        </div>

        <div className="p-5 space-y-6">
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedContact.name}`}
                alt="Profile"
                className="w-14 h-14 rounded-full bg-slate-100 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-6 h-6 border-2 border-white rounded-full overflow-hidden bg-white flex items-center justify-center shadow-sm">
                <img src="https://flagcdn.com/w20/us.png" alt="Flag" className="w-4" />
              </div>
            </div>
            <div>
              <h3 className="text-[18px] font-bold text-slate-900 leading-none">{selectedContact.name}</h3>
              <span className="text-[14px] text-slate-500 mt-1 block">Visitor 1234567</span>
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <label className="text-[13px] font-medium text-slate-400">Location</label>
              <div className="text-[14px] font-medium text-slate-900">Los Angeles, CA, United States</div>
            </div>

            <div className="space-y-1">
              <label className="text-[13px] font-medium text-slate-400">Email</label>
              <div className="text-[14px] font-medium text-slate-900">herrybrooks@gmail.com</div>
            </div>

            <div className="space-y-1">
              <label className="text-[13px] font-medium text-slate-400">Phone</label>
              <div className="text-[14px] font-medium text-slate-900">+1 123 456 7890</div>
            </div>

            <div className="space-y-1">
              <label className="text-[13px] font-medium text-slate-400">Contact Property</label>
              <div className="text-[14px] font-medium text-slate-900">+1 123 456 7890</div>
            </div>
          </div>
        </div>

        <div className="bg-[#f8f9fa] px-4 py-2 border-y border-slate-100">
          <span className="text-[13px] font-bold text-slate-500 uppercase tracking-tight">PREFERENCES</span>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between group cursor-pointer">
            <span className="text-[14px] font-medium text-slate-700">Number of occupants</span>
            <div className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Users size={16} />
              <span className="text-[14px]">1</span>
            </div>
          </div>
          <div className="flex items-center justify-between group cursor-pointer">
            <span className="text-[14px] font-medium text-slate-700">Pets?</span>
            <div className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors">
              <PawPrint size={16} />
              <span className="text-[14px]">Yes (Dog)</span>
            </div>
          </div>
          <div className="flex items-center justify-between group cursor-pointer">
            <span className="text-[14px] font-medium text-slate-700">Unit type</span>
            <div className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Building2 size={16} />
              <span className="text-[14px]">2BR</span>
            </div>
          </div>
          <div className="flex items-center justify-between group cursor-pointer">
            <span className="text-[14px] font-medium text-slate-700">Move-in date</span>
            <div className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Calendar size={16} />
              <span className="text-[14px]">Oct 1, 2024</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f8f9fa] px-4 py-2 border-y border-slate-100">
          <span className="text-[13px] font-bold text-slate-500 uppercase tracking-tight">PERSONAL</span>
        </div>
        <div className="p-5 space-y-4">
          <div className="flex items-center justify-between group cursor-pointer">
            <span className="text-[14px] font-medium text-slate-700">Employment status</span>
            <div className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors">
              <Briefcase size={16} />
              <span className="text-[14px]">Employed</span>
            </div>
          </div>
          <div className="flex items-center justify-between group cursor-pointer">
            <span className="text-[14px] font-medium text-slate-700">Monthly income</span>
            <div className="flex items-center gap-2 text-slate-400 hover:text-slate-600 transition-colors">
              <DollarSign size={16} />
              <span className="text-[14px]">$5k - $7.5k</span>
            </div>
          </div>
        </div>

        <div className="bg-[#f8f9fa] px-4 py-2 border-y border-slate-100">
          <span className="text-[13px] font-medium text-slate-600 uppercase tracking-tight">Last viewed page</span>
        </div>
        <div className="p-5 flex items-center justify-between">
          <span className="text-[14px] text-slate-700 font-medium">10 Jul 2024, 12:36 PM</span>
          <div className="bg-[#f04438] text-white text-[12px] font-bold px-3 py-1.5 rounded-lg shadow-sm">
            Live
          </div>
        </div>

        <div className="bg-[#f8f9fa] px-4 py-2 border-y border-slate-100">
          <span className="text-[13px] font-medium text-slate-600 uppercase tracking-tight">Notes</span>
        </div>
        <div className="p-5">
          <div className="bg-[#f8f9fa] rounded-xl border border-slate-200 p-4 min-h-[100px] cursor-text group hover:border-slate-300 transition-all">
            <textarea
              placeholder="Highly qualified lead from Zillow. Interested in unit 402."
              className="w-full bg-transparent border-none text-[14px] text-slate-600 placeholder:text-slate-400 focus:outline-none resize-none"
              rows={3}
            />
          </div>
        </div>
      </div>

      {/* Call Log Overlay */}
      {showCallLog && (
        <div className="fixed inset-0 z-[100] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-6 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white">
                  <Phone size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Call Transcript Log</h3>
                  <p className="text-xs text-slate-500 font-medium">Sept 12, 2024 • 4:22 duration</p>
                </div>
              </div>
              <button
                onClick={() => setShowCallLog(null)}
                className="p-2 hover:bg-slate-200 rounded-full transition-colors"
              >
                <X size={20} className="text-slate-400" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
              <div className="flex gap-4">
                <div className="text-[11px] font-black text-slate-400 tabular-nums pt-1">[0:00]</div>
                <div>
                  <div className="text-[12px] font-bold text-slate-900 uppercase tracking-tight">Voiceptionist</div>
                  <p className="text-[14px] text-slate-600 leading-relaxed italic">"Hello! Thank you for calling Skyline Lofts. I'm your digital assistant. How can I help you today?"</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[11px] font-black text-slate-400 tabular-nums pt-1">[0:12]</div>
                <div>
                  <div className="text-[12px] font-bold text-slate-400 uppercase tracking-tight">Marcus Thorne</div>
                  <p className="text-[14px] text-slate-900 leading-relaxed">"Hey, I have a massive leak in unit 402. Water is coming through the ceiling."</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[11px] font-black text-slate-400 tabular-nums pt-1">[0:25]</div>
                <div>
                  <div className="text-[12px] font-bold text-slate-900 uppercase tracking-tight">Voiceptionist</div>
                  <p className="text-[14px] text-slate-600 leading-relaxed italic">"I'm so sorry to hear that. I'm marking this as an emergency. Have you tried turning off the main water valve located behind the laundry unit?"</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-[11px] font-black text-slate-400 tabular-nums pt-1">[0:45]</div>
                <div>
                  <div className="text-[12px] font-bold text-slate-400 uppercase tracking-tight">Marcus Thorne</div>
                  <p className="text-[14px] text-slate-900 leading-relaxed">"Doing that now. Please send someone up."</p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 flex justify-end gap-3">
              <button
                onClick={() => setShowCallLog(null)}
                className="px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-xl shadow-lg hover:brightness-110 transition-all"
              >
                Close Log
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

// Internal X icon for the modal since Lucide-react wasn't imported with X specifically in the list
const X = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default Calls;