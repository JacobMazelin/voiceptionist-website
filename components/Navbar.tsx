
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (view: any, newTab?: boolean) => void;
  currentView: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentView }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10 || (currentView !== 'home' && currentView !== 'team'));
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const navItems = [
    { label: 'Product', view: 'home' },
    { label: 'Team', view: 'team' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/35 backdrop-blur-[32px] shadow-[0_8px_32px_0_rgba(0,0,0,0.06)] border-b border-white/45 text-black' : 'bg-transparent text-white'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between relative">
        <div className="flex items-center space-x-12">
          <div onClick={() => onNavigate('home')} className="flex items-center cursor-pointer group">
            <span className="text-2xl font-bold tracking-tighter">voiceptionist</span>
          </div>

          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onNavigate(item.view)}
                className={`text-[15px] font-medium px-4 py-2.5 rounded-xl transition-all duration-300 ${
                  currentView === item.view
                    ? 'bg-[#cfdcfc] text-black shadow-sm'
                    : 'hover:bg-[#cfdcfc] hover:text-black'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex items-center space-x-4">
          <button onClick={() => onNavigate('dashboard', true)} className={`text-[15px] font-medium px-4 py-2.5 rounded-xl transition-colors ${isScrolled ? 'hover:bg-[#cfdcfc] hover:text-black' : 'hover:bg-[#cfdcfc] hover:text-black'}`}>Sign in</button>
          <button onClick={() => onNavigate('onboarding', false)} className="bg-[#abc2fe] text-black px-6 py-2.5 rounded-xl text-[15px] font-bold hover:brightness-95 transition-all shadow-[0_8px_24px_rgba(171,194,254,0.25)]">Get Started</button>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col space-y-4 animate-in slide-in-from-top text-black">
          {navItems.map(item => (
            <div key={item.label} onClick={() => { onNavigate(item.view); setMobileMenuOpen(false); }} className="text-lg font-medium px-4 py-3 rounded-xl hover:bg-[#cfdcfc] transition-colors cursor-pointer">{item.label}</div>
          ))}
          <div className="flex flex-col space-y-3 pt-4 border-t border-black/5">
            <button onClick={() => { onNavigate('dashboard', true); setMobileMenuOpen(false); }} className="w-full text-center py-4 border border-black/10 rounded-xl font-medium hover:bg-[#cfdcfc]">Sign in</button>
            <button onClick={() => { onNavigate('onboarding', false); setMobileMenuOpen(false); }} className="w-full bg-[#abc2fe] text-black py-4 rounded-xl font-bold">Get Started</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
