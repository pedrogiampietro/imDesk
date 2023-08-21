import React, { useState } from "react";
import { apiClient } from "../../../services/api";

import { toast } from "react-toastify";

import * as S from "./styles";

export function PriorityForm({
  companies,
}: {
  companies: { id: string; name: string }[];
}) {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [selectedCompanyIds, setSelectedCompanyIds] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    try {
      await apiClient().post("/ticket-priority", {
        companyIds: selectedCompanyIds,
        name,
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

      setName("");
      setSelectedCompanyIds([]);

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.warn("err", err);
    }
  };

  const handleCompanyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIds = Array.from(event.target.selectedOptions).map(
      (option) => option.value
    );
    setSelectedCompanyIds(selectedIds);
  };

  return (
    <S.FormContainer onSubmit={handleSubmit}>
      <S.FormTitle>Criar Prioridade de Ticket</S.FormTitle>

      <S.InputGroup>
        <S.InputLabel>Nome</S.InputLabel>
        <S.Input
          type="text"
          name="name"
          value={name}
          placeholder="Exemplo: Baixa"
          onChange={(e) => setName(e.target.value)}
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
        {loading ? "Carregando..." : "Criar Prioridade"}
      </S.Button>
    </S.FormContainer>
  );
}
