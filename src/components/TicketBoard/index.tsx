import React, { useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import { v4 as uuidv4 } from "uuid";

import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { TaskBoardCard } from "./TaskBoardCard";
import { formatDateptBR } from "../../utils/dateTime";
import { useAuth } from "../../hooks/useAuth";
import { apiClient } from "../../services/api";

const Container = styled.div`
  display: flex;
`;

const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

const TaskColumnStyles = styled.div`
  margin: 8px;
  display: flex;
  width: 100%;
  min-height: 80vh;
`;

const Title = styled.span`
  color: #10957d;
  background: rgba(16, 149, 125, 0.15);
  padding: 2px 10px;
  border-radius: 5px;
  align-self: flex-start;
`;

const transformApiData = (apiData: any) => {
  if (!apiData || !Array.isArray(apiData)) {
    return [];
  }

  return apiData.map((item) => ({
    id: item.id,
    description: item.description,
    estimateForResolution: formatDateptBR(item.timeEstimate),
    createdAt: item.createdAt,
    priority: item.ticketPriority.name,
    status: item.status,
    createdBy: {
      name: item.User.name,
      avatarUrl: item.User.avatarUrl,
    },
    category: {
      main: item.ticketCategory.name,
      sub: item.ticketCategory.childrenName,
    },
  }));
};

export function TicketBoard({ data }: any) {
  const [columns, setColumns] = useState<any>({});
  const { user } = useAuth();

  const TODO_COLUMN_ID = "todo-column-id";
  const IN_PROGRESS_COLUMN_ID = "in-progress-column-id";
  const DONE_COLUMN_ID = "done-column-id";

  const STATUS_MAPPING = {
    [TODO_COLUMN_ID]: "new",
    [IN_PROGRESS_COLUMN_ID]: "in progress",
    [DONE_COLUMN_ID]: "done",
  };

  if (!data) {
    return <div>Loading...</div>; // Ou qualquer outro JSX que você preferir
  }

  useEffect(() => {
    const transformedData = transformApiData(data);
    const updatedColumns = {
      [TODO_COLUMN_ID]: {
        title: "Novo",
        items: transformedData.filter((item) => item.status === "new"),
      },
      [IN_PROGRESS_COLUMN_ID]: {
        title: "Atribuído",
        items: transformedData.filter((item) => item.status === "assigned"),
      },
      [DONE_COLUMN_ID]: {
        title: "Fechado",
        items: transformedData.filter((item) => item.status === "closed"),
      },
    };
    setColumns(updatedColumns);
  }, [data]);

  const onDragEnd = useCallback(
    async (result: any) => {
      const { source, destination } = result;

      if (!destination) return;

      const sourceColumn = columns[source.droppableId];
      const destColumn =
        source.droppableId === destination.droppableId
          ? sourceColumn
          : columns[destination.droppableId];

      const sourceItems = [...sourceColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      const destinationItems =
        source.droppableId === destination.droppableId
          ? sourceItems
          : [...destColumn.items];

      destinationItems.splice(destination.index, 0, removed);

      const newColumns = {
        ...columns,
        [source.droppableId]: { ...sourceColumn, items: sourceItems },
        [destination.droppableId]: { ...destColumn, items: destinationItems },
      };

      setColumns(newColumns);

      const ticketId = removed.id;
      let newStatus = "";
      if (destination.droppableId === TODO_COLUMN_ID) newStatus = "new";
      else if (destination.droppableId === IN_PROGRESS_COLUMN_ID)
        newStatus = "assigned";
      else if (destination.droppableId === DONE_COLUMN_ID) newStatus = "closed";

      try {
        await apiClient().put(`/ticket/${ticketId}?userId=${user?.userId}`, {
          status: newStatus,
        });
      } catch (error) {
        // Lidar com o erro aqui
        console.error("Error updating ticket status:", error);
      }
    },
    [columns]
  );

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        <TaskColumnStyles>
          {columns &&
            Object.entries(columns).map(([columnId, column], idx) => {
              return (
                <div key={columnId}>
                  <h3>{column.title}</h3>
                  <Droppable droppableId={columnId}>
                    {(provided) => (
                      <TaskList
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {column.items.map((item: any, index: number) => {
                          return (
                            <TaskBoardCard
                              key={item.id}
                              item={item}
                              index={index}
                            />
                          );
                        })}
                        {provided.placeholder}
                      </TaskList>
                    )}
                  </Droppable>
                </div>
              );
            })}
        </TaskColumnStyles>
      </Container>
    </DragDropContext>
  );
}

export default React.memo(TicketBoard);
