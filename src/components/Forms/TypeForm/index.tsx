import React, { useState } from "react";
import { apiClient } from "../../../services/api";
import Select from "react-select";
import { toast } from "react-toastify";

import * as S from "./styles";

export function TypeForm({
  companies,
}: {
  companies: { id: string; name: string }[];
}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState<
    { value: string; label: string }[]
  >([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const selectedCompanyIds = selectedCompanies.map((comp) => comp.value);

    setLoading(true);

    try {
      await apiClient().post("/ticket-type", {
        companyIds: selectedCompanyIds,
        name,
      });

      toast.success("Sucesso! Seu tipo foi adicionado com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setName("");
      setSelectedCompanies([]);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.warn("err", err);
    }
  };

  const options = companies.map((company) => ({
    value: company.id,
    label: company.name,
  }));

  const handleCompanyChange = (selectedOptions: any) => {
    setSelectedCompanies(selectedOptions || []);
  };

  return (
    <S.FormContainer onSubmit={handleSubmit}>
      <S.FormTitle>Criar Tipo</S.FormTitle>

      <S.InputGroup>
        <S.InputLabel>Nome</S.InputLabel>
        <S.Input
          type="text"
          name="name"
          value={name}
          placeholder="Exemplo: Corretiva"
          onChange={(e) => setName(e.target.value)}
        />
      </S.InputGroup>

      <S.InputGroup>
        <S.InputLabel>Empresa</S.InputLabel>
        <Select
          isMulti
          name="companies"
          options={options}
          value={selectedCompanies}
          onChange={handleCompanyChange}
        />
      </S.InputGroup>

      <S.Button type="submit" disabled={loading}>
        {loading ? "Carregando..." : "Criar Tipo"}
      </S.Button>
    </S.FormContainer>
  );
}
