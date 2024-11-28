import { getScheduleList } from "@/api/schedule.api";
import { ISchedule } from "@/api/schedule.api";
import { useEffect, useState } from "react";
import { createScheduleList, deleteScheduleList } from "@/api/schedule.api";

export const useSchedule = (tripId: number) => {
    
    const [scheduleList, setScheduleList] = useState<ISchedule[]>([]);
    const [numberOfFetched, setNumberOfFetched] = useState<number>(0);
    
    const createSchedule = async (payload: ISchedule) => {
        const response = await createScheduleList({ schedules: [payload] });
        if (response.schedules?.[0]) {
            setScheduleList(prev => [...prev, response.schedules[0]]);
        }
        setNumberOfFetched(numberOfFetched + 1);
    }
    
    const deleteSchedule = async (scheduleId: number) => {
        await deleteScheduleList(scheduleId);
        setScheduleList(prev => prev.filter(schedule => schedule.id !== scheduleId));
    }
    
    useEffect(()=> {
        getScheduleList(tripId).then((res)=> {
            setScheduleList(res.schedules)
            console.log("numberOfFetched", numberOfFetched);
        })
    }, [numberOfFetched])
    
    
    return { scheduleList, createSchedule, deleteSchedule}
}