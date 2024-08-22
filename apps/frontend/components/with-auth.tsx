'use client';

import React from 'react';
import useRequireAuth from '../hooks/useRequireAuth';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthenticatedComponent = (props: any) => {
    useRequireAuth();
    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
