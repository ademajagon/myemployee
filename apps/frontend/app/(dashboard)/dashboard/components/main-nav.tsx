'use client';

import { usePathname, useRouter } from 'next/navigation';
import { cn } from '../../../../components/utils';
import Link from 'next/link';

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem('access_token');

    router.push('/');
  };

  return (
    <nav
      className={cn('flex items-center space-x-4 lg:space-x-6', className)}
      {...props}
    >
      <Link
        href="/dashboard"
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          {
            'text-muted-foreground': pathname !== '/dashboard',
          }
        )}
      >
        Dashboard
      </Link>
      <Link
        href="/dashboard/employees"
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          {
            'text-muted-foreground': pathname !== '/dashboard/employees',
          }
        )}
      >
        Employees
      </Link>
      <button
        onClick={handleLogout}
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          {
            'text-muted-foreground': pathname !== '/',
          }
        )}
      >
        Log Out
      </button>
    </nav>
  );
}
