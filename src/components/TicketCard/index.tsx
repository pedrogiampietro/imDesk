import * as S from "./styles";
import { formatarData } from "../../utils/dateTime";
import { TicketsModal } from "../TicketsModal";

import { useAuth } from "../../hooks/useAuth";

export function TicketCard({
  data,
  showTicketModal,
  setShowTicketModal,
  updateTicketsCallback,
  technicians,
}: any) {
  const { user } = useAuth();
  const loggedUser = user;

  function getInitials(name: string): string {
    const names = name.split(" ");
    return names.length >= 2
      ? (names[0][0] + names[names.length - 1][0]).toUpperCase()
      : names[0][0].toUpperCase();
  }

  return (
    <S.CardContainer
      urgency={data.ticketPriority.name}
      onClick={() => setShowTicketModal(!showTicketModal)}
    >
      <S.FlexWrapper>
        <S.FlexWrapper>
          <S.StatusCircle urgency={data.ticketPriority.name} />
          <S.TicketId>Ticket# 2023-CS123</S.TicketId>
        </S.FlexWrapper>

        <S.OpenedAt>Criado em {formatarData(data.createdAt as any)}</S.OpenedAt>
      </S.FlexWrapper>

      <S.Title>{data.ticketCategory.childrenName}</S.Title>

      <S.Description>{data.description}</S.Description>

      <S.TopLine></S.TopLine>

      <S.Info>
        <S.FlexWrapper>
          {data.User.avatarUrl ? (
            <S.Avatar src={data.User.avatarUrl} alt={data.User.name} />
          ) : (
            <S.DefaultAvatar>{getInitials(data.User.name)}</S.DefaultAvatar>
          )}
          <S.OpenedBy>Aberto por {data.User.name}</S.OpenedBy>
        </S.FlexWrapper>
        <S.OpenModalLink onClick={() => setShowTicketModal(true)}>
          Abrir modal
        </S.OpenModalLink>
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
