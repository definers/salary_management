"use client";
import { useQuery } from '@tanstack/react-query';
import { dashboardApi } from '@/lib/api';
import Link from 'next/link';

export default function Dashboard() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => dashboardApi.getMetrics().then(res => res.data),
  });

  if (isLoading) return <div className="p-8 text-gray-600">Loading dashboard...</div>;
  if (error) return <div className="p-8 text-red-500 font-bold">Error loading dashboard: {error.message}</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">HR Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded shadow border border-gray-200">
          <h2 className="text-gray-500 text-sm font-semibold uppercase">Total Employees</h2>
          <p className="text-3xl font-bold text-gray-900">{data?.total_employees || 0}</p>
        </div>
        <div className="bg-white p-6 rounded shadow border border-gray-200">
          <h2 className="text-gray-500 text-sm font-semibold uppercase">Total Payroll</h2>
          <p className="text-3xl font-bold text-gray-900">${data?.total_payroll?.toLocaleString() || 0}</p>
        </div>
        <div className="bg-white p-6 rounded shadow border border-gray-200">
          <h2 className="text-gray-500 text-sm font-semibold uppercase">Average Salary</h2>
          <p className="text-3xl font-bold text-gray-900">${data?.avg_salary?.toLocaleString() || 0}</p>
        </div>
      </div>
      <Link href="/employees" className="bg-blue-600 text-white px-6 py-3 rounded font-bold hover:bg-blue-700 inline-block">
        Manage Employees &rarr;
      </Link>
    </div>
  );
}