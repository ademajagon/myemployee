'use client';

import { useUserStore } from '../../../stores/userStore';
import AdminDashboard from './admin-dashboard';
import EmployeeDashboard from './employee-dashboard';
import ProtectedPage from '../../../components/protected-page';

export default function DashboardPage() {
  const { user } = useUserStore();

  return (
    <ProtectedPage>
      {user?.role === 'admin' ? <AdminDashboard /> : <EmployeeDashboard />}
    </ProtectedPage>
  );
}
