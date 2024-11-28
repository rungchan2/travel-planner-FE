import styled from "styled-components";
import SingleDay from "../components/SingleDay";
import dayjs from "dayjs";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useLocation } from "react-router-dom";

export interface Plan {
  createdAt: string;
  description: string;
  endDate: string;
  id: number;
  imagePath: string | null;
  name: string;
  startDate: string;
  updatedAt: string;
  userId: number;
  
}



export default function TravelDetail() {
  const location = useLocation();
  const plan: Plan = location.state?.plan;

  if (!plan) {
    return <>데이터가 없습니다.</>;
  }

  const dayCount =
    dayjs(plan.endDate).diff(dayjs(plan.startDate), "day") + 1;

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) return;

    const listOfSchedules: any = {};

    // 같은 날짜 내에서의 이동
    if (source.droppableId === destination.droppableId) {
      const currentSchedules = [...listOfSchedules];
      const daySchedules = currentSchedules.filter(
        (schedule) => schedule.date === source.droppableId
      );

      const [movedSchedule] = daySchedules.splice(source.index, 1);
      daySchedules.splice(destination.index, 0, movedSchedule);
    } else {
      // 다른 날짜로 이동
      const currentSchedules = [...listOfSchedules];
      const movedSchedule = currentSchedules.find(
        (schedule) =>
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
            <h2>{plan.name}</h2>
            <p>{plan.description}</p>
            <p>
              {plan.startDate} ~ {plan.endDate}
            </p>
          </InfoCard>
          <ScheduleList>
            {[...Array(dayCount)].map((_, index) => (
              <SingleDay
                key={index}
                date={dayjs(plan.startDate)
                  .add(index, "day")
                  .format("YYYY-MM-DD")}
              />
            ))}
          </ScheduleList>
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
    width: 100%;
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
