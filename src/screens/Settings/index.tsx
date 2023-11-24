import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { apiClient } from "../../services/api";
import { CardButton } from "../../components/CardButton";

import { ProviderForm } from "../../components/Forms/ProviderForm";
import { CompanyForm } from "../../components/Forms/CompanyForm";
import { GroupForm } from "../../components/Forms/GroupForm";

import * as S from "./styles";

export function Settings() {
  const [companies, setCompanies] = useState([]);
  const [formType, setFormType] = useState<string>("");

  useEffect(() => {
    (async () => {
      try {
        const response = await apiClient().get("/companies");

        setCompanies(response.data.companies);
      } catch (err) {
        console.warn("err", err);
      }
    })();
  }, []);

  const renderForm = () => {
    switch (formType) {
      case "provider":
        return <ProviderForm companies={companies} />;
      case "company":
        return <CompanyForm companies={companies} />;
      case "group":
        return <GroupForm companies={companies} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <S.CardContainer>
        <CardButton
          label="Criar Fornecedor"
          onClick={() => setFormType("provider")}
        />
        <CardButton
          label="Criar Empresa"
          onClick={() => setFormType("company")}
        />
        <CardButton label="Criar Grupo" onClick={() => setFormType("group")} />
      </S.CardContainer>
      {renderForm()}
    </Layout>
  );
}
