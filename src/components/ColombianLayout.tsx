import React from "react";

interface ColombianLayoutProps {
  children: React.ReactNode;
  activeSection?: 'home' | 'reels' | 'news' | 'debates' | 'surveys' | 'tendencies' | 'community';
  onNavigate?: (section: string) => void;
}

export const ColombianLayout: React.FC<ColombianLayoutProps> = ({ 
  children, 
  activeSection = 'home', 
  onNavigate 
}) => {
  return (
    <div className="colombian-layout">
      {children}
    </div>
  );
};
