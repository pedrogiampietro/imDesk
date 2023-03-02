import { FiX } from "react-icons/fi";
import * as S from "./styles";

type TicketsModalProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export function TicketsModal({ onClose }: TicketsModalProps) {
  return (
    <S.ModalWrapper>
      <S.ModalContainer>
        <S.ModalHeader>
          <h1>Ticket #6122</h1>
        </S.ModalHeader>

        <S.CloseButtonModal type="button" onClick={() => onClose(false)}>
          <FiX size="22" />
        </S.CloseButtonModal>
      </S.ModalContainer>
    </S.ModalWrapper>
  );
}
