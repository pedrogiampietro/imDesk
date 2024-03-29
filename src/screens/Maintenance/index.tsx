import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { MaintenanceTable } from "../../components/MaintenanceTable";
import { MaintenanceModal } from "../../components/MaintenanceModal";

import * as S from "./styles";
import { apiClient } from "../../services/api";

export function Maintenance() {
  const [listMaintenance, setListMaintenance] = useState<any>([]);
  const [maintenance, setMaintenance] = useState<any>({});
  const [showMaintenanceModal, setShowMaintenanceModal] =
    useState<boolean>(false);
  const [addMaintenanceModal, setAddMaintenanceModal] =
    useState<boolean>(false);

  const fetchMaintenances = async () => {
    try {
      const { data } = await apiClient().get("/maintenance");
      setListMaintenance(data.body);
    } catch (err) {}
  };

  // useEffect(() => {
  //   fetchMaintenances();
  // }, []);

  return (
    <Layout>
      <S.Container>
        <S.CreateWrapper>
          <S.CreateButton
            onClick={() => {
              setShowMaintenanceModal(true);
              setAddMaintenanceModal(true);
            }}
          >
            Adicionar Manutenção
          </S.CreateButton>
        </S.CreateWrapper>

        <S.TicketsWrapper>
          <MaintenanceTable
            data={listMaintenance}
            setShowMaintenanceModal={setShowMaintenanceModal}
            setMaintenance={setMaintenance}
          />
        </S.TicketsWrapper>

        {showMaintenanceModal && (
          <MaintenanceModal
            onClose={setShowMaintenanceModal}
            maintenance={maintenance}
            addMaintenanceModal={addMaintenanceModal}
            setAddMaintenanceModal={setAddMaintenanceModal}
            onRefresh={fetchMaintenances}
          />
        )}
      </S.Container>
    </Layout>
  );
}
