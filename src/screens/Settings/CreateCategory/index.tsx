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

export function CreateCategory() {
  const [categorys, setCategorys] = useState<Type[]>([]);
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

    const fetchCategory = async () => {
      try {
        const { data } = await apiClient().get("/ticket-category", {
          params: {
            companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
          },
        });

        const formattedCategories = data.body.map((category: any) => {
          return {
            ...category,
            options: category.options.map((option: any) => ({
              id: option.id,
              name: option.label,
              childrenName: option.value,
            })),
          };
        });

        setCategorys(formattedCategories);
      } catch (error) {
        console.error("Error fetching priority", error);
      }
    };

    fetchCategory();
  }, [user]);

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

  const pageTitle = "Criação de Categoria";

  const tableHeader = [
    {
      id: 1,
      name: "Nome",
    },
    {
      id: 2,
      name: "Sub-Categoria",
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
    Nome: "label",
    "Sub-Categoria": "childrenName",
    "Criado em": "createdAt",
  };

  const formFields = {
    title: "Criar Categoria",
    fields: [
      {
        label: "Nome da Categoria",
        type: "text",
        name: "name",
      },
      {
        label: "Sub-Categoria",
        type: "text",
        name: "childrenName",
      },
    ],
    checkboxes: [],
    button: {
      text: "Criar Categoria",
      saveText: "Salvar Categoria",
      loadingText: "Carregando...",
    },
  };

  const handleEdit = async (priorityId: any) => {
    setShowCreateCard(true);

    try {
      const response = await apiClient().get(`/ticket-category/find-by-id`, {
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

      setCategorys((prevCategory: any) =>
        prevCategory.filter((p: any) => p.id !== priority.id)
      );
    } catch (error) {
      console.error("Erro ao excluir uma Categoria:", error);
    }
  };

  const handleShowCreateModal = () => {
    setShowCreateCard(!showCreateCard);
  };

  const handleCreate = async (formData: any) => {
    let method: "post" | "patch" = "post";
    let url = "/ticket-category";
    let successMessage = "Sucesso! Sua Categoria foi criada com sucesso!";

    if (isEditMode) {
      method = "patch";
      url = `/ticket-category/update-category/${formData.id}`;
      successMessage = "Sucesso! Sua Categoria foi atualizada com sucesso!";
    }

    setLoading(true);

    const adjustedObject = {
      name: formData.name,
      childrenName: formData.childrenName,
      companyIds: formData?.company?.map((c: any) => c.id),
    };

    try {
      const response = await apiClient()[method](url, adjustedObject);

      console.log("response", response);

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
        const updatedData = response.data.body;
        setCategorys((prevCategory) => {
          return prevCategory.map((category: any) => {
            const isUpdateNeeded = category.options.some(
              (option: any) => option.id === updatedData.id
            );

            if (isUpdateNeeded) {
              return {
                ...category,
                options: category.options.map((option: any) => {
                  if (option.id === updatedData.id) {
                    return {
                      ...option,
                      name: updatedData.name,
                      childrenName: updatedData.childrenName,
                    };
                  }
                  return option;
                }),
              };
            }
            return category;
          });
        });
      } else {
        setCategorys((prevCategory) => [...prevCategory, response.data.body]);
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
        data={categorys}
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
