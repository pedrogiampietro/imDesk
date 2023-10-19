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
  const { user } = useAuth();

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
  }, [user]);

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
            />

            {showQuickCreateTicket && (
              <CreateTicket tickets={tickets} setTickets={setTickets} />
            )}
          </S.TicketsWrapper>
        )}
      </S.Container>
    </Layout>
  );
}
