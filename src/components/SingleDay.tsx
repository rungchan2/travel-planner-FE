import SingleSchedule from "./SingleSchedule";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import dayjs from "dayjs";
import { useState } from "react";
import { styled } from "styled-components";
import "dayjs/locale/ko";
//한국어
import AddSchedule from "./AddSchedule";
import { Droppable } from "react-beautiful-dnd";
import { useReducer } from "react";
import { useSchedule } from "@/hooks/useSchedule";
import { useLocation } from "react-router-dom";
import { Plan } from "@/pages/TravelDetail";

dayjs.locale("ko");


export default function SingleDay({ date }: { date: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const plan: Plan = location.state?.plan;
  const { scheduleList } = useSchedule(plan.id);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  
  const filteredSchedules = scheduleList.filter(
    (data) => data.startTime === date);
  
  return (
    <Droppable droppableId={date}>
      {(provided) => (
        <SingleDayContainer
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div className="before" onClick={() => setIsOpen(!isOpen)}>
            {dayjs(date).format("YYYY-MM-DD (ddd)")}
            {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </div>
          <div className="after">
            {isOpen &&
              filteredSchedules.map((data, index) => (
                <SingleSchedule key={data.id} data={data} index={index} />
              ))}
          </div>
          {isOpen ? <AddSchedule forceUpdate={forceUpdate} date={date}/> : null}
        </SingleDayContainer>
      )}
    </Droppable>
  );
}

const SingleDayContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  .before {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .after {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
`;
