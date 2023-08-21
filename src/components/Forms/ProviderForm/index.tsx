import React, { useState } from "react";
import { apiClient } from "../../../services/api";

import { toast } from "react-toastify";

import * as S from "./styles";

export function ProviderForm({ companies }: any) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    email: string;
    address: string;
    companyIds: string[];
  }>({
    name: "",
    phone: "",
    email: "",
    address: "",
    companyIds: [],
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIds = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setFormData((prevData) => ({
      ...prevData,
      companyIds: selectedIds,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    try {
      await apiClient().post("/providers/provider", {
        ...formData,
        companyIds: formData.companyIds,
      });

      toast.success("Sucesso! Sua localização foi criada com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        companyIds: [],
      });

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.warn("err", err);
    }
  };

  return (
    <S.FormContainer onSubmit={handleSubmit}>
      <S.FormTitle>Criar Fornecedor</S.FormTitle>

      <S.InputGroup>
        <S.InputLabel>Nome da empresa</S.InputLabel>
        <S.Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </S.InputGroup>

      <S.InputGroup>
        <S.InputLabel>Telefone</S.InputLabel>
        <S.Input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
      </S.InputGroup>

      <S.InputGroup>
        <S.InputLabel>Email</S.InputLabel>
        <S.Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </S.InputGroup>

      <S.InputGroup>
        <S.InputLabel>Endereço</S.InputLabel>
        <S.Input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />
      </S.InputGroup>

      <S.InputGroup>
        <S.InputLabel>Empresas</S.InputLabel>
        <S.Select multiple onChange={handleCompanyChange}>
          {companies.map((company: any) => (
            <option key={company.companyId} value={company.companyId}>
              {company.name}
            </option>
          ))}
        </S.Select>
      </S.InputGroup>

      <S.Button type="submit" disabled={loading}>
        {loading ? "Carregando..." : "Criar Fornecedor"}
      </S.Button>
    </S.FormContainer>
  );
}
