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
    if (!user || !user.companies || !user.companies.companyId) {
      return;
    }

    try {
      const { data } = await apiClient().get("/ticket", {
        params: {
          companyId: user?.companies.companyId,
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
        <S.Title>Novo Ticket</S.Title>

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
