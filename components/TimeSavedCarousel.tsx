import React from 'react';
import { ArrowRight } from 'lucide-react';

const TimeSavedCarousel: React.FC = () => {
  const cards = [
    {
      title: 'Surf more.',
      img: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=1600',
    },
    {
      title: 'Cook dinner.',
      img: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80&w=1600',
    },
    {
      title: 'Read a book.',
      img: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=1600',
    },
    {
      title: 'Yoga class.',
      img: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=1600',
    },
    {
      title: 'Pick up kids.',
      img: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&q=80&w=1600',
    }
  ];

  return (
    <section className="py-32 bg-white overflow-hidden">
      {/* Maximum width expanded further to allow the wider cards to scale properly */}
      <div className="max-w-[5200px] mx-auto px-12 text-center">
        <h2 className="text-[26px] md:text-[42px] font-medium tracking-tight mb-8 text-black leading-none">
          What would you do with more time?
        </h2>
        <p className="text-gray-500 text-[14px] md:text-[16px] mb-10 font-medium opacity-80">
          Over 1M+ hours saved for 100+ customers.
        </p>
        <button className="text-gray-600 font-bold text-[13px] flex items-center space-x-2 mx-auto hover:text-black transition-colors group mb-24 uppercase tracking-widest">
          <span>View all customer stories</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>

        {/* 5 Colossal Cards Row - Updated aspect-ratio to 5:6 (from 2:3) to increase width by 1.25x relative to the previous state */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-16">
          {cards.map((card, idx) => (
            <div 
              key={idx} 
              className="relative aspect-[5/6] rounded-[16px] overflow-hidden bg-gray-100 shadow-lg border border-gray-50"
            >
              <img 
                src={card.img} 
                alt={card.title} 
                className="w-full h-full object-cover"
              />
              {/* Text labels and overlays remain removed as requested */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimeSavedCarousel;