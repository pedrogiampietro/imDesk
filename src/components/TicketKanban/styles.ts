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
  padding: 8px 16px;
  margin-right: 8px;
  cursor: pointer;
  font-weight: ${(props) => (props.active ? "bold" : "normal")};
  border-bottom: ${(props) => (props.active ? "2px solid #000000" : "none")};
`;

export const SearchInput = styled.input`
  margin-left: auto;
  margin-right: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
