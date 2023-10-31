import { useEffect, useState } from "react";
import Select from "react-select";
import * as S from "./styles";
import { apiClient } from "../../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../../hooks/useAuth";

interface Props {
  editingDeposit: any | null;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setDeposits: React.Dispatch<React.SetStateAction<any[]>>;
}

export function CreateDepositModal({
  editingDeposit,
  setShowModal,
  setDeposits,
}: Props) {
  const [formData, setFormData] = useState<{
    name: string;
    location: string;
    companyIds: string[];
    userId: string[];
  }>({
    name: editingDeposit ? editingDeposit.name : "",
    location: editingDeposit ? editingDeposit.location : "",
    companyIds: editingDeposit ? [editingDeposit?.Company?.id] : [],
    userId: editingDeposit
      ? editingDeposit?.users?.map((user: any) => user.id)
      : [],
  });
  const [companies, setCompanies] = useState<any>([]);
  const [locations, setLocations] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);
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
    const fetchUsers = async () => {
      try {
        const response = await apiClient().get("/account/users", {
          params: {
            companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching companies", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const { data } = await apiClient().get("/location", {
          params: {
            companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
          },
        });

        setLocations(data.body);
      } catch (error) {
        console.error("Error fetching locations", error);
      }
    };

    fetchLocations();
  }, []);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      let response: any;
      if (editingDeposit) {
        // Edição
        response = await apiClient().put(`/deposit/${editingDeposit.id}`, {
          companyId: formData.companyIds[0],
          name: formData.name,
          location: formData.location,
          userId: formData.userId,
        });

        toast.success("Sucesso! Seu depósito foi atualizado com sucesso!");

        const updatedDepot = response.data.body;
        updatedDepot.users = updatedDepot.DepotUsers.map(
          (depotUser: any) => depotUser.User
        );

        setDeposits((prevDeposits) =>
          prevDeposits.map((deposit) =>
            deposit.id === editingDeposit.id ? updatedDepot : deposit
          )
        );
      } else {
        // Criação
        response = await apiClient().post("/deposit", {
          companyId: formData.companyIds,
          name: formData.name,
          location: formData.location,
        });

        toast.success("Sucesso! Seu depósito foi criado com sucesso!");

        const newDeposit = response.data.body;
        setDeposits((prevDeposits) => [...prevDeposits, newDeposit]);
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
      companyIds: selectedOption ? selectedOption.value : "",
    }));
  };

  const handleUserSelectChange = (selectedOptions: any) => {
    const userIds = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setFormData((prevData) => ({
      ...prevData,
      userId: userIds,
    }));
  };

  const handleLocationSelectChange = (selectedOption: any) => {
    setFormData((prevData) => ({
      ...prevData,
      location: selectedOption ? selectedOption.value : "",
    }));
  };

  const companyOptions = companies.map((company: any) => ({
    value: company.id,
    label: company.name,
  }));

  const userOptions = users
    ? users.map((user: any) => ({
        value: user.id,
        label: user.name,
      }))
    : [];

  const locationOptions = locations
    ? locations.map((location: any) => ({
        value: location.id,
        label: location.name,
      }))
    : [];

  return (
    <>
      <h1 style={{ marginBottom: "1rem" }}>
        {editingDeposit ? "Atualizar deposito" : "Criar novo deposito"}
      </h1>
      <S.FormGroup>
        <S.Label htmlFor="name">Nome</S.Label>
        <S.Input
          type="text"
          name="name"
          id="name"
          placeholder="Nome do deposito"
          value={formData.name}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              name: e.target.value,
            }))
          }
        />
      </S.FormGroup>

      <S.InputGroup>
        <S.InputLabel>Localização</S.InputLabel>
        <Select
          options={locationOptions}
          value={
            editingDeposit
              ? locationOptions.find(
                  (option: any) => option.value === editingDeposit.location
                )
              : locationOptions.find(
                  (option: any) => option.value === locations.id
                )
          }
          onChange={handleLocationSelectChange}
        />
      </S.InputGroup>

      <S.InputGroup>
        <S.InputLabel>Empresa</S.InputLabel>
        <Select
          options={companyOptions}
          value={
            editingDeposit
              ? companyOptions.find(
                  (option: any) => option.value === editingDeposit.companyId
                )
              : companyOptions.find(
                  (option: any) => option.value === companies.id
                )
          }
          onChange={handleCompanySelectChange}
        />
      </S.InputGroup>

      <S.InputGroup>
        <S.InputLabel>Usuário</S.InputLabel>
        <Select
          isMulti
          options={userOptions}
          value={formData?.userId?.map((id) =>
            userOptions.find((option: any) => option.value === id)
          )}
          onChange={handleUserSelectChange}
        />
      </S.InputGroup>

      <S.Button type="submit" disabled={loading} onClick={() => handleSubmit()}>
        {loading
          ? "Carregando..."
          : `${editingDeposit ? "Atualizar" : "Adicionar"} Depósito`}
      </S.Button>
    </>
  );
}
