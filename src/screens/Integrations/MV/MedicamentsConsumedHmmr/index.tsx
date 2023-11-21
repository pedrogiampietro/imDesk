import { useState, useEffect } from "react";
import { Layout } from "../../../../components/Layout";
import { LayoutForm } from "../../../../components/LayoutForm";
import { apiClient } from "../../../../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../../../../hooks/useAuth";

type Location = {
  id: string;
  name: string;
};

export function MedicamentsConsumedHmmr() {
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [totalCount, setTotalCount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { user } = useAuth();
  const isMultiCompany = true;

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchServices = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient().get(
          `/integration/mv/consume-medicaments-hmmr?page=${page}&perPage=${perPage}`
        );

        const formattedData = data.body.map((item: any) => {
          return [formatCurrency(item[0]), ...item.slice(1)];
        });

        setServicesList(formattedData);
        setTotalCount(data.totalRecords);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services", error);
        setLoading(false);
      }
    };

    fetchServices();
  }, [user, page, perPage]);

  const pageTitle = "Atendimentos Por Localização";

  const tableHeader = [
    {
      id: 1,
      name: "Consumo",
    },
    {
      id: 2,
      name: "Mês/Ano",
    },
  ];

  const headerToDataKeyMap = {
    Consumo: 0,
    "Mês/Ano": 1,
  };

  const handleView = (locationId: any) => {
    console.log("user", locationId);
  };

  function formatCurrency(value: number) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  }

  return (
    <Layout>
      <LayoutForm
        data={servicesList}
        formFields={{}}
        headerToDataKeyMap={headerToDataKeyMap}
        formSelectOptions={[]}
        tableHeader={tableHeader}
        pageTitle={pageTitle}
        showCreateCard={showCreateCard}
        handleShowCreateModal={() => {}}
        handleCreate={() => {}}
        handleView={handleView}
        handleEdit={() => {}}
        handleDelete={() => ""}
        isEditMode={false}
        totalCount={totalCount}
        page={page}
        setPage={setPage}
        perPage={perPage}
        setPerPage={setPerPage}
        isMultiCompany={isMultiCompany}
      />
    </Layout>
  );
}
