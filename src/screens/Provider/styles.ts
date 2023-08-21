import styled, { css } from "styled-components";

interface ActionButtonProps {
  danger?: boolean;
}

interface ModalBackdropProps {
  show: boolean;
}

export const AdminContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px;
`;

export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  padding: 16px;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const Label = styled.label`
  font-size: 18px;
  margin-bottom: 5px;
  display: block;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 10px;
`;

export const Button = styled.button`
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }

  &[danger] {
    background-color: #dc3545;

    &:hover {
      background-color: #c82333;
    }
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const TableHead = styled.thead`
  background-color: #f8f9fa;
`;

export const TableBody = styled.tbody``;

export const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const TableHeader = styled.th`
  padding: 15px;
  border: 1px solid #ddd;
  text-align: left;
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
  background-color: ${(props) => (props.danger ? "#dc3545" : "#007bff")};
  color: #fff;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(props) => (props.danger ? "#c82333" : "#0056b3")};
  }

  &:last-child {
    margin-right: 0;
  }
`;

export const ModalBackdrop = styled.div<ModalBackdropProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.show ? "block" : "none")};
`;

export const ModalContent = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 600px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;
