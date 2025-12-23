import React from "react";

interface ColombianHomeProps {
  onNavigate: (section: string) => void;
}

export const ColombianHome: React.FC<ColombianHomeProps> = ({ onNavigate }) => {
  return (
    <div className="colombian-home">
      <h1>Welcome to Adriana Guide</h1>
    </div>
  );
};
