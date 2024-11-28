import axios from 'axios';
import { getAuth } from 'firebase/auth';
import { app } from '@/lib/firebaseConfig.ts';
import { ITravelPlan } from '@/type';

const auth = getAuth(app);

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
	baseURL: API_BASE_URL,
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
		config.headers.Authorization = `Bearer ${token}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Request
export const sendRequest = async (
	method: string,
	url: string,
	data?: any
) => {
	try {
		return apiClient({
			method,
			url,
			data,
		});
	} catch (error) {
		console.error('API 요청 에러:', error);
		throw error;
	}
};

// export
export const createTrip = async (tripData: ITravelPlan) => {
	return sendRequest('POST', '/api/trip', tripData);
};

export const getTripList = async () => {
	return sendRequest('GET', '/api/trip');
};

export const deleteTripItem = async (id: number) => {
	return sendRequest('DELETE', `/api/trip/${ id }`);
};

export const loginUser = async () => {
	return sendRequest('POST', '/api/users/login');
};
