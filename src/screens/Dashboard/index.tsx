import { Layout } from "../../components/Layout";
import { Card } from "../../components/Card";
import { ServiceCard } from "../../components/ServiceCard";
import * as S from "./styles";

export function Dashboard() {
  const chamadosNovos = 5;
  const chamadosAtrasados = 2;
  const chamadosAtribuidos = 10;
  const chamadosAtendidosHoje = 8;
  const chamadosFechadosHoje = 6;
  const chamadosAvaliadosHoje = 4;
  const ticketsSemResposta = 7;

  const vencimentosAtendimentos = {
    todos: 10,
    hoje: 3,
    amanha: 2,
    depois: 5,
  };

  return (
    <Layout>
      <h1>Dashboard</h1>
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
        <Card
          label="Chamados Atendidos Hoje"
          value={chamadosAtendidosHoje}
          color="#34A853"
        />
        <Card
          label="Chamados Fechados Hoje"
          value={chamadosFechadosHoje}
          color="#4285F4"
        />
        <Card
          label="Chamados Avaliados Hoje"
          value={chamadosAvaliadosHoje}
          color="#34A853"
        />

        <Card
          label="Tickets Sem Resposta"
          value={ticketsSemResposta}
          color="#FF5733"
        />
        <ServiceCard {...vencimentosAtendimentos} />
      </S.Container>
    </Layout>
  );
}
