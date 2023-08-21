import { useState, useEffect } from "react";

import { Layout } from "../../components/Layout";

import { useAuth } from "../../hooks/useAuth";

import * as S from "./styles";
import { apiClient } from "../../services/api";

interface IProviders {
  name: string;
  email: string;
  address: string;
}

export function Provider() {
  const { user } = useAuth();
  const [providers, setProviders] = useState<IProviders[] | []>([]);
  const [selectedProvider, setSelectedProvider] = useState<IProviders | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    async function fetchProviders() {
      try {
        const response = await apiClient().get("/providers/provider");
        setProviders(response.data.providers);
      } catch (error) {
        console.error("Erro ao buscar fornecedores:", error);
      }
    }
    fetchProviders();
  }, []);

  const handleEdit = (provider: any) => {
    setSelectedProvider(provider);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleView = (provider: any) => {
    setSelectedProvider(provider);
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedProvider(null);
    setIsEditMode(false);
    setShowModal(false);
  };

  const handleDelete = async (provider: any) => {
    console.log("Excluir fornecedor:", provider);
    // Faça uma solicitação DELETE para a API para excluir o fornecedor
    try {
      const response = await fetch(`/api/providers/${provider.id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // Remova o fornecedor da lista no estado
        setProviders((prevProviders: any) =>
          prevProviders.filter((p: any) => p.id !== provider.id)
        );
      } else {
        console.error("Erro ao excluir fornecedor:", await response.text());
      }
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
    }
  };

  return (
    <Layout>
      <h1>Fornecedores</h1>

      <S.Table>
        <S.TableHead>
          <S.TableRow>
            <S.TableHeader>Nome</S.TableHeader>
            <S.TableHeader>Endereço</S.TableHeader>
            <S.TableHeader>Email</S.TableHeader>
            <S.TableHeader>Ações</S.TableHeader>
          </S.TableRow>
        </S.TableHead>
        <S.TableBody>
          {providers.map((provider: any) => (
            <S.TableRow key={provider.id}>
              <S.TableCell>{provider.name}</S.TableCell>
              <S.TableCell>{provider.address}</S.TableCell>
              <S.TableCell>{provider.email}</S.TableCell>
              <S.TableCell>
                <S.ActionButton onClick={() => handleView(provider)}>
                  Visualizar
                </S.ActionButton>
                <S.ActionButton onClick={() => handleEdit(provider)}>
                  Editar
                </S.ActionButton>
                <S.ActionButton danger onClick={() => handleDelete(provider)}>
                  Excluir
                </S.ActionButton>
              </S.TableCell>
            </S.TableRow>
          ))}
        </S.TableBody>
      </S.Table>
      {selectedProvider && (
        <S.ModalBackdrop show={showModal} onClick={handleModalClose}>
          <S.ModalContent onClick={(e) => e.stopPropagation()}>
            {isEditMode ? (
              <>
                <h2>Editar Fornecedor</h2>
                <form>
                  <S.Label>
                    Nome:
                    <S.Input
                      type="text"
                      value={selectedProvider.name}
                      onChange={(e) =>
                        setSelectedProvider((prevProvider) => {
                          if (prevProvider) {
                            return {
                              ...prevProvider,
                              name: e.target.value,
                            };
                          }
                          return prevProvider;
                        })
                      }
                    />
                  </S.Label>
                  <S.Label>
                    Endereço:
                    <S.Input
                      type="text"
                      value={selectedProvider.address}
                      onChange={(e) =>
                        setSelectedProvider((prevProvider) => {
                          if (prevProvider) {
                            return {
                              ...prevProvider,
                              address: e.target.value,
                            };
                          }
                          return prevProvider;
                        })
                      }
                    />
                  </S.Label>
                  <S.Label>
                    Email:
                    <S.Input
                      type="text"
                      value={selectedProvider.email}
                      onChange={(e) =>
                        setSelectedProvider((prevProvider) => {
                          if (prevProvider) {
                            return {
                              ...prevProvider,
                              email: e.target.value,
                            };
                          }
                          return prevProvider;
                        })
                      }
                    />
                  </S.Label>
                </form>
                <S.ButtonContainer>
                  <S.Button onClick={handleModalClose}>Salvar</S.Button>
                  <S.Button onClick={handleModalClose}>Fechar</S.Button>
                </S.ButtonContainer>
              </>
            ) : (
              <>
                <h2>Visualizar Fornecedor</h2>
                <div>
                  <strong>Nome:</strong> {selectedProvider.name}
                </div>
                <div>
                  <strong>Endereço:</strong> {selectedProvider.address}
                </div>
                <div>
                  <strong>Email:</strong> {selectedProvider.email}
                </div>
                <S.ButtonContainer>
                  <S.Button onClick={handleModalClose}>Fechar</S.Button>
                </S.ButtonContainer>
              </>
            )}
          </S.ModalContent>
        </S.ModalBackdrop>
      )}
    </Layout>
  );
}
