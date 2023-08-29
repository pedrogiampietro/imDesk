import { useEffect, useState } from "react";
import Select from "react-select";
import * as S from "./styles";
import { apiClient } from "../../services/api";
import { toast } from "react-toastify";

export function CreateDepositModal({ setShowModal, setDeposits }: any) {
  const [formData, setFormData] = useState<{
    name: string;
    location: string;
    companyIds: string[];
  }>({
    name: "",
    location: "",
    companyIds: [],
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
      const response = await apiClient().post("/deposit", {
        companyId: formData.companyIds,
        name: formData.name,
        location: formData.location,
      });

      toast.success("Sucesso! Seu deposito foi adicionado com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      const newDeposit = response.data.body;
      setDeposits((prevDeposits: any) => [...prevDeposits, newDeposit]);

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
      <h1 style={{ marginBottom: "1rem" }}>Criar novo deposito</h1>
      <S.FormGroup>
        <S.Label htmlFor="name">Nome</S.Label>
        <S.Input
          type="text"
          name="name"
          id="name"
          placeholder="Nome do deposito"
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
          value={companyOptions.find(
            (option: any) => option.value === companies.id
          )}
          onChange={handleCompanySelectChange}
        />
      </S.InputGroup>

      <S.Button type="submit" disabled={loading} onClick={() => handleSubmit()}>
        {loading ? "Carregando..." : "Adicionar Depósito"}
      </S.Button>
    </>
  );
}
