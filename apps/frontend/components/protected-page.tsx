import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAuthenticated } from '../utils/auth'; // Utility to check token

const ProtectedPage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated()) {
      router.push('/'); // Redirect to login page if not authenticated
    } else {
      setIsLoading(false); // Stop loading when authenticated
    }
  }, [router]);

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state while checking authentication
  }

  return <>{children}</>; // Render protected content when authenticated
};

export default ProtectedPage;
