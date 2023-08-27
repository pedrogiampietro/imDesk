import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { apiClient } from "../../services/api";
import { CardButton } from "../../components/CardButton";

import { UserForm } from "../../components/Forms/UserForm";
import { LocationForm } from "../../components/Forms/LocationForm";
import { PriorityForm } from "../../components/Forms/PriorityForm";
import { CategoryForm } from "../../components/Forms/CategoryForm";
import { TypeForm } from "../../components/Forms/TypeForm";
import { ProviderForm } from "../../components/Forms/ProviderForm";
import { CompanyForm } from "../../components/Forms/CompanyForm";

import * as S from "./styles";

export function Settings() {
  const [name, setName] = useState("");
  const [companies, setCompanies] = useState([]);
  const [childrenName, setChildrenName] = useState("");
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
      case "user":
        return <UserForm companies={companies} />;
      case "location":
        return <LocationForm companies={companies} />;
      case "priority":
        return <PriorityForm companies={companies} />;
      case "type":
        return <TypeForm companies={companies} />;
      case "category":
        return <CategoryForm companies={companies} />;
      case "provider":
        return <ProviderForm companies={companies} />;
      case "company":
        return <CompanyForm companies={companies} />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <S.CardContainer>
        <CardButton label="Criar Usuário" onClick={() => setFormType("user")} />
        <CardButton
          label="Criar Localização"
          onClick={() => setFormType("location")}
        />
        <CardButton
          label="Criar Prioridade"
          onClick={() => setFormType("priority")}
        />
        <CardButton label="Criar Tipo" onClick={() => setFormType("type")} />
        <CardButton
          label="Criar Categoria"
          onClick={() => setFormType("category")}
        />
        <CardButton
          label="Criar Fornecedor"
          onClick={() => setFormType("provider")}
        />
        <CardButton
          label="Criar Empresa"
          onClick={() => setFormType("company")}
        />
      </S.CardContainer>
      {renderForm()}
    </Layout>
  );
}
