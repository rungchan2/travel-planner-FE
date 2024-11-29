import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { PlusCircle } from 'lucide-react';
import React from 'react';
import { useState, useEffect } from "react";
import { Link, redirect } from 'react-router-dom';
import { useAuth } from '@/lib/AuthContext.tsx';
import CircularIndeterminate from '@/components/LoadingIcon.tsx';
import { deleteTravelItem, getTravelList } from '@/api/travel.api.ts';
import TravelPlanCard from '@/components/TravelPlanCard.tsx';

// export const BASE_URL = "https://project-tvimk.run.goorm.site";
// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface TripPlan {
  id: number;
  userId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  imagePath?: string;
}

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
  const { authenticated } = useAuth();
  const [trips, setTrips] = useState<TripPlan[]>([]);
  const [isFetching, setIsFetching] = useState(true); // 데이터 로딩 해결
  
  useEffect(() => {
    if (authenticated) {
      const fetchData = async () => {
        setIsFetching(true);
        try {
          const res = await getTravelList();
          setTrips(res); // 응답 데이터 구조에 따라 수정
        } catch (error) {
          console.error('오류 발생:', error);
          alert(`오류 발생: ${ error }`);
          setTrips([]);
        } finally {
          setIsFetching(false);
        }
      };
      fetchData();
    }
  }, [ authenticated ]);
  
  if (isFetching) {
    return <CircularIndeterminate />;
  }
  
  if (!authenticated) {
    redirect('/');
    return null;
  }
  
  const handleDeleteByDB = async (id: number) => {
    if (authenticated) {
      try {
        const res = await deleteTravelItem(id);
        
        if (res.status === 200) {
        setTrips((plan) => plan.filter((item) => item.id !== id));
        } else {
          throw new Error('삭제 실패');
        }
      } catch (error) {
        console.error('오류 발생:', error);
      }
    }
  }

  const numberOfPlans = trips.length;

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
          trips.map((plan) => (
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
