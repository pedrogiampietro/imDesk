import React, { useState } from "react";
import { apiClient } from "../../../services/api";

import { toast } from "react-toastify";

import * as S from "./styles";

export function UserForm() {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    phone: "",
    ramal: "",
    sector: "",
    isTechnician: false,
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    try {
      await apiClient().post("/authenticate/sign-up", formData);

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
        username: "",
        name: "",
        email: "",
        password: "",
        phone: "",
        ramal: "",
        sector: "",
        isTechnician: false,
      });

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.warn("err", err);
    }
  };

  return (
    <S.FormContainer onSubmit={handleSubmit}>
      <S.FormTitle>Criar Usuário</S.FormTitle>

      <S.InputGroup>
        <S.InputLabel>Nome de Usuário</S.InputLabel>
        <S.Input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
      </S.InputGroup>

      <S.InputGroup>
        <S.InputLabel>Nome</S.InputLabel>
        <S.Input
          type="text"
          name="name"
          value={formData.name}
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
        <S.InputLabel>Senha</S.InputLabel>
        <S.Input
          type="password"
          name="password"
          value={formData.password}
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
        <S.InputLabel>Ramal</S.InputLabel>
        <S.Input
          type="text"
          name="ramal"
          value={formData.ramal}
          onChange={handleChange}
        />
      </S.InputGroup>

      <S.InputGroup>
        <S.InputLabel>Setor</S.InputLabel>
        <S.Input
          type="text"
          name="sector"
          value={formData.sector}
          onChange={handleChange}
        />
      </S.InputGroup>

      <S.CheckboxGroup>
        <S.Checkbox
          type="checkbox"
          name="isTechnician"
          checked={formData.isTechnician}
          onChange={handleChange}
        />
        <S.InputLabel>É Técnico?</S.InputLabel>
      </S.CheckboxGroup>

      <S.Button type="submit" disabled={loading}>
        {loading ? "Carregando..." : "Criar Usuário"}
      </S.Button>
    </S.FormContainer>
  );
}
