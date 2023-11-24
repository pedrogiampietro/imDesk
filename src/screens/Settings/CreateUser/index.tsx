import { useState, useEffect } from "react";
import { Layout } from "../../../components/Layout";
import { LayoutForm } from "../../../components/LayoutForm";
import { apiClient } from "../../../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";

type User = {
  id: string;
  username: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  ramal: string;
  sector: string;
  currentLoggedCompanyId: string | null;
  currentLoggedCompanyName: string | null;
  isTechnician: boolean;
  createdAt: string;
  updatedAt: string;
  avatarUrl: string | null;
  hourlyRate: string | null;
  groupId: string | null;
  signatureUrl: string | null;
};

export function CreateUser() {
  const [users, setUsers] = useState<User[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();
  const isMultiCompany = true;

  useEffect(() => {
    if (
      !user ||
      !user.companies ||
      !user.currentLoggedCompany.currentLoggedCompanyId
    ) {
      return;
    }

    const fetchUsers = async () => {
      try {
        const response = await apiClient().get("/account/users", {
          params: {
            companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Não foi possível buscar os usuários", error);
      }
    };

    fetchUsers();
  }, []);

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
      name: "E-mail",
    },
    {
      id: 3,
      name: "Criado em",
    },
    {
      id: 4,
      name: "Ações",
    },
  ];

  const headerToDataKeyMap = {
    Nome: "name",
    "E-mail": "email",
    "Criado em": "createdAt",
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
      saveText: "Salvar Usuário",
      loadingText: "Carregando...",
    },
  };

  const handleEdit = async (user: any) => {
    setShowCreateCard(true);

    try {
      const response = await apiClient().get(`/account/user`, {
        params: {
          id: user,
        },
      });

      setIsEditMode(response.data);
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
    }
  };

  const handleView = (user: any) => {
    console.log("user", user);
  };

  const handleDelete = async (user: any) => {
    console.log("Excluir fornecedor:", user);

    try {
      const response = await apiClient().delete(
        `/providers/provider/${user.id}`
      );

      setUsers((prevProviders: any) =>
        prevProviders.filter((p: any) => p.id !== user.id)
      );
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
    }
  };

  const handleShowCreateModal = () => {
    setShowCreateCard(!showCreateCard);
  };

  const handleCreate = async (formData: any) => {
    let method: "post" | "patch" = "post";
    let url = "/authenticate/sign-up";
    let successMessage = "Sucesso! Seu usuário foi criado com sucesso!";

    if (isEditMode) {
      method = "patch";
      url = `/account/update-user/${formData.id}`;
      successMessage = "Sucesso! Seu usuário foi atualizado com sucesso!";
    }

    setLoading(true);

    const adjustedObject = {
      username: formData.username,
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone: formData.phone,
      ramal: formData.ramal,
      sector: formData.sector,
      isTechnician: formData.isTechnician,
      companyIds: formData?.company?.map((c: any) => c.id),
    };

    try {
      const response = await apiClient()[method](url, adjustedObject);

      toast.success(successMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      if (isEditMode) {
        setUsers((prevUsers) => {
          return prevUsers.map((user) => {
            if (user.id === formData.id) {
              return { ...user, ...response.data.body };
            }
            return user;
          });
        });
      } else {
        setUsers((prevUsers) => [...prevUsers, response.data.body]);
      }

      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      toast.error(err.response.data, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.warn("err", err);
    }
  };

  return (
    <Layout>
      <LayoutForm
        data={users}
        formFields={formFields}
        headerToDataKeyMap={headerToDataKeyMap}
        formSelectOptions={companies}
        tableHeader={tableHeader}
        pageTitle={pageTitle}
        showCreateCard={showCreateCard}
        handleShowCreateModal={handleShowCreateModal}
        handleCreate={handleCreate}
        handleView={handleView}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
        isEditMode={isEditMode}
        isMultiCompany={isMultiCompany}
      />
    </Layout>
  );
}
