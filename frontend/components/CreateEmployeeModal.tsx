"use client";
import { useState } from 'react';
import { X, Save } from 'lucide-react';

export function CreateEmployeeModal({ isOpen, onClose, onSave, isSaving }: any) {
  const [formData, setFormData] = useState({
    first_name: '', last_name: '', email: '', country: '', department: '', role: '', salary: 0, currency: 'USD'
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">Add New Employee</h2>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <input type="text" placeholder="First Name" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={e => setFormData({...formData, first_name: e.target.value})} />
          <input type="text" placeholder="Last Name" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={e => setFormData({...formData, last_name: e.target.value})} />
          <input type="email" placeholder="Email" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={e => setFormData({...formData, email: e.target.value})} />
          <input type="number" placeholder="Salary" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" onChange={e => setFormData({...formData, salary: parseFloat(e.target.value)})} />
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" disabled={isSaving} className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 flex items-center gap-2">
              {isSaving ? 'Saving...' : <><Save className="w-4 h-4" /> Save</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
