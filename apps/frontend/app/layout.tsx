import type { Metadata } from 'next';
import './global.css';
import { Inter } from 'next/font/google';
import { Toaster } from '../components/ui/toaster';
import { AuthProvider } from '../components/auth-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'EMS',
  description: 'Employee Management System',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  );
}
