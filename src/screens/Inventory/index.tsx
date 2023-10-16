import { useState } from "react";
import { Layout } from "../../components/Layout";
import { InventoryTabs } from "./InventoryTabs";
import { DropdownMenuComponent } from "../../components/DropdownMenu";
import * as S from "./styles";

export function Inventory() {
  const [activeTab, setActiveTab] = useState("computers");
  const [inventory, setInventory] = useState([
    {
      id: "d290f1ee-6c54-4b01-90e6-d701748f0851",
      name: "Computador Escritório 1",
      model: "XYZ 123",
      serialNumber: "SN123456789",
      patrimonyTag: "PT10001",
      type: "computador",
      EquipmentCompanies: [
        {
          companyId: "6b3e2a22-8861-4eb9-9f21-4d3fdd051a04",
        },
        {
          companyId: "bc24f7d2-8f8f-498a-b7b9-2f48f6e3e01b",
        },
      ],
    },
    {
      id: "d3f2b2aa-acd5-44b8-94d1-2d3e18b7a6c4",
      name: "Impressora Multifuncional",
      model: "ABC 9000",
      serialNumber: "SN987654321",
      patrimonyTag: "PT10002",
      type: "impressora",
      EquipmentCompanies: [
        {
          companyId: "6b3e2a22-8861-4eb9-9f21-4d3fdd051a04",
        },
      ],
    },
    {
      id: "2d641b19-5912-4b90-8bdf-98a2e18f7f21",
      name: "Computador Escritório 2",
      model: "XYZ 456",
      serialNumber: "SN123451234",
      patrimonyTag: "PT10003",
      type: "computador",
      EquipmentCompanies: [
        {
          companyId: "bc24f7d2-8f8f-498a-b7b9-2f48f6e3e01b",
        },
      ],
    },
    {
      id: "b5a2c8f5-8f85-4c8b-9f6e-2d9f9e5c44b9",
      name: "Impressora Rápida",
      model: "FAST100",
      serialNumber: "SN192837465",
      patrimonyTag: "PT10004",
      type: "impressora",
      EquipmentCompanies: [],
    },
  ]);

  const handleClick = (id: string) => {};

  const handleEdit = (inventory: any) => {};

  const handleDelete = async (id: string) => {};

  const getComputers = () => {
    return inventory.filter((item) => item.type === "computador");
  };

  const getPrinters = () => {
    return inventory.filter((item) => item.type === "impressora");
  };

  const renderInventoryContent = () => {
    let content;

    switch (activeTab) {
      case "computers":
        const computers = getComputers();
        content = computers.map((computer, index) => (
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

      case "printers":
        const printers = getPrinters();
        content = printers.map((printer, index) => (
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
    );
  };

  return (
    <Layout>
      <S.Container>
        <h1>Inventário</h1>
        <InventoryTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderInventoryContent()}
      </S.Container>
    </Layout>
  );
}
