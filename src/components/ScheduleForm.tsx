import React from 'react'
import styled from 'styled-components';

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
    }
]

export default function ScheduleForm() {

  return (
    <ScheduleCategoryContainer>
        {ScheduleCategory.map((category) => (
            <ScheduleCategoryItem key={category.categoryId}>
                {category.categoryName}
            </ScheduleCategoryItem>
        ))}
    </ScheduleCategoryContainer>
  )
}

const ScheduleCategoryContainer = styled.div`
    display: flex;
    flex: 1;
    justify-content: space-between; 
    flex-wrap: wrap;

    
`

const ScheduleCategoryItem = styled.div`
    font-size: 12px;
    padding: 8px 12px;
    border-radius: 12px;
    background: #f5f5f5;

    &:hover {
        cursor: pointer;
        transition: background 0.3s ease;
        background: #f9fafb;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
`