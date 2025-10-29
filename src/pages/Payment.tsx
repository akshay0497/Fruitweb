import React, { useState, useEffect } from 'react';
import { TextInput } from '../components/common/TextInput';
import { NumberInput } from '../components/common/NumberInput';
import { Select } from '../components/common/Select';
import { TextArea } from '../components/common/TextArea';
import { supabase } from '../lib/supabase';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Payment {
  id: string;
  customer_name: string;
  status: string;
  remark: string | null;
  amount: number | null;
  created_at: string;
}

const statusOptions = [
  { value: 'Success', label: 'Success' },
  { value: 'Failure', label: 'Failure' },
  { value: 'Declined', label: 'Declined' },
];

export const Payment: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    status: '',
    remark: '',
    amount: '',
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setPayments(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const paymentData = {
      customer_name: formData.customer_name,
      status: formData.status,
      remark: formData.remark || null,
      amount: formData.amount ? parseFloat(formData.amount) : null,
    };

    if (editingId) {
      const { error } = await supabase
        .from('payments')
        .update(paymentData)
        .eq('id', editingId);

      if (!error) {
        resetForm();
        fetchPayments();
      }
    } else {
      const { error } = await supabase.from('payments').insert([paymentData]);

      if (!error) {
        resetForm();
        fetchPayments();
      }
    }
  };

  const handleEdit = (payment: Payment) => {
    setFormData({
      customer_name: payment.customer_name,
      status: payment.status,
      remark: payment.remark || '',
      amount: payment.amount?.toString() || '',
    });
    setEditingId(payment.id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this payment record?')) {
      const { error } = await supabase.from('payments').delete().eq('id', id);
      if (!error) {
        fetchPayments();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      customer_name: '',
      status: '',
      remark: '',
      amount: '',
    });
    setEditingId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Success':
        return 'bg-green-500/20 text-green-700';
      case 'Failure':
        return 'bg-red-500/20 text-red-700';
      case 'Declined':
        return 'bg-yellow-500/20 text-yellow-700';
      default:
        return 'bg-gray-500/20 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Payment Management
          </h1>
          <p className="text-gray-600">Track customer payment transactions</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <form
              onSubmit={handleSubmit}
              className="bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl p-6 space-y-4"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {editingId ? 'Edit Payment' : 'Record Payment'}
              </h2>

              <TextInput
                label="Customer Name"
                placeholder="John Doe"
                value={formData.customer_name}
                onChange={(e) =>
                  setFormData({ ...formData, customer_name: e.target.value })
                }
                required
              />

              <NumberInput
                label="Amount (USD)"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                min={0.01}
                step={0.01}
              />

              <Select
                label="Payment Status"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                options={statusOptions}
                required
              />

              <TextArea
                label="Remark"
                placeholder="Additional notes..."
                value={formData.remark}
                onChange={(e) =>
                  setFormData({ ...formData, remark: e.target.value })
                }
                rows={3}
              />

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  <Plus size={20} />
                  <span>{editingId ? 'Update' : 'Add'}</span>
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
                        Customer
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                        Amount
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                        Status
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
                    ) : payments.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-600">
                          No payments found.
                        </td>
                      </tr>
                    ) : (
                      payments.map((payment) => (
                        <tr
                          key={payment.id}
                          className="border-t border-white/20 hover:bg-white/10 transition-colors"
                        >
                          <td className="px-4 py-3 text-gray-800">
                            {payment.customer_name}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {payment.amount ? `$${payment.amount.toFixed(2)}` : 'N/A'}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                payment.status
                              )}`}
                            >
                              {payment.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-800 max-w-xs truncate">
                            {payment.remark || '-'}
                          </td>
                          <td className="px-4 py-3 text-gray-800 text-sm">
                            {new Date(payment.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(payment)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(payment.id)}
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
