"use client";
import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { employeeApi } from '@/lib/api';

export default function EmployeesPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState(''); // For the text box
  const [searchQuery, setSearchQuery] = useState(''); // For the actual API query
  const [country, setCountry] = useState('');
  const queryClient = useQueryClient();

  // Triggered only on form submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to page 1 on a new search
    setSearchQuery(searchInput);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ['employees', page, searchQuery, country], // Uses searchQuery, not searchInput
    queryFn: () => employeeApi.getAll({ page, search: searchQuery, country }).then(res => res.data),
  });

  const mutation = useMutation({
    mutationFn: ({ id, salary }: { id: number; salary: number }) => employeeApi.updateSalary(id, salary),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['employees'] }),
  });

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-900">Employee Directory</h1>
      
      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-4 mb-6">
        <input 
          type="text" 
          placeholder="Search by name or email..." 
          className="border p-2 rounded w-full text-gray-900"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded font-semibold hover:bg-blue-700">
          Search
        </button>
        <select 
          className="border p-2 rounded text-gray-900"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setPage(1);
          }}
        >
          <option value="">All Countries</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
        </select>
      </form>

      {/* Loading & Error States */}
      {isLoading && <div className="text-gray-600 mb-4">Loading employees...</div>}
      {error && <div className="text-red-500 mb-4">Error: {error.message}</div>}

      {/* Table */}
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-3 text-left text-gray-700">Name</th>
              <th className="p-3 text-left text-gray-700">Email</th>
              <th className="p-3 text-left text-gray-700">Country</th>
              <th className="p-3 text-left text-gray-700">Salary</th>
              <th className="p-3 text-left text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((emp: any) => (
              <tr key={emp.id} className="border-b hover:bg-gray-50">
                <td className="p-3 text-gray-800">{emp.first_name} {emp.last_name}</td>
                <td className="p-3 text-gray-800">{emp.email}</td>
                <td className="p-3 text-gray-800">{emp.country}</td>
                <td className="p-3 text-gray-800">{emp.currency} {emp.salary}</td>
                <td className="p-3">
                  <button 
                    onClick={() => {
                      const newSalary = prompt("Enter new salary:");
                      if (newSalary) mutation.mutate({ id: emp.id, salary: parseFloat(newSalary) });
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
                  >Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data?.meta && (
        <div className="flex justify-between items-center mt-4">
          <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50 text-gray-800">Previous</button>
          <span className="text-gray-700">Page {data.meta.current_page} of {data.meta.total_pages}</span>
          <button disabled={page === data.meta.total_pages} onClick={() => setPage(p => p + 1)} className="bg-gray-200 px-4 py-2 rounded disabled:opacity-50 text-gray-800">Next</button>
        </div>
      )}
    </div>
  );
}