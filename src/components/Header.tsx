import React from 'react';
import { Apple } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-green-500/30 to-yellow-500/30 backdrop-blur-md border-b border-white/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          <Apple size={40} className="text-green-600" />
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
              FreshFruits
            </h1>
            <p className="text-sm md:text-base text-gray-700 italic">
              Fresh. Organic. Local.
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};
