import React, { useState, useEffect } from "react";
import Select from "react-select";
import { apiClient } from "../../../services/api";
import { toast } from "react-toastify";
import { useAuth } from "../../../hooks/useAuth";

import * as S from "./styles";

export function GroupForm({
  companies,
}: {
  companies: { id: string; name: string }[];
}) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<{
    name: string;
    companyIds: string[];
  }>({
    name: "",
    companyIds: [],
  });
  const [users, setUsers] = useState([]);
  const [groups, setGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);

  const { user } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await apiClient().get("/account/users", {
          params: {
            companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Não foi possível buscar os usuários", error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await apiClient().get("/group", {
          params: {
            companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
          },
        });

        setGroups(response.data.body);
      } catch (error) {
        console.error("Não foi possível buscar os grupos", error);
      }
    };

    fetchGroups();
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMemberSelectChange = (selectedOptions: any) => {
    setSelectedMembers(selectedOptions);
  };

  const handleGroupSelectChange = (selectedOptions: any) => {
    setSelectedGroups(selectedOptions);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    try {
      await apiClient().post("/group", {
        companyIds: formData.companyIds,
        name: formData.name,
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
        companyIds: [],
      });

      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.warn("err", err);
    }
  };

  const addUserToGroup = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // Construa a lógica para enviar a adição de membros aos grupos selecionados
    try {
      // Precisamos verificar se algum grupo foi selecionado
      if (selectedGroups.length === 0) {
        toast.error("Por favor, selecione pelo menos um grupo.");
        return;
      }

      // Aqui, você enviaria a solicitação para adicionar os membros aos grupos.
      // Este é um exemplo e depende de como sua API está estruturada.
      await Promise.all(
        selectedGroups.map((group: any) =>
          apiClient().post("/group/add-user", {
            groupId: group.value, // assumindo que é assim que sua API recebe esses valores
            userIds: selectedMembers.map((member: any) => member.value), // os IDs dos usuários selecionados
          })
        )
      );

      toast.success(
        "Usuários adicionados com sucesso aos grupos selecionados!"
      );
      setSelectedGroups([]); // Limpar os grupos selecionados
      setSelectedMembers([]); // Limpar os membros selecionados
    } catch (err) {
      toast.error("Houve um problema ao adicionar usuários ao grupo.");
      console.warn("err", err);
    } finally {
      setLoading(false);
    }
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

  const companyOptions = companies.map((company) => ({
    value: company.id,
    label: company.name,
  }));

  const groupOptions = groups.map((group: any) => ({
    value: group.id,
    label: group.name,
  }));

  const memberOptions = users.map((user: any) => ({
    value: user.id,
    label: user.name,
  }));

  return (
    <S.Wrapper>
      <S.FormContainer onSubmit={handleSubmit}>
        <S.FormTitle>Criar Grupo</S.FormTitle>
        <S.InputGroup>
          <S.InputLabel>Nome</S.InputLabel>
          <S.Input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Exemplo: TI"
            onChange={handleChange}
          />
        </S.InputGroup>

        <S.InputGroup>
          <S.InputLabel>Empresa</S.InputLabel>
          <Select
            isMulti
            options={companyOptions}
            value={formData.companyIds.map((id) =>
              companyOptions.find((option) => option.value === id)
            )}
            onChange={handleCompanySelectChange}
          />
        </S.InputGroup>

        <S.Button type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Criar Grupo"}
        </S.Button>
      </S.FormContainer>

      <S.FormContainer onSubmit={addUserToGroup}>
        <S.FormTitle>Adicionar Usuario ao Grupo</S.FormTitle>

        {/* Selecione os Grupos */}
        <S.InputGroup>
          <S.InputLabel>Grupos</S.InputLabel>
          <Select
            isMulti
            options={groupOptions}
            value={selectedGroups}
            onChange={handleGroupSelectChange}
            placeholder="Selecione os grupos"
          />
        </S.InputGroup>

        {/* Selecione os Usuários */}
        <S.InputGroup>
          <S.InputLabel>Usuários</S.InputLabel>
          <Select
            isMulti
            options={memberOptions}
            value={selectedMembers}
            onChange={handleMemberSelectChange}
            placeholder="Selecione os usuários"
          />
        </S.InputGroup>

        <S.Button type="submit" disabled={loading}>
          {loading ? "Carregando..." : "Adicionar Usuário"}
        </S.Button>
      </S.FormContainer>
    </S.Wrapper>
  );
}
