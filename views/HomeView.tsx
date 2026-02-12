
import React from 'react';
import Hero from '../components/Hero';
import FeatureGrid from '../components/FeatureGrid';
import DarkFeatures from '../components/DarkFeatures';
import ScaleSection from '../components/ScaleSection';

interface HomeViewProps {
  onExplore: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onExplore }) => {
  return (
    <>
      <Hero onExplore={onExplore} />
      <div className="max-w-[1320px] mx-auto px-6 pt-24 pb-8">
        <div className="mb-16 space-y-4 px-4 text-left">
          <span className="text-[#5f5f5f] font-semibold uppercase tracking-[0.1em] text-xs">Voiceptionist AI Platform</span>
          <h2 className="text-[42px] font-medium text-black tracking-tight leading-none">Meet your Voiceptionist</h2>
          <p className="text-xl text-[#5f5f5f] max-w-[800px] leading-relaxed pt-2">
            An AI-powered receptionist that handles calls, books tours,<br />
            and supports residents — so your team can focus on what matters.
          </p>
        </div>
        <FeatureGrid />
      </div>
      <DarkFeatures />
      <ScaleSection />
    </>
  );
};

export default HomeView;
