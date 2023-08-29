import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiX } from "react-icons/fi";
import { Layout } from "../../components/Layout";
import { apiClient } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { CreateDepositModal } from "../../components/CreateDepositModal";

import * as S from "./styles";

interface Deposit {
  id: string;
  name: string;
  location: string;
  createdAt: string;
  Company: {
    name: string;
  };
}

export function Deposit() {
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
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

  const handleDelete = (id: string) => {
    // history.push(`/deposit/${id}/items`);
  };

  return (
    <Layout>
      <S.Button onClick={() => setShowModal(true)}>Criar Depósito</S.Button>
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
          {deposits.map((deposit, index) => (
            <S.TableRow key={deposit.id}>
              <S.TableCell>{index + 1}</S.TableCell>
              <S.TableCell>{deposit.name}</S.TableCell>
              <S.TableCell>{deposit.location}</S.TableCell>
              <S.TableCell>
                {new Date(deposit.createdAt).toLocaleDateString()}
              </S.TableCell>
              <S.TableCell>{deposit.Company.name}</S.TableCell>
              <S.TableCell>
                <S.Button onClick={() => handleClick(deposit.id)}>
                  Visualizar
                </S.Button>
                <S.Button onClick={() => handleDelete(deposit.id)}>
                  Excluir
                </S.Button>
              </S.TableCell>
            </S.TableRow>
          ))}
        </tbody>
      </S.Table>

      {showModal && (
        <S.ModalWrapper>
          <S.ModalContainer>
            <CreateDepositModal
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
    </Layout>
  );
}
