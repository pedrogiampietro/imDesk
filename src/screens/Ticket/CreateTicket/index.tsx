import { useState, useEffect, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Select, { components } from "react-select";
import { apiClient } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";
import { ThemeContext } from "./../../../App";
import { createNewTicketSchema } from "../../../validations/createTicketSchema";
import { MdOutlineErrorOutline } from "react-icons/md";
import { toast } from "react-toastify";

import * as S from "./styles";

interface ISelect {
  id: string;
  name: string;
  value: string;
}

interface Ticket {
  id: string;
  description: string;
  ticketType: string;
  ticketCategory: string;
  ticketPriority: string;
  ticketLocation: string;
  assignedTo: string[];
  equipaments: any[];
  images: any[];
  assignedToAt: string | null;
  closedBy: string | null;
  closedAt: string | null;
  status: string;
  timeEstimate: number | null;
  isDelay: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
  ticketCategoryId: {
    id: string;
    name: string;
    childrenName: string;
    defaultText: string | null;
  };
  ticketLocationId: {
    id: string;
    name: string;
  };
  ticketPriorityId: {
    id: string;
    name: string;
  };
  ticketTypeId: {
    id: string;
    name: string;
  };
  User: {
    id: string;
    username: string;
    name: string;
    email: string;
    password: string;
    phone: string;
    ramal: string;
    sector: string;
    createdAt: string;
    updatedAt: string;
  };
}

export function CreateTicket({ tickets, setTickets }: any) {
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: yupResolver(createNewTicketSchema),
    reValidateMode: "onChange",
    shouldFocusError: true,
    defaultValues: {
      ticket_type: "",
      ticket_category: "",
      ticket_priority: "",
      ticket_location: "",
      ticket_description: "",
    },
  });

  const { user } = useAuth();
  const { theme } = useContext(ThemeContext);
  const [ticketType, setTicketType] = useState([]);
  const [ticketCategory, setTicketCategory] = useState([]);
  const [ticketPriority, setTicketPriority] = useState([]);
  const [ticketLocation, setTicketLocation] = useState([]);

  const [selectedType, setSelectedType] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState("");

  const getTicketType = async () => {
    if (!user || !user.companies || !user.companies.companyId) {
      return;
    }

    try {
      const { data } = await apiClient().get("/ticket-type", {
        params: {
          companyId: user?.companies.companyId,
        },
      });
      setTicketType(data.body);
    } catch (err) {}
  };

  useEffect(() => {
    getTicketType();
  }, [user]);

  const getTicketCategory = async () => {
    if (!user || !user.companies || !user.companies.companyId) {
      return;
    }

    try {
      const { data } = await apiClient().get("/ticket-category", {
        params: {
          companyId: user?.companies.companyId,
        },
      });

      setTicketCategory(data.body);
    } catch (err) {}
  };

  useEffect(() => {
    getTicketCategory();
  }, [user]);

  const getTicketPriority = async () => {
    if (!user || !user.companies || !user.companies.companyId) {
      return;
    }

    try {
      const { data } = await apiClient().get("/ticket-priority", {
        params: {
          companyId: user?.companies.companyId,
        },
      });

      setTicketPriority(data.body);
    } catch (err) {}
  };

  useEffect(() => {
    getTicketPriority();
  }, [user]);

  const getTicketLocation = async () => {
    if (!user || !user.companies || !user.companies.companyId) {
      return;
    }

    try {
      const { data } = await apiClient().get("/location", {
        params: {
          companyId: user?.companies.companyId,
        },
      });

      setTicketLocation(data.body);
    } catch (err) {}
  };

  useEffect(() => {
    getTicketLocation();
  }, [user]);

  const Group = (props: any) => (
    <div style={groupStyles}>
      <components.Group {...props} />
    </div>
  );

  const groupStyles = {
    border: "2px dotted red",
    borderRadius: "5px",
    background: "#f2fcff",
  };

  const handleSubmitTicket = async (values: any) => {
    console.log("values", values);
    try {
      const { data } = await apiClient().post(
        "/ticket",
        {
          companyId: user?.companies.companyId,
          ...values,
        },
        {
          params: {
            userId: user?.userId,
          },
        }
      );

      setTickets([...tickets, data.body]);

      toast.success("Sucesso! Seu ticket foi aberto! 🚀", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Limpa os campos após a submissão bem-sucedida
      setSelectedType(null);
      setSelectedCategory(null);
      setSelectedPriority(null);
      setSelectedLocation(null);
      setSelectedDescription("");
    } catch (err) {
      console.warn("err", err);
    }
  };

  return (
    <S.Wrapper>
      <S.Form onSubmit={handleSubmit(handleSubmitTicket)}>
        <S.FormGroup>
          <S.Label htmlFor="ticket_type" isActive={theme === "dark"}>
            Tipo de Chamado:
          </S.Label>
          <Controller
            control={control}
            name="ticket_type"
            render={({ field: { onChange } }) => {
              return (
                <Select
                  placeholder={"<Selecione>"}
                  options={ticketType}
                  value={selectedType}
                  getOptionLabel={(option: ISelect) => option.name}
                  getOptionValue={(option: ISelect) => option.id}
                  onChange={(v: any) => {
                    onChange(v.id);
                    setSelectedType(v);
                  }}
                />
              );
            }}
          />
          <div>
            {!!errors.ticket_type && (
              <small
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                  color: "red",
                }}
              >
                <MdOutlineErrorOutline
                  fill="red"
                  size={16}
                  style={{ marginRight: "3px" }}
                />
                {errors.ticket_type.message}
              </small>
            )}
          </div>
        </S.FormGroup>
        <S.FormGroup>
          <S.Label htmlFor="ticket_category" isActive={theme === "dark"}>
            Categoria:
          </S.Label>

          <Controller
            control={control}
            name="ticket_category"
            render={({ field: { onChange } }: any) => {
              return (
                <Select
                  placeholder={"<Selecione>"}
                  options={ticketCategory}
                  value={selectedCategory}
                  getOptionLabel={(option: ISelect) => option.value}
                  getOptionValue={(option: ISelect) => option.id}
                  components={{ Group }}
                  onChange={(v: any) => {
                    onChange(v.id);
                    setSelectedCategory(v);
                  }}
                  styles={{
                    groupHeading: (base) => ({
                      ...base,
                      flex: "1 1",
                      color: "red",
                      margin: 0,
                    }),
                  }}
                />
              );
            }}
          />
          <div>
            {!!errors.ticket_category && (
              <small
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginTop: "10px",
                  color: "red",
                }}
              >
                <MdOutlineErrorOutline
                  fill="red"
                  size={16}
                  style={{ marginRight: "3px" }}
                />
                {errors.ticket_category.message}
              </small>
            )}
          </div>
        </S.FormGroup>
        <S.FormGroup>
          <S.Label htmlFor="ticket_priority" isActive={theme === "dark"}>
            Prioridade:
          </S.Label>
          <Controller
            control={control}
            name="ticket_priority"
            render={({ field: { onChange } }: any) => {
              return (
                <Select
                  placeholder={"<Selecione>"}
                  options={ticketPriority}
                  value={selectedPriority}
                  getOptionLabel={(option: ISelect) => option.name}
                  getOptionValue={(option: ISelect) => option.id}
                  onChange={(v: any) => {
                    onChange(v.id);
                    setSelectedPriority(v);
                  }}
                />
              );
            }}
          />
          {!!errors.ticket_priority && (
            <small
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
                color: "red",
              }}
            >
              <MdOutlineErrorOutline
                fill="red"
                size={16}
                style={{ marginRight: "3px" }}
              />
              {errors.ticket_priority.message}
            </small>
          )}
        </S.FormGroup>
        <S.FormGroup>
          <S.Label htmlFor="ticket_location" isActive={theme === "dark"}>
            Localização:
          </S.Label>
          <Controller
            control={control}
            name="ticket_location"
            render={({ field: { onChange } }: any) => {
              return (
                <Select
                  placeholder={"<Selecione>"}
                  options={ticketLocation}
                  value={selectedLocation}
                  getOptionLabel={(option: ISelect) => option.name}
                  getOptionValue={(option: ISelect) => option.id}
                  onChange={(v: any) => {
                    onChange(v.id);
                    setSelectedLocation(v);
                  }}
                />
              );
            }}
          />
          {!!errors.ticket_priority && (
            <small
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "10px",
                color: "red",
              }}
            >
              <MdOutlineErrorOutline
                fill="red"
                size={16}
                style={{ marginRight: "3px" }}
              />
              {errors.ticket_priority.message}
            </small>
          )}
        </S.FormGroup>
        <S.FormGroup>
          <S.Label htmlFor="ticket_description" isActive={theme === "dark"}>
            Descrição:
          </S.Label>
          <S.TextArea
            value={selectedDescription}
            className="basic-single"
            {...register("ticket_description")}
            onChange={(e) => setSelectedDescription(e.target.value)}
          />
        </S.FormGroup>

        {/* <S.FormGroup>
          <S.Label htmlFor="ticket_type" isActive={theme === "dark"}>
            Equipamentos:
          </S.Label>
          <S.Input type="text" id="ticket_type" />
        </S.FormGroup> */}

        <S.CreateTicketButton type="submit" isActive={theme === "dark"}>
          Criar Ticket
        </S.CreateTicketButton>
      </S.Form>
    </S.Wrapper>
  );
}
