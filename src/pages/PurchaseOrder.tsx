import React, { useState, useEffect } from 'react';
import { TextInput } from '../components/common/TextInput';
import { NumberInput } from '../components/common/NumberInput';
import { DatePicker } from '../components/common/DatePicker';
import { Select } from '../components/common/Select';
import { Checkbox } from '../components/common/Checkbox';
import { TextArea } from '../components/common/TextArea';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface PurchaseOrder {
  id: string;
  po_number: string;
  po_date: string;
  fruit_id: string;
  price: number;
  gst_percent: number;
  supplier_info: string | null;
  active: boolean;
  fruits?: { fruit_name: string };
}

export const PurchaseOrder: React.FC = () => {
  const [orders, setOrders] = useState<PurchaseOrder[]>([]);
  const [fruits, setFruits] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    po_number: '',
    po_date: new Date().toISOString().split('T')[0],
    fruit_id: '',
    price: '',
    gst_percent: '',
    supplier_info: '',
    active: true,
  });

  useEffect(() => {
    fetchOrders();
    fetchFruits();
  }, []);

  const fetchFruits = async () => {
    // const { data } = await supabase
    //   .from('fruits')
    //   .select('id, fruit_name')
    //   .eq('active', true);

    // if (data) {
    //   setFruits(data.map((f) => ({ value: f.id, label: f.fruit_name })));
    // }
  };

  const fetchOrders = async () => {
    setLoading(true);
    // const { data, error } = await supabase
    //   .from('purchase_orders')
    //   .select('*, fruits(fruit_name)')
    //   .order('created_at', { ascending: false });

    // if (!error && data) {
    //   setOrders(data);
    // }
    setLoading(false);
  };

  const generatePONumber = () => {
    const prefix = 'PO';
    const timestamp = Date.now().toString().slice(-8);
    return `${prefix}-${timestamp}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const orderData = {
      po_number: formData.po_number || generatePONumber(),
      po_date: formData.po_date,
      fruit_id: formData.fruit_id,
      price: parseFloat(formData.price),
      gst_percent: parseFloat(formData.gst_percent) || 0,
      supplier_info: formData.supplier_info || null,
      active: formData.active,
    };

    if (editingId) {
      // const { error } = await supabase
      //   .from('purchase_orders')
      //   .update(orderData)
      //   .eq('id', editingId);

      // if (!error) {
      //   resetForm();
      //   fetchOrders();
      // }
    } else {
      // const { error } = await supabase.from('purchase_orders').insert([orderData]);

      // if (!error) {
      //   resetForm();
      //   fetchOrders();
      // }
    }
  };

  const handleEdit = (order: PurchaseOrder) => {
    setFormData({
      po_number: order.po_number,
      po_date: order.po_date,
      fruit_id: order.fruit_id,
      price: order.price.toString(),
      gst_percent: order.gst_percent.toString(),
      supplier_info: order.supplier_info || '',
      active: order.active,
    });
    setEditingId(order.id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this purchase order?')) {
      // const { error } = await supabase.from('purchase_orders').delete().eq('id', id);
      // if (!error) {
      //   fetchOrders();
      // }
    }
  };

  const resetForm = () => {
    setFormData({
      po_number: '',
      po_date: new Date().toISOString().split('T')[0],
      fruit_id: '',
      price: '',
      gst_percent: '',
      supplier_info: '',
      active: true,
    });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Purchase Orders
          </h1>
          <p className="text-gray-600">Manage fruit purchase orders from suppliers</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <form
              onSubmit={handleSubmit}
              className="bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl p-6 space-y-4"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {editingId ? 'Edit Order' : 'Create Purchase Order'}
              </h2>

              <TextInput
                label="PO Number"
                placeholder="Auto-generated if empty"
                value={formData.po_number}
                onChange={(e) =>
                  setFormData({ ...formData, po_number: e.target.value })
                }
              />

              <DatePicker
                label="PO Date"
                value={formData.po_date}
                onChange={(e) =>
                  setFormData({ ...formData, po_date: e.target.value })
                }
                required
              />

              <Select
                label="Fruit"
                value={formData.fruit_id}
                onChange={(e) =>
                  setFormData({ ...formData, fruit_id: e.target.value })
                }
                options={fruits}
                required
              />

              <NumberInput
                label="Price (USD)"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                min={0.01}
                step={0.01}
                required
              />

              <NumberInput
                label="GST / Sales Tax (%)"
                placeholder="0"
                value={formData.gst_percent}
                onChange={(e) =>
                  setFormData({ ...formData, gst_percent: e.target.value })
                }
                min={0}
                max={100}
                step={0.01}
              />

              <TextArea
                label="Supplier Information"
                placeholder="Supplier name, contact, etc."
                value={formData.supplier_info}
                onChange={(e) =>
                  setFormData({ ...formData, supplier_info: e.target.value })
                }
                rows={2}
              />

              <Checkbox
                label="Active"
                checked={formData.active}
                onChange={(checked) =>
                  setFormData({ ...formData, active: checked })
                }
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
                        PO Number
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                        Date
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                        Fruit
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                        GST %
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
                    ) : orders.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-600">
                          No purchase orders found.
                        </td>
                      </tr>
                    ) : (
                      orders.map((order) => (
                        <tr
                          key={order.id}
                          className="border-t border-white/20 hover:bg-white/10 transition-colors"
                        >
                          <td className="px-4 py-3 text-gray-800 font-semibold">
                            {order.po_number}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {new Date(order.po_date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {order.fruits?.fruit_name || 'N/A'}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            ${order.price.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {order.gst_percent}%
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(order)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(order.id)}
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
