import { useState, useEffect } from "react";
import * as S from "./styles";

import { BsList } from "react-icons/bs";
import { FiGrid } from "react-icons/fi";
import {
  MdOutlineMarkEmailUnread,
  MdOutlineMarkEmailRead,
  MdOutlineLock,
  MdOutlinePending,
  MdOutlineAccessTime,
} from "react-icons/md";

import { TicketCard } from "../TicketCard";
import { TicketBoard } from "../TicketBoard";

import { useAuth } from "../../hooks/useAuth";
import { apiClient } from "../../services/api";

import { Pagination } from "../../components/Pagination";

export interface ITicket {
  id: string;
  description: string;
  observationServiceExecuted?: string;
  assignedTo: string[];
  equipaments: string[];
  images: string[];
  assignedToAt: Date | null;
  ticketWasSignedTech: boolean | false;
  ticketWasSignedUser: boolean | false;
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
  ticketType: {
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
  usedItems: usedItems[];
  equipmentUsage: equipment[];
}

type equipment = {
  equipmentId: string;
  usageCount: number;
  equipmentPatrimony: string;
};

type usedItems = {
  cost: number;
  id: string;
  name: string;
  quantity: number;
};

type TicketEvaluation = {
  id: string;
  rating: number;
};

type TicketProps = {
  data: ITicket[];
  setShowTicketModal: any;
  showTicketModal: any;
  updateTicketsCallback: any;
  showQuickCreateTicket: any;
  setShowQuickCreateTicket: any;
  ticketPriority: any;
  selectedTicketPriority: any;
  setSelectedTicketPriority: any;
};

export function TicketKanban({
  data,
  setShowTicketModal,
  showTicketModal,
  updateTicketsCallback,
  showQuickCreateTicket,
  setShowQuickCreateTicket,
  ticketPriority,
  selectedTicketPriority,
  setSelectedTicketPriority,
}: TicketProps) {
  const [activeTab, setActiveTab] = useState("new");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("board");
  const [technicians, setTechnicians] = useState([]);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);

  const { user } = useAuth();

  const isTermIncluded = (term: string, ticket: any) => {
    const cleanedTerm = term.trim().toLowerCase().replace(/\s+/g, "");

    if (ticket.id.replace(/\s+/g, "").toLowerCase().includes(cleanedTerm)) {
      // console.log("UUID Match Found for:", ticket.id);
      return true;
    }

    const descriptionMatch = ticket.description
      .toLowerCase()
      .includes(cleanedTerm);
    const typeMatch = ticket.ticketType.name
      .toLowerCase()
      .includes(cleanedTerm);
    const categoryMatch = ticket.ticketCategory.name
      .toLowerCase()
      .includes(cleanedTerm);
    const childrenNameMatch = ticket.ticketCategory.childrenName
      .toLowerCase()
      .includes(cleanedTerm);

    // console.log(
    //   `For ticket ID: ${ticket.id}, Matches found - Description: ${descriptionMatch}, Type: ${typeMatch}, Category: ${categoryMatch}, Children Name: ${childrenNameMatch}`
    // );

    return descriptionMatch || typeMatch || categoryMatch || childrenNameMatch;
  };

  const searchedData = data.filter((ticket) => {
    const term = searchTerm.toLowerCase();

    // console.log("Filtering for term:", term); // Log para verificar o termo durante a filtragem

    return isTermIncluded(term, ticket);
  });

  const filteredData = searchedData.filter((ticket) => {
    const statusMatch =
      (activeTab === "new" && ticket.status === "new") ||
      (activeTab === "assigned" && ticket.status === "assigned") ||
      (activeTab === "planned" && ticket.status === "planned") ||
      (activeTab === "pending" && ticket.status === "pending") ||
      (activeTab === "closed" && ticket.status === "closed");

    return statusMatch;
  });

  const getTechnicians = async () => {
    if (
      !user ||
      !user.companies ||
      !user.currentLoggedCompany.currentLoggedCompanyId
    ) {
      return;
    }

    try {
      const { data } = await apiClient().get("/account/technicians", {
        params: {
          companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
        },
      });
      setTechnicians(data);
    } catch (err) {}
  };

  useEffect(() => {
    getTechnicians();
  }, [user]);

  const startIndexTickets = (page - 1) * perPage;
  const endIndexTickets = startIndexTickets + perPage;

