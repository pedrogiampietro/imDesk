// src/components/InventoryTabs.tsx
import React from "react";
import styled from "styled-components";

// Estilos para os componentes das abas
const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Tab = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-bottom: none;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin-right: 5px;

  &:hover {
    background: #f2f2f2;
  }
`;

interface InventoryTabsProps {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
}

export const InventoryTabs: React.FC<InventoryTabsProps> = ({
  activeTab,
  setActiveTab,
}) => {
  return (
    <TabsContainer>
      <Tab
        onClick={() => setActiveTab("computers")}
        style={{ background: activeTab === "computers" ? "#e2e2e2" : "" }}
      >
        Computadores
      </Tab>
      <Tab
        onClick={() => setActiveTab("printers")}
        style={{ background: activeTab === "printers" ? "#e2e2e2" : "" }}
      >
        Impressoras
      </Tab>
    </TabsContainer>
  );
};
