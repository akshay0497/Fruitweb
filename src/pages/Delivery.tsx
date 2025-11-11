import React, { useState, useEffect } from 'react';
import { TextInput } from '../components/common/TextInput';
import { Select } from '../components/common/Select';
import { TextArea } from '../components/common/TextArea';
import { Plus, Edit2, Trash2, Package } from 'lucide-react';

interface Delivery {
  id: string;
  delivery_name: string;
  status: string;
  remark: string | null;
  delivery_address: string | null;
  created_at: string;
}

const deliveryStatusOptions = [
  { value: 'Pending', label: 'Pending' },
  { value: 'Dispatched', label: 'Dispatched' },
  { value: 'Delivered', label: 'Delivered' },
  { value: 'Cancelled', label: 'Cancelled' },
];

export const Delivery: React.FC = () => {
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    delivery_name: '',
    status: '',
    remark: '',
    delivery_address: '',
  });

  useEffect(() => {
    fetchDeliveries();
  }, []);

  const fetchDeliveries = async () => {
    setLoading(true);
    // const { data, error } = await supabase
    //   .from('deliveries')
    //   .select('*')
    //   .order('created_at', { ascending: false });

    // if (!error && data) {
    //   setDeliveries(data);
    // }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const deliveryData = {
      delivery_name: formData.delivery_name,
      status: formData.status,
      remark: formData.remark || null,
      delivery_address: formData.delivery_address || null,
    };

    if (editingId) {
      // const { error } = await supabase
      //   .from('deliveries')
      //   .update(deliveryData)
      //   .eq('id', editingId);

      // if (!error) {
      //   resetForm();
      //   fetchDeliveries();
      // }
    } else {
      // const { error } = await supabase.from('deliveries').insert([deliveryData]);

      // if (!error) {
      //   resetForm();
      //   fetchDeliveries();
      // }
    }
  };

  const handleEdit = (delivery: Delivery) => {
    setFormData({
      delivery_name: delivery.delivery_name,
      status: delivery.status,
      remark: delivery.remark || '',
      delivery_address: delivery.delivery_address || '',
    });
    setEditingId(delivery.id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this delivery record?')) {
      // const { error } = await supabase.from('deliveries').delete().eq('id', id);
      // if (!error) {
      //   fetchDeliveries();
      // }
    }
  };

  const resetForm = () => {
    setFormData({
      delivery_name: '',
      status: '',
      remark: '',
      delivery_address: '',
    });
    setEditingId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-500/20 text-green-700';
      case 'Cancelled':
        return 'bg-red-500/20 text-red-700';
      case 'Dispatched':
        return 'bg-blue-500/20 text-blue-700';
      case 'Pending':
        return 'bg-yellow-500/20 text-yellow-700';
      default:
        return 'bg-gray-500/20 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
            <Package size={36} className="text-green-600" />
            <span>Order Delivery Management</span>
          </h1>
          <p className="text-gray-600">Track delivery status and order fulfillment</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <form
              onSubmit={handleSubmit}
              className="bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl p-6 space-y-4"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {editingId ? 'Edit Delivery' : 'Create Delivery'}
              </h2>

              <TextInput
                label="Delivery Name / Order ID"
                placeholder="e.g., ORDER-12345"
                value={formData.delivery_name}
                onChange={(e) =>
                  setFormData({ ...formData, delivery_name: e.target.value })
                }
                required
              />

              <Select
                label="Delivery Status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                options={deliveryStatusOptions}
                required
              />

              <TextArea
                label="Delivery Address"
                placeholder="Street, City, State, ZIP"
                value={formData.delivery_address}
                onChange={(e) =>
                  setFormData({ ...formData, delivery_address: e.target.value })
                }
                rows={3}
              />

              <TextArea
                label="Remark"
                placeholder="Delivery notes or special instructions..."
                value={formData.remark}
                onChange={(e) =>
                  setFormData({ ...formData, remark: e.target.value })
                }
                rows={2}
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Plus size={20} />
                  <span>{editingId ? 'Update' : 'Create'}</span>
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 bg-gray-400 hover:bg-gray-500 text-white font-semibold rounded-lg transition-all duration-200"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/50">
                    <tr>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                        Delivery Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                        Address
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                        Remark
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-600">
                          Loading...
                        </td>
                      </tr>
                    ) : deliveries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-600">
                          No deliveries found.
                        </td>
                      </tr>
                    ) : (
                      deliveries.map((delivery) => (
                        <tr
                          key={delivery.id}
                          className="border-t border-white/20 hover:bg-white/10 transition-colors"
                        >
                          <td className="px-4 py-3 text-gray-800 font-semibold">
                            {delivery.delivery_name}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                delivery.status
                              )}`}
                            >
                              {delivery.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-800 max-w-xs truncate">
                            {delivery.delivery_address || '-'}
                          </td>
                          <td className="px-4 py-3 text-gray-800 max-w-xs truncate">
                            {delivery.remark || '-'}
                          </td>
                          <td className="px-4 py-3 text-gray-800 text-sm">
                            {new Date(delivery.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(delivery)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(delivery.id)}
                                className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
                              >
                                <Trash2 size={18} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
