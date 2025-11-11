import React, { useState, useEffect } from 'react';
import { TextInput } from '../components/common/TextInput';
import { NumberInput } from '../components/common/NumberInput';
import { Select } from '../components/common/Select';
import { TextArea } from '../components/common/TextArea';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Refund {
  id: string;
  customer_name: string;
  refund_status: string;
  remark: string | null;
  amount: number | null;
  created_at: string;
}

const refundStatusOptions = [
  { value: 'Initiated', label: 'Initiated' },
  { value: 'Completed', label: 'Completed' },
  { value: 'Failed', label: 'Failed' },
];

export const Refund: React.FC = () => {
  const [refunds, setRefunds] = useState<Refund[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    customer_name: '',
    refund_status: '',
    remark: '',
    amount: '',
  });

  useEffect(() => {
    fetchRefunds();
  }, []);

  const fetchRefunds = async () => {
    setLoading(true);
    // const { data, error } = await supabase
    //   .from('refunds')
    //   .select('*')
    //   .order('created_at', { ascending: false });

    // if (!error && data) {
    //   setRefunds(data);
    // }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const refundData = {
      customer_name: formData.customer_name,
      refund_status: formData.refund_status,
      remark: formData.remark || null,
      amount: formData.amount ? parseFloat(formData.amount) : null,
    };

    if (editingId) {
      // const { error } = await supabase
      //   .from('refunds')
      //   .update(refundData)
      //   .eq('id', editingId);

      // if (!error) {
      //   resetForm();
      //   fetchRefunds();
      // }
    } else {
      // const { error } = await supabase.from('refunds').insert([refundData]);

      // if (!error) {
      //   resetForm();
      //   fetchRefunds();
      // }
    }
  };

  const handleEdit = (refund: Refund) => {
    setFormData({
      customer_name: refund.customer_name,
      refund_status: refund.refund_status,
      remark: refund.remark || '',
      amount: refund.amount?.toString() || '',
    });
    setEditingId(refund.id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this refund record?')) {
      // const { error } = await supabase.from('refunds').delete().eq('id', id);
      // if (!error) {
      //   fetchRefunds();
      // }
    }
  };

  const resetForm = () => {
    setFormData({
      customer_name: '',
      refund_status: '',
      remark: '',
      amount: '',
    });
    setEditingId(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/20 text-green-700';
      case 'Failed':
        return 'bg-red-500/20 text-red-700';
      case 'Initiated':
        return 'bg-blue-500/20 text-blue-700';
      default:
        return 'bg-gray-500/20 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Refund Management
          </h1>
          <p className="text-gray-600">Track payment refund requests and status</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <form
              onSubmit={handleSubmit}
              className="bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl p-6 space-y-4"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {editingId ? 'Edit Refund' : 'Record Refund'}
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
                label="Refund Amount (USD)"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: e.target.value })
                }
                min={0.01}
                step={0.01}
              />

              <Select
                label="Refund Status"
                value={formData.refund_status}
                onChange={(e) =>
                  setFormData({ ...formData, refund_status: e.target.value })
                }
                options={refundStatusOptions}
                required
              />

              <TextArea
                label="Remark"
                placeholder="Reason for refund or additional notes..."
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
                    ) : refunds.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="px-4 py-8 text-center text-gray-600">
                          No refunds found.
                        </td>
                      </tr>
                    ) : (
                      refunds.map((refund) => (
                        <tr
                          key={refund.id}
                          className="border-t border-white/20 hover:bg-white/10 transition-colors"
                        >
                          <td className="px-4 py-3 text-gray-800">
                            {refund.customer_name}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {refund.amount ? `$${refund.amount.toFixed(2)}` : 'N/A'}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                refund.refund_status
                              )}`}
                            >
                              {refund.refund_status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-gray-800 max-w-xs truncate">
                            {refund.remark || '-'}
                          </td>
                          <td className="px-4 py-3 text-gray-800 text-sm">
                            {new Date(refund.created_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(refund)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(refund.id)}
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
