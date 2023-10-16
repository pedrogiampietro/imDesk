import styled from "styled-components";

export const Container = styled.div``;

export const Button = styled.button`
  padding: 8px 12px;
  background-color: #7f56d8;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c3aff0;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHeader = styled.th`
  padding: 10px;
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
  padding: 10px;
  border: 1px solid #c3aff0;
  text-align: center;
  vertical-align: middle;
`;

export const CloseButtonModal = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
  background: transparent;
  border: 0;
  font-size: 0;
  cursor: pointer;
`;
