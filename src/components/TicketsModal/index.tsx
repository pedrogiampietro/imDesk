import { FiX, FiUser, FiClock, FiAlertCircle } from "react-icons/fi";

import * as S from "./styles";
import { ITicket } from "../TicketKanban";

type TicketsModalProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  data: ITicket;
};

export function TicketsModal({ onClose, data }: TicketsModalProps) {
  const {
    id,
    description,
    ticketTypeId,
    ticketCategoryId,
    ticketPriorityId,
    ticketLocationId,
    assignedTo,
    User,
    createdAt,
  } = data;

  return (
    <S.ModalWrapper>
      <S.ModalContainer>
        <S.ModalHeader>
          <h1 style={{ fontSize: "2rem", fontWeight: "bold" }}>Ticket #{id}</h1>
          <S.CloseButtonModal type="button" onClick={() => onClose(false)}>
            <FiX size="22" />
          </S.CloseButtonModal>
        </S.ModalHeader>
        <S.ModalContent>
          <S.FieldWrapper>
            <S.FieldLabel>Label:</S.FieldLabel>
            <S.FieldValue>
              <FiAlertCircle size="15" />
              {description}
            </S.FieldValue>
          </S.FieldWrapper>
          <S.FieldWrapper>
            <S.FieldLabel>Assigned To:</S.FieldLabel>
            <S.FieldValue>
              <FiUser size="15" />
              {assignedTo.length > 0
                ? assignedTo.map((user) => user.name).join(", ")
                : "None"}
            </S.FieldValue>
          </S.FieldWrapper>
          <S.FieldWrapper>
            <S.FieldLabel>Created At:</S.FieldLabel>
            <S.FieldValue>
              <FiClock size="15" />
              {new Date(createdAt).toLocaleString()}
            </S.FieldValue>
          </S.FieldWrapper>
          <S.FieldWrapper>
            <S.FieldLabel>Priority:</S.FieldLabel>
            <S.FieldValue>
              <FiAlertCircle size="15" />
              {ticketPriorityId.name}
            </S.FieldValue>
          </S.FieldWrapper>
          <S.FieldWrapper>
            <S.FieldLabel>Category:</S.FieldLabel>
            <S.FieldValue>
              <FiAlertCircle size="15" />
              {ticketCategoryId.childrenName}
            </S.FieldValue>
          </S.FieldWrapper>
          <S.FieldWrapper>
            <S.FieldLabel>Location:</S.FieldLabel>
            <S.FieldValue>
              <FiAlertCircle size="15" />
              {ticketLocationId.name}
            </S.FieldValue>
          </S.FieldWrapper>
          <S.FieldWrapper>
            <S.FieldLabel>Created By:</S.FieldLabel>
            <S.FieldValue>
              <FiUser size="15" />
              {User.name}
            </S.FieldValue>
          </S.FieldWrapper>
        </S.ModalContent>
      </S.ModalContainer>
    </S.ModalWrapper>
  );
}
