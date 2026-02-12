import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomeView from './views/HomeView';
import TeamView from './views/TeamView';
import OnboardingView from './views/OnboardingView';
import TermsView from './views/TermsView';
import DashboardView from './views/DashboardView';
import Footer from './components/Footer';

type ViewState = 'home' | 'team' | 'onboarding' | 'terms' | 'dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const getViewFromPath = (path: string): ViewState => {
    if (path === '/' || path === '') return 'home';
    if (path.includes('onboarding')) return 'onboarding';
    if (path.includes('terms')) return 'terms';
    if (path.includes('dashboard')) return 'dashboard';
    if (path.includes('team')) return 'team';
    return 'home';
  };

  useEffect(() => {
    const path = window.location.pathname;
    setCurrentView(getViewFromPath(path));

    const handlePopState = () => {
      setCurrentView(getViewFromPath(window.location.pathname));
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (view: ViewState, newTab: boolean = false) => {
    const path = view === 'home' ? '/' : `/${view}`;

    if (newTab) {
      window.open(path, '_blank');
    } else {
      window.history.pushState(null, '', path);
      setCurrentView(view);
      window.scrollTo(0, 0);
    }
  };

  if (currentView === 'onboarding') {
    return <OnboardingView />;
  }

  if (currentView === 'dashboard') {
    return <DashboardView />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={navigate} currentView={currentView} />

      <main className="flex-1">
        {currentView === 'home' && <HomeView onExplore={() => navigate('onboarding', false)} />}
        {currentView === 'team' && <TeamView />}
        {currentView === 'terms' && <TermsView />}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;
