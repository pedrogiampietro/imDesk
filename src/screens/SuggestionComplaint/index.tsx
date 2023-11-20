import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { LayoutForm } from "../../components/LayoutForm";
import { apiClient } from "../../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

type SuggestionComplaint = {
  id: string;
  userId: string;
  companyId?: string;
  description: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  feedback?: string;
};

export function SuggestionComplaint() {
  const [suggestionsComplaints, setSuggestionsComplaints] = useState<
    SuggestionComplaint[]
  >([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const isMultiCompany = false;

  useEffect(() => {
    if (
      !user ||
      !user.companies ||
      !user.currentLoggedCompany.currentLoggedCompanyId
    ) {
      return;
    }

    const fetchSuggestionsComplaints = async () => {
      try {
        const response = await apiClient().get("/suggestion-complaint", {
          params: {
            companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
          },
        });
        setSuggestionsComplaints(response.data.body);
      } catch (error) {
        console.error(
          "Não foi possível buscar as sugestões e as reclamações.",
          error
        );
      }
    };

    fetchSuggestionsComplaints();
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

  const pageTitle = "Sugestões e Reclamações";

  const tableHeader = [
    {
      id: 1,
      name: "Descrição",
    },
    {
      id: 2,
      name: "Categoria",
    },
    {
      id: 3,
      name: "Status",
    },
    {
      id: 4,
      name: "Criado em",
    },
    {
      id: 5,
      name: "Atualizado em",
    },
    {
      id: 6,
      name: "Resolvido em",
    },
    {
      id: 7,
      name: "Ações",
    },
  ];

  const headerToDataKeyMap = {
    Descrição: "description",
    Categoria: "category",
    Status: "status",
    "Criado em": "createdAt",
    "Atualizado em": "updatedAt",
    "Resolvido em": "resolvedAt",
  };

  const formFields = {
    title: "Criar Sugestão/Reclamação",
    fields: [
      {
        label: "Descrição",
        type: "text",
        name: "description",
      },
      {
        label: "Categoria",
        type: "select",
        name: "category",
        options: ["Serviço", "Produto", "Atendimento"],
      },
      {
        label: "Status",
        type: "select",
        name: "status",
        options: ["new", "pending", "planned", "closed"],
      },
      {
        label: "Data de Resolução",
        type: "date",
        name: "resolvedAt",
        visible: isEditMode,
      },
      {
        label: "Feedback",
        type: "text",
        name: "feedback",
        visible: isEditMode,
      },
    ],
    checkboxes: [],
    button: {
      text: "Criar Sugestão/Reclamação",
      saveText: "Salvar",
      loadingText: "Carregando...",
    },
  };

  const handleEdit = async (suggestionComplaintId: string) => {
    setShowCreateCard(true);
    setIsEditMode(true);

    try {
      const response = await apiClient().get(
        `/suggestion-complaint/${suggestionComplaintId}`
      );

      setIsEditMode(response.data.body);
    } catch (error) {
      console.error("Erro ao editar sugestão/reclamação:", error);
    }
  };

  const handleView = (suggestionComplaint: SuggestionComplaint) => {
    console.log("Sugestão/Reclamação", suggestionComplaint);
  };

  const handleDelete = async (suggestionComplaintId: string) => {
    try {
      await apiClient().delete(
        `/suggestion-complaint/${suggestionComplaintId}`
      );
      setSuggestionsComplaints((prev) =>
        prev.filter((sc) => sc.id !== suggestionComplaintId)
      );
    } catch (error) {
      console.error("Erro ao excluir sugestão/reclamação:", error);
    }
  };

  const handleShowCreateModal = () => {
    setShowCreateCard(!showCreateCard);
  };

  const handleCreate = async (formData: any) => {
    let method: "post" | "patch" = isEditMode ? "patch" : "post";
    let url = isEditMode
      ? `/suggestion-complaint/${formData.id}`
      : "/suggestion-complaint";
    let successMessage = isEditMode
      ? "Sugestão/Reclamação atualizada com sucesso!"
      : "Sugestão/Reclamação criada com sucesso!";

    setLoading(true);

    const dataToSend = {
      ...formData,
      userId: user?.userId,
    };

    try {
      const response = await apiClient()[method](url, dataToSend);
      toast.success(successMessage);
      // Atualize o estado conforme necessário
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      toast.error(err.response.data);
      console.warn("Erro:", err);
    }
  };

  return (
    <Layout>
      <LayoutForm
        data={suggestionsComplaints}
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
