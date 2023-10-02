import { useState, useEffect } from "react";
import {
  FiX,
  FiUser,
  FiClock,
  FiAlertCircle,
  FiMessageCircle,
  FiStar,
  FiImage,
  FiBox,
} from "react-icons/fi";
import { AiFillCloseCircle } from "react-icons/ai";
import { ITicket } from "../TicketKanban";

import * as S from "./styles";
import { apiClient } from "../../services/api";
import { useDebounce } from "../../hooks/useDebounce";
import { toast } from "react-toastify";
import { TodoList } from "../TodoList";
import { AddTodo } from "../TodoList/AddTodo";

type TicketsModalProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  data: ITicket;
  technicians: any;
  loggedUser: any;
  updateTicketsCallback: any;
};

interface Todo {
  text: string;
}

export function TicketsModal({
  onClose,
  data,
  technicians,
  loggedUser,
  updateTicketsCallback,
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
  const [selectedLocation, setSelectedLocation] = useState<string>(
    ticketData.ticketLocation.id
  );
  const [selectedCategory, setSelectedCategory] = useState<string>(
    ticketData.ticketCategory.id
  );
  const [selectedPriority, setSelectedPriority] = useState(
    ticketData.ticketPriority.id
  );

  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedSLA, setSelectedSLA] = useState(ticketData.slaDefinitionId);
  const [slas, setSlas] = useState([]);
  const [manualResolutionDueDate, setManualResolutionDueDate] = useState("");
  const [deposits, setDeposits] = useState<any[]>([]);
  const [depositItems, setDepositItems] = useState<any[]>([]);
  const [selectedDeposit, setSelectedDeposit] = useState("");
  const [selectedDepositItem, setSelectedDepositItem] = useState("");
  const [quantityUsed, setQuantityUsed] = useState(0);

  const [todos, setTodos] = useState<Todo[]>([
    { text: "Learn React" },
    { text: "Learn TypeScript" },
  ]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClient().get("/ticket-category", {
          params: {
            companyId: loggedUser?.currentLoggedCompany.currentLoggedCompanyId,
          },
        });
        setTicketCategory(data.body);
      } catch (err) {}

      try {
        const { data } = await apiClient().get("/ticket-priority", {
          params: {
            companyId: loggedUser?.currentLoggedCompany.currentLoggedCompanyId,
          },
        });
        setTicketPriority(data.body);
      } catch (err) {}

      try {
        const { data } = await apiClient().get("/location", {
          params: {
            companyId: loggedUser?.currentLoggedCompany.currentLoggedCompanyId,
          },
        });
        setTicketLocation(data.body);
      } catch (err) {}

      try {
        const { data } = await apiClient().get("/sla");
        setSlas(data.body);
      } catch (err) {}
    })();
  }, []);

  useEffect(() => {
    const fetchTicketResponses = async () => {
      try {
        const { data } = await apiClient().get(
          `/ticket/${ticketData.id}/responses`,
          {
            params: {
              companyId:
                loggedUser?.currentLoggedCompany.currentLoggedCompanyId,
            },
          }
        );

        setConversations(data.body);
      } catch (error) {
        console.error("Erro ao carregar respostas do ticket:", error);
      }
    };

    fetchTicketResponses();
  }, [ticketData.id]);

  useEffect(() => {
    if (data.TicketEvaluation?.length > 0) {
      setSelectedRating(data.TicketEvaluation[0]?.rating);
    }
  }, [selectedRating]);

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
    // Verifique se o técnico já foi atribuído
    if (changeAssignedTo.some((tech: any) => tech.id === techId)) return;

    // Encontre o técnico pelo id
    const tech = technicians.find((tech: any) => tech.id === techId);
    if (!tech) return;

    // Adicione o técnico à lista de técnicos atribuídos
    setChangeAssignedTo([...changeAssignedTo, tech]);

    handleDataChange("assignedTo", { id: techId, name: tech.name });
    handleDataChange("status", "assigned");

    if (ticketStatus === "new") {
      setTicketStatus("assigned");
    }
  };

  const handleRemoveAssignedTo = async (techId: string) => {
    const updatedAssignedTo = changeAssignedTo.filter(
      (tech: any) => tech.id !== techId
    );

    setChangeAssignedTo(updatedAssignedTo);

    const payload = {
      assignedTo: updatedAssignedTo.map((tech: any) => ({
        id: tech.id,
        name: tech.name,
      })),
    };

    try {
      await apiClient()
        .put(`/ticket/${data.id}?userId=${loggedUser.userId}`, payload)
        .catch((error) => {
          console.error(
            `An error occurred while removing the assigned technician:`,
            error
          );
        });

      setTicketData((prevData) => ({
        ...prevData,
        assignedTo: updatedAssignedTo,
      }));
    } catch (error) {
      console.error(
        `An error occurred while removing the assigned technician:`,
        error
      );
    }
  };

  // Function to handle click outside the modal
  const handleClickOutsideModal = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose(false);
      updateTicketsCallback();
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
      content: userResponse,
      userId: loggedUser.userId,
    };

    try {
      await apiClient().post(`/ticket/response`, payload);

      setConversations((prev) => [...prev, `User: ${userResponse}`]);
      setUserResponse("");
    } catch (error) {
      console.error("Erro ao enviar a resposta do usuário:", error);
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setTicketStatus(newStatus);
    handleDataChange("status", newStatus);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocation = e.target.value;
    setSelectedLocation(newLocation);
    handleDataChange("ticketLocationId", newLocation);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    handleDataChange("ticketCategoryId", newCategory);
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPriority = e.target.value;
    setSelectedPriority(newPriority);
    handleDataChange("ticketPriorityId", newPriority);
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

  const submitRating = async () => {
    if (selectedRating === null) return;

    try {
      await apiClient().post(`/ticket/evaluate`, {
        ticketId: ticketData.id,
        userId: loggedUser.userId,
        rating: selectedRating,
      });
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
    }
  };

  const Star = ({ index, selectedRating, onClick }: any) => (
    <span
      className="star"
      onClick={() => onClick(index)}
      style={{
        display: "inline-block",
        cursor: "pointer",
        color: index <= selectedRating ? "#ffca00" : "gray",
      }}
    >
      ★
    </span>
  );

  const handleStarClick = (index: number) => {
    setSelectedRating(index);
  };

  const handleSLAChange = async (event: any) => {
    const newSLA = event.target.value;
    setSelectedSLA(newSLA);

    // Agora, faça uma chamada à API para atualizar o slaDefinitionId
    try {
      await apiClient().put(`/ticket/${data.id}?userId=${loggedUser.userId}`, {
        slaDefinitionId: newSLA,
      });
    } catch (error) {
      console.error(`Erro ao atualizar o slaDefinitionId:`, error);
    }
  };

  const handleManualResolutionDueDateChange = (e: any) => {
    setManualResolutionDueDate(e.target.value);
  };

  const fetchDeposits = async () => {
    try {
      const response = await apiClient().get("/deposit", {
        params: {
          companyId: loggedUser?.currentLoggedCompany.currentLoggedCompanyId,
        },
      });

      setDeposits(response.data.body);
    } catch (error) {
      console.error("An error occurred while fetching depositos:", error);
    }
  };

  useEffect(() => {
    fetchDeposits();
  }, []);

  const handleDepositChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newValue = event.target.value;
    setSelectedDeposit(newValue);
    if (newValue) {
      fetchDepositItems(newValue);
    }
  };

  const fetchDepositItems = async (depositId: string) => {
    try {
      const response = await apiClient().get(`/deposit-item/items`, {
        params: {
          depotId: depositId,
        },
      });

      setDepositItems(response.data.body);
    } catch (error) {
      console.error("An error occurred while fetching deposito items:", error);
    }
  };

  const handleDepositItemChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedDepositItem(event.target.value);
  };

  const handleSaveQuantityUsed = async () => {
    if (!quantityUsed) {
      // mostrar uma mensagem de erro para o usuário
      return;
    }

    // payload
    const payload = {
      depositId: selectedDeposit,
      itemId: selectedDepositItem,
      quantityNew: quantityUsed,
      ticketId: ticketData.id,
    };

    try {
      await apiClient().put(
        `deposit-item/items/quantity/${selectedDepositItem}`,
        payload
      );

      toast.success("Sucesso! Seu depósito foi atualizado com sucesso!");

      setQuantityUsed(0);
      setSelectedDeposit("");
      setSelectedDepositItem("");
    } catch (error: any) {
      toast.error(`Que pena! ${error.response.data.message}.`);
      console.error("Erro ao salvar a quantidade de item consumido:", error);
    }
  };

  const handleAddTodo = (text: string) => {
    setTodos([...todos, { text }]);
  };

  return (
    <S.ModalWrapper onClick={handleClickOutsideModal}>
      <S.Modal onClick={stopPropagation}>
        <S.LeftSide>
          <S.InfoGroup>
            <S.InfoItem>
              <S.IconContainer>
                <FiAlertCircle /> <S.InfoTitle>Descrição</S.InfoTitle>
              </S.IconContainer>
              <S.InfoContent>
                <S.StyledTextArea value={description} onChange={handleChange} />
              </S.InfoContent>
            </S.InfoItem>
          </S.InfoGroup>
          <S.InfoGroup>
            <S.InfoItem>
              <S.IconContainer>
                <FiImage /> <S.InfoTitle>Imagens</S.InfoTitle>
              </S.IconContainer>
              <S.InfoContent>
                {ticketData?.images?.map((image: any, index) => (
                  <a
                    key={index}
                    href={image.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ margin: "10px", boxShadow: "2px 2px 10px #ddd" }}
                  >
                    <img
                      src={image.path}
                      alt={`Ticket Image ${index + 1}`}
                      width={100}
                    />
                  </a>
                ))}
              </S.InfoContent>
            </S.InfoItem>
          </S.InfoGroup>

          <S.InfoGroup>
            <S.InfoItem>
              <S.IconContainer>
                <FiMessageCircle />
                <S.InfoTitle>Mensagens</S.InfoTitle>
              </S.IconContainer>
              <S.ConversationContainer>
                {conversations.map((msg: any, index: number) => (
                  <S.Message isTech={msg.User.isTechnician} key={index}>
                    {`${msg.User.name}: ${msg.content}`}
                  </S.Message>
                ))}
                <S.ReplyContainer>
                  <S.StyledTextarea
                    value={
                      loggedUser.isTechnician
                        ? technicianResponse
                        : userResponse
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
                </S.ReplyContainer>
              </S.ConversationContainer>
            </S.InfoItem>
          </S.InfoGroup>

          <S.InfoGroup>
            <div>
              <h1>Lista de Tarefas Realizadas</h1>
              <AddTodo onAdd={handleAddTodo} />
              <TodoList todos={todos} />
            </div>
          </S.InfoGroup>
        </S.LeftSide>
        <S.RightSide>
          <S.CloseButton
            onClick={() => {
              onClose(false);
              updateTicketsCallback();
            }}
          >
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
                <FiUser size="15" />{" "}
                <S.InfoTitle>Técnico Atribuído</S.InfoTitle>
              </S.IconContainer>
              <S.InfoContent
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDropdown(!showDropdown);
                }}
              >
                {changeAssignedTo.some((tech: any) => tech.name !== "")
                  ? changeAssignedTo.map((tech: any) => (
                      <span
                        key={tech.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <span>{tech.name}</span>
                        {tech.name !== "" && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveAssignedTo(tech.id);
                            }}
                            style={{
                              border: "none",
                              cursor: "pointer",
                              marginLeft: "10px",
                            }}
                          >
                            <AiFillCloseCircle
                              fill="red"
                              size={18}
                              style={{ color: "white" }}
                            />
                          </button>
                        )}
                      </span>
                    ))
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
                  value={selectedPriority}
                  onChange={handlePriorityChange}
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
                  value={selectedCategory}
                  onChange={handleCategoryChange}
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
                  value={selectedLocation}
                  onChange={handleLocationChange}
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
                <FiClock /> <S.InfoTitle>SLA</S.InfoTitle>
              </S.IconContainer>
              <S.InfoContent>
                <S.StyledSelect value={selectedSLA} onChange={handleSLAChange}>
                  {slas.map((sla: any) => (
                    <option key={sla.id} value={sla.id}>
                      {`${sla.ticketPriority} - Tempo estimado: ${sla.resolutionTime}`}
                    </option>
                  ))}
                </S.StyledSelect>
              </S.InfoContent>
            </S.InfoItem>

            <S.InfoItem>
              <S.IconContainer>
                <FiClock />
                <S.InfoTitle>Data/Hora Manual de Resolução</S.InfoTitle>
              </S.IconContainer>
              <S.InfoContent>
                <S.StyledInput
                  type="datetime-local"
                  value={manualResolutionDueDate}
                  onChange={handleManualResolutionDueDateChange}
                />
              </S.InfoContent>
            </S.InfoItem>
          </S.InfoGroup>
          <S.InfoGroup>
            <S.InfoItem>
              <S.IconContainer>
                <FiClock />
                <S.InfoTitle>Tempo estimado para solução:</S.InfoTitle>
              </S.IconContainer>
              <S.InfoContent>
                {ticketData.timeEstimate
                  ? formatDate(ticketData.timeEstimate)
                  : "Data não disponível"}
              </S.InfoContent>
            </S.InfoItem>
          </S.InfoGroup>
          <S.InfoGroup>
            <S.InfoItem>
              <S.IconContainer>
                <FiBox /> <S.InfoTitle>Depósitos</S.InfoTitle>
              </S.IconContainer>
              <S.InfoContent>
                <S.StyledSelect
                  value={selectedDeposit}
                  onChange={handleDepositChange}
                >
                  <option value="">Selecione um depósito</option>
                  {deposits.map((deposito: any) => (
                    <option key={deposito.id} value={deposito.id}>
                      {deposito.name}
                    </option>
                  ))}
                </S.StyledSelect>

                {selectedDeposit && (
                  <div style={{ display: "block", marginTop: "10px" }}>
                    <S.StyledSelect
                      value={selectedDepositItem}
                      onChange={handleDepositItemChange}
                      style={{ marginBottom: "10px" }}
                    >
                      <option value="">Selecione um item</option>
                      {depositItems.map((item: any) => (
                        <option key={item.id} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </S.StyledSelect>

                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <label style={{ marginRight: "10px" }}>Quantidade:</label>

                      <S.StyledInput
                        type="number"
                        min="1"
                        value={quantityUsed}
                        onChange={(e) =>
                          setQuantityUsed(Number(e.target.value))
                        }
                      />
                    </div>

                    <div style={{ marginTop: "10px", textAlign: "center" }}>
                      <S.Button onClick={handleSaveQuantityUsed}>
                        Atualizar Deposito
                      </S.Button>
                    </div>
                  </div>
                )}
              </S.InfoContent>
            </S.InfoItem>
          </S.InfoGroup>
          <S.InfoGroup>
            <S.InfoItem>
              <S.UsedItemsHistory>
                <h2>Historico de Itens Utilizados</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>Quantidade</th>
                      <th>Custo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ticketData?.usedItems?.map((item) => (
                      <tr key={item.id}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>{item.cost}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div
                  style={{
                    textAlign: "right",
                  }}
                >
                  Total:{" "}
                  {ticketData?.usedItems?.reduce(
                    (total, item) => total + item.cost,
                    0
                  )}
                </div>
              </S.UsedItemsHistory>
            </S.InfoItem>
          </S.InfoGroup>
        </S.RightSide>

        {ticketStatus === "closed" ? (
          <S.InfoGroup>
            <S.InfoItem>
              <S.IconContainer>
                <FiStar /> <S.InfoTitle>Avaliação</S.InfoTitle>
              </S.IconContainer>
              <S.InfoContent>
                <div>
                  {[1, 2, 3, 4, 5].map((_, index) => (
                    <Star
                      key={index}
                      index={index + 1}
                      selectedRating={selectedRating}
                      onClick={handleStarClick}
                      // value={data?.TicketEvaluation[0]?.rating}
                    />
                  ))}
                </div>

                {data?.TicketEvaluation?.length > 0 ? null : (
                  <S.StyledButton onClick={submitRating}>
                    Enviar Avaliação
                  </S.StyledButton>
                )}
              </S.InfoContent>
            </S.InfoItem>
          </S.InfoGroup>
        ) : null}
      </S.Modal>
    </S.ModalWrapper>
  );
}
