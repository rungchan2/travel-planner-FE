import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from "styled-components";
import {TextField} from "@mui/material";
import {useTypedDispatch} from '../hooks/redux.ts';
import {setTitle, setLocation, setDateRange} from '../store/plannerSlice.ts';
import Container from "../components/Container.tsx";
import DateRangeInput from "../components/FormFields/DateInput.tsx";
import SubmitButton from "../components/FormFields/SubmitButton.tsx";

const MainPage: React.FC = () => {
  const [title, setTitleInput] = useState('');
  const [location, setLocationInput] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    if (!title || !location || !startDate || !endDate) {
      alert('모든 필드를 입력해 주세요.'); // 유효성 검사 (임시)
      return;
    }
    dispatch(setTitle(title));
    dispatch(setLocation(location));
    dispatch(setDateRange({ startDate, endDate }));
    navigate('/'); // 여행 계획 페이지로 이동
  };

  return (
    <Container>
      <Contents>
        <h1>여행</h1>
        <InputArea>
          <TextField
            required={true}
            id="outlined-required"
            label='여행 이름'
            value={title}
            onChange={(e) => setTitleInput(e.target.value)}
          />
          <TextField
            required={true}
            id="outlined-required"
            label='여행 장소'
            value={location}
            onChange={(e) => setLocationInput(e.target.value)}
          />

          <DateRangeInput
            label="시작일"
            value={startDate}
            onChange={(newDate) => setStartDate(newDate)}
          />
          <DateRangeInput
            label="종료일"
            value={endDate}
            onChange={(newDate) => setEndDate(newDate)}
            minDate={startDate}
          />

        </InputArea>
        <SubmitButton
          onClick={handleStartPlanning}
        >여행 시작하기
        </SubmitButton>
      </Contents>
    </Container>
  );
};


const Contents = styled.div`
    margin-top: 80px;
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export default MainPage;