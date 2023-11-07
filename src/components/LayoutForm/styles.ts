import styled from "styled-components";

interface ActionButtonProps {
  danger?: boolean;
}

export const Container = styled.div`
  width: 98%;
  height: 100%;
  background-color: #fff;
  margin: 0 auto;
  border-radius: 10px;
`;

export const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;

  border-radius: 10px;
`;

export const PageHeader = styled.header`
  padding: 20px;
  background-color: #f8f9fa;
  text-align: center;
  border-radius: 10px 10px 0 0;
  font-size: 24px;
  color: ${(props) => props.theme.primary};
`;

export const Table = styled.table`
  width: 98%;
  margin: 0 auto;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #f8f9fa;
`;

export const TableBody = styled.tbody``;

export const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
  background-color: ${(props) => props.theme.primary};
  color: white;
  border: 1px solid ${(props) => props.theme.border};
`;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: ${(props) => props.theme.bg2};
  }
`;

export const TableCell = styled.td`
  padding: 15px;
  border: 1px solid #ddd;
  text-align: left;
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
