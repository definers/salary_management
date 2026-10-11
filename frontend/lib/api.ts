import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // This pulls from .env.local
});

export const employeeApi = {
  getAll: (params: any) => api.get('/employees', { params }),
  updateSalary: (id: number, salary: number) => 
    api.patch(`/employees/${id}`, { employee: { salary } }),
};

export const dashboardApi = {
  getMetrics: () => api.get('/dashboard/metrics'),
};
