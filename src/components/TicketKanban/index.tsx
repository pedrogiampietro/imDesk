import { useState } from "react";
import * as S from "./styles";

import { TicketCard } from "../TicketCard";

export interface ITicket {
  id: string;
  description: string;
  ticketType: string;
  ticketCategory: string;
  ticketPriority: string;
  ticketLocation: string;
  assignedTo: string[];
  equipaments: string[];
  images: string[];
  assignedToAt: Date | null;
  closedBy: string | null;
  closedAt: Date | null;
  status: string;
  timeEstimate: number | null;
  isDelay: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  ticketCategoryId: {
    id: string;
    name: string;
    childrenName: string;
    defaultText: string | null;
  };
  ticketLocationId: {
    id: string;
    name: string;
  };
  ticketPriorityId: {
    id: string;
    name: string;
  };
  ticketTypeId: {
    id: string;
    name: string;
  };
  User: {
    id: string;
    username: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    ramal: string;
    sector: string;
    createdAt: Date;
    updatedAt: Date;
  };
}

type TicketProps = {
  data: ITicket[];
  setShowTicketModal: any;
  showTicketModal: any;
};

export function TicketKanban({
  data,
  setShowTicketModal,
  showTicketModal,
}: TicketProps) {
  const [activeTab, setActiveTab] = useState("não-atribuído");

  return (
    <S.KanbanContainer>
      <S.TabsContainer>
        <S.TabWrapper>
          <S.Tab
            active={activeTab === "não-atribuído"}
            onClick={() => setActiveTab("não-atribuído")}
          >
            Não Atribuído
          </S.Tab>
          <S.Tab
            active={activeTab === "atribuído"}
            onClick={() => setActiveTab("atribuído")}
          >
            Atribuído
          </S.Tab>
        </S.TabWrapper>

        <S.SearchInput placeholder="Pesquisar" />
        <S.FilterButton>Filtrar</S.FilterButton>
      </S.TabsContainer>

      {/* TicketCard */}
      {data.map((ticket) => {
        return (
          <TicketCard
            data={ticket}
            setShowTicketModal={setShowTicketModal}
            showTicketModal={showTicketModal}
          />
        );
      })}
    </S.KanbanContainer>
  );
}
