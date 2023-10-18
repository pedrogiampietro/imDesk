import { useEffect, useState } from "react";
import Select from "react-select";
import * as S from "./styles";
import { apiClient } from "../../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  editingInventoryItem: any | null;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setInventory: React.Dispatch<React.SetStateAction<any[]>>;
}

export function CreateItemInventoryModal({
  editingInventoryItem,
  setShowModal,
  setInventory,
}: Props) {
  const [formData, setFormData] = useState<{
    name: string;
    model: string;
    serialNumber: string;
    patrimonyTag: string;
    type: string;
    companyId: string;
    groupId: string;
  }>({
    name: editingInventoryItem ? editingInventoryItem.name : "",
    model: editingInventoryItem ? editingInventoryItem.model : "",
    serialNumber: editingInventoryItem ? editingInventoryItem.serialNumber : "",
    patrimonyTag: editingInventoryItem ? editingInventoryItem.patrimonyTag : "",
    type: editingInventoryItem ? editingInventoryItem.type : "",
    companyId: editingInventoryItem
      ? editingInventoryItem.EquipmentCompanies[0].companyId
      : "",
    groupId: editingInventoryItem
      ? editingInventoryItem.EquipmentCompanies[0].groupId
      : "",
  });
  const [companies, setCompanies] = useState<any>([]);
  const [groups, setGroups] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await apiClient().get("/companies");

        setCompanies(response.data.companies);
      } catch (error) {
        console.error("Error fetching companies", error);
      }
    };

    fetchCompanies();
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await apiClient().get("/group", {
          params: {
            companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
          },
        });

        setGroups(response.data.body);
      } catch (error) {
        console.error("Não foi possível buscar os grupos", error);
      }
    };

    fetchGroups();
  }, []);

  const companyOptions = companies.map((company: any) => ({
    value: company.id,
    label: company.name,
  }));

  const handleSubmit = async () => {
    setLoading(true);

    try {
      let response: any;
      if (editingInventoryItem) {
        // Edição
        response = await apiClient().put(
          `/equipament/${editingInventoryItem.id}`,
          {
            companyId: formData.companyId,
            name: formData.name,
            model: formData.model,
            serialNumber: formData.serialNumber,
            patrimonyTag: formData.patrimonyTag,
            type: formData.type,
            groupId: Number(formData.groupId),
          }
        );

        toast.success("Sucesso! Seu depósito foi atualizado com sucesso!");

        const updatedDepot = response.data.body;
        updatedDepot.users = updatedDepot.DepotUsers.map(
          (depotUser: any) => depotUser.User
        );

        setInventory((prevDeposits) =>
          prevDeposits.map((deposit) =>
            deposit.id === editingInventoryItem.id ? updatedDepot : deposit
          )
        );
      } else {
        // Criação

        response = await apiClient().post("/equipament", {
          companyId: formData.companyId,
          name: formData.name,
          model: formData.model,
          serialNumber: formData.serialNumber,
          patrimonyTag: formData.patrimonyTag,
          type: formData.type,
          groupId: Number(formData.groupId),
        });

        toast.success("Sucesso! Seu depósito foi criado com sucesso!");

        const newDeposit = response.data.body;
        setInventory((prevDeposits) => [...prevDeposits, newDeposit]);
      }

      setShowModal(false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.warn("err", err);
    }
  };

  const handleCompanySelectChange = (selectedOption: any) => {
    setFormData((prevData) => ({
      ...prevData,
      companyId: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleGroupSelectChange = (selectedOptions: any) => {
    setFormData((prevData) => ({
      ...prevData,
      groupId: selectedOptions ? selectedOptions.value : "",
    }));
  };

  const groupOptions = groups
    ? groups.map((group: any) => ({
        value: group.id,
        label: group.name,
      }))
    : [];

  return (
    <>
      <h1 style={{ marginBottom: "1rem" }}>
        {editingInventoryItem ? "Atualizar Item" : "Criar novo Item"}
      </h1>
      <S.Row>
        <S.FormGroup>
          <S.Label htmlFor="name">Nome</S.Label>
          <S.Input
            type="text"
            name="name"
            id="name"
            placeholder="Nome do Item"
            value={formData.name}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                name: e.target.value,
              }))
            }
          />
        </S.FormGroup>
        <S.FormGroup>
          <S.Label htmlFor="model">Modelo</S.Label>
          <S.Input
            type="text"
            name="model"
            id="model"
            placeholder="Modelo do equipamento"
            value={formData.model}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                model: e.target.value,
              }))
            }
          />
        </S.FormGroup>
      </S.Row>

      <S.Row>
        <S.FormGroup>
          <S.Label htmlFor="serialNumber">Número de Série</S.Label>
          <S.Input
            type="text"
            name="serialNumber"
            id="serialNumber"
            placeholder="Número de Série do equipamento"
            value={formData.serialNumber}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                serialNumber: e.target.value,
              }))
            }
          />
        </S.FormGroup>
        <S.FormGroup>
          <S.Label htmlFor="patrimonyTag">Tag de Patrimônio</S.Label>
          <S.Input
            type="text"
            name="patrimonyTag"
            id="patrimonyTag"
            placeholder="Patrimônio do equipamento"
            value={formData.patrimonyTag}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                patrimonyTag: e.target.value,
              }))
            }
          />
        </S.FormGroup>
      </S.Row>

      <S.FormGroup>
        <S.Label htmlFor="type">Tipo do Equipamento</S.Label>
        <S.Input
          type="text"
          name="type"
          id="type"
          placeholder="Tipo de equipamento"
          value={formData.type}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              type: e.target.value,
            }))
          }
        />
      </S.FormGroup>

      <S.InputGroup>
        <S.InputLabel>Empresa</S.InputLabel>
        <Select
          options={companyOptions}
          value={companyOptions.find(
            (option: any) => option.value === formData.companyId
          )}
          onChange={handleCompanySelectChange}
        />
      </S.InputGroup>

      <S.InputGroup>
        <S.InputLabel>Grupo</S.InputLabel>
        <Select
          options={groupOptions}
          value={groupOptions.find(
            (option: any) => option.value === formData.groupId
          )}
          onChange={handleGroupSelectChange}
        />
      </S.InputGroup>

      <S.Button type="submit" disabled={loading} onClick={() => handleSubmit()}>
        {loading
          ? "Carregando..."
          : `${
              editingInventoryItem ? "Atualizar" : "Adicionar"
            } Item do Inventário`}
      </S.Button>
    </>
  );
}
