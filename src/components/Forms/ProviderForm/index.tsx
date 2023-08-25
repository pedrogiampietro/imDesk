import React, { useState } from "react";
import { apiClient } from "../../../services/api";
import Select from "react-select";
import { toast } from "react-toastify";
import InputMask from "react-input-mask";

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
  const [phoneMask, setPhoneMask] = useState<string>("(99) 9999-9999");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCompanySelectChange = (selectedOptions: any) => {
    const selectedIds = selectedOptions
      ? selectedOptions.map((option: any) => option.value)
      : [];
    setFormData((prevData) => ({
      ...prevData,
      companyIds: selectedIds,
    }));
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const justNumbers = value.replace(/[^\d]/g, "");

    if (justNumbers.length <= 10) {
      setPhoneMask("(99) 9999-9999");
    } else {
      setPhoneMask("(99) 99999-9999");
    }

    handleChange(event);
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

  const companyOptions = companies.map((company: any) => ({
    value: company.companyId,
    label: company.name,
  }));

  const InputMaskTyped: React.ComponentType<any> = InputMask;

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
        <InputMaskTyped
          mask="(99) 99999-9999"
          value={formData.phone}
          onChange={handleChange}
        >
          {(inputProps: any) => (
            <S.Input {...inputProps} type="text" name="phone" />
          )}
        </InputMaskTyped>
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
        <Select
          isMulti
          options={companyOptions}
          value={formData.companyIds.map((id) =>
            companyOptions.find((option: any) => option.value === id)
          )}
          onChange={handleCompanySelectChange}
        />
      </S.InputGroup>

      <S.Button type="submit" disabled={loading}>
        {loading ? "Carregando..." : "Criar Fornecedor"}
      </S.Button>
    </S.FormContainer>
  );
}
