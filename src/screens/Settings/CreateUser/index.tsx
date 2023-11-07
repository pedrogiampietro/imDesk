import { useState, useEffect } from "react";
import { Layout } from "../../../components/Layout";
import { LayoutForm } from "../../../components/LayoutForm";
import { apiClient } from "../../../services/api";

export function CreateUser() {
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState("");
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [companies, setCompanies] = useState([]);

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

  const pageTitle = "Criação de Usuário";

  const tableHeader = [
    {
      id: 1,
      name: "Nome",
    },
    {
      id: 2,
      name: "Endereço",
    },
    {
      id: 3,
      name: "E-mail",
    },
    {
      id: 4,
      name: "Ações",
    },
  ];

  const handleEdit = (provider: any) => handleViewOrEdit(provider, true);
  const handleView = (provider: any) => handleViewOrEdit(provider);
  const handleDelete = async (provider: any) => {
    console.log("Excluir fornecedor:", provider);

    try {
      const response = await apiClient().delete(
        `/providers/provider/${provider.id}`
      );

      setUsers((prevProviders: any) =>
        prevProviders.filter((p: any) => p.id !== provider.id)
      );
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
    }
  };

  const handleViewOrEdit = async (user: any, isEdit: boolean = false) => {
    try {
      const contractsResponse = await apiClient().get(
        `/providers/contract?providerId=${user.id}`
      );
      const servicesResponse = await apiClient().get(
        `/providers/service?providerId=${user.id}`
      );

      setSelectedUsers(user);
      setIsEditMode(isEdit);
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao buscar contratos e serviços:", error);
    }
  };

  const handleCreateNewUser = () => {
    // Aqui você pode adicionar a lógica para lidar com a criação do usuário
    setShowCreateCard(!showCreateCard);
  };

  const formFields = {
    title: "Criar Usuário",
    fields: [
      {
        label: "Nome de Usuário",
        type: "text",
        name: "username",
      },
      {
        label: "Nome",
        type: "text",
        name: "name",
      },
      {
        label: "Email",
        type: "email",
        name: "email",
      },
      {
        label: "Senha",
        type: "password",
        name: "password",
      },
      {
        label: "Telefone",
        type: "text",
        name: "phone",
      },
      {
        label: "Ramal",
        type: "text",
        name: "ramal",
      },
      {
        label: "Setor",
        type: "text",
        name: "sector",
      },
    ],
    checkboxes: [
      {
        label: "É Técnico?",
        type: "checkbox",
        name: "isTechnician",
      },
    ],
    button: {
      text: "Criar Usuário",
      loadingText: "Carregando...",
    },
  };

  return (
    <Layout>
      <LayoutForm
        formFields={formFields}
        formSelectOptions={companies}
        tableHeader={tableHeader}
        pageTitle={pageTitle}
        showCreateCard={showCreateCard}
        handleCreateNewUser={handleCreateNewUser}
      />
    </Layout>
  );
}
