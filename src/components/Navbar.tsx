import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';

interface MenuItem {
  name: string;
  children?: string[];
}

const menuItems: MenuItem[] = [
  {
    name: 'Master',
    children: ['Fruits', 'Basket', 'Design'],
  },
  {
    name: 'Inventory Management',
    children: ['Purchase Order', 'Sales Order'],
  },
  {
    name: 'Payment Management',
    children: ['User Payment', 'Refund Status'],
  },
  {
    name: 'Order Management',
    children: ['Order Status'],
  },
  {
    name: 'Report',
    children: ['Report List'],
  },
];

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (menuName: string) => {
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  return (
    <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between lg:hidden py-4">
          <span className="text-gray-800 font-semibold">Menu</span>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-800 hover:text-green-600 transition-colors"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-1">
          {menuItems.map((item) => (
            <div key={item.name} className="relative group">
              <button
                onClick={() => toggleDropdown(item.name)}
                className="flex items-center space-x-1 px-4 py-4 text-gray-800 hover:text-green-600 hover:bg-white/20 transition-all duration-200 font-medium"
              >
                <span>{item.name}</span>
                {item.children && <ChevronDown size={18} />}
              </button>

              {item.children && (
                <div className="absolute left-0 mt-0 w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform group-hover:translate-y-0 translate-y-2">
                  <div className="bg-white/20 backdrop-blur-lg border border-white/30 rounded-lg shadow-xl overflow-hidden">
                    {item.children.map((child) => (
                      <a
                        key={child}
                        href={`#${child.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-4 py-3 text-gray-800 hover:bg-white/30 hover:text-green-600 transition-all duration-200"
                      >
                        {child}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden pb-4">
            {menuItems.map((item) => (
              <div key={item.name} className="border-t border-white/20">
                <button
                  onClick={() => toggleDropdown(item.name)}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-800 hover:bg-white/20 transition-all duration-200 font-medium"
                >
                  <span>{item.name}</span>
                  {item.children && (
                    <ChevronDown
                      size={18}
                      className={`transform transition-transform duration-200 ${
                        openDropdown === item.name ? 'rotate-180' : ''
                      }`}
                    />
                  )}
                </button>

                {item.children && openDropdown === item.name && (
                  <div className="bg-white/10 backdrop-blur-md">
                    {item.children.map((child) => (
                      <a
                        key={child}
                        href={`#${child.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-8 py-2 text-gray-700 hover:bg-white/20 hover:text-green-600 transition-all duration-200"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};
