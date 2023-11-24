import styled from "styled-components";

export const ChatContainer = styled.div<{ isVisible: any }>`
  display: ${(props) => (props.isVisible ? "block" : "none")};
  position: fixed; /* Posicionamento fixo na tela */
  bottom: 100px; /* Ajuste conforme necessário para alinhar com o robô */
  right: 20px; /* Espaçamento da direita */
  width: 300px; /* Largura do chat */
  max-height: 400px; /* Altura máxima */
  background-color: white; /* Fundo do chat */
  border-radius: 10px; /* Bordas arredondadas */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para destaque */
  z-index: 1001; /* Certifique-se que é maior que o do ícone do robô */
`;

export const ChatHistory = styled.div`
  padding: 10px;
  overflow-y: auto; /* Permite rolagem se o conteúdo exceder a altura */
  max-height: 300px; /* Ajuste conforme necessário */
`;

export const ChatMessage = styled.div<{ sender: any }>`
  background: ${(props) => (props.sender === "user" ? "#f0f0f0" : "#e0e0e0")};
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  /* Adicione mais estilos conforme necessário */
`;

export const ChatInputContainer = styled.div`
  display: flex;
  padding: 10px;
`;

export const ChatInput = styled.input`
  flex: 1;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const SendButton = styled.button`
  background-color: #4285f4;
  color: white;
  border: none;
  padding: 5px 10px;
  margin-left: 5px;
  border-radius: 5px;
  cursor: pointer;
`;
