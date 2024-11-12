import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { PlusCircle, ArrowRight } from "lucide-react";
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

const travelPlans: TravelPlan[] = [
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
    startDate: "2023-11-10",
    endDate: "2023-11-17",
    description: "프랑스의 낭만적인 수도 파리를 둘러보는 7일간의 여행",
  },
];

const TravelPlanCard: React.FC<{ plan: TravelPlan }> = ({ plan }) => {
  const dDay = (startDate: string) => {
    const today = new Date();
    const start = new Date(startDate);
    const diff = start.getTime() - today.getTime();
    const day = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
    if (day < 0) {
      return `D+${Math.abs(day)}`;
    }
    return `D-${day}`;
  };

  const daysLeft = dDay(plan.startDate);

  return (
    <Link to={`/travel-plans/${plan.id}`}>
      <Card className="w-full">
        <Badge>{daysLeft}</Badge>
        <CardHeader>
          <CardTitle>{plan.title}</CardTitle>
          <CardDescription>
            {plan.startDate} - {plan.endDate}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>{plan.description}</p>
        </CardContent>
        <CardFooter>
          <Link to={`/travel-plans/${plan.id}`}></Link>
        </CardFooter>
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

type TravelPlans = TravelPlan[];
const MyPlanPage: React.FC = () => {
  const [myPlanData, setPlanData] = useState<TravelPlans>(travelPlans);
  const fetchTravelPlans = async () => {
    try {
      const response = await fetch("/api/schedules/:id", {
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
          travelPlans.map((plan) => (
            <TravelPlanCard key={plan.id} plan={plan} />
          ))
        )}
      </div>
    </div>
  );
};
export default MyPlanPage;
