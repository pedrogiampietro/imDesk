import { useState } from "react";
import * as S from "./styles";

import { TicketCard } from "../TicketCard";
import { TicketBoard } from "../TicketBoard";

export interface ITicket {
  id: string;
  description: string;
  ticketType: string;
  ticketCategoryId: string;
  ticketPriorityId: string;
  ticketLocationId: string;
  assignedTo: string[];
  equipaments: string[];
  images: string[];
  assignedToAt: Date | null;
  closedBy: string | null;
  closedAt: Date;
  status: string;
  timeEstimate: Date | null;
  isDelay: boolean;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  slaDefinitionId: number;
  ticketCategory: {
    id: string;
    name: string;
    childrenName: string;
    defaultText: string | null;
  };
  ticketLocation: {
    id: string;
    name: string;
  };
  ticketPriority: {
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
  updateTicketsCallback: any;
};

export function TicketKanban({
  data,
  setShowTicketModal,
  showTicketModal,
  updateTicketsCallback,
}: TicketProps) {
  const [activeTab, setActiveTab] = useState("new");
  const [searchTerm, setSearchTerm] = useState("");

  const searchedData = data.filter((ticket) => {
    return (
      ticket.description.includes(searchTerm) ||
      ticket.ticketType.includes(searchTerm) ||
      ticket.ticketCategoryId.includes(searchTerm)
    );
  });

  const filteredData = searchedData.filter((ticket) => {
    if (activeTab === "new") {
      return ticket.status === "new";
    } else if (activeTab === "assigned") {
      return ticket.status === "assigned";
    } else if (activeTab === "closed") {
      return ticket.status === "closed";
    }
    return true;
  });

  return (
    <S.KanbanContainer>
      <S.TabsContainer>
        <S.TabWrapper>
          <S.Tab
            active={activeTab === "new"}
            onClick={() => setActiveTab("new")}
          >
            Novo
          </S.Tab>
          <S.Tab
            active={activeTab === "assigned"}
            onClick={() => setActiveTab("assigned")}
          >
            Atribuído
          </S.Tab>
          <S.Tab
            active={activeTab === "closed"}
            onClick={() => setActiveTab("closed")}
          >
            Fechado
          </S.Tab>
        </S.TabWrapper>

        <S.SearchInput
          placeholder="Pesquisar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {/* <S.FilterButton>Filtrar</S.FilterButton> */}
      </S.TabsContainer>

      {/* TicketBoard */}

      <TicketBoard
        data={data}
        setShowTicketModal={setShowTicketModal}
        showTicketModal={showTicketModal}
        updateTicketsCallback={updateTicketsCallback}
      />

      {/* TicketCard */}
      {/* {filteredData.map((ticket) => {
        return (
          <TicketCard
            key={ticket.id}
            data={ticket}
            setShowTicketModal={setShowTicketModal}
            showTicketModal={showTicketModal}
            updateTicketsCallback={updateTicketsCallback}
          />
        );
      })} */}
    </S.KanbanContainer>
  );
}
