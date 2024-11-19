import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import axios from "axios";
import { PlusCircle, X } from "lucide-react";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface TripPlan {
  id: string;
  userId: number;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  imagePath: string;
}
const BASE_URL = "https://project-tvimk.run.goorm.site";
const AUTH_TOKEN =
  "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InVzZXIxIiwiZW1haWwiOiJ1c2VyMUBnbWFpbC5jb20iLCJpYXQiOjE3MzIwMTg2OTksImV4cCI6MTczMjQ1MDY5OX0.5UPoaVW750iBgCEkqiSWLdfdDJwwNZXj_KwtAXhQAc4";
axios.defaults.baseURL = "https://project-tvimk.run.goorm.site/";
axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;

const calculateDaysLeft = (startDate: string): number => {
  const today = new Date();
  const start = new Date(startDate);
  const timeDiff = start.getTime() - today.getTime();
  return Math.ceil(timeDiff / (1000 * 3600 * 24));
};

const getDaysLeftText = (daysLeft: number): string => {
  if (daysLeft === 0) return "D-Day";
  if (daysLeft > 0) return `D-${daysLeft}`;
  return `D+${Math.abs(daysLeft)}`;
};

const getDaysLeftColor = (daysLeft: number): string => {
  if (daysLeft === 0) return "bg-green-500 text-white";
  if (daysLeft > 0 && daysLeft <= 7) return "bg-red-500 text-white";
  if (daysLeft > 0) return "bg-blue-500 text-white";
  return "bg-gray-500 text-white";
};

const TravelPlanCard: React.FC<{
  plan: TripPlan;
  onDelete: (id: string) => void;
}> = ({ plan, onDelete }) => {
  const daysLeft = calculateDaysLeft(plan.startDate);
  const daysLeftText = getDaysLeftText(daysLeft);
  return (
    <Link
      to={`/travel/${plan.id}`}
      state={{
        plan: plan,
      }}
      className="block"
    >
      <Card className="w-full relative hover:shadow-lg transition-shadow">
        <div className="absolute top-2 right-2 z-10">
          <button
            onClick={(e) => {
              e.preventDefault();
              onDelete(plan.id);
            }}
            className="p-1 rounded-full bg-white/90 text-gray-500 hover:text-gray-700 hover:bg-white/95 transition-colors"
            aria-label="삭제"
          >
            <X size={16} />
          </button>
        </div>
        <div className="absolute top-2 left-2">
          <Badge variant="secondary" className={getDaysLeftColor(daysLeft)}>
            {daysLeftText}
          </Badge>
        </div>
        <CardHeader className="pt-10">
          <CardTitle>{plan.name}</CardTitle>
          <CardDescription>
            {plan.startDate} - {plan.endDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{plan.description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

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

  const fetchTravelPlans = async () => {
    try {
      axios.get("/api/trip").then((response) => {
        setTrip(response.data);
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
      axios.delete(`/api/trip/${id}`).then((response) => {
        if (response.status === 200) {
          setTrip((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
        } else {
          throw new Error("삭제 실패");
        }
      });
    } catch (error) {
      console.error("오류 발생:", error);
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
              onDelete={handleDeleteByDB}
            />
          ))
        )}
      </div>
    </div>
  );
};
export default Travel;
