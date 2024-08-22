'use client';

import { useUserStore } from '../../../stores/userStore';
import AdminDashboard from './components/admin-dashboard';
import EmployeeDashboard from './components/employee-dashboard';
import ProtectedPage from '../../../components/protected-page';

export default function DashboardPage() {
  const { user } = useUserStore();

  console.log(user, 'USER');

  return (
    <ProtectedPage>
      {user?.role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />}
    </ProtectedPage>
  );
}
