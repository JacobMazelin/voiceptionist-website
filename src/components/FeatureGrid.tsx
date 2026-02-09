import React from 'react';
import { ArrowRight } from 'lucide-react';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl }) => (
  <div className="group relative rounded-[12px] pt-6 px-6 pb-0 h-[432px] flex flex-col overflow-hidden bg-[#f7f7f7] text-black border border-transparent hover:border-gray-200 transition-all duration-300">
    <div className="relative z-10 flex flex-col h-full">
      <div className="space-y-1">
        <h3 className="text-lg font-medium tracking-tight">{title}</h3>
        <p className="text-sm leading-relaxed text-[#5f5f5f]">{description}</p>
        <div className="flex items-center space-x-1.5 text-sm font-medium pt-[14px] cursor-pointer text-[#9e9e9e]">
          <span>Learn more</span>
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </div>
      </div>
      {/* 50px Margin after the "Learn more" block provided by mt-[50px] */}
      <div className="mt-[50px] flex-1 relative w-full rounded-t-[10px] overflow-hidden bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.03)] border-x border-t border-black/5">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
      </div>
    </div>
  </div>
);

const FeatureGrid: React.FC = () => {
  const features = [
    {
      title: 'Voiceptionist Intelligence',
      description: 'Put AI to work.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1200',
    },
    {
      title: 'Corporate Cards',
      description: 'Control spend before it happens.',
      imageUrl: 'https://images.unsplash.com/photo-1613243555988-441166d4d6fd?auto=format&fit=crop&q=80&w=1200',
    },
    {
      title: 'Expense Management',
      description: 'Expenses that submit themselves.',
      imageUrl: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=1200',
    },
    {
      title: 'Accounts Payable',
      description: 'Process bills in seconds.',
      imageUrl: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=1200',
    },
    {
      title: 'Travel',
      description: 'Travel that stays in policy.',
      imageUrl: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1200',
    },
    {
      title: 'Procurement',
      description: 'Simplify your procurement process.',
      imageUrl: 'https://images.unsplash.com/photo-1454165833767-1314d792701b?auto=format&fit=crop&q=80&w=1200',
    },
    {
      title: 'Accounting Automation',
      description: 'Accelerate your monthly close.',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1200',
    },
    {
      title: 'Voiceptionist Treasury',
      description: 'High yield on idle cash.',
      imageUrl: 'https://images.unsplash.com/photo-1543286386-713bdd548da4?auto=format&fit=crop&q=80&w=1200',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
      {features.map((feature, idx) => (
        <Card key={idx} {...feature} />
      ))}
    </div>
  );
};

export default FeatureGrid;