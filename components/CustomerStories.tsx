import React, { useState, useRef, useEffect } from 'react';
import { Play } from 'lucide-react';

interface Story {
  name: string;
  logo?: string;
  quote: string;
  author: string;
  img: string;
  brandColor?: string;
  customLogo?: React.ReactNode;
}

const CustomerStories: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const stories: Story[] = [
    {
      name: 'Poshmark',
      quote: '“We’ve simplified our workflows while improving accuracy, and we are faster in closing with the help of automation. We could not have achieved this without the solutions Voiceptionist brought to the table.”',
      author: 'Kaustubh Khandelwal, VP of Finance',
      img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200',
      customLogo: (
        <div className="flex items-center space-x-3 text-white">
          <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center font-bold text-xl">P</div>
          <span className="text-2xl font-bold tracking-widest uppercase">Poshmark</span>
        </div>
      )
    },
    {
      name: 'Notion',
      quote: '“Voiceptionist is the only vendor that can service all of our employees across the globe in one unified system.”',
      author: 'Brandon Zell, Chief Accounting Officer',
      img: 'https://images.unsplash.com/photo-1577744486770-020ab432da67?auto=format&fit=crop&q=80&w=1200',
      customLogo: (
        <div className="flex items-center space-x-3 text-white">
          <div className="bg-white p-1 rounded-lg">
            <img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Notion_app_logo.png" alt="Notion" className="w-8 h-8 object-contain" />
          </div>
          <span className="text-3xl font-bold tracking-tight">Notion</span>
        </div>
      )
    },
    {
      name: 'The University of Tennessee',
      quote: '“When our teams need something, they usually need it right now. The more time we can save doing all those tedious tasks, the more time we can dedicate to supporting our student-athletes.”',
      author: 'Sarah Harris, Secretary',
      img: 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200',
      customLogo: (
        <div className="text-white">
          <p className="text-[12px] font-bold uppercase tracking-[0.2em] leading-none mb-1">The University of</p>
          <p className="text-xl font-extrabold leading-tight">Tennessee Athletics Foundation, Inc.</p>
        </div>
      )
    }
  ];

  const handleCardClick = (index: number) => {
    setCurrentIndex(index);
  };

  const getTransform = () => {
    // Original step was 70. 3/4 of 70 is 52.5.
    const step = 52.5;
    const offset = currentIndex * step;
    return `translateX(calc(50% - ${offset}% - ${step / 2}%))`;
  };

  return (
    <section className="bg-white pt-8 pb-20 overflow-hidden">
      <div className="w-full">
        <h2 className="text-[45px] font-medium text-center mb-3.5 tracking-tight text-gray-900">Don't just take our word for it.</h2>
        
        <div className="relative w-full overflow-visible">
          <div 
            className="flex transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.3,1)]"
            style={{ transform: getTransform() }}
          >
            {stories.map((story, i) => {
              const isActive = i === currentIndex;
              return (
                <div 
                  key={i} 
                  onClick={() => handleCardClick(i)}
                  className={`min-w-[52.5%] px-1.5 transition-all duration-700 cursor-pointer ${isActive ? 'scale-100 opacity-100' : 'scale-[0.88] opacity-30 hover:opacity-50'}`}
                >
                  <div className="relative aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl bg-black">
                    <img 
                      src={story.img} 
                      alt={story.name} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/10"></div>
                    <div className="absolute top-12 left-12 drop-shadow-lg">
                      {story.customLogo}
                    </div>
                    <div className="absolute bottom-12 left-12">
                      <div className="w-16 h-16 bg-ramp-lime rounded-full flex items-center justify-center text-black shadow-xl hover:scale-105 transition-transform">
                        <Play fill="currentColor" size={24} className="ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="max-w-6xl mx-auto mt-20 px-8">
           <div className="flex flex-col md:flex-row justify-between items-start gap-12 relative">
              <div className="flex-1 space-y-6">
                 <h3 className="text-2xl md:text-[28px] font-medium text-gray-900 leading-[1.35] max-w-4xl tracking-tight">
                   {stories[currentIndex].quote}
                 </h3>
                 <div>
                    <p className="text-[16px] font-semibold text-gray-400">
                      {stories[currentIndex].author}
                    </p>
                 </div>
              </div>
              
              <div className="pt-1">
                 <button className="bg-black text-white px-10 py-3.5 rounded-xl text-sm font-bold hover:brightness-110 transition-all whitespace-nowrap shadow-lg">
                    Read customer story
                 </button>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerStories;