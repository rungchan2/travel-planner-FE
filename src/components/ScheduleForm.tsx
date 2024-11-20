import React from "react";
import styled from "styled-components";
import { useState } from "react";
import { Button, Input } from "@mui/material";
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
  setIsClicked,
}: {
  setIsClicked: (isClicked: boolean) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [scheduleName, setScheduleName] = useState<string>("");

  const handleBlur = (e: React.FocusEvent) => {
    if (e.currentTarget.contains(e.relatedTarget)) {
      return;
    }
    setIsClicked(false);
  };

  const handleAddSchedule = () => {
    console.log("test", selectedCategory, scheduleName);
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
