import { requestHandler } from "./http";
import { ITravelPlan } from '@/type';
import { requestHandlerFB } from '@/api/fb_http.ts';


export const getTravelList = async () => {
  return requestHandler("get", "/api/trip");
}

export interface CreateTravelPayload {
  name: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
}

export const createTravel = async (payload: CreateTravelPayload) => {
  return requestHandlerFB("post", "/api/trip", payload);
}
