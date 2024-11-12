import React from "react";
import { ISchedule } from "../type";
import { styled } from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useState } from "react";
import SingleSchedule from "./SingleSchedule";
import dayjs from "dayjs";
import "dayjs/locale/ko"; //한국어
dayjs.locale("ko");

const listOfSchedules: ISchedule[] = [
  {
    scheduleId: "1",
    tripId: "1",
    date: "2024-05-01",
    description: "출발",
  },
  {
    scheduleId: "2",
    tripId: "1",
    date: "2024-05-01",
    description: "도착",
  },
  {
    scheduleId: "3",
    tripId: "1",
    date: "2024-05-03",
    description: "해수욕장",
  },
  {
    scheduleId: "4",
    tripId: "1",
    date: "2024-05-02",
    description: "쇼핑",
  },
];

export default function SingleDay({ date }: { date: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <SingleDayContainer onClick={() => setIsOpen(!isOpen)}>
      <div className="before">
        {dayjs(date).format("YYYY-MM-DD (ddd)")}
        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </div>
      <div className="after">
        {isOpen &&
          listOfSchedules.map((data, index) => (
            <SingleSchedule key={index} data={data} />
          ))}
      </div>
    </SingleDayContainer>
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