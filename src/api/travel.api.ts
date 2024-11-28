import { requestHandler } from "./http";


export const getTravelList = async () => {
  return requestHandler("get", "/api/trip");
}

interface CreateTravelPayload {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
}

export const createTravel = async (payload: CreateTravelPayload) => {
  return requestHandler("post", "/api/trip", payload);
}
