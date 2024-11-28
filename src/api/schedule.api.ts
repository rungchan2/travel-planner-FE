import { requestHandler } from "./http";

// const data = {
//   tripId: 25,
//   date: 18,
//   startTime: "12:00",
//   endTime: "13:00",
//   description: "점심 맛도리",
//   orderId: 1,
//   type: "식당",
// };

export interface Schedule {
  tripId: number;
  date: number;
  startTime: string;
  endTime: string;
  description: string;
  orderId: number;
  type: string;
}

export interface ScheduleList {
  schedules: Schedule[];
}

export const createScheduleList = async (payload: ScheduleList) => {
  return requestHandler("post", "/api/scheule", payload);
};

export const getScheduleList = async (tripId: number) => {
  return requestHandler("get", `/api/scheule/${tripId}`);
};

