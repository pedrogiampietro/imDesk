import { useState, useEffect } from "react";

import { Layout } from "../../components/Layout";

import { TicketKanban } from "../../components/TicketKanban";

import * as S from "./styles";
import { apiClient } from "../../services/api";
import { CreateTicket } from "./CreateTicket";
import { useAuth } from "../../hooks/useAuth";

export function Ticket() {
  const [tickets, setTickets] = useState([]);
  const [showTicketModal, setShowTicketModal] = useState<boolean>(false);
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
      const { data } = await apiClient().get("/ticket", {
        params: {
          companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
        },
      });
      setTickets(data.body);
    } catch (err) {}
  };

  useEffect(() => {
    fetchTickets();
  }, [user]);

  return (
    <Layout>
      <S.Container>
        <CreateTicket tickets={tickets} setTickets={setTickets} />

        <S.TicketsWrapper>
          <TicketKanban
            data={tickets}
            setShowTicketModal={setShowTicketModal}
            showTicketModal={showTicketModal}
            updateTicketsCallback={fetchTickets}
          />
        </S.TicketsWrapper>
      </S.Container>
    </Layout>
  );
}
