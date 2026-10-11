"use client";
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employeeApi } from '@/lib/api';
import Link from 'next/link';
import { ArrowLeft, Search, UserPlus, Edit2, Archive, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { EditSalaryModal } from '@/components/EditSalaryModal';
import { CreateEmployeeModal } from '@/components/CreateEmployeeModal';

export default function EmployeesPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [country, setCountry] = useState('');
  
  // Modal States
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<any>(null);
  const [archivingEmployee, setArchivingEmployee] = useState<any>(null);

  const queryClient = useQueryClient();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearchQuery(searchInput);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['employees', page, searchQuery, country],
    queryFn: () => employeeApi.getAll({ page, search: searchQuery, country }).then(res => res.data),
    keepPreviousData: true,
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, salary }: { id: number; salary: number }) => employeeApi.updateSalary(id, salary),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      setEditingEmployee(null);
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: any) => employeeApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      setIsCreateOpen(false);
    },
  });

  const archiveMutation = useMutation({
    mutationFn: (id: number) => employeeApi.archive(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['employees'] });
      setArchivingEmployee(null);
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      {/* Centralized Breathable Container */}
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/" className="p-2 bg-white rounded-lg shadow-sm border border-gray-200 hover:bg-gray-50 text-gray-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Employee Directory</h1>
            <p className="text-gray-500 mt-1">Manage salaries for {data?.meta?.total_count?.toLocaleString() || 0} employees</p>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
          <form onSubmit={handleSearch} className="flex gap-3 flex-1 w-full md:w-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input type="text" placeholder="Search by name, email..." className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-gray-900" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
            </div>
            <button type="submit" className="bg-gray-900 text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800">Search</button>
          </form>
          <div className="flex gap-3 w-full md:w-auto">
            <select className="border border-gray-300 rounded-lg px-4 py-2 text-gray-700 outline-none focus:ring-2 focus:ring-blue-500" value={country} onChange={(e) => { setCountry(e.target.value); setPage(1); }}>
              <option value="">All Countries</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
              <option value="India">India</option>
            </select>
            <button onClick={() => setIsCreateOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 flex items-center gap-2 whitespace-nowrap">
              <UserPlus className="w-4 h-4" /> Add Employee
            </button>
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="bg-white p-12 rounded-xl shadow-sm border text-center text-gray-500">Loading employees...</div>
        ) : error ? (
          <div className="bg-red-50 p-6 rounded-xl border border-red-100 text-red-600">Error: {error.message}</div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Employee</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Country</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Department</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Salary</th>
                    <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {data?.data.map((emp: any) => (
                    <tr key={emp.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900">{emp.first_name} {emp.last_name}</div>
                        <div className="text-sm text-gray-500">{emp.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{emp.country}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{emp.department}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 text-right">
                        {emp.currency} {emp.salary.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <button onClick={() => setEditingEmployee(emp)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"><Edit2 className="w-4 h-4" /></button>
                          <button onClick={() => setArchivingEmployee(emp)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg"><Archive className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {data?.meta && (
          <div className="flex justify-between items-center mt-6 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
            <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="flex items-center gap-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              <ChevronLeft className="w-4 h-4" /> Previous
            </button>
            <span className="text-sm text-gray-600 font-medium">Page {data.meta.current_page} of {data.meta.total_pages}</span>
            <button disabled={page === data.meta.total_pages} onClick={() => setPage(p => p + 1)} className="flex items-center gap-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 disabled:opacity-50">
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Modals */}
        <EditSalaryModal 
          isOpen={!!editingEmployee} 
          onClose={() => setEditingEmployee(null)} 
          employee={editingEmployee} 
          onSave={(id: number, salary: number) => updateMutation.mutate({ id, salary })} 
          isSaving={updateMutation.isPending} 
        />
        
        <CreateEmployeeModal 
          isOpen={isCreateOpen} 
          onClose={() => setIsCreateOpen(false)} 
          onSave={(data: any) => createMutation.mutate(data)} 
          isSaving={createMutation.isPending} 
        />

        {/* Archive Confirmation Modal */}
        {archivingEmployee && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Archive Employee</h2>
              <p className="text-gray-600 mb-6">Are you sure you want to archive {archivingEmployee.first_name}? This action will hide them from the directory.</p>
              <div className="flex justify-end gap-3">
                <button onClick={() => setArchivingEmployee(null)} className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
                <button onClick={() => archiveMutation.mutate(archivingEmployee.id)} disabled={archiveMutation.isPending} className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50">
                  {archiveMutation.isPending ? 'Archiving...' : 'Archive'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}