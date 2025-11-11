import React, { useState, useEffect } from 'react';
import { TextInput } from '../components/common/TextInput';
import { NumberInput } from '../components/common/NumberInput';
import { DatePicker } from '../components/common/DatePicker';
import { Select } from '../components/common/Select';
import { Checkbox } from '../components/common/Checkbox';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface SalesInvoice {
  id: string;
  si_number: string;
  si_date: string;
  fruit_id: string;
  price: number;
  gst_percent: number;
  active: boolean;
  fruits?: { fruit_name: string };
}

export const SalesInvoice: React.FC = () => {
  const [invoices, setInvoices] = useState<SalesInvoice[]>([]);
  const [fruits, setFruits] = useState<{ value: string; label: string }[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    si_number: '',
    si_date: new Date().toISOString().split('T')[0],
    fruit_id: '',
    price: '',
    gst_percent: '',
    active: true,
  });

  useEffect(() => {
    fetchInvoices();
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

  const fetchInvoices = async () => {
    setLoading(true);
    // const { data, error } = await supabase
    //   .from('sales_invoices')
    //   .select('*, fruits(fruit_name)')
    //   .order('created_at', { ascending: false });

    // if (!error && data) {
    //   setInvoices(data);
    // }
    setLoading(false);
  };

  const generateSINumber = () => {
    const prefix = 'SI';
    const timestamp = Date.now().toString().slice(-8);
    return `${prefix}-${timestamp}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const invoiceData = {
      si_number: formData.si_number || generateSINumber(),
      si_date: formData.si_date,
      fruit_id: formData.fruit_id,
      price: parseFloat(formData.price),
      gst_percent: parseFloat(formData.gst_percent) || 0,
      active: formData.active,
    };

    if (editingId) {
      // const { error } = await supabase
      //   .from('sales_invoices')
      //   .update(invoiceData)
      //   .eq('id', editingId);

      // if (!error) {
      //   resetForm();
      //   fetchInvoices();
      // }
    } else {
      // const { error } = await supabase.from('sales_invoices').insert([invoiceData]);

      // if (!error) {
      //   resetForm();
      //   fetchInvoices();
      // }
    }
  };

  const handleEdit = (invoice: SalesInvoice) => {
    setFormData({
      si_number: invoice.si_number,
      si_date: invoice.si_date,
      fruit_id: invoice.fruit_id,
      price: invoice.price.toString(),
      gst_percent: invoice.gst_percent.toString(),
      active: invoice.active,
    });
    setEditingId(invoice.id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this invoice?')) {
      // const { error } = await supabase.from('sales_invoices').delete().eq('id', id);
      // if (!error) {
      //   fetchInvoices();
      // }
    }
  };

  const resetForm = () => {
    setFormData({
      si_number: '',
      si_date: new Date().toISOString().split('T')[0],
      fruit_id: '',
      price: '',
      gst_percent: '',
      active: true,
    });
    setEditingId(null);
  };

  const calculateTotal = (price: number, gst: number) => {
    return price + (price * gst) / 100;
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Sales Invoices
          </h1>
          <p className="text-gray-600">Manage customer sales invoices</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <form
              onSubmit={handleSubmit}
              className="bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl p-6 space-y-4"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {editingId ? 'Edit Invoice' : 'Create Sales Invoice'}
              </h2>

              <TextInput
                label="SI Number"
                placeholder="Auto-generated if empty"
                value={formData.si_number}
                onChange={(e) =>
                  setFormData({ ...formData, si_number: e.target.value })
                }
              />

              <DatePicker
                label="Invoice Date"
                value={formData.si_date}
                onChange={(e) =>
                  setFormData({ ...formData, si_date: e.target.value })
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

              {formData.price && (
                <div className="bg-white/50 backdrop-blur-md rounded-lg p-3">
                  <p className="text-sm text-gray-700">
                    Total Amount:{' '}
                    <span className="font-bold text-green-700">
                      ${calculateTotal(
                        parseFloat(formData.price) || 0,
                        parseFloat(formData.gst_percent) || 0
                      ).toFixed(2)}
                    </span>
                  </p>
                </div>
              )}

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
                        SI Number
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
                        Total
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-gray-600">
                          Loading...
                        </td>
                      </tr>
                    ) : invoices.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="px-4 py-8 text-center text-gray-600">
                          No invoices found.
                        </td>
                      </tr>
                    ) : (
                      invoices.map((invoice) => (
                        <tr
                          key={invoice.id}
                          className="border-t border-white/20 hover:bg-white/10 transition-colors"
                        >
                          <td className="px-4 py-3 text-gray-800 font-semibold">
                            {invoice.si_number}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {new Date(invoice.si_date).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {invoice.fruits?.fruit_name || 'N/A'}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            ${invoice.price.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {invoice.gst_percent}%
                          </td>
                          <td className="px-4 py-3 text-gray-800 font-semibold">
                            ${calculateTotal(invoice.price, invoice.gst_percent).toFixed(2)}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(invoice)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(invoice.id)}
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
