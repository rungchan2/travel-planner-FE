import styled from "styled-components";
import ScheduleForm from './ScheduleForm';
import { useState } from 'react';

export default function AddSchedule() {
    const [isClicked, setIsClicked] = useState<boolean>(false);

    const handleClick = () => {
        setIsClicked(true);
    }
  return (
    <ScheduleContainer onClick={handleClick}>
        {isClicked ? <ScheduleForm setIsClicked={setIsClicked}/> : <p>+ 일정 추가</p>}
    </ScheduleContainer>
  )
}

const ScheduleContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);

`;