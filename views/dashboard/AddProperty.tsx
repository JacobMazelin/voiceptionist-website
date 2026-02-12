
import React, { useState } from 'react';
import {
  X,
  Save,
  Plus,
  Trash2,
  Upload,
  FileText,
  DollarSign
} from 'lucide-react';

import { useProperties } from '../../hooks/useProperties';

interface AddPropertyProps {
  onBack: () => void;
}

const AddProperty: React.FC<AddPropertyProps> = ({ onBack }) => {
  const { addProperty } = useProperties();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [property, setProperty] = useState({
    name: '',
    address: '',
    units: 0,
    targetOccupancy: '95%',
    avgRent: '',
    vacancies: [
      { unit: '101', type: 'Studio', status: 'Available', rent: '$1,800' }
    ],
    bylaws: [],
    aiInstructions: [
      "Greet residents by name if recognized from the phone number.",
      "Always mention the current move-in special: $500 off first month."
    ]
  });

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    try {
      // Construct knowledge text from various fields since DB schema is minimal
      const knowledgeParts = [];
      if (property.address) knowledgeParts.push(`Property Address: ${property.address}`);
      if (property.units) knowledgeParts.push(`Total Units: ${property.units}`);
      if (property.avgRent) knowledgeParts.push(`Average Rent: ${property.avgRent}`);
      if (property.targetOccupancy) knowledgeParts.push(`Target Occupancy: ${property.targetOccupancy}`);

      // Add vacancies to knowledge
      if (property.vacancies.length > 0) {
        knowledgeParts.push('\nCurrent Vacancies:');
        property.vacancies.forEach(v => {
          knowledgeParts.push(`- Unit ${v.unit} (${v.type}): ${v.rent}, Status: ${v.status}`);
        });
      }

      // Add custom AI instructions
      if (property.aiInstructions.length > 0) {
        knowledgeParts.push('\nInstructions:');
        knowledgeParts.push(...property.aiInstructions);
      }

      await addProperty({
        name: property.name,
        timezone: 'America/New_York', // Defaulting for now
        applicationUrl: '',
        knowledgeText: knowledgeParts.join('\n'),
        tourInstructions: ''
      });

      onBack();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create property');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
      <div className="flex items-center justify-between sticky top-0 bg-[#f8fafc]/80 backdrop-blur-md py-6 z-20 border-b border-slate-100 -mx-8 px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all text-slate-400 hover:text-slate-900"
          >
            <X size={24} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Add New Property</h1>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Portfolio Expansion</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={onBack}
            className="px-6 py-2.5 bg-white border border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-50 transition-all text-sm"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className={`px-8 py-2.5 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:brightness-110 transition-all text-sm flex items-center gap-2 disabled:opacity-50`}
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <><Save size={16} /> Create Property</>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mx-auto max-w-4xl mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-bold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Main Form Area */}
        <div className="md:col-span-2 space-y-12">
          <section className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">General Information</h3>
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Property Name</label>
                <input
                  type="text"
                  placeholder="e.g. Skyline Lofts"
                  value={property.name}
                  onChange={(e) => setProperty({ ...property, name: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-slate-900 focus:ring-0 transition-all shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Street Address</label>
                <input
                  type="text"
                  placeholder="Street, City, Zip"
                  value={property.address}
                  onChange={(e) => setProperty({ ...property, address: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-slate-900 focus:ring-0 transition-all shadow-sm"
                />
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Financials & Targets</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Total Units</label>
                <input
                  type="number"
                  value={property.units}
                  onChange={(e) => setProperty({ ...property, units: parseInt(e.target.value) || 0 })}
                  className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-slate-900 focus:ring-0 transition-all shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Target Occupancy</label>
                <input
                  type="text"
                  value={property.targetOccupancy}
                  onChange={(e) => setProperty({ ...property, targetOccupancy: e.target.value })}
                  className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-slate-900 focus:ring-0 transition-all shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700">Base Average Rent</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-slate-400">
                    <DollarSign size={14} />
                  </div>
                  <input
                    type="text"
                    placeholder="2,850"
                    value={property.avgRent}
                    onChange={(e) => setProperty({ ...property, avgRent: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-slate-900 focus:ring-0 transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Initial Unit Inventory</h3>
              <button className="text-[10px] font-black text-slate-900 hover:underline flex items-center gap-1 uppercase tracking-tight">
                <Plus size={12} /> Add Unit
              </button>
            </div>
            <div className="space-y-3">
              {property.vacancies.map((v, i) => (
                <div key={i} className="flex items-center gap-4 p-4 bg-white border border-slate-200 rounded-2xl group shadow-sm">
                  <div className="w-12 text-sm font-bold text-slate-900">#{v.unit}</div>
                  <div className="flex-1 grid grid-cols-2 gap-4">
                    <select className="bg-slate-50 border-none rounded-lg text-xs font-bold text-slate-700 p-2">
                      <option>{v.type}</option>
                      <option>Studio</option>
                      <option>1BR</option>
                      <option>2BR</option>
                    </select>
                    <input type="text" value={v.rent} className="bg-slate-50 border-none rounded-lg text-xs font-bold text-slate-700 p-2 text-right" />
                  </div>
                  <button className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* AI Sidebar */}
        <div className="space-y-12">
          <section className="space-y-6">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">AI Knowledge Base</h3>
            <div className="space-y-4">
              <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center group hover:border-slate-900 hover:bg-slate-50/50 transition-all cursor-pointer">
                <Upload size={24} className="text-slate-300 group-hover:text-slate-900 mb-2" />
                <div className="text-xs font-bold text-slate-900">Upload Knowledge Doc</div>
                <div className="text-[10px] text-slate-400 mt-1 uppercase">PDF, TXT, DOCX</div>
              </div>
              <p className="text-[10px] text-slate-400 italic text-center">
                AI uses these documents to answer resident and lead questions.
              </p>
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Custom Instructions</h3>
            </div>
            <div className="space-y-4">
              {property.aiInstructions.map((insight, i) => (
                <div key={i} className="relative group">
                  <textarea
                    className="w-full bg-slate-50 border border-slate-100 rounded-xl p-4 text-xs font-medium text-slate-600 focus:outline-none focus:bg-white focus:border-slate-900 transition-all leading-relaxed"
                    rows={2}
                    defaultValue={insight}
                  />
                  <button className="absolute top-2 right-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 size={12} />
                  </button>
                </div>
              ))}
              <button className="w-full py-3 border border-slate-200 border-dashed rounded-xl text-[10px] font-black text-slate-400 hover:text-slate-900 hover:border-slate-900 uppercase tracking-widest transition-all">
                Add New Custom Prompt
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AddProperty;
