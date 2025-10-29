import React from 'react';
import { ArrowRight } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            'url(https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=1920)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-green-500/20 to-yellow-500/30 backdrop-blur-sm"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <div className="max-w-4xl mx-auto bg-white/20 backdrop-blur-md border border-white/30 rounded-3xl shadow-2xl p-8 md:p-12">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            Premium Fresh Fruits
            <span className="block text-green-600 mt-2">
              Delivered to Your Door
            </span>
          </h2>
          <p className="text-lg md:text-xl text-gray-700 mb-8 leading-relaxed">
            Experience the finest selection of organic, locally-sourced fruits.
            From farm to table, we ensure quality, freshness, and exceptional
            service for every order.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-105">
              <span>Shop Now</span>
              <ArrowRight size={20} />
            </button>
            <button className="bg-white/30 backdrop-blur-md border border-white/40 hover:bg-white/50 text-gray-800 font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-200 hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
