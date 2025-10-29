import React, { useState } from 'react';
import { TextInput } from './common/TextInput';
import { EmailInput } from './common/EmailInput';
import { TextArea } from './common/TextArea';
import { Select } from './common/Select';
import { Checkbox } from './common/Checkbox';
import { Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    newsletter: false,
  });

  const serviceOptions = [
    { value: 'custom-basket', label: 'Custom Fruit Baskets' },
    { value: 'delivery', label: 'Delivery Service' },
    { value: 'design', label: 'Design Customization' },
    { value: 'organic', label: 'Organic Options' },
    { value: 'other', label: 'Other Inquiry' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-yellow-50/50 to-green-50/50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
              Get in Touch
            </h2>
            <p className="text-lg text-gray-600">
              Have a question or ready to place an order? We're here to help!
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl p-6 md:p-10 space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TextInput
                label="Full Name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />

              <EmailInput
                label="Email Address"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                required
              />
            </div>

            <TextInput
              label="Phone Number"
              placeholder="(555) 123-4567"
              type="tel"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />

            <Select
              label="Service Interested In"
              value={formData.service}
              onChange={(e) =>
                setFormData({ ...formData, service: e.target.value })
              }
              options={serviceOptions}
              placeholder="Choose a service"
              required
            />

            <TextArea
              label="Message"
              placeholder="Tell us about your requirements..."
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              rows={5}
              required
            />

            <Checkbox
              label="Subscribe to our newsletter for exclusive offers and updates"
              checked={formData.newsletter}
              onChange={(checked) =>
                setFormData({ ...formData, newsletter: checked })
              }
            />

            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center space-x-2 hover:scale-105"
            >
              <span>Send Message</span>
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
