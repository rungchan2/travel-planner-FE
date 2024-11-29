import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DateRangeInput from '../components/main/formFields/DateInput.tsx';
import SubmitButton from '../components/main/formFields/SubmitButton.tsx';
import TextInput from '@/components/main/formFields/TextInput.tsx';
import { Typography } from "@mui/material";
// import { createTrip } from '@/components/api/api.ts';
import ImgAutoSlide from '@/components/main/ImgAutoSlide.tsx';
import { slides } from '@/components/main/ImgFile.tsx';
import { createTravelItem } from '@/api/travel.api.ts';

const MainPage: React.FC = () => {
  const [name, setNameInput] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleStartPlanning = async () => {
    const payload = {
      name: name,
      description: description,
      startDate: startDate,
      endDate: endDate,
    }
    console.log("payload", payload);
    
    setIsSubmitted(true);
    if (!name || !description || !startDate || !endDate) {
      return;
    }
    
    try {
      setIsLoading(true);
      const response = await createTravelItem(payload);
      
      if (response) {
        alert('여행이 성공적으로 생성되었습니다.');
        setNameInput('');
        setDescription('');
        setStartDate(null);
        setEndDate(null);
        navigate('/travel/detail');
      } else {
        alert('여행 생성에 실패하였습니다. 다시 시도해주세요.');
      }
      
      return response;
      
    } catch (error) {
      console.error(error);
      alert('여행 생성에 실패하였습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Contents>
      
      <ImgArea>
        <Typography component="h1">트래블 플래너와 함께 여행을 시작해보세요.</Typography>
        <ImgAutoSlide slides={ slides } />
      </ImgArea>
      
      <FormArea>
        <InputArea>
          <TextInput
            required={true}
            id="outlined-required"
            label='여행 이름'
            value={name}
            onChange={(e) => setNameInput(e.target.value)}
            error={isSubmitted && !name}
            helperText={isSubmitted && !name ? '여행 이름을 입력해 주세요.' : ''}
          />
          <TextInput
            required={true}
            id="outlined-required"
            label='여행 장소'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={isSubmitted && !description}
            helperText={isSubmitted && !description ? '여행 장소를 입력해 주세요.' : ''}
          />

          <DateRangeInput
            label="시작일"
            value={startDate}
            onChange={(newDate: string | null) => setStartDate(newDate)}
            maxDate={endDate}
            required={true}
            error={isSubmitted && !startDate}
            helperText={isSubmitted && !startDate ? '시작일을 선택해 주세요.' : ''}
          />
          <DateRangeInput
            label="종료일"
            value={endDate}
            onChange={(newDate: string | null) => setEndDate(newDate)}
            minDate={startDate}
            required={true}
            error={isSubmitted && !endDate}
            helperText={isSubmitted && !endDate ? '종료일을 선택해 주세요.' : ''}
          />

        </InputArea>
        <SubmitButton onClick={ handleStartPlanning } disabled={ isLoading }>
          { isLoading ? '제출 중...' : '여행 시작하기' }
        </SubmitButton>
      </FormArea>
    </Contents>
  );
};

const Contents = styled.div`
  margin: 40px 0;
  
  display: flex;
  flex-direction: column;
  
  gap: 32px;
`

const ImgArea = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  
  h1 {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-90%, -50%);
    z-index: 990;
    font-size: 2.8rem;
    font-weight: 700;
    //text-align: center;
    color: #fff;
  }
`

const FormArea = styled.div`
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
