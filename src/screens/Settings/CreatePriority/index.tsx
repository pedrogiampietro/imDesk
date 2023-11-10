import { useState, useEffect } from "react";
import { Layout } from "../../../components/Layout";
import { LayoutForm } from "../../../components/LayoutForm";
import { apiClient } from "../../../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";

type Priority = {
  id: string;
  name: string;
};

export function CreatePriority() {
  const [prioritys, setPrioritys] = useState<Priority[]>([]);
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

    const fetchPriority = async () => {
      try {
        const { data } = await apiClient().get("/ticket-priority", {
          params: {
            companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
          },
        });

        setPrioritys(data.body);
      } catch (error) {
        console.error("Error fetching priority", error);
      }
    };

    fetchPriority();
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

  const pageTitle = "Criação de Prioridade";

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
    title: "Criar Prioridade",
    fields: [
      {
        label: "Nome da Prioridade",
        type: "text",
        name: "name",
      },
    ],
    checkboxes: [],
    button: {
      text: "Criar Prioridade",
      saveText: "Salvar Prioridade",
      loadingText: "Carregando...",
    },
  };

  const handleEdit = async (priorityId: any) => {
    setShowCreateCard(true);

    try {
      const response = await apiClient().get(`/ticket-priority/find-by-id`, {
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

      setPrioritys((prevPriority: any) =>
        prevPriority.filter((p: any) => p.id !== priority.id)
      );
    } catch (error) {
      console.error("Erro ao excluir uma prioridade:", error);
    }
  };

  const handleShowCreateModal = () => {
    setShowCreateCard(!showCreateCard);
  };

  const handleCreate = async (formData: any) => {
    let method: "post" | "patch" = "post";
    let url = "/ticket-priority";
    let successMessage = "Sucesso! Sua prioridade foi criada com sucesso!";

    if (isEditMode) {
      method = "patch";
      url = `/ticket-priority/update-priority/${formData.id}`;
      successMessage = "Sucesso! Sua prioridade foi atualizada com sucesso!";
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
        setPrioritys((prevPriority) => {
          return prevPriority.map((user) => {
            if (user.id === formData.id) {
              return { ...user, ...response.data.body };
            }
            return user;
          });
        });
      } else {
        setPrioritys((prevPriority) => [...prevPriority, response.data.body]);
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
        data={prioritys}
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
