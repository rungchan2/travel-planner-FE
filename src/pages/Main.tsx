import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import styled from "styled-components";
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

  const navigate = useNavigate();

  const handleStartPlanning = () => {
    setIsSubmitted(true);

    if (!title || !location || !startDate || !endDate) {
      return;
    }
    navigate('/travel');
  }

  return (
      <Contents>
        <Typography component="h1">트래블 플래너와 함께 여행을 시작해보세요.</Typography>
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
            error={isSubmitted && !location}
            helperText={isSubmitted && !location ? '여행 장소를 입력해 주세요.' : ''}
          />

          <DateRangeInput
            label="시작일"
            value={startDate}
            onChange={(newDate) => setStartDate(newDate)}
            maxDate={endDate}
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
        <SubmitButton onClick={ handleStartPlanning}>
          여행 시작하기
        </SubmitButton>
      </Contents>
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