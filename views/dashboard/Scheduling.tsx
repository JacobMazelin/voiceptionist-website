import React, { useState, useRef } from 'react';
import { useScheduling } from '../../hooks/useScheduling';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Building2,
  CheckCircle2,
  AlertCircle,
  Plus,
  ChevronLeft,
  ChevronRight,
  Settings2,
  Upload,
  Apple,
  Mail,
  FileText
} from 'lucide-react';
import { BRAND_ACCENT } from '../../constants';


const Scheduling: React.FC = () => {
  const { tours, loading, error } = useScheduling();
  const [view, setView] = useState<'list' | 'calendar'>('list');
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const daysInMonth = 30;

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
          <p className="text-sm font-bold text-red-600 mb-2">Failed to load tours</p>
          <p className="text-xs text-slate-500">{error}</p>
        </div>
      </div>
    );
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const renderCalendar = () => {
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const hasTours = tours.filter(t => {
        // Match tours to calendar day
        const tourDate = new Date(t.date);
        return tourDate.getDate() === i;
      });
      days.push(
        <div key={i} className={`min-h-[100px] p-2 border-r border-b border-slate-100 bg-white hover:bg-slate-50 transition-colors group relative ${i === 12 ? 'ring-1 ring-inset ring-slate-900' : ''}`}>
          <span className={`text-xs font-bold ${i === 12 ? 'bg-slate-900 text-white w-5 h-5 flex items-center justify-center rounded-full' : 'text-slate-400'}`}>
            {i}
          </span>
          <div className="mt-1 space-y-1">
            {hasTours.map(tour => (
              <div key={tour.id} className={`text-[9px] px-1.5 py-0.5 rounded font-bold truncate ${tour.status === 'Proposed' || tour.status === 'proposed' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-900 border border-slate-200'}`}>
                {tour.time} - {tour.leadName.split(' ')[0]}
              </div>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-300">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            September 2024
          </h3>
          <div className="flex gap-2">
            <button className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500"><ChevronLeft size={16} /></button>
            <button className="p-1.5 hover:bg-slate-100 rounded-md text-slate-500"><ChevronRight size={16} /></button>
          </div>
        </div>
        <div className="grid grid-cols-7 bg-slate-50 border-b border-slate-200">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map(day => (
            <div key={day} className="py-2 text-center text-[10px] font-bold text-slate-400 tracking-widest border-r border-slate-200 last:border-r-0">{day}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 border-l border-t border-slate-100">
          {days}
        </div>
      </div>
    );
  };

  const renderListView = () => (
    <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-300">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
        <h3 className="font-bold text-slate-900">Showing Pipeline</h3>
      </div>
      <div className="divide-y divide-slate-100">
        {tours.map((tour) => (
          <div key={tour.id} className="p-5 hover:bg-slate-50 transition-colors flex items-center justify-between group">
            <div className="flex gap-4 items-start">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${tour.status === 'Proposed' || tour.status === 'proposed' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                {tour.status === 'Proposed' || tour.status === 'proposed' ? <Clock size={20} /> : <CalendarIcon size={20} />}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-900">{tour.leadName}</span>
                </div>
                <div className="flex items-center gap-3 mt-1">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Building2 size={12} /> {tour.propertyName}
                  </div>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className={`text-[10px] font-bold uppercase tracking-widest ${tour.status === 'Proposed' || tour.status === 'proposed' ? 'text-amber-500' : 'text-green-600'}`}>
                {tour.status}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      <div className="mb-6 flex justify-between items-start">
        <div>
          <div className="text-[11px] font-medium text-slate-500 mb-1">Scheduling</div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Calendar</h1>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex bg-white border border-slate-200 rounded-xl p-1 shadow-sm">
            <button
              onClick={() => setView('list')}
              className={`px-8 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${view === 'list' ? 'bg-[#0f172a] text-white shadow-lg' : 'text-[#0f172a] hover:bg-slate-50'}`}
            >
              List
            </button>
            <button
              onClick={() => setView('calendar')}
              className={`px-8 py-2 text-sm font-bold rounded-lg transition-all duration-200 ${view === 'calendar' ? 'bg-[#0f172a] text-white shadow-lg' : 'text-[#0f172a] hover:bg-slate-50'}`}
            >
              Calendar
            </button>
          </div>
          <button className={`flex items-center gap-2 px-6 py-2.5 ${BRAND_ACCENT} rounded-md text-sm font-bold text-slate-900 shadow-sm hover:brightness-95 transition-all`}>
            <Plus size={16} /> Book Manually
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        {view === 'list' ? renderListView() : renderCalendar()}
      </div>
    </div>
  );
};

export default Scheduling;