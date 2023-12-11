import styled, { css } from "styled-components";

interface ActionButtonProps {
  danger?: boolean;
}

interface ModalBackdropProps {
  show: boolean;
}

export const Container = styled.div`
  width: 98%;
  height: 100vh;

  background-color: #fff;
  margin: 0 auto;
  border-radius: 10px;

  background: ${({ theme }) => theme.bgLinear};
  padding: 2rem;
  border-radius: 10px;
`;

export const TableContainer = styled.div`
  flex: 1;
  height: 100vh;
  max-height: 800px;
  overflow-x: auto;
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
  height: 50px;
`;

export const TableCell = styled.td`
  padding: 1rem 15px;
  border: 1px solid #ddd;
  text-align: center;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
`;

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

export const Label = styled.label`
  font-size: 16px;
  margin-bottom: 15px;
  display: block;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  margin-bottom: 15px;
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
  background-color: ${(props) => props.theme.primary};
  color: #fff;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${(props) => props.theme.primaryDark};
  }

  &[danger] {
    background-color: #dc3545;

    &:hover {
      background-color: #c82333;
    }
  }
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
    background-color: ${(props) =>
      props.danger ? "#c82333" : props.theme.primaryDark};
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
  gap: 20px;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
`;

export const InputsContainer = styled.div`
  flex: 3; // Ocupa 3/4 do espaço
  display: flex;
  flex-direction: column;
`;

export const ActionContainer = styled.div`
  flex: 1; // Ocupa 1/4 do espaço
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const FormRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  & > ${Label} {
    flex: 1;
    margin-right: 10px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export const DiasRestantesIndicator = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  background-color: ${(props) => {
    if (props.dias <= 0) return "#ff0000"; // Vencido: vermelho
    if (props.dias <= 30) return "#ff9900"; // Próximo: amarelo
    return "#33cc33"; // Distante: verde
  }};

  color: white;
  font-weight: bold;
  margin-left: 10px;
  margin-top: auto;
`;

export const UploadTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;

  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }

  th {
    background-color: #f8f9fa;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const UploadPDFButton = styled.button`
  background-color: #28a745; // Verde
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #218838;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.3);
  }

  input[type="file"] {
    display: none;
  }

  svg {
    font-size: 20px;
  }
`;
