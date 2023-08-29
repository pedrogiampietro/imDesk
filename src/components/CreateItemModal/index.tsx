import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiClient } from "../../services/api";
import { toast } from "react-toastify";

import * as S from "./styles";

export function CreateItemModal({ setShowModal, setDepositItems }: any) {
  const [formData, setFormData] = useState<{
    name: string;
    quantity: string;
    depotId: string;
    category: string;
  }>({
    name: "",
    quantity: "",
    depotId: "",
    category: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const { id } = useParams();

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await apiClient().post("/deposit-item/items", {
        name: formData.name,
        quantity: Number(formData.quantity),
        category: formData.category,
        depotId: id,
      });

      toast.success("Sucesso! Seu item foi adicionada com sucesso!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      const newItemDepot = response.data.body;
      setDepositItems((prevDeposits: any) => [...prevDeposits, newItemDepot]);

      setShowModal(false);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.warn("err", err);
    }
  };

  const handleCategoryChange = (event: any) => {
    const newCategory = event.target.value;
    setFormData((prevData) => ({
      ...prevData,
      category: newCategory,
    }));
  };

  return (
    <>
      <h1 style={{ marginBottom: "1rem" }}>Adicionar novo item</h1>
      <S.FormGroup>
        <S.Label htmlFor="name">Nome</S.Label>
        <S.Input
          type="text"
          name="name"
          id="name"
          placeholder="Nome do item"
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              name: e.target.value,
            }))
          }
        />
      </S.FormGroup>
      <S.FormGroup>
        <S.Label htmlFor="location">Quantidade</S.Label>
        <S.Input
          type="text"
          name="quantity"
          id="quantity"
          placeholder="Quantidade"
          onChange={(e) =>
            setFormData((prevData) => ({
              ...prevData,
              quantity: e.target.value,
            }))
          }
        />
      </S.FormGroup>

      <S.FormGroup>
        <S.Label htmlFor="category">Categoria</S.Label>
        <select value={formData.category} onChange={handleCategoryChange}>
          <option value="" selected>
            Selecione uma categoria
          </option>
          <option value="Materiais de TI">Materiais de TI</option>
          <option value="Materiais de Engenharia">
            Materiais de Engenharia
          </option>
          <option value="Materiais de Manutenção">
            Materiais de Manutenção
          </option>
        </select>
      </S.FormGroup>

      <S.Button type="submit" disabled={loading} onClick={() => handleSubmit()}>
        {loading ? "Carregando..." : "Adicionar Item"}
      </S.Button>
    </>
  );
}
