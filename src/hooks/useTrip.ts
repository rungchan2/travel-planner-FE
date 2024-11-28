import { useEffect, useState } from "react";
import { TripPlan } from "@/pages/TravelList";
import { getTravelList } from "@/api/travel.api";

const useTrip = () => {
  const [myTrip, setMyTrip] = useState<TripPlan[]>([]);

  useEffect(() => {
    getTravelList().then((res) => {
      setMyTrip(res.data);
    });
  }, []);

  return { myTrip };
}

export default useTrip;