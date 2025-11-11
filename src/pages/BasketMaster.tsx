import React, { useState, useEffect } from 'react';
import { TextInput } from '../components/common/TextInput';
import { NumberInput } from '../components/common/NumberInput';
import { Checkbox } from '../components/common/Checkbox';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Basket {
  id: string;
  basket_name: string;
  quantity: number;
  weight: number;
  active: boolean;
  created_at: string;
}

export const BasketMaster: React.FC = () => {
  const [baskets, setBaskets] = useState<Basket[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    basket_name: '',
    quantity: '',
    weight: '',
    active: true,
  });

  useEffect(() => {
    fetchBaskets();
  }, []);

  const fetchBaskets = async () => {
    setLoading(true);
    // const { data, error } = await supabase
    //   .from('baskets')
    //   .select('*')
    //   .order('created_at', { ascending: false });

    // if (!error && data) {
    //   setBaskets(data);
    // }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const basketData = {
      basket_name: formData.basket_name,
      quantity: parseInt(formData.quantity),
      weight: parseFloat(formData.weight),
      active: formData.active,
    };

    if (editingId) {
      // const { error } = await supabase
      //   .from('baskets')
      //   .update(basketData)
      //   .eq('id', editingId);

      // if (!error) {
      //   setEditingId(null);
      //   resetForm();
      //   fetchBaskets();
      // }
    } else {
      // const { error } = await supabase.from('baskets').insert([basketData]);

      // if (!error) {
      //   resetForm();
      //   fetchBaskets();
      // }
    }
  };

  const handleEdit = (basket: Basket) => {
    setFormData({
      basket_name: basket.basket_name,
      quantity: basket.quantity.toString(),
      weight: basket.weight.toString(),
      active: basket.active,
    });
    setEditingId(basket.id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this basket?')) {
      // const { error } = await supabase.from('baskets').delete().eq('id', id);
      // if (!error) {
      //   fetchBaskets();
      // }
    }
  };

  const resetForm = () => {
    setFormData({
      basket_name: '',
      quantity: '',
      weight: '',
      active: true,
    });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Basket Master
          </h1>
          <p className="text-gray-600">Manage fruit baskets inventory</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <form
              onSubmit={handleSubmit}
              className="bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl p-6 space-y-4"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {editingId ? 'Edit Basket' : 'Add New Basket'}
              </h2>

              <TextInput
                label="Basket Name"
                placeholder="e.g., Premium Fruit Basket"
                value={formData.basket_name}
                onChange={(e) =>
                  setFormData({ ...formData, basket_name: e.target.value })
                }
                required
              />

              <NumberInput
                label="Quantity"
                placeholder="0"
                value={formData.quantity}
                onChange={(e) =>
                  setFormData({ ...formData, quantity: e.target.value })
                }
                min={1}
                required
              />

              <NumberInput
                label="Weight (lbs)"
                placeholder="0.00"
                value={formData.weight}
                onChange={(e) =>
                  setFormData({ ...formData, weight: e.target.value })
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
                  <span>{editingId ? 'Update' : 'Add'} Basket</span>
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
                        Basket Name
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                        Weight (lbs)
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
                    ) : baskets.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-gray-600">
                          No baskets found. Add your first basket!
                        </td>
                      </tr>
                    ) : (
                      baskets.map((basket) => (
                        <tr
                          key={basket.id}
                          className="border-t border-white/20 hover:bg-white/10 transition-colors"
                        >
                          <td className="px-4 py-3 text-gray-800">
                            {basket.basket_name}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {basket.quantity}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {basket.weight}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                basket.active
                                  ? 'bg-green-500/20 text-green-700'
                                  : 'bg-gray-500/20 text-gray-700'
                              }`}
                            >
                              {basket.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(basket)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(basket.id)}
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
