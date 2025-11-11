import React, { useState, useEffect } from 'react';
import { TextInput } from '../components/common/TextInput';
import { NumberInput } from '../components/common/NumberInput';
import { TextArea } from '../components/common/TextArea';
import { Checkbox } from '../components/common/Checkbox';
import { FileUpload } from '../components/common/FileUpload';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface Fruit {
  id: string;
  fruit_name: string;
  image_url: string | null;
  price: number;
  description: string | null;
  active: boolean;
  created_at: string;
}

export const FruitMaster: React.FC = () => {
  const [fruits, setFruits] = useState<Fruit[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    fruit_name: '',
    price: '',
    description: '',
    active: true,
    image_url: '',
  });

  useEffect(() => {
    fetchFruits();
  }, []);

  const fetchFruits = async () => {
    setLoading(true);
    // const { data, error } = await supabase
    //   .from('fruits')
    //   .select('*')
    //   .order('created_at', { ascending: false });

    // if (!error && data) {
    //   setFruits(data);
    // }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fruitData = {
      fruit_name: formData.fruit_name,
      price: parseFloat(formData.price),
      description: formData.description || null,
      active: formData.active,
      image_url: formData.image_url || null,
    };

    if (editingId) {
      // const { error } = await supabase
      //   .from('fruits')
      //   .update(fruitData)
      //   .eq('id', editingId);

      // if (!error) {
      //   setEditingId(null);
      //   resetForm();
      //   fetchFruits();
      // }
    } else {
      // const { error } = await supabase.from('fruits').insert([fruitData]);

      // if (!error) {
      //   resetForm();
      //   fetchFruits();
      // }
    }
  };

  const handleEdit = (fruit: Fruit) => {
    setFormData({
      fruit_name: fruit.fruit_name,
      price: fruit.price.toString(),
      description: fruit.description || '',
      active: fruit.active,
      image_url: fruit.image_url || '',
    });
    setEditingId(fruit.id);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this fruit?')) {
      // const { error } = await supabase.from('fruits').delete().eq('id', id);
      // if (!error) {
      //   fetchFruits();
      // }
    }
  };

  const resetForm = () => {
    setFormData({
      fruit_name: '',
      price: '',
      description: '',
      active: true,
      image_url: '',
    });
    setImageFile(null);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
            Fruit Master
          </h1>
          <p className="text-gray-600">Manage fruit inventory and pricing</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <form
              onSubmit={handleSubmit}
              className="bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl p-6 space-y-4"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {editingId ? 'Edit Fruit' : 'Add New Fruit'}
              </h2>

              <TextInput
                label="Fruit Name"
                placeholder="e.g., Fresh Strawberries"
                value={formData.fruit_name}
                onChange={(e) =>
                  setFormData({ ...formData, fruit_name: e.target.value })
                }
                required
              />

              <FileUpload
                label="Fruit Image"
                onChange={(file) => {
                  setImageFile(file);
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setFormData({
                        ...formData,
                        image_url: reader.result as string,
                      });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                preview={formData.image_url}
                helperText="JPG or PNG, max 2MB"
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

              <TextArea
                label="Description"
                placeholder="Brief description of the fruit..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                helperText="Max 300 characters"
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
                  <span>{editingId ? 'Update' : 'Add'} Fruit</span>
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
                        Image
                      </th>
                      <th className="px-4 py-3 text-left text-sm font-semibold text-gray-800">
                        Fruit Name
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
                    ) : fruits.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="px-4 py-8 text-center text-gray-600">
                          No fruits found. Add your first fruit!
                        </td>
                      </tr>
                    ) : (
                      fruits.map((fruit) => (
                        <tr
                          key={fruit.id}
                          className="border-t border-white/20 hover:bg-white/10 transition-colors"
                        >
                          <td className="px-4 py-3">
                            {fruit.image_url ? (
                              <img
                                src={fruit.image_url}
                                alt={fruit.fruit_name}
                                className="w-12 h-12 object-cover rounded"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-gray-300 rounded flex items-center justify-center text-xs text-gray-600">
                                No Image
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            {fruit.fruit_name}
                          </td>
                          <td className="px-4 py-3 text-gray-800">
                            ${fruit.price.toFixed(2)}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                fruit.active
                                  ? 'bg-green-500/20 text-green-700'
                                  : 'bg-gray-500/20 text-gray-700'
                              }`}
                            >
                              {fruit.active ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleEdit(fruit)}
                                className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(fruit.id)}
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
