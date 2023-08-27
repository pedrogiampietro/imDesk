import { Layout } from "../../components/Layout";
import { Card } from "../../components/Card";
import { ServiceCard } from "../../components/ServiceCard";
import { UnansweredTicketsCard } from "../../components/UnansweredTicketsCard";

import * as S from "./styles";

export function Dashboard() {
  const chamadosNovos = 5;
  const chamadosAtrasados = 2;
  const chamadosAtribuidos = 10;

  const ticketsSemResposta = {
    all: 7,
    my: 3,
  };

  const vencimentosAtendimentos = {
    all: 10,
    today: 3,
    tomorrow: 2,
    after: 5,
  };

  return (
    <Layout>
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
        <ServiceCard {...vencimentosAtendimentos} />
        <UnansweredTicketsCard
          all={ticketsSemResposta.all}
          my={ticketsSemResposta.my}
        />
      </S.Container>
    </Layout>
  );
}
