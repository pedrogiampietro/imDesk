import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { Layout } from "../../components/Layout";
import { apiClient } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { CreateDepositModal } from "../../components/CreateDepositModal";
import { DropdownMenuComponent } from "../../components/DropdownMenu";

import * as S from "./styles";

interface Deposit {
  id: string;
  name: string;
  location: string;
  locationName: string;
  createdAt: string;
  Company: {
    name: string;
  };
}

export function Deposit() {
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingDeposit, setEditingDeposit] = useState<Deposit | null>(null);

  const { user } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDeposits() {
      if (
        !user ||
        !user.companies ||
        !user.currentLoggedCompany.currentLoggedCompanyId ||
        !user.currentLoggedCompany.currentLoggedCompanyName
      ) {
        return;
      }

      try {
        const response = await apiClient().get("/deposit", {
          params: {
            companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
          },
        });

        setDeposits(response.data.body);
      } catch (error) {
        console.error("Erro ao buscar os depositos:", error);
      }
    }
    fetchDeposits();
  }, [user]);

  const handleClick = (id: string) => {
    navigate(`/deposit/${id}`);
  };

  const handleEdit = (deposit: Deposit) => {
    setEditingDeposit(deposit);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    const confirm = window.confirm(
      "Tem certeza que deseja excluir este depósito?"
    );
    if (!confirm) {
      return;
    }

    try {
      await apiClient().delete(`/deposit/${id}`);
      setDeposits(deposits.filter((deposit) => deposit.id !== id));
    } catch (error) {
      console.error("Erro ao excluir o depósito:", error);
    }
  };

  return (
    <Layout>
      <S.Container>
        <S.Button
          onClick={() => {
            setShowModal(true);
            setEditingDeposit(null);
          }}
        >
          Criar Depósito
        </S.Button>
        <S.Table>
          <thead>
            <S.TableRow>
              <S.TableHeader>Nº</S.TableHeader>
              <S.TableHeader>Nome</S.TableHeader>
              <S.TableHeader>Localização</S.TableHeader>
              <S.TableHeader>Criado em</S.TableHeader>
              <S.TableHeader>Nome da Empresa</S.TableHeader>
              <S.TableHeader>Ações</S.TableHeader>
            </S.TableRow>
          </thead>
          <tbody>
            {deposits.length > 0 ? (
              deposits.map((deposit, index) => (
                <S.TableRow key={deposit.id}>
                  <S.TableCell>{index + 1}</S.TableCell>
                  <S.TableCell>{deposit.name}</S.TableCell>
                  <S.TableCell>{deposit.locationName}</S.TableCell>
                  <S.TableCell>
                    {new Date(deposit.createdAt).toLocaleDateString()}
                  </S.TableCell>
                  <S.TableCell>{deposit?.Company?.name}</S.TableCell>
                  <S.TableCell>
                    <DropdownMenuComponent
                      onView={() => handleClick(deposit.id)}
                      onEdit={() => handleEdit(deposit)}
                      onDelete={() => handleDelete(deposit.id)}
                    />
                  </S.TableCell>
                </S.TableRow>
              ))
            ) : (
              <S.NoItemsMessage>
                Esse depósito ainda não tem itens para visualizar.
              </S.NoItemsMessage>
            )}
          </tbody>
        </S.Table>

        {showModal && (
          <S.ModalWrapper>
            <S.ModalContainer>
              <CreateDepositModal
                editingDeposit={editingDeposit}
                setShowModal={setShowModal}
                setDeposits={setDeposits}
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
      </S.Container>
    </Layout>
  );
}
