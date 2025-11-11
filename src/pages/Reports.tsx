import React, { useState, useEffect } from 'react';
import { DatePicker } from '../components/common/DatePicker';
import { Select } from '../components/common/Select';
import { FileDown, Search, BarChart3 } from 'lucide-react';

export const Reports: React.FC = () => {
  const [reportType, setReportType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [reportData, setReportData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    successfulPayments: 0,
    pendingDeliveries: 0,
  });

  const reportTypes = [
    { value: 'sales', label: 'Sales Invoices' },
    { value: 'purchases', label: 'Purchase Orders' },
    { value: 'payments', label: 'Payments' },
    { value: 'deliveries', label: 'Deliveries' },
    { value: 'inventory', label: 'Inventory (Fruits)' },
  ];

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    const [salesData, paymentsData, deliveriesData] = await Promise.all([
      supabase.from('sales_invoices').select('price, gst_percent'),
      supabase.from('payments').select('status, amount'),
      supabase.from('deliveries').select('status'),
    ]);

    let totalRevenue = 0;
    if (salesData.data) {
      totalRevenue = salesData.data.reduce((sum, item) => {
        const total = item.price + (item.price * item.gst_percent) / 100;
        return sum + total;
      }, 0);
    }

    const successfulPayments =
      paymentsData.data?.filter((p) => p.status === 'Success').length || 0;
    const pendingDeliveries =
      deliveriesData.data?.filter((d) => d.status === 'Pending').length || 0;

    setSummary({
      totalRevenue,
      totalOrders: salesData.data?.length || 0,
      successfulPayments,
      pendingDeliveries,
    });
  };

  const fetchReportData = async () => {
    if (!reportType) return;

    setLoading(true);
    let query;

    // switch (reportType) {
    //   case 'sales':
    //     query = supabase
    //       .from('sales_invoices')
    //       .select('*, fruits(fruit_name)')
    //       .order('si_date', { ascending: false });
    //     break;
    //   case 'purchases':
    //     query = supabase
    //       .from('purchase_orders')
    //       .select('*, fruits(fruit_name)')
    //       .order('po_date', { ascending: false });
    //     break;
    //   case 'payments':
    //     query = supabase
    //       .from('payments')
    //       .select('*')
    //       .order('created_at', { ascending: false });
    //     break;
    //   case 'deliveries':
    //     query = supabase
    //       .from('deliveries')
    //       .select('*')
    //       .order('created_at', { ascending: false });
    //     break;
    //   case 'inventory':
    //     query = supabase
    //       .from('fruits')
    //       .select('*')
    //       .order('created_at', { ascending: false });
    //     break;
    //   default:
    //     setLoading(false);
    //     return;
    }

    // if (statusFilter) {
    //   query = query.eq(
    //     reportType === 'deliveries' ? 'status' : 'active',
    //     statusFilter === 'active' ? true : statusFilter
    //   );
    // }

    // const { data, error } = await query;

    // if (!error && data) {
    //   setReportData(data);
    // }
    setLoading(false);
  };

  const handleExport = (format: 'csv' | 'excel') => {
    alert(`Export to ${format.toUpperCase()} functionality would be implemented here`);
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 flex items-center space-x-3">
            <BarChart3 size={36} className="text-green-600" />
            <span>Business Reports & Analytics</span>
          </h1>
          <p className="text-gray-600">
            Generate comprehensive reports and track business performance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-500/30 to-green-600/30 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-green-700">
              ${summary.totalRevenue.toFixed(2)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-500/30 to-blue-600/30 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-blue-700">{summary.totalOrders}</p>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/30 to-yellow-600/30 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Successful Payments
            </h3>
            <p className="text-3xl font-bold text-yellow-700">
              {summary.successfulPayments}
            </p>
          </div>
          <div className="bg-gradient-to-br from-orange-500/30 to-orange-600/30 backdrop-blur-md border border-white/30 rounded-2xl shadow-xl p-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Pending Deliveries
            </h3>
            <p className="text-3xl font-bold text-orange-700">
              {summary.pendingDeliveries}
            </p>
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Generate Report</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Select
              label="Report Type"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              options={reportTypes}
              placeholder="Select report type"
            />

            <DatePicker
              label="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />

            <DatePicker
              label="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />

            <Select
              label="Status Filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={[
                { value: '', label: 'All' },
                { value: 'active', label: 'Active' },
                { value: 'inactive', label: 'Inactive' },
              ]}
              placeholder="All statuses"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={fetchReportData}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Search size={20} />
              <span>Generate Report</span>
            </button>

            <button
              onClick={() => handleExport('csv')}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2"
              disabled={reportData.length === 0}
            >
              <FileDown size={20} />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => handleExport('excel')}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2"
              disabled={reportData.length === 0}
            >
              <FileDown size={20} />
              <span>Export Excel</span>
            </button>
          </div>
        </div>

        <div className="bg-white/40 backdrop-blur-md border border-white/40 rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 bg-white/50 border-b border-white/20">
            <h2 className="text-xl font-bold text-gray-800">
              Report Results{' '}
              {reportData.length > 0 && `(${reportData.length} records)`}
            </h2>
          </div>

          <div className="overflow-x-auto max-h-96">
            {loading ? (
              <div className="p-12 text-center text-gray-600">Loading report data...</div>
            ) : reportData.length === 0 ? (
              <div className="p-12 text-center text-gray-600">
                Select a report type and click "Generate Report" to view data
              </div>
            ) : (
              <table className="w-full">
                <thead className="bg-white/50 sticky top-0">
                  <tr>
                    {Object.keys(reportData[0])
                      .filter(
                        (key) =>
                          !key.includes('id') &&
                          !key.includes('created_at') &&
                          !key.includes('updated_at')
                      )
                      .map((key) => (
                        <th
                          key={key}
                          className="px-4 py-3 text-left text-sm font-semibold text-gray-800 capitalize"
                        >
                          {key.replace(/_/g, ' ')}
                        </th>
                      ))}
                  </tr>
                </thead>
                <tbody>
                  {reportData.map((row, index) => (
                    <tr
                      key={index}
                      className="border-t border-white/20 hover:bg-white/10 transition-colors"
                    >
                      {Object.entries(row)
                        .filter(
                          ([key]) =>
                            !key.includes('id') &&
                            !key.includes('created_at') &&
                            !key.includes('updated_at')
                        )
                        .map(([key, value], i) => (
                          <td key={i} className="px-4 py-3 text-gray-800 text-sm">
                            {typeof value === 'object' && value !== null
                              ? JSON.stringify(value)
                              : typeof value === 'boolean'
                              ? value
                                ? 'Yes'
                                : 'No'
                              : String(value || '-')}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
