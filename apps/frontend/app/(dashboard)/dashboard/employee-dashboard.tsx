'use client';

import { Button } from '../../../components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../../../components/ui/tabs';

export default function EmployeeDashboard() {
  return (
    <div>
      <div className="flex items-center justify-between space-y-2 sm:flex-row">
        <h2 className="text-3xl font-bold tracking-tight">
          Employee Dashboard
        </h2>
        <div className="flex items-center space-x-2">
          <Button disabled>View Profile</Button>
        </div>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="notifications" disabled>
            Notifications
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <p>Viewing His Profile</p>
      <p>Changing His Data</p>
    </div>
  );
}
