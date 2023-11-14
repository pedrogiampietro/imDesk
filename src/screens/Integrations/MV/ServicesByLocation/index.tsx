import { useState, useEffect } from "react";
import { Layout } from "../../../../components/Layout";
import { LayoutForm } from "../../../../components/LayoutForm";
import { apiClient } from "../../../../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../../../../hooks/useAuth";
import { ChangeFilterModal } from "../../../../components/ChangeFilterModal";

type Location = {
  id: string;
  name: string;
};

export function ServicesByLocation() {
  const [servicesList, setServicesList] = useState<any[]>([]);
  const [showCreateCard, setShowCreateCard] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [totalCount, setTotalCount] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    setShowFilterModal(true);
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }

    const fetchServices = async () => {
      try {
        setLoading(true);
        const { data } = await apiClient().get(
          `/integration/mv/services-by-locations?page=${page}&perPage=${perPage}`
        );

        setServicesList(data.body);
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
      name: "Data",
    },
    {
      id: 2,
      name: "Municipio",
    },
    {
      id: 3,
      name: "Bairro",
    },
    {
      id: 4,
      name: "Quantidade Atendida",
    },
  ];

  const headerToDataKeyMap = {
    Data: 0,
    Municipio: 2,
    Bairro: 4,
    "Quantidade Atendida": 3,
  };

  const handleView = (locationId: any) => {
    console.log("user", locationId);
  };

  return (
    <>
      <Layout>
        {showFilterModal ? <ChangeFilterModal /> : null}
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
        />
      </Layout>
    </>
  );
}
