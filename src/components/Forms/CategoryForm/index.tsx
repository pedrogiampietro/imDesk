import React, { useState } from "react";
import { apiClient } from "../../../services/api";

import { toast } from "react-toastify";

import * as S from "./styles";

export function CategoryForm({
  companies,
}: {
  companies: { id: string; name: string }[];
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    childrenName: string;
    companyIds: string[];
  }>({
    name: "",
    childrenName: "",
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
      await apiClient().post("/ticket-category", {
        companyIds: formData.companyIds,
        name: formData.name,
        childrenName: formData.childrenName,
      });

      toast.success("Sucesso! Sua categoria foi adicionada com sucesso!", {
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
        childrenName: "",
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
      <S.FormTitle>Criar Categoria</S.FormTitle>

      <S.InputGroup>
        <S.InputLabel>Nome</S.InputLabel>
        <S.Input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Exemplo: WTT"
          onChange={handleChange}
        />
      </S.InputGroup>

      <S.InputGroup>
        <S.InputLabel>Nome da Subcategoria</S.InputLabel>
        <S.Input
          type="text"
          name="childrenName"
          value={formData.childrenName}
          placeholder="Exemplo: Recuperação de Imagem"
          onChange={handleChange}
        />
      </S.InputGroup>

      <S.InputGroup>
        <S.InputLabel>Empresa</S.InputLabel>
        <S.Select multiple onChange={handleCompanyChange}>
          {companies.map((company) => (
            <option key={company.id} value={company.id}>
              {company.name}
            </option>
          ))}
        </S.Select>
      </S.InputGroup>

      <S.Button type="submit" disabled={loading}>
        {loading ? "Carregando..." : "Criar Categoria"}
      </S.Button>
    </S.FormContainer>
  );
}
