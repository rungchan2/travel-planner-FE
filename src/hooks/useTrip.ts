import { useEffect, useState } from "react";
import { TripPlan } from "@/pages/TravelList";
import { createTravel, CreateTravelPayload, getTravelList } from '@/api/travel.api';
import { ITravelPlan } from '@/type';

const useTrip = () => {
  const [myTrip, setMyTrip] = useState<TripPlan[]>([]);

  useEffect(() => {
    getTravelList().then((res) => {
      setMyTrip(res.data);
    });
  }, []);
  
  const createTrip = async (createTravelPayload: CreateTravelPayload) => {
    try {
      const res = await createTravel(createTravelPayload);
      alert(res);
      return res;
    } catch (err) {
      alert(err);
      console.log('err', err);
      throw err;
    }
  };
  
  return { myTrip, createTrip };
}

export default useTrip;


