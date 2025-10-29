import React from 'react';
import { ShoppingBasket, Truck, Palette, Award, Leaf, Clock } from 'lucide-react';

interface ServiceCard {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const services: ServiceCard[] = [
  {
    icon: <ShoppingBasket size={40} />,
    title: 'Custom Fruit Baskets',
    description:
      'Handpicked premium fruits arranged in beautiful custom baskets for any occasion.',
  },
  {
    icon: <Truck size={40} />,
    title: 'Fast Delivery',
    description:
      'Same-day delivery available. Fresh fruits delivered right to your doorstep.',
  },
  {
    icon: <Palette size={40} />,
    title: 'Design Customization',
    description:
      'Personalize your fruit arrangements with custom designs and special requests.',
  },
  {
    icon: <Award size={40} />,
    title: 'Premium Quality',
    description:
      'Only the finest, hand-selected fruits that meet our strict quality standards.',
  },
  {
    icon: <Leaf size={40} />,
    title: 'Organic Options',
    description:
      'Certified organic fruits sourced from local sustainable farms.',
  },
  {
    icon: <Clock size={40} />,
    title: '24/7 Service',
    description:
      'Order anytime, anywhere. Our customer support team is always available.',
  },
];

export const Services: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-green-50/50 to-yellow-50/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive fruit industry solutions tailored to your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl p-6 md:p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
            >
              <div className="text-green-600 mb-4 group-hover:scale-110 transition-transform duration-300">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
