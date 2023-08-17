import { Layout } from "../../components/Layout";

import { Card } from "../../components/Card";
import * as S from "./styles";

export function Dashboard() {
  const chamadosNovos = 5;
  const chamadosAtrasados = 2;
  const chamadosAtribuidos = 10;

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
      </S.Container>
    </Layout>
  );
}
