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
  background-color: #7f56d8;
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
  padding: 0 15px;
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
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

export const Tabs = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ddd;
  margin-bottom: 20px;
`;

export const TabItem = styled.div<{ active: boolean }>`
  padding: 10px 20px;
  cursor: pointer;
  border-bottom: ${(props) => (props.active ? "3px solid blue" : "none")};
  &:hover {
    background-color: #f7f7f7;
  }
`;

export const CadastroContainer = styled.div`
  display: flex;
  gap: 20px; // espaço entre os elementos
`;

export const ImageContainer = styled.div`
  flex: 1; // toma 1 parte do espaço disponível
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

export const Logo = styled.img`
  width: 100px; // você pode ajustar isso conforme necessário
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
`;

export const UploadButton = styled.button`
  // Estilize o botão de upload conforme preferir
`;

export const FieldsContainer = styled.div`
  flex: 2; // toma 2 partes do espaço disponível
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

export const ProductDetailsContainer = styled.div`
  flex: 1; // para manter o equilíbrio, mantemos isso também em 1
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  resize: vertical;
`;
