
import React from 'react';
import { ChevronLeft, Phone, MessageSquare, Calendar, User, Mail, DollarSign, Clock, CheckCircle2, MoreHorizontal, Sparkles, Building2, PawPrint, FileText, Send, Paperclip } from 'lucide-react';
import { BRAND_ACCENT } from '../../constants';
import { InteractionType } from '../../types';

interface CallDetailProps {
  callId: string;
  onBack: () => void;
}

const CallDetail: React.FC<CallDetailProps> = ({ callId, onBack }) => {
  // Mock logic to handle different interaction types
  const interactionType: InteractionType = callId === '3' ? 'sms' : 'call';
  
  const contact = {
    name: interactionType === 'sms' ? 'Marcus Thorne' : 'James Wilson',
    phone: interactionType === 'sms' ? '+1 (555) 123-9999' : '+1 (555) 012-3456',
    email: interactionType === 'sms' ? 'm.thorne@gmail.com' : 'j.wilson@example.com',
    status: interactionType === 'sms' ? 'Existing Resident' : 'Qualified Lead',
    score: interactionType === 'sms' ? 'Medium' : 'Hot',
    property: 'Skyline Lofts',
    timestamp: 'Sept 12, 2:14 PM',
    summary: interactionType === 'sms' 
      ? 'Resident inquiring about package room holiday hours. AI provided the code and confirmed hours for Labor Day.'
      : 'Prospect motivated to move by Oct 1st. Budget $2500 for a 2BR. AI confirmed availability and booked a tour.',
    qualification: {
      budget: '$2,500',
      moveIn: 'Oct 1, 2024',
      unitType: '2 Bedroom',
      pets: 'Yes (1 Dog)',
      timeline: 'High Urgency'
    }
  };

  const smsMessages = [
    { sender: 'resident', text: 'Hey, does the package room close early for Labor Day?', time: '2:10 PM' },
    { sender: 'ai', text: 'Hi Marcus! The package room at Skyline Lofts will be accessible via your key fob until 8 PM on Monday. Regular 24/7 access resumes Tuesday. Need anything else?', time: '2:11 PM' },
    { sender: 'resident', text: 'Perfect, thanks. What was the entrance code again?', time: '2:12 PM' },
    { sender: 'ai', text: 'The current keypad code is 4421#. Happy Labor Day!', time: '2:12 PM' },
  ];

  const callTimeline = [
    { time: '0:00', event: 'Call started', detail: 'AI initiated greeting.' },
    { time: '0:35', event: 'Qualifying Info', detail: 'Collected budget ($2500) and move-in date (Oct 1).' },
    { time: '1:10', event: 'Tour Scheduled', detail: 'Confirmed Sat 11:00 AM agent-led tour.' },
    { time: '1:24', event: 'Call Ended', detail: 'Confirmation SMS dispatched.' }
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-500 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <button onClick={onBack} className="p-2.5 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all text-slate-400 hover:text-slate-900">
            <ChevronLeft size={24} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{contact.name}</h1>
              <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest rounded border ${
                contact.score === 'Hot' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-slate-50 text-slate-500 border-slate-100'
              }`}>
                {contact.score}
              </span>
            </div>
            <p className="text-slate-500 font-medium text-sm mt-1">{contact.status} • {contact.timestamp}</p>
          </div>
        </div>
        <div className="flex gap-3">
          {interactionType === 'call' ? (
            <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all text-sm flex items-center gap-2">
              <MessageSquare size={16} /> Send SMS
            </button>
          ) : (
            <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all text-sm flex items-center gap-2">
              <Phone size={16} /> Call Now
            </button>
          )}
          <button className={`px-6 py-2.5 ${BRAND_ACCENT} text-slate-900 font-bold rounded-xl shadow-lg hover:brightness-105 transition-all text-sm flex items-center gap-2`}>
            Update Status
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* AI Summary Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-[#abc2fe]">
                  <Sparkles size={20} />
                </div>
                <h3 className="text-[10px] font-black text-slate-900 uppercase tracking-widest">AI Intelligence Summary</h3>
              </div>
              <p className="text-xl text-slate-700 font-medium leading-relaxed italic max-w-2xl">
                "{contact.summary}"
              </p>
            </div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#abc2fe] opacity-[0.03] blur-[100px] -mr-48 -mt-48"></div>
          </div>

          {/* Interaction Body (Timeline or SMS) */}
          <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm min-h-[400px] flex flex-col">
            <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
              <h3 className="font-black text-slate-900 uppercase tracking-widest text-[10px]">
                {interactionType === 'call' ? 'Call Evolution' : 'SMS Thread'}
              </h3>
              {interactionType === 'call' && (
                <button className="text-[10px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase flex items-center gap-2">
                  <FileText size={14} /> Full Transcript
                </button>
              )}
            </div>

            {interactionType === 'call' ? (
              <div className="p-10 space-y-10 flex-1">
                {callTimeline.map((item, i) => (
                  <div key={i} className="flex gap-8 group">
                    <div className="flex flex-col items-center shrink-0 pt-1">
                      <div className="w-3 h-3 rounded-full bg-slate-900 ring-4 ring-slate-50 border-2 border-white"></div>
                      {i !== callTimeline.length - 1 && <div className="w-[1px] flex-1 bg-slate-100 my-2"></div>}
                    </div>
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[10px] font-black text-slate-400 tabular-nums">[{item.time}]</span>
                        <span className="text-sm font-bold text-slate-900 uppercase tracking-tight">{item.event}</span>
                      </div>
                      <p className="text-[13px] text-slate-500 font-medium">{item.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col h-full flex-1">
                <div className="p-8 space-y-6 flex-1 overflow-y-auto max-h-[400px]">
                  {smsMessages.map((msg, i) => (
                    <div key={i} className={`flex flex-col ${msg.sender === 'ai' ? 'items-start' : 'items-end'}`}>
                      <div className={`max-w-[75%] p-4 rounded-2xl text-sm font-medium ${
                        msg.sender === 'ai' 
                          ? 'bg-slate-900 text-white rounded-tl-none' 
                          : 'bg-slate-100 text-slate-700 rounded-tr-none'
                      }`}>
                        {msg.text}
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase">{msg.time}</span>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-slate-100 bg-white">
                  <div className="flex gap-3 bg-slate-50 p-2 rounded-2xl border border-slate-200">
                    <button className="p-2 text-slate-400 hover:text-slate-900"><Paperclip size={20} /></button>
                    <input type="text" placeholder="Type a message..." className="bg-transparent border-none flex-1 text-sm font-medium focus:ring-0" />
                    <button className={`p-2 ${BRAND_ACCENT} text-slate-900 rounded-xl`}><Send size={20} /></button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Contact Info</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400"><User size={24} /></div>
                <div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Name</div>
                  <div className="text-sm font-bold text-slate-900">{contact.name}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400"><Phone size={24} /></div>
                <div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Phone</div>
                  <div className="text-sm font-bold text-slate-900">{contact.phone}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400"><Mail size={24} /></div>
                <div>
                  <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Email</div>
                  <div className="text-sm font-bold text-slate-900 truncate max-w-[140px]">{contact.email}</div>
                </div>
              </div>
            </div>
            <button className="w-full mt-10 py-3.5 bg-slate-50 text-slate-900 text-[10px] font-black rounded-2xl hover:bg-slate-100 border border-slate-100 uppercase tracking-widest transition-all">
              View CRM Profile
            </button>
          </div>

          {interactionType === 'call' && (
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-8">Qualification</h3>
              <div className="space-y-6">
                {[
                  { label: 'Budget', val: contact.qualification.budget, icon: <DollarSign size={14} /> },
                  { label: 'Move-In', val: contact.qualification.moveIn, icon: <Calendar size={14} /> },
                  { label: 'Unit', val: contact.qualification.unitType, icon: <Building2 size={14} /> },
                  { label: 'Pets', val: contact.qualification.pets, icon: <PawPrint size={14} /> },
                ].map((q, idx) => (
                  <div key={idx} className="flex justify-between items-center pb-2 border-b border-slate-50 last:border-0">
                    <div className="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-widest">{q.icon}{q.label}</div>
                    <span className="text-sm font-bold text-slate-900">{q.val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CallDetail;
