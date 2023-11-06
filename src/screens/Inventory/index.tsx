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
  const [selectedType, setSelectedType] = useState("Computador");
  const [inventory, setInventory] = useState<IEquipament[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingInventoryItem, setEditingInventoryItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [equipmentTypes, setEquipmentTypes] = useState<string[] | any>([]);

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

        const uniqueTypes = Array.from(
          new Set(response.data.body.map((item: any) => item.type))
        );

        setEquipmentTypes(uniqueTypes);
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

  const filteredInventory = () => {
    return inventory.filter((item) => item.type === selectedType);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedType(event.target.value);
  };

  const renderInventoryContent = () => {
    const filteredItems = filteredInventory();

    let content = filteredItems.length ? (
      filteredItems.map((item, index) => (
        <S.TableRow key={item.id}>
          <S.TableCell>{index + 1}</S.TableCell>
          <S.TableCell>{item.name}</S.TableCell>
          <S.TableCell>{item.model}</S.TableCell>
          <S.TableCell>{item.serialNumber}</S.TableCell>
          <S.TableCell>{item.patrimonyTag}</S.TableCell>
          <S.TableCell>{item.type}</S.TableCell>
          <S.TableCell>
            <DropdownMenuComponent
              onEdit={() => handleEdit(item)}
              onDelete={() => handleDelete(item.id)}
            />
          </S.TableCell>
        </S.TableRow>
      ))
    ) : (
      <S.NoItemsMessage>
        Esse inventário ainda não tem itens para visualizar.
      </S.NoItemsMessage>
    );

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
          <div>
            <select value={selectedType} onChange={handleTypeChange}>
              <option value="">Selecione</option>
              {equipmentTypes.map((type: any) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <S.Button
              onClick={() => {
                setShowModal(true);
                setEditingInventoryItem(null);
              }}
            >
              Adicionar Item
            </S.Button>
          </div>
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
