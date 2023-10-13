import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { formatarData } from "../../utils/dateTime";

const TaskInformation = styled.div<{ priority: string }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  min-height: 106px;
  border-radius: 5px;
  max-width: 311px;
  background: white;
  margin-top: 15px;
  font-size: 14px;
  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease-in-out;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 6%;
    left: 5px;
    bottom: 0;
    width: 3px;
    height: 85%;

    background-color: ${(props) => {
      switch (props.priority) {
        case "Baixa":
          return "green";
        case "Média":
          return "yellow";
        case "Alta":
          return "red";
        default:
          return "transparent";
      }
    }};
  }

  &:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.15);
  }
`;

const TopRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  & span {
    font-size: 12px;
  }
`;

const CategoryRow = styled.div`
  margin-top: 10px;
`;

const DescriptionRow = styled.div`
  margin-top: 10px;
  color: #666;
`;

const UserRow = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;

  & span {
    font-size: 14px;
  }
`;

const Avatar = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
`;

const Initials = styled.div`
  width: 40px;
  height: 40px;
  background-color: #ddd;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #7f56d8;
  font-weight: bold;
  margin-right: 0.65rem;
`;

const Status = styled.span<{ level: string }>`
  width: 15px;
  height: 15px;
  background-color: ${(props) => {
    switch (props.level) {
      case "Baixa":
        return "green";
      case "Média":
        return "yellow";
      case "Alta":
        return "red";
      default:
        return "transparent";
    }
  }};
  display: inline-block;
  margin-left: 8px;
  border-radius: 3px;
`;

export function TaskBoardCard({ item, index, onCardClick }: any) {
  const displayId = item.id.split("-")[0];

  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onClick={() => onCardClick(item)}
        >
          <TaskInformation priority={item.priority}>
            <TopRow>
              <span>ID: {displayId}</span>
              <span>
                {formatarData(item.createdAt)}
                <Status level={item.priority}></Status>
              </span>
            </TopRow>
            <CategoryRow>
              {item.category.main} - {item.category.sub}
            </CategoryRow>
            <DescriptionRow>{item.description}</DescriptionRow>
            <UserRow>
              {item.createdBy.avatarUrl ? (
                <Avatar src={item.createdBy.avatarUrl} alt="User avatar" />
              ) : (
                <Initials>
                  {item?.createdBy.name
                    ?.split(" ")
                    .map((name: any) => name.charAt(0))
                    .join("")
                    .toUpperCase()}
                </Initials>
              )}

              <span>{item.createdBy.name}</span>
            </UserRow>
          </TaskInformation>
        </div>
      )}
    </Draggable>
  );
}
