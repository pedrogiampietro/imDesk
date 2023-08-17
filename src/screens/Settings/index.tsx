import { useState } from "react";
import { Layout } from "../../components/Layout";
import { apiClient } from "../../services/api";
import { CardButton } from "../../components/CardButton";

import { UserForm } from "../../components/Forms/UserForm";
import { LocationForm } from "../../components/Forms/LocationForm";
import { PriorityForm } from "../../components/Forms/PriorityForm";
import { CategoryForm } from "../../components/Forms/CategoryForm";
import { TypeForm } from "../../components/Forms/TypeForm";

import * as S from "./styles";

export function Settings() {
  const [name, setName] = useState("");
  const [childrenName, setChildrenName] = useState("");
  const [formType, setFormType] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Exemplo de requisição para a rota de criação de categorias de chamados
    try {
      const response = await apiClient().post(`/ticket-category`, {
        name,
        childrenName,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Erro ao criar categoria de chamado:", error);
    }
  };

  const renderForm = () => {
    switch (formType) {
      case "user":
        return <UserForm />;
      case "location":
        return <LocationForm />;
      case "priority":
        return <PriorityForm />;
      case "type":
        return <TypeForm />;
      case "category":
        return <CategoryForm />;
      default:
        return null;
    }
  };

  return (
    <Layout>
      <h2>Criar Categoria de Chamado</h2>

      <h2>Configurações</h2>
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
      </S.CardContainer>
      {renderForm()}
    </Layout>
  );
}
