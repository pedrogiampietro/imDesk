import * as S from "./styles";

interface CardProps {
  label: string;
  value: number;
  color: string;
}

export const Card: React.FC<CardProps> = ({ label, value, color }) => {
  return (
    <S.CardContainer>
      <S.CardLabel>{label}</S.CardLabel>
      <S.CardValue color={color}>{value}</S.CardValue>
    </S.CardContainer>
  );
};
