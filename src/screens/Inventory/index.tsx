import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "../../components/Layout";
import { InventoryTabs } from "./InventoryTabs";
import { DropdownMenuComponent } from "../../components/DropdownMenu";
import * as S from "./styles";
import { CreateItemInventoryModal } from "../../components/CreateItemInventoryModal";
import { FiX } from "react-icons/fi";
import { apiClient } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";
import { LottieLoad } from "../../components/LottieLoading";

interface IEquipament {
  id: string;
  name: string;
  model: string;
  serialNumber: string;
  patrimonyTag: string;
  type: string;
}

export function Inventory() {
  const [activeTab, setActiveTab] = useState("Computador");
  const [inventory, setInventory] = useState<IEquipament[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingInventoryItem, setEditingInventoryItem] = useState(null);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchCompanies = async () => {
      setLoading(true);

      if (
        !user ||
        !user.companies ||
        !user.currentLoggedCompany.currentLoggedCompanyId ||
        !user.currentLoggedCompany.currentLoggedCompanyName
      ) {
        return;
      }

      try {
        const response = await apiClient().get("/equipament", {
          params: {
            companyId: user?.currentLoggedCompany.currentLoggedCompanyId,
          },
        });

        setInventory(response.data.body);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching companies", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [user]);

  const handleEdit = (inventory: any) => {
    setEditingInventoryItem(inventory);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {};

  const getComputador = () => {
    return inventory.filter((item) => item.type === "Computador");
  };

  const getImpressoras = () => {
    return inventory.filter((item) => item.type === "Impressora");
  };

  const renderInventoryContent = () => {
    let content;

    switch (activeTab) {
      case "Computador":
        const computador = getComputador();
        content = computador.length ? (
          computador.map((computer, index) => (
            <S.TableRow key={computer.id}>
              <S.TableCell>{index + 1}</S.TableCell>
              <S.TableCell>{computer.name}</S.TableCell>
              <S.TableCell>{computer.model}</S.TableCell>
              <S.TableCell>{computer.serialNumber}</S.TableCell>
              <S.TableCell>{computer.patrimonyTag}</S.TableCell>
              <S.TableCell>{computer.type}</S.TableCell>
              <S.TableCell>
                <DropdownMenuComponent
                  onEdit={() => handleEdit(computer)}
                  onDelete={() => handleDelete(computer.id)}
                />
              </S.TableCell>
            </S.TableRow>
          ))
        ) : (
          <S.NoItemsMessage>
            Esse inventário ainda não tem itens para visualizar.
          </S.NoItemsMessage>
        );
        break;

      case "Impressora":
        const impressoras = getImpressoras();
        content = impressoras.length ? (
          impressoras.map((printer, index) => (
            <S.TableRow key={printer.id}>
              <S.TableCell>{index + 1}</S.TableCell>
              <S.TableCell>{printer.name}</S.TableCell>
              <S.TableCell>{printer.model}</S.TableCell>
              <S.TableCell>{printer.serialNumber}</S.TableCell>
              <S.TableCell>{printer.patrimonyTag}</S.TableCell>
              <S.TableCell>{printer.type}</S.TableCell>
              <S.TableCell>
                <DropdownMenuComponent
                  onEdit={() => handleEdit(printer)}
                  onDelete={() => handleDelete(printer.id)}
                />
              </S.TableCell>
            </S.TableRow>
          ))
        ) : (
          <S.NoItemsMessage>
            Esse inventário ainda não tem itens para visualizar.
          </S.NoItemsMessage>
        );
        break;

      default:
        content = (
          <S.NoItemsMessage>
            Esse inventário ainda não tem itens para visualizar.
          </S.NoItemsMessage>
        );
    }

    return (
      <>
        <S.Table>
          <thead>
            <S.TableRow>
              <S.TableHeader>Nº</S.TableHeader>
              <S.TableHeader>Nome</S.TableHeader>
              <S.TableHeader>Modelo</S.TableHeader>
              <S.TableHeader>Serial</S.TableHeader>
              <S.TableHeader>Patrimonio</S.TableHeader>
              <S.TableHeader>Tipo</S.TableHeader>
              <S.TableHeader>Ações</S.TableHeader>
            </S.TableRow>
          </thead>
          <tbody>{content}</tbody>
        </S.Table>
      </>
    );
  };

  return (
    <Layout>
      <S.Container>
        <S.Header>
          <InventoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
          <S.Button
            onClick={() => {
              setShowModal(true);
              setEditingInventoryItem(null);
            }}
          >
            Adicionar Item
          </S.Button>
        </S.Header>
        {loading ? <LottieLoad /> : renderInventoryContent()}
      </S.Container>

      {showModal && (
        <S.ModalWrapper>
          <S.ModalContainer>
            <CreateItemInventoryModal
              editingInventoryItem={editingInventoryItem}
              setShowModal={setShowModal}
              setInventory={setInventory}
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
