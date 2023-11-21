import React, { useState, useEffect, useCallback, useContext } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { TaskBoardCard } from "./TaskBoardCard";
import { formatDateptBR } from "../../utils/dateTime";
import { useAuth } from "../../hooks/useAuth";
import { apiClient } from "../../services/api";
import { TicketsModal } from "../TicketsModal";

import * as S from "./styles";

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

export function TicketBoard({
  data,
  showTicketModal,
  setShowTicketModal,
  technicians,
  updateTicketsCallback,
  showQuickCreateTicket,
}: any) {
  const { user } = useAuth();
  const [originalData, setOriginalData] = useState<any>([]);
  const [columns, setColumns] = useState<any>({});
  const [selectedTicket, setSelectedTicket] = useState(null);

  const loggedUser = user;

  const TODO_COLUMN_ID = "todo-column-id";
  const IN_PROGRESS_COLUMN_ID = "in-progress-column-id";
  const IN_PLANNED_ID = "planned-column-id";
  const IN_PENDING_ID = "pending-column-id";
  const DONE_COLUMN_ID = "done-column-id";

  if (!data) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    setOriginalData(data);
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
      [IN_PLANNED_ID]: {
        title: "Planejado",
        items: transformedData.filter((item) => item.status === "planned"),
      },
      [IN_PENDING_ID]: {
        title: "Pendente",
        items: transformedData.filter((item) => item.status === "pending"),
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
      else if (destination.droppableId === IN_PLANNED_ID) newStatus = "planned";
      else if (destination.droppableId === IN_PENDING_ID) newStatus = "pending";

      try {
        await apiClient().put(`/ticket/${ticketId}?userId=${user?.userId}`, {
          status: newStatus,
        });
      } catch (error) {
        console.error("Error updating ticket status:", error);
      }
    },
    [columns]
  );

  const toggleTicketModal = (ticket?: any) => {
    setShowTicketModal(!showTicketModal);
    if (ticket) {
      const originalTicket = originalData.find((t: any) => t.id === ticket.id);
      setSelectedTicket(originalTicket);
    }

    if (!showTicketModal) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <S.Container>
        <S.TaskColumnStyles>
          {columns &&
            Object.entries(columns).map(([columnId, column]: any, idx) => {
              return (
                <div key={columnId}>
                  <h3>{column.title}</h3>
                  <Droppable droppableId={columnId}>
                    {(provided) => (
                      <S.TaskList
                        style={{ width: "280px" }}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {column.items.map((item: any, index: number) => {
                          return (
                            <TaskBoardCard
                              key={item.id}
                              item={item}
                              index={index}
                              onCardClick={toggleTicketModal}
                            />
                          );
                        })}
                        {provided.placeholder}
                      </S.TaskList>
                    )}
                  </Droppable>
                </div>
              );
            })}
        </S.TaskColumnStyles>
      </S.Container>

      {showTicketModal && selectedTicket && (
        <TicketsModal
          data={selectedTicket}
          onClose={() => toggleTicketModal()}
          technicians={technicians}
          loggedUser={loggedUser}
          updateTicketsCallback={updateTicketsCallback}
        />
      )}
    </DragDropContext>
  );
}

export default React.memo(TicketBoard);
