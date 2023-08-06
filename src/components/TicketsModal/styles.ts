import styled from "styled-components";

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const Modal = styled.div`
  position: relative;
  width: 90%;
  max-width: 600px;
  background: white;
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.5s;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 15px;
  top: 15px;
  background: none;
  border: none;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  color: #333;
`;

export const InfoGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const InfoItem = styled.div`
  width: 48%;
  background: #f4f4f4;
  padding: 10px;
  border-radius: 10px;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  color: #ff6347;
  margin-bottom: 5px;
  & > svg {
    font-size: 22px;
    margin-right: 0.65rem;
  }
`;

export const InfoTitle = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
`;

export const InfoContent = styled.p`
  color: #333;
`;

export const Dropdown = styled.div`
  position: absolute;
  background-color: white;
  width: 200px;
  border: 1px solid gray;
  border-radius: 5px;
  padding: 10px;
  z-index: 100;
`;

export const DropdownItem = styled.div`
  padding: 10px;
  &:hover {
    background-color: lightgray;
  }
`;

export const StyledInput = styled.textarea`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #e2e8f0;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.2s, box-shadow 0.2s;
  background-color: #fff;

  &:hover {
    border-color: #a0aec0;
  }

  &:focus {
    border-color: #3182ce;
    box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
    outline: none;
  }

  &::placeholder {
    color: #a0aec0;
  }
`;

export const StyledSelect = styled.select`
  border: 1px solid #e2e8f0;
  padding: 8px 12px;
  border-radius: 4px;
  appearance: none;
  background-color: #fff;
  cursor: pointer;
  transition: border-color 0.2s;

  &:focus {
    border-color: #a0aec0;
    outline: none;
  }

  &:hover {
    border-color: #a0aec0;
  }
`;

export const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical; // permite o redimensionamento vertical do textarea
  margin-bottom: 10px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

export const StyledButton = styled.button`
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

export const ConversationContainer = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  max-height: 200px; // Ajuste conforme sua necessidade
  overflow-y: auto; // Permite rolagem se o conteúdo for longo
  background-color: #f9f9f9;

  & > div {
    margin-bottom: 10px;
    padding: 5px;
    border-radius: 3px;

    &:nth-child(odd) {
      // Estilo para mensagens ímpares (por exemplo, do usuário)
      background-color: #e9e9e9;
    }

    &:nth-child(even) {
      // Estilo para mensagens pares (por exemplo, do técnico)
      background-color: #d9d9d9;
    }
  }
`;
