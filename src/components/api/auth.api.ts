import { getAuth } from 'firebase/auth';
import apiClient from '@/components/api/api.ts';
import { app } from '@/lib/firebaseConfig.ts';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

const auth = getAuth(app);

// current user에 토큰 전송 (auth에 토큰 전송시 사용)
export const sendAuthRequest = async ( method: HTTPMethod, url: string, data?: any ) => {
	const currentUser = auth.currentUser;
	
	if (!currentUser) {
		throw new Error('잘못된 인증 경로입니다.');
	}
	
	const idToken = await currentUser.getIdToken();
	
	return apiClient({
		method, url, data,
		headers: {
			Authorization: `Bearer ${ idToken }`,
		}
	});
};

// auth 인증 필요 없을 시 사용
export const sendRequest = async (method: HTTPMethod, url: string, data?: any) => {
	return apiClient({
		method, url, data,
	});
};