import React, { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import HomeView from './views/HomeView';
import TeamView from './views/TeamView';
import TermsView from './views/TermsView';
import PrivacyView from './views/PrivacyView';
import Footer from './components/Footer';

const OnboardingView = lazy(() => import('./views/OnboardingView'));
const DashboardView = lazy(() => import('./views/DashboardView'));

const Loading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
  </div>
);

type ViewState = 'home' | 'team' | 'onboarding' | 'terms' | 'privacy' | 'dashboard';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const getViewFromPath = (path: string): ViewState => {
    if (path === '/' || path === '') return 'home';
    if (path.includes('onboarding')) return 'onboarding';
    if (path.includes('privacy')) return 'privacy';
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
    return (
      <Suspense fallback={<Loading />}>
        <OnboardingView />
      </Suspense>
    );
  }

  if (currentView === 'dashboard') {
    return (
      <Suspense fallback={<Loading />}>
        <DashboardView />
      </Suspense>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={navigate} currentView={currentView} />

      <main className="flex-1">
        {currentView === 'home' && <HomeView onExplore={() => navigate('onboarding', false)} />}
        {currentView === 'team' && <TeamView />}
        {currentView === 'terms' && <TermsView />}
        {currentView === 'privacy' && <PrivacyView />}
      </main>

      <Footer onNavigate={navigate} />
    </div>
  );
};

export default App;
