import * as S from "./styles";

interface CardButtonProps {
  label: string;
  onClick: () => void;
}

export const CardButton: React.FC<CardButtonProps> = ({ label, onClick }) => {
  return (
    <S.CardContainer onClick={onClick}>
      <S.CardLabel>{label}</S.CardLabel>
    </S.CardContainer>
  );
};
