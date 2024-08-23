'use client';

import { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/ui/tabs';
import { AdminTable } from './components/admin-table';
import { getEmployees } from '../../../services/authService';
import { EmployeeCreateModal } from './components/employee-create';

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  birthdate: string;
  jobTitle: string;
  startDate: string;
  photo: string;
}

export default function AdminDashboard() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const data = await getEmployees();
        setEmployees(data.data);
      } catch (error) {
        console.error('Failed to fetch employees', error);
      }
    }

    fetchEmployees();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between space-y-2 sm:flex-row">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <div className="flex items-center space-x-2">
          <EmployeeCreateModal />
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Employees</TabsTrigger>
          <TabsTrigger value="analytics" disabled>
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" disabled>
            Reports
          </TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            Notifications
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* <p>Creating Employees</p> */}
      <AdminTable employees={employees} />
      {/* <p>View Pagination Employees 10</p> */}
      {/* <p>Add Multiple Addresses to Employees</p> */}
    </div>
  );
}
