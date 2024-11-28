import { createContext, useContext } from 'react';
import { User } from 'firebase/auth';

interface AuthContextProps {
  user: User | null;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  authLoading: boolean;
  authenticated: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  displayName: null,
  email: null,
  photoURL: null,
  authLoading: true,
  authenticated: false,
});

export const useAuth = () => useContext(AuthContext);