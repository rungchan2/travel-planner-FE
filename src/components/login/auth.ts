import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { app } from '@/lib/firebaseConfig.ts';
import { sendAuthRequest } from '@/components/api/auth.api.ts';

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 구글 팝업으로 로그인 후 토큰 전송
export const signInWithGoogle = async () => {
  try {
    await setPersistence(auth, browserSessionPersistence); // 브라우저 의존 로그인 상태 유지
    const result = await signInWithPopup(auth, provider);
    
    await sendAuthRequest('POST', '/api/users/fb_login');
    
    return result;
  } catch (error) {
    console.error('로그인 중 에러가 발생했습니다: ', error);
    throw error;
  }
}

export const signOut = async () => {
  
  try {
    await auth.signOut();
    
  } catch (error) {
    console.error('로그아웃 중 오류가 발생했습니다: ', error);
  }
};
