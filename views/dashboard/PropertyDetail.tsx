
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  Building2, 
  MapPin, 
  Users, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  FileText, 
  ShieldCheck, 
  Info, 
  LayoutGrid, 
  Plus,
  ArrowUpRight,
  Sparkles,
  Search,
  CheckCircle2,
  Save,
  Trash2,
  X,
  Upload
} from 'lucide-react';
import { BRAND_ACCENT } from '../../constants';
import { useProperties } from '../../hooks/useProperties';

interface PropertyDetailProps {
  propertyId: string;
  onBack: () => void;
}

const PropertyDetail: React.FC<PropertyDetailProps> = ({ propertyId, onBack }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { properties, loading: propertiesLoading } = useProperties();

  const realProperty = properties.find(p => p.id === propertyId);

  const [property, setProperty] = useState({
    name: '',
    address: '',
    units: 0,
    occupancy: '--',
    revenue: '--',
    budget: '--',
    activeTours: 0,
    avgRent: '--',
    targetOccupancy: '--',
    vacancies: [] as { unit: string; type: string; status: string; rent: string }[],
    bylaws: [] as { name: string; size: string; updated: string }[],
    aiInsights: [] as string[],
  });

  // Sync real property data when loaded
  React.useEffect(() => {
    if (realProperty) {
      setProperty(prev => ({
        ...prev,
        name: realProperty.name,
        address: realProperty.timezone || '',
        units: realProperty.unitCount || 0,
      }));
    }
  }, [realProperty]);

  const handleSave = () => {
    setIsEditing(false);
  };

  if (propertiesLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (isEditing) {
    return (
      <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
        <div className="flex items-center justify-between sticky top-0 bg-[#f8fafc]/80 backdrop-blur-md py-6 z-20 border-b border-slate-100 -mx-8 px-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsEditing(false)}
              className="p-2 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all text-slate-400 hover:text-slate-900"
            >
              <X size={24} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Edit {property.name}</h1>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">Configuration Panel</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={() => setIsEditing(false)}
              className="px-6 py-2.5 bg-white border border-slate-200 text-slate-500 font-bold rounded-xl hover:bg-slate-50 transition-all text-sm"
            >
              Discard Changes
            </button>
            <button 
              onClick={handleSave}
              className={`px-8 py-2.5 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:brightness-110 transition-all text-sm flex items-center gap-2`}
            >
              <Save size={16} /> Save Changes
            </button>
          </div>
        </div>

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
                    value={property.name} 
                    onChange={(e) => setProperty({...property, name: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-slate-900 focus:ring-0 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Street Address</label>
                  <input 
                    type="text" 
                    value={property.address} 
                    onChange={(e) => setProperty({...property, address: e.target.value})}
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-slate-900 focus:ring-0 transition-all shadow-sm"
                  />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">Portfolio Metrics</h3>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Total Units</label>
                  <input 
                    type="number" 
                    value={property.units} 
                    className="w-full bg-white border border-slate-200 rounded-xl py-3 px-4 text-sm font-medium focus:outline-none focus:border-slate-900 focus:ring-0 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Target Occupancy</label>
                  <input 
                    type="text" 
                    value={property.targetOccupancy} 
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
                      value={property.avgRent.replace('$', '')} 
                      className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm font-medium focus:outline-none focus:border-slate-900 focus:ring-0 transition-all shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit Inventory</h3>
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

          {/* AI Settings / Knowledge Base */}
          <div className="space-y-12">
            <section className="space-y-6">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">AI Knowledge Base</h3>
              <div className="space-y-4">
                <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center text-center group hover:border-slate-900 hover:bg-slate-50/50 transition-all cursor-pointer">
                  <Upload size={24} className="text-slate-300 group-hover:text-slate-900 mb-2" />
                  <div className="text-xs font-bold text-slate-900">Upload Knowledge Doc</div>
                  <div className="text-[10px] text-slate-400 mt-1 uppercase">PDF, TXT, DOCX</div>
                </div>
                <div className="space-y-2">
                  {property.bylaws.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl group">
                      <div className="flex items-center gap-3">
                        <FileText size={16} className="text-slate-400" />
                        <span className="text-[11px] font-bold text-slate-700 truncate max-w-[120px]">{doc.name}</span>
                      </div>
                      <button className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="space-y-6">
               <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">AI Instructions</h3>
                  <button className="text-[10px] font-black text-slate-400 hover:text-slate-900 transition-colors uppercase">Clear All</button>
               </div>
               <div className="space-y-4">
                  {property.aiInsights.map((insight, i) => (
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
                    Add New Logic Rule
                  </button>
               </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-right-8 duration-600 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBack}
            className="p-2 hover:bg-white border border-transparent hover:border-slate-200 rounded-xl transition-all text-slate-400 hover:text-slate-900"
          >
            <ChevronLeft size={24} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{property.name}</h1>
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-black uppercase tracking-widest rounded-full border border-green-200">
                AI Active
              </span>
            </div>
            <p className="text-slate-500 font-medium text-sm flex items-center gap-1">
              <MapPin size={14} /> {property.address}
            </p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-white border border-slate-200 text-slate-900 font-bold rounded-xl hover:bg-slate-50 transition-all text-sm flex items-center gap-2">
            <Plus size={16} /> New Vacancy
          </button>
          <button 
            onClick={() => setIsEditing(true)}
            className={`px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:brightness-110 transition-all text-sm flex items-center gap-2`}
          >
            Edit Property
          </button>
        </div>
      </div>

      {/* Stats Grid - Ramp Style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Units', value: property.units ? property.units.toString() : '--', sub: 'Configured', icon: <Users size={18} /> },
          { label: 'AI Status', value: 'Active', sub: 'Monitoring calls', icon: <ShieldCheck size={18} /> },
          { label: 'Knowledge Base', value: property.bylaws.length.toString(), sub: 'Documents', icon: <FileText size={18} /> },
          { label: 'Active Tours', value: property.activeTours.toString(), sub: 'Scheduled', icon: <Calendar size={18} /> },
        ].map((stat) => (
          <div key={stat.label} className="p-6 bg-white border border-slate-200 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
              <div className="text-slate-300">{stat.icon}</div>
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-[10px] font-bold text-slate-400 mt-1">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Col (2/3) */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Vacancy Map / Floorplan View */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/30">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-widest">Unit Inventory & Availability</h3>
              <div className="flex gap-2">
                 <button className="px-3 py-1 bg-white border border-slate-200 rounded text-[10px] font-bold uppercase tracking-tight shadow-sm">Map View</button>
                 <button className="px-3 py-1 bg-slate-900 text-white rounded text-[10px] font-bold uppercase tracking-tight shadow-sm">Grid View</button>
              </div>
            </div>
            <div className="p-6 overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-100">
                    <th className="pb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Unit</th>
                    <th className="pb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                    <th className="pb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                    <th className="pb-3 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Rent</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {property.vacancies.map((v) => (
                    <tr key={v.unit} className="hover:bg-slate-50 transition-colors group">
                      <td className="py-4 text-sm font-bold text-slate-900">#{v.unit}</td>
                      <td className="py-4 text-xs font-medium text-slate-500">{v.type}</td>
                      <td className="py-4">
                        <span className={`px-2 py-0.5 text-[10px] font-black rounded uppercase tracking-tighter ${
                          v.status === 'Available' ? 'bg-green-50 text-green-600' : 'bg-slate-100 text-slate-400'
                        }`}>
                          {v.status}
                        </span>
                      </td>
                      <td className="py-4 text-right text-sm font-bold text-slate-900">{v.rent}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Knowledge Base / Bylaws */}
          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50/30 flex justify-between items-center">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-widest">AI Knowledge Base (Bylaws)</h3>
              <button className="text-[10px] font-black text-slate-400 hover:text-slate-900 uppercase">Upload Doc</button>
            </div>
            <div className="divide-y divide-slate-100">
              {property.bylaws.map((doc, i) => (
                <div key={i} className="p-6 flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-[#abc2fe] group-hover:text-slate-900 transition-colors">
                      <FileText size={20} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{doc.name}</div>
                      <div className="text-[10px] text-slate-500 font-medium uppercase">{doc.size} • Updated {doc.updated}</div>
                    </div>
                  </div>
                  <button className="text-slate-400 hover:text-slate-900 transition-colors">
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col (1/3) */}
        <div className="space-y-8">
          
          {/* AI Performance Insights */}
          <div className="bg-slate-900 rounded-2xl p-8 text-white relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-[#abc2fe] rounded-lg flex items-center justify-center text-slate-900">
                  <Sparkles size={16} />
                </div>
                <h3 className="text-sm font-black text-white uppercase tracking-widest">Building Intelligence</h3>
              </div>
              <div className="space-y-4">
                {property.aiInsights.map((insight, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <div className="w-1 h-1 rounded-full bg-[#abc2fe] mt-2 shrink-0"></div>
                    <p className="text-sm text-slate-400 font-medium leading-relaxed">{insight}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#abc2fe] opacity-[0.05] blur-[100px] -mr-32 -mt-32"></div>
          </div>

          {/* Property Profile */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-6">Property Profile</h3>
            <div className="space-y-5">
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-tighter text-[10px]">Total Units</div>
                <span className="text-sm font-bold text-slate-900">{property.units || '--'}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-slate-50">
                <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-tighter text-[10px]">Timezone</div>
                <span className="text-sm font-bold text-slate-900">{property.address || '--'}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <div className="flex items-center gap-2 text-slate-400 font-bold uppercase tracking-tighter text-[10px]">AI Status</div>
                <span className="text-sm font-bold text-green-600">Active</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
