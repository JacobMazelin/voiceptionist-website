
import React, { useState, useEffect } from 'react';
import { 
  ChevronDown, Menu, X, CreditCard, PieChart, FileText, ShoppingCart, Globe, Briefcase, 
  Settings, Database, MessageSquare, Code, Terminal, Home, Store, Users, Building2, 
  Laptop, Pickaxe, FlaskConical, Stethoscope, GraduationCap, ShoppingBag, Landmark, 
  Calculator, Handshake, Calendar, RefreshCcw, BookOpen, TrendingUp, BarChart, 
  Newspaper, UserPlus, Rocket, HelpCircle, Tablet, ArrowRight
} from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: any, newTab?: boolean) => void;
  currentView: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10 || (currentView !== 'home' && currentView !== 'customers'));
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const products = [
    { icon: <CreditCard size={18} />, title: '24/7 Availability', desc: 'Captures every inbound call, even after hours' },
    { icon: <PieChart size={18} />, title: 'Lead Qualification', desc: 'Turn inquiries into booked tours.' },
    { icon: <FileText size={18} />, title: 'Tour Scheduling', desc: 'Convert calls into showings.' },
    { icon: <ShoppingCart size={18} />, title: 'Resident Support', desc: 'Handle maintenance & emergencies.' },
    { icon: <Globe size={18} />, title: 'SMS Follow-Ups', desc: 'Recover missed calls with text.' },
    { icon: <Briefcase size={18} />, title: 'Multi-Property Coverage', desc: 'Scale your entire portfolio' },
  ];

  const platform = [
    { icon: <Settings size={18} />, title: 'Integrations', desc: 'Connect to your leasing stack.' },
    { icon: <Database size={18} />, title: 'Reporting', desc: 'Get full visibility in real-time.' },
    { icon: <MessageSquare size={18} />, title: 'Chat Analytics', desc: 'See what converts and why.' },
    { icon: <Globe size={18} />, title: 'Routing & Workflows', desc: 'Escalate urgent issues automatically.' },
    { icon: <Terminal size={18} />, title: 'Intelligence', desc: 'Put AI to work for you.' },
    { icon: <Code size={18} />, title: 'Admin Roles', desc: 'Control who can change what.' },
  ];

  const solutionsBySize = [
    { icon: <Home size={18} />, title: 'Single-Property', desc: 'Everything you need, fast.' },
    { icon: <Store size={18} />, title: 'Multifamily', desc: 'Never miss a lead. Automate tours, FAQs, and follow-ups.' },
    { icon: <Users size={18} />, title: 'HOAs & Managers', desc: 'Triage resident issues and route emergencies instantly.' },
    { icon: <Building2 size={18} />, title: 'Enterprise', desc: 'Go global and scale up operations.' },
  ];

  const solutionsByIndustry = [
    { icon: <Laptop size={18} />, title: 'Technology' },
    { icon: <Pickaxe size={18} />, title: 'Construction' },
    { icon: <FlaskConical size={18} />, title: 'Life sciences' },
    { icon: <Stethoscope size={18} />, title: 'Healthcare' },
    { icon: <GraduationCap size={18} />, title: 'Education' },
    { icon: <ShoppingBag size={18} />, title: 'Retail' },
    { icon: <Landmark size={18} />, title: 'Government' },
  ];

  const solutionsByPartner = [
    { icon: <Calculator size={18} />, title: 'Accounting firms' },
    { icon: <Landmark size={18} />, title: 'Private equity' },
    { icon: <Users size={18} />, title: 'Venture capital' },
    { icon: <Handshake size={18} />, title: 'Services providers' },
    { icon: <Code size={18} />, title: 'Technology partners' },
  ];

  const resourcesDiscover = [
    { icon: <Calendar size={18} />, title: 'Events & Webinars', desc: 'Live and on-demand.' },
    { icon: <RefreshCcw size={18} />, title: 'Product updates', desc: 'Every new feature, fix, and improvement.' },
    { icon: <Laptop size={18} />, title: 'Blog', desc: 'What we\'re building.' },
    { icon: <TrendingUp size={18} />, title: 'Velocity', desc: 'Finance stories and strategies.' },
    { icon: <BarChart size={18} />, title: 'Voice AI Lab', desc: 'Insights from Voiceptionist data.' },
    { icon: <FileText size={18} />, title: 'Reports', desc: 'In-depth research.' },
  ];

  const resourcesConnect = [
    { icon: <Newspaper size={18} />, title: 'Newsroom', desc: 'News and announcements.' },
    { icon: <UserPlus size={18} />, title: 'Become a partner', desc: 'Explore our partner programs.' },
    { icon: <Users size={18} />, title: 'Community', desc: 'Ask questions and connect with users.' },
    { icon: <Briefcase size={18} />, title: 'Careers', desc: 'Build with us.' },
  ];

  const resourcesGetStarted = [
    { icon: <RefreshCcw size={18} />, title: 'Switch to Voiceptionist', desc: 'Why make the switch.' },
    { icon: <HelpCircle size={18} />, title: 'Help center', desc: 'Product guides and answers.' },
    { icon: <Tablet size={18} />, title: 'Onboarding & training', desc: 'Learn to use Voiceptionist.' },
    { icon: <Rocket size={18} />, title: 'Growth tools', desc: 'Free tools to scale fast.' },
  ];

  const navItems = [
    { label: 'Products', hasDropdown: true, view: null },
    { label: 'Solutions', hasDropdown: true, view: null },
    { label: 'Customers', hasDropdown: false, view: 'customers' },
    { label: 'Resources', hasDropdown: true, view: null },
    { label: 'Pricing', hasDropdown: false, view: 'pricing' },
    { label: 'Company', hasDropdown: false, view: 'explore' },
  ];

  const getDropdownClass = (label: string) => {
    const isActive = activeDropdown === label;
    return `absolute top-20 left-1/2 -translate-x-1/2 bg-white rounded-[32px] shadow-[0_40px_100px_rgba(0,0,0,0.12)] border border-gray-100 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] origin-top ${
      isActive 
        ? 'opacity-100 translate-y-0 visible pointer-events-auto scale-100' 
        : 'opacity-0 -translate-y-4 invisible pointer-events-none scale-[0.98]'
    } text-black z-50 overflow-hidden`;
  };

  const handleNavClick = (item: any) => {
    if (item.hasDropdown) {
      setActiveDropdown(activeDropdown === item.label ? null : item.label);
    } else {
      onNavigate(item.view || 'explore');
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/35 backdrop-blur-[32px] shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] border-b border-white/45 text-black' : 'bg-transparent text-white'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        <div className="flex items-center space-x-12">
          <div onClick={() => onNavigate('home')} className="flex items-center cursor-pointer group">
             <span className="text-2xl font-bold tracking-tighter">voiceptionist</span>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <div 
                key={item.label}
                className="h-20 flex items-center"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => handleNavClick(item)}
                  className={`flex items-center space-x-1.5 text-[15px] font-medium px-4 py-2.5 rounded-xl transition-all duration-300 ${
                    activeDropdown === item.label || (item.view && currentView === item.view)
                    ? 'bg-[#cfdcfc] text-black shadow-sm'
                    : 'hover:bg-[#cfdcfc] hover:text-black'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown 
                      size={14} 
                      className={`transition-transform duration-300 ${activeDropdown === item.label ? 'rotate-180' : ''}`} 
                    />
                  )}
                </button>

                {/* Products Dropdown */}
                {item.label === 'Products' && (
                   <div 
                    onClick={() => setActiveDropdown(null)}
                    className={`${getDropdownClass('Products')} w-[1000px] p-10 grid grid-cols-12 gap-8`}
                  >
                     <div className="col-span-8 grid grid-cols-2 gap-x-12 gap-y-10">
                       <div className="space-y-8">
                         <h4 className="text-gray-500 font-bold text-[11px] uppercase tracking-widest">Products</h4>
                         <div className="space-y-7">
                           {products.map(p => (
                             <div key={p.title} onClick={() => onNavigate('explore')} className="flex items-start space-x-4 group/item cursor-pointer">
                               <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-700 group-hover/item:bg-[#abc2fe] group-hover/item:text-black transition-colors shrink-0">{p.icon}</div>
                               <div>
                                 <p className="font-bold text-[15px] text-gray-900 leading-tight mb-1">{p.title}</p>
                                 <p className="text-[13px] text-gray-600 leading-snug">{p.desc}</p>
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>
                       <div className="space-y-8">
                         <h4 className="text-gray-500 font-bold text-[11px] uppercase tracking-widest">Platform</h4>
                         <div className="space-y-7">
                           {platform.map(p => (
                             <div key={p.title} onClick={() => onNavigate('explore')} className="flex items-start space-x-4 group/item cursor-pointer">
                               <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-700 group-hover/item:bg-[#abc2fe] group-hover/item:text-black transition-colors shrink-0">{p.icon}</div>
                               <div>
                                 <p className="font-bold text-[15px] text-gray-900 leading-tight mb-1">{p.title}</p>
                                 <p className="text-[13px] text-gray-600 leading-snug">{p.desc}</p>
                               </div>
                             </div>
                           ))}
                         </div>
                       </div>
                     </div>
                     <div className="col-span-4 bg-gray-50 rounded-2xl p-8 border border-gray-100 flex flex-col justify-center">
                        <h4 className="text-gray-500 font-bold text-[11px] uppercase tracking-widest mb-8">Updates</h4>
                        <div className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-200 mb-8 aspect-video flex items-center justify-center">
                          <div className="text-center">
                             <div className="w-28 h-28 rounded-full border-[7px] border-emerald-800/10 border-t-emerald-800 flex items-center justify-center mx-auto mb-3">
                                <span className="text-2xl font-bold text-gray-900">80%</span>
                             </div>
                             <p className="text-[11px] font-bold text-gray-600 uppercase tracking-wider">Voiceptionist Budgets</p>
                          </div>
                        </div>
                        <h5 className="font-bold text-lg mb-3 text-gray-900">Introducing Voiceptionist Budgets</h5>
                        <p className="text-sm text-gray-600 leading-relaxed">If you're still running budgets in a spreadsheet, this is built for you.</p>
                     </div>
                   </div>
                )}

                {/* Solutions Dropdown */}
                {item.label === 'Solutions' && (
                  <div 
                    onClick={() => setActiveDropdown(null)}
                    className={`${getDropdownClass('Solutions')} w-[1100px] p-12`}
                  >
                    <div className="grid grid-cols-12 gap-12">
                      <div className="col-span-12 space-y-12">
                        <div className="space-y-8">
                          <h4 className="text-gray-500 font-bold text-[11px] uppercase tracking-widest">By size</h4>
                          <div className="grid grid-cols-4 gap-8">
                            {solutionsBySize.map(s => (
                              <div key={s.title} className="flex items-start space-x-4 group/item cursor-pointer">
                                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-700 group-hover/item:bg-[#abc2fe] group-hover/item:text-black transition-colors shrink-0">{s.icon}</div>
                                <div>
                                  <p className="font-bold text-[15px] text-gray-900 leading-tight mb-1">{s.title}</p>
                                  <p className="text-[13px] text-gray-600 leading-snug">{s.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-8">
                          <h4 className="text-gray-500 font-bold text-[11px] uppercase tracking-widest">By industry</h4>
                          <div className="grid grid-cols-4 gap-y-8 gap-x-8">
                            {solutionsByIndustry.map(s => (
                              <div key={s.title} className="flex items-center space-x-4 group/item cursor-pointer">
                                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-700 group-hover/item:bg-[#abc2fe] group-hover/item:text-black transition-colors shrink-0">{s.icon}</div>
                                <p className="font-bold text-[15px] text-gray-900 leading-tight">{s.title}</p>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-8">
                          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                             <h4 className="text-gray-500 font-bold text-[11px] uppercase tracking-widest">By partner</h4>
                             <button className="text-gray-500 text-[11px] font-bold hover:text-black transition-colors flex items-center uppercase tracking-wider">Become a partner <ArrowRight size={14} className="ml-1.5" /></button>
                          </div>
                          <div className="grid grid-cols-4 gap-8">
                            {solutionsByPartner.map(s => (
                              <div key={s.title} className="flex items-center space-x-4 group/item cursor-pointer">
                                <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-gray-700 group-hover/item:bg-[#abc2fe] group-hover/item:text-black transition-colors shrink-0">{s.icon}</div>
                                <p className="font-bold text-[15px] text-gray-900 leading-tight">{s.title}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Resources Dropdown */}
                {item.label === 'Resources' && (
                  <div 
                    onClick={() => setActiveDropdown(null)}
                    className={`${getDropdownClass('Resources')} w-[1150px] p-12`}
                  >
                    <div className="grid grid-cols-12 gap-12">
                      <div className="col-span-9 grid grid-cols-3 gap-12">
                        <div className="space-y-10">
                          <h4 className="text-gray-500 font-bold text-[11px] uppercase tracking-widest">Discover</h4>
                          <div className="space-y-8">
                            {resourcesDiscover.map(r => (
                              <div key={r.title} className="flex items-start space-x-4 group/item cursor-pointer">
                                <div className="text-gray-700 mt-0.5 group-hover/item:text-black transition-colors shrink-0">{r.icon}</div>
                                <div>
                                  <p className="font-bold text-[15px] text-gray-900 leading-tight mb-1">{r.title}</p>
                                  <p className="text-[13px] text-gray-600 leading-snug">{r.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-10">
                          <h4 className="text-gray-500 font-bold text-[11px] uppercase tracking-widest">Connect</h4>
                          <div className="space-y-8">
                            {resourcesConnect.map(r => (
                              <div key={r.title} className="flex items-start space-x-4 group/item cursor-pointer">
                                <div className="text-gray-700 mt-0.5 group-hover/item:text-black transition-colors shrink-0">{r.icon}</div>
                                <div>
                                  <p className="font-bold text-[15px] text-gray-900 leading-tight mb-1">{r.title}</p>
                                  <p className="text-[13px] text-gray-600 leading-snug">{r.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-10">
                          <h4 className="text-gray-500 font-bold text-[11px] uppercase tracking-widest">Get started</h4>
                          <div className="space-y-8">
                            {resourcesGetStarted.map(r => (
                              <div key={r.title} className="flex items-start space-x-4 group/item cursor-pointer">
                                <div className="text-gray-700 mt-0.5 group-hover/item:text-black transition-colors shrink-0">{r.icon}</div>
                                <div>
                                  <p className="font-bold text-[15px] text-gray-900 leading-tight mb-1">{r.title}</p>
                                  <p className="text-[13px] text-gray-600 leading-snug">{r.desc}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="col-span-3 space-y-8 border-l border-gray-100 pl-12">
                        <h4 className="text-gray-500 font-bold text-[11px] uppercase tracking-widest">Featured</h4>
                        <div className="group/featured cursor-pointer">
                          <div className="rounded-2xl overflow-hidden border border-gray-100 shadow-sm mb-6 aspect-video bg-gray-50">
                            <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" alt="Featured" className="w-full h-full object-cover group-hover/featured:scale-105 transition-transform duration-700 ease-out" />
                          </div>
                          <h5 className="font-bold text-xl text-gray-900 group-hover/featured:underline underline-offset-4 mb-3">Voiceptionist Sheets</h5>
                          <p className="text-sm text-gray-600 leading-relaxed">Try the AI-powered spreadsheet editor from Voiceptionist Labs.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <button onClick={() => onNavigate('demo', false)} className={`text-[15px] font-medium px-4 py-2.5 rounded-xl transition-colors ${isScrolled ? 'hover:bg-[#cfdcfc] hover:text-black' : 'hover:bg-[#cfdcfc] hover:text-black'}`}>See a demo</button>
          <button onClick={() => onNavigate('onboarding', false)} className="bg-[#abc2fe] text-black px-6 py-2.5 rounded-xl text-[15px] font-bold hover:brightness-95 transition-all shadow-[0_8px_24px_rgba(171,194,254,0.25)]">Get Started</button>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col space-y-4 animate-in slide-in-from-top text-black">
          {navItems.map(item => (
            <div key={item.label} onClick={() => { onNavigate(item.view || 'explore'); setMobileMenuOpen(false); }} className="text-lg font-medium px-4 py-3 rounded-xl hover:bg-[#cfdcfc] transition-colors">{item.label}</div>
          ))}
          <div className="flex flex-col space-y-3 pt-4 border-t border-black/5">
            <button onClick={() => { onNavigate('demo', false); setMobileMenuOpen(false); }} className="w-full text-center py-4 border border-black/10 rounded-xl font-medium hover:bg-[#cfdcfc]">See a demo</button>
            <button onClick={() => { onNavigate('onboarding', false); setMobileMenuOpen(false); }} className="w-full bg-[#abc2fe] text-black py-4 rounded-xl font-bold">Get Started</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
