import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import GoogleLoginModal from '@/components/login/LoginModal.tsx';
import { app } from '@/lib/firebaseConfig.ts';
import { AuthContext } from './AuthContext';
import CircularIndeterminate from '@/components/LoadingIcon.tsx'; // 수정된 부분

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [displayName, setDisplayName] = useState<string | null>(null);
	const [email, setEmail] = useState<string | null>(null);
	const [photoURL, setPhotoURL] = useState<string | null>(null);
	const [authLoading, setAuthLoading] = useState<boolean>(true);
	const [authenticated, setAuthenticated] = useState(false);
	
	useEffect(() => {
		const auth = getAuth(app);
		// 인증 상태 변경 감지
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			if (currentUser) {
				setUser(currentUser);
				setAuthenticated(true);
				setDisplayName(currentUser.displayName);
				setEmail(currentUser.email);
				setPhotoURL(currentUser.photoURL);
			} else {
				setUser(null);
				setAuthenticated(false);
				setDisplayName(null);
				setEmail(null);
				setPhotoURL(null);
			}
			setAuthLoading(false);
		});
		
		return () => {
			unsubscribe();
		};
	}, []);
	
	return (
		<AuthContext.Provider value={{ user, authenticated, displayName, email, photoURL, authLoading }}>
			{children}
			{!user && !authLoading && <GoogleLoginModal />}
			{authLoading && <CircularIndeterminate />}
		</AuthContext.Provider>
	);
};

export default AuthProvider; // export default로 변경
