import React from "react";
import { Draggable } from "react-beautiful-dnd";

import { formatarData } from "../../utils/dateTime";
import * as S from "./styles";

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
          <S.TaskInformation priority={item.priority}>
            <S.TopRow>
              <span>ID: #{displayId}</span>
              <span>
                {formatarData(item.createdAt)}
                <S.Status level={item.priority}></S.Status>
              </span>
            </S.TopRow>
            <S.CategoryRow>
              {item.category.main} - {item.category.sub}
            </S.CategoryRow>
            <S.DescriptionRow>{item.description}</S.DescriptionRow>
            <S.UserRow>
              {item.createdBy.avatarUrl ? (
                <S.Avatar src={item.createdBy.avatarUrl} alt="User avatar" />
              ) : (
                <S.Initials>
                  {item?.createdBy.name
                    ?.split(" ")
                    .map((name: any) => name.charAt(0))
                    .join("")
                    .toUpperCase()}
                </S.Initials>
              )}

              <span>{item.createdBy.name}</span>
            </S.UserRow>
          </S.TaskInformation>
        </div>
      )}
    </Draggable>
  );
}
