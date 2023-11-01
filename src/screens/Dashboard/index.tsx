import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { Card } from "../../components/Card";
import { ServiceCard } from "../../components/ServiceCard";
import { UnansweredTicketsCard } from "../../components/UnansweredTicketsCard";
import { apiClient } from "../../services/api";
import { LottieLoad } from "../../components/LottieLoading";

import * as S from "./styles";

export function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState<any | null>({
    categoryCounts: [],
    priorityCounts: [],
    recentTickets: [],
    statusCounts: [],
    newTicketsCount: 0,
    lateTicketsCount: 0,
    assignedTicketsCount: 0,
    dueDateService: {
      after: 0,
      all: 1,
      today: 0,
      tomorrow: 0,
    },
  });

  useEffect(() => {
    async function fetchReportDashboard() {
      try {
        setLoading(true);
        const { data } = await apiClient().get("/report/dashboard");

        setDashboardData({
          categoryCounts: data.categoryCounts,
          priorityCounts: data.priorityCounts,
          recentTickets: data.recentTickets,
          statusCounts: data.statusCounts,
          newTicketsCount: data.newTicketsCount,
          lateTicketsCount: data.lateTicketsCount,
          assignedTicketsCount: data.assignedTicketsCount,
          dueDateService: {
            after: data.dueDateService.after,
            all: data.dueDateService.all,
            today: data.dueDateService.today,
            tomorrow: data.dueDateService.tomorrow,
          },
        });
      } catch (err) {
        setLoading(false);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchReportDashboard();
  }, []);

  const chamadosNovos =
    dashboardData.statusCounts.find((item: any) => item.status === "new")
      ?._count || 0;
  const chamadosAtrasados = dashboardData.lateTicketsCount;
  const chamadosAtribuidos =
    dashboardData.statusCounts.find((item: any) => item.status === "assigned")
      ?._count || 0;

  const ticketsSemResposta = {
    all: dashboardData.recentTickets.length,
    my: dashboardData.priorityCounts.MY || 0,
  };

  return (
    <Layout>
      {loading ? (
        <LottieLoad />
      ) : (
        <S.Container>
          <Card label="Chamados Novos" value={chamadosNovos} color="#34A853" />
          <Card
            label="Chamados Atrasados"
            value={chamadosAtrasados}
            color="#FF5733"
          />
          <Card
            label="Chamados Atribuídos"
            value={chamadosAtribuidos}
            color="#4285F4"
          />
          <ServiceCard {...dashboardData.dueDateService} />
          <UnansweredTicketsCard
            all={ticketsSemResposta.all}
            my={ticketsSemResposta.my}
          />
        </S.Container>
      )}
    </Layout>
  );
}
