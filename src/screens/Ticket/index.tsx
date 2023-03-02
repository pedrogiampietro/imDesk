import { useState, useEffect } from "react";

import { useContext } from "react";
import { Layout } from "../../components/Layout";
import { ThemeContext } from "./../../App";
import { Table } from "../../components/TicketsTable/";
import { TicketsModal } from "../../components/TicketsModal";

import * as S from "./styles";
import { apiClient } from "../../services/api";
import { CreateTicket } from "./CreateTicket";

import { toast } from "react-toastify";

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

  console.log("tickets", tickets);

  return (
    <Layout>
      <S.Container>
        <S.Title>Novo Ticket</S.Title>

        <CreateTicket tickets={tickets} setTickets={setTickets} />

        <S.TicketsWrapper>
          <Table data={tickets} />
        </S.TicketsWrapper>

        {showTicketModal && <TicketsModal onClose={setShowTicketModal} />}
      </S.Container>
    </Layout>
  );
}
