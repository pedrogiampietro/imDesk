// src/pages/Inventory/index.tsx
import React, { useState } from "react";
import { Layout } from "../../components/Layout";
import { InventoryTabs } from "./InventoryTabs"; // importe o novo componente
import * as S from "./styles";

export function Inventory() {
  const [activeTab, setActiveTab] = useState("computers"); // controle do estado da aba ativa
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
    // Adicione quantos objetos mais forem necessários para o seu mock
  ]); // você precisará carregar os inventários com base na aba ativa

  // Renderize o conteúdo com base na aba ativa
  const renderInventoryContent = () => {
    switch (activeTab) {
      case "computers":
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
                </S.TableRow>
              </thead>
              <tbody>
                {inventory.map((deposit, index) => (
                  <S.TableRow key={deposit.id}>
                    <S.TableCell>{index + 1}</S.TableCell>
                    <S.TableCell>{deposit.name}</S.TableCell>
                    <S.TableCell>{deposit.location}</S.TableCell>
                    <S.TableCell>
                      {new Date(deposit.createdAt).toLocaleDateString()}
                    </S.TableCell>
                    <S.TableCell>{deposit?.Company?.name}</S.TableCell>
                    {/* <S.TableCell>
                      <DropdownMenuComponent
                        onView={() => handleClick(deposit.id)}
                        onEdit={() => handleEdit(deposit)}
                        onDelete={() => handleDelete(deposit.id)}
                      />
                    </S.TableCell> */}
                  </S.TableRow>
                ))}
              </tbody>
            </S.Table>
          </>
        ); //
      case "printers":
        return <div>Conteúdo do inventário de Impressoras</div>; // substitua pelo seu componente ou lógica real
      // outros casos para diferentes tipos de inventário
      default:
        return null;
    }
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
