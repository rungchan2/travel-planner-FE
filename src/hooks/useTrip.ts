// import { useEffect, useState } from "react";
// import { TripPlan } from "@/pages/TravelList";
// import { createTravelItem, createTravelItemPayload, getTravelList } from '@/api/travel.api';
//
// const useTrip = () => {
//   const [myTrip, setMyTrip] = useState<TripPlan[]>([]);
//
//   useEffect(() => {
//     getTravelList().then((res) => {
//       setMyTrip(res.data);
//     });
//   }, []);
//
//   const createTrip = async (createTravelItemPayload: createTravelItemPayload) => {
//     try {
//       const res = await createTravelItem(createTravelItemPayload);
//       alert(res);
//       return res;
//     } catch (err) {
//       alert(err);
//       console.log('err', err);
//       throw err;
//     }
//   };
//
//   return { myTrip, createTrip };
// }
//
// export default useTrip;
//
//
