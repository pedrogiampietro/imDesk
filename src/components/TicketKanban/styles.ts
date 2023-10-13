import styled from "styled-components";
import { darkTheme, lightTheme } from "../../assets/styles/theme";

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
  display: inline-flex;
  align-items: center;
  padding: 8px 16px;
  margin-right: 8px;
  margin-right: 9.375rem;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  color: ${(props) => (props.active ? "#7F56D8" : "#000")};
  border-bottom: ${(props) => (props.active ? "3px solid #7F56D8" : "none")};
`;

export const TabIconWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  margin-right: 8px;
`;

export const TabTitle = styled.span`
  font-size: 14px;
`;

export const FilterButton = styled.button<{
  theme: typeof lightTheme | typeof darkTheme;
}>`
  padding: 8px 16px;
  background-color: ${({ theme }) =>
    theme.bg3}; // Usando a cor de background secundária do tema
  color: ${({ theme }) => theme.text}; // Cor do texto do tema
  border: 1px solid #000;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: ${({ theme }) =>
      theme.primary}; // Usando a cor primária do tema no hover
    color: #fff;
    transform: translateY(-2px);
    box-shadow: 0 7px 14px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(1px);
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
  }
`;

export const IconButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background-color: ${({ active }) => (active ? "#7F56D8" : "transparent")};
  border-radius: 8px;
  margin-right: 0.62rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #c3aff0;
  }

  &:focus {
    outline: none;
  }
`;

export const FiltersWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px; // ou qualquer espaço que você achar apropriado
  flex-wrap: nowrap; // Isso vai garantir que os itens não quebrem para a próxima linha.
`;

export const ControlsGroup = styled.div`
  display: flex;
  align-items: center;
  width: 30%;

  & > *:not(:last-child) {
    margin-right: 8px; // Espaçamento entre os controles
  }
`;

export const SearchInput = styled.input`
  padding: 14px 13px 11px 18px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Select = styled.select`
  margin-left: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const CreateButton = styled.button`
  display: flex;
  width: 157px;
  height: 44px;
  padding: 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 4px;
  background: #7f56d8;
  color: white;
  border: none;
  cursor: pointer;

  &:hover {
    background: #c3aff0;
  }

  transition: background 0.3s;
`;
