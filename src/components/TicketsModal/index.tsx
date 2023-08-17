import { useState, useEffect } from "react";
import {
  FiX,
  FiUser,
  FiClock,
  FiAlertCircle,
  FiMessageCircle,
} from "react-icons/fi";
import { ITicket } from "../TicketKanban";

import * as S from "./styles";
import { apiClient } from "../../services/api";
import { useDebounce } from "../../hooks/useDebounce";

type TicketsModalProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  data: ITicket;
  technicians: any;
  loggedUser: any;
};

export function TicketsModal({
  onClose,
  data,
  technicians,
  loggedUser,
}: TicketsModalProps) {
  const currentAssignedTechnicians = data.assignedTo.map(
    (techString: string) => {
      const lastDashIndex = techString.lastIndexOf("-");
      const id = techString.substring(0, lastDashIndex);
      const name = techString.substring(lastDashIndex + 1);
      return { id, name };
    }
  );

  const [showDropdown, setShowDropdown] = useState(false);
  const [ticketData, setTicketData] = useState(data);
  const [description, setDescription] = useState(ticketData.description);
  const [changeAssignedTo, setChangeAssignedTo] = useState<any[]>(
    currentAssignedTechnicians
  );

  const [ticketCategory, setTicketCategory] = useState([]);
  const [ticketPriority, setTicketPriority] = useState([]);
  const [ticketLocation, setTicketLocation] = useState([]);

  const [userResponse, setUserResponse] = useState<string>("");
  const [technicianResponse, setTechnicianResponse] = useState<string>("");
  const [conversations, setConversations] = useState<string[]>([]);
  const [ticketStatus, setTicketStatus] = useState(ticketData.status || "new");

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClient().get("/ticket-category");
        setTicketCategory(data.body);
      } catch (err) {}

      try {
        const { data } = await apiClient().get("/ticket-priority");
        setTicketPriority(data.body);
      } catch (err) {}

      try {
        const { data } = await apiClient().get("/location");
        setTicketLocation(data.body);
      } catch (err) {}
    })();
  }, []);

  useEffect(() => {
    const fetchTicketResponses = async () => {
      try {
        const { data } = await apiClient().get(
          `/ticket/${ticketData.id}/responses`
        );
        setConversations(
          data.body.map(
            (response: any) => `${response.User.name}: ${response.content}`
          )
        );
      } catch (error) {
        console.error("Erro ao carregar respostas do ticket:", error);
      }
    };

    fetchTicketResponses();
  }, [ticketData.id]);

  const handleDataChange = async (field: string, newValue: any) => {
    const payload = { [field]: newValue };

    try {
      await apiClient()
        .put(`/ticket/${data.id}?userId=${loggedUser.userId}`, payload)
        .catch((error) => {
          console.error(
            `An error occurred while updating the ${field}:`,
            error
          );
        });

      // Update local state
      setTicketData((prevData) => ({
        ...prevData,
        [field]: newValue,
      }));
    } catch (error) {
      console.error(`An error occurred while updating the ${field}:`, error);
    }
  };

  const handleAssignTo = (techId: string) => {
    const newTechnician = technicians.find((tech: any) => tech.id === techId);
    setChangeAssignedTo([newTechnician]);

    // Call handleDataChange to update the server
    handleDataChange("assignedTo", { id: techId, name: newTechnician.name });
  };

  // Function to handle click outside the modal
  const handleClickOutsideModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose(false);
    }
  };

  // Function to prevent click event propagation within the modal
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDescription(value);
  };

  const handleDescriptionChange = (newDescription: string) => {
    handleDataChange("description", newDescription);
  };

  useDebounce(description, 500, handleDescriptionChange);

  const handleTechnicianResponseChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setTechnicianResponse(e.target.value);
  };

  const submitTechnicianResponse = async () => {
    if (technicianResponse.trim() === "") return;

    // Construa o payload. Este é um exemplo genérico, ajuste conforme sua API
    const payload = {
      ticketId: ticketData.id,
      type: "technician",
      content: technicianResponse,
      userId: loggedUser.userId,
    };

    try {
      // Faça a chamada à API
      await apiClient().post(`/ticket/response`, payload);

      // Atualize o estado local após a chamada bem-sucedida à API
      setConversations((prev) => [
        ...prev,
        `Technician: ${technicianResponse}`,
      ]);
      setTechnicianResponse("");
    } catch (error) {
      console.error("Erro ao enviar a resposta do técnico:", error);
      // Você pode querer adicionar alguma notificação ou feedback para o usuário aqui
    }
  };

  const handleUserResponseChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setUserResponse(e.target.value);
  };

  const submitUserResponse = async () => {
    if (userResponse.trim() === "") return;

    // Construa o payload
    const payload = {
      ticketId: ticketData.id,
      type: "user",
      message: userResponse,
      userId: loggedUser.id,
    };

    try {
      // Faça a chamada à API
      await apiClient().post(`/${ticketData.id}/response`, payload);

      // Atualize o estado local após a chamada bem-sucedida à API
      setConversations((prev) => [...prev, `User: ${userResponse}`]);
      setUserResponse("");
    } catch (error) {
      console.error("Erro ao enviar a resposta do usuário:", error);
      // Aqui, você pode adicionar algum feedback para o usuário em caso de falha
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setTicketStatus(newStatus);
    handleDataChange("status", newStatus);
  };

  function formatDate(dateString: Date): string {
    const date = new Date(dateString);
    return date.toLocaleString("pt-BR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <S.ModalWrapper onClick={handleClickOutsideModal}>
      <S.Modal onClick={stopPropagation}>
        <S.CloseButton onClick={() => onClose(false)}>
          <FiX size="24" />
        </S.CloseButton>
        <S.Title>Ticket #{ticketData.id}</S.Title>
        <S.InfoGroup>
          <S.InfoItem>
            <S.IconContainer>
              <FiAlertCircle /> <S.InfoTitle>Status</S.InfoTitle>
            </S.IconContainer>
            <S.InfoContent>
              <S.StyledSelect
                value={ticketStatus}
                onChange={handleStatusChange}
              >
                <option value="new">Novo</option>
                <option value="assigned">Atribuido</option>
                <option value="closed">Fechado</option>
              </S.StyledSelect>
            </S.InfoContent>
          </S.InfoItem>
          {ticketStatus === "closed" && (
            <S.InfoItem>
              <S.IconContainer>
                <FiClock /> <S.InfoTitle>Fechado em</S.InfoTitle>
              </S.IconContainer>
              <S.InfoContent>
                {formatDate(ticketData.closedAt)} por{" "}
                <strong>{ticketData.closedBy}</strong>
              </S.InfoContent>
            </S.InfoItem>
          )}
        </S.InfoGroup>

        <S.InfoGroup>
          <S.InfoItem>
            <S.IconContainer>
              <FiAlertCircle /> <S.InfoTitle>Descrição</S.InfoTitle>
            </S.IconContainer>
            <S.InfoContent>
              <S.StyledInput value={description} onChange={handleChange} />
            </S.InfoContent>
          </S.InfoItem>
          <S.InfoItem>
            <S.IconContainer>
              <FiUser size="15" /> <S.InfoTitle>Técnico Atribuído</S.InfoTitle>
            </S.IconContainer>
            <S.InfoContent
              onClick={(e) => {
                e.stopPropagation();
                setShowDropdown(!showDropdown);
              }}
            >
              {changeAssignedTo.length > 0
                ? changeAssignedTo.map((tech: any) => tech.name).join(", ")
                : "None"}
              {showDropdown && (
                <S.Dropdown>
                  {technicians.map((tech: any) => (
                    <S.DropdownItem
                      key={tech.id}
                      onClick={() => handleAssignTo(tech.id)}
                    >
                      {tech.name}
                    </S.DropdownItem>
                  ))}
                </S.Dropdown>
              )}
            </S.InfoContent>
          </S.InfoItem>
        </S.InfoGroup>
        <S.InfoGroup>
          <S.InfoItem>
            <S.IconContainer>
              <FiClock /> <S.InfoTitle>Criado em</S.InfoTitle>
            </S.IconContainer>
            <S.InfoContent>
              {new Date(ticketData.createdAt).toLocaleString()}
            </S.InfoContent>
          </S.InfoItem>
          <S.InfoItem>
            <S.IconContainer>
              <FiAlertCircle /> <S.InfoTitle>Prioridade</S.InfoTitle>
            </S.IconContainer>
            <S.InfoContent>
              <S.StyledSelect
                value={ticketData.ticketPriorityId.id}
                onChange={(e) =>
                  handleDataChange("ticketPriorityId", e.target.value)
                }
              >
                {ticketPriority.map((priority: any) => (
                  <option key={priority.id} value={priority.id}>
                    {priority.name}
                  </option>
                ))}
              </S.StyledSelect>
            </S.InfoContent>
          </S.InfoItem>
        </S.InfoGroup>
        <S.InfoGroup>
          <S.InfoItem>
            <S.IconContainer>
              <FiAlertCircle /> <S.InfoTitle>Categoria</S.InfoTitle>
            </S.IconContainer>
            <S.InfoContent>
              <S.StyledSelect
                value={ticketData.ticketCategoryId.id}
                onChange={(e) =>
                  handleDataChange("ticketCategoryId", e.target.value)
                }
              >
                {ticketCategory.map((group: any) => (
                  <optgroup label={group.label} key={group.label}>
                    {group.options.map((option: any) => (
                      <option key={option.id} value={option.id}>
                        {option.value}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </S.StyledSelect>
            </S.InfoContent>
          </S.InfoItem>
          <S.InfoItem>
            <S.IconContainer>
              <FiAlertCircle /> <S.InfoTitle>Localização</S.InfoTitle>
            </S.IconContainer>
            <S.InfoContent>
              <S.StyledSelect
                value={ticketData.ticketLocationId.id}
                onChange={(e) =>
                  handleDataChange("ticketLocationId", e.target.value)
                }
              >
                {ticketLocation.map((location: any) => (
                  <option key={location.id} value={location.id}>
                    {location.name}
                  </option>
                ))}
              </S.StyledSelect>
            </S.InfoContent>
          </S.InfoItem>
        </S.InfoGroup>

        <S.InfoGroup>
          <S.InfoItem>
            <S.IconContainer>
              <FiMessageCircle /> <S.InfoTitle>Responder mensagem</S.InfoTitle>
            </S.IconContainer>
            <S.InfoContent>
              <S.StyledTextarea
                value={
                  loggedUser.isTechnician ? technicianResponse : userResponse
                }
                onChange={
                  loggedUser.isTechnician
                    ? handleTechnicianResponseChange
                    : handleUserResponseChange
                }
                placeholder={`Digite sua resposta como ${
                  loggedUser.isTechnician ? "Técnico" : "Usuário"
                }...`}
              />
              <S.StyledButton
                onClick={
                  loggedUser.isTechnician
                    ? submitTechnicianResponse
                    : submitUserResponse
                }
              >
                Enviar
              </S.StyledButton>
            </S.InfoContent>
          </S.InfoItem>
          <S.InfoItem>
            <S.IconContainer>
              <FiMessageCircle /> <S.InfoTitle>Mensagens</S.InfoTitle>
            </S.IconContainer>
            <S.ConversationContainer>
              {conversations.map((msg, index) => (
                <div key={index}>{msg}</div>
              ))}
            </S.ConversationContainer>
          </S.InfoItem>
        </S.InfoGroup>
      </S.Modal>
    </S.ModalWrapper>
  );
}
