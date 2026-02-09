import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeView from './views/HomeView';
import DemoView from './views/DemoView';
import ExploreView from './views/ExploreView';
import NotFoundView from './views/NotFoundView';
import PricingView from './views/PricingView';
import CustomersView from './views/CustomersView';
import OfferModal from './components/OfferModal';
import Footer from './components/Footer';

type ViewState = 'home' | 'demo' | 'explore' | 'not-found' | 'pricing' | 'customers';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [showOffer, setShowOffer] = useState(false);

  // Helper to map paths to view states
  const getViewFromPath = (path: string): ViewState => {
    if (path === '/' || path === '') return 'home';
    if (path.includes('see-a-demo')) return 'demo';
    if (path.includes('explore')) return 'explore';
    if (path.includes('pricing')) return 'pricing';
    if (path.includes('customers')) return 'customers';
    if (path.includes('404')) return 'not-found';
    return 'home'; // Defaulting to home for simplicity in this demo
  };

  // Initialize view from URL path
  useEffect(() => {
    const path = window.location.pathname;
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');

    if (viewParam && ['demo', 'explore', 'not-found', 'pricing', 'customers'].includes(viewParam)) {
      setCurrentView(viewParam as ViewState);
      const newPath = `/${viewParam === 'demo' ? 'see-a-demo' : viewParam}`;
      window.history.replaceState(null, '', newPath);
    } else {
      setCurrentView(getViewFromPath(path));
    }

    const handlePopState = () => {
      setCurrentView(getViewFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  useEffect(() => {
    let inactivityTimer: number;
    
    const resetTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = window.setTimeout(() => {
        if (!showOffer && currentView === 'home') setShowOffer(true);
      }, 60000); // 60 seconds
    };

    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keypress', resetTimer);
    resetTimer();

    return () => {
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keypress', resetTimer);
      clearTimeout(inactivityTimer);
    };
  }, [showOffer, currentView]);

  const navigate = (view: ViewState, newTab: boolean = false) => {
    const path = view === 'home' ? '/' : view === 'demo' ? '/see-a-demo' : `/${view}`;
    
    if (newTab) {
      window.open(path, '_blank');
    } else {
      window.history.pushState(null, '', path);
      setCurrentView(view);
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${showOffer ? 'overflow-hidden' : ''}`}>
      <Navbar onNavigate={navigate} currentView={currentView} />
      
      <main className="flex-1">
        {currentView === 'home' && <HomeView onExplore={() => navigate('explore', false)} />}
        {currentView === 'demo' && <DemoView onBack={() => navigate('home')} />}
        {currentView === 'explore' && <ExploreView />}
        {currentView === 'pricing' && <PricingView />}
        {currentView === 'customers' && <CustomersView />}
        {currentView === 'not-found' && <NotFoundView onNavigate={navigate} />}
      </main>

      {currentView !== 'explore' && <Footer />}

      {showOffer && <OfferModal onClose={() => setShowOffer(false)} />}
    </div>
  );
};

export default App;