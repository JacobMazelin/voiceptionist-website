
import React from 'react';
import Hero from '../components/Hero';
import LogoCloud from '../components/LogoCloud';
import FeatureGrid from '../components/FeatureGrid';
import CustomerStories from '../components/CustomerStories';
import ImplementationTimeline from '../components/ImplementationTimeline';
import DarkFeatures from '../components/DarkFeatures';
import ScaleSection from '../components/ScaleSection';
import AwardsSection from '../components/AwardsSection';
import TimeSavedCarousel from '../components/TimeSavedCarousel';

interface HomeViewProps {
  onExplore: () => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onExplore }) => {
  return (
    <>
      <Hero onExplore={onExplore} />
      <LogoCloud />
      <div className="max-w-[1320px] mx-auto px-6 pt-24 pb-8">
         <div className="mb-16 space-y-4 px-4 text-left">
            <span className="text-[#5f5f5f] font-semibold uppercase tracking-[0.1em] text-xs">Voiceptionist AI Platform</span>
            <h2 className="text-[42px] font-medium text-black tracking-tight leading-none">Meet your Voiceptionist</h2>
            <p className="text-xl text-[#5f5f5f] max-w-[800px] leading-relaxed pt-2">
              Replace multiple broken tools with Ramp, the only platform<br />
              designed to make your management team faster—and happier.
            </p>
         </div>
         <FeatureGrid />
      </div>
      <CustomerStories />
      <ImplementationTimeline />
      <DarkFeatures />
      <ScaleSection />
      <TimeSavedCarousel />
      <AwardsSection />
    </>
  );
};

export default HomeView;
