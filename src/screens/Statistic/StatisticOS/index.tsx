import { useState, useEffect } from "react";
import { Layout } from "../../../components/Layout";
import { apiClient } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import Select from "react-select";
import * as S from "./styles";

export function StatisticOS() {
  const { user } = useAuth();

  const [startDate, setStartDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().substring(0, 10)
  );
  const [reportData, setReportData] = useState({ openedOS: 0, closedOS: 0 });
  const [technicians, setTechnicians] = useState([]);
  const [selectedTech, setSelectedTech] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [tickets, setTickets] = useState([]);

  const getTechnicians = async () => {
    if (
      !user ||
      !user.companies ||
      !user.currentLoggedCompany.currentLoggedCompanyId
    ) {
      return;
    }

    try {
      setIsLoading(true);
      setError("");

      const { data } = await apiClient().get("/account/technicians", {
        params: {
          companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
        },
      });
      setTechnicians(data);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
      setError("Erro ao buscar técnicos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTechnicians();
  }, [user]);

  const fetchReport = async () => {
    if (!selectedTech) {
      toast.warning(`Você precisa selecionar um usuário para continuar.`);
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const { data } = await apiClient().get("/report/os", {
        userId: selectedTech,
        startDate,
        endDate,
      });

      setReportData(data);
      setTickets(data.tickets);
    } catch (err) {
      console.error(err);
      setError("Erro ao gerar relatório");
    } finally {
      setIsLoading(false);
    }
  };

  const techOptions = technicians
    ? technicians.map((user: any) => ({
        value: user.id,
        label: user.name,
      }))
    : [];

  return (
    <Layout>
      <S.Container>
        {isLoading && <S.Loading>Carregando...</S.Loading>}
        {error && <S.Error>{error}</S.Error>}
        <S.FormGroup>
          <S.Label>Usuário</S.Label>
          <Select
            options={techOptions}
            onChange={(e: any) => setSelectedTech(e.value)}
            isClearable={true}
            isLoading={isLoading}
          />
        </S.FormGroup>
        <S.FormGroup>
          <S.Label>Data de Início:</S.Label>
          <S.Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </S.FormGroup>
        <S.FormGroup>
          <S.Label>Data de Fim:</S.Label>
          <S.Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </S.FormGroup>
        <S.Button onClick={fetchReport} disabled={isLoading}>
          Gerar Relatório
        </S.Button>
        {reportData && (
          <S.ReportResult>
            <p>OS Abertas no período: {reportData.openedOS}</p>
            <p>OS Fechadas no período: {reportData.closedOS}</p>
          </S.ReportResult>
        )}

        {tickets.length > 0 && (
          <S.TableContainer>
            <S.Table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Created At</th>
                  <th>Closed At</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket: any) => (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>
                      {ticket.ticketCategory.name} -{" "}
                      {ticket.ticketCategory.childrenName}
                    </td>
                    <td>{ticket.description}</td>
                    <td>{ticket.status}</td>
                    <td>{new Date(ticket.createdAt).toLocaleString()}</td>
                    <td>
                      {ticket.closedAt
                        ? new Date(ticket.closedAt).toLocaleString()
                        : "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </S.Table>
          </S.TableContainer>
        )}
      </S.Container>
    </Layout>
  );
}
