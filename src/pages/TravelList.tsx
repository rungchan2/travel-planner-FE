import TravelPlanCard from "../components/TravelPlanCard";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Description } from "@mui/icons-material";
import axios from "axios";
import { getAuth } from "firebase/auth";
import { PlusCircle, X, Pencil } from "lucide-react";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface TripPlan {
  id: string;
  userId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  imagePath?: string;
}

//테스트용 토근
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.withCredentials = true;
//axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

const NoPlanCard: React.FC = () => {
  return (
    <Card className="w-full border-dashed border-2 border-gray-300 rounded-lg p-6">
      <CardContent>
        <div className="text-center">
          <p className="text-lg font-medium text-gray-500">일정이 없습니다.</p>
          <p className="mt-4 text-sm text-muted-foreground">
            여행 계획을 추가하려면 위 버튼을 눌러 새 계획을 만드세요.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

const Travel: React.FC = () => {
  const [myTrip, setTrip] = useState<TripPlan[]>([]);
  const handleEdit = async (updatedTrip: TripPlan) => {
    const { id, name, description, startDate, endDate } = updatedTrip;

    try {
      await axios
        .put(`/trip/${id}`, {
          name,
          description,
          startDate,
          endDate,
        })
        .then(() => {
          setTrip(myTrip.map((trip) => (trip.id === id ? updatedTrip : trip)));
        });
    } catch (error) {
      console.log("handleEdit 오류 발생:", error);
    }
  };

  const fetchTravelPlans = async () => {
    try {
      getAuth()
        .currentUser?.getIdToken()
        .then((token) => {
          axios
            .get("/trip", {
              headers: {
                authorization: `Bearer ${token}`,
              },
            })
            .then((response) => {
              setTrip(response.data);
            });
        });
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchTravelPlans();
  }, []);

  const handleDeleteByDB = async (id: string) => {
    try {
      await axios.delete(`/trip/${id}`).then((response) => {
        if (response.status === 200) {
          setTrip((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
        } else {
          throw new Error("삭제 실패");
        }
      });
    } catch (error) {
      console.error("Delete byDB 오류 발생:", error);
    }
  };
  const numberOfPlans = myTrip.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <p className="text-sm text-muted-foreground mb-2">총 {numberOfPlans}개</p>
      <div className="flex justify-between items-end mb-6">
        <h1 className="text-3xl font-bold">나의 여행 계획</h1>
        <Link to="/" className={buttonVariants()}>
          <PlusCircle className="mr-2 h-4 w-4" /> 새 여행 계획
        </Link>
      </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        {numberOfPlans === 0 ? (
          <NoPlanCard />
        ) : (
          myTrip.map((plan) => (
            <TravelPlanCard
              key={plan.id}
              plan={plan}
              onEdit={handleEdit}
              onDelete={handleDeleteByDB}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default Travel;
