import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { PlusCircle, X } from "lucide-react";
import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface TravelPlan {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  description: string;
}

const initialTravelPlans: TravelPlan[] = [
  {
    id: "1",
    title: "도쿄 여행",
    startDate: "2023-09-15",
    endDate: "2023-09-22",
    description: "일본의 수도 도쿄를 탐험",
  },
  {
    id: "2",
    title: "제주도 힐링 여행",
    startDate: "2024-12-20",
    endDate: "2024-12-25",
    description: "제주도의 아름다운 자연을 즐기는 5일간의 휴식",
  },
  {
    id: "3",
    title: "파리 로맨틱 여행",
    startDate: "2024-11-20",
    endDate: "2024-11-27",
    description: "프랑스의 낭만적인 수도 파리를 둘러보는 7일간의 여행",
  },
  {
    id: "4",
    title: "한국 경주 여행",
    startDate: "2024-11-14",
    endDate: "2024-11-20",
    description: "한국 경주 여행",
  },
];

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
  plan: TravelPlan;
  onDelete: (id: string) => void;
}> = ({ plan, onDelete }) => {
  const daysLeft = calculateDaysLeft(plan.startDate);
  const daysLeftText = getDaysLeftText(daysLeft);
  return (
    <Link to={`/travel-plans/${plan.id}`} className="block">
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
          <CardTitle>{plan.title}</CardTitle>
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

const MyPlanPage: React.FC = () => {
  const [myPlanData, setPlanData] = useState<TravelPlan[]>(initialTravelPlans);

  // 삭제 함수 - 로컬 상태에서 여행 계획 삭제
  const handleDelete = (id: string) => {
    setPlanData((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
  };
  const handleDeleteByDB = async (id: string) => {
    try {
      const response = await fetch(`/api/schedules/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        setPlanData((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
      } else {
        throw new Error("삭제 실패");
      }
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  const fetchTravelPlans = async () => {
    try {
      const response = await fetch("/api/schedules/", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      response.json().then((data) => {
        setPlanData(data);
      });
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  useEffect(() => {
    fetchTravelPlans();
  }, []); //

  const numberOfPlans = myPlanData.length;

  return (
    <div className="container mx-auto px-4 py-8">
      <p className="text-sm text-muted-foreground mb-2">총 {numberOfPlans}개</p>
      <div className="flex justify-between items-end mb-6">
        <h1 className="text-3xl font-bold">나의 여행 계획</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" /> 새 여행 계획
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        {numberOfPlans === 0 ? (
          <NoPlanCard />
        ) : (
          myPlanData.map((plan) => (
            <TravelPlanCard key={plan.id} plan={plan} onDelete={handleDelete} />
          ))
        )}
      </div>
    </div>
  );
};
export default MyPlanPage;
