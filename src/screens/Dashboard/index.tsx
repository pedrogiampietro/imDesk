import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { Card } from "../../components/Card";
import { ServiceCard } from "../../components/ServiceCard";
import { UnansweredTicketsCard } from "../../components/UnansweredTicketsCard";
import { apiClient } from "../../services/api";
import { LottieLoad } from "../../components/LottieLoading";
import { useAuth } from "../../hooks/useAuth";

import * as S from "./styles";

import { OnlineUsersWidget } from "../../components/OnlineUsersWidget";
import { Analytics } from "../../components/Analytics";
import { AnalyticsTicketsMonth } from "../../components/AnalyticsTicketsMonth";

export function Dashboard() {
  const { user } = useAuth();
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
    slaCounts: {
      high: 0,
      medium: 0,
      low: 0,
    },
    totalTickets: 0,
    deadlines: [],
    ticketClassification: [],
    ticketCategory: [],
    ticketLevel: {
      high: 0,
      medium: 0,
      low: 0,
    },
    ticketDuration: [],
    ticketLocation: [],
  });
  const [ticketsMonth, setTicketsMonth] = useState();

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
          closedTicketsCount: data.closedTicketsCount,
          dueDateService: {
            after: data.dueDateService.after,
            all: data.dueDateService.all,
            today: data.dueDateService.today,
            tomorrow: data.dueDateService.tomorrow,
          },
          slaCounts: data.slaCounts,
          totalTickets: data.totalTickets,
          deadlines: data.deadlines,
          ticketClassification: data.ticketClassification,
          ticketCategory: data.ticketCategory,
          ticketLevel: data.ticketLevel,
          ticketDuration: data.ticketDuration,
          ticketLocation: data.ticketLocation,
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

  useEffect(() => {
    async function fetchTicketsMonth() {
      try {
        setLoading(true);
        const { data } = await apiClient().get("/report/tickets-month");

        setTicketsMonth(data.body);
      } catch (err) {
        setLoading(false);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchTicketsMonth();
  }, []);

  return (
    <Layout>
      {loading ? (
        <LottieLoad />
      ) : (
        <>
          <S.Container>
            <S.Grid>
              <Analytics {...dashboardData} />

              <AnalyticsTicketsMonth data={ticketsMonth} />
            </S.Grid>

            <ServiceCard {...dashboardData.dueDateService} />
            <UnansweredTicketsCard
              all={dashboardData.recentTickets.length}
              my={dashboardData.priorityCounts.MY || 0}
            />
            <OnlineUsersWidget />
          </S.Container>
        </>
      )}
    </Layout>
  );
}
