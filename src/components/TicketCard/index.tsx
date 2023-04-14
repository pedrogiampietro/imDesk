import * as S from "./styles";

import { formatarData } from "../../utils/dateTime";
import { TicketsModal } from "../TicketsModal";

export function TicketCard({ data, showTicketModal, setShowTicketModal }: any) {
  return (
    <S.CardContainer onClick={() => setShowTicketModal(!showTicketModal)}>
      <S.TitleOpenedWrapper>
        <S.Title>{data.ticketCategoryId.childrenName}</S.Title>
        <S.OpenedAt>{formatarData(data.createdAt as any)}</S.OpenedAt>
      </S.TitleOpenedWrapper>

      <S.Description>{data.description}</S.Description>
      <S.Info>
        <S.Urgency urgency={data.ticketPriorityId.name as any}>
          {data.ticketPriorityId.name}
        </S.Urgency>
        <S.OpenedBy>Aberto por {data.User.name}</S.OpenedBy>
      </S.Info>

      {showTicketModal && (
        <TicketsModal data={data} onClose={setShowTicketModal} />
      )}
    </S.CardContainer>
  );
}
