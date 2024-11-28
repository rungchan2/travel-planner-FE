import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { app } from '@/lib/firebaseConfig.ts';

const auth = getAuth(app);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const DEFAULT_TIMEOUT = 30000;

const apiClient = axios.create({
	baseURL: API_BASE_URL,
	timeout: DEFAULT_TIMEOUT,
	headers: {
		'Content-Type': 'application/json',
	},
});

// 토큰 자동 첨부
apiClient.interceptors.request.use(
	async (config) => {
		const currentUser = auth.currentUser;
		if (!currentUser) {
			throw new Error('로그인이 필요합니다.');
		}
		const token = await currentUser.getIdToken();
		config.headers.Authorization = `Bearer ${ token }`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

type RequestMethod = 'get' | 'post' | 'put' | 'delete';

export const requestHandlerFB = async <T>(
	method: RequestMethod,
	url: string,
	payload?: T
) => {
	let response;
	
	switch (method) {
		case 'get':
			response = await apiClient.get(url);
			break;
		case 'post':
			response = await apiClient.post(url, payload);
			break;
		case 'put':
			response = await apiClient.put(url, payload);
			break;
		case 'delete':
			response = await apiClient.delete(url);
			break;
	}
	
	return response.data;
};
