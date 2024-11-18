import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from "styled-components";
import {useTypedDispatch} from '../hooks/redux.ts';
import {setTitle, setLocation, setDateRange} from '../store/plannerSlice.ts';
import Container from "../components/Container.tsx";
import DateRangeInput from "@/components/formFields/DateInput.tsx";
import SubmitButton from "@/components/formFields/SubmitButton.tsx";
import TextInput from "@/components/formFields/TextInput.tsx";
import {Typography} from "@mui/material";

const MainPage: React.FC = () => {
  const [title, setTitleInput] = useState('');
  const [location, setLocationInput] = useState('');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const handleStartPlanning = () => {
    setIsSubmitted(true); // 제출되었음을 표시

    if (!title || !location || !startDate || !endDate) {
      // 필드 중 하나라도 비어 있으면 함수를 종료합니다.
      return;
    }
    dispatch(setTitle(title));
    dispatch(setLocation(location));
    dispatch(setDateRange({ startDate, endDate }));
    navigate("/travel/:id");
  };


  return (
    <Container>
      <Contents>
        <Typography component="h1">여행을 시작해보세요.</Typography>
        <InputArea>
          <TextInput
            required={true}
            id="outlined-required"
            label='여행 이름'
            value={title}
            onChange={(e) => setTitleInput(e.target.value)}
            error={isSubmitted && !title}
            helperText={isSubmitted && !title ? '여행 이름을 입력해 주세요.' : ''}
          />
          <TextInput
            required={true}
            id="outlined-required"
            label='여행 장소'
            value={location}
            onChange={(e) => setLocationInput(e.target.value)}
            error={isSubmitted && !title}
            helperText={isSubmitted && !title ? '여행 장소를 입력해 주세요.' : ''}
          />

          <DateRangeInput
            label="시작일"
            value={startDate}
            onChange={(newDate) => setStartDate(newDate)}
            required={true}
            error={isSubmitted && !startDate}
            helperText={isSubmitted && !startDate ? '시작일을 선택해 주세요.' : ''}
          />
          <DateRangeInput
            label="종료일"
            value={endDate}
            onChange={(newDate) => setEndDate(newDate)}
            minDate={startDate}
            required={true}
            error={isSubmitted && !endDate}
            helperText={isSubmitted && !endDate ? '종료일을 선택해 주세요.' : ''}
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
    margin: 80px 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    
    h1 {
        font-size: 2rem;
        font-weight: 700;
    }
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

export default MainPage;