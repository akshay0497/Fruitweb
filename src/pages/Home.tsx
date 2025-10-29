import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { Services } from '../components/Services';
import { Contact } from '../components/Contact';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <Services />
      <Contact />
    </div>
  );
};
