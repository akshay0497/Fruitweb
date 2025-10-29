import React, { useState, useEffect } from 'react';
import { TextInput } from '../components/common/TextInput';
import { NumberInput } from '../components/common/NumberInput';
import { Select } from '../components/common/Select';
import { Checkbox } from '../components/common/Checkbox';
import { supabase } from '../lib/supabase';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Decoration {
  id: string;
  decoration_name: string;
  decoration_type: string;
  price: number;
  active: boolean;
}

const decorationTypes = [
  { value: 'Ribbon', label: 'Ribbon' },
  { value: 'Paper Wrap', label: 'Paper Wrap' },
  { value: 'Floral', label: 'Floral' },
  { value: 'Custom', label: 'Custom' },
];

export const DecorationMaster: React.FC = () => {
  const [decorations, setDecorations] = useState<Decoration[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    decoration_name: '',
    decoration_type: '',
    price: '',
    active: true,
  });

  useEffect(() => {
    fetchDecorations();
  }, []);

  const fetchDecorations = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('decorations')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setDecorations(data);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const decorationData = {
      decoration_name: formData.decoration_name,
      decoration_type: formData.decoration_type,
      price: parseFloat(formData.price),
      active: formData.active,
    };

    if (editingId) {
      const { error } = await supabase
        .from('decorations')
        .update(decorationData)
        .eq('id', editingId);

      if (!error) {
        resetForm();
        fetchDecorations();
      }
    } else {
      const { error } = await supabase.from('decorations').insert([decorationData]);

      if (!error) {
        resetForm();
        fetchDecorations();
      }
    }
  };

  const handleEdit = (decoration: Decoration) => {
    setFormData({
      decoration_name: decoration.decoration_name,
      decoration_type: decoration.decoration_type,
      price: decoration.price.toString(),
      active: decoration.active,
    });
    setEditingId(decoration.id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this decoration?')) {
      const { error } = await supabase.from('decorations').delete().eq('id', id);
      if (!error) {
        fetchDecorations();
      }
    }
  };

  const resetForm = () => {
    setFormData({
      decoration_name: '',
      decoration_type: '',
      price: '',
      active: true,
    });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Decoration Master
          </h1>
          <p className="text-gray-600">Manage basket decorations and accessories</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <form
              onSubmit={handleSubmit}
              className="bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl p-6 space-y-4"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {editingId ? 'Edit Decoration' : 'Add New Decoration'}
              </h2>

              <TextInput
                label="Decoration Name"
                placeholder="e.g., Silk Ribbon Red"
                value={formData.decoration_name}
                onChange={(e) =>
                  setFormData({ ...formData, decoration_name: e.target.value })
                }
                required
              />

              <Select
                label="Decoration Type"
                value={formData.decoration_type}
                onChange={(e) =>
                  setFormData({ ...formData, decoration_type: e.target.value })
                }
                options={decorationTypes}
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
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                        Type
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-gray-600">
                          Loading...
                        </td>
                      </tr>
                    ) : decorations.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-gray-600">
                          No decorations found.
                        </td>
                      </tr>
                    ) : (
                      decorations.map((decoration) => (
                        <tr
                          key={decoration.id}
                          className="border-t border-white/20 hover:bg-white/10 transition-colors"
                        >
                          <td className="px-4 py-3 text-gray-800">
                            {decoration.decoration_name}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {decoration.decoration_type}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            ${decoration.price.toFixed(2)}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                decoration.active
                                  ? 'bg-green-500/20 text-green-700'
                                  : 'bg-gray-500/20 text-gray-700'
                              }`}
                            >
                              {decoration.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(decoration)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(decoration.id)}
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
