import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '../../../../components/ui/table';
import { Button } from '../../../../components/ui/button';
import { EmployeeEditModal } from './employee-edit'; // Adjust the path as necessary

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: string;
  jobTitle: string;
  startDate: string;
  photo: string;
}

interface AdminTableProps {
  employees: Employee[];
}

type SortColumn = 'firstName' | 'lastName' | 'jobTitle' | 'startDate';
type SortDirection = 'asc' | 'desc';

export function AdminTable({ employees }: AdminTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState<SortColumn>('firstName');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const employeesPerPage = 10;

  const totalPages = Math.ceil(employees.length / employeesPerPage);

  // Sort employees
  const sortedEmployees = [...employees].sort((a, b) => {
    let comparison = 0;
    if (sortColumn === 'startDate') {
      const dateA = new Date(a[sortColumn]);
      const dateB = new Date(b[sortColumn]);
      comparison = dateA.getTime() - dateB.getTime();
    } else {
      if (a[sortColumn] < b[sortColumn]) {
        comparison = -1;
      } else if (a[sortColumn] > b[sortColumn]) {
        comparison = 1;
      }
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const currentEmployees = sortedEmployees.slice(
    (currentPage - 1) * employeesPerPage,
    currentPage * employeesPerPage
  );

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleSort = (column: SortColumn) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const handleRowClick = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  const handleCloseModal = () => {
    setSelectedEmployee(null);
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    // Update the employees list with the updated employee details
    const updatedEmployees = employees.map((emp) =>
      emp.id === updatedEmployee.id ? updatedEmployee : emp
    );
    // Trigger a state update or refetch data here if needed
    setSelectedEmployee(null);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Photo</TableHead>
            <TableHead>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSort('firstName')}
              >
                First Name{' '}
                {sortColumn === 'firstName'
                  ? sortDirection === 'asc'
                    ? '🔼'
                    : '🔽'
                  : ''}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSort('lastName')}
              >
                Last Name{' '}
                {sortColumn === 'lastName'
                  ? sortDirection === 'asc'
                    ? '🔼'
                    : '🔽'
                  : ''}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSort('jobTitle')}
              >
                Job Title{' '}
                {sortColumn === 'jobTitle'
                  ? sortDirection === 'asc'
                    ? '🔼'
                    : '🔽'
                  : ''}
              </Button>
            </TableHead>
            <TableHead>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleSort('startDate')}
              >
                Start Date{' '}
                {sortColumn === 'startDate'
                  ? sortDirection === 'asc'
                    ? '🔼'
                    : '🔽'
                  : ''}
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentEmployees.map((employee) => (
            <TableRow
              key={employee.id}
              onClick={() => handleRowClick(employee)}
            >
              <TableCell>
                <img
                  src={employee.photo}
                  alt="Employee Photo"
                  style={{
                    width: '50px',
                    height: '50px',
                    objectFit: 'cover',
                    borderRadius: '50%',
                    cursor: 'pointer',
                  }}
                />
              </TableCell>
              <TableCell>{employee.firstName}</TableCell>
              <TableCell>{employee.lastName}</TableCell>
              <TableCell>{employee.jobTitle}</TableCell>
              <TableCell>
                {new Date(employee.startDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedEmployee && (
        <EmployeeEditModal
          employee={selectedEmployee}
          onClose={handleCloseModal}
          onUpdate={handleUpdateEmployee}
        />
      )}

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </>
  );
}
