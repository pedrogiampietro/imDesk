import styled from "styled-components";

export const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; // Garanta que seja alto o suficiente para ficar acima de outros elementos
`;

export const ModalContainer = styled.div`
  background: #fff;
  width: 500px; // ou uma largura que se adeque ao seu design
  max-width: 95%; // Para garantir que fique bom em dispositivos móveis
  border-radius: 8px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  padding: 10px 20px;
  background: #f5f5f5;
  display: flex;
  justify-content: space-between;
  align-items: center;

  h2 {
    margin: 0;
    font-weight: normal;
    color: #333;
  }

  button {
    border: none;
    background: transparent;
    font-size: 1.5rem;
    color: #333;
    cursor: pointer;
  }
`;

export const ModalContent = styled.div`
  padding: 20px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;

  input[type="radio"] {
    margin-right: 10px;
  }

  label {
    margin: 0;
    font-size: 1rem;
    color: #333;
    cursor: pointer;
  }
`;

export const ModalFooter = styled.div`
  padding: 10px 20px;
  text-align: right;

  button {
    padding: 8px 16px;
    background-color: #7f56d8;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
    transition: background-color 0.3s;

    &:hover {
      background-color: #6841c7;
    }
  }
`;

export const Input = styled.input`
  font-size: 16px;
  line-height: 28px;
  padding: 8px 16px;
  margin-bottom: 1rem;
  width: 100%;
  min-height: 44px;
  border: unset;
  border-radius: 4px;
  outline-color: rgb(84 105 212 / 0.5);
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(60, 66, 87, 0.16) 0px 0px 0px 1px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
`;

export const InputLabel = styled.label`
  font-size: 14px;
  margin-bottom: 4px;
`;
