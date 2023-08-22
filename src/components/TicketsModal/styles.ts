import styled from "styled-components";

const colors = {
  primary: "#007bff",
  primaryDark: "#0056b3",
  lightGrey: "#f4f4f4",
  darkGrey: "#333",
  borderGrey: "#ccc",
  white: "#fff",
  red: "#ff6347",
};

export const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const Modal = styled.div`
  position: relative;
  width: 80%;
  height: 80%;
  background: ${colors.white};
  border-radius: 20px;
  padding: 30px 40px;
  box-shadow: 0px 10px 50px -10px rgba(0, 0, 0, 0.3);
  display: flex;
`;

export const LeftSide = styled.div`
  flex: 60%; // Ajuste de acordo com sua preferência
  padding-right: 20px; // espaço entre a parte esquerda e direita
  border-right: 1px solid ${colors.borderGrey}; // borda entre as duas partes

  > h2 {
    font-size: 24px;
    margin-bottom: 10px;
    color: ${colors.darkGrey};
  }

  > span {
    display: block;
    margin-bottom: 20px;
    font-size: 18px;
    color: ${colors.primaryDark};
  }

  // Seção do chat
  > div.chat {
    background: ${colors.lightGrey};
    padding: 15px;
    border-radius: 15px;
    max-height: 300px;
    overflow-y: auto;
    margin-bottom: 20px;
  }
`;

export const RightSide = styled.div`
  flex: 40%;
  padding-left: 20px;

  // Agora, você pode definir os estilos para os elementos desta seção.
  // Por exemplo:

  > p.info {
    font-size: 16px;
    color: ${colors.darkGrey};
    margin-bottom: 20px;
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 20px;
  top: 20px;
  background: none;
  border: none;
  &:hover {
    color: ${colors.red}; // Adicionando um feedback no hover
  }
`;

export const Title = styled.h2`
  margin-bottom: 25px; // Um pouco mais de espaço
  color: ${colors.darkGrey};
  font-size: 24px; // Tamanho da fonte um pouco maior
`;

export const InfoGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
`;

export const InfoItem = styled.div`
  flex: 1;
  background: ${colors.lightGrey};
  padding: 15px;
  border-radius: 15px;
  margin-right: 1rem;

  &:last-child {
    margin-right: 0; // Retirar margin-right do último item
  }
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
  border-radius: 8px; // Bordas mais arredondadas

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
  border-radius: 8px; // Bordas mais arredondadas

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
  border-radius: 8px; // Bordas mais arredondadas

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
  max-height: calc(
    100% - 20px
  ); // Descontando o padding, assim ocupa todo o espaço
  overflow-y: auto;
  background-color: #f9f9f9;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
`;

export const Message = styled.div<{ isTech: boolean }>`
  margin-bottom: 10px;
  padding: 5px 10px; // Aumentei o padding horizontal para melhor visualização
  border-radius: 15px; // Aumentei para dar um look mais moderno
  background-color: ${(props) => (props.isTech ? "#dcf6c7" : "#dfd8cf")};
  align-self: ${(props) => (props.isTech ? "flex-start" : "flex-end")};
  max-width: 80%; // Limitando a largura máxima de uma mensagem
  word-break: break-word; // Quebra longas palavras

  // Estilização opcional para diferenciar ainda mais as mensagens
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

export const ReplyContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 15px;

  & > input {
    flex: 1;
    padding: 10px;
    margin-right: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  & > button {
    padding: 10px 20px;
    background-color: #4caf50; // Verde como exemplo
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background-color: #45a049; // Verde escuro no hover
    }
  }
`;
