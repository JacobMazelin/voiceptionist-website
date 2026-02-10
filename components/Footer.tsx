import React from 'react';
import { Apple, PlayCircle, Instagram, Linkedin, Twitter, Facebook } from 'lucide-react';
import EmailInput from './EmailInput';

const Footer: React.FC = () => {
  const footerData = {
    About: ['Careers', 'Emerging talent', 'Customers', 'Help center', 'Product releases', 'Voiceptionist Labs', 'API documentation', 'Versus'],
    Products: ['Corporate cards', 'Expense management', 'Spend management', 'Budgets', 'Treasury', 'Travel', 'Reimbursements', 'Procurement', 'Accounts payable', 'Vendor management', 'Approvals', 'Security', 'Trust', 'Mobile app', 'Voiceptionist Sheets'],
    Platform: ['Platform overview', 'Accounting automation', 'Intelligence', 'Reporting', 'Savings', 'Integrations', 'Multi-entity', 'Global'],
    Partners: ['Accounting firms', 'Private equity', 'Venture capital', 'Services providers', 'Technology partners'],
    Solutions: ['Startups', 'Small business', 'Mid market', 'Enterprise'],
    Resources: ['Perks and rewards', 'Find an accountant', 'Find a services partner', 'Savings calculator', 'Mission statement generator', 'Charge finder', 'Per diem calculator', 'Mileage reimbursement calculator', 'Card comparison tool', 'Investor database', 'Expense categorization', 'Vendor directory', 'Virtual cards']
  };

  return (
    <footer className="bg-ramp-navy text-white/50 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Sitemap Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-20">
          {Object.entries(footerData).map(([title, items]) => (
            <div key={title} className="space-y-6">
              <h4 className="text-white font-bold text-sm tracking-wide uppercase">{title}</h4>
              <ul className="space-y-4">
                {items.map(item => (
                  <li key={item} className="text-sm hover:text-white transition-colors">
                    <a href="#">{item}</a>
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
                <a href="#" className="hover:text-ramp-lime transition-colors">Terms of Service</a>
                <a href="#" className="hover:text-ramp-lime transition-colors">Editorial Guidelines</a>
                <a href="#" className="hover:text-ramp-lime transition-colors">Privacy Policy</a>
                <a href="#" className="hover:text-ramp-lime transition-colors">Your Privacy Choices</a>
             </div>
             <p>The Voiceptionist Visa Corporate Card is issued in the U.S. by Celtic Bank, Member FDIC. Each card is issued pursuant to a license from Visa USA Inc.</p>
             <p>Get up to 2% in the form of annual cash rewards on eligible funds in your Voiceptionist Business Account. Cash rewards are subject to change. See the Business Account Addendum for more information.</p>
          </div>

          <div className="space-y-8 min-w-[200px]">
             <div className="flex items-center space-x-6">
                <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center text-white hover:bg-ramp-lime hover:text-black transition-colors cursor-pointer">
                   <div className="font-bold text-xl">V</div>
                </div>
                <div className="space-y-1">
                   <p className="text-white font-bold text-sm">Voiceptionist Business Corporation</p>
                   <p className="text-xs">28 West 23rd Street, Floor 2</p>
                   <p className="text-xs">New York, NY 10010</p>
                </div>
             </div>
             <div className="flex gap-4">
                <div className="h-10 bg-white/10 px-4 rounded-lg flex items-center space-x-2 text-white hover:bg-white/20 cursor-pointer">
                   <Apple size={16} fill="white" />
                   <span className="text-xs font-bold">App Store</span>
                </div>
                <div className="h-10 bg-white/10 px-4 rounded-lg flex items-center space-x-2 text-white hover:bg-white/20 cursor-pointer">
                   <PlayCircle size={16} />
                   <span className="text-xs font-bold">Google Play</span>
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

      {/* CTA Section (Join 50k+ Businesses) - Spacing tightened and border removed */}
      <div className="max-w-7xl mx-auto px-4 mt-10 mb-8 pt-0">
        <div className="flex flex-col items-start gap-4">
           <p className="text-white text-xl font-medium">Join the <span className="font-bold">50,000+ businesses</span> simplifying their finances with Voiceptionist.</p>
           <EmailInput dark buttonText="Get started for free" className="w-full max-w-2xl" />
        </div>
      </div>

      {/* Brand Section (Large Text Header) - Positioned at the very bottom */}
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