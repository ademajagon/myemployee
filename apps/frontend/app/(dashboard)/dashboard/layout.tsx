import { Toaster } from '../../../components/ui/toaster';
import { AuthProvider } from '../../../components/auth-provider';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
