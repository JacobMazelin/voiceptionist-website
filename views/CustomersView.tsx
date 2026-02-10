import React from 'react';
import { ArrowRight, Search, ChevronDown } from 'lucide-react';

const CustomersView: React.FC = () => {
  const logos = [
    'Virgin VOYAGES', 'stripe', 'CBRE', 'Ketchum', 'Notion', 'Discord', 'GoodRx', 'BARRY\'S', 'eventbrite'
  ];

  const secondaryStories = [
    {
      company: 'Ketchum',
      quote: 'Ketchum saves over 100 staff hours a month to make every taxpayer dollar count',
      img: 'https://images.unsplash.com/photo-1517216015940-0ad9e2858bd8?auto=format&fit=crop&q=80&w=800',
      tags: ['PUBLIC SECTOR', 'MID-SIZE']
    },
    {
      company: 'Vanta',
      quote: 'How Vanta runs finance on Ramp with programmatic spend for 3 days faster close',
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
      tags: ['SOFTWARE & TECHNOLOGY', 'ENTERPRISE']
    },
    {
      company: 'The University of Tennessee',
      quote: 'How Tennessee built a championship-caliber back office with Ramp',
      img: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800',
      tags: ['EDUCATION', 'ENTERPRISE']
    },
    {
      company: 'City of Mount Vernon',
      quote: 'City of Mount Vernon addresses budget constraints by blocking non-compliant spend',
      img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
      tags: ['PUBLIC SECTOR', 'MID-SIZE']
    },
    {
      company: 'piñata',
      quote: "How Piñata halved its finance team's workload after moving from Brex to Ramp",
      img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
      tags: ['FINTECH & FINANCIAL SERVICES', 'SMB']
    },
    {
      company: 'Advisor360°',
      quote: 'How Advisor360° cut their intake-to-pay cycle by 50%',
      img: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80&w=800',
      tags: ['SOFTWARE & TECHNOLOGY', 'ENTERPRISE']
    }
  ];

  const metricCards = [
    { brand: 'HEYDAY', metric: '2.5%', desc: 'cash back earned with Ramp', color: 'text-blue-600' },
    { brand: 'TaskHuman', metric: '12 day', desc: 'reduction in time to close', color: 'text-gray-800' },
    { brand: 'CANDID', metric: '$250K', desc: 'savings identified by Ramp\'s insights', color: 'text-blue-500' },
    { brand: 'smart city.', metric: '7-9%', desc: 'total savings realized with Ramp', color: 'text-gray-900' },
    { brand: 'Walther Farms', metric: '18', desc: 'days saved in card reconciliation time', color: 'text-blue-400' },
  ];

  const allStories = [
    { brand: 'Ketchum', logo: 'K', quote: 'Ketchum saves 100+ hours to make every taxpayer dollar count', tags: ['PUBLIC SECTOR / MID-SIZE'] },
    { brand: 'Vanta', logo: 'Vanta', quote: 'Vanta runs finance on Ramp with programmatic spend for 3 days faster close', tags: ['SOFTWARE & TECHNOLOGY / ENTERPRISE'] },
    { brand: 'Notion', logo: 'N', quote: 'How Notion unified global spend management across 10+ countries', tags: ['SOFTWARE & TECHNOLOGY / ENTERPRISE'] },
    { brand: 'The University of Tennessee', logo: 'T', quote: 'A championship-caliber back office with Ramp', tags: ['EDUCATION / ENTERPRISE'] },
    { brand: 'City of Mount Vernon', logo: 'City', quote: 'Overcoming budget constraints with controls & cash back', tags: ['PUBLIC SECTOR / MID-SIZE'] },
    { brand: 'piñata', logo: 'piñata', quote: 'Went from blindfolded workflows to smarter spend', tags: ['FINTECH & FINANCIAL SERVICES / SMB'] },
  ];

  return (
    <div className="bg-white pt-20">
      {/* Hero Header */}
      <section className="pt-24 pb-12 text-center px-4">
        <h1 className="text-[80px] md:text-[140px] font-medium tracking-tighter leading-none mb-12">Customer Stories</h1>
        
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-center gap-x-12 gap-y-6 opacity-40 grayscale">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-widest shrink-0">Trusted by 50,000 businesses:</span>
          {logos.map(logo => (
            <span key={logo} className="text-xl font-bold tracking-tighter shrink-0">{logo}</span>
          ))}
        </div>
      </section>

      {/* Sticky Main Section */}
      <section className="max-w-[1400px] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
          {/* Left Sticky Card */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden group">
              <img 
                src="https://images.unsplash.com/photo-1577744486770-020ab432da67?auto=format&fit=crop&q=80&w=1200" 
                alt="Notion Featured" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute top-10 left-10 flex items-center space-x-3">
                <div className="bg-white p-2 rounded-xl">
                  <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" alt="Notion" className="w-8 h-8" />
                </div>
                <span className="text-white text-3xl font-bold">Notion</span>
              </div>
              <div className="absolute bottom-10 left-10 max-w-md">
                <h3 className="text-white text-4xl font-medium tracking-tight mb-4">How Notion unified global spend management across 10+ countries</h3>
                <p className="text-white/60 text-xs font-bold uppercase tracking-widest">SOFTWARE & TECHNOLOGY / ENTERPRISE</p>
              </div>
            </div>
          </div>

          {/* Right Scrollable Column */}
          <div className="space-y-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-1 gap-12">
              {secondaryStories.map((story, i) => (
                <div key={i} className="flex flex-col space-y-6">
                  <div className="aspect-video rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                    <img src={story.img} alt={story.company} className="w-full h-full object-cover" />
                  </div>
                  <div className="space-y-4 px-2">
                    <h4 className="text-2xl font-medium tracking-tight text-gray-900 leading-snug">{story.quote}</h4>
                    <div className="flex flex-wrap gap-2">
                      {story.tags.map(tag => (
                        <span key={tag} className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-r border-gray-200 pr-2 last:border-0">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full py-6 bg-gray-50 text-gray-900 font-bold rounded-2xl border border-gray-100 flex items-center justify-center space-x-2 hover:bg-gray-100 transition-colors">
              <ChevronDown size={18} />
              <span>See all stories</span>
            </button>
          </div>
        </div>
      </section>

      {/* Insights CTA */}
      <section className="py-20 border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
           <p className="text-gray-900 text-xl font-medium tracking-tight">See insights on how 50,000 customers spent on Ramp in 2025</p>
           <div className="flex items-center gap-3 w-full md:w-auto">
              <input 
                type="email" 
                placeholder="What's your work email?" 
                className="flex-1 md:w-80 px-6 py-4 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#abc2fe] transition-all"
              />
              <button className="bg-[#e4ff42] text-black px-8 py-4 rounded-xl font-bold whitespace-nowrap hover:brightness-105 transition-all">
                Get free report
              </button>
           </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="relative min-h-[800px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80&w=2000" 
            className="w-full h-full object-cover brightness-50"
            alt="Team background"
          />
        </div>
        <div className="max-w-5xl mx-auto px-6 text-white text-center relative z-10 space-y-12">
          <div className="flex justify-center mb-8">
             <span className="text-3xl font-black italic tracking-tighter">eventbrite</span>
          </div>
          <h2 className="text-[40px] md:text-[56px] font-medium leading-[1.1] tracking-tight">
            “Ramp has brought tangible value to our finance team, our global employee base, and to me personally. I am obsessed with Ramp.”
          </h2>
          <div className="space-y-1">
            <p className="text-lg font-bold">Julia Hartz</p>
            <p className="text-white/60">CEO, Eventbrite</p>
          </div>
          <button className="flex items-center space-x-2 mx-auto font-bold border-b-2 border-white pb-1 hover:opacity-80 transition-opacity">
            <span>Customer story</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Metrics Carousel Header */}
      <section className="pt-32 pb-16 text-center">
        <h2 className="text-[56px] font-medium tracking-tight text-gray-900 mb-4">Healthier businesses run on Ramp.</h2>
        <p className="text-gray-500 text-sm font-medium">Visionary startups and industry leaders<br />use Ramp to grow stronger and faster.</p>
      </section>

      {/* Infinite Metrics Carousel */}
      <div className="relative overflow-hidden w-screen left-1/2 right-1/2 -ml-[50vw] +mr-[50vw] mb-40">
        <div className="animate-scroll flex items-center space-x-8 px-4">
          {[...metricCards, ...metricCards, ...metricCards].map((card, i) => (
            <div key={i} className="min-w-[400px] bg-gray-50 border border-gray-100 rounded-[32px] p-12 flex flex-col justify-between h-[500px] shrink-0">
               <div className="flex items-start justify-between">
                  <span className="text-2xl font-black italic tracking-tighter">{card.brand}</span>
               </div>
               <div className="space-y-4">
                  <p className={`text-[100px] font-medium leading-none tracking-tighter ${card.color}`}>{card.metric}</p>
                  <p className="text-gray-500 font-medium text-lg leading-tight">{card.desc}</p>
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* All Stories Grid Header */}
      <section className="max-w-[1400px] mx-auto px-6 pb-20">
        <div className="text-center mb-16">
          <h2 className="text-[56px] font-medium text-black">All stories</h2>
        </div>

        {/* Fake Filters */}
        <div className="flex flex-wrap gap-4 mb-20">
          <div className="flex-1 min-w-[300px] relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-14 pr-6 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#abc2fe]"
            />
          </div>
          <div className="px-6 py-4 bg-white border border-gray-200 rounded-xl flex items-center space-x-2 text-gray-600 font-medium cursor-pointer">
            <span>Company size</span>
            <ChevronDown size={14} />
          </div>
          <div className="px-6 py-4 bg-white border border-gray-200 rounded-xl flex items-center space-x-2 text-gray-600 font-medium cursor-pointer">
            <span>Industry</span>
            <ChevronDown size={14} />
          </div>
          <div className="px-6 py-4 bg-white border border-gray-200 rounded-xl flex items-center space-x-2 text-gray-600 font-medium cursor-pointer">
            <span>Ramp product used</span>
            <ChevronDown size={14} />
          </div>
        </div>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allStories.map((story, i) => (
            <div key={i} className="space-y-6">
              <div className="aspect-[4/3] bg-[#e6edfc] rounded-3xl flex items-center justify-center p-12 hover:shadow-lg transition-shadow border border-gray-100">
                 <span className="text-4xl font-black tracking-tighter text-[#171717]">{story.brand}</span>
              </div>
              <div className="space-y-4 px-2">
                 <h4 className="text-[17px] font-medium tracking-tight text-gray-900 leading-snug">{story.quote}</h4>
                 <div className="flex flex-wrap gap-2">
                    {story.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{tag}</span>
                    ))}
                 </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex justify-center">
          <button className="px-12 py-4 bg-gray-50 text-gray-900 font-bold rounded-xl border border-gray-100 hover:bg-gray-100 transition-colors">
            Load more stories
          </button>
        </div>
      </section>
    </div>
  );
};

export default CustomersView;