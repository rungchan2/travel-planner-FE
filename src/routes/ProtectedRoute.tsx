// ProtectedRoute.tsx
import React, { useContext } from 'react';
import { AuthContext } from '../lib/AuthContext.tsx';
import GoogleLoginModal from '../components/login/LoginModal.tsx';

interface ProtectedRouteProps {
  component: React.ComponentType;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <GoogleLoginModal />;
  }

  return <Component />;
};

export default ProtectedRoute;
