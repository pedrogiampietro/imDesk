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
  closedAt: Date;
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
  TicketEvaluation: TicketEvaluation[];
}

type TicketEvaluation = {
  id: string;
  rating: number;
};

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
  const [searchTerm, setSearchTerm] = useState("");

  const searchedData = data.filter((ticket) => {
    return (
      ticket.description.includes(searchTerm) ||
      ticket.ticketType.includes(searchTerm) ||
      ticket.ticketCategory.includes(searchTerm)
    );
  });

  const filteredData = searchedData.filter((ticket) => {
    if (activeTab === "não-atribuído") {
      return ticket.assignedTo.length === 0;
    }
    return ticket.assignedTo.length > 0;
  });

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

        <S.SearchInput
          placeholder="Pesquisar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <S.FilterButton>Filtrar</S.FilterButton> */}
      </S.TabsContainer>

      {/* TicketCard */}
      {filteredData.map((ticket) => {
        return (
          <TicketCard
            key={ticket.id}
            data={ticket}
            setShowTicketModal={setShowTicketModal}
            showTicketModal={showTicketModal}
          />
        );
      })}
    </S.KanbanContainer>
  );
}
