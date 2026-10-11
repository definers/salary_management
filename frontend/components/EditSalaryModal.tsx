"use client";
import { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

export function EditSalaryModal({ isOpen, onClose, employee, onSave, isSaving }: any) {
  const [salary, setSalary] = useState<number>(0);

  useEffect(() => {
    if (employee) setSalary(employee.salary);
  }, [employee]);

  if (!isOpen || !employee) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(employee.id, salary);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Edit Salary</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-sm text-gray-500 mb-1">Employee</p>
          <p className="font-medium text-gray-900 mb-4">{employee.first_name} {employee.last_name}</p>
          <label className="block text-sm font-medium text-gray-700 mb-2">New Salary ({employee.currency})</label>
          <input type="number" required value={salary} onChange={(e) => setSalary(parseFloat(e.target.value))} className="w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-medium" />
          <div className="flex justify-end gap-3 pt-6">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" disabled={isSaving} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">
              {isSaving ? 'Saving...' : <><Save className="w-4 h-4" /> Save Changes</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}