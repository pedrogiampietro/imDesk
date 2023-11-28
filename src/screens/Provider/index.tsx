import { useState, useEffect } from "react";

import { Layout } from "../../components/Layout";

import * as S from "./styles";
import { apiClient } from "../../services/api";

interface IProviders {
  id: string;
  name: string;
  email: string;
  address: string;
  category: string;
  logoURL: string;
  price: string;
  description: string;
  contracts: any[];
  services: any[];
}

export function Provider() {
  const [providers, setProviders] = useState<IProviders[] | []>([]);
  const [selectedProvider, setSelectedProvider] = useState<IProviders | null>(
    null
  );
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [contracts, setContracts] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [currentTab, setCurrentTab] = useState("Dados Cadastrais");
  const [selectedFile, setSelectedFile] = useState(null);

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

  const handleEdit = (provider: any) => handleViewOrEdit(provider, true);
  const handleView = (provider: any) => handleViewOrEdit(provider);

  const handleModalClose = () => {
    setSelectedProvider(null);
    setIsEditMode(false);
    setShowModal(false);
  };

  const handleViewOrEdit = async (provider: any, isEdit: boolean = false) => {
    try {
      const contractsResponse = await apiClient().get(
        `/providers/contract?providerId=${provider.id}`
      );
      const servicesResponse = await apiClient().get(
        `/providers/service?providerId=${provider.id}`
      );

      setContracts(contractsResponse.data.body);
      setServices(servicesResponse.data.body);

      setSelectedProvider(provider);
      setIsEditMode(isEdit);
      setShowModal(true);
    } catch (error) {
      console.error("Erro ao buscar contratos e serviços:", error);
    }
  };

  const handleDelete = async (provider: any) => {
    console.log("Excluir fornecedor:", provider);

    try {
      const response = await apiClient().delete(
        `/providers/provider/${provider.id}`
      );

      setProviders((prevProviders: any) =>
        prevProviders.filter((p: any) => p.id !== provider.id)
      );
    } catch (error) {
      console.error("Erro ao excluir fornecedor:", error);
    }
  };

  const handleSave = async () => {
    if (!selectedProvider) return;

    try {
      const formData = new FormData();
      formData.append("name", selectedProvider.name);
      formData.append("email", selectedProvider.email);
      formData.append("address", selectedProvider.address);
      formData.append("category", selectedProvider.category);
      formData.append("price", selectedProvider.price);
      formData.append("description", selectedProvider.description);

      if (selectedFile) {
        formData.append("logo", selectedFile);
      }

      const response = await apiClient().put(
        `/providers/provider/${selectedProvider.id}`,
        formData, // Envia o FormData
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const updatedProviderData = response.data.body;
      setProviders((prevProviders) =>
        prevProviders.map((provider) =>
          provider.id === selectedProvider.id
            ? { ...provider, ...updatedProviderData }
            : provider
        )
      );
      setShowModal(false);
      alert("Fornecedor atualizado com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar o fornecedor:", error);
      alert("Erro ao atualizar o fornecedor. Por favor, tente novamente.");
    }
  };

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    <Layout>
      <S.Container>
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
                  <S.Tabs>
                    <S.TabItem
                      onClick={() => setCurrentTab("Dados Cadastrais")}
                      active={currentTab === "Dados Cadastrais"}
                    >
                      Dados Cadastrais
                    </S.TabItem>
                    <S.TabItem
                      onClick={() => setCurrentTab("Endereços")}
                      active={currentTab === "Endereços"}
                    >
                      Endereços
                    </S.TabItem>
                    <S.TabItem
                      onClick={() => setCurrentTab("Financeiro")}
                      active={currentTab === "Financeiro"}
                    >
                      Financeiro
                    </S.TabItem>
                    <S.TabItem
                      onClick={() => setCurrentTab("Contratos")}
                      active={currentTab === "Contratos"}
                    >
                      Contratos
                    </S.TabItem>
                    <S.TabItem
                      onClick={() => setCurrentTab("Serviços")}
                      active={currentTab === "Serviços"}
                    >
                      Serviços
                    </S.TabItem>
                  </S.Tabs>

                  {currentTab === "Dados Cadastrais" && (
                    <S.CadastroContainer>
                      <S.ImageContainer>
                        <S.Logo
                          src={selectedProvider.logoURL}
                          alt="Logo do Fornecedor"
                        />
                        <S.UploadButton>
                          <input type="file" onChange={handleFileChange} />
                          Alterar Logo
                        </S.UploadButton>
                      </S.ImageContainer>

                      <S.FieldsContainer>
                        <S.Label>
                          Regime de Tributação:
                          <S.Select>
                            <option>Pessoa Física</option>
                            <option>Pessoa Jurídica</option>
                          </S.Select>
                        </S.Label>
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
                      </S.FieldsContainer>

                      <S.ProductDetailsContainer>
                        <S.Label>
                          Status:
                          <S.Select>
                            <option>Ativo</option>
                            <option>Inativo</option>
                          </S.Select>
                        </S.Label>
                        <S.Label>
                          Descrição:
                          <S.TextArea
                            value={selectedProvider.description}
                            onChange={(e) =>
                              setSelectedProvider((prevProvider) => {
                                if (prevProvider) {
                                  return {
                                    ...prevProvider,
                                    description: e.target.value,
                                  };
                                }
                                return prevProvider;
                              })
                            }
                          />
                        </S.Label>

                        <S.Label>
                          Categoria:
                          <S.Input
                            type="text"
                            value={selectedProvider.category}
                            onChange={(e) =>
                              setSelectedProvider((prevProvider) => {
                                if (prevProvider) {
                                  return {
                                    ...prevProvider,
                                    category: e.target.value,
                                  };
                                }
                                return prevProvider;
                              })
                            }
                          />
                        </S.Label>

                        <S.Label>
                          Preço:
                          <S.Input
                            type="number"
                            value={selectedProvider.price}
                            onChange={(e) =>
                              setSelectedProvider((prevProvider: any) => {
                                if (prevProvider) {
                                  return {
                                    ...prevProvider,
                                    price: parseFloat(e.target.value),
                                  };
                                }
                                return prevProvider;
                              })
                            }
                          />
                        </S.Label>
                      </S.ProductDetailsContainer>
                    </S.CadastroContainer>
                  )}

                  {/* Semelhante aos contratos, adicione um componente ou lista para editar serviços */}
                  <S.ButtonContainer>
                    <S.Button onClick={handleSave}>Salvar</S.Button>
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
                  <h3>Contratos</h3>
                  <ul>
                    {contracts.map((contract) => (
                      <li key={contract.id}>
                        {contract.startDate} - {contract.endDate}
                      </li>
                    ))}
                  </ul>
                  <h3>Serviços</h3>
                  <ul>
                    {services.map((service) => (
                      <li key={service.id}>
                        {/* E os detalhes do serviço aqui */}
                        {service.name} - ${service.price}
                      </li>
                    ))}
                  </ul>
                  <S.ButtonContainer>
                    <S.Button onClick={handleModalClose}>Fechar</S.Button>
                  </S.ButtonContainer>
                </>
              )}
            </S.ModalContent>
          </S.ModalBackdrop>
        )}
      </S.Container>
    </Layout>
  );
}
