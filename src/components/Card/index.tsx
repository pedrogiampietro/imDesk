import * as S from "./styles";

interface CardProps {
  label: string;
  value: number;
  color: string;
  ticket?: {
    id: string;
    ticketCategory: {
      name: string;
      childrenName: string;
    };
    description: string;
    User: {
      name: string;
    };
  };
}

export const Card: React.FC<CardProps> = ({ label, value, color, ticket }) => {
  return (
    <S.CardContainer>
      <S.CardIcon />
      <S.CardLabel>{label}</S.CardLabel>
      <S.CardValue color={color}>{value}</S.CardValue>
      {ticket && (
        <>
          <S.CardLabel>ID: {ticket.id}</S.CardLabel>
          <S.CardLabel>
            Categoria: {ticket.ticketCategory.name} -{" "}
            {ticket.ticketCategory.childrenName}
          </S.CardLabel>
          <S.CardLabel>Descrição: {ticket.description}</S.CardLabel>
          <S.CardLabel>Usuário: {ticket.User.name}</S.CardLabel>
        </>
      )}
    </S.CardContainer>
  );
};
