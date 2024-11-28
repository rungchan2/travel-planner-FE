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

export interface ISchedule {
  id: number;
  tripId: number;
  date: number;
  startTime: string;
  endTime: string;
  description: string;
  orderId: number;
  type: string;
}

export interface ScheduleList {
  schedules: ISchedule[];
}

export const createScheduleList = async (payload: ScheduleList) => {
  return requestHandler("post", "/api/schedule", payload);
};

export const getScheduleList = async (tripId: number) => {
  return requestHandler("get", `/api/schedule/${tripId}`);
};

export const deleteScheduleList = async (scheduleId: number) => {
  return requestHandler("delete", `/api/schedule/${scheduleId}`);
};
