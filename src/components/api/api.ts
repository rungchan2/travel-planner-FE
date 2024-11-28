import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { app } from '@/lib/firebaseConfig.ts';
import { ITravelPlan } from '@/type';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
const auth = getAuth(app);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		'Content-Type': 'application/json',
	},
});

// current user에 토큰 전송 (auth에 토큰 전송시 사용)
export const sendAuthRequest = async ( method: HTTPMethod, url: string, data?: any) => {
	const currentUser = auth.currentUser;

	if (!currentUser) {
		throw new Error('잘못된 인증 경로입니다.');
	}

	const token = await currentUser.getIdToken();
	console.log("토큰", token)

	return apiClient({
		method, url, data,
		headers: {
			Authorization: `Bearer ${ token }`,
		}
	});
};


// trip 설정
export const sendRequest = async (method: HTTPMethod, url: string, data?: ITravelPlan) => {
	const currentUser = auth.currentUser;
	if (!currentUser) {
		throw new Error('로그인이 필요합니다.');
	}
	const token = await currentUser.getIdToken(true);
	
	return apiClient({
		method, url, data,
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	
};