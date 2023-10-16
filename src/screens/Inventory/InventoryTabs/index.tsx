import React from "react";
import styled from "styled-components";

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
    background: #c3aff0;
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
        style={{ background: activeTab === "computers" ? "#c3aff0" : "" }}
      >
        Computadores
      </Tab>
      <Tab
        onClick={() => setActiveTab("printers")}
        style={{ background: activeTab === "printers" ? "#c3aff0" : "" }}
      >
        Impressoras
      </Tab>
    </TabsContainer>
  );
};
