import React from "react";
import { styled } from "styled-components";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ISchedule } from "../type";

interface SingleScheduleProps {
  data: ISchedule;
}

const SingleSchedule: React.FC<SingleScheduleProps> = ({ data }) => {
  const timeRange = "09:00 ~ 14:00";

  return (
    <ScheduleContainer>
      <TimeColumn>{timeRange}</TimeColumn>
      <ContentColumn>
        <ImageWrapper>
          <PlaceholderImage />
        </ImageWrapper>
        <InfoWrapper>
          <TagWrapper>
            <Tag>식당</Tag>
            <MoreHorizIcon fontSize="small" />
          </TagWrapper>
          <Description>{data.description}</Description>
        </InfoWrapper>
      </ContentColumn>
    </ScheduleContainer>
  );
};

const ScheduleContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 16px;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-height: 96px;
`;

const TimeColumn = styled.div`
  min-width: 90px;
  font-size: 14px;
  color: #666;
  padding-top: 4px;
`;

const ContentColumn = styled.div`
  display: flex;
  gap: 16px;
  flex: 1;
  width: 100%;
`;

const ImageWrapper = styled.div`
  position: relative;
  min-width: 64px;
  height: 64px;
`;

const PlaceholderImage = styled.div`
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  border-radius: 8px;
`;

const InfoWrapper = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  width: 100%;
`;

const Tag = styled.span`
  background-color: #f3f4f6;
  padding: 4px 12px;
  border-radius: 6px;
  font-size: 12px;
  color: #666;
`;

const Description = styled.p`
  font-size: 14px;
  color: #333;
  margin: 0;
  word-break: break-all;
  line-height: 1.5;
`;

export default SingleSchedule;