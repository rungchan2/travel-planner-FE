import { ISchedule } from "@/api/schedule.api";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { styled } from "styled-components";
import CloseIcon from '@mui/icons-material/Close';
import { useSchedule } from "@/hooks/useSchedule";
import { useLocation } from "react-router-dom";
import { Plan } from "@/pages/TravelDetail";

interface SingleScheduleProps {
  data: ISchedule;
  index: number;
}

const SingleSchedule: React.FC<SingleScheduleProps> = ({ data, index }) => {
  const location = useLocation();
  const plan: Plan = location.state?.plan;
  const { deleteSchedule } = useSchedule(plan.id);

  const handleDelete = () => {
    deleteSchedule(data.id);
  }

  return (
    <Draggable draggableId={data.id.toString()} index={index}>
      {(provided) => (
        <ScheduleContainer
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ContentColumn>
            <ImageWrapper>
              <PlaceholderImage />
            </ImageWrapper>
            <InfoWrapper>
              <TagWrapper>
                <Tag>식당</Tag>
              </TagWrapper>
              <Description>{data.description}</Description>
            </InfoWrapper>
            <div className="close-icon" onClick={handleDelete}>
              <CloseIcon />
            </div>
          </ContentColumn>
        </ScheduleContainer>
      )}
    </Draggable>
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

  &:hover {
    background: #f9fafb;
    cursor: pointer;
    transition: background 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .close-icon {
    cursor: pointer;

    &:hover {
      background: #f9fafb;
      transition: background 0.3s ease;
    }
  }
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
