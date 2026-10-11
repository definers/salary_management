import axios from 'axios';

const api = axios.create({
  baseURL: '/api/v1',
});

export const employeeApi = {
  getAll: (params: any) => api.get('/employees', { params }),
  create: (data: any) => api.post('/employees', { employee: data }),
  updateSalary: (id: number, salary: number) => api.patch(`/employees/${id}`, { employee: { salary } }),
  archive: (id: number) => api.delete(`/employees/${id}`),
};

export const dashboardApi = {
  getMetrics: () => api.get('/dashboard/metrics'),
};