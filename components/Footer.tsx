
import React from 'react';
import { Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';
import EmailInput from './EmailInput';

interface FooterProps {
  onNavigate: (view: any) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const footerLinks: { title: string; items: { label: string; action?: () => void }[] }[] = [
    {
      title: 'Product',
      items: [
        { label: 'AI Receptionist', action: () => onNavigate('onboarding') },
        { label: 'Get Started', action: () => onNavigate('onboarding') },
      ],
    },
    {
      title: 'Solutions',
      items: [
        { label: 'Student Housing' },
        { label: 'Multifamily' },
        { label: 'Property Managers' },
      ],
    },
    {
      title: 'Company',
      items: [
        { label: 'Team', action: () => onNavigate('team') },
      ],
    },
  ];

  return (
    <footer className="bg-ramp-navy text-white/50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Sitemap Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-12 mb-20">
          {footerLinks.map(({ title, items }) => (
            <div key={title} className="space-y-6">
              <h4 className="text-white font-bold text-sm tracking-wide uppercase">{title}</h4>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item.label} className={`text-sm ${item.action ? 'hover:text-white cursor-pointer' : ''} transition-colors`}>
                    {item.action ? (
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          item.action!();
                        }}
                      >
                        {item.label}
                      </a>
                    ) : (
                      <span>{item.label}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Legal and Social Section */}
        <div className="pt-20 border-t border-white/5 flex flex-col lg:flex-row justify-between gap-12 mb-12">
          <div className="max-w-2xl space-y-6 text-xs leading-relaxed">
            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-6 text-white font-medium">
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('terms'); }} className="hover:text-ramp-lime transition-colors">Terms of Service</a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('terms'); }} className="hover:text-ramp-lime transition-colors">Privacy</a>
            </div>
            <p>Voiceptionist is an early-stage startup building AI receptionists for student housing and property managers.</p>
            <p>Currently in private beta. Built by the Voiceptionist team.</p>
          </div>

          <div className="space-y-8 min-w-[200px]">
            <div className="flex items-center space-x-6">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-ramp-lime hover:text-black transition-colors cursor-pointer">
                <div className="font-bold text-xl">V</div>
              </div>
              <div className="space-y-1">
                <p className="text-white font-bold text-sm">Voiceptionist Business Corporation</p>
              </div>
            </div>
            <div className="flex gap-6 text-white/50">
              <Linkedin size={20} className="hover:text-white cursor-pointer" />
              <Twitter size={20} className="hover:text-white cursor-pointer" />
              <Facebook size={20} className="hover:text-white cursor-pointer" />
              <Instagram size={20} className="hover:text-white cursor-pointer" />
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 mt-10 mb-8 pt-0">
        <div className="flex flex-col items-start gap-4">
          <p className="text-white text-xl font-medium">Simplify your property operations with <span className="font-bold">Voiceptionist</span>.</p>
          <EmailInput dark buttonText="Get started for free" className="w-full max-w-2xl" />
        </div>
      </div>

      {/* Brand Section */}
      <div className="w-full relative py-8 px-4 select-none pointer-events-none overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col items-end">
          <h1 className="w-full text-[clamp(3rem,16vw,20rem)] font-black text-white/[0.04] leading-none tracking-tighter uppercase whitespace-nowrap">
            Voiceptionist
          </h1>
          <div className="mt-4 text-[10px] md:text-xs font-medium tracking-[0.2em] uppercase text-white/20 text-right">
            © 2026 VOICEPTIONIST CORPORATION. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
