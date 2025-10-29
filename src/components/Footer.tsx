import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-green-600/20 to-yellow-600/20 backdrop-blur-md border-t border-white/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              FreshFruits USA
            </h3>
            <p className="text-gray-700 mb-4 leading-relaxed">
              Your trusted partner for premium fresh fruits, custom baskets, and
              exceptional service across the United States.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Contact Info
            </h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3 text-gray-700">
                <MapPin size={20} className="mt-1 flex-shrink-0" />
                <span>123 Fresh Market St, California, CA 90210</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Phone size={20} className="flex-shrink-0" />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-700">
                <Mail size={20} className="flex-shrink-0" />
                <span>info@freshfruitsusa.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Follow Us
            </h3>
            <p className="text-gray-700 mb-4">
              Stay connected for the latest updates and exclusive offers
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-white/20 backdrop-blur-md border border-white/30 p-3 rounded-lg hover:bg-white/40 hover:scale-110 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook size={24} className="text-gray-800" />
              </a>
              <a
                href="#"
                className="bg-white/20 backdrop-blur-md border border-white/30 p-3 rounded-lg hover:bg-white/40 hover:scale-110 transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter size={24} className="text-gray-800" />
              </a>
              <a
                href="#"
                className="bg-white/20 backdrop-blur-md border border-white/30 p-3 rounded-lg hover:bg-white/40 hover:scale-110 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={24} className="text-gray-800" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-white/30 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-700 text-sm text-center md:text-left">
              &copy; {currentYear} FreshFruits USA. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-green-600 transition-colors"
              >
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
