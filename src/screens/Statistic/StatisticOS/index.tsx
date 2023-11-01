import { useState, useEffect } from "react";
import { Layout } from "../../../components/Layout";
import { apiClient } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";
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

  const getTechnicians = async () => {
    if (
      !user ||
      !user.companies ||
      !user.currentLoggedCompany.currentLoggedCompanyId
    ) {
      return;
    }

    try {
      const { data } = await apiClient().get("/account/technicians", {
        params: {
          companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
        },
      });
      setTechnicians(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTechnicians();
  }, [user]);

  async function fetchReport() {
    const { data } = await apiClient().post("/report/os", {
      userId: selectedTech,
      startDate,
      endDate,
    });

    setReportData(data);
  }

  const techOptions = technicians
    ? technicians.map((user: any) => ({
        value: user.id,
        label: user.name,
      }))
    : [];

  return (
    <Layout>
      <S.Container>
        <S.InputGroup>
          <S.InputLabel>Usuário</S.InputLabel>
          <Select
            options={techOptions}
            onChange={(e: any) => setSelectedTech(e.value)}
          />
        </S.InputGroup>
        <label>
          Data de Início:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          Data de Fim:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>
        <button onClick={fetchReport}>Gerar Relatório</button>
        <div>
          <p>OS Abertas no período: {reportData.openedOS}</p>
          <p>OS Fechadas no período: {reportData.closedOS}</p>
        </div>
      </S.Container>
    </Layout>
  );
}
