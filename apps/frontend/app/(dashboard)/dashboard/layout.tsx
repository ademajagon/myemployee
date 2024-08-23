import { Toaster } from '../../../components/ui/toaster';
import { AuthProvider } from '../../../components/auth-provider';
import { ReactNode } from 'react';
import { MainNav } from './components/main-nav';
import { UserNav } from './components/user-nav';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <AuthProvider>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center px-4">
            <MainNav className="mx-6" />
            <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div>
          </div>
        </div>
        <div className="flex-1 space-y-4 p-8 pt-6">{children}</div>
      </div>
    </AuthProvider>
  );
}
