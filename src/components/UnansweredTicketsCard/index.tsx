import { AiFillWechat } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import * as S from "./styles";

export function UnansweredTicketsCard({ all, my }: any) {
  return (
    <S.CardContainer>
      <S.Title>Tickets sem resposta</S.Title>
      <S.BorderBottom />
      <S.Content>
        <S.Section>
          <S.Icon>
            <AiFillWechat fill="#34A853" size={20} />
          </S.Icon>
          <S.Label>Todos</S.Label>
          <S.Value color="#34A853">{all}</S.Value>
        </S.Section>
        <S.Section>
          <S.Icon>
            <FaUsers fill="#FFC107" size={20} />
          </S.Icon>
          <S.Label>Meus</S.Label>
          <S.Value color="#FFC107">{my}</S.Value>
        </S.Section>
      </S.Content>
    </S.CardContainer>
  );
}
