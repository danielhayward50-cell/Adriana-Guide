import { useState } from "react";
import { ColombianLayout } from "./components/ColombianLayout";
import { ColombianHome } from "./components/ColombianHome";
import { EnhancedReelsHub } from "./components/EnhancedReelsHub";
import { EnhancedNewsHub } from "./components/EnhancedNewsHub";
import { EnhancedDebatesSection } from "./components/EnhancedDebatesSection";
import { EnhancedSurveysSection } from "./components/EnhancedSurveysSection";
import { EnhancedTendenciesSection } from "./components/EnhancedTendenciesSection";
import CommunityHub from "./pages/CommunityHub";
import "./index.css";

type Section = 'home' | 'reels' | 'news' | 'debates' | 'surveys' | 'tendencies' | 'community';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');

  const handleNavigate = (section: string) => {
    if (section === activeSection) return;

    setActiveSection(section as Section);
    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'home':
        return <ColombianHome onNavigate={handleNavigate} />;
      case 'reels':
        return <EnhancedReelsHub />;
      case 'news':
        return <EnhancedNewsHub />;
      case 'debates':
        return <EnhancedDebatesSection />;
      case 'surveys':
        return <EnhancedSurveysSection />;
      case 'tendencies':
        return <EnhancedTendenciesSection />;
      case 'community':
        return <CommunityHub />;
      default:
        return <ColombianHome onNavigate={handleNavigate} />;
    }
  };

  return (
    <ColombianLayout 
      activeSection={activeSection} 
      onNavigate={handleNavigate}
    >
      {renderSection()}
    </ColombianLayout>
  );
}
