import styled from "styled-components";

interface ActionButtonProps {
  danger?: boolean;
}

export const Container = styled.div`
  width: 98%;
  height: 100%;
  /* max-height: 100vh; */
  background-color: #fff;
  margin: 0 auto;
  border-radius: 10px;

  overflow: auto;

  background: ${({ theme }) => theme.bgLinear};
  padding: 2rem;
  border-radius: 10px;
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  overflow: auto;
  margin: 0 auto;
  border-radius: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const TableContainer = styled.div`
  flex: 1;
  height: auto;
`;

export const CreateCardContainer = styled.div`
  width: 400px;
  max-width: 100%;
  overflow: auto;
`;

export const PageHeader = styled.header`
  padding: 20px;
  background: transparent;
  text-align: center;
  border-radius: 10px 10px 0 0;
  font-size: 24px;
  color: ${(props) => props.theme.primary};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #f8f9fa;
`;

export const TableBody = styled.tbody``;

export const TableHeader = styled.th`
  padding: 10px;
  text-align: center;
  background-color: ${(props) => props.theme.primary};
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  border: 1px solid ${(props) => props.theme.border};
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${(props) => props.theme.bgAlpha};
  }
  height: 50px; /* Altura fixa para cada linha, ajuste conforme necessário */
`;

export const TableCell = styled.td`
  padding: 1rem 15px;
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
`;

export const ActionButton = styled.button<ActionButtonProps>`
  margin-right: 10px;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.danger ? "#dc3545" : "#7F56D8")};
  color: #fff;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.danger ? "#c82333" : "#0056b3")};
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const HeaderActions = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const CreateButton = styled.button`
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  background-color: #7f56d8;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #6654a3;
  }
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 20px;

  & span {
    color: ${({ theme }) => theme.text};
  }
`;
