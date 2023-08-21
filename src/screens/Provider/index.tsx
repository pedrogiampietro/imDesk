import { Layout } from "../../components/Layout";

import { useAuth } from "../../hooks/useAuth";

import * as S from "./styles";

export function Provider() {
  const { user } = useAuth();

  return (
    <Layout>
      <h1>Fornecedores</h1>

      <S.CardContainer>
        <h1>Card</h1>
      </S.CardContainer>
    </Layout>
  );
}
