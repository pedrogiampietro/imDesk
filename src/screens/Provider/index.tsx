import { useRef, useState, useEffect } from "react";
import Select from "react-select";
import { Layout } from "../../components/Layout";
import { FaFileUpload } from "react-icons/fa";
import { apiClient } from "../../services/api";
import { FaEye, FaTrash } from "react-icons/fa";

import InputMask from "react-input-mask";
import { format, parseISO } from "date-fns";
import { useAuth } from "../../hooks/useAuth";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import * as S from "./styles";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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
  serviceProvided: string;
  monthlyValue: string;
  dueDate: string;
  operationDate: string;
  contractNumber: string;
  adendum: string;
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
  const [selectedFilePreview, setSelectedFilePreview] = useState<any>(null);
  const [pdfFiles, setPdfFiles] = useState<any>([]);
  const [selectedFilePdfContract, setSelectedFilePdfContract] = useState(null);
  const [numPages, setNumPages] = useState<number | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    async function fetchProviders() {
      try {
        const response = await apiClient().get("/providers/provider");

        console.log("response", response);

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

      formData.append("serviceProvided", selectedProvider.serviceProvided);
      formData.append("monthlyValue", selectedProvider.monthlyValue);

      const dueDateParts = selectedProvider.dueDate.split("/");
      const dueDateISO =
        dueDateParts.length === 3
          ? `${dueDateParts[2]}-${dueDateParts[1]}-${dueDateParts[0]}`
          : selectedProvider.dueDate;
      formData.append("dueDate", dueDateISO);

      formData.append("operationDate", selectedProvider.operationDate);
      formData.append("contractNumber", selectedProvider.contractNumber);
      formData.append("adendum", selectedProvider.adendum);

      formData.append("logo", selectedFile || selectedProvider.logoURL);

      pdfFiles.forEach((pdfFile: any, index: number) => {
        formData.append(`pdf${index}`, pdfFile.file);
      });

      formData.append(
        "companyId",
        user?.currentLoggedCompany.currentLoggedCompanyId as any
      );

      const responseContracts = await apiClient().put(
        `/providers/contract/${selectedProvider.id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      const response = await apiClient().put(
        `/providers/provider/${selectedProvider.id}`,
        formData,
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

  const optionsSelect = [
    {
      id: 1,
      label: "Fornecedor de Produtos",
      value: "providers_products",
    },
    {
      id: 2,
      label: "Prestador de Serviço",
      value: "providers_services",
    },
  ];

  function calcularTempoRestante(dataTermino: string) {
    const hoje = new Date();
    const dataFim = new Date(dataTermino);

    const diferencaTempo = dataFim.getTime() - hoje.getTime();
    const diasRestantes = Math.ceil(diferencaTempo / (1000 * 3600 * 24));

    return diasRestantes;
  }

  const handleFileChange = (event: any) => {
    const file = event.target.files[0];

    if (file) {
      setSelectedFile(event.target.files[0]);
      const objectURL = URL.createObjectURL(file) as any;
      setSelectedFilePreview(objectURL);
    }
  };

  const tempoRestante = calcularTempoRestante(selectedProvider?.dueDate as any);

  const fileInputRef = useRef<any>(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handlePDFContractChange = (event: any) => {
    const file = event.target.files[0];
    const timestamp = Date.now();
    setPdfFiles([...pdfFiles, { file, id: timestamp }]);
  };

  const handlePdfFileClick = (id: any) => {
    const selectedFile = pdfFiles.find((file: any) => file.id === id);
    setSelectedFilePdfContract(selectedFile.file);
  };

  const handleDeleteClick = (id: any) => {
    setPdfFiles(pdfFiles.filter((file: any) => file.id !== id));
    setSelectedFilePdfContract(null);
  };

  const handleCloseClick = () => {
    setSelectedFilePdfContract(null);
  };

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const formattedDueDate = selectedProvider?.dueDate
    ? format(parseISO(selectedProvider.dueDate), "dd/MM/yyyy")
    : "";

  const formattedOperationDate = selectedProvider?.operationDate
    ? selectedProvider.operationDate.toString().split("T")[0]
    : "";

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
                          src={selectedProvider.logoURL || selectedFilePreview}
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
                          <Select
                            options={optionsSelect}
                            onChange={(e: any) => {
                              setSelectedProvider((prevProvider) => {
                                if (prevProvider) {
                                  return {
                                    ...prevProvider,
                                    category: e?.value,
                                  };
                                }
                                return prevProvider;
                              });
                            }}
                          />
                        </S.Label>
                      </S.ProductDetailsContainer>
                    </S.CadastroContainer>
                  )}

                  {currentTab === "Contratos" && (
                    <>
                      <S.CadastroContainer>
                        <S.InputsContainer>
                          <S.FormRow>
                            <S.Label>
                              Serviço Fornecido:
                              <S.Input
                                type="text"
                                value={
                                  selectedProvider.serviceProvided || " - "
                                }
                                onChange={(e) =>
                                  setSelectedProvider((prevProvider) => {
                                    if (prevProvider) {
                                      return {
                                        ...prevProvider,
                                        serviceProvided: e.target.value,
                                      };
                                    }
                                    return prevProvider;
                                  })
                                }
                              />
                            </S.Label>
                            <S.Label>
                              Valor Mensal:
                              <S.Input
                                type="text"
                                value={selectedProvider.monthlyValue}
                                onChange={(e) =>
                                  setSelectedProvider((prevProvider) => {
                                    if (prevProvider) {
                                      return {
                                        ...prevProvider,
                                        monthlyValue: e.target.value,
                                      };
                                    }
                                    return prevProvider;
                                  })
                                }
                              />
                            </S.Label>

                            <S.Label>
                              Data de Vencimento:
                              <InputMask
                                mask="99/99/9999"
                                value={formattedDueDate}
                                onChange={(e) =>
                                  setSelectedProvider((prevProvider: any) => {
                                    if (prevProvider) {
                                      return {
                                        ...prevProvider,
                                        dueDate: e.target.value,
                                      };
                                    }
                                    return prevProvider;
                                  })
                                }
                                style={{
                                  width: "100%",
                                  padding: "10px",
                                  border: "1px solid #ccc",
                                  borderRadius: "4px",
                                  fontSize: "16px",
                                  marginBottom: "15px",
                                }}
                              />
                            </S.Label>
                          </S.FormRow>

                          <S.FormRow>
                            <S.Label>
                              Data de Fazer OP:
                              <S.Input
                                type="date"
                                value={formattedOperationDate}
                                onChange={(e) =>
                                  setSelectedProvider((prevProvider: any) => {
                                    if (prevProvider) {
                                      return {
                                        ...prevProvider,
                                        operationDate: e.target.value,
                                      };
                                    }
                                    return prevProvider;
                                  })
                                }
                              />
                            </S.Label>
                            <S.Label>
                              Nº Contrato:
                              <S.Input
                                type="text"
                                value={selectedProvider.contractNumber}
                                onChange={(e) =>
                                  setSelectedProvider((prevProvider) => {
                                    if (prevProvider) {
                                      return {
                                        ...prevProvider,
                                        contractNumber: e.target.value,
                                      };
                                    }
                                    return prevProvider;
                                  })
                                }
                              />
                            </S.Label>
                            <S.Label>
                              Termo Aditivo:
                              <S.Input
                                type="text"
                                value={selectedProvider.adendum || " - "}
                                onChange={(e) =>
                                  setSelectedProvider((prevProvider) => {
                                    if (prevProvider) {
                                      return {
                                        ...prevProvider,
                                        adendum: e.target.value,
                                      };
                                    }
                                    return prevProvider;
                                  })
                                }
                              />
                            </S.Label>
                          </S.FormRow>

                          <S.FormRow>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <h1>Restam para o contrato vencer:</h1>
                              <S.DiasRestantesIndicator dias={tempoRestante}>
                                {tempoRestante}
                              </S.DiasRestantesIndicator>
                            </div>
                          </S.FormRow>
                        </S.InputsContainer>
                      </S.CadastroContainer>

                      <S.UploadPDFButton onClick={handleButtonClick}>
                        <FaFileUpload />
                        <span>Anexar PDF</span>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="application/pdf"
                          onChange={handlePDFContractChange}
                          style={{ display: "none" }}
                        />
                      </S.UploadPDFButton>

                      {selectedFilePdfContract && (
                        <S.ModalBackground>
                          <S.PDFViewer>
                            <Document
                              file={URL.createObjectURL(
                                selectedFilePdfContract
                              )}
                              onLoadSuccess={onDocumentLoadSuccess}
                            >
                              {Array.from(new Array(numPages), (el, index) => (
                                <Page
                                  key={`page_${index + 1}`}
                                  pageNumber={index + 1}
                                />
                              ))}
                            </Document>
                            <S.CloseButton onClick={() => handleCloseClick()}>
                              Fechar
                            </S.CloseButton>
                          </S.PDFViewer>
                        </S.ModalBackground>
                      )}

                      <S.UploadTable>
                        <thead>
                          <tr>
                            <th>Nome do Arquivo</th>
                            <th>Data</th>
                            <th>Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pdfFiles.map((file: any) => (
                            <tr key={file.id}>
                              <td>{file.file.name}</td>
                              <td>{file.file.lastModified}</td>
                              <td>
                                <S.ViewButton
                                  onClick={() => handlePdfFileClick(file.id)}
                                >
                                  <FaEye />
                                </S.ViewButton>

                                <S.ViewButton
                                  onClick={() => handleDeleteClick(file.id)}
                                >
                                  <FaTrash />
                                </S.ViewButton>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </S.UploadTable>
                    </>
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
