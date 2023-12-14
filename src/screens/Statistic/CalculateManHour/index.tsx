import { useState, useEffect } from "react";
import { Layout } from "../../../components/Layout";
import { apiClient } from "../../../services/api";
import { useAuth } from "../../../hooks/useAuth";
import { toast } from "react-toastify";
import { ExportDropdown } from "../../../components/ExportDropdown";

import Select from "react-select";
import * as S from "./styles";

export function CalculateManHour() {
  const { user } = useAuth();

  const [technicians, setTechnicians] = useState([]);
  const [selectedTech, setSelectedTech] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [manHourReport, setManHourReport] = useState([]);
  const [salaryReport, setSalaryReport] = useState([]);
  const [realEarningsReport, setRealEarningsReport] = useState([]);

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

  const fetchData = async () => {
    if (!user) return;

    try {
      setIsLoading(true);
      setError("");

      const manHourReportPromise = apiClient().get(
        "/report/calculate-man-hour",
        {
          params: {
            userId: selectedTech,
          },
        }
      );

      const salaryReportPromise = apiClient().get("/report/calculate-salary", {
        params: {
          userId: selectedTech,
        },
      });

      const realEarningsReportPromise = apiClient().get(
        "/report/calculate-real-earnings",
        {
          params: {
            userId: selectedTech,
          },
        }
      );

      const [manHourReportData, salaryReportData, realEarningsReportData] =
        await Promise.all([
          manHourReportPromise,
          salaryReportPromise,
          realEarningsReportPromise,
        ]);

      // Set man hour report data in state
      setManHourReport(manHourReportData.data);

      // Set salary report data in state
      setSalaryReport(salaryReportData.data);

      // Set real earnings report data in state
      setRealEarningsReport(realEarningsReportData.data);

      // Exiba os dados dos relatórios de salary e real earnings conforme necessário
    } catch (err) {
      console.error(err);
      setError("Erro ao buscar dados");
    } finally {
      setIsLoading(false);
    }
  };

  // const fetchReport = async () => {
  //   if (!selectedTech) {
  //     toast.warning(`Você precisa selecionar um usuário para continuar.`);
  //     return;
  //   }
  //   setIsLoading(true);
  //   setError("");
  //   try {
  //     const { data } = await apiClient().get("/report/calculate-man-hour", {
  //       params: {
  //         userId: selectedTech,
  //       },
  //     });

  //     setReportData(data);
  //     setTickets(data.tickets);
  //   } catch (err) {
  //     console.error(err);
  //     setError("Erro ao gerar relatório");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const techOptions = technicians
    ? technicians.map((user: any) => ({
        value: user.id,
        label: user.name,
      }))
    : [];

  const exportReport = async (format: any) => {
    try {
      setIsLoading(true);

      const response = await apiClient().get(`/report/os/export`, {
        params: {
          userId: selectedTech,
          format,
        },
        responseType: "blob", // Importante para arquivos
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a") as any;
      link.href = url;
      link.setAttribute("download", `report.${format}`); // Nome do arquivo com extensão
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (err) {
      console.error(err);
      setError("Erro ao exportar relatório");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = (format: any) => {
    exportReport(format);
  };

  return (
    <Layout>
      <S.Container>
        {isLoading && <S.Loading>Carregando...</S.Loading>}
        {error && <S.Error>{error}</S.Error>}

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <ExportDropdown onExport={handleExport} />
        </div>
        <S.FormGroup>
          <S.Label>Usuário</S.Label>
          <Select
            options={techOptions}
            onChange={(e: any) => setSelectedTech(e.value)}
            isClearable={true}
            isLoading={isLoading}
          />
        </S.FormGroup>

        <S.Button onClick={fetchData} disabled={isLoading}>
          Gerar Relatório
        </S.Button>

        <div>
          <S.ReportSection>
            <S.ReportTitle>
              Relatório de Desempenho e Custo do Trabalho do Usuário{" "}
              <S.TooltipContainer>
                <S.TooltipIcon />
                <S.Tooltip>
                  /* **Ele busca todos os tickets que foram atribuídos a esse
                  usuário e que foram fechados. **Para cada ticket, ele calcula
                  a diferença de tempo entre o momento em que o ticket foi
                  atribuído ao usuário e o momento em que o ticket foi fechado.
                  Essa diferença de tempo (em horas) é adicionada ao total de
                  horas trabalhadas. **Se o usuário tiver uma taxa horária
                  definida, o código calcula o custo total das horas trabalhadas
                  multiplicando as horas trabalhadas pela taxa horária do
                  usuário. **Finalmente, ele retorna as horas trabalhadas, a
                  taxa horária e o custo total como resposta à solicitação.
                  **Note que este código pressupõe que a taxa horária do usuário
                  é dada por mês, e por isso divide a taxa horária por 160
                  (assumindo um mês de trabalho de 40 horas por semana). */
                </S.Tooltip>
              </S.TooltipContainer>{" "}
            </S.ReportTitle>
            <S.ReportTable>
              <thead>
                <tr>
                  <S.ReportTableHeader>
                    Total de Horas Trabalhadas
                  </S.ReportTableHeader>
                  <S.ReportTableHeader>Valor por Hora</S.ReportTableHeader>
                  <S.ReportTableHeader>Custo Total</S.ReportTableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <S.ReportTableData>
                    {manHourReport.totalManHours}
                  </S.ReportTableData>
                  <S.ReportTableData>
                    {manHourReport?.hourlyRate?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </S.ReportTableData>
                  <S.ReportTableData>
                    {manHourReport?.totalCost?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </S.ReportTableData>
                </tr>
              </tbody>
            </S.ReportTable>
          </S.ReportSection>

          {/* Salary Report Section */}
          <S.ReportSection>
            <S.ReportTitle>Relatório de Salário</S.ReportTitle>
            <S.ReportTable>
              <thead>
                <tr>
                  <S.ReportTableHeader>Valor por Hora</S.ReportTableHeader>
                  <S.ReportTableHeader>Ganhos Diários</S.ReportTableHeader>
                  <S.ReportTableHeader>Ganhos Mensais</S.ReportTableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <S.ReportTableData>
                    {salaryReport?.hourlyRate?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </S.ReportTableData>
                  <S.ReportTableData>
                    {salaryReport?.dailyEarnings?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </S.ReportTableData>
                  <S.ReportTableData>
                    {salaryReport?.monthlyEarnings?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </S.ReportTableData>
                </tr>
              </tbody>
            </S.ReportTable>
          </S.ReportSection>

          {/* Real Earnings Report Section */}
          <S.ReportSection>
            <S.ReportTitle>
              Relatório de Ganhos Reais{" "}
              <S.TooltipContainer>
                <S.TooltipIcon />
                <S.Tooltip>
                  /* **A diferença nos valores da hora entre os relatórios se
                  deve à maneira como o valor da hora é calculado em cada caso.
                  **No primeiro relatório (“Relatório de Desempenho e Custo do
                  Trabalho do Usuário”), o valor da hora é calculado com base no
                  custo total e no total de horas trabalhadas. Isso significa
                  que o valor da hora neste relatório é o custo por hora de
                  trabalho para a empresa. **No último relatório (“Relatório de
                  Ganhos Reais”), o valor da hora é calculado dividindo o
                  salário mensal do usuário pelo total de horas trabalhadas por
                  mês. Isso significa que o valor da hora neste relatório é o
                  quanto o usuário ganha por hora de trabalho. **Portanto, mesmo
                  que o salário mensal seja o mesmo, o valor da hora pode variar
                  dependendo de como é calculado. No primeiro caso, o valor da
                  hora é uma medida do custo para a empresa, enquanto no último
                  caso, o valor da hora é uma medida dos ganhos do usuário. */
                </S.Tooltip>
              </S.TooltipContainer>{" "}
            </S.ReportTitle>
            <S.ReportTable>
              <thead>
                <tr>
                  <S.ReportTableHeader>Valor por Hora</S.ReportTableHeader>
                  <S.ReportTableHeader>
                    Total de Horas Trabalhadas
                  </S.ReportTableHeader>
                  <S.ReportTableHeader>Ganhos Reais</S.ReportTableHeader>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <S.ReportTableData>
                    {realEarningsReport?.hourlyRate?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </S.ReportTableData>
                  <S.ReportTableData>
                    {realEarningsReport?.totalManHours}
                  </S.ReportTableData>
                  <S.ReportTableData>
                    {realEarningsReport?.realEarnings?.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </S.ReportTableData>
                </tr>
              </tbody>
            </S.ReportTable>
          </S.ReportSection>
        </div>
      </S.Container>
    </Layout>
  );
}
