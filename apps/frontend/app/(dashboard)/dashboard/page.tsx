'use client';

import { Metadata } from 'next';
import { Button } from '../../../components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/ui/tabs';
// import withAuth from '../../../components/with-auth';
import ProtectedPage from '../../../components/protected-page';

export default function DashboardPage() {
  return (
    <ProtectedPage>
      <div className="flex items-center justify-between space-y-2  sm:flex-row ">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button disabled>Add Employee</Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Doctors</TabsTrigger>
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
    </ProtectedPage>
  );
}
