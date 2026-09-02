import React, { useState, useEffect } from 'react';
import { Header, NavPage } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MetricsBanner } from './components/home/MetricsBanner';
import { AudienceHub } from './components/home/AudienceHub';
import { SearchModal } from './components/home/SearchModal';
import { CampusSelector } from './components/campus/CampusSelector';
import { ProcessCatalog } from './components/bpmn/ProcessCatalog';
import { PopViewer } from './components/pop/PopViewer';
import { SelfServiceHub } from './components/self-service/SelfServiceHub';
import { AboutView } from './components/about/AboutView';

export const App: React.FC = () => {
  const [activePage, setActivePage] = useState<NavPage>('home');
  const [selectedProcessCode, setSelectedProcessCode] = useState<string>('POP-CTI-01');
  const [selectedTutorialId, setSelectedTutorialId] = useState<string | undefined>(undefined);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isCampusModalOpen, setIsCampusModalOpen] = useState<boolean>(false);

  // Global Keyboard Shortcut: Ctrl+K or Cmd+K to open Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleNavigate = (page: NavPage, extraData?: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'bpmn' && extraData) {
      setSelectedProcessCode(extraData);
    } else if (page === 'pops' && extraData) {
      setSelectedProcessCode(extraData);
    } else if (page === 'self-service') {
      setSelectedTutorialId(extraData);
    }
  };

  const handleSelectProcessFromSearch = (code: string, targetView: 'bpmn' | 'pop') => {
    setSelectedProcessCode(code);
    setActivePage(targetView === 'bpmn' ? 'bpmn' : 'pops');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectTutorialFromSearch = (tutorialId: string) => {
    setSelectedTutorialId(tutorialId);
    setActivePage('self-service');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-iffar-green selection:text-white">
      {/* Global Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProcess={handleSelectProcessFromSearch}
        onSelectTutorial={handleSelectTutorialFromSearch}
      />

      {/* Multi-Campus Selector Modal */}
      <CampusSelector
        isOpen={isCampusModalOpen}
        onClose={() => setIsCampusModalOpen(false)}
      />

      {/* Institutional Header */}
      <Header
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCampusModal={() => setIsCampusModalOpen(true)}
      />

      {/* Main Content View Switcher */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
        {activePage === 'home' && (
          <div className="space-y-12">
            <MetricsBanner />
            <AudienceHub onNavigate={handleNavigate} />
          </div>
        )}

        {activePage === 'bpmn' && (
          <ProcessCatalog
            initialProcessCode={selectedProcessCode}
            onOpenPop={(code) => {
              setSelectedProcessCode(code);
              setActivePage('pops');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'pops' && (
          <PopViewer
            initialProcessCode={selectedProcessCode}
            onNavigateToBpmn={(code) => {
              setSelectedProcessCode(code);
              setActivePage('bpmn');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'self-service' && (
          <SelfServiceHub
            initialTutorialId={selectedTutorialId}
            onOpenPop={(code) => {
              setSelectedProcessCode(code);
              setActivePage('pops');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activePage === 'about' && <AboutView />}
      </main>

      {/* Institutional Footer */}
      <Footer />
    </div>
  );
};
export default App;
