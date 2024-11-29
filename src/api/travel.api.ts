import { requestHandlerFB } from '@/api/fb_http.ts';

export interface createTravelItemPayload {
  name: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
}

export const getTravelList = async () => {
  return requestHandlerFB('get', '/api/trip');
}

export const createTravelItem = async (payload: createTravelItemPayload) => {
  return requestHandlerFB('post', '/api/trip', payload);
}

export const deleteTravelItem = async (id: number) => {
  return requestHandlerFB('delete', `/api/trip/${ id }`);
};