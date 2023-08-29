import { useEffect, useState } from "react";
import Select from "react-select";
import * as S from "./styles";
import { apiClient } from "../../services/api";
import { toast } from "react-toastify";

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
  }>({
    name: editingDeposit ? editingDeposit.name : "",
    location: editingDeposit ? editingDeposit.location : "",
    companyIds: editingDeposit ? [editingDeposit.Company.id] : [],
  });
  const [companies, setCompanies] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await apiClient().get("/companies/");

        setCompanies(response.data.companies);
      } catch (error) {
        console.error("Error fetching companies", error);
      }
    };

    fetchCompanies();
  }, []);

  const companyOptions = companies.map((company: any) => ({
    value: company.id,
    label: company.name,
  }));

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
          userId: "09a456f2-1348-490d-8359-c5da81b6f1a2",
        });

        toast.success("Sucesso! Seu depósito foi atualizado com sucesso!");

        setDeposits((prevDeposits) =>
          prevDeposits.map((deposit) =>
            deposit.id === editingDeposit.id ? response.data.body : deposit
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
      <S.FormGroup>
        <S.Label htmlFor="location">Localização</S.Label>
        <S.Input
          type="text"
          name="location"
          id="location"
          placeholder="Localização do equipamento"
          value={formData.location}
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              location: e.target.value,
            }))
          }
        />
      </S.FormGroup>

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

      <S.Button type="submit" disabled={loading} onClick={() => handleSubmit()}>
        {loading
          ? "Carregando..."
          : `${editingDeposit ? "Atualizar" : "Adicionar"} Depósito`}
      </S.Button>
    </>
  );
}
