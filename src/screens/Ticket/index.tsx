import { useState, useEffect } from "react";

import { Layout } from "../../components/Layout";

import { TicketKanban } from "../../components/TicketKanban";

import * as S from "./styles";
import { apiClient } from "../../services/api";
import { CreateTicket } from "./CreateTicket";
import { useAuth } from "../../hooks/useAuth";
import { LottieLoad } from "../../components/LottieLoading";

export function Ticket() {
  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [showTicketModal, setShowTicketModal] = useState<boolean>(false);
  const [showQuickCreateTicket, setShowQuickCreateTicket] = useState(false);
  const [ticketPriority, setTicketPriority] = useState([]);
  const [selectedTicketPriority, setSelectedTicketPriority] = useState("");

  const { user } = useAuth();

  useEffect(() => {
    async function fetchPriority() {
      if (
        !user ||
        !user.companies ||
        !user.currentLoggedCompany.currentLoggedCompanyId ||
        !user.currentLoggedCompany.currentLoggedCompanyName
      ) {
        return;
      }

      try {
        const response = await apiClient().get("/ticket-priority", {
          params: {
            companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
          },
        });

        setTicketPriority(response.data.body);
      } catch (error) {
        console.error("Erro ao buscar as prioridades:", error);
      }
    }
    fetchPriority();
  }, [user]);

  useEffect(() => {
    if (showQuickCreateTicket) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [showQuickCreateTicket]);

  const fetchTickets = async () => {
    if (
      !user ||
      !user.companies ||
      !user.currentLoggedCompany.currentLoggedCompanyId
    ) {
      return;
    }

    try {
      setLoading(true);
      const { data } = await apiClient().get("/ticket", {
        params: {
          companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
          currentUserId: user.userId,
          ticketPriorityId: selectedTicketPriority,
        },
      });
      setTickets(data.body);
    } catch (err) {
      setLoading(false);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [user, selectedTicketPriority]);

  return (
    <Layout>
      <S.Container>
        {loading ? (
          <LottieLoad />
        ) : (
          <S.TicketsWrapper>
            <TicketKanban
              data={tickets}
              setShowTicketModal={setShowTicketModal}
              showTicketModal={showTicketModal}
              updateTicketsCallback={fetchTickets}
              showQuickCreateTicket={showQuickCreateTicket}
              setShowQuickCreateTicket={setShowQuickCreateTicket}
              ticketPriority={ticketPriority}
              selectedTicketPriority={selectedTicketPriority}
              setSelectedTicketPriority={setSelectedTicketPriority}
            />

            {showQuickCreateTicket && (
              <S.Wrapper className={showQuickCreateTicket ? "active" : ""}>
                <S.CloseButton onClick={() => setShowQuickCreateTicket(false)}>
                  &times;
                </S.CloseButton>
                <CreateTicket tickets={tickets} setTickets={setTickets} />
              </S.Wrapper>
            )}
          </S.TicketsWrapper>
        )}
      </S.Container>
    </Layout>
  );
}
