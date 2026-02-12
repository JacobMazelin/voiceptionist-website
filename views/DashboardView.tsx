
import React, { useState } from 'react';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import { useProperties } from '../hooks/useProperties';
import Sidebar from '../components/dashboard/Sidebar';
import Overview from './dashboard/Overview';
import Calls from './dashboard/Calls';
import Leads from './dashboard/Leads';
import Maintenance from './dashboard/Maintenance';
import Scheduling from './dashboard/Scheduling';
import Settings from './dashboard/Settings';
import CallDetail from './dashboard/CallDetail';
import PropertyDetail from './dashboard/PropertyDetail';
import AddProperty from './dashboard/AddProperty';
import Search from './dashboard/Search';
import SetupGuide from './dashboard/SetupGuide';
import RealTimeFeed from './dashboard/RealTimeFeed';
import Vendors from './dashboard/Vendors';
import VendorContractDetail from './dashboard/VendorContractDetail';
import Login from './dashboard/Login';
import { Plus, Building2, Search as SearchIcon, Settings as SettingsIcon } from 'lucide-react';

const DashboardShell: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const { properties, loading: propertiesLoading } = useProperties();
  const [activeTab, setActiveTab] = useState<string>('insights');
  const [selectedCallId, setSelectedCallId] = useState<string | null>(null);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [selectedRenewalId, setSelectedRenewalId] = useState<string | null>(null);
  const [isAddingProperty, setIsAddingProperty] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Login />;
  }

  const handleCallSelect = (id: string) => {};

  const handlePropertySelect = (id: string) => {
    setSelectedPropertyId(id);
  };

  const handleRenewalSelect = (id: string) => {
    setSelectedRenewalId(id);
  };

  const handleBackToInbox = () => {
    setSelectedCallId(null);
    setActiveTab('calls');
  };

  const handleBackToProperties = () => {
    setSelectedPropertyId(null);
    setIsAddingProperty(false);
    setActiveTab('properties');
  };

  const handleBackToVendors = () => {
    setSelectedRenewalId(null);
    setActiveTab('vendors');
  };

  const renderContent = () => {
    if (selectedCallId) {
      return <CallDetail callId={selectedCallId} onBack={handleBackToInbox} />;
    }

    if (isAddingProperty) {
      return <AddProperty onBack={handleBackToProperties} />;
    }

    if (selectedPropertyId) {
      return <PropertyDetail propertyId={selectedPropertyId} onBack={handleBackToProperties} />;
    }

    if (selectedRenewalId) {
      return <VendorContractDetail renewalId={selectedRenewalId} onClose={handleBackToVendors} />;
    }

    switch (activeTab) {
      case 'setup-guide': return <SetupGuide />;
      case 'search': return <Search />;
      case 'insights': return <Overview setActiveTab={setActiveTab} />;
      case 'realtime-feed': return <RealTimeFeed />;
      case 'calls': return <Calls onCallSelect={handleCallSelect} />;
      case 'leads': return <Leads />;
      case 'maintenance': return <Maintenance />;
      case 'scheduling': return <Scheduling />;
      case 'settings': return <Settings />;
      case 'vendors': return <Vendors onRenewalSelect={handleRenewalSelect} />;
      case 'properties': return (
        <div className="space-y-6 animate-in fade-in duration-500">
          <div className="mb-6 flex justify-between items-start">
            <div>
              <div className="text-[11px] font-medium text-slate-500 mb-1">Properties</div>
              <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Portfolio</h1>
            </div>
            <button
              onClick={() => setIsAddingProperty(true)}
              className="bg-slate-900 hover:bg-slate-800 text-white text-[13px] font-bold px-4 py-2 rounded-md transition-all shadow-sm flex items-center gap-2"
            >
              <Plus size={16} /> Add Property
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
            {propertiesLoading ? (
              <div className="col-span-full flex justify-center py-12">
                <div className="w-8 h-8 border-2 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
              </div>
            ) : properties.length === 0 ? (
              <div className="col-span-full text-center py-12 text-slate-400 text-sm">
                No properties found. Add your first property to get started.
              </div>
            ) : (
              properties.map((property) => (
                <div
                  key={property.id}
                  onClick={() => handlePropertySelect(property.id)}
                  className="bg-white border border-slate-200 rounded-lg p-6 shadow-sm hover:border-slate-400 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center text-slate-600 mb-4 group-hover:bg-slate-900 group-hover:text-[#abc2fe] transition-colors">
                    <Building2 size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{property.name}</h3>
                  <p className="text-sm text-slate-500 mb-4">{property.unitCount || 0} Units • {property.timezone}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${property.aiActive ? 'text-green-600' : 'text-slate-400'}`}>
                      {property.aiActive ? 'AI Active' : 'AI Paused'}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">View Details</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      );
      default: return <Overview setActiveTab={setActiveTab} />;
    }
  };

  const handleTabChange = (tab: string) => {
    setSelectedCallId(null);
    setSelectedPropertyId(null);
    setSelectedRenewalId(null);
    setIsAddingProperty(false);
    setActiveTab(tab);
  };

  const isInboxView = activeTab === 'calls' && !selectedCallId && !selectedPropertyId && !isAddingProperty && !selectedRenewalId;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f8fafc]">
      <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} onSignOut={signOut} userEmail={user?.email} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {isInboxView && (
          <header className="h-16 border-b border-slate-200 bg-white flex items-center justify-center px-6 shrink-0 relative">
            <div className="w-full max-w-xl relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input
                type="text"
                placeholder="Search through Live Chat conversations"
                className="w-full bg-slate-50 border border-slate-100 rounded-xl py-2 pl-12 pr-4 text-[13px] font-medium text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-200 transition-all"
              />
            </div>
            <button className="absolute right-6 text-slate-400 hover:text-slate-900 transition-colors">
              <SettingsIcon size={20} />
            </button>
          </header>
        )}

        <div className={`flex-1 overflow-y-auto ${isInboxView ? '' : 'p-8 max-w-7xl mx-auto w-full'}`}>
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const DashboardView: React.FC = () => {
  return (
    <AuthProvider>
      <DashboardShell />
    </AuthProvider>
  );
};

export default DashboardView;
