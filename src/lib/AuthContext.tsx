import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import GoogleLoginModal from '@/components/login/LoginModal.tsx';
import { app } from '@/lib/firebaseConfig.ts';

interface AuthContextProps {
  user: User | null;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  user: null,
  displayName: null,
  email: null,
  photoURL: null,
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [photoURL, setPhotoURL] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  
  useEffect(() => {
    const auth = getAuth(app);
    // 인증 상태 변경 감지
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
      setDisplayName(currentUser.displayName);
      setEmail(currentUser.email);
      setPhotoURL(currentUser.photoURL);
      } else {
        setDisplayName(null);
        setEmail(null);
        setPhotoURL(null);
      }
      setLoading(false);
      
    });

    return () => {
      unsubscribe();
    };
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, displayName, email, photoURL, loading }}>
      {children}
      {!user && !loading && <GoogleLoginModal />}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);