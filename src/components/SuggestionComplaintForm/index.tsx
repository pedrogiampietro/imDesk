// src/components/SuggestionComplaintForm.js
import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const Form = styled.form`
  // estilos do formulário
`;

const Input = styled.input`
  // estilos do input
`;

const Button = styled.button`
  // estilos do botão
`;

export function SuggestionComplaintForm() {
  const [formData, setFormData] = useState({
    userId: "",
    companyId: "",
    description: "",
    category: "",
    status: "Aberto",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/suggestion-complaint", formData);
      console.log(response.data);
      // Lógica de tratamento pós-submissão
    } catch (error) {
      console.error("Erro ao enviar a sugestão/reclamação", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {/* Campos do formulário */}
      <Input
        name="userId"
        placeholder="ID do Usuário"
        onChange={handleChange}
      />
      <Input
        name="companyId"
        placeholder="ID da Empresa (opcional)"
        onChange={handleChange}
      />
      <Input
        name="description"
        placeholder="Descrição"
        onChange={handleChange}
      />
      <Input name="category" placeholder="Categoria" onChange={handleChange} />
      <Button type="submit">Enviar Sugestão/Reclamação</Button>
    </Form>
  );
}
