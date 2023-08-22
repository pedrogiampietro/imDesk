import { useState, useEffect } from "react";
import { apiClient } from "../../services/api";
import * as S from "./styles"; // Consider renaming your styled components for more clarity.

import { formatarData } from "../../utils/dateTime";
import { TicketsModal } from "../TicketsModal";

import { useAuth } from "../../hooks/useAuth";

export function TicketCard({
  data,
  showTicketModal,
  setShowTicketModal,
  updateTicketsCallback,
}: any) {
  const [technicians, setTechnicians] = useState([]);
  const { user } = useAuth();

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

  const loggedUser = user;

  return (
    <S.CardContainer
      urgency={data.ticketPriority.name}
      onClick={() => setShowTicketModal(!showTicketModal)}
    >
      <S.TitleOpenedWrapper>
        <S.Title>{data.ticketCategory.childrenName}</S.Title>
        <S.OpenedAt>Criado em {formatarData(data.createdAt as any)}</S.OpenedAt>
      </S.TitleOpenedWrapper>

      <S.Description>{data.description}</S.Description>

      <S.Info>
        <S.Urgency urgency={data.ticketPriority.name as any}>
          {data.ticketPriority.name}
        </S.Urgency>
        <S.OpenedBy>Aberto por {data.User.name}</S.OpenedBy>
      </S.Info>

      {showTicketModal && (
        <TicketsModal
          data={data}
          onClose={setShowTicketModal}
          technicians={technicians}
          loggedUser={loggedUser}
          updateTicketsCallback={updateTicketsCallback}
        />
      )}
    </S.CardContainer>
  );
}
