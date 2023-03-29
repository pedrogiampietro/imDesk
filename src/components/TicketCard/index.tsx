import * as S from "./styles";

import { Ticket } from "../TicketKanban";

export function TicketCard(props: Ticket) {
  return (
    <S.CardContainer>
      <S.TitleOpenedWrapper>
        <S.Title>{props.ticketCategoryId.childrenName}</S.Title>
        <S.OpenedAt>{props.createdAt as any}</S.OpenedAt>
      </S.TitleOpenedWrapper>

      <S.Description>{props.description}</S.Description>
      <S.Info>
        <S.Urgency urgency={props.ticketPriorityId.name as any}>
          {props.ticketPriorityId.name}
        </S.Urgency>
        <S.OpenedBy>Aberto por {props.User.name}</S.OpenedBy>
      </S.Info>
    </S.CardContainer>
  );
}
