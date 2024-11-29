import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { Button, Input } from "@mui/material";
import { ISchedule } from "@/api/schedule.api";
import { useSchedule } from "@/hooks/useSchedule";
import { useLocation } from "react-router-dom";
import { Plan } from "@/pages/TravelDetail";

const ScheduleCategory = [
  {
    categoryId: "1",
    categoryName: "숙소",
  },
  {
    categoryId: "2",
    categoryName: "장소",
  },
  {
    categoryId: "3",
    categoryName: "식당",
  },
  {
    categoryId: "4",
    categoryName: "카페",
  },
  {
    categoryId: "5",
    categoryName: "교통",
  },
  {
    categoryId: "6",
    categoryName: "메모",
  },
];

export default function ScheduleForm({
  forceUpdate,
  date,
  setIsClicked,
}: {
  forceUpdate: () => void;
  date: string;
  setIsClicked: (isClicked: boolean) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [scheduleName, setScheduleName] = useState<string>("");
  const location = useLocation();
  const plan: Plan = location.state?.plan;
  const { createSchedule } = useSchedule(plan.id);
  
  
  const handleBlur = (e: React.FocusEvent) => {
    if (e.currentTarget.contains(e.relatedTarget)) {
      return;
    }
    setIsClicked(false);
  };
  
  const handleAddSchedule = async () => {
    if (selectedCategory && scheduleName) {
      const payload: ISchedule = {
        id: Math.random(),
        tripId: plan.id,
        date: 0,
        startTime: date,
        endTime: date,
        description: scheduleName,
        orderId: 0,
        type: selectedCategory,
      }
      console.log("payload", payload);
      try {
        await createSchedule(payload);
        forceUpdate();
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  return (
    <ScheduleCategoryContainer onBlur={handleBlur} tabIndex={0}>
      {ScheduleCategory.map((category) => (
        <ScheduleCategoryItem
          key={category.categoryId}
          className={selectedCategory === category.categoryId ? "selected" : ""}
          onClick={() => setSelectedCategory(category.categoryId)}
        >
          {category.categoryName}
        </ScheduleCategoryItem>
      ))}
      {selectedCategory && (
        <div className="schedule-form">
          <Input
            className="schedule-form-input"
            value={scheduleName}
            placeholder="일정 이름"
            autoFocus
            onChange={(e) => setScheduleName(e.target.value)}
            required
          />
          <Button variant="contained" onClick={handleAddSchedule}>
            일정 추가
          </Button>
        </div>
      )}
    </ScheduleCategoryContainer>
  );
}

const ScheduleCategoryContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  flex-wrap: wrap;
  
  .schedule-form {
    width: 100%;
    padding: 24px 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    
    .schedule-form-input {
      width: 100%;
    }
  }
`;

const ScheduleCategoryItem = styled.div`
  font-size: 12px;
  padding: 8px 12px;
  border-radius: 12px;
  background: #f5f5f5;
  
  &.selected {
    background: var(--primary-color);
    color: #fff;
  }
  &.selected:hover {
    background: var(--primary-color);
  }
  
  &:hover {
    cursor: pointer;
    background: #f9fafb;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;