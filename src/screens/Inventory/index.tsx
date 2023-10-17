import { useState, useEffect } from "react";
import { Layout } from "../../components/Layout";
import { InventoryTabs } from "./InventoryTabs";
import { DropdownMenuComponent } from "../../components/DropdownMenu";
import * as S from "./styles";
import { CreateItemInventoryModal } from "../../components/CreateItemInventoryModal";
import { FiX } from "react-icons/fi";
import { apiClient } from "../../services/api";
import { useAuth } from "../../hooks/useAuth";

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

  const { user } = useAuth();

  useEffect(() => {
    const fetchCompanies = async () => {
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
        console.error("Error fetching companies", error);
      }
    };

    fetchCompanies();
  }, [user]);

  const handleClick = (id: string) => {};

  const handleEdit = (inventory: any) => {};

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
        content = computador.map((computer, index) => (
          <S.TableRow key={computer.id}>
            <S.TableCell>{index + 1}</S.TableCell>
            <S.TableCell>{computer.name}</S.TableCell>
            <S.TableCell>{computer.model}</S.TableCell>
            <S.TableCell>{computer.serialNumber}</S.TableCell>
            <S.TableCell>{computer.patrimonyTag}</S.TableCell>
            <S.TableCell>{computer.type}</S.TableCell>
            <S.TableCell>
              <DropdownMenuComponent
                onView={() => handleClick(computer.id)}
                onEdit={() => handleEdit(computer)}
                onDelete={() => handleDelete(computer.id)}
              />
            </S.TableCell>
          </S.TableRow>
        ));
        break;

      case "Impressoras":
        const impressoras = getImpressoras();
        content = impressoras.map((printer, index) => (
          <S.TableRow key={printer.id}>
            <S.TableCell>{index + 1}</S.TableCell>
            <S.TableCell>{printer.name}</S.TableCell>
            <S.TableCell>{printer.model}</S.TableCell>
            <S.TableCell>{printer.serialNumber}</S.TableCell>
            <S.TableCell>{printer.patrimonyTag}</S.TableCell>
            <S.TableCell>{printer.type}</S.TableCell>
            <S.TableCell>
              <DropdownMenuComponent
                onView={() => handleClick(printer.id)}
                onEdit={() => handleEdit(printer)}
                onDelete={() => handleDelete(printer.id)}
              />
            </S.TableCell>
          </S.TableRow>
        ));
        break;

      default:
        content = null;
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
        {renderInventoryContent()}
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
