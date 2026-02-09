import React, { useState } from 'react';
import { Check, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import EmailInput from '../components/EmailInput';
import LogoCloud from '../components/LogoCloud';
import FAQSection from '../components/FAQSection';
import PricingTable from '../components/PricingTable';

const PricingView: React.FC = () => {
  return (
    <div className="bg-white min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto text-center px-6 mb-20">
        <h1 className="text-[52px] md:text-[64px] font-medium tracking-tight text-black mb-6 leading-[1.05]">
          Start for free.<br />Scale with Intelligence.
        </h1>
        <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Whether you’re a startup, global enterprise, or somewhere in between, Voiceptionist is designed to save you time and money.
        </p>
      </div>

      {/* Pricing Cards */}
      <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 mb-32 items-start">
        {/* Free Plan */}
        <div className="bg-white rounded-[32px] border border-gray-100 p-10 flex flex-col h-full shadow-sm relative pt-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#f5f5f4] px-6 py-1.5 rounded-full border border-gray-200">
            <span className="text-[13px] font-bold tracking-tight text-black">AI-assisted</span>
          </div>
          <div className="mb-10">
            <h2 className="text-3xl font-medium text-black mb-2">Free</h2>
            <div className="flex items-baseline">
              <span className="text-4xl font-medium">$0</span>
              <span className="text-gray-400 font-medium ml-1">/mo/user</span>
            </div>
          </div>
          <div className="space-y-6 mb-10 flex-1">
            <p className="text-[15px] font-medium text-gray-900 leading-snug">Best for smaller teams who want to simplify finances.</p>
            <div className="space-y-3">
              <input type="email" placeholder="What's your work email?" className="w-full px-5 py-3.5 bg-gray-50 rounded-xl border border-gray-100 outline-none text-sm" />
              <button className="w-full py-4 bg-[#f5f5f4] text-black font-bold rounded-xl text-sm hover:bg-gray-200 transition-colors">Get started for free</button>
            </div>
            
            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-sm font-bold text-black mb-6 uppercase tracking-wider">Key features:</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-[13px] font-bold text-gray-900 mb-3">Corporate Card</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2 text-[13px] text-gray-500"><Check size={14} /> <span>Unlimited cards</span></li>
                    <li className="flex items-center space-x-2 text-[13px] text-gray-500"><Check size={14} /> <span>Card issuing controls</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-gray-900 mb-3">Travel & Expense</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2 text-[13px] text-gray-500"><Check size={14} /> <span>Complete expenses via SMS or Slack</span></li>
                    <li className="flex items-center space-x-2 text-[13px] text-gray-500"><Check size={14} /> <span>Create a custom travel policy</span></li>
                    <li className="flex items-center space-x-2 text-[13px] text-gray-500"><Check size={14} /> <span>Book flights, hotels, and car rentals</span></li>
                    <li className="flex items-center space-x-2 text-[13px] text-gray-500"><Check size={14} /> <span>Auto-receipt collection and matching</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <button className="flex items-center justify-center text-gray-400 font-bold text-xs hover:text-black transition-colors group">
            <span>View all features</span>
            <ChevronDown size={14} className="ml-1 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Plus Plan */}
        <div className="bg-white rounded-[32px] border-[2px] border-[#abc2fe] p-10 flex flex-col h-full shadow-xl relative pt-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#abc2fe] px-6 py-1.5 rounded-full border border-[#abc2fe]">
            <span className="text-[13px] font-bold tracking-tight text-black">AI-powered</span>
          </div>
          <div className="mb-10">
            <h2 className="text-3xl font-medium text-black mb-2">Plus</h2>
            <div className="flex items-baseline">
              <span className="text-4xl font-medium">$15</span>
              <span className="text-gray-400 font-medium ml-1">/mo/user</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">+ Platform fee based on team size<br />Save 20% with annual billing</p>
          </div>
          <div className="space-y-6 mb-10 flex-1">
            <p className="text-[15px] font-medium text-gray-900 leading-snug">Perfect for teams who want to use AI-driven automation to eliminate busywork.</p>
            <div className="space-y-3">
              <input type="email" placeholder="What's your work email?" className="w-full px-5 py-3.5 bg-gray-50 rounded-xl border border-gray-100 outline-none text-sm" />
              <button className="w-full py-4 bg-[#abc2fe] text-black font-bold rounded-xl text-sm hover:brightness-95 transition-all">Get started for free</button>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-sm font-bold text-black mb-6 uppercase tracking-wider">All the features of Free, and:</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-[13px] font-bold text-gray-900 mb-3">Travel & Expense</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2 text-[13px] text-gray-500"><Check size={14} /> <span>AI-driven expense reviews and policy insights</span></li>
                    <li className="flex items-center space-x-2 text-[13px] text-gray-500"><Check size={14} /> <span>Auto-lock cards when compliance is unmet</span></li>
                    <li className="flex items-center space-x-2 text-[13px] text-gray-500"><Check size={14} /> <span>24/7 phone support for travel bookings</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-gray-900 mb-3">Accounts Payable</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2 text-[13px] text-gray-500"><Check size={14} /> <span>Auto-coded line items</span></li>
                    <li className="flex items-center space-x-2 text-[13px] text-gray-500"><Check size={14} /> <span>AI-driven approval recommendations</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <button className="flex items-center justify-center text-gray-400 font-bold text-xs hover:text-black transition-colors group">
            <span>View all features</span>
            <ChevronDown size={14} className="ml-1 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-white rounded-[32px] border border-gray-100 p-10 flex flex-col h-full shadow-sm relative pt-16">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#171717] px-6 py-1.5 rounded-full border border-[#171717]">
            <span className="text-[13px] font-bold tracking-tight text-white">AI-tailored</span>
          </div>
          <div className="mb-10">
            <h2 className="text-3xl font-medium text-black mb-2">Enterprise</h2>
            <div className="flex items-baseline">
              <span className="text-4xl font-medium">Custom</span>
            </div>
            <p className="text-xs text-gray-400 mt-2">Annual billing</p>
          </div>
          <div className="space-y-6 mb-10 flex-1">
            <p className="text-[15px] font-medium text-gray-900 leading-snug">Specifically made for teams who need full customization.</p>
            <div className="space-y-3">
              <input type="email" placeholder="What's your work email?" className="w-full px-5 py-3.5 bg-gray-50 rounded-xl border border-gray-100 outline-none text-sm" />
              <button className="w-full py-4 bg-[#171717] text-white font-bold rounded-xl text-sm hover:brightness-125 transition-all">Contact sales</button>
            </div>

            <div className="pt-6 border-t border-gray-100">
              <h3 className="text-sm font-bold text-black mb-6 uppercase tracking-wider">All the features of Plus, and:</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-[13px] font-bold text-gray-900 mb-3">Accounting Automation</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2 text-[13px] text-gray-500"><Check size={14} /> <span>Workday, Oracle Fusion Cloud, and more integrations</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-gray-900 mb-3">Global Coverage</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2 text-[13px] text-gray-500"><Check size={14} /> <span>Local currency card issuing in 40+ countries</span></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[13px] font-bold text-gray-900 mb-3">White Glove Support</h4>
                  <ul className="space-y-2">
                    <li className="flex items-center space-x-2 text-[13px] text-gray-500"><Check size={14} /> <span>Dedicated account and customer success manager</span></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <button className="flex items-center justify-center text-gray-400 font-bold text-xs hover:text-black transition-colors group">
            <span>View all features</span>
            <ChevronDown size={14} className="ml-1 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <LogoCloud />

      <PricingTable />

      <FAQSection />

      {/* Bottom CTA */}
      <div className="max-w-4xl mx-auto text-center px-6 mt-32">
        <h2 className="text-[20px] md:text-[26px] font-normal tracking-tight text-black mb-5">Time is money. Save both.</h2>
        <div className="max-w-2xl mx-auto bg-gray-50 p-2 rounded-2xl flex items-center border border-gray-100">
          <input type="email" placeholder="What's your work email?" className="flex-1 px-6 py-4 bg-transparent outline-none text-sm" />
          <button className="bg-[#abc2fe] text-black px-8 py-4 rounded-xl text-sm font-bold hover:brightness-95 transition-all">Get started for free</button>
        </div>
      </div>
    </div>
  );
};

export default PricingView;