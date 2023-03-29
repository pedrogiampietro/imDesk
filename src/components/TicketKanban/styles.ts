import styled from "styled-components";

interface TabProps {
  active: boolean;
}

export const KanbanContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  margin: 1rem;
`;

export const TabsContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const TabWrapper = styled.div`
  display: flex;
`;

export const Tab = styled.div<TabProps>`
  padding: 8px 16px;
  margin-right: 8px;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border-bottom: ${(props) => (props.active ? "2px solid blue" : "none")};
`;

export const SearchInput = styled.input`
  margin-left: auto;
  margin-right: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const FilterButton = styled.button`
  padding: 8px 16px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
