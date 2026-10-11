"use client";
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api';
import Link from 'next/link';
import { Users, DollarSign, TrendingUp, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboardApi.getMetrics().then(res => res.data),
  });

  if (isLoading) return <div className="p-8 text-gray-500">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-red-500 font-bold">Error loading dashboard: {error.message}</div>;

  const metrics = [
    { title: 'Total Employees', value: data?.total_employees?.toLocaleString(), icon: <Users className="w-5 h-5 text-blue-600" />, bg: 'bg-blue-50' },
    { title: 'Total Payroll', value: `$${data?.total_payroll?.toLocaleString()}`, icon: <DollarSign className="w-5 h-5 text-emerald-600" />, bg: 'bg-emerald-50' },
    { title: 'Average Salary', value: `$${data?.avg_salary?.toLocaleString()}`, icon: <TrendingUp className="w-5 h-5 text-purple-600" />, bg: 'bg-purple-50' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Dashboard Overview</h1>
            <p className="text-gray-500 mt-1">Salary metrics across ACME Organization</p>
          </div>
          <Link 
            href="/employees" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            Manage Employees <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {metrics.map((metric, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-5 transition-shadow hover:shadow-md">
              <div className={`p-3 rounded-lg ${metric.bg}`}>
                {metric.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value || 0}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Placeholder for future charts */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center py-20">
          <p className="text-gray-400 font-medium">Payroll distribution charts coming soon...</p>
        </div>
      </div>
    </div>
  );
}