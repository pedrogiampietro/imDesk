import { useState, useEffect } from "react";
import { Layout } from "../../../components/Layout";
import { apiClient } from "../../../services/api";
import { toast } from "react-toastify";

import { LayoutForm } from "../../../components/LayoutForm";

interface OpenTicketsByLocationData {
  locationName: string;
  openTicketsCount: number;
}

export function StatisticTicketsOpenedByLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [openTicketsByLocation, setOpenTicketsByLocation] = useState<
    OpenTicketsByLocationData[]
  >([]);

  useEffect(() => {
    fetchOpenTicketsByLocation();
  }, []);

  const fetchOpenTicketsByLocation = async () => {
    try {
      const { data } = await apiClient().get(
        "/report/open-tickets-by-location"
      );

      setOpenTicketsByLocation(data.body);
    } catch (error: any) {
      setError(
        error.response?.data?.message || "Ocorreu um erro ao buscar os dados."
      );
      toast.error("Erro ao carregar tickets abertos por localização.");
    } finally {
      setIsLoading(false);
    }
  };

  const pageTitle = "Tickets Abertos por Localização";

  const tableHeader = [
    {
      id: 1,
      name: "Localização",
    },
    {
      id: 2,
      name: "Tickets Abertos",
    },
    {
      id: 3,
      name: "Ações",
    },
  ];

  const headerToDataKeyMap = {
    Localização: "locations",
    "Tickets Abertos": "opened",
  };

  const formFields = {
    title: "Criar Usuário",
    fields: [],
    checkboxes: [],
    // button: {},
  };

  return (
    <Layout>
      <LayoutForm
        data={openTicketsByLocation}
        formFields={formFields}
        headerToDataKeyMap={headerToDataKeyMap}
        formSelectOptions={[]}
        tableHeader={tableHeader}
        pageTitle={pageTitle}
        showCreateCard={false}
        handleShowCreateModal={() => {}}
        handleCreate={() => {}}
        handleView={() => {}}
        handleEdit={() => {}}
        handleDelete={() => {}}
        isEditMode={false}
        isMultiCompany={false}
      />
    </Layout>
  );
}