  const handleLocationSelectChange = (event: any) => {
    const selectedValue = event.target.value;
    setSelectedTicketPriority(selectedValue);
  };

  return (
    <S.KanbanContainer>
      <S.FiltersWrapper>
        <S.SearchInput
          placeholder="Pesquisar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <S.ControlsGroup>
          <S.Select
            value={selectedTicketPriority}
            onChange={handleLocationSelectChange}
          >
            <option value="">Filtrar por prioridade</option>
            {ticketPriority.map((priority: any) => {
              return (
                <option value={priority.id} key={priority.id}>
                  {priority.name}
                </option>
              );
            })}
          </S.Select>

          <S.Select>
            <option value="">Por página..</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </S.Select>
          <S.CreateButton
            onClick={() => setShowQuickCreateTicket(!showQuickCreateTicket)}
          >
            {showQuickCreateTicket ? "Fechar novo Ticket" : "Criar novo Ticket"}
          </S.CreateButton>
        </S.ControlsGroup>
      </S.FiltersWrapper>

      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          marginBottom: "1rem",
        }}
      >
        <S.IconButton
          onClick={() => setViewMode("card")}
          active={viewMode === "card"}
        >
          <BsList />
        </S.IconButton>
        <S.IconButton
          onClick={() => setViewMode("board")}
          active={viewMode === "board"}
        >
          <FiGrid />
        </S.IconButton>
      </div>

      {viewMode === "card" && (
        <S.TabsContainer>
          <S.TabWrapper>
            <S.Tab
              active={activeTab === "new"}
              onClick={() => setActiveTab("new")}
            >
              <S.TabIconWrapper>
                <MdOutlineMarkEmailUnread />
              </S.TabIconWrapper>
              <S.TabTitle>Todos os Tickets</S.TabTitle>
            </S.Tab>
            <S.Tab
              active={activeTab === "assigned"}
              onClick={() => setActiveTab("assigned")}
            >
              <S.TabIconWrapper>
                <MdOutlineMarkEmailRead />
              </S.TabIconWrapper>
              <S.TabTitle>Atribuído</S.TabTitle>
            </S.Tab>
            <S.Tab
              active={activeTab === "planned"}
              onClick={() => setActiveTab("planned")}
            >
              <S.TabIconWrapper>
                <MdOutlineAccessTime />
              </S.TabIconWrapper>
              <S.TabTitle>Planejado</S.TabTitle>
            </S.Tab>
            <S.Tab
              active={activeTab === "pending"}
              onClick={() => setActiveTab("pending")}
            >
              <S.TabIconWrapper>
                <MdOutlinePending />
              </S.TabIconWrapper>
              <S.TabTitle>Pendente</S.TabTitle>
            </S.Tab>
            <S.Tab
              active={activeTab === "closed"}
              onClick={() => setActiveTab("closed")}
            >
              <S.TabIconWrapper>
                <MdOutlineLock />
              </S.TabIconWrapper>
              <S.TabTitle>Fechado</S.TabTitle>
            </S.Tab>
          </S.TabWrapper>
        </S.TabsContainer>
      )}

      {viewMode === "board" ? (
        <TicketBoard
          data={searchedData}
          setShowTicketModal={setShowTicketModal}
          showTicketModal={showTicketModal}
          technicians={technicians}
          updateTicketsCallback={updateTicketsCallback}
          showQuickCreateTicket={showQuickCreateTicket}
        />
      ) : (
        filteredData.slice(startIndexTickets, endIndexTickets).map((ticket) => {
          return (
            <TicketCard
              key={ticket.id}
              data={ticket}
              setShowTicketModal={setShowTicketModal}
              showTicketModal={showTicketModal}
              technicians={technicians}
              updateTicketsCallback={updateTicketsCallback}
            />
          );
        })
      )}

      {filteredData.length > 0 ? (
        <>
          <S.PaginationWrapper>
            <span>
              {page * perPage - perPage + 1} de {filteredData.length} registros
            </span>
          </S.PaginationWrapper>
          {perPage >= filteredData.length ? null : (
            <S.PaginationWrapper>
              <Pagination
                totalCountOfRegisters={filteredData.length}
                currentPage={page}
                onPageChange={setPage}
                registersPerPage={perPage}
              />
            </S.PaginationWrapper>
          )}
        </>
      ) : null}
    </S.KanbanContainer>
  );
}
