import { render, screen } from '@testing-library/react';
import { EmployeeTable } from '@/components/EmployeeTable';

const mockEmployees = [
  { id: 1, first_name: 'John', last_name: 'Doe', email: 'john@example.com', country: 'USA', salary: 100000, currency: 'USD' },
];

describe('EmployeeTable', () => {
  it('renders employee data', () => {
    render(<EmployeeTable employees={mockEmployees} onEdit={jest.fn()} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
});
