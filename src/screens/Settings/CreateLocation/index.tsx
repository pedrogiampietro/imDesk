import { useState, useEffect } from "react";
import { Layout } from "../../../components/Layout";
import { LayoutForm } from "../../../components/LayoutForm";
import { apiClient } from "../../../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";
import { useDebounce } from "../../../hooks/useDebounce";

type Location = {
  id: string;
  name: string;
};

export function CreateLocation() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const { user } = useAuth();
  const isMultiCompany = true;

  const fetchLocations = async () => {
    try {
      const { data, headers } = await apiClient().get("/location", {
        params: {
          companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
          page,
          limit: perPage,
          searchTerm,
        },
      });

      setTotalCount(headers["x-total-count"]);
      setLocations(data.body);
    } catch (error) {
      console.error("Error fetching locations", error);
    }
  };

  useEffect(() => {
    if (
      !user ||
      !user.companies ||
      !user.currentLoggedCompany.currentLoggedCompanyId
    ) {
      return;
    }

    fetchLocations();
  }, [user, perPage, page]);

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

  useDebounce(searchTerm, 500, fetchLocations);

  const pageTitle = "Criação de Localização";

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
    title: "Criar Localização",
    fields: [
      {
        label: "Nome da Localização",
        type: "text",
        name: "name",
      },
    ],
    checkboxes: [],
    button: {
      text: "Criar Localização",
      saveText: "Salvar Localização",
      loadingText: "Carregando...",
    },
  };

  const handleEdit = async (locationId: any) => {
    setShowCreateCard(true);

    try {
      const response = await apiClient().get(`/location/find-by-id`, {
        params: {
          id: locationId,
        },
      });

      setIsEditMode(response.data.body);
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
    }
  };

  const handleView = (locationId: any) => {
    console.log("user", locationId);
  };

  const handleDelete = async (location: any) => {
    console.log("Excluir fornecedor:", location);

    try {
      const response = await apiClient().delete(
        `/providers/provider/${location.id}`
      );

      setLocations((prevLocations: any) =>
        prevLocations.filter((p: any) => p.id !== location.id)
      );
    } catch (error) {
      console.error("Erro ao excluir uma localização:", error);
    }
  };

  const handleShowCreateModal = () => {
    setShowCreateCard(!showCreateCard);
  };

  const handleCreate = async (formData: any) => {
    let method: "post" | "patch" = "post";
    let url = "/location";
    let successMessage = "Sucesso! Sua localização foi criada com sucesso!";

    if (isEditMode) {
      method = "patch";
      url = `/location/update-location/${formData.id}`;
      successMessage = "Sucesso! Sua localização foi atualizada com sucesso!";
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
        setLocations((prevLocations) => {
          return prevLocations.map((user) => {
            if (user.id === formData.id) {
              return { ...user, ...response.data.body };
            }
            return user;
          });
        });
      } else {
        setLocations((prevLocations) => [...prevLocations, response.data.body]);
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
        data={locations}
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
        totalCount={totalCount}
        page={page}
        setPage={setPage}
        perPage={perPage}
        setPerPage={setPerPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </Layout>
  );
}
