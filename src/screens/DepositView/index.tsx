import { useState, useEffect } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { TiCancel } from "react-icons/ti";
import { useParams } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { apiClient } from "../../services/api";
import { CreateItemModal } from "../../components/CreateItemModal";
import { DropdownMenuComponent } from "../../components/DropdownMenu";

import * as S from "./styles";
import { FiSave } from "react-icons/fi";

interface DepositItem {
  id: string;
  name: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  category:
    | "Materiais de TI"
    | "Materiais de Engenharia"
    | "Materiais de Manutenção";
  depositId: string;
}

export function DepositView() {
  const [depositItems, setDepositItems] = useState<DepositItem[]>([]);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingItem, setEditingItem] = useState<DepositItem | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { id } = useParams();

  useEffect(() => {
    async function fetchItemsOnDeposit() {
      try {
        const response = await apiClient().get("/deposit-item/items", {
          params: {
            depotId: id,
          },
        });

        setDepositItems(response.data.body);
      } catch (error) {
        console.error("Erro ao buscar items do deposito:", error);
      }
    }
    fetchItemsOnDeposit();
  }, [id]);

  const handleEditClick = (itemId: string) => {
    const itemToEdit = depositItems.find((item) => item.id === itemId) || null;
    setEditingItem(itemToEdit);
    setEditingItemId(itemId);
  };

  const handleDeleteClick = async (itemId: string) => {
    try {
      await apiClient().delete(`/deposit-item/items/${itemId}`);
      setDepositItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      console.error("Erro ao excluir item:", error);
    }
  };

  const handleNameChange = (event: any) => {
    const newName = event.target.value;
    setEditingItem((prevItem) =>
      prevItem ? { ...prevItem, name: newName } : null
    );
  };

  const handleQuantityChange = (event: any) => {
    const newQuantity = event.target.value;
    setEditingItem((prevItem) =>
      prevItem ? { ...prevItem, quantity: newQuantity } : null
    );
  };

  const handleCategoryChange = (event: any) => {
    const newCategory = event.target.value;
    setEditingItem((prevItem) =>
      prevItem ? { ...prevItem, category: newCategory } : null
    );
  };

  const handleCancel = () => {
    setEditingItemId(null);
    setEditingItem(null);
  };

  const handleSave = async () => {
    if (editingItem) {
      try {
        await apiClient().put(`/deposit-item/items/${editingItem.id}`, {
          name: editingItem.name,
          quantity: Number(editingItem.quantity),
          category: editingItem.category || null,
        });

        setDepositItems((prevItems) =>
          prevItems.map((item) =>
            item.id === editingItem.id ? editingItem : item
          )
        );
        setEditingItemId(null);
        setEditingItem(null);
      } catch (error) {
        console.error("Erro ao salvar item:", error);
      }
    }
  };

  return (
    <Layout>
      <>
        <S.WelcomeButtonWrapper>
          <h2>Visualizar Depósito</h2>
          <S.SaveButton onClick={() => setShowModal(true)}>
            Adicionar Item
          </S.SaveButton>
        </S.WelcomeButtonWrapper>

        {depositItems.length === 0 ? (
          <S.NoItemsMessage>
            Esse depósito ainda não tem itens para visualizar.
          </S.NoItemsMessage>
        ) : (
          <S.Table>
            <thead>
              <S.TableRow>
                <S.TableHeader>Nome</S.TableHeader>
                <S.TableHeader>Quantidade</S.TableHeader>
                <S.TableHeader>Data de Criação</S.TableHeader>
                <S.TableHeader>Data de Atualização</S.TableHeader>
                <S.TableHeader>Categoria</S.TableHeader>
                <S.TableHeader>Ações</S.TableHeader>
              </S.TableRow>
            </thead>
            <tbody>
              {depositItems.map((item, index) => (
                <S.TableRow key={item.id}>
                  <S.TableCell>
                    {editingItem && editingItem.id === item.id ? (
                      <S.Input
                        type="text"
                        value={editingItem.name}
                        onChange={handleNameChange}
                      />
                    ) : (
                      item.name
                    )}
                  </S.TableCell>
                  <S.TableCell>
                    {editingItem && editingItem.id === item.id ? (
                      <S.Input
                        type="text"
                        value={editingItem.quantity}
                        onChange={handleQuantityChange}
                      />
                    ) : (
                      item.quantity
                    )}
                  </S.TableCell>
                  <S.TableCell>
                    {new Date(item.createdAt).toLocaleDateString()}
                  </S.TableCell>
                  <S.TableCell>
                    {new Date(item.updatedAt).toLocaleDateString()}
                  </S.TableCell>
                  <S.TableCell>
                    {editingItem && editingItem.id === item.id ? (
                      <select
                        value={editingItem.category}
                        onChange={handleCategoryChange}
                      >
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
                    ) : (
                      item.category
                    )}
                  </S.TableCell>
                  <S.TableCell>
                    {editingItemId === item.id ? (
                      <>
                        <S.Button onClick={handleSave}>
                          <FiSave size={20} />
                        </S.Button>
                        <S.Button onClick={handleCancel}>
                          <TiCancel size={20} />
                        </S.Button>
                      </>
                    ) : (
                      <DropdownMenuComponent
                        onEdit={() => handleEditClick(item.id)}
                        onDelete={() => handleDeleteClick(item.id)}
                      />
                    )}
                  </S.TableCell>
                </S.TableRow>
              ))}
            </tbody>
          </S.Table>
        )}
      </>

      {showModal && (
        <S.ModalWrapper>
          <S.ModalContainer>
            <CreateItemModal
              setShowModal={setShowModal}
              setDepositItems={setDepositItems}
            />

            <S.CloseButtonModal
              type="button"
              onClick={() => {
                setShowModal(false);
              }}
            >
              <FiX size="22" />
            </S.CloseButtonModal>
          </S.ModalContainer>
        </S.ModalWrapper>
      )}
    </Layout>
  );
}
