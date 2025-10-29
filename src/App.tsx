import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from 'react-router-dom';
import { Home } from './pages/Home';
import { BasketMaster } from './pages/BasketMaster';
import { FruitMaster } from './pages/FruitMaster';
import { DecorationMaster } from './pages/DecorationMaster';
import { PurchaseOrder } from './pages/PurchaseOrder';
import { SalesInvoice } from './pages/SalesInvoice';
import { Payment } from './pages/Payment';
import { Refund } from './pages/Refund';
import { Delivery } from './pages/Delivery';
import { Reports } from './pages/Reports';
import { Header } from './components/Header';
import { ChevronDown, Menu, X, Home as HomeIcon } from 'lucide-react';
import { Footer } from './components/Footer';

interface MenuItem {
  name: string;
  children?: { name: string; path: string }[];
}

const menuItems: MenuItem[] = [
  {
    name: 'Master',
    children: [
      { name: 'Fruits', path: '/fruits' },
      { name: 'Basket', path: '/basket' },
      { name: 'Decoration', path: '/decoration' },
    ],
  },
  {
    name: 'Inventory Management',
    children: [
      { name: 'Purchase Order', path: '/purchase-order' },
      { name: 'Sales Invoice', path: '/sales-invoice' },
    ],
  },
  {
    name: 'Payment Management',
    children: [
      { name: 'User Payment', path: '/payment' },
      { name: 'Refund Status', path: '/refund' },
    ],
  },
  {
    name: 'Order Management',
    children: [{ name: 'Order Status', path: '/delivery' }],
  },
  {
    name: 'Report',
    children: [{ name: 'Report List', path: '/reports' }],
  },
];

function AppContent() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleDropdown = (menuName: string) => {
    setOpenDropdown(openDropdown === menuName ? null : menuName);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* ✅ Main Navigation */}
      <nav className="bg-white/10 backdrop-blur-lg border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          {/* Mobile Header */}
          <div className="flex items-center justify-between lg:hidden py-4">
            <button
              onClick={() => handleNavigation('/')}
              className="text-gray-800 hover:text-green-600 transition-colors flex items-center space-x-2"
            >
              <HomeIcon size={20} />
              <span className="font-semibold">Home</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-800 hover:text-green-600 transition-colors"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-1">
            <button
              onClick={() => handleNavigation('/')}
              className="flex items-center space-x-2 px-4 py-4 text-gray-800 hover:text-green-600 hover:bg-white/20 transition-all duration-200 font-medium"
            >
              <HomeIcon size={18} />
              <span>Home</span>
            </button>

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
                        <button
                          key={child.path}
                          onClick={() => handleNavigation(child.path)}
                          className="w-full text-left block px-4 py-3 text-gray-800 hover:bg-white/30 hover:text-green-600 transition-all duration-200"
                        >
                          {child.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Dropdown Menu */}
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
                        <button
                          key={child.path}
                          onClick={() => handleNavigation(child.path)}
                          className="w-full text-left block px-8 py-2 text-gray-700 hover:bg-white/20 hover:text-green-600 transition-all duration-200"
                        >
                          {child.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* ✅ Page Content */}
      <div className="p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fruits" element={<FruitMaster />} />
          <Route path="/basket" element={<BasketMaster />} />
          <Route path="/decoration" element={<DecorationMaster />} />
          <Route path="/purchase-order" element={<PurchaseOrder />} />
          <Route path="/sales-invoice" element={<SalesInvoice />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Header />
      <AppContent />
      <Footer />
    </Router>
  );
}
