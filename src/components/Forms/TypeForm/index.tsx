import React, { useState } from "react";
import { apiClient } from "../../../services/api";

import { toast } from "react-toastify";

import * as S from "./styles";

export function TypeForm() {
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    const data = {
      name,
    };

    try {
      await apiClient().post("/ticket-type", data);

      toast.success("Sucesso! Seu tipo foi adicionada com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      setName("");

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.warn("err", err);
    }
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
      <S.Button type="submit" disabled={loading}>
        {loading ? "Carregando..." : "Criar Tipo"}
      </S.Button>
    </S.FormContainer>
  );
}
