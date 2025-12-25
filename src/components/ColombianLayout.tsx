import React from 'react';

type Section = 'home' | 'reels' | 'news' | 'debates' | 'surveys' | 'tendencies' | 'community';

interface ColombianLayoutProps {
  children: React.ReactNode;
  activeSection?: Section;
  onNavigate?: (section: Section) => void;
}

export const ColombianLayout: React.FC<ColombianLayoutProps> = ({ 
  children, 
  activeSection = 'home', 
  onNavigate 
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-yellow-400 shadow-md">
        <nav className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-900">Adriana Guide</h1>
            <div className="flex gap-4">
              {(['home', 'reels', 'news', 'debates', 'surveys', 'tendencies', 'community'] as const).map((section) => (
                <button
                  key={section}
                  onClick={() => onNavigate?.(section)}
                  className={`px-4 py-2 rounded transition-colors ${
                    activeSection === section
                      ? 'bg-blue-900 text-white'
                      : 'bg-white text-blue-900 hover:bg-blue-100'
                  }`}
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </nav>
      </header>
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
      <footer className="bg-blue-900 text-white py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2025 Adriana Guide. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
