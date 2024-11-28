import React, { useState } from "react";
// import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import DateRangeInput from "@/components/formFields/DateInput.tsx";
import SubmitButton from "@/components/formFields/SubmitButton.tsx";
import TextInput from "@/components/formFields/TextInput.tsx";
import { Typography } from "@mui/material";
import { createTravel } from "@/api/travel.api";
// import {ITravelPlan} from "@/type";

const MainPage: React.FC = () => {
  const [title, setTitleInput] = useState("");
  const [location, setLocationInput] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // const dispatch = useTypedDispatch();
  const navigate = useNavigate();

  const handleStartPlanning = async () => {
    try {
      await createTravel({
        name: title,
        description: location,
        startDate: startDate?.toISOString() ?? "",
        endDate: endDate?.toISOString() ?? "",
      });
      navigate("/travel");
    } catch (error) {
      console.error(error);
      return;
    }

    setIsSubmitted(true);

    if (!title || !location || !startDate || !endDate) {
      return;
    }
  };
  // 서버 연결 이후 활성화 예정
  //   try {
  //     const response = await axios.post('/api/travel-detail', {
  //       title,
  //       location,
  //       startDate,
  //       endDate,
  //     } as ITravelPlan);
  //
  //     const travelId = response.data.id; // 백엔드에서 반환된 여행 계획 ID
  //
  //     // 페이지 이동
  //     navigate(`/travel/${travelId}`);
  //   } catch (error) {
  //     console.error('여행 계획 저장 중 오류 발생:', error);
  //   }
  // };

  return (
    <Contents>
      <Typography component="h1">여행을 시작해보세요.</Typography>
      <InputArea>
        <TextInput
          required={true}
          id="outlined-required"
          label="여행 이름"
          value={title}
          onChange={(e) => setTitleInput(e.target.value)}
          error={isSubmitted && !title}
          helperText={isSubmitted && !title ? "여행 이름을 입력해 주세요." : ""}
        />
        <TextInput
          required={true}
          id="outlined-required"
          label="여행 장소"
          value={location}
          onChange={(e) => setLocationInput(e.target.value)}
          error={isSubmitted && !location}
          helperText={
            isSubmitted && !location ? "여행 장소를 입력해 주세요." : ""
          }
        />

        <DateRangeInput
          label="시작일"
          value={startDate}
          onChange={(newDate) => setStartDate(newDate)}
          maxDate={endDate}
          required={true}
          error={isSubmitted && !startDate}
          helperText={
            isSubmitted && !startDate ? "시작일을 선택해 주세요." : ""
          }
        />
        <DateRangeInput
          label="종료일"
          value={endDate}
          onChange={(newDate) => setEndDate(newDate)}
          minDate={startDate}
          required={true}
          error={isSubmitted && !endDate}
          helperText={isSubmitted && !endDate ? "종료일을 선택해 주세요." : ""}
        />
      </InputArea>
      <SubmitButton
        onClick={() => {
          handleStartPlanning();
        }}
      >
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
