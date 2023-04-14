import { useState, useEffect } from "react";

import { useContext } from "react";
import { Layout } from "../../components/Layout";
import { ThemeContext } from "./../../App";

import { TicketKanban } from "../../components/TicketKanban";

import * as S from "./styles";
import { apiClient } from "../../services/api";
import { CreateTicket } from "./CreateTicket";

export function Ticket() {
  const { theme } = useContext(ThemeContext);
  const [tickets, setTickets] = useState([]);
  const [showTicketModal, setShowTicketModal] = useState<boolean>(false);

  const fetchTickets = async () => {
    try {
      const { data } = await apiClient().get("/ticket");
      setTickets(data.body);
    } catch (err) {}
  };

  useEffect(() => {
    fetchTickets();
  }, []);

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
          />
        </S.TicketsWrapper>
      </S.Container>
    </Layout>
  );
}
