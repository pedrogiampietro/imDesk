import React, { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { useAuth } from "../../hooks/useAuth";
import * as S from "./styles";
import { apiClient } from "../../services/api";
import { formatarData } from "../../utils/dateTime";
import { toast } from "react-toastify";

interface Ticket {
  id: string;
  description: string;
}

export const ShiftChange: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [shiftChanges, setShiftChanges] = useState<any>([]);
  const [formState, setFormState] = useState<any>({
    atribuidos: [{ id: "", description: "" }],
    planejados: [{ id: "", description: "" }],
    pendentes: [{ id: "", description: "" }],
    controleTemperatura: false,
  });

  const [isCollapsed, setIsCollapsed] = useState(true);

  const { user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient().get("/shift-changes");
        if (response.status === 200) {
          setShiftChanges(response.data.body);
        } else {
          console.error("Falha ao buscar as passagens de plantão.");
        }
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      }
    };

    fetchData();
  }, []);

  const fetchTickets = async () => {
    if (
      !user ||
      !user.companies ||
      !user.currentLoggedCompany.currentLoggedCompanyId
    ) {
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await apiClient().get("/ticket", {
        params: {
          companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
          currentUserId: user.userId,
        },
      });

      setTickets(data.body);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [user]);

  const addChamado = (tipo: any) => {
    setFormState((prevState: any) => ({
      ...prevState,
      [tipo]: [...prevState[tipo], { id: "", description: "" }],
    }));
  };

  const removeChamado = (tipo: any, index: number) => {
    setFormState((prevState: any) => ({
      ...prevState,
      [tipo]: prevState[tipo].filter((_: any, idx: any) => idx !== index),
    }));
  };

  const handleChange = (event: any) => {
    const { name, value, type, checked } = event.target;
    const [tipo, index, campo] = name.split("-");

    if (type === "checkbox") {
      setFormState((prevState: any) => ({
        ...prevState,
        [campo]: checked,
      }));
    } else {
      setFormState((prevState: any) => ({
        ...prevState,
        [tipo]: prevState[tipo].map((item: any, idx: any) => {
          if (idx.toString() === index) {
            return { ...item, [campo]: value };
          }
          return item;
        }),
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
        ...formState,
        companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
        responsibleUserId: user?.userId,
        atribuidos: formState.atribuidos.map((chamado: any) => ({
          ...chamado,
        })),
        planejados: formState.planejados.map((chamado: any) => ({
          ...chamado,
        })),
        pendentes: formState.pendentes.map((chamado: any) => ({
          ...chamado,
        })),
      };

      const response = await apiClient().post("/shift-changes", payload);

      if (response.status === 200) {
        toast.success("Sucesso! Passagem de plantão salva com sucesso!");
      } else {
        toast.error("Falha ao salvar a passagem de plantão.");
      }
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const renderChamadoFields = (tipo: any) =>
    formState[tipo].map((chamado: any, index: any) => (
      <div key={index}>
        <S.Input
          name={`${tipo}-${index}-id`}
          value={chamado.id.split("-")[0]}
          onChange={handleChange}
          placeholder="ID"
        />
        <S.TextArea
          name={`${tipo}-${index}-description`}
          value={chamado.description}
          onChange={handleChange}
          placeholder="Descrição"
        />
        {index > 0 && (
          <S.IconButton
            type="button"
            onClick={() => removeChamado(tipo, index)}
          >
            <AiOutlineMinus />
          </S.IconButton>
        )}
      </div>
    ));

  const renderTicketSelect = (tipo: any) => (
    <select onChange={(e) => handleTicketSelect(e, tipo)} defaultValue="">
      <option value="" disabled>
        Selecione um Chamado
      </option>
      {tickets.map((ticket: any) => (
        <option key={ticket.id} value={ticket.id}>
          {ticket.description}
        </option>
      ))}
    </select>
  );

  const handleTicketSelect = (event: any, tipo: any) => {
    const selectedTicketId = event.target.value;
    const selectedTicket = tickets.find(
      (ticket: any) => ticket.id === selectedTicketId
    ) as any;

    if (selectedTicket) {
      setFormState((prevState: any) => ({
        ...prevState,
        [tipo]: [
          ...prevState[tipo],
          { id: selectedTicket.id, description: selectedTicket.description },
        ],
      }));
    }
  };

  return (
    <Layout>
      <S.Container>
        {shiftChanges?.map((shiftChange: any) => (
          <S.ShiftChangeListContainer key={shiftChange.id}>
            <S.CollapseHeader onClick={toggleCollapse}>
              {formatarData(shiftChange.date)} -{" "}
              {shiftChange.ResponsibleUser.name}
            </S.CollapseHeader>
            {!isCollapsed && (
              <>
                <S.Section>
                  <S.SectionTitle>Chamados Atribuídos</S.SectionTitle>
                  {shiftChange.ShiftChangeAssignedTicket.map(
                    (assignedTicket: any) => (
                      <S.ChamadoItem key={assignedTicket.ticketId}>
                        #{assignedTicket.Ticket.id.split("-")[0]} -{" "}
                        {assignedTicket.Ticket.description}
                      </S.ChamadoItem>
                    )
                  )}
                </S.Section>
                <S.Section>
                  <S.SectionTitle>Chamados Planejados</S.SectionTitle>
                  {shiftChange.ShiftChangePlannedTicket.map(
                    (plannedTicket: any) => (
                      <S.ChamadoItem key={plannedTicket.ticketId}>
                        #{plannedTicket.Ticket.id.split("-")[0]} -{" "}
                        {plannedTicket.Ticket.description}
                      </S.ChamadoItem>
                    )
                  )}
                </S.Section>
                <S.Section>
                  <S.SectionTitle>Chamados Pendentes</S.SectionTitle>
                  {shiftChange.ShiftChangePendingTicket.map(
                    (pendingTicket: any) => (
                      <S.ChamadoItem key={pendingTicket.ticketId}>
                        #{pendingTicket.Ticket.id.split("-")[0]} -{" "}
                        {pendingTicket.Ticket.description}
                      </S.ChamadoItem>
                    )
                  )}
                </S.Section>

                <S.Notas>
                  Controle de temperatura diário devidamente preenchido.
                </S.Notas>
              </>
            )}
          </S.ShiftChangeListContainer>
        ))}

        <S.Form>
          <h1>Nova Passagem de Plantão</h1>
          <S.FormGroup>
            <S.Label>Chamados Atribuídos:</S.Label>
            {renderTicketSelect("atribuidos")}
            {renderChamadoFields("atribuidos")}
            <S.IconButton
              type="button"
              onClick={() => addChamado("atribuidos")}
            >
              <AiOutlinePlus />
            </S.IconButton>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>Chamados Planejados:</S.Label>
            {renderTicketSelect("planejados")}
            {renderChamadoFields("planejados")}
            <S.IconButton
              type="button"
              onClick={() => addChamado("planejados")}
            >
              <AiOutlinePlus />
            </S.IconButton>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>Chamados Pendentes:</S.Label>
            {renderTicketSelect("pendentes")}
            {renderChamadoFields("pendentes")}
            <S.IconButton type="button" onClick={() => addChamado("pendentes")}>
              <AiOutlinePlus />
            </S.IconButton>
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>
              <S.Checkbox
                type="checkbox"
                name="controleTemperatura"
                checked={formState.controleTemperatura}
                onChange={handleChange}
              />
              Controle de Temperatura Preenchido
            </S.Label>
          </S.FormGroup>

          <S.Button type="button" onClick={handleSubmit}>
            Salvar Passagem de Plantão
          </S.Button>
        </S.Form>
      </S.Container>
    </Layout>
  );
};
