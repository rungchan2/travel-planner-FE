import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { app } from '@/lib/firebaseConfig.ts';
import { sendAuthRequest } from '@/components/api/api.ts';

// 로그인 실패 시 설정 추가 필요

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 구글 팝업으로 로그인 후 토큰 전송
export const signInWithGoogle = async () => {
  try {
    await setPersistence(auth, browserSessionPersistence); // 브라우저 의존 로그인 상태 유지
    const result = await signInWithPopup(auth, provider);
    const response = await sendAuthRequest('POST', '/api/users/login');
    
    if (response.status !== 200) {
      await auth.signOut();
      throw new Error('로그인 서버에 문제가 발생했습니다.');
    }
    
    return result;
    
  } catch (error) {
    console.error('로그인 중 에러가 발생했습니다: ', error);
    alert('로그인에 실패했습니다. 다시 시도해주세요.');
    return;
  }
}

export const signOut = () => {
  return auth.signOut();
};
