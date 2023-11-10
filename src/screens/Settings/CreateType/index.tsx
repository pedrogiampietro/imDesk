import { useState, useEffect } from "react";
import { Layout } from "../../../components/Layout";
import { LayoutForm } from "../../../components/LayoutForm";
import { apiClient } from "../../../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";

type Type = {
  id: string;
  name: string;
};

export function CreateType() {
  const [types, setTypes] = useState<Type[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    if (
      !user ||
      !user.companies ||
      !user.currentLoggedCompany.currentLoggedCompanyId
    ) {
      return;
    }

    const fetchType = async () => {
      try {
        const { data } = await apiClient().get("/ticket-type", {
          params: {
            companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
          },
        });

        setTypes(data.body);
      } catch (error) {
        console.error("Error fetching priority", error);
      }
    };

    fetchType();
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

  const pageTitle = "Criação de Tipo";

  const tableHeader = [
    {
      id: 1,
      name: "Nome",
    },
    {
      id: 2,
      name: "Criado em",
    },
    {
      id: 3,
      name: "Ações",
    },
  ];

  const headerToDataKeyMap = {
    Nome: "name",
    "E-mail": "email",
    "Criado em": "createdAt",
  };

  const formFields = {
    title: "Criar Tipo",
    fields: [
      {
        label: "Nome da Tipo",
        type: "text",
        name: "name",
      },
    ],
    checkboxes: [],
    button: {
      text: "Criar Tipo",
      saveText: "Salvar Tipo",
      loadingText: "Carregando...",
    },
  };

  const handleEdit = async (priorityId: any) => {
    setShowCreateCard(true);

    try {
      const response = await apiClient().get(`/ticket-type/find-by-id`, {
        params: {
          id: priorityId,
        },
      });

      setIsEditMode(response.data.body);
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
    }
  };

  const handleView = (priorityId: any) => {
    console.log("user", priorityId);
  };

  const handleDelete = async (priority: any) => {
    console.log("Excluir fornecedor:", priority);

    try {
      const response = await apiClient().delete(
        `/providers/provider/${priority.id}`
      );

      setTypes((prevTypes: any) =>
        prevTypes.filter((p: any) => p.id !== priority.id)
      );
    } catch (error) {
      console.error("Erro ao excluir uma Tipo:", error);
    }
  };

  const handleShowCreateModal = () => {
    setShowCreateCard(!showCreateCard);
  };

  const handleCreate = async (formData: any) => {
    let method: "post" | "patch" = "post";
    let url = "/ticket-type";
    let successMessage = "Sucesso! Sua Tipo foi criada com sucesso!";

    if (isEditMode) {
      method = "patch";
      url = `/ticket-type/update-type/${formData.id}`;
      successMessage = "Sucesso! Sua Tipo foi atualizada com sucesso!";
    }

    setLoading(true);

    const adjustedObject = {
      name: formData.name,
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
        setTypes((prevTypes) => {
          return prevTypes.map((user) => {
            if (user.id === formData.id) {
              return { ...user, ...response.data.body };
            }
            return user;
          });
        });
      } else {
        setTypes((prevTypes) => [...prevTypes, response.data.body]);
      }

      setShowCreateCard(false);
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
        data={types}
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
      />
    </Layout>
  );
}
