import React from "react";
import Container from "../components/Container";
import styled from "styled-components";
import { ITrip } from "../type";
import SingleDay from "../components/SingleDay";
import dayjs from "dayjs";
import { DragDropContext, DropResult } from "react-beautiful-dnd";


const scheduleData: ITrip = {
  tripId: "1",
  userId: "1",
  tripPlace: "제주도",
  startDate: "2024-05-01",
  endDate: "2024-05-07",
  imagePath: "",
  isVisited: false,
};

export default function TravelDetail() {
  const dayCount =
    dayjs(scheduleData.endDate).diff(dayjs(scheduleData.startDate), "day") + 1;

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;
    
    if (!destination) return;

    const listOfSchedules : any = {};

    // 같은 날짜 내에서의 이동
    if (source.droppableId === destination.droppableId) {
      const currentSchedules = [...listOfSchedules];
      const daySchedules = currentSchedules.filter(
        schedule => schedule.date === source.droppableId
      );
      
      const [movedSchedule] = daySchedules.splice(source.index, 1);
      daySchedules.splice(destination.index, 0, movedSchedule);
      
    } else {
      // 다른 날짜로 이동
      const currentSchedules = [...listOfSchedules];
      const movedSchedule = currentSchedules.find(
        schedule => 
          schedule.date === source.droppableId && 
          currentSchedules.indexOf(schedule) === source.index
      );

      if (movedSchedule) {
        movedSchedule.date = destination.droppableId;
      }
    }
  };

  return (
      <TDContainer>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="left">
            <InfoCard>
              <p>{scheduleData.tripPlace}</p>
              <h2>제주도 한라산 등반 여행</h2>
              <p>
                {scheduleData.startDate} ~ {scheduleData.endDate}
              </p>
            </InfoCard>
            <ScheduleList>
              {[...Array(dayCount)].map((_, index) => (
                <SingleDay
                  key={index}
                  date={dayjs(scheduleData.startDate)
                    .add(index, "day")
                    .format("YYYY-MM-DD")}
                />
              ))}
            </ScheduleList>
          </div>
          <div className="right">
            <p>지도영역</p>
          </div>
        </DragDropContext>
      </TDContainer>
  );
}

const TDContainer = styled.div`
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;

  .left {
    width: 40%;
  }
  .right {
    width: 60%;
    height: 100%;
    border: 1px solid #e0e0e0;
    padding: 20px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;

    p {
      font-size: 20px;
      font-weight: 600;
    }
  }
`;

const InfoCard = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ScheduleList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
`;
