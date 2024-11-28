import { getScheduleList } from "@/api/schedule.api";
import { Schedule } from "@/api/schedule.api";
import { useEffect, useState } from "react";

export const useSchedule = (tripId: number) => {

    const [scheduleList, setScheduleList] = useState<Schedule[]>([]);

    useEffect(()=> {
        getScheduleList(tripId).then((res)=> {
            setScheduleList(res.schedules)
        })
    }, [])

    
return { scheduleList}
}