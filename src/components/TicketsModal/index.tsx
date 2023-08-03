import { useState, useEffect } from "react";
import { FiX, FiUser, FiClock, FiAlertCircle } from "react-icons/fi";
import { ITicket } from "../TicketKanban";

import * as S from "./styles";
import { apiClient } from "../../services/api";

type TicketsModalProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
  data: ITicket;
  technicians: any;
};

export function TicketsModal({
  onClose,
  data,
  technicians,
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
  const [changeAssignedTo, setChangeAssignedTo] = useState<any[]>(
    currentAssignedTechnicians
  );

  const [ticketType, setTicketType] = useState([]);
  const [ticketCategory, setTicketCategory] = useState([]);
  const [ticketPriority, setTicketPriority] = useState([]);
  const [ticketLocation, setTicketLocation] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await apiClient().get("/ticket-type");
        setTicketType(data.body);
      } catch (err) {}

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

  const handleDataChange = async (field: string, newValue: any) => {
    const payload = { [field]: newValue };

    try {
      await apiClient()
        .put(`/ticket/${data.id}`, payload)
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
              <FiAlertCircle /> <S.InfoTitle>Description</S.InfoTitle>
            </S.IconContainer>
            <S.InfoContent>
              <input
                type="text"
                value={ticketData.description}
                onChange={(e) =>
                  handleDataChange("description", e.target.value)
                }
              />
            </S.InfoContent>
          </S.InfoItem>
          <S.InfoItem>
            <S.IconContainer>
              <FiUser size="15" /> <S.InfoTitle>Name</S.InfoTitle>
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
              <FiClock /> <S.InfoTitle>Created At</S.InfoTitle>
            </S.IconContainer>
            <S.InfoContent>
              {new Date(ticketData.createdAt).toLocaleString()}
            </S.InfoContent>
          </S.InfoItem>
          <S.InfoItem>
            <S.IconContainer>
              <FiAlertCircle /> <S.InfoTitle>Priority</S.InfoTitle>
            </S.IconContainer>
            <S.InfoContent>
              <select
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
              </select>
            </S.InfoContent>
          </S.InfoItem>
        </S.InfoGroup>
        <S.InfoGroup>
          <S.InfoItem>
            <S.IconContainer>
              <FiAlertCircle /> <S.InfoTitle>Category</S.InfoTitle>
            </S.IconContainer>
            <S.InfoContent>
              <select
                value={ticketData.ticketCategoryId.id}
                onChange={(e) =>
                  handleDataChange("ticketCategoryId", e.target.value)
                }
              >
                {ticketCategory.map((category: any) => (
                  <option key={category.id} value={category.id}>
                    {category.childrenName}
                  </option>
                ))}
              </select>
            </S.InfoContent>
          </S.InfoItem>
          <S.InfoItem>
            <S.IconContainer>
              <FiAlertCircle /> <S.InfoTitle>Location</S.InfoTitle>
            </S.IconContainer>
            <S.InfoContent>
              <select
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
              </select>
            </S.InfoContent>
          </S.InfoItem>
        </S.InfoGroup>
      </S.Modal>
    </S.ModalWrapper>
  );
}
