import { requestHandler } from "./http";
import { TripPlan } from "@/pages/TravelList";


export const getTravelList = async () => {
  return requestHandler("get", "/api/trip");
}

export const createTravel = async (payload: TripPlan) => {
  return requestHandler("post", "/api/trip", payload);
}
